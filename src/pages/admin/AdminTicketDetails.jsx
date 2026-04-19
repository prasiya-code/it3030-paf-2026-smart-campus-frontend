import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getTicketById } from '../../api/ticketApi';
import AdminTicketDetailsCard from '../../components/admin/tickets/AdminTicketDetailsCard';
import AdminTicketMetaPanel from '../../components/admin/tickets/AdminTicketMetaPanel';
import AdminTicketCommentsPanel from '../../components/admin/tickets/AdminTicketCommentsPanel';
import AdminTicketAttachmentsPanel from '../../components/admin/tickets/AdminTicketAttachmentsPanel';
import AdminTicketActionPanel from '../../components/admin/tickets/AdminTicketActionPanel';

const AdminTicketDetails = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      setLoading(true);
      const data = await getTicketById(id);
      setTicket(data);
      setError('');
    } catch (err) {
      setError('Failed to load ticket details.');
      console.error('Error fetching ticket:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="ml-3 text-gray-600">Loading ticket details...</span>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error || 'Ticket not found.'}
        </div>
        <Link to="/admin/tickets" className="text-primary-600 hover:text-primary-700 font-medium">
          ← Back to Tickets
        </Link>
      </div>
    );
  }

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
          <AdminTicketDetailsCard ticket={ticket} />
          <AdminTicketCommentsPanel ticketId={ticket.id} comments={ticket.comments} />
          <AdminTicketAttachmentsPanel attachments={ticket.attachments} />
        </div>

        {/* Right column - Sidebar */}
        <div className="space-y-6">
          <AdminTicketMetaPanel ticket={ticket} />
          <AdminTicketActionPanel ticket={ticket} onTicketUpdate={fetchTicket} />
        </div>
      </div>
    </div>
  );
};

export default AdminTicketDetails;
