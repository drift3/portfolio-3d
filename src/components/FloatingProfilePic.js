import React from 'react';
import { motion } from 'framer-motion';

const FloatingProfilePic = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-6 left-6 z-50 group cursor-pointer"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
      
      {/* Profile image container */}
      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary-500/50 group-hover:border-primary-500 transition-all duration-300 shadow-lg">
        <img
          src={`${process.env.PUBLIC_URL}/me.jpg`}
          alt="Quick Profile"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Floating animation dots */}
      <motion.div
        animate={{
          y: [-2, 2, -2],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-dark-900"
      />
    </motion.div>
  );
};

export default FloatingProfilePic;