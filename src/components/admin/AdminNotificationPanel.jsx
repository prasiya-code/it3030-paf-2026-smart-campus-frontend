import React from 'react';

const AdminNotificationPanel = ({ notifications }) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'BOOKING_APPROVED':
        return '✅';
      case 'BOOKING_REJECTED':
        return '❌';
      case 'BOOKING_CANCELLED':
        return '🚫';
      case 'TICKET_STATUS_CHANGED':
        return '🔄';
      case 'TICKET_COMMENT_ADDED':
        return '💬';
      case 'TICKET_ASSIGNED':
        return '👤';
      default:
        return '🔔';
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
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Notifications</h3>
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div 
            key={notification.id}
            className={`p-3 rounded-lg border transition-colors ${
              notification.isRead 
                ? 'bg-slate-50 border-slate-200' 
                : 'bg-blue-50 border-blue-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="text-xl">{getNotificationIcon(notification.type)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-slate-900">{notification.title}</h4>
                  <span className="text-xs text-slate-500">{formatRelativeTime(notification.createdAt)}</span>
                </div>
                <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-slate-500">Ref: {notification.relatedItem}</span>
                  {!notification.isRead && (
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNotificationPanel;
