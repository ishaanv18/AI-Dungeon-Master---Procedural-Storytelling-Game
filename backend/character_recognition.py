import re

class CharacterRecognition:
    """Utility for recognizing famous characters and adapting stories to their universes"""
    
    # Dictionary of famous characters and their universe details
    FAMOUS_CHARACTERS = {
        # Harry Potter universe
        'harry potter': {
            'universe': 'Harry Potter',
            'setting': 'Hogwarts School of Witchcraft and Wizardry',
            'themes': ['magic', 'wizardry', 'friendship', 'good vs evil'],
            'characters': ['Hermione Granger', 'Ron Weasley', 'Albus Dumbledore', 'Severus Snape', 'Lord Voldemort'],
            'items': ['wand', 'broomstick', 'invisibility cloak', 'marauder\'s map'],
            'plot_elements': ['house sorting', 'quidditch match', 'potions class', 'defense against dark arts']
        },
        # Lord of the Rings universe
        'frodo baggins': {
            'universe': 'Lord of the Rings',
            'setting': 'Middle Earth',
            'themes': ['journey', 'fellowship', 'corruption of power', 'good vs evil'],
            'characters': ['Gandalf', 'Samwise Gamgee', 'Aragorn', 'Legolas', 'Gollum'],
            'items': ['the one ring', 'sting', 'mithril armor'],
            'plot_elements': ['council of elrond', 'mines of moria', 'journey to mordor']
        },
        # Game of Thrones universe
        'jon snow': {
            'universe': 'Game of Thrones',
            'setting': 'Westeros',
            'themes': ['power', 'betrayal', 'honor', 'survival'],
            'characters': ['Daenerys Targaryen', 'Tyrion Lannister', 'Arya Stark', 'Night King'],
            'items': ['valyrian steel sword', 'dragon glass', 'iron throne'],
            'plot_elements': ['the wall', 'white walkers', 'house rivalries']
        },
        # Star Wars universe
        'luke skywalker': {
            'universe': 'Star Wars',
            'setting': 'A galaxy far, far away',
            'themes': ['the force', 'rebellion', 'redemption', 'destiny'],
            'characters': ['Darth Vader', 'Princess Leia', 'Han Solo', 'Yoda', 'Emperor Palpatine'],
            'items': ['lightsaber', 'the force', 'x-wing fighter', 'millennium falcon'],
            'plot_elements': ['jedi training', 'space battles', 'imperial conflict']
        },
        # Marvel universe
        'tony stark': {
            'universe': 'Marvel',
            'setting': 'Modern Earth with superheroes',
            'themes': ['heroism', 'technology', 'responsibility', 'teamwork'],
            'characters': ['Steve Rogers', 'Thor', 'Bruce Banner', 'Natasha Romanoff', 'Nick Fury'],
            'items': ['iron man suit', 'captain america\'s shield', 'mjolnir'],
            'plot_elements': ['avengers assembly', 'alien invasion', 'superhero battles']
        }
    }
    
    @staticmethod
    def is_famous_character(character_name):
        """Check if the character name matches a famous character"""
        if not character_name:
            return False
            
        # Convert to lowercase for case-insensitive matching
        name_lower = character_name.lower()
        
        # Check for exact matches
        if name_lower in CharacterRecognition.FAMOUS_CHARACTERS:
            return True
            
        # Check for partial matches (e.g., "Harry" should match "Harry Potter")
        for famous_name in CharacterRecognition.FAMOUS_CHARACTERS.keys():
            # Split the famous name into parts
            name_parts = famous_name.split()
            
            # Check if any part matches the input name
            if len(name_parts) > 1:
                for part in name_parts:
                    if part == name_lower:
                        return True
        
        return False
    
    @staticmethod
    def get_character_universe(character_name):
        """Get the universe details for a recognized character"""
        if not character_name:
            return None
            
        name_lower = character_name.lower()
        
        # Check for exact match
        if name_lower in CharacterRecognition.FAMOUS_CHARACTERS:
            return CharacterRecognition.FAMOUS_CHARACTERS[name_lower]
            
        # Check for partial matches
        for famous_name, universe_data in CharacterRecognition.FAMOUS_CHARACTERS.items():
            name_parts = famous_name.split()
            
            if len(name_parts) > 1:
                for part in name_parts:
                    if part == name_lower:
                        return CharacterRecognition.FAMOUS_CHARACTERS[famous_name]
        
        return None
    
    @staticmethod
    def enhance_prompt_with_universe(prompt, universe_data):
        """Enhance a story generation prompt with universe-specific elements"""
        if not universe_data:
            return prompt
            
        universe_context = f"""
        This story takes place in the {universe_data['universe']} universe.
        Setting: {universe_data['setting']}
        Themes: {', '.join(universe_data['themes'])}
        
        You may include these characters: {', '.join(universe_data['characters'])}
        You may reference these items: {', '.join(universe_data['items'])}
        Consider including these plot elements: {', '.join(universe_data['plot_elements'])}
        
        Make sure the story feels authentic to the {universe_data['universe']} universe, using appropriate terminology, 
        locations, and story elements that fans would recognize, while still creating a unique adventure.
        """
        
        # Insert the universe context at an appropriate point in the prompt
        # Look for a good insertion point after the initial instructions
        match = re.search(r"You are an AI Dungeon Master.*?\n", prompt, re.DOTALL)
        if match:
            insertion_point = match.end()
            enhanced_prompt = prompt[:insertion_point] + universe_context + prompt[insertion_point:]
            return enhanced_prompt
        else:
            # If we can't find a good insertion point, just prepend it
            return universe_context + prompt