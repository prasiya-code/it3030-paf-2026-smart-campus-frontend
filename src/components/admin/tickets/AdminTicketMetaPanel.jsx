import React from 'react';

const AdminTicketMetaPanel = ({ ticket }) => {
  const calculateDuration = (start, end) => {
    if (!start || !end) return '-';
    const diffMs = new Date(end) - new Date(start);
    if (diffMs < 0) return '-';
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    if (diffHours === 0) return `${diffMinutes}m`;
    return `${diffHours}h ${diffMinutes}m`;
  };

  const ticketAge = ticket.createdAt 
    ? calculateDuration(ticket.createdAt, (ticket.status === 'RESOLVED' || ticket.status === 'CLOSED') && ticket.resolvedAt ? ticket.resolvedAt : new Date())
    : '-';

  const timeToFirstResponse = ticket.createdAt && ticket.firstResponseAt
    ? calculateDuration(ticket.createdAt, ticket.firstResponseAt)
    : (ticket.firstResponseAt ? '-' : 'Pending');

  const timeToResolution = ticket.createdAt && ticket.resolvedAt
    ? calculateDuration(ticket.createdAt, ticket.resolvedAt)
    : (ticket.status === 'RESOLVED' || ticket.status === 'CLOSED' ? '-' : 'Pending');

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Metadata & SLA</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Created By</label>
          <p className="text-gray-900">{ticket.createdBy ? `${ticket.createdBy.firstName} ${ticket.createdBy.lastName || ''}` : '-'}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Assigned To</label>
          <p className="text-gray-900">{ticket.assignedTo ? `${ticket.assignedTo.firstName} ${ticket.assignedTo.lastName || ''}` : 'Unassigned'}</p>
        </div>

        <div className="border-t border-gray-100 pt-3">
          <label className="block text-sm font-medium text-gray-600 mb-1">Ticket Age</label>
          <p className="text-gray-900 font-medium">{ticketAge}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Time to First Response</label>
          <p className="text-gray-900 font-medium">{timeToFirstResponse}</p>
          {ticket.firstResponseAt && (
            <p className="text-xs text-gray-500 mt-0.5">
              Responded at: {new Date(ticket.firstResponseAt).toLocaleString()}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Time to Resolution</label>
          <p className="text-gray-900 font-medium">{timeToResolution}</p>
        </div>

        <div className="border-t border-gray-100 pt-3">
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
