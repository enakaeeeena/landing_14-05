import React from 'react';

const OlympiadsBlockView = ({ content = {}, onEdit }) => {
  const { title1 = 'ОЛИМПИАДЫ', title2 = 'ДЛЯ ВНЕКОНКУРСНОГО ПОСТУПЛЕНИЯ', items = [], buttonText = 'Подать документы', buttonUrl = '#' } = content;

  return (
    <div className="container mx-auto p-8 bg-white relative">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[50px] font-bold leading-none">{title1}</h2>
          <div className="text-[40px] font-bold leading-none mt-1">{title2}</div>
        </div>
      </div>
      <div className=" olympiad-scroll border-3 border-black p-4 mb-8 max-h-48 overflow-y-auto bg-white">
        {items.length === 0 ? (
          <div className="text-gray-400 text-lg">Нет добавленных олимпиад</div>
        ) : (
          <ul className="space-y-2">
            {items.map((item, idx) => (
              <li key={idx}>
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-800 underline">{item.name}</a>
                ) : (
                  <span>{item.name}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex items-center gap-4">
        <a href={buttonUrl} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-[#0C3281] text-white text-lg font-medium py-3 border-3 border-black hover:bg-blue-900 transition">
          {buttonText}
        </a>
      </div>
    </div>
  );
};

export default OlympiadsBlockView; 