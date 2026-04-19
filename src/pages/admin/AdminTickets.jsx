import React, { useState, useEffect } from 'react';
import AdminTicketStatsCards from '../../components/admin/tickets/AdminTicketStatsCards';
import AdminTicketQuickActions from '../../components/admin/tickets/AdminTicketQuickActions';
import AdminTicketFilters from '../../components/admin/tickets/AdminTicketFilters';
import AdminTicketTable from '../../components/admin/tickets/AdminTicketTable';
import { getAllTickets } from '../../api/ticketApi';

const AdminTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    category: '',
    assignedTo: ''
  });

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    let result = tickets;

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(t => 
        (t.ticketCode && t.ticketCode.toLowerCase().includes(q)) ||
        (t.description && t.description.toLowerCase().includes(q)) ||
        (t.createdBy && t.createdBy.firstName && t.createdBy.firstName.toLowerCase().includes(q))
      );
    }
    if (filters.status) result = result.filter(t => t.status === filters.status);
    if (filters.priority) result = result.filter(t => t.priority === filters.priority);
    if (filters.category) result = result.filter(t => t.category === filters.category);
    if (filters.assignedTo) {
      if (filters.assignedTo === 'UNASSIGNED') {
        result = result.filter(t => !t.assignedTo);
      } else {
        result = result.filter(t => t.assignedTo && t.assignedTo.id.toString() === filters.assignedTo);
      }
    }

    setFilteredTickets(result);
  }, [tickets, filters]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const data = await getAllTickets();
      setTickets(data);
      setError('');
    } catch (err) {
      setError('Failed to load tickets. Please try again.');
      console.error('Error fetching all tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Ticket Management</h1>
        <p className="text-gray-600">Review, assign, and update maintenance and incident tickets</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <AdminTicketStatsCards tickets={tickets} />
      <AdminTicketQuickActions />
      <AdminTicketFilters filters={filters} setFilters={setFilters} />
      <AdminTicketTable tickets={filteredTickets} loading={loading} />
    </div>
  );
};

export default AdminTickets;
