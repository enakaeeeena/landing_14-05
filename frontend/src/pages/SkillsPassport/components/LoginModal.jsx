import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ onClose }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // имитация успешной авторизации
    localStorage.setItem('isAuthenticated', 'true');
    onClose();
    navigate('../SkillsPassport/dashboard');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-gray-500 text-xl">&times;</button>
        <h2 className="text-2xl font-semibold mb-4">Вход</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Пароль"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
