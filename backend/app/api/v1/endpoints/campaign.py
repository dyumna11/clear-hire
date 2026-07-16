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
router = APIRouter(prefix="/campaigns", tags=["Campaigns"])
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)

@router.post(
    "/",
    response_model=CampaignResponse,
)
def create_campaign(
    campaign: CampaignCreate,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    recruiter = get_current_recruiter(
        db,
        token,
    )

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