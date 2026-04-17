import React from "react";

/**
 * StatusBadge Component
 * Displays booking status with polished Tailwind styling
 * 
 * @param {Object} props
 * @param {string} props.status - Booking status (PENDING, APPROVED, CANCELLED, REJECTED)
 * @param {string} props.className - Additional CSS classes
 */
function StatusBadge({ status, className = "" }) {
  const getStatusConfig = (status) => {
    switch (status?.toUpperCase()) {
      case "APPROVED":
        return {
          bg: "bg-gradient-to-r from-emerald-50 to-green-50",
          text: "text-emerald-700",
          border: "border-emerald-200",
          dot: "bg-emerald-500",
          label: "Approved"
        };
      case "PENDING":
        return {
          bg: "bg-gradient-to-r from-amber-50 to-yellow-50",
          text: "text-amber-700",
          border: "border-amber-200",
          dot: "bg-amber-500",
          label: "Pending"
        };
      case "REJECTED":
        return {
          bg: "bg-gradient-to-r from-red-50 to-rose-50",
          text: "text-red-700",
          border: "border-red-200",
          dot: "bg-red-500",
          label: "Rejected"
        };
      case "CANCELLED":
        return {
          bg: "bg-gradient-to-r from-slate-50 to-gray-50",
          text: "text-slate-600",
          border: "border-slate-200",
          dot: "bg-slate-400",
          label: "Cancelled"
        };
      default:
        return {
          bg: "bg-gradient-to-r from-slate-50 to-gray-50",
          text: "text-slate-600",
          border: "border-slate-200",
          dot: "bg-slate-400",
          label: status ? status.charAt(0) + status.slice(1).toLowerCase() : "Unknown"
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border shadow-sm ${config.bg} ${config.text} ${config.border} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
      {config.label}
    </span>
  );
}

export default StatusBadge;
