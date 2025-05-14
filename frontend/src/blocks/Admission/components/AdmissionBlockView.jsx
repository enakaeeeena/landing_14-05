const AdmissionBlockView = ({ content }) => {
  return (
    <div className="w-full relative">
      {/* Блок с заголовком */}
      <div className="relative w-full px-4 md:px-[100px] py-8 z-10">
        <div className="relative mb-12 overflow-hidden">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-left md:text-right relative pr-4 text-black">
            <span className="relative inline-block bg-white pl-4 md:pl-8 z-10">
              Для абитуриентов
            </span>
            <span 
              className="absolute right-full top-1/2 w-[200vw] h-1 bg-black transform -translate-y-1/2"
              style={{ left: '-100vw' }}
            ></span>
          </h2>
        </div>
      </div>

      {/* Градиентный блок */}
      <div className="relative">
        {/* Фон с полной шириной */}
        <div className="absolute inset-0 -left-[calc((100vw-100%)/2)] -right-[calc((100vw-100%)/2)] w-screen">
          <div 
            className="w-full h-full py-10"
            style={{
              background: 'linear-gradient(90deg, #ACDA46 0%, #469082 50%, #0C3281 100%)'
            }}
          ></div>
        </div>

        {/* Контент с правильным позиционированием */}
        <div className="relative w-full px-4 md:px-[100px] py-8 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Левая колонка */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-white">Уровень обучения</h3>
                <div className="p-4 text-base sm:text-lg md:text-xl text-white">
                  {content.educationLevel || 'Бакалавриат'}
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-white">Форма обучения</h3>
                <div className="p-4 text-base sm:text-lg md:text-xl text-white">
                  {content.educationForm || 'Очная'}
                </div>
              </div>
            </div>

            {/* Правая колонка */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-white">Бюджетные места</h3>
                <div className="p-4 text-base sm:text-lg md:text-xl text-white">
                  {content.budgetPlaces || '20'}
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-white">Учебное подразделение</h3>
                <div className="p-4 text-base sm:text-lg md:text-xl text-white">
                  {content.department || 'Факультет компьютерных наук'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionBlockView;