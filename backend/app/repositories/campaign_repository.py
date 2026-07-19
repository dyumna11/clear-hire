from sqlalchemy.orm import Session

from app.models.campaign import Campaign


def create_campaign(
    db: Session,
    campaign: Campaign,
):
    db.add(campaign)
    db.commit()
    db.refresh(campaign)
    return campaign


def get_campaigns(
    db: Session,
    company_id: int,
):
    return (
        db.query(Campaign)
        .filter(Campaign.company_id == company_id)
        .all()
    )


def get_campaign_by_id(
    db: Session,
    campaign_id: int,
    company_id: int,
):
    return (
        db.query(Campaign)
        .filter(
            Campaign.id == campaign_id,
            Campaign.company_id == company_id,
        )
        .first()
    )


def update_campaign(
    db: Session,
    campaign_id: int,
    company_id: int,
    data: dict,
):
    campaign = get_campaign_by_id(
        db,
        campaign_id,
        company_id,
    )

    if not campaign:
        return None

    for key, value in data.items():
        setattr(campaign, key, value)

    db.commit()
    db.refresh(campaign)

    return campaign


def delete_campaign(
    db: Session,
    campaign_id: int,
    company_id: int,
):
    campaign = get_campaign_by_id(
        db,
        campaign_id,
        company_id,
    )

    if not campaign:
        return False

    db.delete(campaign)
    db.commit()

    return True