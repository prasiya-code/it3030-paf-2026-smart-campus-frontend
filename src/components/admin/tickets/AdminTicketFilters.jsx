import React from 'react';

const AdminTicketFilters = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <div className="flex flex-col xl:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by ticket code, description, or created by..."
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>

          <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
            <option value="">All Priority</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
            <option value="">All Category</option>
            <option value="maintenance">Maintenance</option>
            <option value="incident">Incident</option>
            <option value="repair">Repair</option>
            <option value="cleaning">Cleaning</option>
            <option value="other">Other</option>
          </select>

          <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
            <option value="">Assigned To</option>
            <option value="unassigned">Unassigned</option>
            <option value="tech1">John Smith</option>
            <option value="tech2">Sarah Johnson</option>
            <option value="tech3">Mike Wilson</option>
          </select>

          <button className="px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminTicketFilters;
