import React from 'react';

const AdminTicketMetaPanel = ({ ticket }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Metadata</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Created By</label>
          <p className="text-gray-900">{ticket.createdBy}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Assigned To</label>
          <p className="text-gray-900">{ticket.assignedTo || 'Unassigned'}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Created Date</label>
          <p className="text-gray-900">
            {ticket.createdAt ? new Date(ticket.createdAt).toLocaleString() : '-'}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Resolved Date</label>
          <p className="text-gray-900">
            {ticket.resolvedAt ? new Date(ticket.resolvedAt).toLocaleString() : '-'}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Closed Date</label>
          <p className="text-gray-900">
            {ticket.closedAt ? new Date(ticket.closedAt).toLocaleString() : '-'}
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-6 pt-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Contact Information</h3>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Preferred Contact Name</label>
            <p className="text-gray-900">{ticket.preferredContactName || '-'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Preferred Contact Email</label>
            <p className="text-gray-900">{ticket.preferredContactEmail || '-'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Preferred Contact Phone</label>
            <p className="text-gray-900">{ticket.preferredContactPhone || '-'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTicketMetaPanel;
