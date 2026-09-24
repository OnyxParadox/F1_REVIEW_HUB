import React, { useEffect, useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import CarCard from '../components/CarCard';
import InteractiveCarViewer from '../components/InteractiveCarViewer';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { getCars } from '../services/api';

const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCarsData = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await getCars();
      setCars(res.data || []);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarsData();
  }, []);

  const filteredCars = cars.filter(c =>
    c.car_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.team_name && c.team_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    c.engine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner message="Loading Aerodynamic & Telemetry Specs..." />;
  if (error) return <ErrorState onRetry={fetchCarsData} />;

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
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
        <span className="badge badge-cyan" style={{ width: 'fit-content' }}>
          <Sparkles size={12} /> Technical Blueprint Inspector
        </span>
        <h1 style={{ fontSize: '2.4rem', color: '#FFF' }}>F1 Hybrid Cars & Engineering</h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '750px', fontSize: '1rem', lineHeight: '1.6' }}>
          Examine top speeds, 0-100 km/h acceleration, chassis monocoque compositions, power unit specs, and aerodynamic downforce scores for all 2026 grid challengers.
        </p>

        {/* Search */}
        <div style={{ position: 'relative', maxWidth: '450px', marginTop: '0.5rem' }}>
          <Search size={18} color="var(--text-dim)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            placeholder="Search car by name, team, power unit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '2.75rem' }}
          />
        </div>
      </div>

      {/* Interactive Blueprint Viewer Component */}
      {cars.length > 0 && <InteractiveCarViewer car={cars[0]} />}

      {/* Car Grid Header */}
      <div>
        <h2 style={{ fontSize: '1.6rem', color: '#FFF', marginBottom: '1.25rem' }}>2026 Grid Cars Dossier</h2>
        {filteredCars.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}>
            {filteredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <EmptyState title="No F1 Cars Found" message={`No car matches "${searchTerm}"`} />
        )}
      </div>
    </div>
  );
};

export default CarsPage;
