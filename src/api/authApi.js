import api from './axios';

export const authApi = {
  // Get current user information
  getCurrentUser: async () => {
    try {
      const response = await api.get('/api/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Initiate Google OAuth login
  loginWithGoogle: () => {
    window.location.href = `${api.defaults.baseURL}/oauth2/authorization/google`;
  },

  // Logout user
  logout: async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      throw error;
    }
  }
};
