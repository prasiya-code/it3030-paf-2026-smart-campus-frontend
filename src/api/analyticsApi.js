import axios from './axios';

export const analyticsApi = {
  getDashboardAnalytics: async () => {
    const response = await axios.get('/api/admin/analytics/dashboard');
    return response.data;
  }
};
