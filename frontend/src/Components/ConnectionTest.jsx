import { useEffect, useState } from 'react';
import api from '../api/config';

const ConnectionTest = () => {
  const [status, setStatus] = useState('Проверка подключения...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Попробуем сделать простой GET запрос к корню API
        await api.get('/');
        setStatus('✅ Подключение успешно установлено');
        setError(null);
      } catch (err) {
        setStatus('❌ Ошибка подключения');
        setError(err.message);
      }
    };

    checkConnection();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 p-4 border rounded-lg bg-white shadow-lg">
      <h2 className="text-xl font-bold mb-2">Проверка подключения к серверу</h2>
      <p className="mb-2">{status}</p>
      {error && (
        <div className="text-red-500">
          <p>Ошибка: {error}</p>
          <div className="text-sm mt-2">
            <p>Убедитесь, что:</p>
            <ul className="list-disc pl-5 mt-1">
              <li>Сервер запущен</li>
              <li>URL сервера правильный (проверьте config.js)</li>
              <li>Нет проблем с CORS</li>
              <li>Сертификат SSL действителен (если используется HTTPS)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectionTest; 