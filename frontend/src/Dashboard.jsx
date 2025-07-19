import React from 'react';
import { useUser, SignOutButton } from '@clerk/clerk-react';

function Dashboard() {
const recentMails = [
  {
    subject: "Welcome to Our Platform!",
    recipient: "john.doe@example.com",
    content: "Hi John, we're excited to have you on board. Here's how to get started...",
    date: "2025-06-08 15:30",
  },
  {
    subject: "Your Weekly Report is Ready",
    recipient: "alice.smith@example.com",
    content: "Hello Alice, your analytics report for this week is attached.",
    date: "2025-06-08 14:45",
  },
  {
    subject: "Password Reset Request",
    recipient: "michael.lee@example.com",
    content: "We received a request to reset your password. If this was not you...",
    date: "2025-06-08 13:12",
  },
  {
    subject: "Feedback Request",
    recipient: "emma.brown@example.com",
    content: "Hi Emma, we'd love to hear your thoughts on your recent experience.",
    date: "2025-06-08 12:50",
  },

];

  const { user } = useUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className=" text-white font-sans justify-center items-center flex w-fit h-fit py-2 px-2 ">Sign in to continue</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 ">
      <div className="bg-neutral-900 p-8 rounded-lg border border-zinc-800 shadow-2xl  overflow-hidden w-full text-center space-y-6 max-w-5xl h-screen">
      <p className='flex w-full font-sans tracking-tighter font-bold text-white text-2xl'>Dashboard</p>
      <p className='font-sans tracking-tighter text-xl text-white font-semibold flex w-full'>Welcome Back ,  {user.firstName}</p>
     
        <div className=' flex w-full h-50   py-2 px-2 justify-center gap-4'>
          <div className='flex w-40 h-40 bg-white rounded-md flex-col gap-5'>
            <p className='font-sans text-xl font-semibold tracking-tighter py-2  px-2'>Total generated</p>
                <p className="font-sans font-bold text-2xl">60</p>
          </div>
         
          <div className='flex w-40 h-40 bg-gradient-to-t from-purple-500 via-green-400 to-yellow-500  rounded-md flex-col gap-5'>
               <p className='font-sans text-xl font-semibold tracking-tighter py-2 px-2'>Total tokens</p>
               <p className="font-sans font-bold text-2xl">10</p>
          </div>
          <div className='flex w-40 h-40 bg-white rounded-md flex-col gap-5'>
             <p className='font-sans text-xl font-semibold tracking-tighter py-2  px-2'> Tokens used</p>
               <p className="font-sans font-bold text-2xl">60</p>
          </div>
        </div>
        <div className='flex w-full justify-center bg-neutral-800 rounded-md flex-col h-fit overflow-y-scroll '>
          <p className='font-sans tracking-tighter text-white py-2 px-2  justify-start flex'>Recently generated</p>
          {recentMails.map((val,idx)=>(
            <div className="flex gap-1 py-2 px-2 text-white ">
            <div>{val.date}</div>
            <div>{val.content}</div>
            </div>
          ))}
        </div>
        

     

        <div className="pt-4">
          <SignOutButton>
            <button className="text-white bg-orange-600 py-2 px-2 rounded-md font-sans tracking-tighter hover:bg-red-400 transition-colors text-sm font-medium flex items-center justify-center mx-auto">
             
              Sign out
            </button>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;