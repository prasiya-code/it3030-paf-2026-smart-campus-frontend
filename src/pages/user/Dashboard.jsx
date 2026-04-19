import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuthContext();
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

  const stats = [
    { icon: '🎫', label: 'My Tickets', value: '5', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { icon: '📅', label: 'My Bookings', value: '3', color: 'text-green-600', bgColor: 'bg-green-50' },
    { icon: '📦', label: 'Available Resources', value: '12', color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { icon: '🔔', label: 'Notifications', value: '2', color: 'text-orange-600', bgColor: 'bg-orange-50' },
  ];

  const recentActivity = [
    { icon: '🎫', message: 'Ticket #1234 created', time: '2 hours ago' },
    { icon: '📅', message: 'Booking confirmed for Meeting Room A', time: '5 hours ago' },
    { icon: '🔔', message: 'New notification received', time: '1 day ago' },
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
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{stat.icon}</span>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-900">{stat.label}</p>
          </div>
        ))}
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
