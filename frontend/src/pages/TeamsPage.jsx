import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import TeamCard from '../components/TeamCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { getTeams } from '../services/api';

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchTeamsData = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await getTeams();
      setTeams(res.data || []);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamsData();
  }, []);

  const filteredTeams = teams.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.team_principal.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner message="Fetching F1 Constructor Teams..." />;
  if (error) return <ErrorState onRetry={fetchTeamsData} />;

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
        <span className="badge badge-red" style={{ width: 'fit-content' }}>Formula 1 Grid</span>
        <h1 style={{ fontSize: '2.4rem', color: '#FFF' }}>Constructor Teams</h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '700px', fontSize: '1rem', lineHeight: '1.6' }}>
          Explore the 2026 Demonstration Season constructor grid. Review team identities, engineering facilities, power unit suppliers, and driver lineups.
        </p>

        {/* Search */}
        <div style={{ position: 'relative', maxWidth: '450px', marginTop: '0.5rem' }}>
          <Search size={18} color="var(--text-dim)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            placeholder="Search team by name, country, principal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '2.75rem' }}
          />
        </div>
      </div>

      {/* Grid */}
      {filteredTeams.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem'
        }}>
          {filteredTeams.map(team => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      ) : (
        <EmptyState title="No Teams Found" message={`No F1 team matches "${searchTerm}"`} />
      )}
    </div>
  );
};

export default TeamsPage;
