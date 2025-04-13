import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './GameInterface.css';

const GameInterface = ({ character, storyData, onMakeChoice, onEndStory }) => {
  const [isTyping, setIsTyping] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  
  // Typing effect for story text
  useEffect(() => {
    if (!storyData) return;
    
    // Reset state when story data changes
    setIsTyping(true);
    setDisplayedText('');
    setCurrentTextIndex(0);
    
    const text = storyData.currentScene;
    const typingSpeed = 30; // milliseconds per character
    
    // Create a single interval that handles the typing
    const typingInterval = setInterval(() => {
      setCurrentTextIndex(prevIndex => {
        // If we've reached the end of text, clear interval and stop typing
        if (prevIndex >= text.length) {
          clearInterval(typingInterval);
          setIsTyping(false);
          return prevIndex;
        }
        
        // Update displayed text with the next character
        setDisplayedText(text.substring(0, prevIndex + 1));
        return prevIndex + 1;
      });
    }, typingSpeed);
    
    // Clean up interval on unmount or when story changes
    return () => clearInterval(typingInterval);
  }, [storyData]);


  
  // Skip typing animation
  const skipTyping = () => {
    setDisplayedText(storyData.currentScene);
    setCurrentTextIndex(storyData.currentScene.length);
    setIsTyping(false);
  };
  
  // Handle avatar loading and fallback
  const handleAvatarLoad = () => {
    setAvatarLoaded(true);
  };
  
  const handleAvatarError = (e) => {
    e.target.onerror = null;
    // Generate a fallback avatar based on the current scene
    const sceneSeed = storyData.currentScene.substring(0, 10).replace(/\s+/g, '-').toLowerCase();
    e.target.src = `https://api.dicebear.com/6.x/bottts/svg?seed=${sceneSeed}&backgroundColor=b6e3f4`;
  };
  
  if (!character || !storyData) return null;
  
  return (
    <div className="game-interface">
      <div className="game-header">
        <motion.div 
          className="character-info"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src={character.avatarUrl} 
            alt={character.name} 
            className="character-portrait"
          />
          <div className="character-details">
            <h3>{character.name}</h3>
            <p className="character-class">{character.class}</p>
          </div>
        </motion.div>
      </div>
      
      <div className="game-content">
        <motion.div 
          className="story-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="story-avatar-container">
            <motion.img 
              src={storyData.avatar || `https://api.dicebear.com/6.x/bottts/svg?seed=${storyData.currentScene.substring(0, 10)}`} 
              alt="Scene" 
              className={`story-avatar ${avatarLoaded ? 'loaded' : ''}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: avatarLoaded ? 1 : 0, scale: avatarLoaded ? 1 : 0.9 }}
              transition={{ duration: 0.5 }}
              onLoad={handleAvatarLoad}
              onError={handleAvatarError}
            />
            <div className="avatar-glow"></div>
          </div>
          
          <div className="story-text-container">
            <p className="story-text">{displayedText}</p>
            {isTyping && (
              <motion.button 
                className="skip-btn"
                onClick={skipTyping}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Skip
              </motion.button>
            )}
          </div>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {!isTyping && (
            <motion.div 
              className="options-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="options-title">What will you do?</h3>
              <div className="options-list">
                {storyData.options.map((option, index) => (
                  <motion.button
                    key={index}
                    className="option-btn"
                    onClick={() => onMakeChoice(index)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    whileHover={{ 
                      scale: 1.02, 
                      backgroundColor: 'rgba(212, 175, 55, 0.2)',
                      borderColor: 'var(--text-gold)',
                      boxShadow: '0 0 10px rgba(212, 175, 55, 0.3)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option}
                  </motion.button>
                ))}
                
                <motion.button
                  className="end-story-btn"
                  onClick={onEndStory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * (storyData.options.length + 1) }}
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: 'rgba(106, 13, 173, 0.3)',
                    borderColor: 'var(--accent-purple)',
                    boxShadow: '0 0 15px rgba(106, 13, 173, 0.5)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  End Story
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GameInterface;