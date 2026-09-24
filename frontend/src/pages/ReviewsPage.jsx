import React, { useEffect, useState } from 'react';
import { Star, MessageSquarePlus, Filter, Calendar, User } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import ReviewModal from '../components/ReviewModal';
import { getReviews, getTeams, getDrivers, getCars, getRaces } from '../services/api';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Entities lists for modal dropdowns
  const [teams, setTeams] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [cars, setCars] = useState([]);
  const [races, setRaces] = useState([]);

  const fetchReviewsData = async (cat = activeCategory) => {
    setLoading(true);
    setError(false);
    try {
      const res = await getReviews(cat);
      setReviews(res.data || []);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Load auxiliary data for review form modal
  useEffect(() => {
    Promise.all([
      getTeams().catch(() => ({ data: [] })),
      getDrivers().catch(() => ({ data: [] })),
      getCars().catch(() => ({ data: [] })),
      getRaces().catch(() => ({ data: [] }))
    ]).then(([t, d, c, r]) => {
      setTeams(t.data || []);
      setDrivers(d.data || []);
      setCars(c.data || []);
      setRaces(r.data || []);
    });
  }, []);

  useEffect(() => {
    fetchReviewsData(activeCategory);
  }, [activeCategory]);

  const handleReviewSubmitted = (newReview) => {
    setReviews([newReview, ...reviews]);
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge badge-gold" style={{ width: 'fit-content' }}>Paddock Opinions & Analysis</span>
            <h1 style={{ fontSize: '2.4rem', color: '#FFF', marginTop: '0.4rem' }}>F1 Review System</h1>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
            <MessageSquarePlus size={18} /> Submit Review
          </button>
        </div>

        <p style={{ color: 'var(--text-muted)', maxWidth: '700px', fontSize: '1rem', lineHeight: '1.6' }}>
          Read and publish telemetry reviews across Grand Prix races, driver performances, team pit tactics, and car aerodynamic packages.
        </p>

        {/* Category Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
          {['All', 'Race', 'Driver', 'Team', 'Car'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }}
            >
              <Filter size={12} /> {cat === 'All' ? 'All Reviews' : `${cat} Reviews`}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Content */}
      {loading ? (
        <LoadingSpinner message="Fetching Paddock Reviews..." />
      ) : error ? (
        <ErrorState onRetry={() => fetchReviewsData(activeCategory)} />
      ) : reviews.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem'
        }}>
          {reviews.map((rev) => (
            <div key={rev.id} className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div className="accent-stripe" style={{ background: rev.category === 'Race' ? 'var(--racing-red)' : rev.category === 'Driver' ? 'var(--gold)' : rev.category === 'Team' ? 'var(--telemetry-cyan)' : '#A020F0' }} />

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span className="badge badge-red">{rev.category} Review</span>
                  <div style={{ display: 'flex', gap: '0.15rem' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} color={i < rev.rating ? 'var(--gold)' : 'var(--text-dim)'} fill={i < rev.rating ? 'var(--gold)' : 'none'} />
                    ))}
                  </div>
                </div>

                <h3 style={{ fontSize: '1.25rem', color: '#FFF', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                  {rev.title}
                </h3>

                <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  {rev.review_text}
                </p>
              </div>

              <div style={{
                marginTop: '1.5rem',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: 'var(--text-dim)'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><User size={12} /> {rev.author}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Calendar size={12} /> {new Date(rev.created_at || Date.now()).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title="No Reviews Found" message={`No published reviews for category "${activeCategory}".`} />
      )}

      {/* Review Submission Modal */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReviewSubmitted={handleReviewSubmitted}
        teams={teams}
        drivers={drivers}
        cars={cars}
        races={races}
      />
    </div>
  );
};

export default ReviewsPage;
