import React, { useState, useEffect } from 'react';

const defaultEge = [
  { score: '', subject: 'Предмет1' },
  { score: '', subject: 'Предмет2' },
  { score: '', subject: 'предмет3' },
];
const defaultSpo = [
  { score: '', subject: 'Крутое название экзамена' },
  { score: '', subject: 'Крутое название экзамена' },
  { score: '', subject: 'Крутое название экзамена' },
];

const MinScoresBlockEditor = ({ content = {}, setContent, onSave, onCancel }) => {
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

  const handleSave = () => {
    onSave();
  };

  return (
    <div className="container mx-auto p-8  bg-gray-100 relative">
      <input
        className="text-5xl md:text-7xl font-bold mb-6 pb-2 border-b-2 border-black w-full bg-transparent outline-none"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <div className="mt-8">
        <h3 className="text-3xl font-bold mb-2">ЕГЭ</h3>
        <div className="text-lg mb-2">Минимальные баллы</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full">
          {ege.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center border-3 border-black p-6 h-full justify-center w-full">
              <input
                className="text-5xl font-bold mb-2 text-center bg-transparent outline-none border-b-2 border-black"
                value={item.score}
                onChange={e => handleEgeChange(idx, 'score', e.target.value)}
                placeholder="—"
                style={{ width: 60 }}
              />
              <input
                className="text-lg text-center font-medium bg-transparent outline-none break-words whitespace-pre-line"
                value={item.subject}
                onChange={e => handleEgeChange(idx, 'subject', e.target.value)}
                placeholder="Название предмета"
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
                className="text-5xl font-bold mb-2 text-center bg-transparent outline-none border-b-3 border-black"
                value={item.score}
                onChange={e => handleSpoChange(idx, 'score', e.target.value)}
                placeholder="—"
                style={{ width: 60 }}
              />
              <input
                className="text-lg text-center font-medium bg-transparent outline-none break-words whitespace-pre-line"
                value={item.subject}
                onChange={e => handleSpoChange(idx, 'subject', e.target.value)}
                placeholder="Название экзамена"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Сохранить</button>
        <button onClick={onCancel} className="px-6 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">Отмена</button>
      </div>
    </div>
  );
};

export default MinScoresBlockEditor; 