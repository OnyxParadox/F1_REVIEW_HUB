import React from 'react';

const StatCard = ({ icon: Icon, title, value, subtitle, accentColor = 'var(--racing-red)' }) => {
  return (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
      <div style={{
        width: '54px',
        height: '54px',
        borderRadius: 'var(--radius-md)',
        background: `rgba(${accentColor === 'var(--racing-red)' ? '225, 6, 0' : '0, 229, 255'}, 0.15)`,
        border: `1px solid ${accentColor}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 0 15px ${accentColor === 'var(--racing-red)' ? 'var(--racing-red-glow)' : 'rgba(0, 229, 255, 0.3)'}`
      }}>
        <Icon size={26} color={accentColor} />
      </div>
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
          {title}
        </div>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 900, color: '#FFF', lineHeight: 1.1, margin: '0.2rem 0' }}>
          {value}
        </div>
        {subtitle && (
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
