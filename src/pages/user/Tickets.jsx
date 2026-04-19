import React, { useState, useEffect } from 'react';
import { getMyTickets } from '../../api/ticketApi';
import TicketStatsCards from '../../components/tickets/TicketStatsCards';
import TicketQuickActions from '../../components/tickets/TicketQuickActions';
import TicketFilters from '../../components/tickets/TicketFilters';
import TicketTable from '../../components/tickets/TicketTable';
import EmptyTicketsState from '../../components/tickets/EmptyTicketsState';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    category: ''
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
        (t.description && t.description.toLowerCase().includes(q))
      );
    }
    if (filters.status) result = result.filter(t => t.status === filters.status);
    if (filters.priority) result = result.filter(t => t.priority === filters.priority);
    if (filters.category) result = result.filter(t => t.category === filters.category);

    setFilteredTickets(result);
  }, [tickets, filters]);

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

  const handleExport = () => {
    if (!filteredTickets || filteredTickets.length === 0) return;
    
    const headers = ['Ticket Code', 'Category', 'Priority', 'Status', 'Created Date'];
    const csvRows = [headers.join(',')];
    
    for (const t of filteredTickets) {
      const row = [
        t.ticketCode || t.id,
        t.category,
        t.priority,
        t.status,
        t.createdAt ? new Date(t.createdAt).toLocaleDateString() : ''
      ];
      csvRows.push(row.join(','));
    }
    
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my_tickets_export.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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

      <TicketStatsCards tickets={tickets} />
      <TicketQuickActions onRefresh={fetchTickets} onExport={handleExport} />
      {tickets.length > 0 && <TicketFilters filters={filters} setFilters={setFilters} />}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-3 text-gray-600">Loading tickets...</span>
        </div>
      ) : tickets.length === 0 ? (
        <EmptyTicketsState />
      ) : (
        <TicketTable tickets={filteredTickets} />
      )}
    </div>
  );
};

export default Tickets;
