from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr


class CandidateCreate(BaseModel):
    campaign_id: int
    name: str
    email: EmailStr
    resume_url: Optional[str] = None


class CandidateUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    resume_url: Optional[str] = None
    status: Optional[str] = None


class CandidateResponse(BaseModel):
    id: int
    campaign_id: int
    name: str
    email: EmailStr
    resume_url: Optional[str]
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)