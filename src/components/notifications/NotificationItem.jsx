import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

const NotificationItem = ({ notification, onMarkAsRead }) => {
  const [isHovered, setIsHovered] = useState(false);
  const {
    id,
    title,
    message,
    type,
    isRead,
    relatedBookingId,
    relatedTicketId,
    createdAt
  } = notification;

  const getNotificationIcon = (type) => {
    const iconClasses = "w-5 h-5 flex-shrink-0 transition-transform duration-200";
    
    switch (type) {
      case 'BOOKING_APPROVED':
        return (
          <div className={`${iconClasses} text-green-600 ${isHovered ? 'scale-110' : ''}`}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'BOOKING_REJECTED':
      case 'BOOKING_CANCELLED':
        return (
          <div className={`${iconClasses} text-red-600 ${isHovered ? 'scale-110' : ''}`}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'TICKET_STATUS_CHANGED':
        return (
          <div className={`${iconClasses} text-blue-600 ${isHovered ? 'scale-110' : ''}`}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'TICKET_COMMENT_ADDED':
        return (
          <div className={`${iconClasses} text-purple-600 ${isHovered ? 'scale-110' : ''}`}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        );
      case 'TICKET_ASSIGNED':
        return (
          <div className={`${iconClasses} text-yellow-600 ${isHovered ? 'scale-110' : ''}`}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className={`${iconClasses} text-gray-600 ${isHovered ? 'scale-110' : ''}`}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
        );
    }
  };

  const getTypeLabel = (type) => {
    return type.replace(/_/g, ' ').toLowerCase();
  };

  const getTimeAgo = (dateString) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return 'Unknown time';
    }
  };

  const handleItemClick = () => {
    if (!isRead) {
      onMarkAsRead(id);
    }
  };

  const hasRelatedEntity = relatedBookingId || relatedTicketId;

  return (
    <div
      className={`
        p-4 border-b border-gray-200 cursor-pointer transition-all duration-200 relative
        ${!isRead 
          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-l-blue-500 hover:from-blue-100 hover:to-indigo-100' 
          : 'bg-white hover:bg-gray-50'
        }
        ${isHovered ? 'shadow-sm' : ''}
      `}
      onClick={handleItemClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start space-x-3">
        <div className="mt-0.5">
          {getNotificationIcon(type)}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className={`text-sm font-medium ${!isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                {title}
              </h4>
              <p className={`text-sm mt-1 ${!isRead ? 'text-gray-800' : 'text-gray-600'}`}>
                {message}
              </p>
              <div className="flex items-center mt-2 space-x-2">
                <span className="text-xs text-gray-500 capitalize">
                  {getTypeLabel(type)}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">
                  {getTimeAgo(createdAt)}
                </span>
                {hasRelatedEntity && (
                  <>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full">
                      {relatedBookingId ? `Booking #${relatedBookingId}` : `Ticket #${relatedTicketId}`}
                    </span>
                  </>
                )}
              </div>
            </div>
            
            {!isRead && (
              <div className="ml-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
