import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'; // Correct import for routing
import Home from './components/Home';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { SignedIn,SignInButton,SignedOut,UserButton } from '@clerk/clerk-react';

function App() {
  return (
    <div>
     
      
            <Navbar />
            <Routes>
              <Route path="/home" element={<SignedIn><Home /></SignedIn>} />
             
            
              <Route path="/" element={<Hero/>} />
              <Route path="*" element={<p>page not found 404</p>} />
              
            
            
            </Routes>
        
    </div>
  );
}

export default App;
