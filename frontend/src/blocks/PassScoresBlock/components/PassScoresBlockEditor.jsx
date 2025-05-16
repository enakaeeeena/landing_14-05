import React, { useState, useEffect } from 'react';

const defaultYears = [
  { year: '2023', score: '' },
  { year: '2022', score: '' },
  { year: '2021', score: '' }
];

const PassScoresBlockEditor = ({ content = {}, setContent, onSave, onCancel }) => {
  const [years, setYears] = useState(content.years?.length ? content.years : defaultYears);
  const [tuitionText, setTuitionText] = useState(content.tuition?.text || 'Стоимость обучения по договору об оказании платных образовательных услуг');
  const [tuitionPrice, setTuitionPrice] = useState(content.tuition?.price || '');

  useEffect(() => {
    setContent({ years, tuition: { text: tuitionText, price: tuitionPrice } });
  }, [years, tuitionText, tuitionPrice]);

  const handleYearChange = (idx, field, value) => {
    setYears(years.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100 relative">
      <div className="text-xl font-bold mb-4">Бюджет/Коммерция</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full">
        {years.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center border-3 border-black p-6 h-full justify-center w-full">
            <div className="flex flex-row items-center gap-2 w-full justify-center">
              <input
                className="text-4xl font-bold mb-2 text-center bg-transparent outline-none border-b-2 border-black"
                value={item.score}
                onChange={e => handleYearChange(idx, 'score', e.target.value)}
                placeholder="___"
                style={{ width: 60 }}
              />
              <input
                className="text-base text-center bg-transparent outline-none border-b-2 border-gray-400 ml-2"
                value={item.year}
                onChange={e => handleYearChange(idx, 'year', e.target.value)}
                placeholder="Год"
                style={{ width: 60 }}
              />
            </div>
            <div className="text-base text-center font-medium">в {item.year}г</div>
          </div>
        ))}
      </div>
      <div className="mt-4 border-3 border-black p-4 flex flex-col md:flex-row items-center gap-4">
        <textarea
          className="flex-1 text-base md:text-lg bg-transparent outline-none border-b-2 border-black mb-2 md:mb-0"
          value={tuitionText}
          onChange={e => setTuitionText(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <input
            className="min-w-[80px] text-center bg-transparent outline-none border-b-2 border-black"
            value={tuitionPrice}
            onChange={e => setTuitionPrice(e.target.value)}
            placeholder="_____"
          />
          <span>руб/год</span>
        </div>
      </div>
    </div>
  );
};

export default PassScoresBlockEditor; 