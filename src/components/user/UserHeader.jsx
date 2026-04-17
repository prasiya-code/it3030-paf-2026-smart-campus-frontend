import React from 'react';
import { Link } from 'react-router-dom';

const UserHeader = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <h1 className="font-bold text-xl text-gray-900">Opsora</h1>
        <span className="text-gray-400">|</span>
        <span className="text-gray-600 text-sm">Smart Campus Operations</span>
      </div>

      <Link to="/profile" className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors">
        <div className="text-right hidden sm:block">
          <div className="text-sm font-medium text-gray-900">Inupama</div>
          <div className="text-xs text-gray-500">inupama@example.com</div>
        </div>
        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">IN</span>
        </div>
      </Link>
    </header>
  );
};

export default UserHeader;
