import React, { useState, useEffect } from 'react';
import AdminSectionTitle from '../../components/admin/AdminSectionTitle';
import AdminQuickActions from '../../components/admin/AdminQuickActions';
import AdminAnalyticsCards from '../../components/admin/AdminAnalyticsCards';
import AdminTopResources from '../../components/admin/AdminTopResources';
import AdminPeakBookingHours from '../../components/admin/AdminPeakBookingHours';
import AdminRecentActivity from '../../components/admin/AdminRecentActivity';
import { analyticsApi } from '../../api/analyticsApi';
import {
  quickActions
} from '../../mocks/adminDashboardMock';

const AdminDashboardPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const data = await analyticsApi.getDashboardAnalytics();
      setAnalytics(data);
    } catch (err) {
      setError('Failed to load analytics data');
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-gray-500">Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

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
        {/* Analytics Cards Section */}
        <AdminSectionTitle title="Overview" subtitle="Key metrics at a glance" />
        <div className="mb-8">
          <AdminAnalyticsCards analytics={analytics} />
        </div>

        {/* Top Resources and Peak Hours */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AdminTopResources topResources={analytics?.topResources} />
          <AdminPeakBookingHours peakBookingHours={analytics?.peakBookingHours} />
        </div>

        {/* Quick Actions Section */}
        <AdminSectionTitle title="Quick Actions" subtitle="Common admin tasks" />
        <div className="mb-8">
          <AdminQuickActions actions={quickActions} />
        </div>

        {/* Recent Activity Section */}
        <AdminSectionTitle title="Recent Activity" subtitle="System-wide updates" />
        <div className="mb-8">
          <AdminRecentActivity recentActivity={analytics?.recentActivity} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
