import api from './axios';

export const notificationApi = {
  // Get all notifications for current user
  getAllNotifications: async () => {
    try {
      const response = await api.get('/api/notifications');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Mark a specific notification as read
  markAsRead: async (notificationId) => {
    try {
      const response = await api.put(`/api/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    try {
      const response = await api.put('/api/notifications/read-all');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
