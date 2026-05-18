import os
import json
from openai import OpenAI
from typing import Dict, Any
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

BASE_DIR = Path(__file__).resolve().parent
PROMPT_PATH = BASE_DIR / "prompts" / "challenge_system_prompt.txt"

system_prompt = PROMPT_PATH.read_text(encoding="utf-8")
SUPPORTED_LANGUAGES = {"python", "javascript", "java", "c++"}
DIFFICULTY_MAP = {
    "easy": "easy",
    "medium": "medium",
    "hard": "hard",
    "difficult": "hard"
}


def normalize_language(language: str) -> str:
    if not isinstance(language, str):
        return "Python"

    normalized = language.strip()
    if normalized.lower() == "js":
        return "JavaScript"
    if normalized.lower() == "csharp":
        return "Java"

    if normalized.lower() in {"python", "java", "javascript", "c++"}:
        if normalized.lower() == "javascript":
            return "JavaScript"
        if normalized.lower() == "python":
            return "Python"
        if normalized.lower() == "java":
            return "Java"
        return "C++"

    return "Python"


def generate_challenge_with_ai(language: str, difficulty: str) -> Dict[str, Any]:
    normalized_difficulty = DIFFICULTY_MAP.get(str(difficulty).lower(), "easy")
    normalized_language = normalize_language(language)

    try:
        response = client.chat.completions.create(
            model="gpt-4.1-nano",
            messages=[
                {"role": "system", "content": system_prompt},
                {
                    "role": "user",
                    "content": f"Generate a {normalized_difficulty} difficulty coding challenge in {normalized_language}."
                }
            ],
            response_format={"type": "json_object"},
            temperature=0.7
        )

        content = response.choices[0].message.content
        challenge_data = json.loads(content)

        required_fields = [
            "title",
            "options",
            "correct_answer_id",
            "explanation"
        ]

        for field in required_fields:
            if field not in challenge_data:
                raise ValueError(f"Missing required field: {field}")

        return challenge_data

    except Exception as e:
        print(e)

        return {
            "title": "Basic Python List Operation",
            "options": [
                "my_list.append(5)",
                "my_list.add(5)",
                "my_list.push(5)",
                "my_list.insert(5)",
            ],
            "correct_answer_id": 0,
            "explanation": "In Python, append() is the correct method to add an element to the end of a list."
        }
