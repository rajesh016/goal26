import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { HomePage, MatchesPage, StandingsPage, NewsPage, ScorersPage } from './components/Pages';
import { matches, standings } from './data';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const liveCount = matches.filter(m => m.status === 'live').length;

  const renderPage = () => {
    switch (activePage) {
      case 'home':      return <HomePage matches={matches} standings={standings} setActivePage={setActivePage} />;
      case 'matches':   return <MatchesPage matches={matches} />;
      case 'standings': return <StandingsPage standings={standings} />;
      case 'news':      return <NewsPage />;
      case 'scorers':   return <ScorersPage />;
      default:          return <HomePage matches={matches} standings={standings} setActivePage={setActivePage} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0A0E1A; }
        button { font-family: 'Inter', sans-serif; }
      `}</style>
      <Navbar activePage={activePage} setActivePage={setActivePage} liveCount={liveCount} />
      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}
