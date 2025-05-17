import axios from 'axios';
import { useCallback } from 'react';

const api = axios.create({
  baseURL: 'http://localhost:5218',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Перехватчик для повторных попыток
api.interceptors.response.use(null, async (error) => {
  if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
    const retries = error.config.retries || 0;
    if (retries < 3) {
      error.config.retries = retries + 1;
      await new Promise(resolve => setTimeout(resolve, 1000 * (retries + 1)));
      return api(error.config);
    }
  }
  return Promise.reject(error);
});

export const useApi = () => {
  const get = useCallback(async (url) => {
    try {
      console.log('API Request:', { method: 'get', url });
      const response = await api.get(url);
      console.log('API Response:', response);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw { message: 'Ошибка сети. Проверьте подключение к интернету.', originalError: error };
    }
  }, []);

  const post = useCallback(async (url, data) => {
    try {
      console.log('API Request:', { method: 'post', url, data });
      const response = await api.post(url, data);
      console.log('API Response:', response);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw { message: 'Ошибка сети. Проверьте подключение к интернету.', originalError: error };
    }
  }, []);

  const put = useCallback(async (url, data) => {
    try {
      console.log('API Request:', { method: 'put', url, data });
      // Разделяем большие данные на части
      if (data.content && data.content.length > 1000000) {
        // Сначала сохраняем базовую информацию без контента
        const basicData = { ...data, content: null };
        const response = await api.put(url, basicData);
        
        // Затем сохраняем контент отдельно
        const contentResponse = await api.put(`${url}/content`, { content: data.content });
        return contentResponse.data;
      }
      
      const response = await api.put(url, data);
      console.log('API Response:', response);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw { message: 'Ошибка сети. Проверьте подключение к интернету.', originalError: error };
    }
  }, []);

  const del = useCallback(async (url) => {
    try {
      console.log('API Request:', { method: 'delete', url });
      const response = await api.delete(url);
      console.log('API Response:', response);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw { message: 'Ошибка сети. Проверьте подключение к интернету.', originalError: error };
    }
  }, []);

  return { get, post, put, del };
};
