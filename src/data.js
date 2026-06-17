export const matches = [
  { id: 1, home: 'Brazil', homeFlag: '🇧🇷', away: 'Colombia', awayFlag: '🇨🇴', homeScore: 2, awayScore: 1, status: 'live', time: "67'", group: 'Group C', venue: 'SoFi Stadium, Los Angeles' },
  { id: 2, home: 'Germany', homeFlag: '🇩🇪', away: 'Japan', awayFlag: '🇯🇵', homeScore: 1, awayScore: 1, status: 'live', time: "54'", group: 'Group E', venue: 'MetLife Stadium, New York' },
  { id: 3, home: 'France', homeFlag: '🇫🇷', away: 'Australia', awayFlag: '🇦🇺', homeScore: 3, awayScore: 0, status: 'live', time: "78'", group: 'Group D', venue: 'AT&T Stadium, Dallas' },
  { id: 4, home: 'Argentina', homeFlag: '🇦🇷', away: 'Chile', awayFlag: '🇨🇱', homeScore: 2, awayScore: 0, status: 'ft', time: 'FT', group: 'Group B', venue: 'Rose Bowl, Los Angeles' },
  { id: 5, home: 'Portugal', homeFlag: '🇵🇹', away: 'USA', awayFlag: '🇺🇸', homeScore: 1, awayScore: 1, status: 'ft', time: 'FT', group: 'Group H', venue: 'Levi\'s Stadium, San Francisco' },
  { id: 6, home: 'England', homeFlag: '🇬🇧', away: 'Iran', awayFlag: '🇮🇷', homeScore: 4, awayScore: 1, status: 'ft', time: 'FT', group: 'Group A', venue: 'BC Place, Vancouver' },
  { id: 7, home: 'Netherlands', homeFlag: '🇳🇱', away: 'Senegal', awayFlag: '🇸🇳', homeScore: null, awayScore: null, status: 'upcoming', time: '21:00', group: 'Group F', venue: 'Estadio Azteca, Mexico City' },
  { id: 8, home: 'Spain', homeFlag: '🇪🇸', away: 'Morocco', awayFlag: '🇲🇦', homeScore: null, awayScore: null, status: 'upcoming', time: '23:00', group: 'Group G', venue: 'BMO Field, Toronto' },
];

export const featuredMatch = {
  home: 'Brazil', homeFlag: '🇧🇷', homeRecord: 'W3 D0 L0',
  away: 'Colombia', awayFlag: '🇨🇴', awayRecord: 'W1 D0 L1',
  homeScore: 2, awayScore: 1,
  time: "67'", group: 'Group C', venue: 'SoFi Stadium, Los Angeles',
  aiSummary: "Brazil are controlling possession in this closely contested Group C encounter. Vinicius Jr. opened the scoring with a stunning 34th-minute curler before Córdoba equalized from the spot. Rodrygo's deflected strike in the 58th minute restored Brazil's lead. Colombia pressing high in the final third — expect a nervy final 20 minutes as they need a win to advance.",
};

export const standings = [
  { pos: 1, flag: '🇧🇷', name: 'Brazil', p: 3, w: 3, d: 0, l: 0, gd: '+7', pts: 9, form: ['w','w','w'] },
  { pos: 2, flag: '🇦🇷', name: 'Argentina', p: 3, w: 2, d: 1, l: 0, gd: '+4', pts: 7, form: ['w','d','w'] },
  { pos: 3, flag: '🇪🇸', name: 'Spain', p: 3, w: 2, d: 0, l: 1, gd: '+2', pts: 6, form: ['w','l','w'] },
  { pos: 4, flag: '🇫🇷', name: 'France', p: 3, w: 1, d: 1, l: 1, gd: '+1', pts: 4, form: ['d','w','l'] },
  { pos: 5, flag: '🇩🇪', name: 'Germany', p: 3, w: 1, d: 1, l: 1, gd: '0', pts: 4, form: ['w','d','l'] },
  { pos: 6, flag: '🇵🇹', name: 'Portugal', p: 3, w: 1, d: 0, l: 2, gd: '-2', pts: 3, form: ['l','w','l'] },
  { pos: 7, flag: '🇺🇸', name: 'USA', p: 3, w: 0, d: 2, l: 1, gd: '-3', pts: 2, form: ['d','l','d'] },
  { pos: 8, flag: '🇬🇧', name: 'England', p: 3, w: 0, d: 0, l: 3, gd: '-9', pts: 0, form: ['l','l','l'] },
];

export const news = [
  { id: 1, tag: 'Match Report', title: "Vinicius Jr. Masterclass Keeps Brazil Perfect in Group C", excerpt: "The Real Madrid star delivered another world-class performance with a goal and two assists as the Seleção remained the tournament's only unbeaten side.", time: '12 min ago' },
  { id: 2, tag: 'Breaking', title: "Germany vs Japan: Group of Death Lives Up to Its Name", excerpt: "An absorbing encounter at MetLife Stadium has fans on the edge of their seats as both sides desperately need a win to stay alive in the competition.", time: '28 min ago' },
  { id: 3, tag: 'Analysis', title: "Mbappé Silences Critics With Hat-Trick Against Australia", excerpt: "The tournament's top scorer showed exactly why he remains football's most feared attacker with a devastating first-half display.", time: '1 hr ago' },
  { id: 4, tag: 'Tactical', title: "How Argentina Use Messi as a False 9 to Unlock Defenses", excerpt: "Our tactical breakdown reveals the subtle positional tweaks Scaloni has made that allow the champions to control matches without dominating possession.", time: '2 hr ago' },
  { id: 5, tag: 'Stats', title: "World Cup 2026 By The Numbers: 47 Goals in 15 Matches", excerpt: "An average of 3.1 goals per game makes this the highest-scoring World Cup since 1954 — and the group stage isn't even over yet.", time: '4 hr ago' },
  { id: 6, tag: 'Preview', title: "Spain vs Morocco: Tonight's Biggest Group Stage Clash", excerpt: "Luis de la Fuente spoke to media ahead of tonight's Group G clash, praising Morocco's defensive organisation as the best he's faced at this level.", time: '5 hr ago' },
];

export const topScorers = [
  { rank: 1, flag: '🇫🇷', name: 'Kylian Mbappé', team: 'France', goals: 6, assists: 3 },
  { rank: 2, flag: '🇦🇷', name: 'Lionel Messi', team: 'Argentina', goals: 5, assists: 4 },
  { rank: 3, flag: '🇧🇷', name: 'Vinicius Jr.', team: 'Brazil', goals: 4, assists: 5 },
  { rank: 4, flag: '🇵🇹', name: 'Cristiano Ronaldo', team: 'Portugal', goals: 4, assists: 1 },
  { rank: 5, flag: '🇩🇪', name: 'Florian Wirtz', team: 'Germany', goals: 3, assists: 2 },
  { rank: 6, flag: '🇳🇱', name: 'Donyell Malen', team: 'Netherlands', goals: 3, assists: 1 },
  { rank: 7, flag: '🇬🇧', name: 'Harry Kane', team: 'England', goals: 2, assists: 2 },
  { rank: 8, flag: '🇪🇸', name: 'Pedri', team: 'Spain', goals: 2, assists: 3 },
];
