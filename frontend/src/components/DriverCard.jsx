import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Trophy, Flag, Star } from 'lucide-react';

const DriverCard = ({ driver }) => {
  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="accent-stripe" style={{ background: driver.team_color || 'var(--racing-red)' }} />
      
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Driver Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(0,0,0,0.5))',
              border: `2px solid ${driver.team_color || 'var(--racing-red)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}>
              {driver.avatar_symbol || '👤'}
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--racing-red-light)', textTransform: 'uppercase' }}>
                P{driver.championship_position || '-'} Standings
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#FFF', lineHeight: 1.2 }}>{driver.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                <Flag size={12} /> {driver.nationality} • <span style={{ color: driver.team_color || 'var(--text-main)' }}>{driver.team_name}</span>
              </div>
            </div>
          </div>
          
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.5rem',
            fontWeight: 900,
            color: 'rgba(255, 255, 255, 0.25)',
            letterSpacing: '-0.05em'
          }}>
            #{driver.permanent_number}
          </div>
        </div>

        {/* Rating Meter */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          padding: '0.65rem 0.9rem',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Driver Index Score
          </span>
          <span className="badge badge-gold" style={{ fontSize: '0.85rem' }}>
            <Star size={12} fill="currentColor" /> {driver.driver_rating} / 10
          </span>
        </div>

        {/* Driver Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.5rem',
          textAlign: 'center',
          background: 'rgba(20, 24, 36, 0.6)',
          padding: '0.75rem',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--bg-card-border)'
        }}>
          <div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Points</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--telemetry-cyan)' }}>
              {driver.points}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Wins</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}>
              <Trophy size={12} /> {driver.wins}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Podiums</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: '#FFF' }}>
              {driver.podiums}
            </div>
          </div>
        </div>

        {driver.bio && (
          <p style={{ fontSize: '0.825rem', color: 'var(--text-dim)', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {driver.bio}
          </p>
        )}
      </div>

      <div style={{
        padding: '0.85rem 1.5rem',
        background: 'rgba(0, 0, 0, 0.3)',
        borderTop: '1px solid var(--bg-card-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Career Telemetry</span>
        <Link to={`/drivers/${driver.id}`} className="btn btn-primary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.75rem' }}>
          Profile <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default DriverCard;
