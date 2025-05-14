import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export const AboutBlockView = ({ content }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex(prev => (prev > 0 ? prev - 1 : (content.images?.length || 1) - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev < (content.images?.length || 1) - 1 ? prev + 1 : 0));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-90px font-bold mb-6 pb-2">
        {content.title || 'О программе'}
      </h2>

      <div className="flex flex-col md:flex-row">
        {/* Левый блок с текстом */}
        <div className="md:w-1/2 md:pr-8">
          <div>
            <h3 className="text-30px font-bold mb-3">Направление:</h3>
            <p className="mb-6 text-3xl font-normal">{content.direction || 'Текст направления'}</p>
          </div>
          
          <div>
            <h3 className="text-30px font-bold mb-3">Учебное подразделение:</h3>
            <p className="mb-6 text-3xl font-normal">{content.department || 'Текст подразделения'}</p>
          </div>
          
          <div>
            <h3 className="text-30px font-bold mb-3">Цель:</h3>
            <p className="mb-6 text-3xl font-normal ">{content.goal || 'Текст цели'}</p>
          </div>
        </div>


        <div className="md:w-1/2 relative min-h-[500px]">
          <div className="absolute inset-0 -z-10">
            <img
              src="/photos/graffiti_1.png"
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            {content.images?.length > 0 ? (
              <div className="w-full max-w-[600px]">
                <div className="flex items-center justify-center">
                  <button
                    onClick={handlePrev}
                    className="p-2 text-black bg-white/70 mr-4"
                  >
                    <FiChevronLeft size={28} />
                  </button>

                  <div className="flex-1 flex justify-center h-[400px]">
                    <img
                      src={content.images[activeIndex]}
                      alt="About program"
                      className="h-full object-contain"
                    />
                  </div>

                  <button
                    onClick={handleNext}
                    className="p-2 text-black bg-white/70 ml-4"
                  >
                    <FiChevronRight size={28} />
                  </button>
                </div>

                <div className="flex justify-center mt-4 overflow-x-auto">
                  {content.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Thumbnail ${index}`}
                      onClick={() => setActiveIndex(index)}
                      className={`w-16 h-16 object-cover cursor-pointer mx-1 border ${
                        index === activeIndex ? 'border-black' : 'border-transparent'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-full h-[400px] flex items-center justify-center bg-white/70">
                <p className="text-gray-500">Изображения не загружены</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};