import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from './LoginContext';
import { ThemeContext } from './ThemeContext';
import { motion } from 'framer-motion';

function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupError, setSignupError] = useState('');
  const { theme } = React.useContext(ThemeContext); // Access theme from context
  const nav = useNavigate();
  const { login: loginContext } = useLogin(); // Use context for login

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form inputs
    if (!email.includes('@')) {
      setSignupError('Please enter a valid email');
      return;
    }

    if (username.length < 3) {
      setSignupError('Username must be at least 3 characters long');
      return;
    }

    if (password.length < 7) {
      setSignupError('Password must be at least 7 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setSignupError('Passwords do not match');
      return;
    }

    // Simulate successful signup
    loginContext();
    localStorage.setItem('loginvalue', 'true');
    nav('/home');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(to bottom,#000 20%,#4521A1 65%)',
        color: theme === 'light' ? '#000' : '#fff',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          padding: '40px',
          backgroundColor: 'black',
          borderRadius: '10px',
          boxShadow:
            theme === 'light'
              ? '0 4px 8px rgba(0, 0, 0, 0.1)'
              : '0 4px 8px rgba(0, 0, 0, 0.4)',
          width: '100%',
          height: 'auto',
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
          Create your account
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
                border: '1px solid #555',
                backgroundColor: 'black',
                color: 'white',
                transition: 'all 0.3s',
              }}
            />
          </motion.div>

         
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
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
                border: '1px solid #555',
                backgroundColor: 'black',
                color: 'white',
                transition: 'all 0.3s',
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            style={{ marginBottom: '20px' }}
          >
            <label
              htmlFor="confirmPassword"
              style={{
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '8px',
                display: 'block',
                color: 'white',
              }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '1rem',
                borderRadius: '8px',
                border: '1px solid #555',
                backgroundColor: 'black',
                color: 'white',
                transition: 'all 0.3s',
              }}
            />
          </motion.div>

          {signupError && (
            <p
              style={{
                color: 'red',
                fontSize: '14px',
                marginBottom: '20px',
                fontWeight: '600',
              }}
            >
              {signupError}
            </p>
          )}

          <motion.button
            type="submit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
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
            Sign Up
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default SignUp;
