import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from './LoginContext';
import { ThemeContext } from './ThemeContext';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login: loginContext } = useLogin(); // Use the login context
  const { theme } = useContext(ThemeContext); // Access theme from context
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.includes('@')) {
      toast.error('Enter a valid email address!');
      return;
    }

    if (password.length < 7) {
      toast.error('Password must be at least 7 characters long!');
      return;
    }

    // Perform login (Mock or API call)
    try {
      loginContext(); // Store login in context
      localStorage.setItem('loginvalue', 'true'); // Store login status
      toast.success('Login successful!');
      setTimeout(() => nav('/home'), 1500); // Navigate after success
    } catch (error) {
      toast.error('An error occurred, please try again!');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: theme === 'light' ? '#000' : '#fff',
        fontFamily: 'Arial, sans-serif',
        background: 'linear-gradient(to bottom,#000 20%,#4521A1 65%)',
      }}
    >
      <motion.div
        initial={{ opacity: 0,  }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          padding: '40px',
          backgroundColor: 'black',
          borderRadius: '10px',
          boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.5)',
          width: '100%',
          maxWidth: '400px',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <h2
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: 'white',
          }}
        >
          Log into your account
        </h2>

        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ marginBottom: '20px' }}
          >
            <label
              htmlFor="email"
              style={{
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '8px',
                display: 'block',
                color: 'white',
              }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '1rem',
                borderRadius: '8px',
                backgroundColor: 'black',
                border: '1px solid #ddd',
                color: 'white',
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ marginBottom: '20px' }}
          >
            <label
              htmlFor="password"
              style={{
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '8px',
                display: 'block',
                color: 'white',
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '1rem',
                borderRadius: '8px',
                backgroundColor: 'black',
                color: 'white',
                border: '1px solid #555',
              }}
            />
          </motion.div>

          <motion.button
            type="submit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: 'white',
              color: 'black',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Login
          </motion.button>
        </form>

        <p
          style={{
            textAlign: 'center',
            marginTop: '20px',
            color: 'white',
          }}
        >
          Don't have an account?{' '}
          <Link
            to="/signup"
            style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
      <ToastContainer />
    </div>
  );
}

export default Login;
