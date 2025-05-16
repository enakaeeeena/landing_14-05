import React from 'react';

const PassScoresBlockView = ({ content = {} }) => {
  // content: { years: [{ year, score }], tuition: { text, price } }
  const { years = [], tuition = { text: '', price: '' } } = content;

  return (
    <div className="container mx-auto p-8 bg-white relative">
      <div className="text-xl font-bold mb-4">Бюджет/Коммерция</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full">
        {years.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center border-3 border-black p-6 h-full justify-center w-full">
            <div className="text-4xl font-bold mb-2">{item.score || <span className="opacity-50">___</span>}</div>
            <div className="text-base text-center font-medium">в {item.year}г</div>
          </div>
        ))}
      </div>
      <div className="mt-4 border-3 border-black p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1 text-base md:text-lg">
          {tuition.text || 'Стоимость обучения по договору об оказании платных образовательных услуг'}
        </div>
        <div className="flex items-center gap-2">
          <span className="min-w-[80px] inline-block text-center">{tuition.price || '_____'}</span>
          <span>руб/год</span>
        </div>
      </div>
    </div>
  );
};

export default PassScoresBlockView; 