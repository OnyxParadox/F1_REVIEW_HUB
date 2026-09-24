import React, { useEffect, useState } from 'react';
import RaceCard from '../components/RaceCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { getRaces } from '../services/api';

const RacesPage = () => {
  const [races, setRaces] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchRacesData = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await getRaces();
      setRaces(res.data || []);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRacesData();
  }, []);

  const filteredRaces = races.filter(r => {
    if (statusFilter === 'Completed') return r.status === 'Completed';
    if (statusFilter === 'Scheduled') return r.status === 'Scheduled';
    return true;
  });

  if (loading) return <LoadingSpinner message="Loading Season Race Calendar..." />;
  if (error) return <ErrorState onRetry={fetchRacesData} />;

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(20,24,36,0.9) 0%, rgba(11,14,20,0.95) 100%)',
        padding: '2.5rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--bg-card-border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <span className="badge badge-gold" style={{ width: 'fit-content' }}>2026 World Championship</span>
        <h1 style={{ fontSize: '2.4rem', color: '#FFF' }}>Race Calendar & Results</h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '700px', fontSize: '1rem', lineHeight: '1.6' }}>
          Follow all 12 Grand Prix rounds across the global circuit calendar. Access official race classifications, winner podiums, pole positions, and circuit laps.
        </p>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          {['All', 'Completed', 'Scheduled'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`btn ${statusFilter === status ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }}
            >
              {status} Races
            </button>
          ))}
        </div>
      </div>

      {/* Races Grid */}
      {filteredRaces.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem'
        }}>
          {filteredRaces.map(race => (
            <RaceCard key={race.id} race={race} />
          ))}
        </div>
      ) : (
        <EmptyState title="No Races Found" message={`No race matches status "${statusFilter}"`} />
      )}
    </div>
  );
};

export default RacesPage;
