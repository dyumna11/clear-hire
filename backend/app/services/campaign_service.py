from sqlalchemy.orm import Session

from app.repositories.campaign_repository import create_campaign
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

def get_campaigns_service(db):
    return get_campaigns(db)


def get_campaign_service(db, campaign_id):
    return get_campaign_by_id(db, campaign_id)


def update_campaign_service(db, campaign_id, campaign):
    return update_campaign(
        db,
        campaign_id,
        campaign.model_dump(exclude_unset=True),
    )


def delete_campaign_service(db, campaign_id):
    return delete_campaign(db, campaign_id)