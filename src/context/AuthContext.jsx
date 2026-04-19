import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios';
import { authApi } from '../api/authApi';

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error(
    'useAuthContext must be used within AuthProvider'
  );
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/me', { 
          withCredentials: true
        });
        console.log('/api/me response:', response.data);
        setUser(response.data);
        setIsAuthenticated(true);
        console.log('User is authenticated');
      } catch (error) {
        // Not logged in — this is expected for unauthenticated users
        console.log('/api/me failed:', error);
        setUser(null);
        setIsAuthenticated(false);
        console.log('User is NOT authenticated');
      } finally {
        setLoading(false);
        console.log('Auth check complete, loading = false');
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authApi.login(email, password);
      if (data.success) {
        // Fetch fresh user data from /api/me
        const currentUser = await authApi.getCurrentUser();
        setUser(currentUser);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Invalid email or password'
      };
    }
  };

  const loginWithGoogle = () => {
    authApi.loginWithGoogle();
  };

  const signup = async (firstName, lastName, email,
                        password, role = 'USER') => {
    try {
      const data = await authApi.signup(
        firstName, lastName, email, password, role
      );
      console.log('Signup response:', data);
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Signup failed. Please try again.'
      };
    }
  };

  const logout = async () => {
    try {
      // Call logout as an API request, NOT a browser navigation
      // Use fetch directly to avoid any axios interceptor issues
      await fetch('http://localhost:8080/api/logout', {
        method: 'POST',
        credentials: 'include', // sends the session cookie
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear all auth state
      setUser(null);
      setIsAuthenticated(false);
      // Force full page reload to reset React state
      // and ensure /api/me returns 401
      window.location.replace('/login');
    }
  };

  const userRole = user?.role || user?.roles?.[0]?.name || null;

  // Module A - Facilities & Assets Catalogue
  const canViewResources = true; // All authenticated users can view
  const canManageResources = userRole === 'ADMIN'; // Only admin can create/edit/delete

  // Module B - Booking Management
  const canCreateBookings = true; // All authenticated users can create
  const canViewOwnBookings = true; // All authenticated users can view own
  const canCancelOwnBookings = true; // All authenticated users can cancel own
  const canViewAllBookings = userRole === 'ADMIN'; // Only admin can view all
  const canApproveBookings = userRole === 'ADMIN'; // Only admin can approve/reject

  // Module C - Maintenance & Incident Ticketing
  const canCreateTickets = true; // All authenticated users can create
  const canViewOwnTickets = true; // All authenticated users can view own
  const canViewAssignedTickets = userRole === 'TECHNICIAN'; // Technicians can view assigned
  const canViewAllTickets = userRole === 'ADMIN'; // Only admin can view all
  const canAssignTickets = userRole === 'ADMIN'; // Only admin can assign
  const canUpdateTicketStatus = userRole === 'ADMIN' || userRole === 'TECHNICIAN'; // Admin and technician can update
  const canRejectTickets = userRole === 'ADMIN'; // Only admin can reject
  const canAddResolutionNotes = userRole === 'ADMIN' || userRole === 'TECHNICIAN'; // Admin and technician can add notes
  const canEditAnyComments = userRole === 'ADMIN'; // Only admin can edit any comments
  const canDeleteAnyComments = userRole === 'ADMIN'; // Only admin can delete any comments

  // Module D - Notifications
  const canViewNotifications = true; // All authenticated users can view
  const canMarkNotificationsRead = true; // All authenticated users can mark as read

  const value = {
    user,
    loading,
    isAuthenticated,
    setUser,
    setIsAuthenticated,
    login,
    loginWithGoogle,
    signup,
    logout,
    userRole,
    isStudent: userRole === 'STUDENT',
    isAcademicStaff: userRole === 'ACADEMIC_STAFF',
    isTechnician: userRole === 'TECHNICIAN',
    isAdmin: userRole === 'ADMIN',
    isUser: userRole === 'USER',
    // Module A - Resources
    canViewResources,
    canManageResources,
    // Module B - Bookings
    canCreateBookings,
    canViewOwnBookings,
    canCancelOwnBookings,
    canViewAllBookings,
    canApproveBookings,
    // Module C - Tickets
    canCreateTickets,
    canViewOwnTickets,
    canViewAssignedTickets,
    canViewAllTickets,
    canAssignTickets,
    canUpdateTicketStatus,
    canRejectTickets,
    canAddResolutionNotes,
    canEditAnyComments,
    canDeleteAnyComments,
    // Module D - Notifications
    canViewNotifications,
    canMarkNotificationsRead,
  };

  // Block ALL rendering until auth check is complete
  if (loading) {
    return (
      <div className="min-h-screen flex items-center 
        justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 
            border-b-2 border-indigo-600"></div>
          <p className="text-slate-500 text-sm">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};