import api from "./config";

export const usersApi = {
  // Get user profiles with pagination and filters
  getProfiles: async (params) => {
    const response = await api.post("/api/Users/GetProfiles", params);
    return response.data;
  },

  // Get single user profile
  getProfile: async (userId) => {
    const response = await api.get(`/api/Users/GetProfile/${userId}`);
    return response.data;
  },

  // Create student profile
  createStudentProfile: async (profileData) => {
    const response = await api.post(
      "/api/Users/CreateStudentProfile",
      profileData
    );
    return response.data;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await api.put("/api/Users/UpdateProfile", profileData);
    return response.data;
  },

  // Hide user profile
  hideProfile: async (userId) => {
    const response = await api.post("/api/Users/HideProfile", { userId });
    return response.data;
  },

  // Show user profile
  showProfile: async (userId) => {
    const response = await api.post("/api/Users/ShowProfile", { userId });
    return response.data;
  },

  // Delete user profile
  deleteProfile: async (userId) => {
    const response = await api.delete(`/api/Users/DeleteProfile/${userId}`);
    return response.data;
  },
};
