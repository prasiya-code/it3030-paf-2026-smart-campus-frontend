import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ResourceForm from '../../components/resources/ResourceForm';
import { getResourceById, updateResource } from '../../api/resourceApi';

const ResourceEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);


  const loadResource = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getResourceById(id);
      setResource(data);
    } catch (err) {
      const errorMessage = err.response?.data?.message 
        || err.response?.data?.error 
        || err.message 
        || 'Failed to load resource';
      setError(`Error: ${errorMessage}`);
      console.error('Error loading resource:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResource();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);
      setError(null);
      
      const resourceData = {
        ...formData,
        capacity: parseInt(formData.capacity, 10)
      };
      
      await updateResource(id, resourceData);
      navigate('/admin/resources');
    } catch (err) {
      const errorMessage = err.response?.data?.message 
        || err.response?.data?.error 
        || err.message 
        || 'Failed to update resource';
      setError(`Error: ${errorMessage}`);
      console.error('Error updating resource:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mb-4"></div>
              <p className="text-gray-600 text-lg font-medium">Loading resource...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !resource) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Resource</h1>
          <p className="text-gray-600 text-lg">
            Update resource information in the campus management system
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <ResourceForm
            initialData={resource}
            onSubmit={handleSubmit}
            loading={submitting}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default ResourceEditPage;
