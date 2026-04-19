import React from 'react';

const AdminUserAnalytics = ({ userAnalytics }) => {
  if (!userAnalytics) {
    return (
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2">User Analytics</h3>
        <p className="text-indigo-100">No data available</p>
      </div>
    );
  }

  const roleDistribution = userAnalytics.roleDistribution || {};
  const userGrowth = userAnalytics.userGrowth || [];
  const activeUsers = userAnalytics.activeUsers || 0;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const maxGrowth = Math.max(...userGrowth.map(d => d.count), 1);

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
      <h3 className="text-xl font-bold mb-6">User Analytics</h3>
      
      {/* Active Users Card */}
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-indigo-100 text-sm mb-1">Active Users</p>
            <p className="text-xs text-indigo-200">Last 30 days</p>
          </div>
          <span className="text-4xl font-bold">{activeUsers}</span>
        </div>
      </div>

      {/* Role Distribution */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-indigo-100 mb-3">Role Distribution</h4>
        <div className="space-y-2">
          {Object.entries(roleDistribution).map(([role, count]) => (
            <div key={role} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center justify-between">
              <span className="text-sm font-medium">{role}</span>
              <span className="text-lg font-bold bg-white/20 px-3 py-1 rounded-full">{count}</span>
            </div>
          ))}
          {Object.keys(roleDistribution).length === 0 && (
            <p className="text-sm text-indigo-200">No role data available</p>
          )}
        </div>
      </div>

      {/* User Growth */}
      <div>
        <h4 className="text-sm font-semibold text-indigo-100 mb-3">User Growth (Last 7 Days)</h4>
        <div className="space-y-2">
          {userGrowth.map((day, index) => {
            const percentage = (day.count / maxGrowth) * 100;
            return (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{formatDate(day.date)}</span>
                  <span className="text-lg font-bold">{day.count}</span>
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
          {userGrowth.length === 0 && (
            <p className="text-sm text-indigo-200">No growth data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUserAnalytics;
