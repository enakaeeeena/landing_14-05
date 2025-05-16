import React from 'react';

const MinScoresBlockView = ({ content = {} }) => {
  // Примерная структура content:
  // {
  //   title: 'ПОСТУПЛЕНИЕ',
  //   ege: [{ score: 45, subject: 'информатика/физика' }, ...],
  //   spo: [{ score: 40, subject: 'программирование и информатика' }, ...]
  // }
  const { title = 'ПОСТУПЛЕНИЕ', ege = [], spo = [] } = content;

  return (
    <div className="container mx-auto p-8  bg-white relative">
      <h2 className="text-5xl md:text-7xl font-bold mb-6 pb-2 border-b-3 border-black flex items-center">
        {title}
      </h2>

      <div className="mt-8">
        <h3 className="text-3xl font-bold mb-2">ЕГЭ</h3>
        <div className="text-lg mb-2">Минимальные баллы</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full">
          {ege.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center border-3 border-black p-6 h-full justify-center w-full">
              <div className="text-5xl font-bold mb-2">{item.score}</div>
              <div className="text-lg text-center font-medium break-words whitespace-pre-line">{item.subject}</div>
              {item.year && (
                <div className="text-base text-center text-gray-500 mt-1">{item.year} г.</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-3xl font-bold mb-2">ЭКЗАМЕНЫ ДЛЯ ВЫПУСКНИКОВ СПО</h3>
        <div className="text-lg mb-2">Минимальные баллы</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {spo.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center border-3 border-black p-6 h-full justify-center w-full">
              <div className="text-5xl font-bold mb-2">{item.score}</div>
              <div className="text-lg text-center font-medium break-words whitespace-pre-line">{item.subject}</div>
              {item.year && (
                <div className="text-base text-center text-gray-500 mt-1">{item.year} г.</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MinScoresBlockView; 