import google.generativeai as genai
import json
import re
from character_recognition import CharacterRecognition

class StoryEngine:
    """Engine for generating interactive story content using Gemini API"""
    
    def __init__(self, api_key):
        """Initialize the story engine with Gemini API"""
        self.api_key = api_key
        genai.configure(api_key=api_key)
        # Updated model name to use the official Gemini 2.0 Flash model
        self.model = genai.GenerativeModel('gemini-2.0-flash')
        self.story_history = []
        
    def generate_story_start(self, character_name, character_class, character_race):
        """Generate the initial story based on character details"""
        # Check if the character is a famous character
        universe_data = None
        if CharacterRecognition.is_famous_character(character_name):
            universe_data = CharacterRecognition.get_character_universe(character_name)
        
        prompt = f"""
        You are an AI Dungeon Master creating an interactive fantasy RPG experience. 
        Create an engaging opening scene for a new adventure with the following character:
        - Name: {character_name}
        - Class: {character_class}
        - Race: {character_race}
        
        The response should include:
        1. A rich, descriptive opening paragraph setting the scene (200-300 words)
        2. The current situation the character finds themselves in
        3. Exactly 3 possible choices for what the player can do next
        
        Format your response as a JSON object with the following structure:
        {{"story": "[opening paragraph]", "situation": "[current situation]", "choices": ["choice1", "choice2", "choice3"]}}        
        """
        
        # Enhance prompt with universe-specific elements if it's a famous character
        if universe_data:
            prompt = CharacterRecognition.enhance_prompt_with_universe(prompt, universe_data)
        
        try:
            response = self.model.generate_content(prompt)
            # Extract JSON from response
            json_match = re.search(r'\{.*\}', response.text, re.DOTALL)
            if json_match:
                story_data = json.loads(json_match.group(0))
            else:
                # Fallback if JSON parsing fails
                story_data = {
                    "story": response.text[:300],
                    "situation": "You find yourself at the start of an adventure.",
                    "choices": [
                        "Explore the surroundings",
                        "Talk to nearby characters",
                        "Check your inventory"
                    ]
                }
                
            # Save to history
            self.story_history = [{
                "content": story_data["story"] + "\n" + story_data["situation"],
                "type": "narrative"
            }]
            
            return {
                "story": story_data["story"],
                "situation": story_data["situation"],
                "choices": story_data["choices"],
                "character": {
                    "name": character_name,
                    "class": character_class,
                    "race": character_race
                }
            }
            
        except Exception as e:
            print(f"Error generating story start: {e}")
            return {
                "story": "As you begin your journey, the world around you starts to take shape...",
                "situation": "You find yourself at a crossroads, unsure of which path to take.",
                "choices": [
                    "Head north toward the mountains",
                    "Travel east to the nearby village",
                    "Venture west into the mysterious forest"
                ],
                "character": {
                    "name": character_name,
                    "class": character_class,
                    "race": character_race
                }
            }
    
    def generate_story_continuation(self, choice, story_context, character):
        """Generate the next part of the story based on the player's choice"""
        # Add the player's choice to the story history
        self.story_history.append({
            "content": choice,
            "type": "choice"
        })
        
        # Construct the story so far for context
        story_so_far = "\n".join([item["content"] for item in self.story_history])
        
        # Check if the character is a famous character
        universe_data = None
        if CharacterRecognition.is_famous_character(character['name']):
            universe_data = CharacterRecognition.get_character_universe(character['name'])
        
        prompt = f"""
        You are an AI Dungeon Master continuing an interactive fantasy RPG experience.
        
        Character:
        - Name: {character['name']}
        - Class: {character['class']}
        - Race: {character['race']}
        
        Story so far:
        {story_so_far}
        
        The player has chosen: "{choice}"
        
        Continue the story based on this choice. Your response should include:
        1. A descriptive paragraph (150-250 words) narrating what happens as a result of this choice
        2. The new situation the character now faces
        3. Exactly 3 new possible choices for what the player can do next
        
        Format your response as a JSON object with the following structure:
        {{"story": "[continuation paragraph]", "situation": "[new situation]", "choices": ["choice1", "choice2", "choice3"]}}        
        """
        
        # Enhance prompt with universe-specific elements if it's a famous character
        if universe_data:
            prompt = CharacterRecognition.enhance_prompt_with_universe(prompt, universe_data)
        
        try:
            response = self.model.generate_content(prompt)
            # Extract JSON from response
            json_match = re.search(r'\{.*\}', response.text, re.DOTALL)
            if json_match:
                story_data = json.loads(json_match.group(0))
            else:
                # Fallback if JSON parsing fails
                story_data = {
                    "story": response.text[:250],
                    "situation": "You continue on your adventure.",
                    "choices": [
                        "Investigate further",
                        "Retreat to safety",
                        "Try a different approach"
                    ]
                }
            
            # Add the new narrative to history
            self.story_history.append({
                "content": story_data["story"] + "\n" + story_data["situation"],
                "type": "narrative"
            })
            
            return {
                "story": story_data["story"],
                "situation": story_data["situation"],
                "choices": story_data["choices"],
                "character": character
            }
            
        except Exception as e:
            print(f"Error generating story continuation: {e}")
            return {
                "story": "Your choice leads you down an unexpected path...",
                "situation": "You must now decide your next move carefully.",
                "choices": [
                    "Proceed with caution",
                    "Take a bold approach",
                    "Look for an alternative solution"
                ],
                "character": character
            }