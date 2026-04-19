import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const UserSidebar = () => {
  const { user, isAdmin, isTechnician, userRole } = useAuthContext();

  const getInitials = (firstName, lastName, email) => {
    const first = firstName?.charAt(0).toUpperCase() || '';
    const last = lastName?.charAt(0).toUpperCase() || '';
    if (first && last) return first + last;
    if (first) return first;
    if (email) {
      // Use first character of email as fallback
      return email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-6 border-b border-gray-800 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">O</span>
        </div>
        <div>
          <h1 className="font-bold text-lg text-white">Opsora</h1>
          <p className="text-xs text-gray-300">Smart Campus</p>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">

          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <span>📊</span>
              <span className="font-medium">User Dashboard</span>
            </NavLink>
          </li>

          {isAdmin && (
            <li>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                <span>⚙️</span>
                <span className="font-medium">Admin Dashboard</span>
              </NavLink>
            </li>
          )}

          <li>
            <NavLink
              to="/resources"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <span>📦</span>
              <span className="font-medium">Resources</span>
            </NavLink>
          </li>

          {!isAdmin && (
            <li>
              <NavLink
                to="/tickets"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                <span>🎫</span>
                <span className="font-medium">My Tickets</span>
              </NavLink>
            </li>
          )}

          {(isAdmin || isTechnician) && (
            <li>
              <NavLink
                to="/admin/tickets"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                <span>🔧</span>
                <span className="font-medium">Ticket Management</span>
              </NavLink>
            </li>
          )}

          <li>
            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <span className="relative">
                🔔
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  3
                </span>
              </span>
              <span className="font-medium">Notifications</span>
            </NavLink>
          </li>

          <li className="pt-4 border-t border-gray-800 mt-4">
            <p className="px-4 text-xs text-gray-500 uppercase font-semibold mb-2">Bookings</p>
            <NavLink
              to="/booking-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <span>📅</span>
              <span className="font-medium">Booking Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/create-booking"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <span>➕</span>
              <span className="font-medium">Create Booking</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/my-bookings"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <span>📝</span>
              <span className="font-medium">My Bookings</span>
            </NavLink>
          </li>

        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-800">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? 'bg-primary-600 text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`
          }
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">
              {getInitials(user?.firstName, user?.lastName, user?.email)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm truncate">
              {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.firstName || user?.lastName || user?.email || 'User'}
            </div>
            <div className="text-xs text-gray-400">{userRole || 'USER'}</div>
          </div>
        </NavLink>
      </div>
    </aside>
  );
};

export default UserSidebar;