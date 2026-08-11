from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel, ConfigDict


class EvaluationBase(BaseModel):
    technical_rating: float
    problem_solving_rating: float
    communication_rating: float

    strengths: str
    weaknesses: str

    recommendation: str
    reasoning: str

    confidence_score: float

    match_percentage: float = 0.0
    matched_skills: List[str] = []
    missing_skills: List[str] = []
    mandatory_requirements_met: bool = True
    rubric_version: Optional[int] = None
    personalized_feedback: Optional[str] = None
    suggested_topics: List[str] = []


class EvaluationCreate(BaseModel):
    assessment_id: int


class EvaluationUpdate(BaseModel):
    technical_rating: Optional[float] = None
    problem_solving_rating: Optional[float] = None
    communication_rating: Optional[float] = None

    strengths: Optional[str] = None
    weaknesses: Optional[str] = None

    recommendation: Optional[str] = None
    reasoning: Optional[str] = None

    confidence_score: Optional[float] = None

    match_percentage: Optional[float] = None
    matched_skills: Optional[List[str]] = None
    missing_skills: Optional[List[str]] = None
    mandatory_requirements_met: Optional[bool] = None
    rubric_version: Optional[int] = None
    personalized_feedback: Optional[str] = None
    suggested_topics: Optional[List[str]] = None


class EvaluationResponse(EvaluationBase):
    id: int
    assessment_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class CandidateFeedbackResponse(BaseModel):
    overall_score: int
    score_breakdown: dict
    strengths: str
    areas_for_improvement: str
    personalized_feedback: str
    suggested_topics: List[str]