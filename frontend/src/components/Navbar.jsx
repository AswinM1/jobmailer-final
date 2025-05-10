import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';
import DashboardIcon from '../Dashboard'; // Assuming Dashboard is an icon or component

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isSignedIn } = useUser();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-neutral-950 z-10 text-white shadow-lg flex justify-center border-dotted border-b-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16 px-6">

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:justify-center md:flex-1">
            <div className="flex items-center space-x-8 justify-center">
              <Link
                to="/"
                className="text-gray-300 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-transform duration-200 ease-in-out transform hover:scale-105"
              >
                Home
              </Link>
              <Link
                to="/pricing"
                className="text-white hover:text-white px-3 py-2 text-sm font-medium transition-transform duration-200 ease-in-out transform hover:scale-105"
              >
                Pricing
              </Link>

              {!isSignedIn ? (
                <Link to="/login">
                  <div className="text-white bg-orange-600 px-4 py-2 rounded-full text-base font-medium hover:cursor-pointer">
                    Sign in
                  </div>
                </Link>
              ) : (
                <Link to="/dashboard">
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-md  gap-2 text-base font-medium">
                    Dashboard
                    <UserButton></UserButton>
                 
                  </div>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex flex-1 justify-end">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2" id="mobile-menu">
            <div className="bg-[#1A1A1A] rounded-2xl px-4 py-3 space-y-2 shadow-lg">
              <Link
                to="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-transform duration-200 ease-in-out transform hover:scale-105"
              >
                Home
              </Link>
              <Link
                to="/pricing"
                className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-transform duration-200 ease-in-out transform hover:scale-105"
              >
                Pricing
              </Link>

              {!isSignedIn ? (
                <Link to="/login">
                  <div className="text-white bg-orange-600 px-4 py-2 rounded-full text-base font-medium hover:cursor-pointer">
                    Sign in
                  </div>
                </Link>
              ) : (
                <Link to="/dashboard">
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium">
                    Dashboard
                    <UserButton></UserButton>
                  </div>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
