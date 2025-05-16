import React, { useState, useEffect } from 'react';

const OlympiadsBlockEditor = ({ content = {}, setContent, onSave, onCancel }) => {
  const [title1, setTitle1] = useState(content.title1 || 'ОЛИМПИАДЫ');
  const [title2, setTitle2] = useState(content.title2 || 'ДЛЯ ВНЕКОНКУРСНОГО ПОСТУПЛЕНИЯ');
  const [items, setItems] = useState(content.items || []);
  const [buttonText, setButtonText] = useState(content.buttonText || 'Подать документы');
  const [buttonUrl, setButtonUrl] = useState(content.buttonUrl || '#');

  useEffect(() => {
    setContent && setContent({ title1, title2, items, buttonText, buttonUrl });
  }, [title1, title2, items, buttonText, buttonUrl, setContent]);

  const handleItemChange = (idx, field, value) => {
    setItems(items.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  };
  const handleAddItem = () => {
    setItems([...items, { name: '', url: '' }]);
  };
  const handleRemoveItem = idx => {
    setItems(items.filter((_, i) => i !== idx));
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100 relative">
      <div className="mb-6">
        <input
          className="text-[50px] font-bold leading-none w-full bg-transparent outline-none mb-2"
          value={title1}
          onChange={e => setTitle1(e.target.value)}
        />
        <input
          className="text-[40px] font-bold leading-none w-full bg-transparent outline-none"
          value={title2}
          onChange={e => setTitle2(e.target.value)}
        />
      </div>
      <div className="border-3 border-black p-4 mb-8 max-h-48 overflow-y-auto bg-white">
        {items.length === 0 && <div className="text-gray-400 text-lg">Нет добавленных олимпиад</div>}
        <ul className="space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-2 items-center">
              <input
                className="flex-1 border-b-2 border-gray-300 bg-transparent outline-none px-2"
                value={item.name}
                onChange={e => handleItemChange(idx, 'name', e.target.value)}
                placeholder="Название олимпиады"
              />
              <input
                className="flex-1 border-b-2 border-gray-300 bg-transparent outline-none px-2"
                value={item.url}
                onChange={e => handleItemChange(idx, 'url', e.target.value)}
                placeholder="Ссылка (необязательно)"
              />
              <button onClick={() => handleRemoveItem(idx)} className="text-red-500 text-xl ml-2">✕</button>
            </li>
          ))}
        </ul>
        <button onClick={handleAddItem} className="mt-4 px-4 py-2 border-2 border-black text-black bg-white hover:bg-gray-200">Добавить олимпиаду</button>
      </div>
      <div className="flex gap-4 mb-4">
        <input
          className="flex-1 border-b-2 border-gray-300 bg-transparent outline-none px-2"
          value={buttonText}
          onChange={e => setButtonText(e.target.value)}
          placeholder="Текст кнопки"
        />
        <input
          className="flex-1 border-b-2 border-gray-300 bg-transparent outline-none px-2"
          value={buttonUrl}
          onChange={e => setButtonUrl(e.target.value)}
          placeholder="Ссылка кнопки"
        />
      </div>
    </div>
  );
};

export default OlympiadsBlockEditor; 