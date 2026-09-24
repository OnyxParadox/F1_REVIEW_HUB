import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, MapPin, Flag, Trophy, Zap } from 'lucide-react';

const RaceCard = ({ race }) => {
  const isCompleted = race.status === 'Completed';

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="accent-stripe" style={{ background: isCompleted ? 'var(--telemetry-cyan)' : 'var(--racing-red)' }} />
      
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {/* Round Badge & Status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="badge badge-red">
            ROUND {race.round_number}
          </span>
          <span className={`badge ${isCompleted ? 'badge-green' : 'badge-gray'}`}>
            {race.status}
          </span>
        </div>

        {/* GP Title & Circuit */}
        <div>
          <h3 style={{ fontSize: '1.3rem', color: '#FFF', lineHeight: 1.2 }}>{race.grand_prix_name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            <MapPin size={14} color="var(--racing-red-light)" /> {race.circuit_name}, {race.location_country}
          </div>
        </div>

        {/* Date & Laps */}
        <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Calendar size={14} color="var(--telemetry-cyan)" /> {new Date(race.race_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Flag size={14} /> {race.total_laps} Laps
          </div>
        </div>

        {/* Race Results Snippet */}
        {isCompleted ? (
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '0.75rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.3rem',
            border: '1px solid var(--bg-card-border)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Trophy size={14} color="var(--gold)" /> Winner:
              </span>
              <strong style={{ color: 'var(--gold)' }}>{race.winner_driver_name || 'Driver #1'}</strong>
            </div>
            {race.pole_driver_name && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Zap size={14} color="var(--telemetry-cyan)" /> Pole Position:
                </span>
                <strong style={{ color: 'var(--text-main)' }}>{race.pole_driver_name}</strong>
              </div>
            )}
          </div>
        ) : (
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '0.75rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            textAlign: 'center'
          }}>
            🏁 Upcoming Race Weekend
          </div>
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
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Race Results & Telemetry</span>
        <Link to={`/races/${race.id}`} className="btn btn-primary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.75rem' }}>
          GP Details <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default RaceCard;
