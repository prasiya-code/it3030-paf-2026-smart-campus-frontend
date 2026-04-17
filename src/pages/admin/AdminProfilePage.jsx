import React, { useState } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const AdminProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    role: 'ADMIN',
    department: 'IT Operations',
    phone: '+1 234 567 8900'
  });

  const getInitials = (firstName, lastName) => {
    const first = firstName?.charAt(0).toUpperCase() || '';
    const last = lastName?.charAt(0).toUpperCase() || '';
    return first + last || first;
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      role: 'ADMIN',
      department: 'IT Operations',
      phone: '+1 234 567 8900'
    });
  };

  const handleSave = () => {
    // TODO: Call API to save profile
    setIsEditing(false);
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
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Admin Profile</h1>

      {/* Profile Info Card */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
            <span className="text-white font-bold text-3xl">
              {getInitials(formData.firstName, formData.lastName)}
            </span>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">
              {formData.firstName} {formData.lastName}
            </h2>
            <p className="text-slate-600 mb-3">{formData.email}</p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                {formData.role}
              </span>
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-800 text-sm font-medium rounded-full">
                {formData.department}
              </span>
            </div>
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
              />
              <Input
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Enter department"
              />
              <Input
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
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
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">Department</label>
                <div className="text-slate-900 font-medium">{formData.department || '-'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">Phone</label>
                <div className="text-slate-900 font-medium">{formData.phone || '-'}</div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {isEditing ? (
        <div className="flex gap-3">
          <Button onClick={handleSave}>Save Changes</Button>
          <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
        </div>
      ) : (
        <Button onClick={handleEdit}>Edit Profile</Button>
      )}
    </div>
  );
};

export default AdminProfilePage;
