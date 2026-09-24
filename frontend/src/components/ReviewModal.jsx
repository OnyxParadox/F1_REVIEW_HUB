import React, { useState } from 'react';
import { X, Star, Send } from 'lucide-react';
import { createReview } from '../services/api';

const ReviewModal = ({ isOpen, onClose, onReviewSubmitted, teams = [], drivers = [], cars = [], races = [] }) => {
  const [category, setCategory] = useState('Race');
  const [subjectId, setSubjectId] = useState('1');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  // Get subjects list for current category
  const getSubjectOptions = () => {
    switch (category) {
      case 'Race':
        return races.map(r => ({ id: r.id, label: `Round ${r.round_number}: ${r.grand_prix_name}` }));
      case 'Driver':
        return drivers.map(d => ({ id: d.id, label: `${d.name} (#${d.permanent_number})` }));
      case 'Team':
        return teams.map(t => ({ id: t.id, label: t.name }));
      case 'Car':
        return cars.map(c => ({ id: c.id, label: `${c.car_name} (${c.team_name || 'F1 Car'})` }));
      default:
        return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !reviewText.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const newReview = await createReview({
        category,
        subject_id: parseInt(subjectId, 10),
        title,
        author: author.trim() || 'F1 Fan',
        rating: parseInt(rating, 10),
        review_text: reviewText
      });

      if (onReviewSubmitted) onReviewSubmitted(newReview);
      onClose();
      // Reset
      setTitle('');
      setReviewText('');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.error?.message || 'Failed to post review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '550px',
        padding: '2rem',
        position: 'relative',
        border: '1px solid rgba(225, 6, 0, 0.5)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={22} />
        </button>

        <h3 style={{ fontSize: '1.4rem', color: '#FFF', marginBottom: '0.25rem' }}>Submit F1 Analysis</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Share your technical breakdown or driver assessment with the community.
        </p>

        {errorMsg && (
          <div style={{ background: 'rgba(225, 6, 0, 0.2)', border: '1px solid var(--racing-red)', color: '#FFF', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '1rem' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Category Selector */}
          <div className="form-group">
            <label className="form-label">Review Target Category</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubjectId('1');
              }}
            >
              <option value="Race">Race Review</option>
              <option value="Driver">Driver Performance</option>
              <option value="Team">Team Strategy</option>
              <option value="Car">Car Aerodynamics & Spec</option>
            </select>
          </div>

          {/* Subject Dropdown */}
          <div className="form-group">
            <label className="form-label">Select Subject</label>
            <select
              className="form-select"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
            >
              {getSubjectOptions().map(opt => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div className="form-group">
            <label className="form-label">Review Headline</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Monaco GP — Strategy Under Pressure"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Author & Rating row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Your Name / Handle</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. TelemetryPro"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Rating (1 to 5 Stars)</label>
              <div style={{ display: 'flex', gap: '0.4rem', paddingTop: '0.4rem' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.1rem' }}
                  >
                    <Star size={22} color={star <= rating ? 'var(--gold)' : 'var(--text-dim)'} fill={star <= rating ? 'var(--gold)' : 'none'} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Review Text */}
          <div className="form-group">
            <label className="form-label">Detailed Review & Telemetry Insights</label>
            <textarea
              className="form-textarea"
              rows={4}
              placeholder="Write your analysis on tire strategy, aero upgrades, or wheel-to-wheel racecraft..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            />
          </div>

          {/* Submit */}
          <button type="submit" disabled={submitting} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            <Send size={16} /> {submitting ? 'Publishing Review...' : 'Publish Analysis'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
