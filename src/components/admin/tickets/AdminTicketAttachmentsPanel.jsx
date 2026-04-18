import React from 'react';

const AdminTicketAttachmentsPanel = () => {
  const sampleAttachments = [
    {
      id: 1,
      name: 'ac_unit_issue.jpg',
      size: '2.4 MB',
      type: 'image',
      uploadedBy: 'Alice Johnson',
      uploadedAt: '2024-01-15T10:30:00',
    },
    {
      id: 2,
      name: 'error_log.txt',
      size: '15 KB',
      type: 'document',
      uploadedBy: 'Alice Johnson',
      uploadedAt: '2024-01-15T10:31:00',
    },
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case 'image': return '🖼️';
      case 'document': return '📄';
      default: return '📎';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Attachments</h2>

      <div className="space-y-3 mb-6">
        {sampleAttachments.map((attachment) => (
          <div
            key={attachment.id}
            className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
              {getFileIcon(attachment.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{attachment.name}</p>
              <p className="text-sm text-gray-500">
                {attachment.size} • Uploaded by {attachment.uploadedBy} on{' '}
                {new Date(attachment.uploadedAt).toLocaleDateString()}
              </p>
            </div>
            <button className="px-3 py-1.5 text-primary-600 hover:bg-primary-50 rounded-lg font-medium text-sm transition-colors">
              Download
            </button>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
          <div className="text-3xl mb-2">📎</div>
          <p className="text-sm text-gray-600 mb-1">
            <span className="text-primary-600 font-medium">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-400">Files up to 10MB</p>
        </div>
      </div>
    </div>
  );
};

export default AdminTicketAttachmentsPanel;
