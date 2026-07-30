import json
from google import genai
from google.genai import types
from pydantic import BaseModel, Field

from app.core.config import settings
from app.models.assessment import Assessment

# Initialize client without blocking print statement
client = genai.Client(api_key=settings.GEMINI_API_KEY)

class EvaluationResult(BaseModel):
    technical_rating: int = Field(..., description="Technical rating of the candidate from 1 to 10")
    problem_solving_rating: int = Field(..., description="Problem solving rating of the candidate from 1 to 10")
    communication_rating: int = Field(..., description="Communication rating of the candidate from 1 to 10")
    strengths: str = Field(..., description="Key technical/professional strengths of the candidate")
    weaknesses: str = Field(..., description="Key areas of improvement for the candidate")
    recommendation: str = Field(..., description="Recommendation (e.g. Hire, No Hire, Borderline)")
    reasoning: str = Field(..., description="Detailed explanation/reasoning of the assessment")
    confidence_score: int = Field(..., description="Confidence score in the evaluation, percentage from 0 to 100")

def generate_evaluation(assessment: Assessment):
    prompt = f"""
You are an experienced technical recruiter.

Evaluate the following candidate.

Coding Score: {assessment.coding_score}
MCQ Score: {assessment.mcq_score}
Problem Solving Score: {assessment.problem_solving_score}
Communication Score: {assessment.communication_score}
Overall Score: {assessment.overall_score}
"""

    # We use gemini-3.6-flash as primary, falling back to gemini-3.5-flash-lite or gemini-3.1-flash-lite
    # in case of quota, demand limit, or service unavailability.
    models_to_try = [
        "gemini-3.6-flash",
        "gemini-3.5-flash-lite",
        "gemini-3.1-flash-lite",
    ]
    
    last_exception = None
    for model_name in models_to_try:
        try:
            response = client.models.generate_content(
                model=model_name,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=EvaluationResult,
                )
            )
            # Parse and return validated json structure
            return json.loads(response.text.strip())
        except Exception as e:
            last_exception = e
            # Proceed to next model on failure
            continue
            
    # Raise the last exception if all models failed
    if last_exception:
        raise last_exception