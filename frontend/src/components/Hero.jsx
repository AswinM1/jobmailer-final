import React, { useContext } from 'react';

import { Link } from 'react-router-dom';

import { motion } from "framer-motion";
import { SignedIn, SignedOut,SignInButton } from '@clerk/clerk-react';

function Hero() {

 

  const parentVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration:2
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y:0
    },
    visible: {
      opacity: 1,
      y: 0,
      duration:2
    },
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        background: 'linear-gradient(to bottom,#000 1%,#4521A1 65%,#A46EDB 90%)',
      }}
    >
      <motion.div
        variants={parentVariants}
        initial="hidden"
        animate="visible"
        style={{
          maxWidth: '900px',
          width: '100%',
          padding: '10px',
        }}
      >
        <motion.h1
          variants={childVariants}
          className="text-[72px] font-sans font-semibold"
        >
          Perfect Email in Seconds
        </motion.h1>
        <motion.p
          variants={childVariants}
          style={{
            fontSize: '1.2rem',
            marginTop: '20px',
            color: '#ccc',
            lineHeight: '1.6',
            textAlign: 'center',
          }}
        >
          Our platform helps you craft professional emails effortlessly. Save
          time and boost productivity with our easy-to-use tools. With the
          power of AI, easily craft HR-friendly emails in seconds.
        </motion.p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '30px',
          }}
        >
          <motion.div variants={childVariants}>
           <SignedIn>
            <Link to="/home">
              <button
                style={{
                  padding: '10px 20px',
                  fontSize: '1rem',
                  color: '#fff',
                  backgroundColor: 'black',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = '#121212')
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = 'black')
                }
              >
                Get Started
              </button>
              </Link>
              </SignedIn>
           <SignedOut>
            <SignInButton>
              <button
                style={{
                  padding: '10px 20px',
                  fontSize: '1rem',
                  color: '#fff',
                  backgroundColor: 'black',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = '#121212')
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = 'black')
                }
              >
                Get Started
              </button>
              </SignInButton>
              </SignedOut>
          
          </motion.div>
          <motion.div variants={childVariants}>
            <Link to="/learn-more">
              <button
                style={{
                  padding: '10px 20px',
                  fontSize: '1rem',
                  color: '#fff',
                  backgroundColor: 'black',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = '#121212')
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = 'black')
                }
              >
                Learn More
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Hero;
