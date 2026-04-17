import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  // TODO: Re-enable auth check when backend is connected
  return children;

  // // Temporarily bypassed authentication check
  // const { isAuthenticated, loading, user } = useAuth();

  // // Show loading spinner while checking authentication
  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-50">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  //     </div>
  //   );
  // }

  // // Redirect to login if not authenticated
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  // // Check role-based access if requiredRole is specified
  // if (requiredRole && user?.role !== requiredRole) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-50">
  //       <div className="text-center">
  //         <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
  //         <p className="text-gray-600">You don't have permission to access this page.</p>
  //       </div>
  //     </div>
  //   );
  // }

  // return children;
};

export default ProtectedRoute;
