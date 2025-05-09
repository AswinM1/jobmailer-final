import { useUser, SignOutButton } from '@clerk/clerk-react';
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  const { user } = useUser();

  return (
    <div className='absolute text-white mt-20 left-0 top-0   z-20 flex flex-col h-[100vh] w-[200px] mr-6 bg-neutral-950  border-neutral-500'>
      <div className='mx-8 '>
       
        <div className='flex flex-row gap-2 mb-8 items-center'>
          <img src={user.imageUrl} alt="User" className='h-6 w-6 rounded-full' />
          <div className='text-sm font-light'>{user.firstName}</div>
        </div>

<Link to={"/"}>
        <div className='text-sm font-light hover:cursor-pointer mb-4 hover:scale-105 transition-transform duration-200'>
          Home
        </div>
        </Link>

<Link to={"/dashboard"}>
        <div className='text-sm font-light hover:cursor-pointer hover:scale-105 transition-transform duration-200'>
          Dashboard
        </div>
        </Link>
       
       
      </div>
       <div className='mt-[100px]'>
         <SignOutButton className="mb-7 bg-[#1e1e1e]  mx-5 px-14 py-2 rounded-lg text-sm font-semibold hover:scale-105 transition-transform duration-200">
          Logout
        </SignOutButton>
        </div>
    </div>
  );
}

export default Sidebar;
