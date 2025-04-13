from flask import Flask, request, jsonify
import os
import json
from flask_cors import CORS
from story_engine import StoryEngine
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize story engine
story_engine = StoryEngine(api_key=os.getenv('GEMINI_API_KEY'))

@app.route('/api/start-game', methods=['POST'])
def start_game():
    """Start a new game with character details"""
    data = request.json
    character_name = data.get('characterName')
    character_class = data.get('characterClass')
    character_race = data.get('characterRace')
    
    # Generate initial story based on character
    story_response = story_engine.generate_story_start(character_name, character_class, character_race)
    
    # Return the story and initial choices
    return jsonify(story_response)

@app.route('/api/make-choice', methods=['POST'])
def make_choice():
    """Process player's choice and continue the story"""
    data = request.json
    choice = data.get('choice')
    story_context = data.get('storyContext')
    character = data.get('character')
    
    # Generate story continuation based on the choice
    story_response = story_engine.generate_story_continuation(choice, story_context, character)
    
    return jsonify(story_response)

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "ok"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)