// Конфигурация API
export const API_URL = "http://localhost:5218";

// Настройки API
export const API_CONFIG = {
    // Таймаут запросов (в миллисекундах)
    timeout: 10000,
    
    // Заголовки по умолчанию
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

// Коды ошибок
export const ERROR_CODES = {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
};

// Сообщения об ошибках
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Ошибка сети. Проверьте подключение к интернету.',
    SERVER_ERROR: 'Ошибка сервера. Попробуйте позже.',
    UNAUTHORIZED: 'Необходима авторизация.',
    FORBIDDEN: 'Доступ запрещен.',
    NOT_FOUND: 'Ресурс не найден.',
    DEFAULT: 'Произошла ошибка. Попробуйте позже.'
};
