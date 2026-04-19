import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResourceTable from '../../components/resources/ResourceTable';
import TimeTravelSimulator from '../../components/resources/TimeTravelSimulator';
import { getAllResources, deleteResource } from '../../api/resourceApi';

const RESOURCE_TYPES = [
  'LECTURE_HALL',
  'LAB',
  'MEETING_ROOM',
  'EQUIPMENT'
];

const RESOURCE_STATUSES = [
  'ACTIVE',
  'OUT_OF_SERVICE'
];

const AdminResourceListPage = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [simulatedTime, setSimulatedTime] = useState(null); // Time Travel Simulator

  // Safe data loading with proper error handling
  const loadResources = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get resources from API
      const data = await getAllResources();
      
      // Ensure we always have an array
      const safeData = Array.isArray(data) ? data : [];
      setResources(safeData);
      setFilteredResources(safeData);
      
    } catch (err) {
      console.error('Error loading resources:', err);
      // Show actual error from backend response
      const errorMessage = err.response?.data?.message 
        || err.response?.data?.error 
        || err.message 
        || 'Failed to load resources';
      setError(`Error: ${errorMessage}`);
      // Set empty array to prevent crashes
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  // Load resources on component mount
  useEffect(() => {
    loadResources();
  }, []);

  // Client-side search filtering
  const handleSearch = () => {
    const query = searchQuery.trim().toLowerCase();
    
    if (!query) {
      setFilteredResources(resources);
      return;
    }
    
    const filtered = resources.filter(resource => {
      const nameMatch = resource.name?.toLowerCase().includes(query);
      const typeMatch = resource.type?.toLowerCase().includes(query);
      const locationMatch = resource.location?.toLowerCase().includes(query);
      const codeMatch = resource.code?.toLowerCase().includes(query);
      
      return nameMatch || typeMatch || locationMatch || codeMatch;
    });
    
    setFilteredResources(filtered);
  };

  // Handle edit navigation
  const handleEdit = (resource) => {
    if (resource && resource.id) {
      navigate(`/admin/resources/edit/${resource.id}`);
    } else {
      setError('Invalid resource selected');
    }
  };

  // Handle delete with confirmation and error handling
  const handleDelete = async (resource) => {
    if (!resource || !resource.id) {
      setError('Invalid resource selected');
      return;
    }

    const confirmMessage = `Are you sure you want to delete "${resource.name || 'this resource'}"?`;
    if (window.confirm(confirmMessage)) {
      try {
        await deleteResource(resource.id);
        // Reload resources to show updated list
        loadResources();
      } catch (err) {
        console.error('Error deleting resource:', err);
        const errorMessage = err.response?.data?.message 
          || err.response?.data?.error 
          || err.message 
          || 'Failed to delete resource';
        setError(`Error: ${errorMessage}`);
      }
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setTypeFilter('');
    setStatusFilter('');
    setFilteredResources(resources);
  };

  // Handle time change from Time Travel Simulator
  const handleTimeChange = (time) => {
    setSimulatedTime(time);
  };

  // Apply type and status filters to filtered resources
  const displayResources = (filteredResources || []).filter(resource => {
    if (!resource) return false;
    const matchesType = !typeFilter || resource.type === typeFilter;
    const matchesStatus = !statusFilter || resource.status === statusFilter;
    return matchesType && matchesStatus;
  });

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mb-4"></div>
              <p className="text-gray-600 text-lg font-medium">Loading resources...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resource Management</h1>
          <p className="text-gray-600 text-lg">
            Manage campus resources including lecture halls, labs, and equipment
          </p>
        </div>

        {/* Time Travel Simulator */}
        <TimeTravelSimulator 
          onTimeChange={handleTimeChange}
          initialTime="08:00"
        />

        {/* Action Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto flex-wrap">
              {/* Search */}
              <div className="flex gap-2 flex-1 min-w-[300px]">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search resources by name, type, or location..."
                    value={searchQuery || ''}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      // Real-time search
                      const query = e.target.value.trim().toLowerCase();
                      if (!query) {
                        setFilteredResources(resources);
                      } else {
                        const filtered = resources.filter(resource => {
                          const nameMatch = resource.name?.toLowerCase().includes(query);
                          const typeMatch = resource.type?.toLowerCase().includes(query);
                          const locationMatch = resource.location?.toLowerCase().includes(query);
                          const codeMatch = resource.code?.toLowerCase().includes(query);
                          return nameMatch || typeMatch || locationMatch || codeMatch;
                        });
                        setFilteredResources(filtered);
                      }
                    }}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    disabled={loading}
                  />
                  <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button
                  onClick={handleSearch}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </button>
                {/* Clear Filters */}
                {(searchQuery || typeFilter || statusFilter) && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm font-medium inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear
                  </button>
                )}
              </div>

              {/* Type Filter */}
              <select
                value={typeFilter || ''}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                disabled={loading}
              >
                <option value="">All Types</option>
                {RESOURCE_TYPES.map(type => (
                  <option key={type} value={type}>
                    {type.replace('_', ' ')}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter || ''}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                disabled={loading}
              >
                <option value="">All Statuses</option>
                {RESOURCE_STATUSES.map(status => (
                  <option key={status} value={status}>
                    {status.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Create Button - Always visible for admin */}
            <button
              onClick={() => navigate('/admin/resources/create')}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium inline-flex items-center gap-2 transition-all hover:shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Resource
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md mb-4">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Resources Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900">
              Resources ({filteredResources.length})
            </h2>
          </div>
          <ResourceTable
            resources={displayResources}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
            isAdmin={true}
            simulatedTime={simulatedTime}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminResourceListPage;
