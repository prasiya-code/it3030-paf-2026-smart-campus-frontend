import React, { useState, useEffect } from 'react';
import { notificationApi } from '../../api/notificationApi';

const sampleNotifications = [
  {
    id: 1,
    title: "Booking Approved",
    message: "Your booking for Room A has been approved.",
    type: "BOOKING_APPROVED",
    isRead: false,
    relatedBookingId: 101,
    relatedTicketId: null,
    createdAt: new Date(Date.now() - 5 * 60000).toISOString()
  },
  {
    id: 2,
    title: "Booking Rejected",
    message: "Your booking for Lab 3 was rejected due to scheduling conflict.",
    type: "BOOKING_REJECTED",
    isRead: false,
    relatedBookingId: 102,
    relatedTicketId: null,
    createdAt: new Date(Date.now() - 30 * 60000).toISOString()
  },
  {
    id: 3,
    title: "Ticket Status Changed",
    message: "Your ticket #TKT-005 is now IN_PROGRESS.",
    type: "TICKET_STATUS_CHANGED",
    isRead: true,
    relatedBookingId: null,
    relatedTicketId: 55,
    createdAt: new Date(Date.now() - 2 * 60 * 60000).toISOString()
  },
  {
    id: 4,
    title: "New Comment Added",
    message: "A technician added a comment to your ticket #TKT-003.",
    type: "TICKET_COMMENT_ADDED",
    isRead: true,
    relatedBookingId: null,
    relatedTicketId: 53,
    createdAt: new Date(Date.now() - 4 * 60 * 60000).toISOString()
  },
  {
    id: 5,
    title: "Ticket Assigned",
    message: "Your ticket #TKT-007 has been assigned to technician John.",
    type: "TICKET_ASSIGNED",
    isRead: false,
    relatedBookingId: null,
    relatedTicketId: 57,
    createdAt: new Date(Date.now() - 24 * 60 * 60000).toISOString()
  }
];

const getTypeStyle = (type) => {
  const styles = {
    BOOKING_APPROVED: {
      border: 'border-l-green-500',
      bg: 'bg-green-100',
      icon: '✅'
    },
    BOOKING_REJECTED: {
      border: 'border-l-red-500',
      bg: 'bg-red-100',
      icon: '❌'
    },
    BOOKING_CANCELLED: {
      border: 'border-l-orange-500',
      bg: 'bg-orange-100',
      icon: '🚫'
    },
    TICKET_STATUS_CHANGED: {
      border: 'border-l-blue-500',
      bg: 'bg-blue-100',
      icon: '🔄'
    },
    TICKET_COMMENT_ADDED: {
      border: 'border-l-purple-500',
      bg: 'bg-purple-100',
      icon: '💬'
    },
    TICKET_ASSIGNED: {
      border: 'border-l-indigo-500',
      bg: 'bg-indigo-100',
      icon: '👤'
    }
  };
  return styles[type] || { border: 'border-l-gray-500', bg: 'bg-gray-100', icon: '📌' };
};

const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setIsLoading(true);
      const data = await notificationApi.getAllNotifications();
      if (data && data.length > 0) {
        setNotifications(data);
      } else {
        setNotifications(sampleNotifications);
      }
    } catch (err) {
      console.error('Error loading notifications, using sample data:', err);
      setNotifications(sampleNotifications);
    } finally {
      setIsLoading(false);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = async (id) => {
    try {
      await notificationApi.markAsRead(id);
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, isRead: true } : n)
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationApi.markAllAsRead();
      setNotifications(prev =>
        prev.map(n => ({ ...n, isRead: true }))
      );
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.isRead;
    if (filter === 'read') return n.isRead;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Notifications {unreadCount > 0 && <span className="text-slate-500 font-normal">({unreadCount} unread)</span>}
          </h1>
        </div>
        {!isLoading && notifications.length > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Mark All as Read
          </button>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-400"></div>
          </div>
          <p className="text-slate-600">Loading notifications...</p>
        </div>
      ) : (
        <>
          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6">
            {['all', 'unread', 'read'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === tab
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Notification List */}
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🔔</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No notifications</h3>
                <p className="text-slate-600">
                  {filter === 'unread' ? "You have no unread notifications." :
                   filter === 'read' ? "You have no read notifications." :
                   "You don't have any notifications yet."}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => {
                const style = getTypeStyle(notification.type);
                return (
                  <div
                    key={notification.id}
                    className={`relative border-l-4 ${style.border} rounded-lg shadow-sm ${
                      notification.isRead
                        ? 'bg-white'
                        : 'bg-indigo-50'
                    }`}
                  >
                    <div className="p-4 sm:p-5">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 ${style.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <span className="text-lg">{style.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <h3 className={`font-semibold text-slate-900 mb-1 ${
                                notification.isRead ? 'font-normal' : 'font-bold'
                              }`}>
                                {notification.title}
                              </h3>
                              <p className="text-sm text-slate-600 mb-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-slate-500">
                                {formatRelativeTime(notification.createdAt)}
                              </p>
                            </div>
                            {!notification.isRead && (
                              <button
                                onClick={() => handleMarkAsRead(notification.id)}
                                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-primary-600 bg-primary-50 rounded-md hover:bg-primary-100 transition-colors flex-shrink-0"
                              >
                                Mark as Read
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationsPage;
