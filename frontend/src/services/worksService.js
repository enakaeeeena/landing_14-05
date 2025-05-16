import { api } from './api';

export const worksService = {
  // Get all works with optional filters
  async getWorks(filters = {}) {
    const queryParams = new URLSearchParams();
    if (filters.isFavorite !== undefined) {
      queryParams.append('isFavorite', filters.isFavorite);
    }
    if (filters.sortByDate) {
      queryParams.append('sortByDate', filters.sortByDate);
    }
    
    const response = await api.get(`/api/Works?${queryParams.toString()}`);
    return response.data;
  },

  // Toggle favorite status for a work
  async toggleFavorite(workId) {
    const response = await api.patch(`/api/Works/${workId}/toggle-favorite`);
    return response.data;
  },

  // Get featured works for gallery
  async getFeaturedWorks() {
    const response = await api.get('/api/Works?isFavorite=true');
    return response.data;
  },

  async createWork(work) {
    const response = await api.post('/api/Works', work);
    return response.data;
  },

  async updateWork(workId, work) {
    const response = await api.put(`/api/Works/${workId}`, work);
    return response.data;
  },

  async deleteWork(workId) {
    const response = await api.delete(`/api/Works/${workId}`);
    return response.data;
  }
}; 