from datetime import datetime
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.repositories.campaign_repository import (
    create_campaign,
    get_campaigns,
    get_campaign_by_id,
    update_campaign,
    delete_campaign,
)
from app.schemas.campaign import CampaignCreate, RubricUpdate
from app.services.ai_evaluation_service import (
    generate_rubric_jd_only,
    generate_rubric_jd_and_manual,
    generate_rubric_manual_only,
)


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
        job_description=campaign.job_description,
        hiring_notes=campaign.hiring_notes,
        evaluation_parameters=campaign.evaluation_parameters,
        rubric_status="draft",
        rubric_version=0,
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
    # Retrieve campaign and verify recruiter ownership first
    existing = get_campaign_by_id(db, campaign_id, recruiter.company_id)
    if not existing:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Campaign not found"
        )
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
    existing = get_campaign_by_id(db, campaign_id, recruiter.company_id)
    if not existing:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Campaign not found"
        )
    return delete_campaign(
        db,
        campaign_id,
        recruiter.company_id,
    )

def generate_rubric_service(
    db: Session,
    campaign_id: int,
    recruiter: Recruiter,
):
    campaign = get_campaign_by_id(db, campaign_id, recruiter.company_id)
    if not campaign:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Campaign not found",
        )
        
    has_jd = bool(campaign.job_description and campaign.job_description.strip())
    has_manual = bool(campaign.evaluation_parameters)
    
    if not has_jd and not has_manual:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Either Job Description or Manual Parameters must be provided to generate a rubric.",
        )
        
    if has_jd and not has_manual:
        # Option A: JD Only
        rubric_data = generate_rubric_jd_only(campaign.job_description)
    elif not has_jd and has_manual:
        # Option B: Manual Parameters Only
        rubric_data = generate_rubric_manual_only(campaign.evaluation_parameters)
    else:
        # Option C: JD + Manual Parameters
        rubric_data = generate_rubric_jd_and_manual(
            campaign.job_description,
            campaign.evaluation_parameters
        )
    
    # Store the version inside evaluation_rubric. Initially version matches the current campaign's version.
    rubric_data["version"] = campaign.rubric_version or 0
    campaign.evaluation_rubric = rubric_data
    campaign.rubric_status = "draft"
    campaign.rubric_generated_at = datetime.now()
    
    db.commit()
    db.refresh(campaign)
    return campaign

def update_rubric_service(
    db: Session,
    campaign_id: int,
    rubric_data: RubricUpdate,
    recruiter: Recruiter,
):
    campaign = get_campaign_by_id(db, campaign_id, recruiter.company_id)
    if not campaign:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Campaign not found",
        )
        
    # Convert Pydantic to dictionary
    rubric_dict = rubric_data.model_dump()
    
    # Set/keep rubric_status to draft
    campaign.rubric_status = "draft"
    rubric_dict["version"] = campaign.rubric_version or 0
    campaign.evaluation_rubric = rubric_dict
    
    db.commit()
    db.refresh(campaign)
    return campaign

def approve_rubric_service(
    db: Session,
    campaign_id: int,
    recruiter: Recruiter,
):
    campaign = get_campaign_by_id(db, campaign_id, recruiter.company_id)
    if not campaign:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Campaign not found",
        )
        
    if not campaign.evaluation_rubric:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Hiring rubric has not been generated for this campaign yet. Please generate the rubric first.",
        )
        
    # Increment version
    new_version = (campaign.rubric_version or 0) + 1
    campaign.rubric_status = "approved"
    campaign.rubric_version = new_version
    campaign.rubric_approved_at = datetime.now()
    
    # Update version key inside evaluation_rubric dictionary
    rubric_dict = dict(campaign.evaluation_rubric)
    rubric_dict["version"] = new_version
    campaign.evaluation_rubric = rubric_dict
    
    db.commit()
    db.refresh(campaign)
    return campaign