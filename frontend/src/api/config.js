import axios from "axios";

const API_BASE_URL = "http://localhost:5218"; // Updated to match the backend server port

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable CORS with credentials
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Логируем запрос
    console.log("API Request:", {
      method: config.method,
      url: config.url,
      data: config.data,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    // Логируем успешный ответ
    console.log("API Response:", {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    // Подробное логирование ошибок
    if (error.response) {
      // Сервер ответил с кодом ошибки
      console.error("API Error Response:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    } else if (error.request) {
      // Запрос был отправлен, но ответ не получен
      console.error("API No Response:", error.request);
    } else {
      // Ошибка при настройке запроса
      console.error("API Request Setup Error:", error.message);
    }

    // Добавляем дополнительную информацию об ошибке
    const errorMessage =
      error.response?.data?.message || error.message || "Неизвестная ошибка";
    error.message = `API Error: ${errorMessage}`;

    return Promise.reject(error);
  }
);

export default api;
