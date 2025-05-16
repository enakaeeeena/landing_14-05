import React, { useState } from 'react';

const ProjectModal = ({ project, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const images = [project.mainImageUrl, ...project.otherImageUrls];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    // Здесь можно добавить логику отправки лайка на сервер
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
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold">{project.title}</h2>
            {/* Кнопка лайка - перемещена левее */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleLike}
                className="focus:outline-none mr-4" // Добавлен отступ справа
                aria-label={isLiked ? 'Убрать лайк' : 'Поставить лайк'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-8 w-8 transition-colors duration-200 ${
                    isLiked ? 'fill-blue-500 stroke-blue-500' : 'fill-none stroke-blue-500'
                  }`}
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

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