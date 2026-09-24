import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Calendar, MapPin, Flag, Zap, Star, Flame } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import { getRaceById } from '../services/api';

const RaceDetailPage = () => {
  const { id } = useParams();
  const [race, setRace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchRace = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await getRaceById(id);
      setRace(res.data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRace();
  }, [id]);

  if (loading) return <LoadingSpinner message="Loading Grand Prix Classification & Telemetry..." />;
  if (error || !race) return <ErrorState title="Grand Prix Telemetry Not Found" message="Could not locate race details." onRetry={fetchRace} />;

  const isCompleted = race.status === 'Completed';

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <Link to="/races" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.85rem' }}>
        <ArrowLeft size={16} /> Back to Race Calendar
      </Link>

      {/* Hero Panel */}
      <div className="glass-panel" style={{ padding: '2.5rem', position: 'relative' }}>
        <div className="accent-stripe" style={{ background: isCompleted ? 'var(--telemetry-cyan)' : 'var(--racing-red)', width: '6px' }} />

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <span className="badge badge-red">ROUND {race.round_number}</span>
              <span className={`badge ${isCompleted ? 'badge-green' : 'badge-gray'}`}>{race.status}</span>
            </div>
            <h1 style={{ fontSize: '2.6rem', color: '#FFF' }}>{race.grand_prix_name}</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><MapPin size={16} color="var(--racing-red-light)" /> {race.circuit_name}, {race.location_country}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Calendar size={16} color="var(--telemetry-cyan)" /> {new Date(race.race_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Flag size={16} /> {race.total_laps} Laps</span>
            </div>
          </div>

          {isCompleted && race.winner_driver_name && (
            <div style={{
              background: 'rgba(0,0,0,0.3)',
              padding: '1.25rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--gold)',
              boxShadow: '0 0 20px rgba(255,215,0,0.15)'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Trophy size={16} /> Race Winner
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 900, color: '#FFF', marginTop: '0.2rem' }}>
                {race.winner_driver_name}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Top Classification Results Table */}
      {isCompleted && race.results && race.results.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1.5rem', color: '#FFF', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Trophy color="var(--gold)" size={22} /> Official Race Classification
          </h2>

          <div className="glass-panel" style={{ overflowX: 'auto', padding: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--bg-card-border)', color: 'var(--text-dim)', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                  <th style={{ padding: '0.85rem' }}>Pos</th>
                  <th style={{ padding: '0.85rem' }}>Driver</th>
                  <th style={{ padding: '0.85rem' }}>Constructor Team</th>
                  <th style={{ padding: '0.85rem' }}>Grid</th>
                  <th style={{ padding: '0.85rem' }}>Points</th>
                  <th style={{ padding: '0.85rem' }}>Time / Delta</th>
                </tr>
              </thead>
              <tbody>
                {race.results.map((row) => (
                  <tr key={row.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: row.position === 1 ? 'rgba(255,215,0,0.05)' : 'transparent' }}>
                    <td style={{ padding: '0.85rem' }}>
                      <span className={`badge ${row.position === 1 ? 'badge-gold' : row.position <= 3 ? 'badge-cyan' : 'badge-gray'}`}>
                        P{row.position}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem', fontWeight: 700, color: '#FFF' }}>
                      #{row.permanent_number} {row.driver_name}
                      {row.fastest_lap && (
                        <span className="badge badge-red" style={{ marginLeft: '0.5rem', fontSize: '0.65rem' }}>
                          <Flame size={10} /> Fastest Lap
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '0.85rem', color: row.team_color || 'var(--text-muted)' }}>
                      {row.team_name}
                    </td>
                    <td style={{ padding: '0.85rem', color: 'var(--text-dim)' }}>P{row.grid_position}</td>
                    <td style={{ padding: '0.85rem', fontWeight: 800, color: 'var(--telemetry-cyan)' }}>+{row.points_earned}</td>
                    <td style={{ padding: '0.85rem', color: 'var(--text-dim)' }}>{row.race_time_or_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Race Editorial Reviews */}
      {race.reviews && race.reviews.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1.5rem', color: '#FFF', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Star color="var(--gold)" size={22} /> Grand Prix Editorial Analysis
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {race.reviews.map(rev => (
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

export default RaceDetailPage;
