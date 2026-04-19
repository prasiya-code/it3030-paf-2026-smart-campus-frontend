import React from 'react';

const AdminAnalyticsCards = ({ analytics }) => {
  const cards = [
    {
      title: 'Total Users',
      value: analytics.totalUsers || 0,
      icon: '👥',
      color: 'blue'
    },
    {
      title: 'Total Resources',
      value: analytics.totalResources || 0,
      icon: '📦',
      color: 'green'
    },
    {
      title: 'Total Bookings',
      value: analytics.totalBookings || 0,
      icon: '📅',
      color: 'orange'
    },
    {
      title: 'Total Tickets',
      value: analytics.totalTickets || 0,
      icon: '🎫',
      color: 'red'
    },
    {
      title: 'Total Comments',
      value: analytics.totalComments || 0,
      icon: '💬',
      color: 'purple'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    orange: 'bg-orange-50 border-orange-200',
    red: 'bg-red-50 border-red-200',
    purple: 'bg-purple-50 border-purple-200'
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${colorClasses[card.color]} border rounded-lg p-4`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
            </div>
            <span className="text-3xl">{card.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminAnalyticsCards;
