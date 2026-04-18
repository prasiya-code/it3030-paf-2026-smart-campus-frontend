import React from 'react';
import { Link } from 'react-router-dom';

const AdminTicketTable = () => {
  const sampleTickets = [
    {
      id: 1,
      ticketCode: 'TKT-001',
      category: 'MAINTENANCE',
      priority: 'HIGH',
      status: 'Open',
      createdBy: 'Alice Johnson',
      assignedTo: 'Unassigned',
      createdAt: '2024-01-15T10:30:00',
    },
    {
      id: 2,
      ticketCode: 'TKT-002',
      category: 'INCIDENT',
      priority: 'URGENT',
      status: 'In Progress',
      createdBy: 'Bob Smith',
      assignedTo: 'John Smith',
      createdAt: '2024-01-14T14:20:00',
    },
    {
      id: 3,
      ticketCode: 'TKT-003',
      category: 'REPAIR',
      priority: 'MEDIUM',
      status: 'Resolved',
      createdBy: 'Carol White',
      assignedTo: 'Sarah Johnson',
      createdAt: '2024-01-13T09:15:00',
    },
    {
      id: 4,
      ticketCode: 'TKT-004',
      category: 'CLEANING',
      priority: 'LOW',
      status: 'Open',
      createdBy: 'David Brown',
      assignedTo: 'Unassigned',
      createdAt: '2024-01-12T16:45:00',
    },
    {
      id: 5,
      ticketCode: 'TKT-005',
      category: 'OTHER',
      priority: 'MEDIUM',
      status: 'Rejected',
      createdBy: 'Emma Davis',
      assignedTo: 'Mike Wilson',
      createdAt: '2024-01-11T11:00:00',
    },
  ];

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
            {sampleTickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{ticket.ticketCode}</td>
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
                <td className="px-6 py-4 text-sm text-gray-600">{ticket.createdBy}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{ticket.assignedTo}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(ticket.createdAt).toLocaleDateString()}
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
