import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getTicketById, deleteTicket } from '../../api/ticketApi';
import AdminTicketCommentsPanel from '../../components/admin/tickets/AdminTicketCommentsPanel';

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      setLoading(true);
      const data = await getTicketById(id);
      setTicket(data);
      setError('');
    } catch (err) {
      setError('Failed to load ticket details. Please try again.');
      console.error('Error fetching ticket:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await deleteTicket(id);
      navigate('/tickets');
    } catch (err) {
      setError('Failed to delete ticket. Please try again.');
      console.error('Error deleting ticket:', err);
      setDeleteLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-700';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Resolved': return 'bg-green-100 text-green-700';
      case 'REJECTED': return 'bg-gray-100 text-gray-700 border border-gray-300';
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="ml-3 text-gray-600">Loading ticket details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
        <Link to="/tickets" className="text-primary-600 hover:text-primary-700 font-medium">
          ← Back to Tickets
        </Link>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div>
        <p className="text-gray-600 mb-4">Ticket not found.</p>
        <Link to="/tickets" className="text-primary-600 hover:text-primary-700 font-medium">
          ← Back to Tickets
        </Link>
      </div>
    );
  }

  const calculateDuration = (start, end) => {
    if (!start || !end) return '-';
    const diffMs = new Date(end) - new Date(start);
    if (diffMs < 0) return '-';
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    if (diffHours === 0) return `${diffMinutes}m`;
    return `${diffHours}h ${diffMinutes}m`;
  };

  const ticketAge = ticket?.createdAt 
    ? calculateDuration(ticket.createdAt, (ticket.status === 'RESOLVED' || ticket.status === 'CLOSED') && ticket.resolvedAt ? ticket.resolvedAt : new Date())
    : '-';

  const timeToFirstResponse = ticket?.createdAt && ticket?.firstResponseAt
    ? calculateDuration(ticket.createdAt, ticket.firstResponseAt)
    : (ticket?.firstResponseAt ? '-' : 'Pending');

  const timeToResolution = ticket?.createdAt && ticket?.resolvedAt
    ? calculateDuration(ticket.createdAt, ticket.resolvedAt)
    : (ticket?.status === 'RESOLVED' || ticket?.status === 'CLOSED' ? '-' : 'Pending');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ticket Details</h1>
          <p className="text-gray-600">View and manage ticket information</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/tickets"
            className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Back
          </Link>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700 mb-4">Are you sure you want to delete this ticket? This action cannot be undone.</p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={deleteLoading}
              className={`px-4 py-2 bg-red-600 text-white rounded-lg font-medium transition-colors ${
                deleteLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
              }`}
            >
              {deleteLoading ? 'Deleting...' : 'Confirm Delete'}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6">
        {ticket.status === 'REJECTED' && ticket.rejectionReason && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
            <h3 className="text-red-800 font-bold mb-1">Rejection Reason:</h3>
            <p className="text-red-700 whitespace-pre-wrap">{ticket.rejectionReason}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Ticket Code</label>
            <p className="text-lg font-semibold text-gray-900">{ticket.ticketCode || ticket.id}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}>
              {ticket.status}
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
            <p className="text-gray-900">{ticket.category}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Priority</label>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
              {ticket.priority}
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Created At</label>
            <p className="text-gray-900">
              {ticket.createdAt ? new Date(ticket.createdAt).toLocaleString() : '-'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Ticket Age</label>
            <p className="text-gray-900">{ticketAge}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Time to First Response</label>
            <p className="text-gray-900">{timeToFirstResponse}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Time to Resolution</label>
            <p className="text-gray-900">{timeToResolution}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
            <p className="text-gray-900">{ticket.location || '-'}</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">Description</label>
          <p className="text-gray-900 whitespace-pre-wrap">{ticket.description || '-'}</p>
        </div>

        {ticket.attachments && ticket.attachments.length > 0 && (
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Attachments</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {ticket.attachments.map((attachment) => (
                <div key={attachment.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="text-2xl">📎</div>
                  <div className="overflow-hidden flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate" title={attachment.fileName}>
                      {attachment.fileName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(attachment.fileSize / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <a
                    href={`http://localhost:8080/api/attachments/download/${attachment.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700"
                    title="Download"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
              <p className="text-gray-900">{ticket.preferredContactName || '-'}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <p className="text-gray-900">{ticket.preferredContactEmail || '-'}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
              <p className="text-gray-900">{ticket.preferredContactPhone || '-'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <AdminTicketCommentsPanel ticketId={ticket.id} />
      </div>
    </div>
  );
};

export default TicketDetails;
