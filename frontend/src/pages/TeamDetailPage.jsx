import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Award, User, Cpu, MapPin, Flag, Star, Trophy } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import DriverCard from '../components/DriverCard';
import CarCard from '../components/CarCard';
import { getTeamById } from '../services/api';

const TeamDetailPage = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchTeam = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await getTeamById(id);
      setTeam(res.data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, [id]);

  if (loading) return <LoadingSpinner message="Loading Team Telemetry Dossier..." />;
  if (error || !team) return <ErrorState title="Team Not Found" message="Could not locate team dossier." onRetry={fetchTeam} />;

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <Link to="/teams" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.85rem' }}>
        <ArrowLeft size={16} /> Back to Constructor Grid
      </Link>

      {/* Hero Card */}
      <div className="glass-panel" style={{ padding: '2.5rem', position: 'relative' }}>
        <div className="accent-stripe" style={{ background: team.color_hex || 'var(--racing-red)', width: '6px' }} />
        
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255,255,255,0.05)',
              border: `2px solid ${team.color_hex || 'var(--racing-red)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem'
            }}>
              {team.logo_symbol || '🏎️'}
            </div>
            <div>
              <span className="badge badge-red" style={{ marginBottom: '0.4rem', background: `${team.color_hex}30`, borderColor: team.color_hex }}>
                {team.code} TEAM PROFILE
              </span>
              <h1 style={{ fontSize: '2.4rem', color: '#FFF' }}>{team.name}</h1>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Flag size={14} /> {team.country}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={14} color="var(--racing-red-light)" /> Base: {team.base}</span>
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '1.5rem',
            background: 'rgba(0,0,0,0.3)',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--bg-card-border)'
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Points</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 900, color: 'var(--telemetry-cyan)' }}>
                {team.points}
              </div>
            </div>
            <div style={{ borderLeft: '1px solid var(--bg-card-border)', paddingLeft: '1.5rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Titles</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 900, color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Award size={20} /> {team.championships_won}
              </div>
            </div>
          </div>
        </div>

        {team.description && (
          <p style={{ marginTop: '1.5rem', fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.7', borderTop: '1px solid var(--bg-card-border)', paddingTop: '1.25rem' }}>
            {team.description}
          </p>
        )}
      </div>

      {/* Technical Specifications */}
      <div>
        <h2 style={{ fontSize: '1.5rem', color: '#FFF', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Cpu color="var(--telemetry-cyan)" size={22} /> Identity & Technical Setup
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem'
        }}>
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Team Principal</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFF', marginTop: '0.25rem' }}>{team.team_principal}</div>
          </div>
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Chassis Designation</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFF', marginTop: '0.25rem' }}>{team.chassis}</div>
          </div>
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Power Unit Package</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFF', marginTop: '0.25rem' }}>{team.power_unit}</div>
          </div>
        </div>
      </div>

      {/* Driver Lineup */}
      {team.drivers && team.drivers.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1.5rem', color: '#FFF', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User color="var(--racing-red)" size={22} /> Official Driver Roster
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {team.drivers.map(driver => (
              <DriverCard key={driver.id} driver={{ ...driver, team_name: team.name, team_color: team.color_hex }} />
            ))}
          </div>
        </div>
      )}

      {/* Car Overview */}
      {team.car && (
        <div>
          <h2 style={{ fontSize: '1.5rem', color: '#FFF', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Trophy color="var(--gold)" size={22} /> Official Challenger Car
          </h2>
          <CarCard car={{ ...team.car, team_name: team.name, color_hex: team.color_hex }} />
        </div>
      )}

      {/* Reviews Section */}
      {team.reviews && team.reviews.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1.5rem', color: '#FFF', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Star color="var(--gold)" size={22} /> Team Paddock Reviews
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {team.reviews.map(rev => (
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

export default TeamDetailPage;
