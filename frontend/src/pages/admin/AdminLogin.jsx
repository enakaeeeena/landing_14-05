import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from './context/AdminContext';


const AdminLogin = () => {
  const { login } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const adminPassword = import.meta.env.VITE_APP_ADMIN_PASSWORD;
    if (password === adminPassword) {
      login(); 
      navigate('/admin');
    } else {
      setError('Неверный пароль');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-16">
      <div className="bg-white p-8 border-4 border-black w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center border-b-2 border-black pb-2">Вход в админ-панель</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border-2 border-black focus:outline-none"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 border-2 border-black hover:bg-blue-700"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;