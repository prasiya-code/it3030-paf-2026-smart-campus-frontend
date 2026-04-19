import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { getMyTickets } from '../../api/ticketApi';
import { getMyBookings } from '../../api/bookingApi';
import { getAllResources } from '../../api/resourceApi';
import { notificationApi } from '../../api/notificationApi';

const Dashboard = () => {
  const { user } = useAuthContext();
  const [stats, setStats] = useState({
    tickets: 0,
    bookings: 0,
    resources: 0,
    notifications: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getCurrentDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const quickActions = [
    { icon: '🎫', label: 'Create Ticket', path: '/tickets/create', color: 'bg-blue-50 border-blue-200' },
    { icon: '📅', label: 'Create Booking', path: '/create-booking', color: 'bg-green-50 border-green-200' },
    { icon: '📦', label: 'View Resources', path: '/resources', color: 'bg-purple-50 border-purple-200' },
    { icon: '🔔', label: 'Notifications', path: '/notifications', color: 'bg-orange-50 border-orange-200' },
  ];

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);

      // Fetch all data in parallel
      const [tickets, bookings, resources, notifications] = await Promise.all([
        getMyTickets().catch(() => []),
        getMyBookings().catch(() => []),
        getAllResources().catch(() => []),
        notificationApi.getAllNotifications().catch(() => [])
      ]);

      // Update stats
      setStats({
        tickets: Array.isArray(tickets) ? tickets.length : 0,
        bookings: Array.isArray(bookings) ? bookings.length : 0,
        resources: Array.isArray(resources) ? resources.length : 0,
        notifications: Array.isArray(notifications) ? notifications.length : 0
      });

      // Build recent activity from tickets, bookings, and notifications
      const activities = [];

      // Add recent tickets
      if (Array.isArray(tickets)) {
        tickets.slice(0, 3).forEach(ticket => {
          activities.push({
            icon: '🎫',
            message: `Ticket #${ticket.id} created`,
            time: formatRelativeTime(ticket.createdAt)
          });
        });
      }

      // Add recent bookings
      if (Array.isArray(bookings)) {
        bookings.slice(0, 3).forEach(booking => {
          activities.push({
            icon: '📅',
            message: `Booking ${booking.status?.toLowerCase() || 'created'}`,
            time: formatRelativeTime(booking.createdAt)
          });
        });
      }

      // Add recent notifications
      if (Array.isArray(notifications)) {
        notifications.slice(0, 3).forEach(notification => {
          activities.push({
            icon: '🔔',
            message: notification.title || notification.message || 'New notification',
            time: formatRelativeTime(notification.createdAt)
          });
        });
      }

      // Sort by time and take top 5
      setRecentActivity(activities.slice(0, 5));
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatRelativeTime = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const statsData = [
    { icon: '🎫', label: 'My Tickets', value: stats.tickets, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { icon: '📅', label: 'My Bookings', value: stats.bookings, color: 'text-green-600', bgColor: 'bg-green-50' },
    { icon: '📦', label: 'Available Resources', value: stats.resources, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { icon: '🔔', label: 'Notifications', value: stats.notifications, color: 'text-orange-600', bgColor: 'bg-orange-50' },
  ];

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {getGreeting()}, {user?.firstName || user?.email?.split('@')[0] || 'User'}!
        </h1>
        <p className="text-gray-500">{getCurrentDate()}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {isLoading ? (
          [1, 2, 3, 4].map((index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="w-24 h-4 bg-gray-200 rounded"></div>
            </div>
          ))
        ) : (
          statsData.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{stat.icon}</span>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">{stat.label}</p>
            </div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <NavLink
              key={index}
              to={action.path}
              className={`border rounded-xl p-6 hover:shadow-md transition-shadow ${action.color}`}
            >
              <div className="text-3xl mb-3">{action.icon}</div>
              <p className="font-medium text-gray-900">{action.label}</p>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg animate-pulse">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="w-48 h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="w-24 h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : recentActivity.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-4xl mb-4 block">📭</span>
              <p className="text-gray-500">No recent activity</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">{activity.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.message}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Resources Preview */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Explore Resources</h2>
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">Discover Campus Resources</h3>
          <p className="text-indigo-100 mb-4">Book meeting rooms, labs, and equipment for your projects and events.</p>
          <NavLink
            to="/resources"
            className="inline-block bg-white text-indigo-600 px-6 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
          >
            Browse Resources
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
