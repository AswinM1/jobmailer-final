import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'; // Correct import for routing
import Home from './components/Home';
import Login from './components/Login';
import { LoginProvider } from './components/LoginContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ThemeProvider  from './components/ThemeContext';
import SignUp from './components/Signup';
import Contact from './components/Contact';
// import Features from './components/Features';

function App() {
  return (
    <div>
     
        <ThemeProvider>
       {/* Wrap routing components with BrowserRouter */}
            <Navbar />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<Hero />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contact" element={<Contact />} />
              {/* <Route path="/features" element={<Features />} /> */}
            </Routes>
         
        </ThemeProvider>
      
    </div>
  );
}

export default App;
