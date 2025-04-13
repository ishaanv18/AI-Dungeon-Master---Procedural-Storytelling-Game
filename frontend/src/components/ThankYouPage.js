import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './ThankYouPage.css';

const ThankYouPage = ({ character, fullStory }) => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="thank-you-container">
      <motion.div 
        className="thank-you-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="logo-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <img 
            src="/avatars/dungeon-master.svg" 
            alt="AI Dungeon Master" 
            className="thank-you-logo" 
          />
        </motion.div>
        
        <motion.h1 
          className="thank-you-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Your Adventure Concludes
        </motion.h1>
        
        <motion.div 
          className="character-farewell"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <h2>Farewell, {character?.name}</h2>
          <p className="character-class">Brave {character?.class}</p>
        </motion.div>
        
        <motion.div 
          className="story-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <h3>Your Epic Tale</h3>
          <div className="story-content">
            {fullStory && fullStory.map((scene, index) => (
              <div key={index} className="story-scene">
                <p>{scene.text}</p>
                {scene.choice && (
                  <p className="story-choice">You chose: <span>{scene.choice}</span></p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="magical-elements"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="sparkle sparkle-1"></div>
          <div className="sparkle sparkle-2"></div>
          <div className="sparkle sparkle-3"></div>
          <div className="sparkle sparkle-4"></div>
          <div className="sparkle sparkle-5"></div>
        </motion.div>
        
        <motion.button 
          className="new-adventure-btn"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(212, 175, 55, 0.7)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.reload()}
        >
          Begin a New Adventure
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ThankYouPage;