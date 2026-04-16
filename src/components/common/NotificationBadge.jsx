import React from 'react';

const NotificationBadge = ({ count, children, className = '' }) => {
  return (
    <div className={`relative inline-block transition-transform duration-200 hover:scale-105 ${className}`}>
      {children}
      {count > 0 && (
        <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full min-w-[20px] h-5 animate-pulse shadow-lg">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </div>
  );
};

export default NotificationBadge;
