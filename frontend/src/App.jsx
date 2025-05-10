import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'; // Correct import for routing
import Home from './components/Home';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { useUser } from '@clerk/clerk-react';
import Pricing from './components/Pricing';
import Login from './components/Login';
import Dashboard from './Dashboard';

function App() {
  const { isSignedIn } = useUser();

  return (
    <div>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<Hero />} />
        <Route path="/pricing" element={<Pricing />} />
        
      
        {isSignedIn ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </>
        ) : (
          <Route path="/home" element={<Login />} />
        )}

      
        <Route path="/login" element={<Login />} />

        
        <Route path="*" element={<p className='text-10xl text-white'>Page Not Found - 404</p>} />
      </Routes>
    </div>
  );
}

export default App;
