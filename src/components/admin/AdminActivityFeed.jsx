import React from 'react';

const AdminActivityFeed = ({ activities }) => {
  const getActionIcon = (action) => {
    switch (action) {
      case 'Booking Approved':
        return '✅';
      case 'Booking Rejected':
        return '❌';
      case 'Ticket Assigned':
        return '👤';
      case 'Ticket Resolved':
        return '🎉';
      case 'Resource Updated':
        return '🔄';
      default:
        return '📝';
    }
  };

  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / 60000);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm">{getActionIcon(activity.action)}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-slate-900">{activity.action}</h4>
                <span className="text-xs text-slate-500">{formatRelativeTime(activity.timestamp)}</span>
              </div>
              <p className="text-sm text-slate-600 mt-1">{activity.description}</p>
              <p className="text-xs text-slate-500 mt-1">by {activity.actor}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminActivityFeed;
