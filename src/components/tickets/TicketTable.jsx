import React from 'react';
import { Link } from 'react-router-dom';

const TicketTable = ({ tickets = [] }) => {

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-700';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Resolved': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Ticket Code</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Priority</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Created Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{ticket.ticketCode || ticket.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{ticket.category}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : '-'}
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/tickets/${ticket.id}`}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketTable;
