const https = require('https');
const fs = require('fs');

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

async function askClaude(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
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
        try { resolve(JSON.parse(data).content[0].text); }
        catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function fetchMatches() {
  try {
    const data = await fetchJSON('https://raw.githubusercontent.com/rezarahiminia/worldcup2026/main/data/matches.json');
    const today = new Date().toISOString().split('T')[0];
    const list = Array.isArray(data) ? data : (data.matches || []);
    return list.slice(0, 10).map((m, i) => {
      const hasScore = m.home_score !== null && m.home_score !== undefined;
      const isToday = m.date && m.date.startsWith(today);
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
        time: status === 'live' ? `${Math.floor(Math.random()*45+45)}'` : status === 'ft' ? 'FT' : (m.time || '20:00'),
        group: m.group || 'Group Stage',
        venue: m.venue || m.stadium || 'USA/Canada/Mexico',
      };
    });
  } catch (e) {
    console.log('Match fetch failed:', e.message);
    return null;
  }
}

async function fetchStandings() {
  try {
    const data = await fetchJSON('https://raw.githubusercontent.com/rezarahiminia/worldcup2026/main/data/standings.json');
    const list = Array.isArray(data) ? data : (data.standings || []);
    return list.slice(0, 8).map((t, i) => ({
      pos: i + 1,
      flag: t.team?.flag || '🏳️',
      name: t.team?.name || t.name || 'Team',
      p: t.played || 0,
      w: t.won || 0,
      d: t.drawn || 0,
      l: t.lost || 0,
      gd: (t.goal_difference >= 0 ? '+' : '') + (t.goal_difference || 0),
      pts: t.points || 0,
    }));
  } catch (e) {
    console.log('Standings fetch failed:', e.message);
    return null;
  }
}

// Read existing data.js using regex — no JSON.parse of JS file
function readExistingData() {
  try {
    const content = fs.readFileSync('./src/data.js', 'utf8');

    // Extract matches array
    const matchBlock = content.match(/export const matches = (\[[\s\S]*?\n\]);/);
    const matches = matchBlock ? JSON.parse(matchBlock[1]) : [];

    // Extract standings array
    const standBlock = content.match(/export const standings = (\[[\s\S]*?\n\]);/);
    const standings = standBlock ? JSON.parse(standBlock[1]) : [];

    // Extract topScorers array
    const scorerBlock = content.match(/export const topScorers = (\[[\s\S]*?\n\]);/);
    const topScorers = scorerBlock ? JSON.parse(scorerBlock[1]) : [];

    // Extract featuredMatch object
    const featBlock = content.match(/export const featuredMatch = (\{[\s\S]*?\n\});/);
    const featuredMatch = featBlock ? JSON.parse(featBlock[1]) : null;

    return { matches, standings, topScorers, featuredMatch };
  } catch (e) {
    console.log('Could not read existing data:', e.message);
    return { matches: [], standings: [], topScorers: [], featuredMatch: null };
  }
}

function generateFallbackNews(matches) {
  const tags = ['Match Report', 'Breaking', 'Analysis', 'Preview', 'Stats', 'Tactical'];
  return matches.slice(0, 5).map((m, i) => ({
    id: i + 1,
    tag: tags[i] || 'News',
    title: m.status === 'ft'
      ? `Full Time: ${m.home} ${m.homeScore}-${m.awayScore} ${m.away}`
      : m.status === 'live'
      ? `LIVE: ${m.home} ${m.homeScore}-${m.awayScore} ${m.away} (${m.time})`
      : `Preview: ${m.home} vs ${m.away} — ${m.group}`,
    excerpt: `Follow all the action from this ${m.group} match at FIFA World Cup 2026. Live updates, stats and analysis from ${m.venue}.`,
    time: `${(i + 1) * 12} min ago`,
  }));
}

function writeDataFile({ matches, standings, featuredMatch, news, topScorers }) {
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

async function runAgent() {
  console.log('🤖 GOAL26 AI Agent starting...');

  // Read existing data first (safe regex approach)
  const existing = readExistingData();

  // Fetch fresh matches
  console.log('📡 Fetching live scores...');
  const freshMatches = await fetchMatches();
  const matches = freshMatches || existing.matches;

  // Fetch fresh standings
  console.log('📊 Fetching standings...');
  const freshStandings = await fetchStandings();
  const standings = freshStandings || existing.standings;

  // Featured match = first live match or first match
  const liveMatch = matches.find(m => m.status === 'live') || matches[0] || {};
  const featuredMatch = {
    ...liveMatch,
    homeRecord: 'W2 D0 L0',
    awayRecord: 'W1 D0 L1',
    aiSummary: existing.featuredMatch?.aiSummary || `${liveMatch.home || 'Team A'} and ${liveMatch.away || 'Team B'} face off in a crucial FIFA World Cup 2026 encounter. Both sides will be eager to secure vital points in what promises to be an exciting match.`,
  };

  // Generate news from match data
  console.log('📰 Generating news...');
  const news = generateFallbackNews(matches);

  // Write updated data
  writeDataFile({
    matches,
    standings,
    featuredMatch,
    news,
    topScorers: existing.topScorers,
  });

  console.log('🚀 Agent complete!');
}

runAgent().catch(err => {
  console.error('Agent failed:', err);
  process.exit(1);
});
