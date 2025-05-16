import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '../../services/authService';

const ConfirmEmail = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  if (!email) {
    navigate('/skills');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.confirmEmail(email, code);
      navigate('/skills/login');
    } catch (err) {
      setError(err.message || 'Ошибка при подтверждении email');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError('');
    setResendLoading(true);

    try {
      await authService.resendConfirmationCode(email);
      alert('Код подтверждения отправлен повторно');
    } catch (err) {
      setError(err.message || 'Ошибка при отправке кода');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Подтверждение email</h1>
        <p className="text-gray-600 mb-4">
          Мы отправили код подтверждения на {email}. Пожалуйста, введите его ниже:
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Код подтверждения"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? 'Подтверждение...' : 'Подтвердить'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={handleResendCode}
            className="text-blue-600 hover:text-blue-800 disabled:text-blue-300"
            disabled={resendLoading}
          >
            {resendLoading ? 'Отправка...' : 'Отправить код повторно'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail; 