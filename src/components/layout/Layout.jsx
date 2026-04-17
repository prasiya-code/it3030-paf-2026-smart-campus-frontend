import React from 'react';
<<<<<<< HEAD
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
=======
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
>>>>>>> origin/dev
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
<<<<<<< HEAD
        {children}
=======
        <Outlet />
>>>>>>> origin/dev
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
