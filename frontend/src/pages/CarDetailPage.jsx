import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Gauge, Zap, Shield, Cpu, ThumbsUp, ThumbsDown, Star, User } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import { getCarById } from '../services/api';

const CarDetailPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCar = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await getCarById(id);
      setCar(res.data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCar();
  }, [id]);

  if (loading) return <LoadingSpinner message="Loading Car Technical Specification Dossier..." />;
  if (error || !car) return <ErrorState title="Car Spec Not Found" message="Could not find vehicle telemetry." onRetry={fetchCar} />;

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <Link to="/cars" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.85rem' }}>
        <ArrowLeft size={16} /> Back to Car Inspector
      </Link>

      {/* Hero Panel */}
      <div className="glass-panel" style={{ padding: '2.5rem', position: 'relative' }}>
        <div className="accent-stripe" style={{ background: car.color_hex || 'var(--racing-red)', width: '6px' }} />

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <span className="badge badge-red">{car.team_name}</span>
              <span className="badge badge-gold"><Star size={12} fill="currentColor" /> {car.rating} Aero Score</span>
            </div>
            <h1 style={{ fontSize: '2.6rem', color: '#FFF' }}>{car.car_name}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.4rem' }}>
              Power Unit: <strong style={{ color: '#FFF' }}>{car.engine}</strong> • Chassis: <strong style={{ color: '#FFF' }}>{car.chassis}</strong>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <div style={{
              background: 'rgba(0,0,0,0.3)',
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--bg-card-border)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Top Speed</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 900, color: 'var(--racing-red-light)' }}>
                {car.top_speed_kph} <span style={{ fontSize: '0.8rem' }}>KM/H</span>
              </div>
            </div>

            <div style={{
              background: 'rgba(0,0,0,0.3)',
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--bg-card-border)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>0–100 Acceleration</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 900, color: 'var(--telemetry-cyan)' }}>
                {car.acceleration_0_100} <span style={{ fontSize: '0.8rem' }}>SEC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Description */}
        {car.description && (
          <p style={{ marginTop: '1.75rem', fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.7', borderTop: '1px solid var(--bg-card-border)', paddingTop: '1.25rem' }}>
            {car.description}
          </p>
        )}
      </div>

      {/* Full Spec Matrix */}
      <div>
        <h2 style={{ fontSize: '1.5rem', color: '#FFF', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Gauge color="var(--telemetry-cyan)" size={22} /> Technical Specification Matrix
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Min Weight</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFF', marginTop: '0.2rem' }}>{car.weight_kg} KG</div>
          </div>
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Wheelbase</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFF', marginTop: '0.2rem' }}>{car.wheelbase_mm} MM</div>
          </div>
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Aero Downforce Index</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--telemetry-cyan)', marginTop: '0.2rem' }}>{car.aero_downforce_score} / 100</div>
          </div>
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {/* Strengths */}
        <div className="glass-panel" style={{ padding: '1.5rem', borderColor: 'rgba(16, 185, 129, 0.4)' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <ThumbsUp size={18} /> Telemetry Strengths
          </h3>
          <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.6' }}>
            {car.strengths || 'High cornering stability and responsive power unit deployment.'}
          </p>
        </div>

        {/* Weaknesses */}
        <div className="glass-panel" style={{ padding: '1.5rem', borderColor: 'rgba(225, 6, 0, 0.4)' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--racing-red-light)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <ThumbsDown size={18} /> Engineering Challenges
          </h3>
          <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.6' }}>
            {car.weaknesses || 'Sensitive thermal tire management window under heavy fuel loads.'}
          </p>
        </div>
      </div>

      {/* Driver Lineup */}
      {car.drivers && car.drivers.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1.5rem', color: '#FFF', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User color="var(--racing-red)" size={22} /> Official Pilots
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {car.drivers.map(d => (
              <Link key={d.id} to={`/drivers/${d.id}`} className="glass-card" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
                <span style={{ fontSize: '1.2rem' }}>👤</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#FFF' }}>#{d.permanent_number} {d.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{d.nationality}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Car Reviews */}
      {car.reviews && car.reviews.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1.5rem', color: '#FFF', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Star color="var(--gold)" size={22} /> Aerodynamic Reviews
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {car.reviews.map(rev => (
              <div key={rev.id} className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', color: '#FFF' }}>{rev.title}</h4>
                  <span className="badge badge-gold">★ {rev.rating}/5</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{rev.review_text}</p>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '1rem' }}>By {rev.author}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetailPage;
