import React from 'react';
import { Link } from 'react-router-dom';

const AdminQuickActions = ({ actions }) => {
  const colorClasses = {
    blue: 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700',
    green: 'bg-green-50 hover:bg-green-100 border-green-200 text-green-700',
    orange: 'bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-700',
    red: 'bg-red-50 hover:bg-red-100 border-red-200 text-red-700',
    purple: 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700',
    indigo: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-700'
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {actions.map((action) => (
        <Link
          key={action.id}
          to={action.route}
          className={`p-4 rounded-lg border-2 transition-colors ${colorClasses[action.color] || colorClasses.blue}`}
        >
          <div className="text-2xl mb-2">{action.icon}</div>
          <h3 className="font-semibold text-sm">{action.title}</h3>
          <p className="text-xs opacity-75 mt-1">{action.description}</p>
        </Link>
      ))}
    </div>
  );
};

export default AdminQuickActions;
