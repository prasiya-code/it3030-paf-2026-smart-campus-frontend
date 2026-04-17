import React from 'react';

const ResourceTable = ({ 
  resources, 
  onEdit, 
  onDelete, 
  loading = false,
  isAdmin = false 
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mb-2"></div>
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  const hasResources = resources && resources.length > 0;
  const colSpan = isAdmin ? 6 : 5; // Adjust colSpan based on admin status

  // Get initials from resource name for avatar
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get avatar background color based on resource type
  const getAvatarColor = (type) => {
    const colors = {
      'LECTURE_HALL': 'bg-blue-500',
      'LAB': 'bg-purple-500',
      'MEETING_ROOM': 'bg-green-500',
      'EQUIPMENT': 'bg-orange-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  const getStatusColor = (status) => {
    return status === 'ACTIVE' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/4 rounded-tl-lg">
              Resource
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/6">
              Type
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/4">
              Location
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/12">
              Capacity
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/8">
              Status
            </th>
            {isAdmin && (
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/6 rounded-tr-lg">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white">
          {hasResources ? (
            resources.map((resource, index) => (
              <tr 
                key={resource.id} 
                className={`border-b border-gray-100 hover:bg-blue-50 transition-all duration-200 cursor-pointer ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    {/* Avatar with initials */}
                    <div className={`w-10 h-10 rounded-full ${getAvatarColor(resource.type)} flex items-center justify-center text-white text-sm font-bold shadow-sm`}>
                      {getInitials(resource.name)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {resource.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {resource.resourceCode}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {resource.type.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {resource.location}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {resource.capacity}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    resource.status === 'ACTIVE' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {resource.status.replace('_', ' ')}
                  </span>
                </td>
                {isAdmin && (
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onEdit(resource)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 hover:shadow-sm transition-all mr-2"
                      title="Edit resource"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(resource)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 hover:shadow-sm transition-all"
                      title="Delete resource"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td 
                colSpan={colSpan} 
                className="px-4 py-16 text-center"
              >
                <div className="flex flex-col items-center gap-4">
                  {/* Empty state illustration */}
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium text-lg mb-1">No resources found</p>
                    <p className="text-gray-500 text-sm">Try creating one to get started.</p>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ResourceTable;
