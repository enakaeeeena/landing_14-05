import React from 'react';

const PassScoresBlockView = ({ content = {} }) => {
  // content: { years: [{ year, score }], tuition: { text, price } }
  const { years = [], tuition = { text: '', price: '' } } = content;

  return (
    <div className="container mx-auto p-8 bg-white relative">
      <div className="text-3xl font-bold mb-6">ПРОХОДНЫЕ БАЛЛЫ</div>
      <div className="text-xl font-medium mb-4">Бюджет/Коммерция</div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full">
        {years.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center w-full">
            <div className="flex flex-col w-full">
              <div className="flex flex-col items-center border-3 border-black p-6 h-full justify-center w-full">
                <div className="text-4xl font-bold mb-2">{item.score || <span className="opacity-50">___</span>}</div>
              </div>
              <div className="flex flex-col items-center border-3 border-black p-3 h-full justify-center w-full mt-2">
                <div className="text-base text-center font-medium">в {item.year}г</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 mb-8 border-3 border-black p-0 flex items-stretch w-full">
        <div className="flex-1 flex items-center px-6 py-8">
          <span className="text-lg md:text-2xl font-bold">
            {tuition.text || 'Стоимость обучения по договору об оказании платных образовательных услуг'}
          </span>
        </div>
        <div className="flex items-center p-4 h-full">
          <div className="border-3 border-black px-6 py-2 flex items-center h-full">
            <span className="text-2xl font-bold w-full text-center">{tuition.price || '_____'}</span>
            <span className="ml-2 text-2xl font-bold">руб/год</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassScoresBlockView; 