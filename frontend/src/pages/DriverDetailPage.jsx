import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Flag, Star, Activity, Calendar } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import { getDriverById } from '../services/api';

const DriverDetailPage = () => {
  const { id } = useParams();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchDriver = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await getDriverById(id);
      setDriver(res.data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDriver();
  }, [id]);

  if (loading) return <LoadingSpinner message="Loading Driver Telemetry & Performance Dossier..." />;
  if (error || !driver) return <ErrorState title="Driver Profile Not Found" message="Could not find driver statistics." onRetry={fetchDriver} />;

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <Link to="/drivers" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.85rem' }}>
        <ArrowLeft size={16} /> Back to Drivers Roster
      </Link>

      {/* Driver Profile Hero Card */}
      <div className="glass-panel" style={{ padding: '2.5rem', position: 'relative' }}>
        <div className="accent-stripe" style={{ background: driver.team_color || 'var(--racing-red)', width: '6px' }} />

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(0,0,0,0.6))',
              border: `3px solid ${driver.team_color || 'var(--racing-red)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.8rem',
              boxShadow: '0 0 25px rgba(0,0,0,0.6)'
            }}>
              {driver.avatar_symbol || '👤'}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <span className="badge badge-red">P{driver.championship_position} WORLD STANDINGS</span>
                <span className="badge badge-gold"><Star size={12} fill="currentColor" /> {driver.driver_rating} Rating</span>
              </div>
              <h1 style={{ fontSize: '2.6rem', color: '#FFF', lineHeight: 1.1 }}>{driver.name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                <Flag size={14} /> {driver.nationality} • Team: <strong style={{ color: driver.team_color || '#FFF' }}>{driver.team_name}</strong>
              </div>
            </div>
          </div>

          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '3.5rem',
            fontWeight: 900,
            color: 'rgba(255, 255, 255, 0.15)',
            lineHeight: 1
          }}>
            #{driver.permanent_number}
          </div>
        </div>

        {/* Stats Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '1rem',
          background: 'rgba(0,0,0,0.3)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--bg-card-border)',
          marginTop: '2rem'
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Points</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 900, color: 'var(--telemetry-cyan)' }}>{driver.points}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Race Wins</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 900, color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <Trophy size={18} /> {driver.wins}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Podiums</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 900, color: '#FFF' }}>{driver.podiums}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Pole Positions</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 900, color: 'var(--racing-red-light)' }}>{driver.pole_positions}</div>
          </div>
        </div>

        {/* Biography */}
        {driver.bio && (
          <div style={{ marginTop: '1.75rem', borderTop: '1px solid var(--bg-card-border)', paddingTop: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#FFF', marginBottom: '0.5rem' }}>Biography & Racing Background</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.95rem' }}>{driver.bio}</p>
          </div>
        )}
      </div>

      {/* Recent Race Results */}
      {driver.recent_results && driver.recent_results.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1.5rem', color: '#FFF', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity color="var(--telemetry-cyan)" size={22} /> Recent Race Finishes
          </h2>
          <div className="glass-panel" style={{ overflowX: 'auto', padding: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--bg-card-border)', color: 'var(--text-dim)', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                  <th style={{ padding: '0.75rem' }}>Round</th>
                  <th style={{ padding: '0.75rem' }}>Grand Prix</th>
                  <th style={{ padding: '0.75rem' }}>Circuit</th>
                  <th style={{ padding: '0.75rem' }}>Position</th>
                  <th style={{ padding: '0.75rem' }}>Points</th>
                  <th style={{ padding: '0.75rem' }}>Time / Status</th>
                </tr>
              </thead>
              <tbody>
                {driver.recent_results.map((res, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 700, color: 'var(--racing-red-light)' }}>R{res.round_number}</td>
                    <td style={{ padding: '0.75rem', fontWeight: 700, color: '#FFF' }}>{res.grand_prix_name}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{res.circuit_name}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className={`badge ${res.position === 1 ? 'badge-gold' : res.position <= 3 ? 'badge-cyan' : 'badge-gray'}`}>
                        P{res.position}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', fontWeight: 800, color: 'var(--telemetry-cyan)' }}>+{res.points_earned}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-dim)' }}>{res.race_time_or_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Driver Reviews */}
      {driver.reviews && driver.reviews.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1.5rem', color: '#FFF', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Star color="var(--gold)" size={22} /> Editorial Driver Analysis
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {driver.reviews.map(rev => (
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

export default DriverDetailPage;
