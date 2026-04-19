import React from 'react';

const AdminTopResources = ({ topResources }) => {
  if (!topResources || topResources.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Resources</h3>
        <p className="text-gray-500">No booking data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Resources by Bookings</h3>
      <div className="space-y-3">
        {topResources.map((resource, index) => (
          <div key={resource.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-indigo-600 w-6">#{index + 1}</span>
              <div>
                <p className="font-medium text-slate-900">{resource.name}</p>
                <p className="text-sm text-gray-500">{resource.type}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-indigo-600">{resource.bookingCount}</p>
              <p className="text-xs text-gray-500">bookings</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTopResources;
