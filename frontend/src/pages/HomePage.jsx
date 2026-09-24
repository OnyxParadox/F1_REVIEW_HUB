import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Trophy, Flag, Shield, Activity, Star, Calendar, MapPin, Gauge } from 'lucide-react';
import StatCard from '../components/StatCard';
import TeamCard from '../components/TeamCard';
import CarCard from '../components/CarCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import { getTeams, getDrivers, getCars, getRaces, getDriverStandings, getConstructorStandings, getReviews } from '../services/api';

const HomePage = () => {
  const [teams, setTeams] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [cars, setCars] = useState([]);
  const [races, setRaces] = useState([]);
  const [driverStandings, setDriverStandings] = useState([]);
  const [constructorStandings, setConstructorStandings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const [tRes, dRes, cRes, rRes, dsRes, csRes, revRes] = await Promise.all([
        getTeams().catch(() => ({ data: [] })),
        getDrivers().catch(() => ({ data: [] })),
        getCars().catch(() => ({ data: [] })),
        getRaces().catch(() => ({ data: [] })),
        getDriverStandings().catch(() => ({ data: [] })),
        getConstructorStandings().catch(() => ({ data: [] })),
        getReviews().catch(() => ({ data: [] }))
      ]);

      setTeams(tRes.data || []);
      setDrivers(dRes.data || []);
      setCars(cRes.data || []);
      setRaces(rRes.data || []);
      setDriverStandings(dsRes.data || []);
      setConstructorStandings(csRes.data || []);
      setReviews(revRes.data || []);
    } catch (err) {
      console.error('Error fetching home data:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner message="Initializing Motorsport Telemetry..." />;
  if (error) return <ErrorState onRetry={fetchData} />;

  // Latest race
  const completedRaces = races.filter(r => r.status === 'Completed');
  const latestRace = completedRaces.length > 0 ? completedRaces[completedRaces.length - 1] : races[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{
        position: 'relative',
        padding: '5rem 0 4rem 0',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, rgba(20, 24, 36, 0.95) 0%, rgba(11, 14, 20, 0.98) 100%)',
        border: '1px solid var(--bg-card-border)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        overflow: 'hidden'
      }}>
        {/* Background glow and subtle speed lines */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, var(--racing-red-glow) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '800px' }}>
            <span className="badge badge-red" style={{ marginBottom: '1rem', fontSize: '0.8rem' }}>
              <Activity size={12} className="glow-animation" /> 2026 World Championship Telemetry
            </span>
            <h1 style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              color: '#FFFFFF',
              lineHeight: 1.08,
              marginBottom: '1.25rem',
              letterSpacing: '-0.03em'
            }}>
              The Season. The Teams.<br />
              <span style={{ color: 'var(--racing-red)' }}>The Drivers.</span> The Machines.
            </h1>
            <p style={{
              fontSize: '1.15rem',
              color: 'var(--text-muted)',
              lineHeight: '1.6',
              marginBottom: '2rem',
              maxWidth: '680px'
            }}>
              Welcome to <strong>F1 Review Hub</strong> — the ultimate high-performance motorsport platform for telemetry, race analysis, car aerodynamic breakdowns, and championship standings.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Link to="/races" className="btn btn-primary">
                Explore Season <ChevronRight size={18} />
              </Link>
              <Link to="/standings" className="btn btn-secondary">
                View Standings
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED STATISTICS COUNTER BAR */}
      <section className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem'
        }}>
          <StatCard icon={Shield} title="Constructors" value={teams.length || 5} subtitle="2026 Grid Teams" accentColor="var(--racing-red)" />
          <StatCard icon={Flag} title="Active Drivers" value={drivers.length || 10} subtitle="World Championship" accentColor="var(--telemetry-cyan)" />
          <StatCard icon={Calendar} title="Grand Prix Races" value={races.length || 12} subtitle="2026 Calendar" accentColor="var(--gold)" />
          <StatCard icon={Gauge} title="Current Season" value="2026" subtitle="Hybrid Power Era" accentColor="var(--racing-red)" />
        </div>
      </section>

      {/* 3. LATEST RACE WIDGET */}
      {latestRace && (
        <section className="container">
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--bg-card-border)', paddingBottom: '1rem' }}>
              <div>
                <span className="badge badge-green" style={{ marginBottom: '0.35rem' }}>Most Recent Grand Prix</span>
                <h2 style={{ fontSize: '1.8rem', color: '#FFF' }}>{latestRace.grand_prix_name}</h2>
              </div>
              <Link to={`/races/${latestRace.id}`} className="btn btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
                Full Race Telemetry <ChevronRight size={14} />
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                  <MapPin size={16} color="var(--racing-red)" /> {latestRace.circuit_name}, {latestRace.location_country}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                  <Calendar size={16} color="var(--telemetry-cyan)" /> {new Date(latestRace.race_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </div>

              {/* Podium Showcase */}
              <div style={{
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--bg-card-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Trophy size={14} /> Winner Podium
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF' }}>
                  🥇 {latestRace.winner_driver_name || 'Maximus Vance'}
                </div>
                {latestRace.pole_driver_name && (
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    ⚡ Pole Position: <strong style={{ color: 'var(--telemetry-cyan)' }}>{latestRace.pole_driver_name}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. DRIVER & CONSTRUCTOR STANDINGS PREVIEW (TOP 5) */}
      <section className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
          
          {/* Driver Standings Top 5 */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Trophy size={20} color="var(--gold)" /> Driver Standings
              </h3>
              <Link to="/standings" style={{ fontSize: '0.8rem', color: 'var(--racing-red-light)', fontWeight: 700 }}>
                View All
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {driverStandings.slice(0, 5).map(d => (
                <div key={d.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  borderLeft: `4px solid ${d.team_color || 'var(--racing-red)'}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, color: d.position === 1 ? 'var(--gold)' : 'var(--text-muted)', width: '20px' }}>
                      P{d.position}
                    </span>
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFF' }}>{d.driver_name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{d.team_name}</div>
                    </div>
                  </div>
                  <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--telemetry-cyan)' }}>
                    {d.points} PTS
                  </strong>
                </div>
              ))}
            </div>
          </div>

          {/* Constructor Standings Top 5 */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Shield size={20} color="var(--racing-red)" /> Constructor Standings
              </h3>
              <Link to="/standings" style={{ fontSize: '0.8rem', color: 'var(--racing-red-light)', fontWeight: 700 }}>
                View All
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {constructorStandings.slice(0, 5).map(t => (
                <div key={t.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  borderLeft: `4px solid ${t.team_color || 'var(--racing-red)'}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, color: t.position === 1 ? 'var(--gold)' : 'var(--text-muted)', width: '20px' }}>
                      P{t.position}
                    </span>
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFF' }}>{t.team_name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{t.country}</div>
                    </div>
                  </div>
                  <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--telemetry-cyan)' }}>
                    {t.points} PTS
                  </strong>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5. FEATURED TEAMS SECTION */}
      <section className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <span className="badge badge-red">Championship Grid</span>
            <h2 style={{ fontSize: '1.8rem', color: '#FFF', marginTop: '0.2rem' }}>Featured F1 Teams</h2>
          </div>
          <Link to="/teams" className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>
            All Teams <ChevronRight size={14} />
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {teams.slice(0, 3).map(team => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </section>

      {/* 6. FEATURED CARS SECTION */}
      <section className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <span className="badge badge-cyan">Aerodynamics & Power</span>
            <h2 style={{ fontSize: '1.8rem', color: '#FFF', marginTop: '0.2rem' }}>Featured F1 Machines</h2>
          </div>
          <Link to="/cars" className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>
            Car Inspector <ChevronRight size={14} />
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {cars.slice(0, 3).map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* 7. LATEST REVIEWS SECTION */}
      <section className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <span className="badge badge-gold">Paddock Editorial</span>
            <h2 style={{ fontSize: '1.8rem', color: '#FFF', marginTop: '0.2rem' }}>Latest Reviews & Analysis</h2>
          </div>
          <Link to="/reviews" className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>
            All Reviews <ChevronRight size={14} />
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {reviews.slice(0, 3).map(rev => (
            <div key={rev.id} className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className="badge badge-red">{rev.category}</span>
                <div style={{ display: 'flex', gap: '0.15rem' }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} color="var(--gold)" fill="var(--gold)" />
                  ))}
                </div>
              </div>
              <h3 style={{ fontSize: '1.1rem', color: '#FFF', marginBottom: '0.5rem', lineHeight: 1.3 }}>{rev.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {rev.review_text}
              </p>
              <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-dim)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.65rem' }}>
                By <strong>{rev.author}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default HomePage;
