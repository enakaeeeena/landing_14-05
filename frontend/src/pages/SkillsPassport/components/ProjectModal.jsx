import React, { useState } from 'react';

const ProjectModal = ({ project, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [project.mainImageUrl, ...project.otherImageUrls];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-lg overflow-hidden w-[900px] h-[600px] flex relative">
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl font-bold z-10"
        >
          &times;
        </button>

        {/* Левая часть — изображение */}
        <div className="relative w-1/2 h-full bg-white flex items-center justify-center">
          <img
            src={images[currentIndex]}
            alt={`project-${currentIndex}`}
            className="max-h-[90%] max-w-[90%] object-contain"
          />
          {/* Стрелки */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-black text-3xl hover:scale-110 z-10"
              >
                &#10094;
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black text-3xl hover:scale-110 z-10"
              >
                &#10095;
              </button>
            </>
          )}
        </div>

        {/* Правая часть — текст */}
        <div className="w-1/2 h-full p-6 flex flex-col space-y-4 overflow-y-auto">
          <h2 className="text-2xl font-bold">{project.title}</h2>

          <p className="text-gray-700 whitespace-pre-line">
            {project.description}
          </p>

          <div className="text-sm text-gray-500">
            Дата публикации: {project.date}
          </div>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.split(' ').map((tag, index) => (
              <span key={index} className="bg-gray-200 text-sm px-2 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
