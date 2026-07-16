from sqlalchemy.orm import Session
from app.repositories.campaign_repository import (
    create_campaign,
    get_campaigns,
    get_campaign_by_id,
    update_campaign,
    delete_campaign,
)
from app.schemas.campaign import CampaignCreate


from app.models.recruiter import Recruiter

def create_campaign_service(
    db: Session,
    campaign: CampaignCreate,
    recruiter: Recruiter,
):
    return create_campaign(
        db,
        campaign,
        recruiter.company_id,
    )

def get_campaign_service(
    db: Session,
    campaign_id: int,
    recruiter: Recruiter,
):
    return get_campaign_by_id(
        db,
        campaign_id,
        recruiter.company_id,
    )


def get_campaigns_service(
    db: Session,
    recruiter: Recruiter,
):
    return get_campaigns(
        db,
        recruiter.company_id,
    )


def update_campaign_service(
    db: Session,
    campaign_id: int,
    campaign,
    recruiter: Recruiter,
):
    return update_campaign(
        db,
        campaign_id,
        recruiter.company_id,
        campaign.model_dump(exclude_unset=True),
    )


def delete_campaign_service(
    db: Session,
    campaign_id: int,
    recruiter: Recruiter,
):
    return delete_campaign(
        db,
        campaign_id,
        recruiter.company_id,
    )