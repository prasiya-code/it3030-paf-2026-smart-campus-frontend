import React from 'react';
import AdminSectionTitle from '../../components/admin/AdminSectionTitle';
import AdminStatCard from '../../components/admin/AdminStatCard';
import AdminQuickActions from '../../components/admin/AdminQuickActions';
import AdminActivityFeed from '../../components/admin/AdminActivityFeed';
import {
  adminStats,
  activityFeed,
  quickActions
} from '../../mocks/adminDashboardMock';

const AdminDashboardPage = () => {
  const getCurrentDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Admin Header Section */}
      <div className="bg-white border-b border-slate-200 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">{getCurrentDate()}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview Section */}
        <AdminSectionTitle title="Overview" subtitle="Key metrics at a glance" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AdminStatCard
            title="Total Resources"
            value={adminStats.totalResources}
            change={`${adminStats.activeResources} active`}
            icon="📦"
            color="blue"
          />
          <AdminStatCard
            title="Pending Bookings"
            value={adminStats.pendingBookings}
            change="Needs review"
            icon="📅"
            color="orange"
          />
          <AdminStatCard
            title="Open Tickets"
            value={adminStats.openTickets}
            change={`${adminStats.inProgressTickets} in progress`}
            icon="🎫"
            color="red"
          />
          <AdminStatCard
            title="Unread Notifications"
            value={adminStats.unreadNotifications}
            change="New alerts"
            icon="🔔"
            color="purple"
          />
        </div>

        {/* Quick Actions Section */}
        <AdminSectionTitle title="Quick Actions" subtitle="Common admin tasks" />
        <div className="mb-8">
          <AdminQuickActions actions={quickActions} />
        </div>

        {/* Activity Feed Section */}
        <AdminSectionTitle title="Recent Activity" subtitle="System-wide updates" />
        <div className="mb-8">
          <AdminActivityFeed activities={activityFeed} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
