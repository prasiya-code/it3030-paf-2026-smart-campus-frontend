import React from 'react';

const AdminTopResources = ({ topResources }) => {
  if (!topResources || topResources.length === 0) {
    return (
      <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Top Resources</h3>
        <p className="text-blue-100">No booking data available</p>
      </div>
    );
  }

  const maxBookings = Math.max(...topResources.map(r => r.bookingCount), 1);
  const totalBookings = topResources.reduce((sum, r) => sum + r.bookingCount, 0);
  const avgBookings = totalBookings / topResources.length;
  const topResource = topResources[0];

  return (
    <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
      <h3 className="text-xl font-bold mb-6">Top Resources by Bookings</h3>
      <div className="space-y-3">
        {topResources.map((resource, index) => {
          const percentage = (resource.bookingCount / maxBookings) * 100;
          return (
            <div key={resource.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold bg-white/20 px-2 py-1 rounded-full w-8 h-8 flex items-center justify-center">
                    #{index + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{resource.name}</p>
                    <p className="text-xs text-blue-100">{resource.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{resource.bookingCount}</p>
                  <p className="text-xs text-blue-100">bookings</p>
                </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-300" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Summary Section */}
      <div className="mt-6 pt-4 border-t border-white/20">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
            <p className="text-blue-100 text-xs mb-1">Total Bookings</p>
            <p className="text-3xl font-bold">{totalBookings}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
            <p className="text-blue-100 text-xs mb-1">Avg per Resource</p>
            <p className="text-3xl font-bold">{avgBookings.toFixed(1)}</p>
          </div>
        </div>
        {topResource && (
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs mb-1">Most Popular Resource</p>
                <p className="font-semibold">{topResource.name}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{topResource.bookingCount}</p>
                <p className="text-xs text-blue-100">bookings</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTopResources;
