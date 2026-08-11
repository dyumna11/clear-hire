from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.assessment import Assessment
from app.models.evaluation import Evaluation
from app.schemas.evaluation import CandidateFeedbackResponse
from app.services.candidate_token_service import verify_feedback_token_service

router = APIRouter(prefix="/candidate", tags=["Candidate Portal"])


@router.get(
    "/assessments/{assessment_id}/feedback",
    response_model=CandidateFeedbackResponse,
)
def get_candidate_feedback(
    assessment_id: int,
    token: str,
    db: Session = Depends(get_db),
):
    # Verify candidate token (valid, not expired, belongs to assessment)
    token_record = verify_feedback_token_service(db, assessment_id, token)

    # Fetch assessment
    assessment = db.query(Assessment).filter(Assessment.id == assessment_id).first()
    if not assessment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assessment not found",
        )

    # Ensure token candidate matches the assessment candidate
    if token_record.candidate_id != assessment.candidate_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Unauthorized candidate feedback access",
        )

    # Fetch evaluation
    evaluation = (
        db.query(Evaluation)
        .filter(Evaluation.assessment_id == assessment_id)
        .first()
    )
    if not evaluation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Feedback is not available yet",
        )

    # Return candidate-safe feedback (omit internal recommendations, notes, guidelines, reasoning)
    return CandidateFeedbackResponse(
        overall_score=assessment.overall_score,
        score_breakdown={
            "coding": assessment.coding_score,
            "problem_solving": assessment.problem_solving_score,
            "mcq": assessment.mcq_score,
            "communication": assessment.communication_score,
        },
        strengths=evaluation.strengths,
        areas_for_improvement=evaluation.weaknesses,
        personalized_feedback=evaluation.personalized_feedback or "No feedback available.",
        suggested_topics=evaluation.suggested_topics or [],
    )
