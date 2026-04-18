import React, { useState, useEffect } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuthContext } from '../../context/AuthContext';
import axios from '../../api/axios';

const ProfilePage = () => {
  const { user } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'USER'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        role: user.role || 'USER'
      });
    }
  }, [user]);

  const getInitials = (firstName, lastName) => {
    const first = firstName?.charAt(0).toUpperCase() || '';
    const last = lastName?.charAt(0).toUpperCase() || '';
    return first + last || first;
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError(null);
    setSuccess(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError(null);
    setSuccess(null);
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        role: user.role || 'USER'
      });
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.put('/api/user/profile', {
        firstName: formData.firstName,
        lastName: formData.lastName
      });

      if (response.data.success) {
        setSuccess('Profile updated successfully');
        setIsEditing(false);
        // Refresh user data
        window.location.reload();
      } else {
        setError(response.data.message || 'Failed to update profile');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-slate-900 mb-6">My Profile</h1>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">{success}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Profile Info Card */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-3xl">
              {getInitials(formData.firstName, formData.lastName)}
            </span>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">
              {formData.firstName} {formData.lastName}
            </h2>
            <p className="text-slate-600 mb-3">{formData.email}</p>
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {formData.role}
            </span>
          </div>
        </div>
      </div>

      {/* Account Details Card */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Account Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {isEditing ? (
            <>
              <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
              />
              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="sm:col-span-2"
                disabled
              />
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">First Name</label>
                <div className="text-slate-900 font-medium">{formData.firstName || '-'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">Last Name</label>
                <div className="text-slate-900 font-medium">{formData.lastName || '-'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">Email</label>
                <div className="text-slate-900 font-medium">{formData.email}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">Role</label>
                <div className="text-slate-900 font-medium">{formData.role}</div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {isEditing ? (
        <div className="flex gap-3">
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button variant="secondary" onClick={handleCancel} disabled={isLoading}>Cancel</Button>
        </div>
      ) : (
        <Button onClick={handleEdit}>Edit Profile</Button>
      )}
    </div>
  );
};

export default ProfilePage;
