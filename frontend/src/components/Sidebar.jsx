import { useUser, SignOutButton } from '@clerk/clerk-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // hamburger & close icons

function Sidebar() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="sm:hidden fixed top-4 left-4 z-30 p-2 text-white bg-neutral-900 rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-20 h-full w-[200px] bg-neutral-950 border-r border-neutral-700 text-white transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 sm:translate-x-0 sm:static sm:block`}
      >
        <div className="p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <img src={user.imageUrl} alt="User" className="h-6 w-6 rounded-full" />
              <div className="text-sm font-light">{user.firstName}</div>
            </div>

            <Link to="/" onClick={() => setIsOpen(false)}>
              <div className="text-sm font-light mb-4 hover:scale-105 transition-transform">
                Home
              </div>
            </Link>

            <Link to="/Dashboard" onClick={() => setIsOpen(false)}>
              <div className="text-sm font-light hover:scale-105 transition-transform">
                Dashboard
              </div>
            </Link>
          </div>

          <SignOutButton className="mt-20 bg-[#1e1e1e] px-8 py-2 rounded-lg text-sm font-semibold hover:scale-105 transition-transform" />
        </div>
      </div>
    </>
  );
}

export default Sidebar;
