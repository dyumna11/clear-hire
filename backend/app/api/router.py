from fastapi import APIRouter

from app.api.v1.endpoints import (
    auth,
    campaign,
    candidate,
    assessment,
    evaluation,
    candidate_portal,
)

api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(campaign.router)
api_router.include_router(candidate.router)
api_router.include_router(assessment.router)
api_router.include_router(evaluation.router)
api_router.include_router(candidate_portal.router)