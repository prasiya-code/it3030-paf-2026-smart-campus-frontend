import React from 'react';

const AdminResourceStatusCard = ({ resourceSummary }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Resource Status</h3>
      <div className="space-y-4">
        {resourceSummary.map((item) => {
          const activePercentage = (item.active / item.total) * 100;
          const outOfServicePercentage = (item.outOfService / item.total) * 100;
          
          return (
            <div key={item.type}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-700">{item.type}</span>
                <span className="text-sm text-slate-500">
                  {item.active} active / {item.outOfService} out of service
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div className="flex h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-green-500 h-2.5 transition-all" 
                    style={{ width: `${activePercentage}%` }}
                  />
                  <div 
                    className="bg-red-500 h-2.5 transition-all" 
                    style={{ width: `${outOfServicePercentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-sm text-slate-600">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="text-sm text-slate-600">Out of Service</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminResourceStatusCard;
