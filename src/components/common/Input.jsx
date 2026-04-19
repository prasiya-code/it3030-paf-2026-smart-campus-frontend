import React from 'react';

const Input = ({ 
  label,
  error,
  className = '',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-2.5 
          bg-white border border-slate-200 rounded-lg
          text-slate-900 placeholder-slate-400
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          transition-all
          ${error ? 'border-danger focus:ring-danger' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-danger">{error}</p>
      )}
    </div>
  );
};

export default Input;
