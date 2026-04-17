import React from 'react';

const SkeletonLoader = ({ type = 'notification', count = 1 }) => {
  const renderNotificationSkeleton = () => (
    <div className="p-4 border-b border-gray-200 animate-pulse">
      <div className="flex items-start space-x-3">
        <div className="w-5 h-5 bg-gray-300 rounded mt-0.5"></div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3 mb-3"></div>
              <div className="flex items-center space-x-2">
                <div className="h-3 bg-gray-200 rounded w-16"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
            <div className="ml-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPageHeaderSkeleton = () => (
    <div className="animate-pulse">
      <div className="flex items-center justify-between h-16 bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-gray-300 rounded mr-4"></div>
            <div className="h-6 bg-gray-300 rounded w-32"></div>
          </div>
          <div className="w-5 h-5 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="border-b border-gray-200 p-4 animate-pulse">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-6 bg-gray-300 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="animate-pulse" style={{ animationDelay: `${index * 0.1}s` }}>
            {renderNotificationSkeleton()}
          </div>
        ))}
      </div>
    </div>
  );

  switch (type) {
    case 'notification':
      return renderNotificationSkeleton();
    case 'page-header':
      return renderPageHeaderSkeleton();
    case 'list':
      return renderListSkeleton();
    default:
      return renderNotificationSkeleton();
  }
};

export default SkeletonLoader;
