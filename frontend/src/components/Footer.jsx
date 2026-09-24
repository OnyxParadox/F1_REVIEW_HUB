import React from 'react';
import { Flag, Server, Shield, Layers } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      background: '#07090D',
      borderTop: '1px solid var(--bg-card-border)',
      padding: '3rem 0 2rem 0',
      marginTop: '4rem',
      color: 'var(--text-muted)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem'
        }}>
          {/* Column 1: Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <Flag color="var(--racing-red)" size={22} />
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#FFF' }}>
                F1 <span style={{ color: 'var(--racing-red)' }}>REVIEW HUB</span>
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
              A high-performance motorsport telemetry, review, and analytics dashboard built as a DevOps Docker + AWS EC2 Capstone Project.
            </p>
          </div>

          {/* Column 2: Tech Stack */}
          <div>
            <h4 style={{ fontSize: '0.9rem', color: '#FFF', marginBottom: '1rem', letterSpacing: '0.05em' }}>
              <Layers size={14} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} />
              Architecture Stack
            </h4>
            <ul style={{ listStyle: 'none', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>• Frontend: React 18 + Vite</li>
              <li>• Backend: Node.js + Express REST API</li>
              <li>• Database: PostgreSQL</li>
              <li>• Containerization: Docker & Docker Compose</li>
            </ul>
          </div>

          {/* Column 3: DevOps Capstone */}
          <div>
            <h4 style={{ fontSize: '0.9rem', color: '#FFF', marginBottom: '1rem', letterSpacing: '0.05em' }}>
              <Server size={14} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} />
              Deployment Ready
            </h4>
            <p style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
              Configured with isolated healthcheck endpoints, persistent database volumes, environment variables, and AWS EC2 deployment readiness.
            </p>
          </div>
        </div>

        {/* Disclaimer Footer Box */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.8rem',
          color: 'var(--text-dim)',
          lineHeight: '1.5'
        }}>
          <Shield size={24} color="var(--racing-red)" style={{ flexShrink: 0 }} />
          <div>
            <strong style={{ color: 'var(--text-muted)' }}>Educational Disclaimer:</strong> F1 Review Hub is a fan-made educational demonstration project created specifically for learning DevOps containerization. It is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Formula 1, Formula One Management (FOM), FIA, or any F1 team or driver. All trademarks and logos belong to their respective owners.
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          fontSize: '0.75rem',
          color: 'var(--text-dim)',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '1.5rem'
        }}>
          © {new Date().getFullYear()} F1 Review Hub — DevOps Docker Capstone Project.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
