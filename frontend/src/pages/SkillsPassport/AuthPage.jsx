import React, { useState } from 'react';
import RegisterModal from './components/RegisterModal';
import LoginModal from './components/LoginModal';

const AuthPage = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

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
          onClick={() => setShowRegister(true)}
          className="bg-blue-800 text-white px-20 py-4 rounded hover:bg-blue-900 text-lg"
        >
          Регистрация
        </button>
        <button
          onClick={() => setShowLogin(true)}
          className="border-2 border-blue-800 text-blue-800 px-20 py-4 rounded hover:bg-blue-100 text-lg"
        >
          Вход
        </button>
      </div>

      {/* Модалки */}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
};

export default AuthPage;
