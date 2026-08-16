import sys
import os
import requests
import secrets
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.config import settings
from app.models.company import Company
from app.models.recruiter import Recruiter
from app.models.campaign import Campaign
from app.models.candidate import Candidate
from app.core.security import hash_password

def run_integration_tests():
    # 1. Setup db session to seed recruiter and campaign
    engine = create_engine(settings.DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()

    suffix = secrets.token_hex(4)
    email = f"test_recruiter_{suffix}@example.com"
    password = "password123"

    print("--- 1. Seeding database for integration tests ---")
    try:
        # Create company
        company = Company(name=f"Integration Corp {suffix}", industry="Tech")
        db.add(company)
        db.flush()

        # Create recruiter
        recruiter = Recruiter(
            company_id=company.id,
            name="Integration Recruiter",
            email=email,
            password_hash=hash_password(password),
            role="recruiter"
        )
        db.add(recruiter)
        db.flush()

        # Create campaign with a basic rubric
        campaign = Campaign(
            company_id=company.id,
            title="Software Architect Campaign",
            department="Engineering",
            assessment_source="HackerRank",
            status="Active",
            evaluation_rubric={
                "weights": {"technical": 40, "problem_solving": 30, "communication": 15, "projects": 15},
                "minimum_scores": {"coding": 60, "overall": 70},
                "mandatory_skills": ["Algorithms", "SQL"],
                "preferred_skills": ["System Design"],
                "evaluation_guidelines": "Evaluate technical and algorithmic logic."
            },
            rubric_status="approved",
            rubric_version=1,
            job_description="Architect systems, write optimized graph traversal and SQL code."
        )
        db.add(campaign)
        db.flush()

        # Create Candidate
        candidate = Candidate(
            campaign_id=campaign.id,
            name="Alex Sharma",
            email=f"alex_{suffix}@sharma.com",
            status="Pending"
        )
        db.add(candidate)
        db.commit()
        print(f"Seeded candidate ID: {candidate.id}, Campaign ID: {campaign.id}")
    except Exception as e:
        db.rollback()
        print(f"Seed failed: {e}")
        sys.exit(1)
    finally:
        db.close()

    # 2. Call local running FastAPI server
    base_url = "http://127.0.0.1:8000"
    print("\n--- 2. Authenticating recruiter ---")
    try:
        login_resp = requests.post(f"{base_url}/auth/login", data={"username": email, "password": password})
        login_resp.raise_for_status()
        token = login_resp.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}
        print("Authenticated successfully!")
    except Exception as e:
        print(f"Failed to authenticate. Make sure uvicorn is running on port 8000. Error: {e}")
        sys.exit(1)

    print("\n--- 3. Testing POST /api/v1/integrations/assessment (Import) ---")
    payload = {
        "candidate_id": candidate.id,
        "candidate_name": "Alex Sharma",
        "assessment_name": "Software Engineer Assessment",
        "overall_score": 82,
        "questions": [
            {
                "question": "Graph Traversal",
                "skill": "Algorithms",
                "score": 70,
                "time_taken": 420,
                "tests_passed": 8,
                "tests_total": 10
            },
            {
                "question": "SQL Query",
                "skill": "SQL",
                "score": 95,
                "time_taken": 180,
                "tests_passed": 10,
                "tests_total": 10
            }
        ]
    }
    
    import_resp = requests.post(f"{base_url}/integrations/assessment", json=payload, headers=headers)
    import_resp.raise_for_status()
    assess_data = import_resp.json()
    assessment_id = assess_data["id"]
    print(f"Imported successfully! Assessment ID: {assessment_id}")

    print("\n--- 4. Testing GET /api/v1/integrations/assessment/{id} (Retrieve) ---")
    get_resp = requests.get(f"{base_url}/integrations/assessment/{assessment_id}", headers=headers)
    get_resp.raise_for_status()
    ext_assess = get_resp.json()
    print(f"Retrieved External Assessment for candidate: {ext_assess['candidate_name']}")
    print(f"Questions imported: {len(ext_assess['questions'])}")

    print("\n--- 5. Testing POST /api/v1/integrations/assessment/{id}/generate-questions (AI interview questions) ---")
    q_resp = requests.post(f"{base_url}/integrations/assessment/{assessment_id}/generate-questions", headers=headers)
    q_resp.raise_for_status()
    questions_data = q_resp.json()
    print("Generated AI Interview Questions:")
    for idx, q in enumerate(questions_data["interview_questions"]):
        print(f"  {idx+1}. [{q['question_type']}] Q: {q['question_text']}")
        print(f"     Reason: {q['why_this_question']}")

    print("\n--- 6. Testing POST /api/v1/integrations/assessment/{id}/generate-report (AI recruiter report) ---")
    r_resp = requests.post(f"{base_url}/integrations/assessment/{assessment_id}/generate-report", headers=headers)
    r_resp.raise_for_status()
    report_data = r_resp.json()["evaluation_report"]
    print(f"Recommendation: {report_data['overall_recommendation']}")
    print(f"Technical: {report_data['ratings']['technical_strength']}, Algorithms: {report_data['ratings']['algorithms']}")
    print("Traceable Evidence:")
    for ev in report_data["evidence_points"]:
        print(f"  - Point: {ev['point']}")
        print(f"    Evidence: {ev['evidence']}")

    print("\n--- 7. Testing standard core Evaluation (conditionally routed) ---")
    # Trigger standard evaluation creation to verify routing
    eval_resp = requests.post(f"{base_url}/evaluations/", json={"assessment_id": assessment_id}, headers=headers)
    eval_resp.raise_for_status()
    eval_data = eval_resp.json()
    print(f"Evaluation created: Recommendation = {eval_data['recommendation']}")
    print(f"Technical Score = {eval_data['technical_rating']}/10")
    print(f"Personalized Feedback: {eval_data['personalized_feedback']}")

    print("\nAll integration API tests passed successfully! 🎉")

if __name__ == "__main__":
    run_integration_tests()
