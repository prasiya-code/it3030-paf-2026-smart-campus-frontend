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
        resolutionNotes: resolutionNotes || undefined,
        rejectionReason: rejectionReason || undefined
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
    const isConfirmed = window.confirm('Are you sure you want to reject this ticket?');
    if (!isConfirmed) return;

    const reason = window.prompt('Please provide a reason for rejecting this ticket:');
    if (reason === null) return; // User cancelled the prompt
    
    if (reason.trim() === '') {
      window.alert('Rejection reason is required to reject a ticket.');
      return;
    }

    setIsUpdating(true);
    setError('');
    try {
      await updateTicket(ticket.id, {
        status: 'REJECTED',
        rejectionReason: reason.trim()
      });
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

      <div className="border-t border-gray-200 my-6" />

      {/* Reject Ticket Section */}
      <div>
        <h3 className="text-sm font-medium text-red-700 mb-3">Reject Ticket</h3>
        <p className="text-sm text-gray-500 mb-3">Rejecting a ticket will close it and notify the user. You must provide a reason.</p>
        <button
          onClick={handleReject}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isUpdating}
        >
          {isUpdating ? 'Processing...' : 'Reject Ticket'}
        </button>
      </div>
    </div>
  );
};

export default AdminTicketActionPanel;
