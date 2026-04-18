import React from 'react';

const AdminTicketDetailsCard = ({ ticket }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-700';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Resolved': return 'bg-green-100 text-green-700';
      case 'Rejected': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-100 text-red-700';
      case 'High': return 'bg-orange-100 text-orange-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Ticket Information</h2>
        <span className="text-sm text-gray-500">{ticket.ticketCode}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
          <p className="text-gray-900 font-medium">{ticket.category}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Priority</label>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
            {ticket.priority}
          </span>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}>
            {ticket.status}
          </span>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
          <p className="text-gray-900">{ticket.location || '-'}</p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <label className="block text-sm font-medium text-gray-600 mb-2">Description</label>
        <p className="text-gray-900 whitespace-pre-wrap">{ticket.description}</p>
      </div>
    </div>
  );
};

export default AdminTicketDetailsCard;
