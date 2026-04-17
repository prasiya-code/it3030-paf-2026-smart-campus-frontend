import React from 'react';

const TicketStatsCards = () => {
  const stats = [
    { title: 'Total Tickets', value: '24', icon: '🎫', color: 'bg-blue-100 text-blue-700' },
    { title: 'Open Tickets', value: '8', icon: '🔓', color: 'bg-red-100 text-red-700' },
    { title: 'In Progress', value: '6', icon: '⏳', color: 'bg-yellow-100 text-yellow-700' },
    { title: 'Resolved', value: '10', icon: '✅', color: 'bg-green-100 text-green-700' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketStatsCards;
