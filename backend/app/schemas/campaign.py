from pydantic import BaseModel
from typing import Dict, Optional, List
from datetime import datetime


class CampaignCreate(BaseModel):
    title: str
    department: str
    assessment_source: str
    job_description: Optional[str] = None
    hiring_notes: Optional[str] = None
    evaluation_parameters: Optional[Dict] = None


class CampaignResponse(BaseModel):
    id: int
    company_id: int
    title: str
    department: str
    assessment_source: str
    status: str
    transparency_policy: Dict
    evaluation_mapping: Dict
    job_description: Optional[str] = None
    hiring_notes: Optional[str] = None
    evaluation_parameters: Optional[Dict] = None
    evaluation_rubric: Optional[Dict] = None
    rubric_status: Optional[str] = "draft"
    rubric_version: Optional[int] = 0
    rubric_generated_at: Optional[datetime] = None
    rubric_approved_at: Optional[datetime] = None
    created_at: datetime
    
class CampaignUpdate(BaseModel):
    title: str | None = None
    department: str | None = None
    assessment_source: str | None = None
    status: str | None = None
    job_description: str | None = None
    hiring_notes: str | None = None
    evaluation_parameters: Optional[Dict] = None

    model_config = {
        "from_attributes": True
    }


class RubricWeights(BaseModel):
    technical: int
    problem_solving: int
    communication: int
    projects: int


class RubricMinimumScores(BaseModel):
    coding: int
    overall: int


class RubricUpdate(BaseModel):
    weights: RubricWeights
    minimum_scores: RubricMinimumScores
    mandatory_skills: List[str]
    preferred_skills: List[str]
    evaluation_guidelines: str

    