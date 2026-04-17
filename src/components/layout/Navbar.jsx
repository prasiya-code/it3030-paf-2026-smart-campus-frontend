import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
<<<<<<< HEAD
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand - Left side */}
=======
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
>>>>>>> origin/dev
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-900 font-bold text-lg leading-tight">Opsora</span>
              <span className="text-slate-500 text-xs leading-tight">Smart Campus Operations</span>
            </div>
          </Link>

<<<<<<< HEAD
          {/* Centered Navigation Links */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
=======
          <div className="hidden md:flex items-center gap-8">
>>>>>>> origin/dev
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-slate-600 hover:text-primary-600 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

<<<<<<< HEAD
          {/* Right side buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link 
              to="/login"
              className="text-slate-600 hover:text-primary-600 font-medium transition-colors px-3 py-2"
            >
              Sign In
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
=======
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost">Sign In</Button>
            <Button>Get Started</Button>
          </div>

>>>>>>> origin/dev
          <button
            className="md:hidden p-2 text-slate-600 hover:text-slate-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

<<<<<<< HEAD
        {/* Mobile menu */}
=======
>>>>>>> origin/dev
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-slate-600 hover:text-primary-600 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-slate-200">
<<<<<<< HEAD
                <Link 
                  to="/login" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-slate-600 hover:text-primary-600 font-medium transition-colors px-3 py-2"
                >
                  Sign In
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="justify-center">Get Started</Button>
                </Link>
=======
                <Button variant="ghost" className="justify-start">Sign In</Button>
                <Button className="justify-center">Get Started</Button>
>>>>>>> origin/dev
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
