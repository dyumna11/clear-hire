from google import genai
from app.core.config import settings

print("Starting...")

client = genai.Client(api_key=settings.GEMINI_API_KEY)

print("Available models:")
for model in client.models.list():
    print(model.name)
