from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.recruiter import Recruiter
from app.models.candidate import Candidate
from app.models.assessment import Assessment
from app.models.external_assessment import ExternalAssessment
from app.schemas.external_assessment import (
    ExternalAssessmentImport,
    ExternalAssessmentResponse,
)
from app.schemas.assessment import AssessmentResponse
from app.services.auth_service import get_current_recruiter
from app.services.ai_evaluation_service import (
    generate_interview_questions,
    generate_recruiter_report,
)

router = APIRouter(prefix="/integrations", tags=["Integrations"])


@router.post("/assessment", response_model=AssessmentResponse)
def import_assessment(
    import_data: ExternalAssessmentImport,
    db: Session = Depends(get_db),
    recruiter: Recruiter = Depends(get_current_recruiter),
):
    # Resolve candidate: either by candidate_id or by campaign_id + email
    if import_data.candidate_id:
        candidate = (
            db.query(Candidate)
            .filter(Candidate.id == import_data.candidate_id)
            .first()
        )
    elif import_data.campaign_id and import_data.candidate_email:
        candidate = (
            db.query(Candidate)
            .filter(
                Candidate.campaign_id == import_data.campaign_id,
                Candidate.email == import_data.candidate_email,
            )
            .first()
        )
        if not candidate:
            candidate = Candidate(
                campaign_id=import_data.campaign_id,
                name=import_data.candidate_name,
                email=import_data.candidate_email,
                status="Pending",
            )
            db.add(candidate)
            db.commit()
            db.refresh(candidate)
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Must provide either candidate_id or campaign_id and candidate_email",
        )

    if not candidate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Candidate not found",
        )

    candidate_id = candidate.id

    # Check for duplicate external assessment for this candidate and round name
    existing = (
        db.query(Assessment)
        .filter(
            Assessment.candidate_id == candidate_id,
            Assessment.assessment_round == import_data.assessment_name,
        )
        .first()
    )
    if existing:
        if existing.evaluation:
            db.delete(existing.evaluation)
        if existing.external_assessment:
            db.delete(existing.external_assessment)
        db.delete(existing)
        db.commit()

    # Extract score averages by simple category mapping to fit generic rubric
    coding_skills = ["coding", "algorithms", "data structures", "graphs", "trees"]
    sql_skills = ["sql", "database", "databases"]

    coding_scores = [q.score for q in import_data.questions if q.skill.lower() in coding_skills]
    problem_solving_scores = [q.score for q in import_data.questions if q.skill.lower() not in coding_skills and q.skill.lower() not in sql_skills]
    sql_scores = [q.score for q in import_data.questions if q.skill.lower() in sql_skills]

    coding_avg = int(sum(coding_scores)/len(coding_scores)) if coding_scores else import_data.overall_score
    problem_solving_avg = int(sum(problem_solving_scores)/len(problem_solving_scores)) if problem_solving_scores else import_data.overall_score
    mcq_avg = int(sum(sql_scores)/len(sql_scores)) if sql_scores else import_data.overall_score
    comm_avg = 80  # Default communication score fallback for automated import

    assessment = Assessment(
        candidate_id=candidate_id,
        assessment_round=import_data.assessment_name,
        assessment_source="External",
        status="Completed",
        coding_score=coding_avg,
        mcq_score=mcq_avg,
        problem_solving_score=problem_solving_avg,
        communication_score=comm_avg,
        overall_score=import_data.overall_score,
        duration_minutes=int(sum(q.time_taken for q in import_data.questions) / 60) or 45,
    )
    db.add(assessment)
    db.commit()
    db.refresh(assessment)

    # Insert detailed external assessment record
    questions_dump = [
        {
            "question": q.question,
            "skill": q.skill,
            "score": q.score,
            "time_taken": q.time_taken,
            "tests_passed": q.tests_passed,
            "tests_total": q.tests_total,
        }
        for q in import_data.questions
    ]

    ext_assessment = ExternalAssessment(
        assessment_id=assessment.id,
        candidate_name=import_data.candidate_name,
        assessment_name=import_data.assessment_name,
        overall_score=import_data.overall_score,
        questions=questions_dump,
    )
    db.add(ext_assessment)
    db.commit()
    db.refresh(ext_assessment)

    return assessment


@router.get("/assessment/{assessment_id}", response_model=ExternalAssessmentResponse)
def get_external_assessment(
    assessment_id: int,
    db: Session = Depends(get_db),
    recruiter: Recruiter = Depends(get_current_recruiter),
):
    ext_assess = (
        db.query(ExternalAssessment)
        .filter(ExternalAssessment.assessment_id == assessment_id)
        .first()
    )
    if not ext_assess:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="External assessment details not found for this assessment",
        )
    return ext_assess


@router.post("/assessment/{assessment_id}/generate-questions", response_model=ExternalAssessmentResponse)
def generate_questions_api(
    assessment_id: int,
    db: Session = Depends(get_db),
    recruiter: Recruiter = Depends(get_current_recruiter),
):
    ext_assess = (
        db.query(ExternalAssessment)
        .filter(ExternalAssessment.assessment_id == assessment_id)
        .first()
    )
    if not ext_assess:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="External assessment not found",
        )

    assessment = db.query(Assessment).filter(Assessment.id == assessment_id).first()
    if not assessment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assessment not found",
        )

    # Call Gemini evaluation
    res = generate_interview_questions(assessment, ext_assess)
    
    # Save generated interview questions
    ext_assess.interview_questions = res["questions"]
    db.commit()
    db.refresh(ext_assess)
    
    return ext_assess


@router.post("/assessment/{assessment_id}/generate-report", response_model=ExternalAssessmentResponse)
def generate_report_api(
    assessment_id: int,
    db: Session = Depends(get_db),
    recruiter: Recruiter = Depends(get_current_recruiter),
):
    ext_assess = (
        db.query(ExternalAssessment)
        .filter(ExternalAssessment.assessment_id == assessment_id)
        .first()
    )
    if not ext_assess:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="External assessment not found",
        )

    assessment = db.query(Assessment).filter(Assessment.id == assessment_id).first()
    if not assessment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assessment not found",
        )

    # Call Gemini evaluation
    res = generate_recruiter_report(assessment, ext_assess)
    
    # Save evaluation report
    ext_assess.evaluation_report = res
    db.commit()
    db.refresh(ext_assess)
    
    return ext_assess
