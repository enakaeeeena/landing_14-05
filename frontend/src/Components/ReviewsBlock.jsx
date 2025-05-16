import React, { useState, useEffect } from 'react';
import { reviewsService } from '../services/reviewsService';
import { useAuth } from '../contexts/AuthContext';

const ReviewsBlock = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const data = await reviewsService.getFeaturedReviews();
      setReviews(data);
      setError(null);
    } catch (err) {
      setError('Failed to load reviews');
      console.error('Error loading reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="reviews-block">
      <h2>Отзывы</h2>
      <div className="reviews-grid">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <h3>{review.user?.name || 'Anonymous'}</h3>
              <div className="review-date">
                {new Date(review.createdDate).toLocaleDateString()}
              </div>
            </div>
            <p className="review-content">{review.content}</p>
            {review.program && (
              <div className="review-program">
                Program: {review.program.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsBlock; 