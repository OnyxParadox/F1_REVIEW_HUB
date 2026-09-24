import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import DriverCard from '../components/DriverCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { getDrivers } from '../services/api';

const DriversPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchDriversData = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await getDrivers();
      setDrivers(res.data || []);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDriversData();
  }, []);

  const filteredDrivers = drivers.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.nationality.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (d.team_name && d.team_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    d.permanent_number.toString().includes(searchTerm)
  );

  if (loading) return <LoadingSpinner message="Loading Driver Telemetry Data..." />;
  if (error) return <ErrorState onRetry={fetchDriversData} />;

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
        <span className="badge badge-red" style={{ width: 'fit-content' }}>World Drivers Championship</span>
        <h1 style={{ fontSize: '2.4rem', color: '#FFF' }}>Formula 1 Drivers</h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '700px', fontSize: '1rem', lineHeight: '1.6' }}>
          Explore performance statistics, race wins, podium totals, driver rating scores, and biographies for every competitor on the grid.
        </p>

        {/* Search */}
        <div style={{ position: 'relative', maxWidth: '450px', marginTop: '0.5rem' }}>
          <Search size={18} color="var(--text-dim)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            placeholder="Search driver by name, number, nationality, team..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '2.75rem' }}
          />
        </div>
      </div>

      {/* Grid */}
      {filteredDrivers.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem'
        }}>
          {filteredDrivers.map(driver => (
            <DriverCard key={driver.id} driver={driver} />
          ))}
        </div>
      ) : (
        <EmptyState title="No Drivers Found" message={`No driver matches "${searchTerm}"`} />
      )}
    </div>
  );
};

export default DriversPage;
