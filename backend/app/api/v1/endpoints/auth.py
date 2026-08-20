from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.core.database import get_db
from app.models.recruiter import Recruiter
from app.services.auth_service import (
    get_current_recruiter,
    register_recruiter,
    login_recruiter,
)
from app.schemas.auth import (
    RecruiterRegister,
    RecruiterResponse,
    RecruiterLogin,
    Token,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=Token,
)
def register(
    recruiter: RecruiterRegister,
    db: Session = Depends(get_db),
):
    return register_recruiter(
        db,
        recruiter,
    )


@router.post(
    "/demo-login",
    response_model=Token,
)
def demo_login(
    db: Session = Depends(get_db),
):
    from app.models.recruiter import Recruiter
    from app.models.company import Company
    from app.models.campaign import Campaign
    from app.models.candidate import Candidate
    from app.models.assessment import Assessment
    from app.models.evaluation import Evaluation
    from app.core.security import hash_password, create_access_token
    from app.repositories.auth_repository import get_recruiter_by_email

    recruiter = get_recruiter_by_email(db, "dyumna2@example.com")
    if not recruiter:
        # Self-healing seeding of the demo company and recruiter
        company = db.query(Company).filter(Company.name == "OpenAI").first()
        if not company:
            company = Company(
                name="OpenAI",
                industry="Technology",
                website="https://openai.com"
            )
            db.add(company)
            db.commit()
            db.refresh(company)

        recruiter = Recruiter(
            company_id=company.id,
            name="Dyumna Negi",
            email="dyumna2@example.com",
            password_hash=hash_password("password123"),
            role="recruiter"
        )
        db.add(recruiter)
        db.commit()
        db.refresh(recruiter)

        # Create demo campaign
        campaign = Campaign(
            company_id=company.id,
            title="SDE Internship",
            department="Engineering",
            assessment_source="ClearHire Coding Assessment",
            status="Active",
            job_description="We are looking for a Software Development Engineer Intern. Requirements: Python, algorithms, data structures.",
            hiring_notes="Seeded demo campaign.",
            evaluation_rubric={
                "weights": {"technical": 40, "problem_solving": 35, "communication": 15, "projects": 10},
                "minimum_scores": {"coding": 70, "overall": 75},
                "mandatory_skills": ["Python", "Algorithms"],
                "preferred_skills": ["FastAPI"],
                "evaluation_guidelines": "Verify coding ability and communication skills."
            },
            rubric_status="approved",
            rubric_version=1
        )
        db.add(campaign)
        db.commit()
        db.refresh(campaign)

        # Create demo candidate
        candidate = Candidate(
            campaign_id=campaign.id,
            name="Alice Johnson",
            email="alice@example.com",
            status="Completed"
        )
        db.add(candidate)
        db.commit()
        db.refresh(candidate)

        # Create demo assessment
        assessment = Assessment(
            candidate_id=candidate.id,
            assessment_round="Online Assessment",
            assessment_source="ClearHire Coding Assessment",
            status="Completed",
            coding_score=85,
            mcq_score=80,
            problem_solving_score=90,
            communication_score=75,
            overall_score=83,
            duration_minutes=45
        )
        db.add(assessment)
        db.commit()
        db.refresh(assessment)

        # Create demo evaluation
        evaluation = Evaluation(
            assessment_id=assessment.id,
            rubric_version=1,
            technical_rating=8.0,
            problem_solving_rating=9.0,
            communication_rating=7.0,
            strengths="Strong understanding of core DSA concepts, clean code organization, optimal complexity.",
            weaknesses="Minor optimization in recursive state handling.",
            recommendation="Proceed",
            confidence_score=90.0,
            match_percentage=85.0,
            reasoning="Alice demonstrates solid problem solving skills and excellent technical accuracy in DSA.",
            personalized_feedback="You did great on the coding section, resolving all recursive test cases optimally. Focus on optimizing recursive depth.",
            suggested_topics=["Recursion optimization", "FastAPI setup"]
        )
        db.add(evaluation)
        db.commit()
        db.refresh(evaluation)

    token = create_access_token(
        {
            "sub": recruiter.email,
            "id": recruiter.id,
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
    }


@router.post(
    "/login",
    response_model=Token,
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    recruiter = RecruiterLogin(
        email=form_data.username,
        password=form_data.password,
    )

    return login_recruiter(
        db,
        recruiter,
    )



@router.get(
    "/me",
    response_model=RecruiterResponse,
)
def me(
    recruiter: Recruiter = Depends(get_current_recruiter),
):
    return recruiter