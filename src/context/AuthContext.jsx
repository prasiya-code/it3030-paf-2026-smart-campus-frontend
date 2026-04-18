import React, { createContext, useContext, useState, useEffect } from 'react';

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
  const [loading, setLoading] = useState(false); // TODO: set back to true when backend is connected
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // TODO: Uncomment this when backend is connected
  // useEffect(() => {
  //   const fetchCurrentUser = async () => {
  //     try {
  //       const currentUser = await authApi.getCurrentUser();
  //       setUser(currentUser);
  //       setIsAuthenticated(true);
  //     } catch (error) {
  //       setUser(null);
  //       setIsAuthenticated(false);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchCurrentUser();
  // }, []);

  const login = () => {
    console.log('Login - backend not connected yet');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
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