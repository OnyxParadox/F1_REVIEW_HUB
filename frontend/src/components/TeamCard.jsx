import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Award, User, Cpu, Flag } from 'lucide-react';

const TeamCard = ({ team }) => {
  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="accent-stripe" style={{ background: team.color_hex || 'var(--racing-red)' }} />
      
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${team.color_hex || 'var(--bg-card-border)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}>
              {team.logo_symbol || '🏎️'}
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#FFF', lineHeight: 1.2 }}>{team.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                <Flag size={12} /> {team.country}
              </div>
            </div>
          </div>
          <span className="badge badge-red" style={{ background: `${team.color_hex}25`, borderColor: team.color_hex, color: '#FFF' }}>
            {team.code}
          </span>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.75rem',
          background: 'rgba(0, 0, 0, 0.25)',
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Points</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--telemetry-cyan)' }}>
              {team.points} PTS
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Titles</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Award size={14} /> {team.championships_won}
            </div>
          </div>
        </div>

        {/* Info List */}
        <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <User size={14} color="var(--text-dim)" />
            <span>Principal: <strong style={{ color: 'var(--text-main)' }}>{team.team_principal}</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Cpu size={14} color="var(--text-dim)" />
            <span>Car & Engine: <strong style={{ color: 'var(--text-main)' }}>{team.chassis} ({team.power_unit})</strong></span>
          </div>
        </div>

        {/* Drivers Badges */}
        {team.drivers && team.drivers.length > 0 && (
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              Driver Lineup
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {team.drivers.map(d => (
                <span key={d.id} className="badge badge-gray">
                  {d.avatar_symbol || '👤'} #{d.permanent_number || ''} {d.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description snippet */}
        {team.description && (
          <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {team.description}
          </p>
        )}
      </div>

      {/* Footer Link */}
      <div style={{
        padding: '0.85rem 1.5rem',
        background: 'rgba(0, 0, 0, 0.3)',
        borderTop: '1px solid var(--bg-card-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Explore Telemetry</span>
        <Link to={`/teams/${team.id}`} className="btn btn-primary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.75rem' }}>
          Details <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default TeamCard;
