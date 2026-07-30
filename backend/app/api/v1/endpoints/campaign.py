from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.recruiter import Recruiter
from app.schemas.campaign import (
    CampaignCreate,
    CampaignResponse,
    CampaignUpdate,
)
from app.services.auth_service import get_current_recruiter
from app.services.campaign_service import (
    create_campaign_service,
    get_campaign_service,
    get_campaigns_service,
    update_campaign_service,
    delete_campaign_service,
)

router = APIRouter(
    prefix="/campaigns",
    tags=["Campaigns"],
)


@router.post(
    "/",
    response_model=CampaignResponse,
)
def create_campaign(
    campaign: CampaignCreate,
    db: Session = Depends(get_db),
    recruiter: Recruiter = Depends(get_current_recruiter),
):
    return create_campaign_service(
        db,
        campaign,
        recruiter,
    )


@router.get(
    "/",
    response_model=list[CampaignResponse],
)
def get_campaigns(
    db: Session = Depends(get_db),
    recruiter: Recruiter = Depends(get_current_recruiter),
):
    return get_campaigns_service(
        db,
        recruiter,
    )


@router.get(
    "/{campaign_id}",
    response_model=CampaignResponse,
)
def get_campaign(
    campaign_id: int,
    db: Session = Depends(get_db),
    recruiter: Recruiter = Depends(get_current_recruiter),
):
    return get_campaign_service(
        db,
        campaign_id,
        recruiter,
    )


@router.put(
    "/{campaign_id}",
    response_model=CampaignResponse,
)
def update_campaign(
    campaign_id: int,
    campaign: CampaignUpdate,
    db: Session = Depends(get_db),
    recruiter: Recruiter = Depends(get_current_recruiter),
):
    return update_campaign_service(
        db,
        campaign_id,
        campaign,
        recruiter,
    )


@router.delete("/{campaign_id}")
def delete_campaign(
    campaign_id: int,
    db: Session = Depends(get_db),
    recruiter: Recruiter = Depends(get_current_recruiter),
):
    success = delete_campaign_service(
        db,
        campaign_id,
        recruiter,
    )

    return {
        "success": success,
    }