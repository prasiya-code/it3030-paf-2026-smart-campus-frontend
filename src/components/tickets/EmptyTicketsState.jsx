import React from 'react';

const EmptyTicketsState = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-3xl">🎫</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No tickets found</h3>
      <p className="text-gray-500 mb-6">Get started by creating a new ticket</p>
      <button className="px-5 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
        Create Ticket
      </button>
    </div>
  );
};

export default EmptyTicketsState;
