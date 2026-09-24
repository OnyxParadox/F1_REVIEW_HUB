import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Gauge, Zap, Shield, Cpu } from 'lucide-react';

const CarCard = ({ car }) => {
  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="accent-stripe" style={{ background: car.color_hex || 'var(--racing-red)' }} />
      
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Header */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: car.color_hex || 'var(--racing-red-light)', textTransform: 'uppercase' }}>
              {car.team_name}
            </span>
            <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>
              ★ {car.rating} Aero Rating
            </span>
          </div>
          <h3 style={{ fontSize: '1.35rem', color: '#FFF' }}>{car.car_name}</h3>
        </div>

        {/* Highlight Telemetry Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.75rem',
          background: 'rgba(0,0,0,0.3)',
          padding: '0.85rem',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--bg-card-border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Gauge size={20} color="var(--racing-red-light)" />
            <div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Top Speed</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: '#FFF' }}>
                {car.top_speed_kph} <span style={{ fontSize: '0.7rem' }}>KM/H</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Zap size={20} color="var(--telemetry-cyan)" />
            <div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>0–100 KM/H</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: '#FFF' }}>
                {car.acceleration_0_100} <span style={{ fontSize: '0.7rem' }}>SEC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Downforce Telemetry Bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
            <span>Aero Efficiency Score</span>
            <strong style={{ color: 'var(--telemetry-cyan)' }}>{car.aero_downforce_score} / 100</strong>
          </div>
          <div className="telemetry-bar-bg">
            <div className="telemetry-bar-fill" style={{ width: `${car.aero_downforce_score}%` }} />
          </div>
        </div>

        {/* Tech Specs Summary */}
        <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Cpu size={14} color="var(--text-dim)" />
            <span>Power Unit: <strong style={{ color: 'var(--text-main)' }}>{car.engine}</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Shield size={14} color="var(--text-dim)" />
            <span>Weight: <strong style={{ color: 'var(--text-main)' }}>{car.weight_kg} KG</strong></span>
          </div>
        </div>
      </div>

      <div style={{
        padding: '0.85rem 1.5rem',
        background: 'rgba(0, 0, 0, 0.3)',
        borderTop: '1px solid var(--bg-card-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Interactive Blueprint</span>
        <Link to={`/cars/${car.id}`} className="btn btn-primary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.75rem' }}>
          Spec Sheet <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
