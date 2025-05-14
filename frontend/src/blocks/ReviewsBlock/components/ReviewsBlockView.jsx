import { useState } from 'react';
import ReviewsCard from './ReviewsCard';

export const ReviewsBlockView = ({ content = {} }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviews = content.reviews || [];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : reviews.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < reviews.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="w-full">
      <div className="w-full px-4 md:px-[100px] py-4 relative">
        <div className="relative mb-12 overflow-hidden">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-left relative pl-4">
            <span className="relative inline-block bg-white pr-8 z-10">
              {content.blockTitle || 'Отзывы студентов'}
            </span>
            <span 
              className="absolute left-full top-1/2 w-[200vw] h-1 bg-black transform -translate-y-1/2"
              style={{ right: '-100vw' }}
            ></span>
          </h2>
        </div>

        <div className="flex items-center gap-4 mb-12">
          <button 
            onClick={handlePrev}
            className="p-4 bg-black text-white hover:bg-gray-800 transition-colors"
          >
            ←
          </button>
          
          <div className="flex-1 flex gap-8 overflow-hidden h-96">
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
    </div>
  );
};