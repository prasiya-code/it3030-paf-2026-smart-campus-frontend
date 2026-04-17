import React from 'react';
import { TICKET_PRIORITY, TICKET_STATUS } from '../../mocks/adminDashboardMock';

const AdminRecentTicketsTable = ({ tickets }) => {
  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case TICKET_PRIORITY.URGENT:
        return 'bg-red-100 text-red-800 border-red-200';
      case TICKET_PRIORITY.HIGH:
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case TICKET_PRIORITY.MEDIUM:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case TICKET_PRIORITY.LOW:
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case TICKET_STATUS.OPEN:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case TICKET_STATUS.IN_PROGRESS:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case TICKET_STATUS.RESOLVED:
        return 'bg-green-100 text-green-800 border-green-200';
      case TICKET_STATUS.CLOSED:
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case TICKET_STATUS.REJECTED:
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Code</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Title</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Priority</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Assigned To</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {tickets.map((ticket) => (
              <tr 
                key={ticket.id} 
                className={`hover:bg-slate-50 ${ticket.priority === TICKET_PRIORITY.URGENT ? 'bg-red-50' : ''}`}
              >
                <td className="px-4 py-3 text-sm font-medium text-slate-900">{ticket.ticketCode}</td>
                <td className="px-4 py-3 text-sm text-slate-700 max-w-xs truncate">{ticket.title}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{ticket.category}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getPriorityBadgeClass(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadgeClass(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-700">
                  {ticket.assignedTo ? (
                    <div>
                      <div>{ticket.assignedTo}</div>
                      <div className="text-xs text-slate-500">{ticket.assignedToEmail}</div>
                    </div>
                  ) : (
                    <span className="text-slate-400 italic">Unassigned</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View</button>
                    {!ticket.assignedTo && (
                      <button className="text-sm text-green-600 hover:text-green-800 font-medium">Assign</button>
                    )}
                    {ticket.status === TICKET_STATUS.OPEN && (
                      <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">Update</button>
                    )}
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

export default AdminRecentTicketsTable;
