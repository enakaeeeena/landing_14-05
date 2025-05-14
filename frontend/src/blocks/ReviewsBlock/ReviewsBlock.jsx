
import { useEffect, useState } from 'react';
import { fetchData } from '../../api/fakeDb';
import ReviewsCard from './components/ReviewsCard';

const ReviewsBlock = ({ data }) => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData("reviews").then(data => {
      setReviews(data);
      setLoading(false);
    });
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : reviews.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < reviews.length - 1 ? prev + 1 : 0));
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="container mx-auto py-16 px-4 relative">
      <h2 className="text-8xl font-bold mb-8 text-left">Отзывы студентов</h2>
      
      <div className="flex items-center gap-4 mb-12">
        <button 
          onClick={handlePrev}
          className="p-4 bg-black text-white hover:bg-gray-800 transition-colors"
        >
          ←
        </button>
        
        <div className="flex-1 flex gap-8 overflow-hidden">
          {reviews.map((review, index) => (
            <ReviewsCard 
              key={review.id}
              review={review}
              isActive={index === currentIndex}
            />
          ))}
        </div>

        <button 
          onClick={handleNext}
          className="p-4 bg-black text-white hover:bg-gray-800 transition-colors"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default ReviewsBlock;