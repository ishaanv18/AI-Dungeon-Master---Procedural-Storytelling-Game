# AI Dungeon Master - Procedural Storytelling Game

AI Dungeon Master is an interactive storytelling game that uses AI to generate dynamic storylines based on user choices, similar to a personalized D&D campaign. The application leverages Google's Gemini API to create immersive, procedurally-generated adventures that adapt to player decisions.

## Project Overview

This project combines modern web technologies with AI to create a unique interactive fiction experience. The system uses procedural storytelling algorithms to generate coherent narratives that respond to player choices, creating a personalized adventure for each playthrough.

## Features

- **AI-powered story generation** using Google's Gemini API
- **Character creation and customization**
- **Interactive choice-based gameplay**
- **Persistent game state management**
- **Fantasy-themed user interface**
- **Famous character recognition system**
- **Universe-specific storytelling adaptation**

## Algorithms and Technical Implementation

### Story Generation Algorithm

The core of the application is the `StoryEngine` class which implements a sophisticated procedural storytelling algorithm:

1. **Initial Story Generation**:
   - Takes character details (name, class, race) as input
   - Constructs a detailed prompt for the Gemini API
   - Processes the response to extract structured story elements
   - Returns a formatted story with situation and choices

2. **Story Continuation**:
   - Maintains story history for context
   - Processes player choices
   - Generates coherent narrative continuations
   - Ensures consistent storytelling with appropriate transitions

3. **JSON Response Handling**:
   - Parses structured responses from the AI
   - Implements fallback mechanisms for error handling
   - Maintains story state between interactions

### Character Recognition System

The `CharacterRecognition` class implements an intelligent system for identifying famous characters and adapting the storytelling:

1. **Character Identification**:
   - Maintains a database of famous characters from popular universes
   - Uses case-insensitive matching for character names
   - Supports partial name matching (e.g., "Harry" matches "Harry Potter")

2. **Universe-Specific Adaptation**:
   - Retrieves universe details for recognized characters
   - Enhances story prompts with universe-specific elements:
     - Setting (e.g., Hogwarts, Middle Earth)
     - Themes (e.g., magic, journey, heroism)
     - Characters (e.g., companions, antagonists)
     - Items (e.g., wands, lightsabers)
     - Plot elements (e.g., quidditch matches, jedi training)

3. **Prompt Enhancement**:
   - Dynamically modifies AI prompts to include universe context
   - Ensures authentic storytelling within the character's universe
   - Maintains narrative coherence while incorporating universe elements

## Project Structure

```
├── frontend/           # React frontend application
│   ├── public/         # Static files and assets
│   │   └── avatars/    # Character avatar images
│   └── src/            # React source code
│       └── components/ # UI components
├── backend/            # Flask backend application
│   ├── app.py          # Main Flask application
│   ├── story_engine.py # Story generation logic
│   ├── character_recognition.py # Character recognition system
│   └── requirements.txt # Python dependencies
└── README.md           # Project documentation
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment (optional but recommended):
   ```
   python -m venv venv
   venv\Scripts\activate  # On Windows
   source venv/bin/activate  # On macOS/Linux
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Set up your Gemini API key:
   - Create a `.env` file in the backend directory
   - Add your API key: `GEMINI_API_KEY=your_api_key_here`

5. Run the Flask server:
   ```
   python app.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

The backend provides the following RESTful API endpoints:

- **POST /api/start-game**: Initializes a new game session
  - Request body: `{"characterName": string, "characterClass": string, "characterRace": string}`
  - Response: Initial story, situation, and choices

- **POST /api/make-choice**: Processes a player's choice
  - Request body: `{"choice": string, "storyContext": object, "character": object}`
  - Response: Updated story, situation, and new choices

- **GET /api/health**: Health check endpoint
  - Response: `{"status": "ok"}`

## Technologies Used

- **Frontend**: 
  - React for UI components and state management
  - CSS for styling
  - Modern JavaScript (ES6+)

- **Backend**: 
  - Flask for the web server
  - Python for backend logic
  - Flask-CORS for cross-origin resource sharing

- **AI**: 
  - Google Gemini API (gemini-2.0-flash model)
  - JSON parsing for structured AI responses

- **Development Tools**:
  - dotenv for environment variable management
  - npm for frontend package management
  - pip for backend package management

## Future Enhancements

- Expanded character customization options
- More universe templates for famous characters
- Persistent save/load functionality
- Audio narration of story elements
- Image generation for scenes and characters
- Combat system with dice rolling mechanics

## License

MIT