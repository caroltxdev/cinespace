import React from 'react';
import './Header.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle.jsx'; 

const Header = ({ stats, theme, onToggleTheme }) => { 
  return (
    <header className="header">
      <div className="header-content">

        <ThemeToggle theme={theme} onToggle={onToggleTheme} />

        <div className="header-brand">
          <div className="logo">
            <span className="logo-icon">🎬</span>
            <h1 className="logo-text">CineSpace</h1>
          </div>
          <p className="tagline">sua jornada cinematográfica</p>
        </div>

        <div className="header-stats">
          <div className="stat-pill">
            <span className="stat-icon">📊</span>
            <div className="stat-content">
              <span className="stat-number">{stats.total}</span>
              <span className="stat-label">Total</span>
            </div>
          </div>
          
          <div className="stat-pill stat-pill-watched">
            <span className="stat-icon">✓</span>
            <div className="stat-content">
              <span className="stat-number">{stats.watched}</span>
              <span className="stat-label">Assistidos</span>
            </div>
          </div>
          
          <div className="stat-pill stat-pill-want">
            <span className="stat-icon">🎯</span>
            <div className="stat-content">
              <span className="stat-number">{stats.want}</span>
              <span className="stat-label">Na Lista</span>
            </div>
          </div>
        </div>
      </div>
      <div className="header-line"></div>
    </header>
  );
};

export default Header;
