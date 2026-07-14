from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.campaign import (
    CampaignCreate,
    CampaignResponse,
)
from app.services.campaign_service import (
    create_campaign_service,
)
from app.schemas.campaign import (
    CampaignCreate,
    CampaignResponse,
    CampaignUpdate,
)

from app.services.campaign_service import (
    create_campaign_service,
    get_campaigns_service,
    get_campaign_service,
    update_campaign_service,
    delete_campaign_service,
)
router = APIRouter(prefix="/campaigns", tags=["Campaigns"])


@router.post(
    "/",
    response_model=CampaignResponse,
)
def create_campaign(
    campaign: CampaignCreate,
    db: Session = Depends(get_db),
):
    return create_campaign_service(db, campaign)
@router.get(
    "/",
    response_model=list[CampaignResponse],
)
def get_campaigns(
    db: Session = Depends(get_db),
):
    return get_campaigns_service(db)
@router.get(
    "/{campaign_id}",
    response_model=CampaignResponse,
)
def get_campaign(
    campaign_id: int,
    db: Session = Depends(get_db),
):
    return get_campaign_service(
        db,
        campaign_id,
    )
@router.put(
    "/{campaign_id}",
    response_model=CampaignResponse,
)
def update_campaign(
    campaign_id: int,
    campaign: CampaignUpdate,
    db: Session = Depends(get_db),
):
    return update_campaign_service(
        db,
        campaign_id,
        campaign,
    )
@router.delete("/{campaign_id}")
def delete_campaign(
    campaign_id: int,
    db: Session = Depends(get_db),
):
    success = delete_campaign_service(
        db,
        campaign_id,
    )

    return {
        "success": success
    }