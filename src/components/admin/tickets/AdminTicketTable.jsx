import React from 'react';
import { Link } from 'react-router-dom';

const AdminTicketTable = ({ tickets = [], loading = false }) => {
  const formatUser = (user) => {
    if (!user) return 'Unassigned';
    if (typeof user === 'string') return user;
    if (user.firstName) return `${user.firstName} ${user.lastName || ''}`.trim();
    if (user.name) return user.name;
    return 'Unknown';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'OPEN': return 'bg-sky-100 text-sky-700';
      case 'IN_PROGRESS': return 'bg-amber-100 text-amber-700';
      case 'RESOLVED': return 'bg-green-100 text-green-700';
      case 'CLOSED': return 'bg-gray-100 text-gray-700 border border-gray-300';
      case 'REJECTED': return 'bg-red-100 text-red-700 border border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'URGENT': return 'bg-red-100 text-red-700 border border-red-200';
      case 'HIGH': return 'bg-orange-100 text-orange-700';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-700';
      case 'LOW': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatEnumText = (text) => {
    if (!text) return '';
    return text.charAt(0) + text.slice(1).toLowerCase().replace('_', ' ');
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden p-12 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mb-4"></div>
        <p className="text-gray-500">Loading tickets...</p>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden p-12 text-center">
        <div className="text-4xl mb-3">🎫</div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No tickets found</h3>
        <p className="text-gray-500">There are currently no tickets matching your criteria.</p>
      </div>
    );
  }

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
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Created By</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Assigned To</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Created Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tickets.map((ticket) => (
              <tr 
                key={ticket.id} 
                className={`transition-colors ${
                  ticket.priority === 'URGENT' 
                    ? 'bg-red-50 hover:bg-red-100' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{ticket.ticketCode || ticket.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{ticket.category}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                    {formatEnumText(ticket.priority)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                    {formatEnumText(ticket.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{formatUser(ticket.createdBy)}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{formatUser(ticket.assignedTo)}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : '-'}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/tickets/${ticket.id}`}
                      className="text-primary-600 hover:text-primary-800 font-medium text-sm bg-primary-50 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Manage Ticket
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTicketTable;
