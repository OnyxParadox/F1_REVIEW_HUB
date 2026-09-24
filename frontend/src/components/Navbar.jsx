import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Flag, Menu, X, Activity } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/teams', label: 'Teams' },
    { path: '/drivers', label: 'Drivers' },
    { path: '/cars', label: 'Cars' },
    { path: '/races', label: 'Races' },
    { path: '/standings', label: 'Standings' },
    { path: '/reviews', label: 'Reviews' },
    { path: '/about', label: 'About' }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'rgba(11, 14, 20, 0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--bg-card-border)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px'
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-sm)',
            background: 'linear-gradient(135deg, var(--racing-red) 0%, #A00000 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px var(--racing-red-glow)'
          }}>
            <Flag color="#FFFFFF" size={24} />
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.4rem',
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}>
              F1 <span style={{ color: 'var(--racing-red)' }}>REVIEW HUB</span>
            </div>
            <div style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              color: 'var(--telemetry-cyan)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              marginTop: '0.15rem'
            }}>
              <Activity size={10} className="glow-animation" /> TELEMETRY & ANALYTICS
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="desktop-nav">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              style={({ isActive }) => ({
                padding: '0.5rem 0.9rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                borderRadius: 'var(--radius-sm)',
                background: isActive ? 'rgba(225, 6, 0, 0.15)' : 'transparent',
                border: isActive ? '1px solid rgba(225, 6, 0, 0.3)' : '1px solid transparent',
                transition: 'var(--transition)'
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-menu-btn"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--bg-card-border)',
            padding: '0.5rem',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-main)',
            display: 'none'
          }}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: 'var(--bg-card)',
          borderBottom: '1px solid var(--bg-card-border)',
          padding: '1rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }} className="mobile-drawer">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              style={({ isActive }) => ({
                padding: '0.75rem 1rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: isActive ? 'var(--racing-red-light)' : 'var(--text-main)',
                background: isActive ? 'rgba(225, 6, 0, 0.1)' : 'transparent',
                borderRadius: 'var(--radius-sm)',
                display: 'block'
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
