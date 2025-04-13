import React from 'react';
import { motion } from 'framer-motion';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="welcome-screen">
      <motion.div 
        className="welcome-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="title"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          AI Dungeon Master
        </motion.h1>
        
        <motion.div 
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p>Embark on an epic adventure guided by artificial intelligence</p>
        </motion.div>
        
        <motion.img
          src="/avatars/dungeon-master.svg" 
          alt="Dungeon Master"
          className="welcome-avatar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://api.dicebear.com/6.x/bottts/svg?seed=dungeon-master&backgroundColor=b6e3f4';
          }}
        />
        
        <motion.button 
          className="btn start-btn"
          onClick={onStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          Begin Your Quest
        </motion.button>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;