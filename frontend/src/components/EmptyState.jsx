import React from 'react';
import { Flag } from 'lucide-react';

const EmptyState = ({ title = 'No Records Found', message = 'No motorsport data matches your filter criteria.' }) => {
  return (
    <div className="glass-card" style={{
      padding: '3rem 2rem',
      textAlign: 'center',
      margin: '2rem 0',
      color: 'var(--text-muted)'
    }}>
      <Flag size={40} color="var(--text-dim)" style={{ marginBottom: '1rem' }} />
      <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>{title}</h4>
      <p style={{ fontSize: '0.9rem' }}>{message}</p>
    </div>
  );
};

export default EmptyState;
