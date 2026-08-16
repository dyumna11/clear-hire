from fastapi import HTTPException, status
from sqlalchemy.orm import Session, joinedload
from app.services.ai_evaluation_service import generate_evaluation, generate_external_evaluation

from app.models.assessment import Assessment
from app.models.campaign import Campaign
from app.models.candidate import Candidate
from app.models.evaluation import Evaluation
from app.models.recruiter import Recruiter
from app.models.external_assessment import ExternalAssessment

from app.repositories.evaluation_repository import (
    create_evaluation,
    get_evaluations,
    get_evaluation_by_id,
    update_evaluation,
    delete_evaluation,
)

from app.schemas.evaluation import (
    EvaluationCreate,
    EvaluationUpdate,
)
def create_new_evaluation(
    db: Session,
    evaluation: EvaluationCreate,
    recruiter: Recruiter,
):
    # Fetch assessment with candidate and campaign eagerly loaded
    assessment = (
        db.query(Assessment)
        .options(joinedload(Assessment.candidate).joinedload(Candidate.campaign))
        .join(Candidate)
        .join(Campaign)
        .filter(
            Assessment.id == evaluation.assessment_id,
            Campaign.company_id == recruiter.company_id,
        )
        .first()
    )

    if not assessment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assessment not found",
        )

    # Check if hiring rubric exists and is approved on the campaign
    campaign = assessment.candidate.campaign if assessment.candidate else None
    if not campaign or not campaign.evaluation_rubric:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Hiring rubric has not been generated for this campaign yet. Please generate the rubric first.",
        )
    if campaign.rubric_status != "approved":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Hiring rubric has not been approved for this campaign yet. Please approve the rubric first.",
        )

    # Prevent duplicate evaluation
    existing = (
        db.query(Evaluation)
        .filter(Evaluation.assessment_id == assessment.id)
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Evaluation already exists for this assessment.",
        )

    # Generate evaluation
    if assessment.assessment_source == "External":
        ext_assess = (
            db.query(ExternalAssessment)
            .filter(ExternalAssessment.assessment_id == assessment.id)
            .first()
        )
        if not ext_assess:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="External assessment details not found.",
            )
        generated = generate_external_evaluation(assessment, ext_assess)
    else:
        generated = generate_evaluation(assessment)

    # Get rubric version used
    rubric_version = campaign.rubric_version or 0

    # Create database object
    new_evaluation = Evaluation(
        assessment_id=assessment.id,
        technical_rating=generated["technical_rating"],
        problem_solving_rating=generated["problem_solving_rating"],
        communication_rating=generated["communication_rating"],
        strengths=generated["strengths"],
        weaknesses=generated["weaknesses"],
        recommendation=generated["recommendation"],
        reasoning=generated["reasoning"],
        confidence_score=generated["confidence_score"],
        match_percentage=generated.get("match_percentage", 0.0),
        matched_skills=generated.get("matched_skills", []),
        missing_skills=generated.get("missing_skills", []),
        mandatory_requirements_met=generated.get("mandatory_requirements_met", True),
        rubric_version=rubric_version,
        personalized_feedback=generated.get("personalized_feedback"),
        suggested_topics=generated.get("suggested_topics", []),
    )

    return create_evaluation(db, new_evaluation)
def get_all_evaluations(
    db: Session,
    recruiter: Recruiter,
):
    return get_evaluations(db, recruiter.company_id)
def get_single_evaluation(
    db: Session,
    evaluation_id: int,
    recruiter: Recruiter,
):
    evaluation = get_evaluation_by_id(
        db,
        evaluation_id,
        recruiter.company_id,
    )

    if not evaluation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Evaluation not found",
        )

    return evaluation
def update_existing_evaluation(
    db: Session,
    evaluation_id: int,
    evaluation_update: EvaluationUpdate,
    recruiter: Recruiter,
):
    evaluation = get_evaluation_by_id(
        db,
        evaluation_id,
        recruiter.company_id,
    )

    if not evaluation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Evaluation not found",
        )

    for key, value in evaluation_update.model_dump(
        exclude_unset=True
    ).items():
        setattr(evaluation, key, value)

    return update_evaluation(db, evaluation)
def delete_existing_evaluation(
    db: Session,
    evaluation_id: int,
    recruiter: Recruiter,
):
    evaluation = get_evaluation_by_id(
        db,
        evaluation_id,
        recruiter.company_id,
    )

    if not evaluation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Evaluation not found",
        )

    delete_evaluation(db, evaluation)