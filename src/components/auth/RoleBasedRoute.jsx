import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { userRole, loading } = useAuthContext();

  if (loading) return null;

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleBasedRoute;
