import React from 'react';
import { Link } from 'react-router-dom';

const TicketQuickActions = () => {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <Link
        to="/tickets/create"
        className="px-5 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center gap-2"
      >
        <span>+</span>
        <span>Create Ticket</span>
      </Link>
      
      <button className="px-5 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
        <span>📥</span>
        <span>Export</span>
      </button>
      
      <button className="px-5 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
        <span>🔄</span>
        <span>Refresh</span>
      </button>
    </div>
  );
};

export default TicketQuickActions;
