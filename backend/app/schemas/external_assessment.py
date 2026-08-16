from datetime import datetime
from typing import List, Optional, Any
from pydantic import BaseModel, ConfigDict


class ExternalQuestionBase(BaseModel):
    question: str
    skill: str
    score: int
    time_taken: int
    tests_passed: int
    tests_total: int


class ExternalAssessmentImport(BaseModel):
    candidate_id: Optional[int] = None
    candidate_name: str
    candidate_email: Optional[str] = None
    campaign_id: Optional[int] = None
    assessment_name: str
    overall_score: int
    questions: List[ExternalQuestionBase]


class ExternalAssessmentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    assessment_id: int
    candidate_name: str
    assessment_name: str
    overall_score: int
    questions: List[Any]
    interview_questions: Optional[List[Any]] = None
    evaluation_report: Optional[Any] = None
    created_at: datetime
