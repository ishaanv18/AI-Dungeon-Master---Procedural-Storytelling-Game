import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Components
import WelcomeScreen from './components/WelcomeScreen';
import CharacterCreation from './components/CharacterCreation';
import GameInterface from './components/GameInterface';
import ThankYouPage from './components/ThankYouPage';

function App() {
  // Game state management
  const [gameState, setGameState] = useState('welcome'); // welcome, character-creation, game, end-story
  const [character, setCharacter] = useState(null);
  const [storyData, setStoryData] = useState(null);
  const [fullStory, setFullStory] = useState([]);

  // Handle transitions between game states
  const startGame = () => {
    setGameState('character-creation');
  };

  const createCharacter = (characterData) => {
    setCharacter(characterData);
    setGameState('game');
    
    // Check if the character name matches a famous character
    const famousCharacterStories = {
      'harry potter': {
        currentScene: "The Great Hall of Hogwarts is abuzz with excitement as students gather for the start-of-term feast. The enchanted ceiling above mirrors the night sky, dotted with stars and floating candles that cast a warm glow over the four long house tables. You sit at the Gryffindor table, your wand tucked safely in your robes, as Professor McGonagall prepares to make an announcement.",
        options: [
          "Speak with your friends Hermione and Ron about the upcoming term",
          "Pay attention to Professor McGonagall's announcement",
          "Glance over at the Slytherin table to see what Malfoy is up to"
        ],
        avatar: "/avatars/hogwarts-hall.jpg"
      },
      'frodo baggins': {
        currentScene: "The peaceful village of Hobbiton stretches before you, with its rolling green hills and cozy hobbit holes. You're sitting in your garden at Bag End, enjoying the morning sun, when you notice Gandalf the Grey approaching along the winding path. He carries his staff and wears a concerned expression that suggests this isn't merely a social call.",
        options: [
          "Invite Gandalf in for tea and second breakfast",
          "Ask Gandalf directly what brings him to the Shire",
          "Pretend you haven't seen him and slip inside Bag End"
        ],
        avatar: "/avatars/hobbiton.jpg"
      },
      'luke skywalker': {
        currentScene: "The twin suns of Tatooine cast long shadows across the desert landscape as you repair a malfunctioning moisture vaporator. Your uncle's farm stretches out around you, but your gaze keeps drifting to the horizon, where adventure awaits. Suddenly, your droid beeps urgently, drawing your attention to an Imperial Star Destroyer visible in the sky above.",
        options: [
          "Rush back to the homestead to warn your uncle and aunt",
          "Use your macrobinoculars to get a better look at the Star Destroyer",
          "Check what your droid is trying to show you"
        ],
        avatar: "/avatars/tatooine.jpg"
      }
    };
    
    // Check for famous character matches (case insensitive)
    const characterNameLower = characterData.name.toLowerCase();
    let initialStoryData;
    
    if (characterNameLower in famousCharacterStories) {
      // Use the predefined story for the famous character
      initialStoryData = famousCharacterStories[characterNameLower];
    } else if (characterNameLower.includes('harry') && characterNameLower.includes('potter')) {
      initialStoryData = famousCharacterStories['harry potter'];
    } else if (characterNameLower.includes('frodo')) {
      initialStoryData = famousCharacterStories['frodo baggins'];
    } else if (characterNameLower.includes('luke') && characterNameLower.includes('skywalker')) {
      initialStoryData = famousCharacterStories['luke skywalker'];
    } else {
      // Use default story for non-famous characters
      initialStoryData = {
        currentScene: "You stand at the entrance of a dark, foreboding forest. The trees loom overhead, their branches twisting like gnarled fingers against the twilight sky. A narrow path winds its way into the darkness, and you can hear strange sounds emanating from deep within.",
        options: [
          "Enter the forest cautiously, sword at the ready",
          "Look for a way around the forest",
          "Call out to see if anyone is nearby",
          "Set up camp and wait until morning"
        ],
        avatar: "/avatars/forest-entrance.jpg"
      };
    }
    
    // In a real implementation, we would call the backend here to start the story
    setStoryData(initialStoryData);
  };

  // Track story progression for the thank you page
  const addToStory = (scene, choice = null) => {
    setFullStory(prevStory => [
      ...prevStory,
      {
        text: scene,
        choice: choice
      }
    ]);
  };

  // End the story and show the thank you page
  const endStory = () => {
    // Add the final scene to the story
    if (storyData && storyData.currentScene) {
      addToStory(storyData.currentScene);
    }
    
    // Transition to the thank you page
    setGameState('end-story');
  };
  
  const makeChoice = (choiceIndex) => {
    // In a real implementation, we would call the backend here to progress the story
    // For now, we'll use placeholder data based on character name
    const characterNameLower = character.name.toLowerCase();
    
    // Add current scene and choice to the story history
    if (storyData) {
      addToStory(storyData.currentScene, storyData.options[choiceIndex]);
    }
    
    // Famous character-specific story continuations
    const famousCharacterContinuations = {
      'harry potter': [
        // Harry Potter universe continuations
        [
          {
            currentScene: "You approach Hermione and Ron at the Gryffindor table. 'Did you hear about the new Defense Against the Dark Arts professor?' Hermione whispers excitedly. 'They say he worked as an Auror before coming to Hogwarts.' Ron seems more interested in the feast that's about to appear on the golden plates.",
            options: [
              "Ask Hermione what she knows about the new professor",
              "Tell them about the strange dream you had about Voldemort",
              "Suggest visiting Hagrid after the feast"
            ],
            avatar: "/avatars/gryffindor-table.jpg"
          },
          {
            currentScene: "Professor McGonagall taps her glass, bringing the hall to silence. 'Before we begin our feast, I must inform you that the third-floor corridor on the right-hand side is out of bounds to everyone who does not wish to die a very painful death.' Murmurs spread through the hall as students exchange curious glances.",
            options: [
              "Discuss the warning with your friends",
              "Make a mental note to investigate the corridor later",
              "Look toward Dumbledore for any additional clues"
            ],
            avatar: "/avatars/mcgonagall.jpg"
          },
          {
            currentScene: "Your eyes meet Draco Malfoy's across the hall. He's huddled with Crabbe and Goyle, smirking in your direction. When he notices you watching, he makes a mocking gesture of a lightning bolt on his forehead before turning back to his Slytherin companions.",
            options: [
              "Ignore his taunts and focus on your friends",
              "Stand up and confront him",
              "Nudge Ron and point out Malfoy's behavior"
            ],
            avatar: "/avatars/malfoy.jpg"
          }
        ]
      ],
      'frodo baggins': [
        // Lord of the Rings universe continuations
        [
          {
            currentScene: "'Tea would be lovely,' Gandalf says with a smile that doesn't quite reach his eyes. Inside Bag End, as you prepare a second breakfast of scones and jam, the wizard sits hunched at your table, his fingers drumming thoughtfully. 'Frodo,' he finally says, 'what do you know of your uncle's ring?'",
            options: [
              "Tell Gandalf everything you know about Bilbo's ring",
              "Ask why he's interested in the ring",
              "Mention that Bilbo acted strangely about it before he left"
            ],
            avatar: "/avatars/bag-end-interior.jpg"
          },
          {
            currentScene: "'What brings you to the Shire, Gandalf? It's been some time since the fireworks of Bilbo's farewell party.' The wizard's expression grows grave. 'I'm afraid I bring troubling news, Frodo. News concerning your inheritance from Bilbo.'",
            options: [
              "Invite him inside to discuss the matter privately",
              "Ask directly if it's about the ring",
              "Look around nervously to see if anyone is watching"
            ],
            avatar: "/avatars/gandalf-concerned.jpg"
          },
          {
            currentScene: "You duck inside Bag End, closing the round door quietly behind you. But it's no use—a knock soon follows. 'Frodo Baggins,' Gandalf's voice calls through the wood, 'I know you're in there. What I have to say cannot wait, and concerns the fate of the Shire itself.'",
            options: [
              "Open the door and apologize",
              "Ask through the door what he means about the Shire's fate",
              "Quietly retrieve the ring from its hiding place"
            ],
            avatar: "/avatars/bag-end-door.jpg"
          }
        ]
      ],
      'luke skywalker': [
        // Star Wars universe continuations
        [
          {
            currentScene: "You race across the sand toward the homestead, your heart pounding. As you arrive, you find Uncle Owen working on a vaporator. 'There's an Imperial Star Destroyer in orbit!' you exclaim. He looks up with concern. 'Get inside. Now. And make sure those droids stay out of sight.'",
            options: [
              "Ask why the Empire would be interested in this remote part of Tatooine",
              "Check on the droids to make sure they're hidden",
              "Suggest that you should leave Tatooine immediately"
            ],
            avatar: "/avatars/lars-homestead.jpg"
          },
          {
            currentScene: "Through your macrobinoculars, you can see the distinctive wedge shape of the Star Destroyer. More concerning are the multiple transport ships descending toward the planet's surface. One seems to be heading in the direction of Anchorhead. Imperial troops on Tatooine is never a good sign.",
            options: [
              "Rush back to warn your family",
              "Try to determine exactly where the transports are landing",
              "Head to your X-34 landspeeder to investigate closer"
            ],
            avatar: "/avatars/star-destroyer-view.jpg"
          },
          {
            currentScene: "Your astromech droid, R2-D2, projects a small hologram—a fragment of a message showing a woman in white robes: '...help me, Obi-Wan Kenobi. You're my only hope.' The message cuts off abruptly. The droid beeps urgently, as if trying to tell you something important.",
            options: [
              "Ask the droid who the woman is",
              "Recall that Old Ben Kenobi lives in the Jundland Wastes",
              "Try to play the complete message"
            ],
            avatar: "/avatars/leia-hologram.jpg"
          }
        ]
      ]
    };
    
    // Default generic fantasy continuations
    const defaultContinuations = [
      {
        currentScene: "As you step into the forest, the canopy above blocks out most of the light. Your sword gleams faintly in what little illumination filters through. The path ahead splits in two directions.",
        options: [
          "Take the path that leads deeper into the darkness",
          "Follow the path that seems to curve around to the right",
          "Leave markings on trees as you go to avoid getting lost",
          "Listen carefully for any signs of danger"
        ],
        avatar: "/avatars/dark-forest-path.jpg"
      },
      {
        currentScene: "You spend hours searching for an alternative route. Eventually, you discover a narrow mountain pass that seems to skirt the edge of the forest. It looks treacherous, but passable.",
        options: [
          "Attempt to navigate the mountain pass",
          "Reconsider and enter the forest after all",
          "Look for signs of recent travelers",
          "Make camp and rest before deciding"
        ],
        avatar: "/avatars/mountain-pass.jpg"
      },
      {
        currentScene: "Your voice echoes through the trees. After a moment of silence, you hear a response - a melodic, almost ethereal voice calling back to you. 'Traveler, why do you linger at the edge of my domain?'",
        options: [
          "Reply honestly about your journey and intentions",
          "Ask who is speaking and show caution",
          "Ready your weapon, suspecting a trap",
          "Back away slowly toward the road you came from"
        ],
        avatar: "/avatars/mysterious-voice.jpg"
      },
      {
        currentScene: "You set up a small camp and light a fire. As night falls completely, strange lights begin to appear between the trees, and whispers seem to carry on the wind.",
        options: [
          "Maintain your fire and stay vigilant",
          "Investigate the strange lights",
          "Try to communicate with whatever is causing the whispers",
          "Pack up quickly and move away from the forest"
        ],
        avatar: "/avatars/night-camp.jpg"
      }
    ];
    
    // Determine which continuation set to use based on character name
    let nextScene;
    
    if (characterNameLower in famousCharacterContinuations && 
        famousCharacterContinuations[characterNameLower].length > 0) {
      // Use the famous character continuation if available
      const characterContinuations = famousCharacterContinuations[characterNameLower][0];
      nextScene = characterContinuations[choiceIndex % characterContinuations.length];
    } else if (characterNameLower.includes('harry') && characterNameLower.includes('potter')) {
      const harryPotterContinuations = famousCharacterContinuations['harry potter'][0];
      nextScene = harryPotterContinuations[choiceIndex % harryPotterContinuations.length];
    } else if (characterNameLower.includes('frodo')) {
      const frodoContinuations = famousCharacterContinuations['frodo baggins'][0];
      nextScene = frodoContinuations[choiceIndex % frodoContinuations.length];
    } else if (characterNameLower.includes('luke') && characterNameLower.includes('skywalker')) {
      const lukeContinuations = famousCharacterContinuations['luke skywalker'][0];
      nextScene = lukeContinuations[choiceIndex % lukeContinuations.length];
    } else {
      // Use default continuations for non-famous characters
      nextScene = defaultContinuations[choiceIndex % defaultContinuations.length];
    }
    
    setStoryData(nextScene);
  };

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {gameState === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <WelcomeScreen onStart={startGame} />
          </motion.div>
        )}
        
        {gameState === 'character-creation' && (
          <motion.div
            key="character-creation"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <CharacterCreation onCreateCharacter={createCharacter} />
          </motion.div>
        )}
        
        {gameState === 'game' && storyData && (
          <motion.div
            key="game"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GameInterface 
              character={character} 
              storyData={storyData} 
              onMakeChoice={makeChoice}
              onEndStory={endStory} 
            />
          </motion.div>
        )}
        
        {gameState === 'end-story' && (
          <motion.div
            key="end-story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ThankYouPage 
              character={character} 
              fullStory={fullStory} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;