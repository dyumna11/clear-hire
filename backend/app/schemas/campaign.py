from pydantic import BaseModel
from typing import Dict
from datetime import datetime


class CampaignCreate(BaseModel):
    title: str
    department: str
    assessment_source: str


class CampaignResponse(BaseModel):
    id: int
    company_id: int
    title: str
    department: str
    assessment_source: str
    status: str
    transparency_policy: Dict
    evaluation_mapping: Dict
    created_at: datetime
    
class CampaignUpdate(BaseModel):
    title: str | None = None
    department: str | None = None
    assessment_source: str | None = None
    status: str | None = None

    model_config = {
        "from_attributes": True
    }
    