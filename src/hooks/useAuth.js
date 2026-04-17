import { useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    isAdmin,
    isUser
  } = useAuthContext();

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    isAdmin,
    isUser
  };
};
