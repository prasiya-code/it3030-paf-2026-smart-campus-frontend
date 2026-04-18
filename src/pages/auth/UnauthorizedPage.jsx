import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl">🔒</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Access Denied</h1>
        <p className="text-slate-600 mb-8 text-lg">
          You don't have permission to view this page.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-colors shadow-md"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
