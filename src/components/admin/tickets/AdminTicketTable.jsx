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
                <td className="px-6 py-4 text-sm text-gray-600">{formatUser(ticket.createdBy)}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{formatUser(ticket.assignedTo)}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : '-'}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/tickets/${ticket.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                    >
                      View
                    </Link>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      Assign
                    </button>
                    <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                      Update
                    </button>
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
