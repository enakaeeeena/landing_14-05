import api from "./api";

const authService = {
  async login(email, password) {
    return await api.post("/auth/login", { email, password });
  },

  async register(email, password, name) {
    return await api.post("/auth/register", { email, password, name });
  },

  async adminLogin(email, password) {
    return await api.post("/auth/admin/login", { email, password });
  },

  // Сохранение токена в localStorage
  saveToken(token) {
    localStorage.setItem("token", token);
  },

  // Получение токена из localStorage
  getToken() {
    return localStorage.getItem("token");
  },

  // Удаление токена из localStorage
  removeToken() {
    localStorage.removeItem("token");
  },

  // Проверка, авторизован ли пользователь
  isAuthenticated() {
    return !!this.getToken();
  },
};

export default authService;
