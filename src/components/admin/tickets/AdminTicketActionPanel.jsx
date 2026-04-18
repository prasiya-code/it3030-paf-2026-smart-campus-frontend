import React, { useState } from 'react';

const AdminTicketActionPanel = () => {
  const [selectedTechnician, setSelectedTechnician] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  const technicians = [
    { value: '', label: 'Select technician' },
    { value: 'tech1', label: 'John Smith' },
    { value: 'tech2', label: 'Sarah Johnson' },
    { value: 'tech3', label: 'Mike Wilson' },
    { value: 'tech4', label: 'Emily Brown' },
  ];

  const statuses = [
    { value: '', label: 'Select status' },
    { value: 'OPEN', label: 'OPEN' },
    { value: 'IN_PROGRESS', label: 'IN_PROGRESS' },
    { value: 'RESOLVED', label: 'RESOLVED' },
    { value: 'CLOSED', label: 'CLOSED' },
    { value: 'REJECTED', label: 'REJECTED' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Ticket Actions</h2>

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
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedTechnician}
          >
            Assign Ticket
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
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedStatus}
          >
            Update Status
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

      {/* Rejection Reason Section */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Rejection Reason</h3>
        <textarea
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          placeholder="Enter reason for rejecting this ticket..."
          rows="3"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
        />
      </div>
    </div>
  );
};

export default AdminTicketActionPanel;
