from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class AssessmentBase(BaseModel):
    assessment_round: str
    assessment_source: str
    status: str = "Pending"

    coding_score: int = 0
    mcq_score: int = 0
    problem_solving_score: int = 0
    communication_score: int = 0

    overall_score: int = 0
    duration_minutes: int = 0


class AssessmentCreate(AssessmentBase):
    candidate_id: int


class AssessmentUpdate(BaseModel):
    assessment_round: Optional[str] = None
    assessment_source: Optional[str] = None
    status: Optional[str] = None

    coding_score: Optional[int] = None
    mcq_score: Optional[int] = None
    problem_solving_score: Optional[int] = None
    communication_score: Optional[int] = None

    overall_score: Optional[int] = None
    duration_minutes: Optional[int] = None


class AssessmentResponse(AssessmentBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    candidate_id: int
    submitted_at: Optional[datetime]
    created_at: datetime