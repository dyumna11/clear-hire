from datetime import datetime
from pydantic import BaseModel


class CandidateAccessTokenResponse(BaseModel):
    assessment_id: int
    token: str
    expires_at: datetime
