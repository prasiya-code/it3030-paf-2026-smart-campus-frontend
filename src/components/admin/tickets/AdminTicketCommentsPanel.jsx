import React from 'react';

const AdminTicketCommentsPanel = () => {
  const sampleComments = [
    {
      id: 1,
      author: 'John Smith',
      role: 'Technician',
      timestamp: '2024-01-15T14:30:00',
      message: 'I have reviewed the ticket and will start working on this issue shortly.',
      isStaff: true,
    },
    {
      id: 2,
      author: 'Alice Johnson',
      role: 'User',
      timestamp: '2024-01-15T10:30:00',
      message: 'The AC unit in Lab Room A is not working properly. It is blowing warm air instead of cold.',
      isStaff: false,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Comments</h2>

      <div className="space-y-4 mb-6">
        {sampleComments.map((comment) => (
          <div
            key={comment.id}
            className={`p-4 rounded-lg ${
              comment.isStaff ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">{comment.author}</span>
                {comment.isStaff && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                    Staff
                  </span>
                )}
                <span className="text-sm text-gray-500">({comment.role})</span>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(comment.timestamp).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-700">{comment.message}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <textarea
          placeholder="Add a comment..."
          rows="3"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
        />
        <div className="flex justify-end mt-3">
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminTicketCommentsPanel;
