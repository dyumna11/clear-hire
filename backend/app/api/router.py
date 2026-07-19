from fastapi import APIRouter

from app.api.v1.endpoints import auth, campaign
from app.api.v1.endpoints import candidate
from app.api.v1.endpoints import assessment
api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(campaign.router)
api_router.include_router(candidate.router)
api_router.include_router(assessment.router)