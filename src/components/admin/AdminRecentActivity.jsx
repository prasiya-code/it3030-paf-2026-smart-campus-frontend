import React from 'react';

const AdminRecentActivity = ({ recentActivity }) => {
  if (!recentActivity || recentActivity.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
        <p className="text-gray-500">No recent activity</p>
      </div>
    );
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'booking':
        return '📅';
      case 'ticket':
        return '🎫';
      default:
        return '📌';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMins = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    if (diffInMins < 1) return 'Just now';
    if (diffInMins < 60) return `${diffInMins}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {recentActivity.map((activity, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
            <span className="text-2xl">{getActivityIcon(activity.type)}</span>
            <div className="flex-1">
              <p className="font-medium text-slate-900">{activity.message}</p>
              <p className="text-sm text-gray-500">
                {activity.user && `${activity.user} • `}
                {activity.resource && `${activity.resource} • `}
                {activity.description && `${activity.description.substring(0, 50)}${activity.description.length > 50 ? '...' : ''} • `}
                {formatTimestamp(activity.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminRecentActivity;
