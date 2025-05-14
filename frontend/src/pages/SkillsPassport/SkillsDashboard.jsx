import React from 'react';
import { useNavigate } from 'react-router-dom';

const SkillsDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-start justify-center min-h-screen p-8">
      {/* Левая часть — текст */}
      <div className="max-w-lg md:mr-52 mb-8 md:mb-0">
        <h1 className="text-5xl font-bold mb-6">СКИЛЛС ПАСПОРТ</h1>
        <p className="text-lg mb-3">
        Скиллс Паспорт предоставляет нынешним и бывшим студентам возможность поделиться своими работами и достижениями
        </p>
        <p className="text-lg">
        А всем остальным — увидеть, чем занимаются в ИТВД
        </p>
      </div>

      {/* Правая часть — кнопки */}
      <div className="flex flex-col gap-6">
        <button
          onClick={() => navigate('/skills/block')}
          className="bg-blue-800 text-white px-20 py-4 rounded hover:bg-blue-900 text-lg"
        >
          Мой профиль
        </button>
        <button
          onClick={() => navigate('/skills/profile')}
          className="border-2 border-blue-800 text-blue-800 px-20 py-4 rounded hover:bg-blue-100 text-lg"
        >
          Загрузить проект
        </button>
      </div>
    </div>
  );
};

export default SkillsDashboard;
