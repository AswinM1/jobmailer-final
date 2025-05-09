import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { SignedIn, SignedOut, SignInButton,useUser } from '@clerk/clerk-react';
import Feature from './Features';
import Pricing from './Pricing';

function Hero() {
  
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
  const {isSignedIn}=useUser()

  return (
    <div>
             <div className="min-h-screen bg-neutral-950 flex justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
<div className="absolute top-0 left-0 flex justify-end">
  <div className="w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(253,186,116,0.4)_0%,_transparent_70%)] rounded-full blur-3xl"></div>
</div>


        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl w-full text-center"
        >
          <div className="w-full flex justify-center mb-4">
            <p className="bg-orange-500 shadow-lg shadow-orange-600/50 hover:scale-110 transition-all duration-200 w-fit px-4 py-2 font-sans font-medium rounded-full text-white text-sm">
              Welcome to Jobmailer
            </p>
          </div>
        
          <motion.h1 
            variants={titleVariants}
            className="text-[40px] sm:text-5xl md:text-2xl lg:text-7xl font-sans font-extralight italic text-white tracking-tighter leading-4 mb-6"
          >
            Where <span className='font-serif font-extralight'>Opportunity</span> Meets the Right Inbox.
          </motion.h1>

          <motion.p
            variants={subtitleVariants}
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8 font-thin"
          >
            Generate professional, personalized cold emails that get responses.
            No more writer's block, just results.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
            variants={subtitleVariants}
          >
         
              <Link to="/home">
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className=" z-30 px-8 py-2 bg-gradient-to-b from-orange-700 to-orange-500 text-white font-semibold rounded-lg shadow-lg text-lg"
                >
                  Get Started
                </motion.button>
              </Link>
          

         
         

            <Link to="/pricing">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="px-8 py-2 bg-gradient-to-b from-orange-700 to-orange-500 text-white font-semibold rounded-lg text-lg transition-all"
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
      <Feature />
      <Pricing />
    </div>
  );
}

export default Hero;
