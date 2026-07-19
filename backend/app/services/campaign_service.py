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

from app.models.campaign import Campaign

def create_campaign_service(
    db: Session,
    campaign: CampaignCreate,
    recruiter: Recruiter,
):
    new_campaign = Campaign(
        company_id=recruiter.company_id,
        title=campaign.title,
        department=campaign.department,
        assessment_source=campaign.assessment_source,
    )

    return create_campaign(
        db,
        new_campaign,
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