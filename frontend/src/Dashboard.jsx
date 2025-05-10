import React from 'react';
import { useUser, SignOutButton } from '@clerk/clerk-react';

function Dashboard() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-zinc-900 p-8 rounded-lg border border-zinc-800 shadow-2xl max-w-md w-full text-center space-y-6">
        <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500 shadow-lg shadow-purple-900/30">
          <img 
            src={user.imageUrl} 
            alt={user.fullName} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">
            Welcome, <span className="text-purple-400">{user.fullName}</span>
          </h1>
          <p className="text-gray-400 text-sm">{user.primaryEmailAddress.emailAddress}</p>
        </div>
        
        <div className="pt-2">
          <div className="text-xs text-gray-500 mb-2">ACCOUNT BALANCE</div>
          <div className="text-3xl font-bold text-white">0 <span className="text-purple-400">TOKENS</span></div>
        </div>

        <button
          onClick={() => alert('Token added!')} // Replace with real logic
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-md hover:from-purple-700 hover:to-indigo-700 transition duration-300 font-medium"
        >
          Add Tokens
        </button>

        <div className="pt-4">
          <SignOutButton>
            <button className="text-gray-400 hover:text-red-400 transition-colors text-sm font-medium flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign out
            </button>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;