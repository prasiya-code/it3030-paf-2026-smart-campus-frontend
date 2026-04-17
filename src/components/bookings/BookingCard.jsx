import React from "react";
import StatusBadge from "./StatusBadge";
import {
  getResourceName,
  getBookingCode,
  getBookingDate,
  getStartTime,
  getEndTime,
  getBookingPurpose,
  getExpectedAttendees,
} from "../../pages/bookings/bookingHelpers";

/**
 * BookingCard Component
 * Displays booking details in a polished card format
 * 
 * @param {Object} props
 * @param {Object} props.booking - Booking data object
 * @param {Function} props.onCancel - Optional cancel handler
 * @param {Function} props.onView - Optional view handler
 * @param {boolean} props.showActions - Whether to show action buttons
 */
function BookingCard({ booking, onCancel, onView, showActions = false }) {
  if (!booking) return null;

  const handleCancel = () => {
    if (onCancel && window.confirm("Are you sure you want to cancel this booking?")) {
      onCancel(booking.id);
    }
  };

  const handleView = () => {
    if (onView) {
      onView(booking);
    }
  };

  const canCancel =
    showActions &&
    (booking.status === "PENDING" || booking.status === "APPROVED");

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-200 group">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 text-lg">📅</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{getBookingCode(booking)}</h3>
            <p className="text-xs text-slate-500">{getResourceName(booking)}</p>
          </div>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500 flex items-center gap-2">
            <span>📆</span> Date
          </span>
          <span className="text-sm font-semibold text-slate-900">{getBookingDate(booking)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500 flex items-center gap-2">
            <span>🕐</span> Time
          </span>
          <span className="text-sm font-semibold text-slate-900">
            {getStartTime(booking)} <span className="text-slate-400">→</span> {getEndTime(booking)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500 flex items-center gap-2">
            <span>🎯</span> Purpose
          </span>
          <span className="text-sm font-semibold text-slate-900 text-right max-w-[50%] truncate" title={getBookingPurpose(booking)}>
            {getBookingPurpose(booking)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500 flex items-center gap-2">
            <span>👥</span> Attendees
          </span>
          <span className="text-sm font-semibold text-slate-900">{getExpectedAttendees(booking)}</span>
        </div>
      </div>

      {/* Actions */}
      {(showActions || onView) && (
        <div className="px-5 py-4 bg-slate-50/50 border-t border-slate-100 flex gap-3">
          {onView && (
            <button
              onClick={handleView}
              className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all"
            >
              View Details
            </button>
          )}
          {canCancel && (
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all shadow-sm"
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default BookingCard;
