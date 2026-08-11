import json
from google import genai
from google.genai import types
from pydantic import BaseModel, Field

from app.core.config import settings
from app.models.assessment import Assessment

# Initialize client
client = genai.Client(api_key=settings.GEMINI_API_KEY)

class RubricWeights(BaseModel):
    technical: int = Field(..., description="Weight for technical skills (0-100)")
    problem_solving: int = Field(..., description="Weight for problem solving skills (0-100)")
    communication: int = Field(..., description="Weight for communication skills (0-100)")
    projects: int = Field(..., description="Weight for project experience (0-100)")

class RubricMinimumScores(BaseModel):
    coding: int = Field(..., description="Minimum coding score required")
    overall: int = Field(..., description="Minimum overall score required")

class CampaignRubric(BaseModel):
    weights: RubricWeights
    minimum_scores: RubricMinimumScores
    mandatory_skills: list[str] = Field(..., description="List of mandatory skills required for the job")
    preferred_skills: list[str] = Field(..., description="List of preferred/nice-to-have skills for the job")
    evaluation_guidelines: str = Field(..., description="Specific guidelines or priorities for evaluating candidates based on hiring notes and JD")

class EvaluationResult(BaseModel):
    technical_rating: int = Field(..., description="Technical rating of the candidate from 1 to 10")
    problem_solving_rating: int = Field(..., description="Problem solving rating of the candidate from 1 to 10")
    communication_rating: int = Field(..., description="Communication rating of the candidate from 1 to 10")
    strengths: str = Field(..., description="Key technical/professional strengths of the candidate")
    weaknesses: str = Field(..., description="Key areas of improvement for the candidate")
    recommendation: str = Field(..., description="Recommendation (e.g. Hire, No Hire, Borderline)")
    reasoning: str = Field(..., description="Detailed explanation/reasoning of the assessment for the recruiter")
    confidence_score: int = Field(..., description="Confidence score in the evaluation, percentage from 0 to 100")
    match_percentage: int = Field(..., description="Percentage match of the candidate against the hiring rubric, 0 to 100")
    matched_skills: list[str] = Field(..., description="List of candidate's skills that match the rubric")
    missing_skills: list[str] = Field(..., description="List of required or preferred skills missing from the candidate's profile")
    mandatory_requirements_met: bool = Field(..., description="Whether the candidate met all mandatory requirements from the rubric")
    personalized_feedback: str = Field(..., description="Constructive, candidate-friendly feedback focusing ONLY on their own performance. DO NOT mention recruiter-only metrics, confidence, rankings, internal guidelines, internal rubric thresholds, or internal recommendations.")
    suggested_topics: list[str] = Field(..., description="Suggested learning/improvement topics for the candidate to improve their skills")

def _call_gemini_with_fallback(prompt: str, schema):
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
                    response_schema=schema,
                )
            )
            return json.loads(response.text.strip())
        except Exception as e:
            last_exception = e
            continue
            
    if last_exception:
        raise last_exception

def generate_rubric_jd_only(job_description: str) -> dict:
    prompt = f"""
You are a Senior Technical Recruiter.
Analyze the following Job Description (JD) to construct a structured hiring rubric for candidate evaluations.

Job Description:
{job_description}

Ensure the weights (technical, problem_solving, communication, projects) sum up to exactly 100.
Determine appropriate minimum scores (coding, overall) based on the JD seniority and requirements.
Extract mandatory skills (e.g. required languages, core concepts) and preferred skills (nice-to-have).
Provide detailed evaluation guidelines summarizing technical priorities, experience requirements, assessment priorities, and mandatory/preferred requirements.
"""
    return _call_gemini_with_fallback(prompt, CampaignRubric)

def generate_rubric_jd_and_manual(job_description: str, evaluation_parameters: dict) -> dict:
    prompt = f"""
You are a Senior Technical Recruiter.
Analyze the following Job Description (JD) and the recruiter's manually defined evaluation parameters to construct a structured hiring rubric.

Job Description:
{job_description}

Recruiter Authoritative Parameters:
{json.dumps(evaluation_parameters, indent=2)}

CRITICAL INSTRUCTION:
You must use the Recruiter's parameters as authoritative. Specifically:
- If recruiter specified weights, use them exactly. Do not change them.
- If recruiter specified minimum_scores, use them exactly.
- If recruiter specified mandatory_skills or preferred_skills, include them. You may use the Job Description to add additional skills or details, but do not remove or contradict the recruiter's specified parameters.
- Use the Job Description to fill in any missing information and write comprehensive evaluation guidelines.
- Ensure the final weights (technical, problem_solving, communication, projects) sum up to exactly 100.
"""
    return _call_gemini_with_fallback(prompt, CampaignRubric)

def generate_rubric_manual_only(evaluation_parameters: dict) -> dict:
    weights = evaluation_parameters.get("weights", {"technical": 25, "problem_solving": 25, "communication": 25, "projects": 25})
    minimum_scores = evaluation_parameters.get("minimum_scores", {"coding": 0, "overall": 0})
    mandatory_skills = evaluation_parameters.get("mandatory_skills", [])
    preferred_skills = evaluation_parameters.get("preferred_skills", [])
    
    # simple adjustment to make weights sum to 100
    total_weight = sum(weights.values())
    if total_weight != 100:
        keys = list(weights.keys())
        if keys:
            weights[keys[0]] += (100 - total_weight)
            
    return {
        "weights": weights,
        "minimum_scores": minimum_scores,
        "mandatory_skills": mandatory_skills,
        "preferred_skills": preferred_skills,
        "evaluation_guidelines": "Evaluate candidate according to manual parameters provided by recruiter."
    }

def generate_evaluation(assessment: Assessment):
    candidate = assessment.candidate
    if not candidate:
        raise ValueError("Assessment does not have an associated candidate.")
    
    campaign = candidate.campaign
    if not campaign:
        raise ValueError("Candidate is not associated with any campaign.")
        
    rubric = campaign.evaluation_rubric
    if not rubric:
        raise ValueError("Evaluation rubric has not been generated for this campaign yet. Please generate the rubric first.")
        
    if campaign.rubric_status != "approved":
        raise ValueError("Rubric not approved")

    prompt = f"""
You are an experienced technical recruiter evaluating a candidate for the following campaign.

Job Description:
{campaign.job_description or "Not Provided"}

Recruiter Hiring Notes:
{campaign.hiring_notes or "Not Provided"}

Approved Hiring Rubric:
{json.dumps(rubric, indent=2)}

Assessment Scores:
- Coding Score: {assessment.coding_score}
- MCQ Score: {assessment.mcq_score}
- Problem Solving Score: {assessment.problem_solving_score}
- Communication Score: {assessment.communication_score}
- Overall Score: {assessment.overall_score}

Candidate Information:
- Name: {candidate.name}
- Email: {candidate.email}
- Resume URL: {candidate.resume_url or "Not Provided"}

INSTRUCTIONS:
1. Evaluate this candidate ONLY according to the approved hiring rubric.
2. Do not invent hiring requirements.
3. Use only the approved hiring rubric.
4. If a mandatory requirement is not satisfied, clearly identify it.
5. Separate objective assessment performance from the final recommendation.
6. Generate constructive, candidate-friendly feedback (personalized_feedback and suggested_topics) based ONLY on their own performance.
7. Candidate feedback must NOT see recruiter hiring notes, internal thresholds, confidential company guidelines, other candidates, ranking, internal recommendation, confidence score, internal rubric, or recruiter-only reasoning. Focus purely on their score and constructive ways to improve.
"""
    return _call_gemini_with_fallback(prompt, EvaluationResult)