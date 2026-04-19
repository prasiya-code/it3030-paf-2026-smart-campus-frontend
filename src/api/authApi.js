import axiosInstance from './axios';

export const authApi = {
  // Google OAuth2 login
  loginWithGoogle: () => {
    window.location.href =
      'http://localhost:8080/oauth2/authorization/google?prompt=select_account';
  },

  // Email/password login
  login: async (email, password) => {
    const response = await axiosInstance.post('/api/auth/login', {
      email,
      password
    });
    return response.data;
  },

  // Email/password signup
  signup: async (firstName, lastName, email, password, role) => {
    const response = await axiosInstance.post('/api/auth/signup', {
      firstName,
      lastName,
      email,
      password,
      role: role || 'USER'
    });
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await axiosInstance.get('/api/me');
    return response.data;
  },

  // Logout
  logout: async () => {
    await fetch('http://localhost:8080/api/logout', {
      method: 'POST',
      credentials: 'include',
    });
  },

  // Get users by role
  getUsersByRole: async (role) => {
    const response = await axiosInstance.get(`/api/users/role/${role}`);
    return response.data;
  },
};
