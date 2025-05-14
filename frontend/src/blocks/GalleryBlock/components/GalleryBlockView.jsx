import { useState } from 'react';

function getRandomIndices(length, excludeIndex, count = 6) {
  const indices = Array.from({ length }, (_, i) => i).filter(i => i !== excludeIndex);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, count);
}

const GalleryBlockView = ({ works = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasWorks = works.length > 0;
  const currentWork = hasWorks ? works[currentIndex] : null;
  const randomThumbIndices = hasWorks ? getRandomIndices(works.length, currentIndex, 6) : [];

  return (
    <div className="w-full relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-[100px] py-4">
        <div className="relative h-[800px] md:h-[800px] flex flex-col md:flex-row items-start">
          {/* Вертикальный заголовок с исправленным позиционированием */}
          <div className="relative h-full hidden md:flex items-center justify-end pr-12">
            <div>
              <h2 className="absolute left-full bottom-0 origin-top-left -rotate-90 translate-y-12 whitespace-nowrap text-10xl sm:text-5xl md:text-6xl font-bold flex flex-col gap-6">
                <span className="block">Галерея</span>
                <span className="block flex items-center gap-4">
                  работ
                  <span className="w-32 h-[3px] bg-black"></span>
                </span>
              </h2>
            </div>
          </div>

          {/* Горизонтальный заголовок для мобильной версии */}
          <div className="md:hidden w-full mb-8">
            <h2 className="text-4xl font-bold text-black leading-tight space-y-2">
              <div className="mb-2">Галерея</div>
              <div className="flex items-center gap-4">
                работ
                <span className="w-32 h-[3px] bg-black"></span>
              </div>
            </h2>
          </div>

          {/* Область фото */}
          <div className="flex-1 flex flex-col items-end justify-center w-full pr-0 md:pr-[60px]">
            <div className="relative w-full max-w-[500px] aspect-[3/4] bg-gray-100 border-2 border-black overflow-hidden">
              {currentWork ? (
                <img
                  src={currentWork.mainPhotoUrl}
                  alt={currentWork.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 animate-pulse" />
              )}
            </div>

            {/* Подпись под фото */}
            <div className="flex flex-row justify-between items-center w-full max-w-[640px] mt-4 px-2 text-sm">
              <span className="text-gray-500">
                {currentWork ? `Предмет: ${currentWork.tags?.[0] || '—'}` : '—'}
              </span>
              {currentWork && (
                <a
                  href={currentWork.profileLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-1 bg-black text-white border-2 border-black hover:bg-gray-800 transition"
                >
                  {currentWork.author}
                  <span className="text-lg">→</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Миниатюры */}
        <div className="w-full flex flex-row justify-center gap-2 mt-8">
          {hasWorks && randomThumbIndices.map((idx) => (
            <button
              key={works[idx].id}
              onClick={() => setCurrentIndex(idx)}
              className="w-20 h-28 md:w-28 md:h-36 border-2 border-black overflow-hidden transition-all duration-150 bg-white flex-shrink-0"
              aria-label={`Показать работу ${works[idx].title}`}
            >
              <img
                src={works[idx].mainPhotoUrl}
                alt={works[idx].title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryBlockView;