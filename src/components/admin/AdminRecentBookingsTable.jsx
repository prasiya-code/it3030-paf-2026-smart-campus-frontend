import React from 'react';
import { BOOKING_STATUS } from '../../mocks/adminDashboardMock';

const AdminRecentBookingsTable = ({ bookings }) => {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case BOOKING_STATUS.PENDING:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case BOOKING_STATUS.APPROVED:
        return 'bg-green-100 text-green-800 border-green-200';
      case BOOKING_STATUS.REJECTED:
        return 'bg-red-100 text-red-800 border-red-200';
      case BOOKING_STATUS.CANCELLED:
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Code</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Resource</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Time</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">User</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-slate-900">{booking.bookingCode}</td>
                <td className="px-4 py-3 text-sm text-slate-700">
                  <div>{booking.resource}</div>
                  <div className="text-xs text-slate-500">{booking.resourceType}</div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-700">{booking.bookingDate}</td>
                <td className="px-4 py-3 text-sm text-slate-700">
                  {booking.startTime} - {booking.endTime}
                </td>
                <td className="px-4 py-3 text-sm text-slate-700">
                  <div>{booking.user}</div>
                  <div className="text-xs text-slate-500">{booking.userEmail}</div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadgeClass(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View</button>
                    {booking.status === BOOKING_STATUS.PENDING && (
                      <>
                        <button className="text-sm text-green-600 hover:text-green-800 font-medium">Approve</button>
                        <button className="text-sm text-red-600 hover:text-red-800 font-medium">Reject</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRecentBookingsTable;
