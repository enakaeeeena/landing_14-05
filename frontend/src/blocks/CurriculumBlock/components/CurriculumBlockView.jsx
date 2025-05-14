import React from 'react';

const CurriculumBlockView = ({ content = {} }) => {
  const theoreticalLeft = content.theoretical?.left?.split('\n') || [];
  const theoreticalRight = content.theoretical?.right?.split('\n') || [];
  const practical = content.practical?.split('\n') || [];

  return (
    <section className="relative w-full">
      <div className="relative w-full">
        <img 
          src="/photos/plan_back.png"
          alt="Фон"
          className="w-full h-auto object-contain"
        />

        <div className="absolute inset-0">
          <div className="container mx-auto h-full">
            <h2 className="text-8xl font-bold mb-6 pt-8">Учебный план</h2>
            <div className="flex h-full">
              <div className="w-1/2 pr-4 py-16 pl-8">
                <div className="space-y-8">
                  <div className="p-6">
                    <h3 className="text-3xl font-bold mb-4 text-white">Теоретические дисциплины</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 text-3xl font-normal text-white">
                        {theoreticalLeft.map((item, index) => (
                          <p key={index} className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                            {item.replace('·', '').trim()}
                          </p>
                        ))}
                      </div>
                      <div className="space-y-2 text-3xl font-normal text-white">
                        {theoreticalRight.map((item, index) => (
                          <p key={index} className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                            {item.replace('·', '').trim()}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-3xl font-bold mb-4 text-white">Практические модули</h3>
                    <div className="space-y-2 text-3xl font-normal text-white">
                      {practical.map((item, index) => (
                        <p key={index} className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-white rounded-full"></span>
                          {item.replace('·', '').trim()}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-1/2 p-8">
                <div className="relative h-full">
                  {content.images?.map((img, index) => (
                    <div
                      key={index}
                      className="absolute"
                      style={{
                        left: `${img.x}%`,
                        top: `${img.y}%`,
                        width: `${img.width}px`,
                        height: `${img.height}px`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <img
                        src={img.url}
                        alt={`Дисциплина ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurriculumBlockView;
