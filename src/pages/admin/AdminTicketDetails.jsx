import React from 'react';
import { Link, useParams } from 'react-router-dom';
import AdminTicketDetailsCard from '../../components/admin/tickets/AdminTicketDetailsCard';
import AdminTicketMetaPanel from '../../components/admin/tickets/AdminTicketMetaPanel';
import AdminTicketCommentsPanel from '../../components/admin/tickets/AdminTicketCommentsPanel';
import AdminTicketAttachmentsPanel from '../../components/admin/tickets/AdminTicketAttachmentsPanel';
import AdminTicketActionPanel from '../../components/admin/tickets/AdminTicketActionPanel';

const AdminTicketDetails = () => {
  const { id } = useParams();

  // Sample data for demonstration
  const sampleTicket = {
    id: id || '1',
    ticketCode: 'TKT-001',
    category: 'MAINTENANCE',
    priority: 'HIGH',
    status: 'Open',
    description: 'The AC unit in Lab Room A is not working properly. It is blowing warm air instead of cold. This needs immediate attention as classes are scheduled in this room tomorrow.',
    location: 'Lab Room A, Building C, Floor 2',
    createdBy: 'Alice Johnson',
    assignedTo: 'Unassigned',
    createdAt: '2024-01-15T10:30:00',
    resolvedAt: null,
    closedAt: null,
    preferredContactName: 'Alice Johnson',
    preferredContactEmail: 'alice.johnson@example.com',
    preferredContactPhone: '+1 234 567 8900',
  };

  return (
    <div>
      {/* Header with back button */}
      <div className="mb-6">
        <Link
          to="/admin/tickets"
          className="text-sm text-gray-600 hover:text-primary-600 flex items-center gap-1 mb-4"
        >
          <span>←</span>
          <span>Back to Tickets</span>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Ticket Details</h1>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left column - Main content */}
        <div className="xl:col-span-2 space-y-6">
          <AdminTicketDetailsCard ticket={sampleTicket} />
          <AdminTicketCommentsPanel />
          <AdminTicketAttachmentsPanel />
        </div>

        {/* Right column - Sidebar */}
        <div className="space-y-6">
          <AdminTicketMetaPanel ticket={sampleTicket} />
          <AdminTicketActionPanel />
        </div>
      </div>
    </div>
  );
};

export default AdminTicketDetails;
