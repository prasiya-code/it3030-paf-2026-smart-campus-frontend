import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const AdminHeader = () => {
  const { user, logout } = useAuthContext();

  const getInitials = (firstName, lastName) => {
    const first = firstName?.charAt(0)?.toUpperCase() || '';
    const last = lastName?.charAt(0)?.toUpperCase() || '';
    return first + last || 'AD';
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <h1 className="font-bold text-xl text-gray-900">Opsora</h1>
        <span className="text-gray-400">|</span>
        <span className="text-gray-600 text-sm">Admin Panel</span>
      </div>

      <div className="flex items-center gap-3">
        <Link to="/admin/profile" className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium text-gray-900">
              {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.firstName || user?.lastName || 'Admin User'}
            </div>
            <div className="text-xs text-gray-500">{user?.email || 'admin@example.com'}</div>
          </div>
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">{getInitials(user?.firstName, user?.lastName)}</span>
          </div>
        </Link>
        
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
