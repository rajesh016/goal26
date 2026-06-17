import React from 'react';

export default function Footer({ setActivePage }) {
  return (
    <footer style={{ background: '#111827', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px 16px', marginTop: 32 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: '#FFB800' }}>GOAL26</div>
        <div style={{ fontSize: 12, color: '#8892A4' }}>Not affiliated with FIFA · For entertainment purposes only</div>
        <div style={{ display: 'flex', gap: 16 }}>
          <span
            onClick={() => setActivePage('privacy')}
            style={{ fontSize: 12, color: '#8892A4', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Privacy Policy
          </span>
          <span style={{ fontSize: 12, color: '#8892A4', cursor: 'pointer' }}>Advertise</span>
          <span style={{ fontSize: 12, color: '#8892A4', cursor: 'pointer' }}>Contact</span>
        </div>
      </div>
    </footer>
  );
}
