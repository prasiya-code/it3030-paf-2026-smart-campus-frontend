import React from 'react';
import AdminTicketStatsCards from '../../components/admin/tickets/AdminTicketStatsCards';
import AdminTicketQuickActions from '../../components/admin/tickets/AdminTicketQuickActions';
import AdminTicketFilters from '../../components/admin/tickets/AdminTicketFilters';
import AdminTicketTable from '../../components/admin/tickets/AdminTicketTable';

const AdminTickets = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Ticket Management</h1>
        <p className="text-gray-600">Review, assign, and update maintenance and incident tickets</p>
      </div>

      <AdminTicketStatsCards />
      <AdminTicketQuickActions />
      <AdminTicketFilters />
      <AdminTicketTable />
    </div>
  );
};

export default AdminTickets;
