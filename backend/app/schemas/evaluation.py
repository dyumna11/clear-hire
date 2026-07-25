from datetime import datetime
from typing import Optional

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


class EvaluationCreate(EvaluationBase):
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


class EvaluationResponse(EvaluationBase):
    id: int
    assessment_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)