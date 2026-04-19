import React from 'react';

const AdminTicketAttachmentsPanel = ({ attachments = [] }) => {
  const getFileIcon = (contentType) => {
    if (!contentType) return '📎';
    if (contentType.startsWith('image/')) return '🖼️';
    if (contentType.includes('pdf')) return '📄';
    return '📎';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Attachments</h2>

      {attachments && attachments.length > 0 ? (
        <div className="space-y-3 mb-6">
          {attachments.map((attachment) => (
          <div
            key={attachment.id}
            className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
              {getFileIcon(attachment.contentType)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate" title={attachment.fileName}>{attachment.fileName}</p>
              <p className="text-sm text-gray-500">
                {(attachment.fileSize / 1024 / 1024).toFixed(2)} MB • Uploaded on{' '}
                {new Date(attachment.createdAt).toLocaleDateString()}
              </p>
            </div>
            <a
              href={`http://localhost:8080/api/attachments/download/${attachment.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-primary-600 hover:bg-primary-50 rounded-lg font-medium text-sm transition-colors"
            >
              Download
            </a>
          </div>
        ))}
      </div>
      ) : (
        <div className="text-gray-500 text-sm mb-6 italic">No attachments found for this ticket.</div>
      )}

      {/* Upload feature hidden for now since the user just requested viewing. We can re-enable later if needed */}
    </div>
  );
};

export default AdminTicketAttachmentsPanel;
