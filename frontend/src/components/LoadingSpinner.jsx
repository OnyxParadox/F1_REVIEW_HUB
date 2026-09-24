import React from 'react';
import { Gauge } from 'lucide-react';

const LoadingSpinner = ({ message = 'Loading Telemetry...' }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      gap: '1rem',
      color: 'var(--text-muted)'
    }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Gauge size={48} color="var(--racing-red)" className="glow-animation" />
        <div style={{
          position: 'absolute',
          width: '64px',
          height: '64px',
          border: '3px solid transparent',
          borderTopColor: 'var(--telemetry-cyan)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      </div>
      <p style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '0.9rem',
        fontWeight: '700',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--text-main)'
      }}>{message}</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
