import React from "react";
import StatusBadge from "./StatusBadge";
import {
  getResourceName,
  getUserName,
  getBookingCode,
  getBookingDate,
  getStartTime,
  getEndTime,
} from "../../utils/helpers";

/**
 * BookingTable Component
 * Displays a list of bookings in a polished table format
 *
 * @param {Object} props
 * @param {Array} props.bookings - Array of booking objects
 * @param {boolean} props.loading - Whether data is loading
 * @param {boolean} props.showUser - Whether to show user column
 * @param {boolean} props.showActions - Whether to show actions column
 * @param {boolean} props.showAdminReason - Whether to show admin reason column
 * @param {Function} props.onApprove - Approve handler (for admin)
 * @param {Function} props.onReject - Reject handler (for admin)
 * @param {Function} props.onCancel - Cancel handler
 * @param {Function} props.renderCustomActions - Custom action renderer
 * @param {string} props.emptyMessage - Message when no bookings found
 */
function BookingTable({
  bookings = [],
  loading = false,
  showUser = false,
  showActions = false,
  showAdminReason = false,
  onApprove,
  onReject,
  onCancel,
  renderCustomActions,
  emptyMessage = "No bookings found",
}) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-100 border-t-blue-600"></div>
          <div className="absolute inset-0 rounded-full h-12 w-12 border-4 border-transparent border-t-blue-400 opacity-50 animate-pulse"></div>
        </div>
        <p className="mt-4 text-slate-600 font-medium">Loading bookings...</p>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-3xl">📋</span>
        </div>
        <p className="text-slate-500 text-center font-medium">{emptyMessage}</p>
        <p className="text-slate-400 text-sm text-center mt-1">Try adjusting your filters or create a new booking</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
            <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Code</th>
            <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Resource</th>
            {showUser && <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">User</th>}
            <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
            <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Time</th>
            <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Purpose</th>
            <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Attendees</th>
            <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
            {showAdminReason && <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Admin Reason</th>}
            {showActions && <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {bookings.map((booking, index) => (
            <tr 
              key={booking.id} 
              className={`hover:bg-blue-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}
            >
              <td className="px-4 py-3.5 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-md border border-blue-100">
                  {getBookingCode(booking)}
                </span>
              </td>
              <td className="px-4 py-3.5 whitespace-nowrap">
                <span className="text-sm font-medium text-slate-900">{getResourceName(booking)}</span>
              </td>
              {showUser && (
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {getUserName(booking)?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <span className="text-sm text-slate-700">{getUserName(booking)}</span>
                  </div>
                </td>
              )}
              <td className="px-4 py-3.5 whitespace-nowrap">
                <span className="text-sm text-slate-700">{getBookingDate(booking)}</span>
              </td>
              <td className="px-4 py-3.5 whitespace-nowrap">
                <span className="text-sm text-slate-700">
                  <span className="text-slate-900 font-medium">{getStartTime(booking)}</span>
                  <span className="text-slate-400 mx-1">→</span>
                  <span className="text-slate-900 font-medium">{getEndTime(booking)}</span>
                </span>
              </td>
              <td className="px-4 py-3.5">
                <span className="text-sm text-slate-700 line-clamp-1 max-w-[180px]" title={booking.purpose}>
                  {booking.purpose || "-"}
                </span>
              </td>
              <td className="px-4 py-3.5 whitespace-nowrap">
                <span className="inline-flex items-center gap-1 text-sm text-slate-700">
                  <span>👥</span>
                  {booking.expectedAttendees ?? "-"}
                </span>
              </td>
              <td className="px-4 py-3.5 whitespace-nowrap">
                <StatusBadge status={booking.status} />
              </td>
              {showAdminReason && (
                <td className="px-4 py-3.5">
                  <span className="text-sm text-slate-700 line-clamp-2 max-w-[200px]" title={booking.adminReason || ""}>
                    {booking.adminReason ? booking.adminReason : "-"}
                  </span>
                </td>
              )}
              {showActions && (
                <td className="px-4 py-3.5 whitespace-nowrap">
                  {renderCustomActions ? (
                    renderCustomActions(booking)
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {onApprove && booking.status === "PENDING" && (
                        <button
                          onClick={() => onApprove(booking.id)}
                          className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-md hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all shadow-sm"
                        >
                          Approve
                        </button>
                      )}
                      {onReject && booking.status === "PENDING" && (
                        <button
                          onClick={() => onReject(booking.id)}
                          className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-md hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all shadow-sm"
                        >
                          Reject
                        </button>
                      )}
                      {onCancel &&
                        (booking.status === "PENDING" || booking.status === "APPROVED") && (
                          <button
                            onClick={() => onCancel(booking.id)}
                            className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-md hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all shadow-sm"
                          >
                            Cancel
                          </button>
                        )}
                    </div>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookingTable;
