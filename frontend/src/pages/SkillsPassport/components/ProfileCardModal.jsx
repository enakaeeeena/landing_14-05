// components/ProfileCardModal.jsx
import React from 'react';

const ProfileCardModal = ({
  user,
  selectedProjects,
  filteredProjects,
  onClose,
  onRemoveProject,
  onAddProjectToCard
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl">
        {/* Заголовок с фото и ФИО */}
        <div className="flex items-start gap-4 mb-6">
          {user.photo && (
            <img 
              src={user.photo} 
              alt="Аватар"
              className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200"
            />
          )}
          <div className="flex-1">
            <h1 className="text-xl font-semibold">
              {user.lastName} {user.firstName} {user.middleName}
            </h1>
            <p className="text-gray-600">{user.skill}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* 4 квадратных блока для проектов */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[0, 1, 2, 3].map((index) => (
            <div 
              key={index}
              className="relative aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50"
            >
              {selectedProjects[index] ? (
                <>
                  <img 
                    src={selectedProjects[index].mainImageUrl} 
                    alt={selectedProjects[index].title} 
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveProject(index);
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center z-10 text-sm"
                  >
                    ×
                  </button>
                </>
              ) : (
                <span className="text-gray-400">+ Добавить проект</span>
              )}
            </div>
          ))}
        </div>

        {/* Кнопки Опубликовать и Скрыть профиль */}
        <div className="flex gap-4 mb-6">
        <button 
  onClick={async () => {
    try {
      // 1. Подготовка данных
      const profileData = {
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        skill: user.skill,
        photo: user.photo,
        projects: selectedProjects.filter(proj => proj !== null).map(proj => ({
          title: proj.title,
          description: proj.description,
          images: [proj.mainImageUrl, ...proj.otherImageUrls],
          tags: proj.tags.split(' ')
        })),
        publishedAt: new Date().toISOString()
      };

      // 2. Валидация
      if (!profileData.firstName || !profileData.lastName) {
        throw new Error('Имя и фамилия обязательны для заполнения');
      }

      // 3. Отправка на сервер (пример для JSON API)
      const response = await fetch('/api/profiles/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(profileData)
      });

      // 4. Обработка ответа
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка публикации');
      }

      // 5. Сохранение в локальное хранилище
      localStorage.setItem('lastPublishedProfile', JSON.stringify(profileData));

      // 6. Уведомление пользователя
      alert('Профиль успешно опубликован!');

      // 7. Вызов callback-функций
      onPublish(profileData);
      onClose();

      // 8. Перенаправление (если нужно)
      if (navigate) navigate('/auth');

    } catch (error) {
      console.error('Ошибка публикации:', error);
      alert(`Ошибка: ${error.message}`);
    }
  }}
  className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700"
>
  Опубликовать
</button>
          <button className="flex-1 bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-400">
            Скрыть профиль
          </button>
        </div>

        <div className="border-t border-gray-200 my-4"></div>

        {/* Доступные проекты */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Доступные проекты:</h2>
          <div className="grid grid-cols-2 gap-4">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                onClick={() => onAddProjectToCard(project)}
                className="flex gap-3 items-center cursor-pointer p-3 hover:bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-200">
                  {project.mainImageUrl && (
                    <img 
                      src={project.mainImageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium truncate">{project.title}</h3>
                  <p className="text-gray-600 text-xs">{project.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardModal;