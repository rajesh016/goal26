const https = require('https');
const fs = require('fs');

// ─── FETCH HELPER ────────────────────────────────────────────────────────────
function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

// ─── CLAUDE AI HELPER ────────────────────────────────────────────────────────
async function askClaude(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 300,
      messages: [{ role: 'user', content: prompt }]
    });

    const options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.content[0].text);
        } catch (e) { reject(e); }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ─── FETCH LIVE MATCHES ───────────────────────────────────────────────────────
async function fetchMatches() {
  try {
    // Free World Cup 2026 API - no key needed
    const data = await fetchJSON('https://raw.githubusercontent.com/rezarahiminia/worldcup2026/main/data/matches.json');
    const today = new Date().toISOString().split('T')[0];

    // Map API data to our format
    const matches = (data.matches || data || []).slice(0, 10).map((m, i) => {
      const isToday = m.date && m.date.startsWith(today);
      const hasScore = m.home_score !== null && m.home_score !== undefined;
      const status = hasScore ? (isToday ? 'live' : 'ft') : 'upcoming';

      return {
        id: i + 1,
        home: m.home_team?.name || m.home || 'TBD',
        homeFlag: m.home_team?.flag || '🏳️',
        away: m.away_team?.name || m.away || 'TBD',
        awayFlag: m.away_team?.flag || '🏳️',
        homeScore: hasScore ? m.home_score : null,
        awayScore: hasScore ? m.away_score : null,
        status,
        time: status === 'live' ? `${Math.floor(Math.random() * 45 + 45)}'` : status === 'ft' ? 'FT' : m.time || '20:00',
        group: m.group || 'Group Stage',
        venue: m.venue || m.stadium || 'USA/Canada/Mexico',
      };
    });

    return matches.length > 0 ? matches : null;
  } catch (e) {
    console.log('API fetch failed, keeping existing data:', e.message);
    return null;
  }
}

// ─── FETCH STANDINGS ──────────────────────────────────────────────────────────
async function fetchStandings() {
  try {
    const data = await fetchJSON('https://raw.githubusercontent.com/rezarahiminia/worldcup2026/main/data/standings.json');
    const teams = (data.standings || data || []).slice(0, 8);

    return teams.map((t, i) => ({
      pos: i + 1,
      flag: t.team?.flag || '🏳️',
      name: t.team?.name || t.name || 'Team',
      p: t.played || 0,
      w: t.won || 0,
      d: t.drawn || 0,
      l: t.lost || 0,
      gd: (t.goal_difference >= 0 ? '+' : '') + (t.goal_difference || 0),
      pts: t.points || 0,
      form: t.form || ['w', 'd', 'l'],
    }));
  } catch (e) {
    console.log('Standings fetch failed:', e.message);
    return null;
  }
}

// ─── AI WRITES MATCH SUMMARY ─────────────────────────────────────────────────
async function generateMatchSummary(match) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return `${match.home} and ${match.away} are locked in a thrilling encounter. Both teams creating chances in what promises to be a decisive group stage match.`;
  }

  const prompt = `Write a 2-sentence live football match summary for: ${match.home} ${match.homeScore} - ${match.awayScore} ${match.away} in the FIFA World Cup 2026 ${match.group}. Make it exciting and professional. No emojis.`;

  try {
    return await askClaude(prompt);
  } catch (e) {
    return `${match.home} and ${match.away} are locked in a thrilling ${match.group} encounter at the FIFA World Cup 2026.`;
  }
}

// ─── AI WRITES NEWS ARTICLES ─────────────────────────────────────────────────
async function generateNews(matches) {
  const tags = ['Match Report', 'Breaking', 'Analysis', 'Tactical', 'Stats', 'Preview'];
  const news = [];

  const liveMatch = matches.find(m => m.status === 'live') || matches[0];

  if (process.env.ANTHROPIC_API_KEY && liveMatch) {
    try {
      const prompt = `Generate 3 short football news items about FIFA World Cup 2026 featuring ${liveMatch.home} vs ${liveMatch.away}. 
Return ONLY valid JSON array like: [{"tag":"Match Report","title":"...","excerpt":"...","time":"X min ago"}]
Each excerpt max 150 chars. No markdown, no explanation, just the JSON array.`;

      const response = await askClaude(prompt);
      const clean = response.replace(/```json|```/g, '').trim();
      const aiNews = JSON.parse(clean);
      news.push(...aiNews.map((n, i) => ({ id: i + 1, ...n })));
    } catch (e) {
      console.log('AI news generation failed, using fallback');
    }
  }

  // Fallback news if AI fails or no API key
  if (news.length === 0) {
    const fallback = matches.slice(0, 3).map((m, i) => ({
      id: i + 1,
      tag: tags[i],
      title: m.status === 'ft'
        ? `${m.home} ${m.homeScore}-${m.awayScore} ${m.away}: Full Time Result`
        : m.status === 'live'
        ? `LIVE: ${m.home} vs ${m.away} — ${m.homeScore}-${m.awayScore} in ${m.time}`
        : `Preview: ${m.home} vs ${m.away} — ${m.group} Clash Tonight`,
      excerpt: `Follow all the action from this ${m.group} match at FIFA World Cup 2026. Live updates, stats and analysis.`,
      time: `${(i + 1) * 15} min ago`,
    }));
    news.push(...fallback);
  }

  // Always add a stats article
  news.push({
    id: news.length + 1,
    tag: 'Stats',
    title: `World Cup 2026 Daily Roundup — ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`,
    excerpt: 'Complete results, standings update and top scorer leaderboard from today\'s FIFA World Cup 2026 action.',
    time: '1 hr ago',
  });

  return news.slice(0, 6);
}

// ─── READ CURRENT DATA.JS ─────────────────────────────────────────────────────
function getCurrentData() {
  const content = fs.readFileSync('./src/data.js', 'utf8');

  // Extract topScorers (static - doesn't change often)
  const scorersMatch = content.match(/export const topScorers = (\[[\s\S]*?\]);/);
  const topScorers = scorersMatch ? JSON.parse(scorersMatch[1]) : [];

  return { topScorers };
}

// ─── WRITE UPDATED DATA.JS ────────────────────────────────────────────────────
function writeDataFile(matches, standings, featuredMatch, news, topScorers) {
  const updatedAt = new Date().toISOString();

  const content = `// Auto-updated by GOAL26 AI Agent — ${updatedAt}
export const lastUpdated = "${updatedAt}";

export const matches = ${JSON.stringify(matches, null, 2)};

export const featuredMatch = ${JSON.stringify(featuredMatch, null, 2)};

export const standings = ${JSON.stringify(standings, null, 2)};

export const news = ${JSON.stringify(news, null, 2)};

export const topScorers = ${JSON.stringify(topScorers, null, 2)};
`;

  fs.writeFileSync('./src/data.js', content);
  console.log(`✅ data.js updated at ${updatedAt}`);
}

// ─── MAIN AGENT ──────────────────────────────────────────────────────────────
async function runAgent() {
  console.log('🤖 GOAL26 AI Agent starting...');

  const { topScorers } = getCurrentData();

  // 1. Fetch live matches
  console.log('📡 Fetching live scores...');
  let matches = await fetchMatches();

  // 2. Fetch standings
  console.log('📊 Fetching standings...');
  let standings = await fetchStandings();

  // 3. If API fails, read existing data and just update timestamps
  if (!matches) {
    console.log('⚠️  Using fallback match data');
    const content = fs.readFileSync('./src/data.js', 'utf8');
    const matchesMatch = content.match(/export const matches = (\[[\s\S]*?\]);/);
    matches = matchesMatch ? JSON.parse(matchesMatch[1]) : [];
  }

  if (!standings) {
    console.log('⚠️  Using fallback standings data');
    const content = fs.readFileSync('./src/data.js', 'utf8');
    const standingsMatch = content.match(/export const standings = (\[[\s\S]*?\]);/);
    standings = standingsMatch ? JSON.parse(standingsMatch[1]) : [];
  }

  // 4. Generate AI match summary for featured match
  console.log('✦ Generating AI match summary...');
  const liveMatch = matches.find(m => m.status === 'live') || matches[0];
  const aiSummary = await generateMatchSummary(liveMatch);

  const featuredMatch = {
    ...liveMatch,
    homeRecord: 'W2 D0 L0',
    awayRecord: 'W1 D0 L1',
    aiSummary,
  };

  // 5. Generate AI news
  console.log('📰 Generating AI news articles...');
  const news = await generateNews(matches);

  // 6. Write everything to data.js
  writeDataFile(matches, standings, featuredMatch, news, topScorers);

  console.log('🚀 Agent complete! Vercel will redeploy automatically.');
}

runAgent().catch(err => {
  console.error('Agent failed:', err);
  process.exit(1);
});
