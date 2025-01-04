import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bg1 from '../assets/bg.svg';
import { SignedOut, SignInButton, UserButton, SignedIn } from '@clerk/clerk-react';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-black text-white shadow-lg border-b border-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex flex-row items-center">
            <Link to="/" className="flex-shrink-0">
              <img src={bg1} className="h-8 w-auto" alt="Logo" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                Home
              </Link>
              <Link
                to="/contact"
                className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                Contact
              </Link>
              
              <SignedOut>
                <SignInButton>
                  <div className="bg-white text-black hover:bg-neutral-200 px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                    Sign In
                  </div>
                </SignInButton>
              </SignedOut>
              <SignedIn>
  <div className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
    <p className="text-white">Hello,user</p>
    <UserButton />
  </div>
</SignedIn>

              
              <Link
                to="/home"
                className="bg-gradient-to-r from-purple-700 to-purple-400 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                Try Now
              </Link>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
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
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            
            <SignedOut>
            
              <SignInButton>
              <div className="text-black hover:bg-neutral-200 block px-3 py-2 rounded-md text-base font-medium">
              Sign in
              </div>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="text-white block px-1 py-2 rounded-md text-base font-medium">
                <UserButton />
                <p className='text-white'>Hello user</p>
              </div>
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
