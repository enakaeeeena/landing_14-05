import { api } from './api';

export const reviewsService = {
  // Get all reviews with optional filters
  async getReviews(filters = {}) {
    const queryParams = new URLSearchParams();
    if (filters.isFavorite !== undefined) {
      queryParams.append('isFavorite', filters.isFavorite);
    }
    if (filters.sortByDate) {
      queryParams.append('sortByDate', filters.sortByDate);
    }
    
    const response = await api.get(`/api/Reviews?${queryParams.toString()}`);
    return response.data;
  },

  // Toggle favorite status for a review
  async toggleFavorite(reviewId) {
    const response = await api.patch(`/api/Reviews/${reviewId}/toggle-favorite`);
    return response.data;
  },

  // Get featured reviews for the reviews block
  async getFeaturedReviews() {
    const response = await api.get('/api/Reviews?isFavorite=true');
    return response.data;
  },

  async createReview(review) {
    const response = await api.post('/api/Reviews', review);
    return response.data;
  },

  async updateReview(reviewId, review) {
    const response = await api.put(`/api/Reviews/${reviewId}`, review);
    return response.data;
  },

  async deleteReview(reviewId) {
    const response = await api.delete(`/api/Reviews/${reviewId}`);
    return response.data;
  }
}; 