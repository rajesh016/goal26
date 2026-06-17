import React, { useState, useEffect } from 'react';

export default function FeaturedMatch({ match }) {
  const [minute, setMinute] = useState(parseInt(match.time));

  useEffect(() => {
    const interval = setInterval(() => {
      setMinute(m => m < 90 ? m + 1 : m);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      background: '#111827',
      border: '1px solid rgba(255,184,0,0.15)',
      borderRadius: 12,
      padding: 24,
      position: 'relative',
      overflow: 'hidden',
      marginBottom: 24,
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #FFB800, #E63946)' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <div style={{ width: 8, height: 8, background: '#E63946', borderRadius: '50%' }} />
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: '#FFB800', textTransform: 'uppercase' }}>
          Live Now — {match.group}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 56 }}>{match.homeFlag}</div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: '#F0F4FF', letterSpacing: 1 }}>{match.home}</div>
          <div style={{ fontSize: 11, color: '#8892A4' }}>{match.homeRecord}</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 72, color: '#F0F4FF', lineHeight: 1, letterSpacing: 4 }}>
            {match.homeScore}<span style={{ color: '#FFB800' }}> : </span>{match.awayScore}
          </div>
          <div style={{ fontSize: 13, color: '#E63946', fontWeight: 700, marginTop: 4 }}>{minute}'</div>
          <div style={{ fontSize: 11, color: '#8892A4', marginTop: 2 }}>{match.venue}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 56 }}>{match.awayFlag}</div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: '#F0F4FF', letterSpacing: 1 }}>{match.away}</div>
          <div style={{ fontSize: 11, color: '#8892A4' }}>{match.awayRecord}</div>
        </div>
      </div>

      <div style={{ background: '#1C2436', border: '1px solid rgba(255,184,0,0.15)', borderRadius: 10, padding: 16, marginTop: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ width: 28, height: 28, background: 'rgba(255,184,0,0.15)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>✦</div>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#FFB800' }}>Match Summary</span>
        </div>
        <p style={{ fontSize: 13, color: '#CBD5E1', lineHeight: 1.7 }}>{match.aiSummary}</p>
      </div>
    </div>
  );
}
