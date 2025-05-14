const ProfessorsCard = ({ professor, isAdmin = false, onEdit, onDelete }) => {
  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Проверяем тип файла
      if (!file.type.startsWith('image/')) {
        alert('Пожалуйста, выберите изображение');
        return;
      }

      // Проверяем размер файла (максимум 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Размер файла не должен превышать 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        console.log('Photo loaded:', base64String.substring(0, 100) + '...'); // Логируем начало строки
        onEdit({ ...professor, photo: base64String });
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        alert('Ошибка при чтении файла');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative bg-white border-3 border-black group h-[500px] w-[450px] overflow-hidden">
      {isAdmin && (
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <div className="relative">
            <input
              type="file"
              id={`photo-upload-${professor.id}`}
              name={`photo-upload-${professor.id}`}
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
              aria-label="Загрузить фото преподавателя"
            />
            <label
              htmlFor={`photo-upload-${professor.id}`}
              className="p-1 bg-green-500 text-white rounded-full hover:bg-green-600 cursor-pointer inline-block"
              title="Загрузить фото"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </label>
          </div>
          <button 
            onClick={() => onEdit(professor)}
            className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            title="Редактировать"
            aria-label="Редактировать преподавателя"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
            </svg>
          </button>
          <button 
            onClick={() => onDelete(professor.id)}
            className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
            title="Удалить"
            aria-label="Удалить преподавателя"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>
      )}
      
      <div className="relative w-full h-full">
        {/* Фоновое изображение */}
        {professor.photo ? (
          <img 
            src={professor.photo} 
            alt={`Фото преподавателя ${professor.name}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error('Error loading image:', e);
              e.target.src = ''; // Очищаем src при ошибке
              e.target.onerror = null; // Предотвращаем бесконечный цикл
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        )}

        {/* Градиент */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80" />

        {/* Контент */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">{professor.name}</h3>
          <p className="text-white/90 mb-4 text-lg">{professor.position}</p>
          {professor.link && (
            <a
              href={professor.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white hover:text-white/80 transition-colors"
            >
              Подробнее →
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessorsCard;