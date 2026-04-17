import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/authApi';

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fetch current user on app load
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const currentUser = await authApi.getCurrentUser();
        setUser(currentUser);
        setIsAuthenticated(true);
      } catch (error) {
        // User is not authenticated
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  // Login helper
  const login = () => {
    authApi.loginWithGoogle();
  };

  // Logout helper
  const logout = async () => {
    try {
      await authApi.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
      // Still clear local state even if logout request fails
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    isAdmin: user?.role === 'ADMIN',
    isUser: user?.role === 'USER'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
