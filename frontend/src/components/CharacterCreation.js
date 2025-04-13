import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './CharacterCreation.css';

const CharacterCreation = ({ onCreateCharacter }) => {
  const [name, setName] = useState('');
  const [characterClass, setCharacterClass] = useState('warrior');
  const [avatarSeed, setAvatarSeed] = useState(Math.random().toString(36).substring(7));
  const [avatarUrl, setAvatarUrl] = useState('');

  // Character class options
  const classOptions = [
    { id: 'warrior', name: 'Warrior', description: 'Strong and brave, skilled in combat and resilience.' },
    { id: 'mage', name: 'Mage', description: 'Master of arcane arts, wielding powerful spells and ancient knowledge.' },
    { id: 'rogue', name: 'Rogue', description: 'Quick and stealthy, expert in deception and precision strikes.' },
    { id: 'cleric', name: 'Cleric', description: 'Divine spellcaster with healing powers and holy protection.' }
  ];

  // Generate avatar URL based on character class and seed
  useEffect(() => {
    // Using DiceBear API for avatar generation
    // Different styles based on character class
    let style = 'adventurer';
    let backgroundColor = 'b6e3f4';
    
    switch(characterClass) {
      case 'mage':
        style = 'personas';
        backgroundColor = 'd1d4f9';
        break;
      case 'rogue':
        style = 'adventurer-neutral';
        backgroundColor = 'c0aede';
        break;
      case 'cleric':
        style = 'croodles';
        backgroundColor = 'f5d5cb';
        break;
      default:
        style = 'adventurer';
        backgroundColor = 'b6e3f4';
    }
    
    setAvatarUrl(`https://api.dicebear.com/6.x/${style}/svg?seed=${characterClass}-${avatarSeed}&backgroundColor=${backgroundColor}`);
  }, [characterClass, avatarSeed]);

  // Generate a new random avatar
  const generateNewAvatar = () => {
    setAvatarSeed(Math.random().toString(36).substring(7));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '') return;
    
    onCreateCharacter({
      name,
      class: characterClass,
      avatarUrl
    });
  };

  return (
    <div className="character-creation">
      <motion.div 
        className="creation-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="creation-title">Create Your Character</h1>
        
        <form onSubmit={handleSubmit} className="creation-form">
          <div className="form-group">
            <label htmlFor="character-name">Character Name</label>
            <input
              type="text"
              id="character-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your character's name"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Character Class</label>
            <div className="class-options">
              {classOptions.map((option) => (
                <motion.div
                  key={option.id}
                  className={`class-option ${characterClass === option.id ? 'selected' : ''}`}
                  onClick={() => setCharacterClass(option.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <h3>{option.name}</h3>
                  <p>{option.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="avatar-section">
            <h2>Your Character</h2>
            <div className="avatar-container">
              <motion.img 
                src={avatarUrl} 
                alt="Character Avatar" 
                className="character-avatar"
                key={avatarSeed}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.button 
                type="button" 
                className="btn regenerate-btn"
                onClick={generateNewAvatar}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Regenerate Avatar
              </motion.button>
            </div>
          </div>
          
          <motion.button 
            type="submit" 
            className="btn submit-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!name.trim()}
          >
            Begin Adventure
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CharacterCreation;