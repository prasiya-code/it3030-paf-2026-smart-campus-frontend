import React from 'react';

const AdminPeakBookingHours = ({ peakBookingHours }) => {
  if (!peakBookingHours || peakBookingHours.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Peak Booking Hours</h3>
        <p className="text-gray-500">No booking data available</p>
      </div>
    );
  }

  const maxCount = Math.max(...peakBookingHours.map(h => h.count));

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Peak Booking Hours</h3>
      <div className="space-y-3">
        {peakBookingHours.slice(0, 10).map((hour) => {
          const percentage = (hour.count / maxCount) * 100;
          return (
            <div key={hour.hour} className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600 w-16">
                {hour.hour}:00
              </span>
              <div className="flex-1 bg-slate-100 rounded-full h-6 overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm font-bold text-indigo-600 w-12 text-right">
                {hour.count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminPeakBookingHours;
