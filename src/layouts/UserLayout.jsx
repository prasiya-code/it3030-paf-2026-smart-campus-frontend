import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from '../components/user/UserSidebar';
import UserHeader from '../components/user/UserHeader';

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <UserSidebar />
      
      <div className="ml-64 flex flex-col min-h-screen">
        <UserHeader />
        
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
