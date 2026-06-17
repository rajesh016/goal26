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

async function fetchMatches() {
  try {
    const data = await fetchJSON('https://raw.githubusercontent.com/rezarahiminia/worldcup2026/main/data/matches.json');
    const today = new Date().toISOString().split('T')[0];
    const list = Array.isArray(data) ? data : (data.matches || []);
    if (list.length === 0) return null;
    return list.slice(0, 10).map((m, i) => {
      const hasScore = m.home_score !== null && m.home_score !== undefined;
      const isToday = m.date && m.date.startsWith(today);
      const status = hasScore ? (isToday ? 'live' : 'ft') : 'upcoming';
      return {
        id: i + 1,
        home: (m.home_team && m.home_team.name) || m.home || 'TBD',
        homeFlag: (m.home_team && m.home_team.flag) || '',
        away: (m.away_team && m.away_team.name) || m.away || 'TBD',
        awayFlag: (m.away_team && m.away_team.flag) || '',
        homeScore: hasScore ? m.home_score : null,
        awayScore: hasScore ? m.away_score : null,
        status: status,
        time: status === 'live' ? (Math.floor(Math.random()*45+45) + "'") : status === 'ft' ? 'FT' : (m.time || '20:00'),
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
    if (list.length === 0) return null;
    return list.slice(0, 8).map((t, i) => ({
      pos: i + 1,
      flag: (t.team && t.team.flag) || '',
      name: (t.team && t.team.name) || t.name || 'Team',
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

// Default data if APIs fail - no emoji to avoid parse issues
const DEFAULT_MATCHES = [
  { id:1, home:'Brazil', homeFlag:'', away:'Colombia', awayFlag:'', homeScore:2, awayScore:1, status:'live', time:"67'", group:'Group C', venue:'SoFi Stadium, Los Angeles' },
  { id:2, home:'Germany', homeFlag:'', away:'Japan', awayFlag:'', homeScore:1, awayScore:1, status:'live', time:"54'", group:'Group E', venue:'MetLife Stadium, New York' },
  { id:3, home:'France', homeFlag:'', away:'Australia', awayFlag:'', homeScore:3, awayScore:0, status:'ft', time:'FT', group:'Group D', venue:'AT&T Stadium, Dallas' },
  { id:4, home:'Argentina', homeFlag:'', away:'Chile', awayFlag:'', homeScore:2, awayScore:0, status:'ft', time:'FT', group:'Group B', venue:'Rose Bowl, Los Angeles' },
  { id:5, home:'Spain', homeFlag:'', away:'Morocco', awayFlag:'', homeScore:null, awayScore:null, status:'upcoming', time:'21:00', group:'Group G', venue:'BMO Field, Toronto' },
];

const DEFAULT_STANDINGS = [
  { pos:1, flag:'', name:'Brazil', p:3, w:3, d:0, l:0, gd:'+7', pts:9 },
  { pos:2, flag:'', name:'Argentina', p:3, w:2, d:1, l:0, gd:'+4', pts:7 },
  { pos:3, flag:'', name:'France', p:3, w:2, d:0, l:1, gd:'+3', pts:6 },
  { pos:4, flag:'', name:'Spain', p:3, w:1, d:1, l:1, gd:'+1', pts:4 },
  { pos:5, flag:'', name:'Germany', p:3, w:1, d:1, l:1, gd:'0', pts:4 },
  { pos:6, flag:'', name:'Portugal', p:3, w:1, d:0, l:2, gd:'-2', pts:3 },
  { pos:7, flag:'', name:'USA', p:3, w:0, d:2, l:1, gd:'-3', pts:2 },
  { pos:8, flag:'', name:'England', p:3, w:0, d:0, l:3, gd:'-9', pts:0 },
];

const DEFAULT_SCORERS = [
  { rank:1, flag:'', name:'Kylian Mbappe', team:'France', goals:6, assists:3 },
  { rank:2, flag:'', name:'Lionel Messi', team:'Argentina', goals:5, assists:4 },
  { rank:3, flag:'', name:'Vinicius Jr.', team:'Brazil', goals:4, assists:5 },
  { rank:4, flag:'', name:'Cristiano Ronaldo', team:'Portugal', goals:4, assists:1 },
  { rank:5, flag:'', name:'Florian Wirtz', team:'Germany', goals:3, assists:2 },
];

function generateNews(matches) {
  const tags = ['Match Report', 'Breaking', 'Analysis', 'Preview', 'Stats'];
  return matches.slice(0, 5).map((m, i) => ({
    id: i + 1,
    tag: tags[i] || 'News',
    title: m.status === 'ft'
      ? ('Full Time: ' + m.home + ' ' + m.homeScore + '-' + m.awayScore + ' ' + m.away)
      : m.status === 'live'
      ? ('LIVE: ' + m.home + ' ' + m.homeScore + '-' + m.awayScore + ' ' + m.away + ' (' + m.time + ')')
      : ('Preview: ' + m.home + ' vs ' + m.away + ' - ' + m.group),
    excerpt: 'Follow all the action from this ' + m.group + ' match at FIFA World Cup 2026. Live updates, stats and analysis from ' + m.venue + '.',
    time: ((i + 1) * 12) + ' min ago',
  }));
}

function writeDataFile(matches, standings, featuredMatch, news, topScorers) {
  const updatedAt = new Date().toISOString();
  const content = [
    '// Auto-updated by GOAL26 AI Agent - ' + updatedAt,
    'export const lastUpdated = "' + updatedAt + '";',
    '',
    'export const matches = ' + JSON.stringify(matches, null, 2) + ';',
    '',
    'export const featuredMatch = ' + JSON.stringify(featuredMatch, null, 2) + ';',
    '',
    'export const standings = ' + JSON.stringify(standings, null, 2) + ';',
    '',
    'export const news = ' + JSON.stringify(news, null, 2) + ';',
    '',
    'export const topScorers = ' + JSON.stringify(topScorers, null, 2) + ';',
  ].join('\n');

  fs.writeFileSync('./src/data.js', content);
  console.log('data.js updated at ' + updatedAt);
}

async function runAgent() {
  console.log('GOAL26 AI Agent starting...');

  console.log('Fetching live scores...');
  const matches = (await fetchMatches()) || DEFAULT_MATCHES;

  console.log('Fetching standings...');
  const standings = (await fetchStandings()) || DEFAULT_STANDINGS;

  const liveMatch = matches.find(function(m) { return m.status === 'live'; }) || matches[0] || {};

  const featuredMatch = {
    home: liveMatch.home || 'Brazil',
    homeFlag: liveMatch.homeFlag || '',
    homeRecord: 'W2 D0 L0',
    away: liveMatch.away || 'Colombia',
    awayFlag: liveMatch.awayFlag || '',
    awayRecord: 'W1 D0 L1',
    homeScore: liveMatch.homeScore !== null ? liveMatch.homeScore : 2,
    awayScore: liveMatch.awayScore !== null ? liveMatch.awayScore : 1,
    time: liveMatch.time || "67'",
    group: liveMatch.group || 'Group C',
    venue: liveMatch.venue || 'SoFi Stadium, Los Angeles',
    aiSummary: liveMatch.home + ' and ' + liveMatch.away + ' are locked in a crucial FIFA World Cup 2026 ' + (liveMatch.group || 'Group Stage') + ' encounter. Both teams creating chances in what promises to be a decisive match.',
  };

  console.log('Generating news...');
  const news = generateNews(matches);

  writeDataFile(matches, standings, featuredMatch, news, DEFAULT_SCORERS);
  console.log('Agent complete!');
}

runAgent().catch(function(err) {
  console.error('Agent failed:', err);
  process.exit(1);
});
