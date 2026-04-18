import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuthContext();

  // Auth is already resolved in AuthContext before 
  // children render, but double-check loading just in case
  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
