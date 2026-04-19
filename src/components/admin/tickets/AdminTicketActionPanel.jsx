import React, { useState, useEffect } from 'react';
import { updateTicket } from '../../../api/ticketApi';
import { authApi } from '../../../api/authApi';

const AdminTicketActionPanel = ({ ticket, onTicketUpdate }) => {
  const [selectedTechnician, setSelectedTechnician] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [technicians, setTechnicians] = useState([{ value: '', label: 'Select technician' }]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  useEffect(() => {
    // Set initial values from ticket
    if (ticket) {
      if (ticket.assignedTo) setSelectedTechnician(ticket.assignedTo.id.toString());
      if (ticket.status) setSelectedStatus(ticket.status);
    }
  }, [ticket]);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const techs = await authApi.getUsersByRole('TECHNICIAN');
        const options = techs.map(t => ({
          value: t.id.toString(),
          label: `${t.firstName} ${t.lastName || ''}`.trim()
        }));
        setTechnicians([{ value: '', label: 'Select technician' }, ...options]);
      } catch (err) {
        console.error('Failed to load technicians:', err);
      }
    };
    fetchTechnicians();
  }, []);

  const statuses = [
    { value: '', label: 'Select status' },
    { value: 'OPEN', label: 'OPEN' },
    { value: 'IN_PROGRESS', label: 'IN_PROGRESS' },
    { value: 'RESOLVED', label: 'RESOLVED' },
    { value: 'CLOSED', label: 'CLOSED' },
  ];

  const handleAssign = async () => {
    setIsUpdating(true);
    setError('');
    try {
      await updateTicket(ticket.id, {
        status: selectedStatus || ticket.status,
        assignedToId: selectedTechnician ? parseInt(selectedTechnician, 10) : null
      });
      if (onTicketUpdate) onTicketUpdate();
    } catch (err) {
      setError('Failed to assign ticket.');
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateStatus = async () => {
    setIsUpdating(true);
    setError('');
    try {
      await updateTicket(ticket.id, {
        status: selectedStatus,
        resolutionNotes: resolutionNotes || undefined
      });
      if (onTicketUpdate) onTicketUpdate();
    } catch (err) {
      setError('Failed to update status.');
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReject = async () => {
    setIsUpdating(true);
    setError('');
    try {
      await updateTicket(ticket.id, {
        status: 'REJECTED',
        rejectionReason: rejectionReason
      });
      setShowRejectModal(false);
      if (onTicketUpdate) onTicketUpdate();
    } catch (err) {
      setError('Failed to reject ticket.');
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Ticket Actions</h2>
      
      {error && <div className="mb-4 text-red-600 text-sm bg-red-50 p-2 rounded">{error}</div>}

      {/* Assign Ticket Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Assign Ticket</h3>
        <div className="space-y-3">
          <select
            value={selectedTechnician}
            onChange={(e) => setSelectedTechnician(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            {technicians.map((tech) => (
              <option key={tech.value} value={tech.value}>
                {tech.label}
              </option>
            ))}
          </select>
          <button
            onClick={handleAssign}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedTechnician || isUpdating}
          >
            {isUpdating ? 'Assigning...' : 'Assign Ticket'}
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 my-6" />

      {/* Update Status Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Update Status</h3>
        <div className="space-y-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          <button
            onClick={handleUpdateStatus}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedStatus || isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Update Status'}
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 my-6" />

      {/* Resolution Notes Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Resolution Notes</h3>
        <textarea
          value={resolutionNotes}
          onChange={(e) => setResolutionNotes(e.target.value)}
          placeholder="Enter resolution details, actions taken, parts used, etc."
          rows="4"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
        />
      </div>

      {/* Reject Ticket Section */}
      <div className="mt-4">
        <button
          onClick={() => setShowRejectModal(true)}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isUpdating}
        >
          Reject Ticket
        </button>
      </div>

      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Reject Ticket</h3>
              <p className="text-sm text-red-600 mb-4 bg-red-50 p-3 rounded-lg border border-red-100">
                Are you sure you want to reject this ticket? This action cannot be undone.
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rejection Reason <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Enter the reason for rejecting this ticket..."
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                  required
                />
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason(''); // Reset reason on cancel
                }}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                disabled={isUpdating}
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                disabled={!rejectionReason.trim() || isUpdating}
              >
                {isUpdating ? 'Rejecting...' : 'Confirm Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTicketActionPanel;
