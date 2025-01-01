import React from 'react';

function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#4521A1]  text-white flex flex-col items-center justify-center px-4">
    
     
      <form className="bg-black  p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm  font-medium text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 bg-black border text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Your name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm  font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 bg-black border text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Your email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
            Message
          </label>
          <textarea
            id="message"
            className="w-full px-4 py-2 border bg-black text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            rows="4"
            placeholder="Your message"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-white text-black px-4 py-2 rounded-md font-medium hover:from-purple-600 hover:to-purple-500 transition duration-150"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
