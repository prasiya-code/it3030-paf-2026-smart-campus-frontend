import React, { useState, useEffect } from 'react';
import { authApi } from '../../../api/authApi';

const AdminTicketFilters = ({ filters, setFilters }) => {
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const techs = await authApi.getUsersByRole('TECHNICIAN');
        setTechnicians(techs);
      } catch (err) {
        console.error('Failed to load technicians for filter:', err);
      }
    };
    fetchTechnicians();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({
      search: '',
      status: '',
      priority: '',
      category: '',
      assignedTo: ''
    });
  };
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <div className="flex flex-col xl:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search by ticket code, description, or created by..."
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <select name="status" value={filters.status} onChange={handleChange} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
            <option value="">All Status</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <select name="priority" value={filters.priority} onChange={handleChange} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
            <option value="">All Priority</option>
            <option value="URGENT">Urgent</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

          <select name="category" value={filters.category} onChange={handleChange} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
            <option value="">All Category</option>
            <option value="MAINTENANCE">Maintenance</option>
            <option value="INCIDENT">Incident</option>
            <option value="REPAIR">Repair</option>
            <option value="CLEANING">Cleaning</option>
            <option value="OTHER">Other</option>
          </select>

          <select name="assignedTo" value={filters.assignedTo} onChange={handleChange} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
            <option value="">Assigned To</option>
            <option value="UNASSIGNED">Unassigned</option>
            {technicians.map(tech => (
              <option key={tech.id} value={tech.id.toString()}>
                {tech.firstName} {tech.lastName || ''}
              </option>
            ))}
          </select>

          <button 
            onClick={handleReset}
            className="px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminTicketFilters;
