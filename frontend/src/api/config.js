import axios from "axios";
import { API_URL, API_CONFIG, ERROR_MESSAGES } from '../config';

const api = axios.create({
  baseURL: API_URL,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers,
  withCredentials: true, // Enable CORS with credentials
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Логируем запрос в режиме разработки
    if (process.env.NODE_ENV === 'development') {
      console.log("API Request:", {
        method: config.method,
        url: config.url,
        data: config.data,
        headers: config.headers,
      });
    }
    return config;
  },
  (error) => {
    console.error("Ошибка при отправке запроса:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    // Логируем успешный ответ в режиме разработки
    if (process.env.NODE_ENV === 'development') {
      console.log("API Response:", {
        status: response.status,
        data: response.data,
      });
    }
    return response;
  },
  async (error) => {
    let errorMessage = ERROR_MESSAGES.DEFAULT;

    if (error.response) {
      // Обработка ошибок от сервера
      switch (error.response.status) {
        case 401:
          errorMessage = ERROR_MESSAGES.UNAUTHORIZED;
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          errorMessage = ERROR_MESSAGES.FORBIDDEN;
          break;
        case 404:
          errorMessage = ERROR_MESSAGES.NOT_FOUND;
          break;
        case 500:
          errorMessage = ERROR_MESSAGES.SERVER_ERROR;
          break;
        default:
          errorMessage = error.response.data?.message || ERROR_MESSAGES.DEFAULT;
      }

      // Подробное логирование в режиме разработки
      if (process.env.NODE_ENV === 'development') {
        console.error("API Error Response:", {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });
      }
    } else if (error.request) {
      // Запрос был отправлен, но ответ не получен
      errorMessage = ERROR_MESSAGES.NETWORK_ERROR;
      if (process.env.NODE_ENV === 'development') {
        console.error("API No Response:", error.request);
      }
    } else {
      // Ошибка при настройке запроса
      if (process.env.NODE_ENV === 'development') {
        console.error("API Request Setup Error:", error.message);
      }
    }

    return Promise.reject({
      message: errorMessage,
      originalError: error
    });
  }
);

export default api;
