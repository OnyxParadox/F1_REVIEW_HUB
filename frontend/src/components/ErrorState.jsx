import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const ErrorState = ({ title = 'Telemetry Connection Lost', message = 'Could not communicate with backend REST API.', onRetry }) => {
  return (
    <div className="glass-card" style={{
      padding: '3rem 2rem',
      textAlign: 'center',
      maxWidth: '600px',
      margin: '2rem auto',
      borderColor: 'rgba(225, 6, 0, 0.4)'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'rgba(225, 6, 0, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem auto'
      }}>
        <AlertTriangle size={32} color="var(--racing-red)" />
      </div>
      <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-primary">
          <RefreshCw size={16} /> Reconnect Telemetry
        </button>
      )}
    </div>
  );
};

export default ErrorState;
