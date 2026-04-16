import React from 'react';

const UserHeader = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <h1 className="font-bold text-xl text-gray-900">Opsora</h1>
        <span className="text-gray-400">|</span>
        <span className="text-gray-600 text-sm">Smart Campus Operations</span>
      </div>

      <div className="w-10 h-10 bg-gray-200 rounded-full" />
    </header>
  );
};

export default UserHeader;
