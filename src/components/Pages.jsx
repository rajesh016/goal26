import React from 'react';
import MatchCard from './MatchCard';
import StandingsTable from './StandingsTable';
import FeaturedMatch from './FeaturedMatch';
import { featuredMatch, news, topScorers } from '../data';

const site = { maxWidth: 1100, margin: '0 auto', padding: '0 16px' };
const section = { padding: '24px 0' };
const sectionHeader = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 };
const sectionTitle = { fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: '#F0F4FF', letterSpacing: 1 };

function SeeAll({ label, onClick }) {
  return (
    <button onClick={onClick} style={{ fontSize: 12, color: '#FFB800', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
      {label} →
    </button>
  );
}

export function HomePage({ matches, standings, setActivePage }) {
  return (
    <>
      <div style={{ background: '#0A0E1A', borderBottom: '1px solid rgba(255,184,0,0.1)', padding: '32px 0 24px' }}>
        <div style={site}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: '#FFB800', textTransform: 'uppercase', marginBottom: 8 }}>
            FIFA World Cup 2026™ · USA · Canada · Mexico
          </div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(36px,5vw,64px)', color: '#F0F4FF', lineHeight: 1, letterSpacing: 2 }}>
            EVERY GOAL.<br /><span style={{ color: '#FFB800' }}>EVERY MATCH.</span>
          </div>
          <div style={{ fontSize: 14, color: '#8892A4', marginTop: 8 }}>
            Live scores, match summaries, standings & top scorers
          </div>
          <div style={{ display: 'flex', gap: 32, marginTop: 20 }}>
            {[['48', 'Teams'], ['104', 'Matches'], [matches.filter(m => m.status === 'live').length, 'Live Now'], ['32', 'Days Left']].map(([num, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: '#FFB800', lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: 11, color: '#8892A4', textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={site}>
        <div style={section}>
          <FeaturedMatch match={featuredMatch} />
        </div>

        <div style={section}>
          <div style={sectionHeader}>
            <div style={sectionTitle}>Today's <span style={{ color: '#FFB800' }}>Matches</span></div>
            <SeeAll label="See all" onClick={() => setActivePage('matches')} />
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            {matches.slice(0, 5).map(m => <MatchCard key={m.id} match={m} />)}
          </div>
        </div>

        <div style={section}>
          <div style={sectionHeader}>
            <div style={sectionTitle}>Group <span style={{ color: '#FFB800' }}>Standings</span></div>
            <SeeAll label="Full table" onClick={() => setActivePage('standings')} />
          </div>
          <StandingsTable data={standings.slice(0, 5)} />
        </div>
      </div>
    </>
  );
}

export function MatchesPage({ matches }) {
  const live = matches.filter(m => m.status === 'live');
  const ft = matches.filter(m => m.status === 'ft');
  const upcoming = matches.filter(m => m.status === 'upcoming');

  const Section = ({ title, color, items }) => items.length === 0 ? null : (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>{title}</div>
      <div style={{ display: 'grid', gap: 10 }}>{items.map(m => <MatchCard key={m.id} match={m} />)}</div>
    </div>
  );

  return (
    <div style={site}>
      <div style={section}>
        <div style={sectionHeader}>
          <div style={sectionTitle}>All <span style={{ color: '#FFB800' }}>Matches</span></div>
        </div>
        <Section title="● Live Now" color="#E63946" items={live} />
        <Section title="Upcoming" color="#FFB800" items={upcoming} />
        <Section title="Final Results" color="#8892A4" items={ft} />
      </div>
    </div>
  );
}

export function StandingsPage({ standings }) {
  return (
    <div style={site}>
      <div style={section}>
        <div style={sectionHeader}>
          <div style={sectionTitle}>Group <span style={{ color: '#FFB800' }}>Standings</span></div>
        </div>
        <StandingsTable data={standings} />
      </div>
    </div>
  );
}

export function NewsPage() {
  return (
    <div style={site}>
      <div style={section}>
        <div style={sectionHeader}>
          <div style={sectionTitle}>Latest <span style={{ color: '#FFB800' }}>News</span></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
          {news.map(n => (
            <div key={n.id}
              style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: 16, cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,184,0,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#FFB800', marginBottom: 8 }}>{n.tag}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#F0F4FF', lineHeight: 1.4, marginBottom: 8 }}>{n.title}</div>
              <div style={{ fontSize: 12, color: '#8892A4', lineHeight: 1.6 }}>{n.excerpt}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: 11, color: '#8892A4' }}>{n.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ScorersPage() {
  return (
    <div style={site}>
      <div style={section}>
        <div style={sectionHeader}>
          <div style={sectionTitle}>Top <span style={{ color: '#FFB800' }}>Scorers</span></div>
        </div>
        <div style={{ display: 'grid', gap: 8 }}>
          {topScorers.map(s => (
            <div key={s.rank} style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: '#FFB800', minWidth: 28 }}>{s.rank}</div>
              <div style={{ fontSize: 22 }}>{s.flag}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#F0F4FF' }}>{s.name}</div>
                <div style={{ fontSize: 11, color: '#8892A4' }}>{s.team}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, color: '#F0F4FF', lineHeight: 1 }}>{s.goals}</div>
                <div style={{ fontSize: 10, color: '#8892A4' }}>GOALS</div>
              </div>
              <div style={{ textAlign: 'right', minWidth: 40 }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: '#8892A4', lineHeight: 1 }}>{s.assists}</div>
                <div style={{ fontSize: 10, color: '#8892A4' }}>AST</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
