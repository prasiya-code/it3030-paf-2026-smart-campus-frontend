import React, { useState, useEffect } from 'react';
import AdminTicketStatsCards from '../../components/admin/tickets/AdminTicketStatsCards';
import AdminTicketQuickActions from '../../components/admin/tickets/AdminTicketQuickActions';
import AdminTicketFilters from '../../components/admin/tickets/AdminTicketFilters';
import AdminTicketTable from '../../components/admin/tickets/AdminTicketTable';
import { getAllTickets } from '../../api/ticketApi';

const AdminTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);

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

      <AdminTicketStatsCards />
      <AdminTicketQuickActions />
      <AdminTicketFilters />
      <AdminTicketTable tickets={tickets} loading={loading} />
    </div>
  );
};

export default AdminTickets;
