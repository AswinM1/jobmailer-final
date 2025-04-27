import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';

function Hero() {
  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        duration: 0.6
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2,
        duration: 0.8
      }
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.4,
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const highlightVariants = {
    initial: { width: 0 },
    animate: { 
      width: "100%",
      transition: { duration: 1, delay: 0.8 }
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full text-center"
      >
        <motion.h1 
          variants={titleVariants}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-none mb-6"
        >
          Craft Perfect
          <div className="relative inline-block mx-2">
            <span className="relative z-10">Cold Mails</span>
            <motion.div 
              className="absolute bottom-2 left-0 h-3 bg-gradient-to-r from-purple-700 to-purple-400 opacity-40 z-0"
              variants={highlightVariants}
              initial="initial"
              animate="animate"
            />
          </div>
          <br className="hidden sm:block" />
          in Seconds
        </motion.h1>

        <motion.p
          variants={subtitleVariants}
          className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8"
        >
          Generate professional, personalized cold emails that get responses.
          No more writer's block, just results.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
          variants={subtitleVariants}
        >
          <SignedIn>
            <Link to="/home">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="px-8 py-4 bg-gradient-to-r from-purple-700 to-purple-400 text-white font-semibold rounded-full text-lg transition-all shadow-lg hover:shadow-xl"
              >
                Get Started
              </motion.button>
            </Link>
          </SignedIn>
          
          <SignedOut>
            <SignInButton>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="px-8 py-4 bg-gradient-to-r from-purple-700 to-purple-400 text-white font-semibold rounded-full text-lg transition-all shadow-lg hover:shadow-xl"
              >
                Get Started
              </motion.button>
            </SignInButton>
          </SignedOut>
          
          <Link to="/pricing">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-8 py-4 bg-[#2A2A2A] text-white font-semibold rounded-full text-lg transition-all hover:bg-[#333333]"
            >
              View Pricing
            </motion.button>
          </Link>
        </motion.div>

        {/* Floating decoration elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.1,
            x: [0, 10, 0],
            y: [0, 15, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(168,85,247,0) 70%)",
            filter: "blur(40px)",
            zIndex: 0
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.05,
            x: [0, -15, 0],
            y: [0, 10, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.5
          }}
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(168,85,247,0) 70%)",
            filter: "blur(60px)",
            zIndex: 0
          }}
        />
      </motion.div>
    </div>
  );
}

export default Hero;