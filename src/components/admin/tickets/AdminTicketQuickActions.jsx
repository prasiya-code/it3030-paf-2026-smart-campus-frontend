import React from 'react';

const AdminTicketQuickActions = ({ onRefresh, onExport }) => {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <button 
        onClick={onExport}
        className="px-5 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
      >
        <span>📥</span>
        <span>Export</span>
      </button>
      
      <button 
        onClick={onRefresh}
        className="px-5 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
      >
        <span>🔄</span>
        <span>Refresh</span>
      </button>
    </div>
  );
};

export default AdminTicketQuickActions;
