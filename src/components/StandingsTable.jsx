import React from 'react';

const col = { textAlign: 'center', color: '#8892A4', fontSize: 13 };

export default function StandingsTable({ data }) {
  return (
    <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr 36px 36px 36px 36px 48px', padding: '10px 16px', background: '#1C2436', fontSize: 11, color: '#8892A4', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', gap: 8 }}>
        <div>#</div><div>Team</div><div style={{ textAlign: 'center' }}>P</div><div style={{ textAlign: 'center' }}>W</div><div style={{ textAlign: 'center' }}>GD</div><div style={{ textAlign: 'center' }}>L</div><div style={{ textAlign: 'center' }}>Pts</div>
      </div>
      {data.map((s, i) => (
        <div key={s.name} style={{ display: 'grid', gridTemplateColumns: '32px 1fr 36px 36px 36px 36px 48px', padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.04)', gap: 8, alignItems: 'center' }}>
          <div style={{ color: s.pos <= 2 ? '#FFB800' : '#8892A4', fontWeight: 600, fontSize: 13 }}>{s.pos}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 500, color: '#F0F4FF' }}>
            <span style={{ fontSize: 16 }}>{s.flag}</span> {s.name}
          </div>
          <div style={col}>{s.p}</div>
          <div style={col}>{s.w}</div>
          <div style={col}>{s.gd}</div>
          <div style={col}>{s.l}</div>
          <div style={{ textAlign: 'center', fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: '#F0F4FF' }}>{s.pts}</div>
        </div>
      ))}
    </div>
  );
}
