import React, { useEffect, useState } from 'react';
import { reviewsService } from '../../../../services/reviewsService';

export const ReviewsBlockView = ({ content }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await reviewsService.getReviews({ isFeatured: true });
        setReviews(data);
        setLoading(false);
      } catch (err) {
        setError('Ошибка при загрузке отзывов');
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Отзывы</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              {review.authorImage && (
                <img
                  src={review.authorImage}
                  alt={review.authorName}
                  className="w-12 h-12 rounded-full mr-4"
                />
              )}
              <div>
                <h3 className="text-xl font-semibold">{review.authorName}</h3>
                {review.authorTitle && (
                  <p className="text-gray-600">{review.authorTitle}</p>
                )}
              </div>
            </div>
            <p className="text-gray-700">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}; 