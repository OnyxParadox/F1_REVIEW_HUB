import React from 'react';
import { Server, Layers, Cpu, Shield, Database, Boxes, CheckCircle2, ArrowRight } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Hero Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(20,24,36,0.9) 0%, rgba(11,14,20,0.95) 100%)',
        padding: '2.5rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--bg-card-border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <span className="badge badge-red" style={{ width: 'fit-content' }}>DevOps Capstone Project</span>
        <h1 style={{ fontSize: '2.4rem', color: '#FFF' }}>About F1 Review Hub</h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '750px', fontSize: '1.05rem', lineHeight: '1.7' }}>
          <strong>F1 Review Hub</strong> is a full-stack Formula 1 motorsport telemetry and analytics platform built specifically as a <strong>DevOps Docker + AWS EC2 Capstone Project</strong>.
        </p>
      </div>

      {/* 3-Tier Architecture Diagram Section */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#FFF', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layers color="var(--telemetry-cyan)" size={22} /> 3-Tier Application Architecture
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.6' }}>
          The system follows a clean 3-tier decoupling model fully containerized using Docker Compose:
        </p>

        {/* Visual Architecture Diagram */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          alignItems: 'center'
        }}>
          {/* Tier 1: Frontend */}
          <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', borderColor: 'var(--telemetry-cyan)' }}>
            <div style={{ background: 'rgba(0, 229, 255, 0.15)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <Layers size={24} color="var(--telemetry-cyan)" />
            </div>
            <h3 style={{ fontSize: '1.1rem', color: '#FFF' }}>Tier 1: Frontend</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              React 18 + Vite SPA served via Nginx Production Web Server (Port 80)
            </p>
          </div>

          <div style={{ textAlign: 'center', color: 'var(--racing-red-light)', fontWeight: 800 }}>
            <ArrowRight size={24} style={{ display: 'inline-block' }} />
          </div>

          {/* Tier 2: Backend */}
          <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', borderColor: 'var(--racing-red)' }}>
            <div style={{ background: 'rgba(225, 6, 0, 0.15)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <Server size={24} color="var(--racing-red)" />
            </div>
            <h3 style={{ fontSize: '1.1rem', color: '#FFF' }}>Tier 2: Backend API</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              Node.js + Express REST API with Controllers, Routes, and Health Checks (Port 5000)
            </p>
          </div>

          <div style={{ textAlign: 'center', color: 'var(--racing-red-light)', fontWeight: 800 }}>
            <ArrowRight size={24} style={{ display: 'inline-block' }} />
          </div>

          {/* Tier 3: Database */}
          <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', borderColor: 'var(--gold)' }}>
            <div style={{ background: 'rgba(255, 215, 0, 0.15)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <Database size={24} color="var(--gold)" />
            </div>
            <h3 style={{ fontSize: '1.1rem', color: '#FFF' }}>Tier 3: Database</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              PostgreSQL Database with Persistent Storage Volume & Auto-Seeding (Port 5432)
            </p>
          </div>
        </div>
      </div>

      {/* Technology Stack Grid */}
      <div>
        <h2 style={{ fontSize: '1.5rem', color: '#FFF', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Cpu color="var(--racing-red)" size={22} /> Technology Stack Specifications
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--telemetry-cyan)', marginBottom: '0.75rem' }}>Frontend Layer</h4>
            <ul style={{ listStyle: 'none', fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>• React 18 & Vite</li>
              <li>• JavaScript (ES6+) & HTML5/CSS3</li>
              <li>• Axios for REST API calls</li>
              <li>• React Router v6 for SPA routing</li>
              <li>• Lucide React icons for UI visuals</li>
            </ul>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--racing-red-light)', marginBottom: '0.75rem' }}>Backend REST Layer</h4>
            <ul style={{ listStyle: 'none', fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>• Node.js & Express.js</li>
              <li>• Modular MVC Architecture</li>
              <li>• `pg` (node-postgres) driver</li>
              <li>• Morgan logger & Helmet security</li>
              <li>• `/api/health` healthcheck endpoint</li>
            </ul>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>Database & DevOps</h4>
            <ul style={{ listStyle: 'none', fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>• PostgreSQL relational database</li>
              <li>• Docker multi-stage Dockerfiles</li>
              <li>• Docker Compose orchestration</li>
              <li>• `postgres-data` named persistent volume</li>
              <li>• Environment variable config</li>
            </ul>
          </div>
        </div>
      </div>

      {/* DevOps AWS Readiness Highlights */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#FFF', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield color="#10B981" size={22} /> DevOps & AWS EC2 Readiness
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
            <CheckCircle2 color="#10B981" size={20} style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#FFF', fontSize: '0.95rem' }}>Isolated Docker Containers</strong>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>Frontend, Backend, and Database run in separate container networks.</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
            <CheckCircle2 color="#10B981" size={20} style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#FFF', fontSize: '0.95rem' }}>Healthcheck Dependencies</strong>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>Backend waits for DB `service_healthy` before accepting requests.</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
            <CheckCircle2 color="#10B981" size={20} style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#FFF', fontSize: '0.95rem' }}>Data Volume Persistence</strong>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>PostgreSQL data survives container restarts (`docker compose down`).</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
            <CheckCircle2 color="#10B981" size={20} style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#FFF', fontSize: '0.95rem' }}>AWS EC2 Portable</strong>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>Ready for `git clone` and `docker compose up --build` on Linux EC2 instances.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
