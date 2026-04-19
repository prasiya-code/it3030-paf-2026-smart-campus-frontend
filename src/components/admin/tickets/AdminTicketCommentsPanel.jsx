import React, { useState, useEffect, useRef } from 'react';
import { getCommentsByTicket, createComment } from '../../../api/commentApi';

const AdminTicketCommentsPanel = ({ ticketId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const commentsEndRef = useRef(null);

  useEffect(() => {
    if (ticketId) {
      fetchComments();
    }
  }, [ticketId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const data = await getCommentsByTicket(ticketId);
      setComments(data);
      setError('');
    } catch (err) {
      console.error('Failed to load comments:', err);
      setError('Could not load comments.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    
    try {
      setSubmitting(true);
      await createComment({
        ticketId: ticketId,
        content: newComment.trim()
      });
      setNewComment('');
      fetchComments(); // Refresh comments list
    } catch (err) {
      console.error('Failed to add comment:', err);
      setError('Failed to add comment.');
    } finally {
      setSubmitting(false);
    }
  };

  const isStaff = (roles = []) => {
    return roles.some(r => r.name === 'ADMIN' || r.name === 'TECHNICIAN');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col h-[500px]">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 shrink-0">Comments</h2>
      
      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded shrink-0">{error}</div>
      )}

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
          </div>
        ) : comments.length === 0 ? (
          <p className="text-gray-500 text-center py-4 text-sm">No comments yet.</p>
        ) : (
          comments.map((comment) => {
            const staff = isStaff(comment.user?.roles);
            return (
              <div
                key={comment.id}
                className={`p-4 rounded-lg ${
                  staff ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 border border-gray-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {comment.user?.firstName} {comment.user?.lastName || ''}
                    </span>
                    {staff && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                        Staff
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700 text-sm whitespace-pre-wrap">{comment.content}</p>
              </div>
            );
          })
        )}
        <div ref={commentsEndRef} />
      </div>

      <div className="border-t border-gray-200 pt-4 shrink-0">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          rows="3"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none text-sm"
          disabled={submitting}
        />
        <div className="flex justify-end mt-3">
          <button 
            onClick={handleAddComment}
            disabled={!newComment.trim() || submitting}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            {submitting ? 'Posting...' : 'Add Comment'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminTicketCommentsPanel;
