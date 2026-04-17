import React, { useState, useEffect } from 'react';
import { getMyTickets } from '../../api/ticketApi';
import TicketStatsCards from '../../components/tickets/TicketStatsCards';
import TicketQuickActions from '../../components/tickets/TicketQuickActions';
import TicketFilters from '../../components/tickets/TicketFilters';
import TicketTable from '../../components/tickets/TicketTable';
import EmptyTicketsState from '../../components/tickets/EmptyTicketsState';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const data = await getMyTickets();
      setTickets(data);
      setError('');
    } catch (err) {
      setError('Failed to load tickets. Please try again.');
      console.error('Error fetching tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Ticket Management</h1>
      <p className="text-gray-600 mb-6">Manage maintenance and incident tickets</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <TicketStatsCards />
      <TicketQuickActions />
      <TicketFilters />

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-3 text-gray-600">Loading tickets...</span>
        </div>
      ) : tickets.length === 0 ? (
        <EmptyTicketsState />
      ) : (
        <TicketTable tickets={tickets} />
      )}
    </div>
  );
};

export default Tickets;
