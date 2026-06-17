import React from 'react';

const styles = {
  nav: {
    background: 'rgba(10,14,26,0.97)',
    borderBottom: '1px solid rgba(255,184,0,0.15)',
    padding: '0 16px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backdropFilter: 'blur(8px)',
  },
  inner: {
    maxWidth: 1100,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
  },
  logo: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 24,
    color: '#FFB800',
    letterSpacing: 2,
    cursor: 'pointer',
  },
  logoSpan: { color: '#F0F4FF' },
  tabs: { display: 'flex', gap: 4 },
};

const TABS = ['home', 'matches', 'standings', 'news', 'scorers'];
const LABELS = { home: 'Home', matches: 'Matches', standings: 'Standings', news: 'News', scorers: 'Scorers' };

export default function Navbar({ activePage, setActivePage, liveCount }) {
  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <div style={styles.logo} onClick={() => setActivePage('home')}>
          GOAL<span style={styles.logoSpan}>26</span>
        </div>
        <div style={styles.tabs}>
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActivePage(tab)}
              style={{
                padding: '6px 14px',
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                border: activePage === tab ? '1px solid rgba(255,184,0,0.2)' : '1px solid transparent',
                background: activePage === tab ? 'rgba(255,184,0,0.1)' : 'transparent',
                color: activePage === tab ? '#FFB800' : '#8892A4',
                fontFamily: "'Inter', sans-serif",
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'all 0.2s',
              }}
            >
              {LABELS[tab]}
              {tab === 'matches' && liveCount > 0 && (
                <span style={{
                  background: '#E63946',
                  color: '#fff',
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: 4,
                  animation: 'pulse 1.5s infinite',
                }}>
                  {liveCount} LIVE
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
