from sqlalchemy.orm import Session

from app.models.campaign import Campaign
from app.schemas.campaign import CampaignCreate


def create_campaign(db: Session, campaign: CampaignCreate):
    db_campaign = Campaign(**campaign.model_dump())

    db.add(db_campaign)
    db.commit()
    db.refresh(db_campaign)

    return db_campaign

def get_campaigns(db: Session):
    return db.query(Campaign).all()


def get_campaign_by_id(db: Session, campaign_id: int):
    return (
        db.query(Campaign)
        .filter(Campaign.id == campaign_id)
        .first()
    )


def update_campaign(db: Session, campaign_id: int, data: dict):
    campaign = get_campaign_by_id(db, campaign_id)

    if not campaign:
        return None

    for key, value in data.items():
        setattr(campaign, key, value)

    db.commit()
    db.refresh(campaign)

    return campaign


def delete_campaign(db: Session, campaign_id: int):
    campaign = get_campaign_by_id(db, campaign_id)

    if not campaign:
        return False

    db.delete(campaign)
    db.commit()

    return True