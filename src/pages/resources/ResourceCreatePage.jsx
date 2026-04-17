import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResourceForm from '../../components/resources/ResourceForm';
import { createResource } from '../../api/resourceApi';

const ResourceCreatePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Role detection - defaults to 'user' for production safety
  // In production, role would come from backend auth
  const [isAdmin, setIsAdmin] = useState(() => {
    const storedRole = localStorage.getItem('userRole');
    return (storedRole || 'user') === 'admin';
  });

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/resources', { replace: true });
    }
  }, [isAdmin, navigate]);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      
      const resourceData = {
        ...formData,
        capacity: parseInt(formData.capacity, 10)
      };
      
      await createResource(resourceData);
      navigate('/resources');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create resource. Please try again.');
      console.error('Error creating resource:', err);
    } finally {
      setLoading(false);
    }
  };

  // Don't render form if not admin
  if (!isAdmin) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Resource</h1>
          <p className="text-gray-600 text-lg">
            Add a new resource to the campus management system
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <ResourceForm
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default ResourceCreatePage;
