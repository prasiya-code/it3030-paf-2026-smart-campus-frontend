import React from 'react';
import { NavLink } from 'react-router-dom';

const UserSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">O</span>
          </div>
          <div>
            <h1 className="font-bold text-lg">Opsora</h1>
            <p className="text-xs text-gray-400">Smart Campus</p>
          </div>
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
              <span className="font-medium">Dashboard</span>
            </NavLink>
          </li>

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
              <span className="font-medium">Tickets</span>
            </NavLink>
          </li>

        </ul>
      </nav>
    </aside>
  );
};

export default UserSidebar;