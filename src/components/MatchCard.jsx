import React from 'react';

export default function MatchCard({ match }) {
  const { home, homeFlag, away, awayFlag, homeScore, awayScore, status, time, group } = match;

  const statusEl = () => {
    if (status === 'live') return (
      <span style={{ fontSize: 11, color: '#E63946', fontWeight: 700, background: 'rgba(230,57,70,0.1)', padding: '3px 8px', borderRadius: 4 }}>
        ● {time}
      </span>
    );
    if (status === 'ft') return (
      <span style={{ fontSize: 11, color: '#8892A4' }}>Full Time</span>
    );
    return (
      <span style={{ fontSize: 11, color: '#FFB800', fontWeight: 600 }}>{time}</span>
    );
  };

  const scoreDisplay = status === 'upcoming'
    ? <span style={{ fontSize: 13, color: '#8892A4' }}>vs</span>
    : <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, color: '#F0F4FF', letterSpacing: 2 }}>{homeScore} - {awayScore}</span>;

  return (
    <div style={{
      background: '#111827',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 10,
      padding: '14px 18px',
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr auto',
      alignItems: 'center',
      gap: 12,
      cursor: 'pointer',
      transition: 'all 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,184,0,0.25)'; e.currentTarget.style.background = '#1C2436'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = '#111827'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 500, color: '#F0F4FF' }}>
        <span style={{ fontSize: 22 }}>{homeFlag}</span> {home}
      </div>
      <div style={{ textAlign: 'center', minWidth: 70 }}>{scoreDisplay}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 500, color: '#F0F4FF', flexDirection: 'row-reverse', textAlign: 'right' }}>
        <span style={{ fontSize: 22 }}>{awayFlag}</span> {away}
      </div>
      <div style={{ textAlign: 'center', minWidth: 80 }}>
        {statusEl()}
        <div style={{ fontSize: 10, color: '#8892A4', marginTop: 3 }}>{group}</div>
      </div>
    </div>
  );
}
