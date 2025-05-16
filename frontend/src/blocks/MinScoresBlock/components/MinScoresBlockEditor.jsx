import React, { useState, useEffect } from 'react';

const defaultEge = [
  { score: '', subject: 'Предмет1', year: '' },
  { score: '', subject: 'Предмет2', year: '' },
  { score: '', subject: 'предмет3', year: '' },
];
const defaultSpo = [
  { score: '', subject: 'Крутое название экзамена', year: '' },
  { score: '', subject: 'Крутое название экзамена', year: '' },
  { score: '', subject: 'Крутое название экзамена', year: '' },
];

const MinScoresBlockEditor = ({ content = {}, setContent }) => {
  const [title, setTitle] = useState(content.title || 'ПОСТУПЛЕНИЕ');
  const [ege, setEge] = useState(content.ege?.length ? content.ege : defaultEge);
  const [spo, setSpo] = useState(content.spo?.length ? content.spo : defaultSpo);

  useEffect(() => {
    setContent({ title, ege, spo });
  }, [title, ege, spo]);

  const handleEgeChange = (idx, field, value) => {
    setEge(ege.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  };
  const handleSpoChange = (idx, field, value) => {
    setSpo(spo.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100 relative">
      <div className="relative mb-6">
        <input
          className="text-5xl md:text-7xl font-bold pb-2 border-none w-full bg-transparent outline-none z-10 relative"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        {/* Декоративная полоска */}
        <div className="absolute left-0 bottom-0 w-full h-3 bg-[#0C3281] z-0" style={{ transform: 'skewX(-20deg)' }} />
      </div>

      <div className="mt-8">
        <h3 className="text-3xl font-bold mb-2">ЕГЭ</h3>
        <div className="text-lg mb-2">Минимальные баллы</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full">
          {ege.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center border-3 border-black p-6 h-full justify-center w-full">
              <input
                className="text-3xl font-bold mb-2 text-center bg-transparent outline-none border-b-2 border-black"
                value={item.score}
                onChange={e => handleEgeChange(idx, 'score', e.target.value)}
                placeholder="—"
                style={{ width: 120 }}
              />
              <input
                className="text-lg text-center font-medium bg-transparent outline-none break-words whitespace-pre-line"
                value={item.subject}
                onChange={e => handleEgeChange(idx, 'subject', e.target.value)}
                placeholder="Название предмета"
              />
              <input
                className="text-base text-center bg-transparent outline-none border-b-2 border-gray-400 mt-2"
                value={item.year}
                onChange={e => handleEgeChange(idx, 'year', e.target.value)}
                placeholder="Год"
                style={{ width: 80 }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-3xl font-bold mb-2">ЭКЗАМЕНЫ ДЛЯ ВЫПУСКНИКОВ СПО</h3>
        <div className="text-lg mb-2">Минимальные баллы</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {spo.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center border-3 border-black rounded-lg p-6 h-full justify-center w-full">
              <input
                className="text-3xl font-bold mb-2 text-center bg-transparent outline-none border-b-3 border-black"
                value={item.score}
                onChange={e => handleSpoChange(idx, 'score', e.target.value)}
                placeholder="—"
                style={{ width: 120 }}
              />
              <input
                className="text-lg text-center font-medium bg-transparent outline-none break-words whitespace-pre-line"
                value={item.subject}
                onChange={e => handleSpoChange(idx, 'subject', e.target.value)}
                placeholder="Название экзамена"
              />
              <input
                className="text-base text-center bg-transparent outline-none border-b-2 border-gray-400 mt-2"
                value={item.year}
                onChange={e => handleSpoChange(idx, 'year', e.target.value)}
                placeholder="Год"
                style={{ width: 80 }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MinScoresBlockEditor; 