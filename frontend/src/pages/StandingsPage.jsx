import React, { useEffect, useState } from 'react';
import { Trophy, Shield, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import { getDriverStandings, getConstructorStandings } from '../services/api';

const StandingsPage = () => {
  const [activeTab, setActiveTab] = useState('drivers');
  const [driverStandings, setDriverStandings] = useState([]);
  const [constructorStandings, setConstructorStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchStandingsData = async () => {
    setLoading(true);
    setError(false);
    try {
      const [dRes, cRes] = await Promise.all([
        getDriverStandings(),
        getConstructorStandings()
      ]);
      setDriverStandings(dRes.data || []);
      setConstructorStandings(cRes.data || []);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStandingsData();
  }, []);

  if (loading) return <LoadingSpinner message="Calculating Championship Points & Position Standings..." />;
  if (error) return <ErrorState onRetry={fetchStandingsData} />;

  // Max points for relative bar visualization
  const maxDriverPoints = driverStandings.length > 0 ? Math.max(...driverStandings.map(d => parseFloat(d.points))) : 300;
  const maxTeamPoints = constructorStandings.length > 0 ? Math.max(...constructorStandings.map(c => parseFloat(c.points))) : 500;

  const renderChangeTag = (change) => {
    if (change > 0) {
      return (
        <span style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.1rem', fontSize: '0.75rem', fontWeight: 800 }}>
          <ArrowUpRight size={14} /> +{change}
        </span>
      );
    } else if (change < 0) {
      return (
        <span style={{ color: 'var(--racing-red-light)', display: 'flex', alignItems: 'center', gap: '0.1rem', fontSize: '0.75rem', fontWeight: 800 }}>
          <ArrowDownRight size={14} /> {change}
        </span>
      );
    }
    return <Minus size={14} color="var(--text-dim)" />;
  };

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
        <span className="badge badge-gold" style={{ width: 'fit-content' }}>2026 Season Dashboard</span>
        <h1 style={{ fontSize: '2.4rem', color: '#FFF' }}>Championship Standings</h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '700px', fontSize: '1rem', lineHeight: '1.6' }}>
          Official 2026 World Championship point tallies, position changes, win counts, and constructor telemetry standings.
        </p>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('drivers')}
            className={`btn ${activeTab === 'drivers' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.6rem 1.25rem' }}
          >
            <Trophy size={16} /> Driver Championship
          </button>
          <button
            onClick={() => setActiveTab('constructors')}
            className={`btn ${activeTab === 'constructors' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.6rem 1.25rem' }}
          >
            <Shield size={16} /> Constructor Championship
          </button>
        </div>
      </div>

      {/* DRIVER CHAMPIONSHIP TABLE */}
      {activeTab === 'drivers' && (
        <div className="glass-panel" style={{ padding: '1.5rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--bg-card-border)', color: 'var(--text-dim)', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                <th style={{ padding: '0.85rem' }}>Pos</th>
                <th style={{ padding: '0.85rem' }}>Trend</th>
                <th style={{ padding: '0.85rem' }}>Driver</th>
                <th style={{ padding: '0.85rem' }}>Team</th>
                <th style={{ padding: '0.85rem' }}>Wins</th>
                <th style={{ padding: '0.85rem' }}>Podiums</th>
                <th style={{ padding: '0.85rem' }}>Poles</th>
                <th style={{ padding: '0.85rem' }}>Points Bar</th>
                <th style={{ padding: '0.85rem', textAlign: 'right' }}>Points</th>
              </tr>
            </thead>
            <tbody>
              {driverStandings.map((row) => {
                const percentage = Math.round((parseFloat(row.points) / maxDriverPoints) * 100);
                return (
                  <tr key={row.id || row.driver_id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.85rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: row.position === 1 ? 'var(--gold)' : '#FFF' }}>
                      P{row.position}
                    </td>
                    <td style={{ padding: '0.85rem' }}>{renderChangeTag(row.position_change)}</td>
                    <td style={{ padding: '0.85rem', fontWeight: 700, color: '#FFF' }}>
                      #{row.permanent_number} {row.driver_name}
                    </td>
                    <td style={{ padding: '0.85rem', color: row.team_color || 'var(--text-muted)' }}>
                      {row.team_name}
                    </td>
                    <td style={{ padding: '0.85rem', color: 'var(--gold)', fontWeight: 700 }}>{row.wins}</td>
                    <td style={{ padding: '0.85rem', color: 'var(--text-main)' }}>{row.podiums}</td>
                    <td style={{ padding: '0.85rem', color: 'var(--racing-red-light)' }}>{row.pole_positions}</td>
                    <td style={{ padding: '0.85rem', width: '220px' }}>
                      <div className="telemetry-bar-bg">
                        <div className="telemetry-bar-fill" style={{ width: `${percentage}%` }} />
                      </div>
                    </td>
                    <td style={{ padding: '0.85rem', textAlign: 'right', fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 900, color: 'var(--telemetry-cyan)' }}>
                      {row.points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* CONSTRUCTOR CHAMPIONSHIP TABLE */}
      {activeTab === 'constructors' && (
        <div className="glass-panel" style={{ padding: '1.5rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--bg-card-border)', color: 'var(--text-dim)', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                <th style={{ padding: '0.85rem' }}>Pos</th>
                <th style={{ padding: '0.85rem' }}>Trend</th>
                <th style={{ padding: '0.85rem' }}>Constructor Team</th>
                <th style={{ padding: '0.85rem' }}>Country</th>
                <th style={{ padding: '0.85rem' }}>Wins</th>
                <th style={{ padding: '0.85rem' }}>Podiums</th>
                <th style={{ padding: '0.85rem' }}>Points Bar</th>
                <th style={{ padding: '0.85rem', textAlign: 'right' }}>Points</th>
              </tr>
            </thead>
            <tbody>
              {constructorStandings.map((row) => {
                const percentage = Math.round((parseFloat(row.points) / maxTeamPoints) * 100);
                return (
                  <tr key={row.id || row.team_id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.85rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: row.position === 1 ? 'var(--gold)' : '#FFF' }}>
                      P{row.position}
                    </td>
                    <td style={{ padding: '0.85rem' }}>{renderChangeTag(row.position_change)}</td>
                    <td style={{ padding: '0.85rem', fontWeight: 700, color: '#FFF' }}>
                      {row.logo_symbol || '🏎️'} {row.team_name}
                    </td>
                    <td style={{ padding: '0.85rem', color: 'var(--text-muted)' }}>{row.country}</td>
                    <td style={{ padding: '0.85rem', color: 'var(--gold)', fontWeight: 700 }}>{row.wins}</td>
                    <td style={{ padding: '0.85rem', color: 'var(--text-main)' }}>{row.podiums}</td>
                    <td style={{ padding: '0.85rem', width: '220px' }}>
                      <div className="telemetry-bar-bg">
                        <div className="telemetry-bar-fill" style={{ width: `${percentage}%` }} />
                      </div>
                    </td>
                    <td style={{ padding: '0.85rem', textAlign: 'right', fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 900, color: 'var(--telemetry-cyan)' }}>
                      {row.points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StandingsPage;
