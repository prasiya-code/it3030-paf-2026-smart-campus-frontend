import React from 'react';

const AdminTicketAnalytics = ({ ticketAnalytics }) => {
  if (!ticketAnalytics) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Ticket Analytics</h3>
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const ticketTrends = ticketAnalytics.ticketTrends || [];
  const avgResolutionTime = ticketAnalytics.avgResolutionTime || 0;
  const openTickets = ticketAnalytics.openTickets || 0;
  const highPriorityTickets = ticketAnalytics.highPriorityTickets || 0;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Ticket Analytics</h3>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <span className="text-sm text-gray-600 block mb-1">Open Tickets</span>
          <span className="text-2xl font-bold text-orange-600">{openTickets}</span>
        </div>
        <div className="text-center">
          <span className="text-sm text-gray-600 block mb-1">High Priority</span>
          <span className="text-2xl font-bold text-red-600">{highPriorityTickets}</span>
        </div>
        <div className="text-center">
          <span className="text-sm text-gray-600 block mb-1">Avg Resolution</span>
          <span className="text-2xl font-bold text-blue-600">{avgResolutionTime.toFixed(1)}h</span>
        </div>
      </div>

      {/* Ticket Trends */}
      <div>
        <h4 className="text-sm font-medium text-slate-700 mb-3">Ticket Trends (Last 7 Days)</h4>
        <div className="space-y-2">
          {ticketTrends.map((day, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{formatDate(day.date)}</span>
              <span className="text-sm font-semibold text-slate-900">{day.count}</span>
            </div>
          ))}
          {ticketTrends.length === 0 && (
            <p className="text-sm text-gray-500">No trend data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTicketAnalytics;
