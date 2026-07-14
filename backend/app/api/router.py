from fastapi import APIRouter

from app.api.v1.endpoints import campaign

api_router = APIRouter()

api_router.include_router(campaign.router)