import api from './axios';

export const userManagementApi = {
  // Get all users (admin only)
  getAllUsers: async () => {
    try {
      const response = await api.get('/api/admin/users');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create a new user (admin only)
  createUser: async (userData) => {
    try {
      const response = await api.post('/api/admin/users', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update user role (admin only)
  updateUserRole: async (userId, role) => {
    try {
      const response = await api.put(`/api/admin/users/${userId}/role`, { role });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete user (admin only)
  deleteUser: async (userId) => {
    try {
      const response = await api.delete(`/api/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
