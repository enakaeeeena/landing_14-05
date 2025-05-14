import api from "./config";

export const worksApi = {
  // Get works with pagination and filters
  getWorks: async (params) => {
    const response = await api.post("/api/Works/GetWorks", params);
    return response.data;
  },

  // Add new work
  addWork: async (workData) => {
    const response = await api.post("/api/Works/AddWork", workData);
    return response.data;
  },

  // Update work
  updateWork: async (workData) => {
    const response = await api.put("/api/Works/UpdateWork", workData);
    return response.data;
  },

  // Hide work
  hideWork: async (workId) => {
    const response = await api.post("/api/Works/HideWork", { workId });
    return response.data;
  },

  // Show work
  showWork: async (workId) => {
    const response = await api.post("/api/Works/ShowWork", { workId });
    return response.data;
  },

  // Like work
  likeWork: async (workId, userId) => {
    const response = await api.post("/api/Works/LikeWork", { workId, userId });
    return response.data;
  },

  // Unlike work
  unlikeWork: async (workId, userId) => {
    const response = await api.post("/api/Works/UnlikeWork", {
      workId,
      userId,
    });
    return response.data;
  },
};
