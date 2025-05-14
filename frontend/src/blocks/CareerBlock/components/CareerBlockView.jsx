import { useState } from 'react';

export const CareerBlockView = ({ content }) => {
  return (
    <div className="w-full relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-[100px] py-4">
        <div className="relative h-[800px] md:h-[800px] flex flex-col md:flex-row items-start">
          {/* Вертикальный заголовок с линией для десктопа */}
          <div className="relative h-full flex items-end pl-20 min-w-[200px] -mr-32 z-10 hidden md:flex">
            <div className="relative">
              <h2 className="origin-bottom-left -rotate-90 absolute bottom-0 left-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[90px] font-bold whitespace-nowrap flex items-center">
                {content.title || 'Карьера'}
                <span className="w-[400px] h-[3px] bg-black ml-4 -mb-[3px] translate-x-[12px]"></span>
              </h2>
            </div>
          </div>

          {/* Горизонтальный заголовок для мобильной версии */}
          <div className="md:hidden w-full mb-4">
            <h2 className="text-4xl font-bold">
              {content.title || 'Карьера'}
            </h2>
          </div>

          {/* Контент и изображение */}
          <div className="flex flex-col md:flex-row w-full items-start">
            {/* Изображение */}
            <div className="flex-shrink-0 w-full md:w-2/5 relative mt-0">
              {content.image && (
                <img
                  src={content.image}
                  alt="Career"
                  className="w-full h-auto object-cover rounded-lg relative z-10"
                />
              )}
              {/* Фоновое изображение */}
              <img
                src="/photos/закорючка.png"
                alt="Background decoration"
                className="absolute top-1/2"
              />
            </div>

            {/* Текстовый контент */}
            <div className="flex-1 pl-8 mt-4 md:mt-0">
              <div>
                <h3 className="text-2xl font-bold mb-3">
                  Выпускники могут работать в сферах:
                </h3>
                <p className="text-3xl font-normal">
                  {content.areas || 'Текст о сферах карьеры'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 