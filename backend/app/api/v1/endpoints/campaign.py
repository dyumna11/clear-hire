from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.recruiter import Recruiter
from app.schemas.campaign import (
    CampaignCreate,
    CampaignResponse,
    CampaignUpdate,
    RubricUpdate,
)
from app.services.auth_service import get_current_recruiter
from app.services.campaign_service import (
    create_campaign_service,
    get_campaign_service,
    get_campaigns_service,
    update_campaign_service,
    delete_campaign_service,
    generate_rubric_service,
    update_rubric_service,
    approve_rubric_service,
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


@router.post(
    "/{campaign_id}/generate-rubric",
    response_model=CampaignResponse,
)
def generate_rubric(
    campaign_id: int,
    db: Session = Depends(get_db),
    recruiter: Recruiter = Depends(get_current_recruiter),
):
    return generate_rubric_service(
        db,
        campaign_id,
        recruiter,
    )


@router.put(
    "/{campaign_id}/rubric",
    response_model=CampaignResponse,
)
def update_rubric(
    campaign_id: int,
    rubric: RubricUpdate,
    db: Session = Depends(get_db),
    recruiter: Recruiter = Depends(get_current_recruiter),
):
    return update_rubric_service(
        db,
        campaign_id,
        rubric,
        recruiter,
    )


@router.post(
    "/{campaign_id}/rubric/approve",
    response_model=CampaignResponse,
)
def approve_rubric(
    campaign_id: int,
    db: Session = Depends(get_db),
    recruiter: Recruiter = Depends(get_current_recruiter),
):
    return approve_rubric_service(
        db,
        campaign_id,
        recruiter,
    )