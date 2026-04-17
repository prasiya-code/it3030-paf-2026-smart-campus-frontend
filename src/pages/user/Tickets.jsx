import React from 'react';
import TicketStatsCards from '../../components/tickets/TicketStatsCards';
import TicketQuickActions from '../../components/tickets/TicketQuickActions';
import TicketFilters from '../../components/tickets/TicketFilters';
import TicketTable from '../../components/tickets/TicketTable';

const Tickets = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Ticket Management</h1>
      <p className="text-gray-600 mb-6">Manage maintenance and incident tickets</p>

      <TicketStatsCards />
      <TicketQuickActions />
      <TicketFilters />
      <TicketTable />
    </div>
  );
};

export default Tickets;
