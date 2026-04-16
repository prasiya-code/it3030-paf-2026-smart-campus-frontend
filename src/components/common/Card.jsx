import React from 'react';

const Card = ({ 
  children, 
  variant = 'default',
  className = '',
  ...props 
}) => {
  const baseStyles = 'bg-white rounded-xl';
  
  const variants = {
    default: 'border border-slate-200 shadow-sm',
    elevated: 'shadow-md border border-slate-100',
    hover: 'shadow-sm border border-slate-200 hover:shadow-lg transition-shadow cursor-pointer',
  };
  
  return (
    <div 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 border-b border-slate-100 ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`p-6 border-t border-slate-100 ${className}`}>
    {children}
  </div>
);

export default Card;
