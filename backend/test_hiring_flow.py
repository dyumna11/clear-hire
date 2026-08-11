import sys
import os
import subprocess
import time
import requests
import secrets
from datetime import datetime, timedelta, timezone

# Add current directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings
from app.models.company import Company
from app.models.recruiter import Recruiter
from app.models.candidate_access_token import CandidateAccessToken
from app.core.security import hash_password

def run_tests():
    # Setup db connection to seed initial companies and recruiters
    engine = create_engine(settings.DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()

    # Generate unique recruiter details
    suffix = secrets.token_hex(4)
    recruiter_a_email = f"recruiter_a_{suffix}@example.com"
    recruiter_b_email = f"recruiter_b_{suffix}@example.com"
    password = "securepassword123"

    print("--- STEP 1: Seeding Test Companies and Recruiters ---")
    try:
        # Create Company A and Recruiter A
        company_a = Company(name=f"Company A {suffix}", industry="Technology")
        db.add(company_a)
        db.flush()  # get company_a.id
        
        rec_a = Recruiter(
            company_id=company_a.id,
            name="Recruiter A",
            email=recruiter_a_email,
            password_hash=hash_password(password),
            role="recruiter"
        )
        db.add(rec_a)

        # Create Company B and Recruiter B (for unauthorized test case)
        company_b = Company(name=f"Company B {suffix}", industry="Finance")
        db.add(company_b)
        db.flush()

        rec_b = Recruiter(
            company_id=company_b.id,
            name="Recruiter B",
            email=recruiter_b_email,
            password_hash=hash_password(password),
            role="recruiter"
        )
        db.add(rec_b)
        db.commit()
        print(f"Created Recruiter A ({recruiter_a_email}) and Recruiter B ({recruiter_b_email})")
    except Exception as e:
        db.rollback()
        print(f"Seeding failed: {e}")
        sys.exit(1)
    finally:
        db.close()

    print("--- STEP 2: Launching Uvicorn Server ---")
    port = "8081"
    server_process = subprocess.Popen(
        ["./venv/bin/uvicorn", "app.main:app", "--port", port, "--host", "127.0.0.1"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )
    
    # Wait for server to start
    time.sleep(3.0)
    base_url = f"http://127.0.0.1:{port}"

    try:
        # Verify health check
        health_resp = requests.get(f"{base_url}/health")
        health_resp.raise_for_status()
        print("Server is healthy!")

        print("\n--- STEP 3: Authenticating Recruiters ---")
        # Log in Recruiter A
        resp = requests.post(f"{base_url}/auth/login", data={"username": recruiter_a_email, "password": password})
        resp.raise_for_status()
        token_a = resp.json()["access_token"]
        headers_a = {"Authorization": f"Bearer {token_a}"}

        # Log in Recruiter B
        resp = requests.post(f"{base_url}/auth/login", data={"username": recruiter_b_email, "password": password})
        resp.raise_for_status()
        token_b = resp.json()["access_token"]
        headers_b = {"Authorization": f"Bearer {token_b}"}
        print("Recruiters authenticated successfully!")

        print("\n--- STEP 4: Creating Campaign (JD Only) ---")
        campaign_payload = {
            "title": "Backend Python Developer",
            "department": "Engineering",
            "assessment_source": "ClearHire Coding Assessment",
            "job_description": "We are looking for a backend developer. Mandatory skills: Python, DSA, OOP, SQL. Preferred: FastAPI, React.",
            "hiring_notes": "Recruiter notes: Focus on clean code and core database concepts.",
            "evaluation_parameters": None
        }
        resp = requests.post(f"{base_url}/campaigns/", json=campaign_payload, headers=headers_a)
        resp.raise_for_status()
        campaign = resp.json()
        campaign_id = campaign["id"]
        print(f"Campaign created with ID: {campaign_id}")
        assert campaign["rubric_status"] == "draft"
        assert campaign["rubric_version"] == 0

        print("\n--- STEP 5: Creating Candidate and Assessment ---")
        candidate_payload = {
            "campaign_id": campaign_id,
            "name": "Jane Doe",
            "email": f"janedoe_{suffix}@example.com",
            "resume_url": "http://example.com/resume.pdf"
        }
        resp = requests.post(f"{base_url}/candidates/", json=candidate_payload, headers=headers_a)
        resp.raise_for_status()
        candidate = resp.json()
        candidate_id = candidate["id"]
        print(f"Candidate created with ID: {candidate_id}")

        assessment_payload = {
            "candidate_id": candidate_id,
            "assessment_round": "Technical Round 1",
            "assessment_source": "ClearHire Coding Assessment",
            "status": "Completed",
            "coding_score": 85,
            "mcq_score": 80,
            "problem_solving_score": 90,
            "communication_score": 75,
            "duration_minutes": 45
        }
        resp = requests.post(f"{base_url}/assessments/", json=assessment_payload, headers=headers_a)
        resp.raise_for_status()
        assessment = resp.json()
        assessment_id = assessment["id"]
        print(f"Assessment created with ID: {assessment_id}")

        print("\n--- STEP 6: Negative Case - Evaluation Attempted Before Rubric Approval ---")
        eval_payload = {"assessment_id": assessment_id}
        resp = requests.post(f"{base_url}/evaluations/", json=eval_payload, headers=headers_a)
        print(f"Evaluation pre-approval response status: {resp.status_code}")
        assert resp.status_code == 400
        assert "rubric" in resp.json()["detail"].lower()
        print("Negative case passed: Evaluation was successfully blocked because rubric is not approved.")

        print("\n--- STEP 7: Generating Suggested Rubric (Option A: JD Only) ---")
        resp = requests.post(f"{base_url}/campaigns/{campaign_id}/generate-rubric", headers=headers_a)
        resp.raise_for_status()
        campaign = resp.json()
        rubric = campaign["evaluation_rubric"]
        print("AI Rubric generated successfully!")
        print("Generated weights:", rubric["weights"])
        print("Generated minimum scores:", rubric["minimum_scores"])
        print("Generated mandatory skills:", rubric["mandatory_skills"])
        print("Generated preferred skills:", rubric["preferred_skills"])

        print("\n--- STEP 8: Reviewing and Editing Rubric ---")
        edited_rubric = rubric.copy()
        # Make a visible edit
        edited_rubric["weights"]["technical"] = 50
        edited_rubric["weights"]["problem_solving"] = 25
        edited_rubric["weights"]["communication"] = 15
        edited_rubric["weights"]["projects"] = 10
        edited_rubric["mandatory_skills"].append("Git")
        
        # Send update
        resp = requests.put(f"{base_url}/campaigns/{campaign_id}/rubric", json=edited_rubric, headers=headers_a)
        resp.raise_for_status()
        campaign = resp.json()
        print("Rubric edited successfully. Verification of draft status:")
        assert campaign["rubric_status"] == "draft"
        assert campaign["rubric_version"] == 0
        assert campaign["evaluation_rubric"]["weights"]["technical"] == 50
        assert "Git" in campaign["evaluation_rubric"]["mandatory_skills"]
        print("Rubric version and draft status verified.")

        print("\n--- STEP 9: Negative Case - Unauthorized Recruiter Approving Rubric ---")
        resp = requests.post(f"{base_url}/campaigns/{campaign_id}/rubric/approve", headers=headers_b)
        print(f"Recruiter B approval response status: {resp.status_code}")
        assert resp.status_code == 404
        print("Negative case passed: Recruiter B is blocked from approving Recruiter A's rubric.")

        print("\n--- STEP 10: Approving Rubric ---")
        resp = requests.post(f"{base_url}/campaigns/{campaign_id}/rubric/approve", headers=headers_a)
        resp.raise_for_status()
        campaign = resp.json()
        print("Rubric approved successfully!")
        assert campaign["rubric_status"] == "approved"
        assert campaign["rubric_version"] == 1
        assert campaign["rubric_approved_at"] is not None

        print("\n--- STEP 11: Generating Evaluation with Approved Rubric ---")
        resp = requests.post(f"{base_url}/evaluations/", json=eval_payload, headers=headers_a)
        resp.raise_for_status()
        evaluation = resp.json()
        eval_id = evaluation["id"]
        print(f"Evaluation generated successfully with ID: {eval_id}")
        assert evaluation["rubric_version"] == 1
        assert evaluation["personalized_feedback"] is not None
        assert len(evaluation["suggested_topics"]) > 0

        print("\n--- STEP 12: Recruiter Accessing Detailed Evaluation ---")
        resp = requests.get(f"{base_url}/evaluations/{eval_id}", headers=headers_a)
        resp.raise_for_status()
        recruiter_view = resp.json()
        print("Recruiter detailed view verified:")
        print(f"Recommendation: {recruiter_view['recommendation']}")
        print(f"Confidence score: {recruiter_view['confidence_score']}%")
        print(f"Match percentage: {recruiter_view['match_percentage']}%")
        print(f"Detailed reasoning: {recruiter_view['reasoning'][:120]}...")

        print("\n--- STEP 13: Generating Secure Candidate Feedback Access Token ---")
        resp = requests.post(f"{base_url}/assessments/{assessment_id}/feedback-token", headers=headers_a)
        resp.raise_for_status()
        token_data = resp.json()
        candidate_token = token_data["token"]
        print(f"Plaintext token generated (length {len(candidate_token)})")
        
        # Verify database does not contain plaintext token
        db = SessionLocal()
        tokens_in_db = db.query(CandidateAccessToken).filter(CandidateAccessToken.assessment_id == assessment_id).all()
        for t in tokens_in_db:
            assert candidate_token not in t.token_hash
        db.close()
        print("Verified: Plaintext token is not stored in the database (only hashes exist).")

        print("\n--- STEP 14: Candidate Accessing Feedback Endpoint ---")
        resp = requests.get(f"{base_url}/candidate/assessments/{assessment_id}/feedback?token={candidate_token}")
        resp.raise_for_status()
        candidate_view = resp.json()
        print("Candidate feedback response verified:")
        print(f"Overall Score: {candidate_view['overall_score']}")
        print(f"Score Breakdown: {candidate_view['score_breakdown']}")
        print(f"Personalized Feedback: {candidate_view['personalized_feedback']}")
        print(f"Suggested Topics: {candidate_view['suggested_topics']}")
        
        # Security Asserts: Candidate must NOT see recruiter confidential info
        assert "recommendation" not in candidate_view
        assert "confidence_score" not in recruiter_view.get("confidence_score") if "confidence_score" in candidate_view else True
        assert "confidence_score" not in candidate_view
        assert "reasoning" not in candidate_view
        assert "match_percentage" not in candidate_view
        print("Security Verification passed: Recruiter-only columns are absent in candidate view.")

        print("\n--- STEP 15: Token Invalidation / Revoking on Re-Generation ---")
        resp = requests.post(f"{base_url}/assessments/{assessment_id}/feedback-token", headers=headers_a)
        resp.raise_for_status()
        new_token_data = resp.json()
        new_candidate_token = new_token_data["token"]
        print("New token generated. Verifying old token is invalid:")
        
        # Old token should be invalid/unauthorized
        resp = requests.get(f"{base_url}/candidate/assessments/{assessment_id}/feedback?token={candidate_token}")
        assert resp.status_code == 401
        
        # New token should be valid
        resp = requests.get(f"{base_url}/candidate/assessments/{assessment_id}/feedback?token={new_candidate_token}")
        assert resp.status_code == 200
        print("Token invalidation verified successfully.")

        print("\n--- STEP 16: Negative Case - Access with Invalid or Expired Token ---")
        # Invalid token
        resp = requests.get(f"{base_url}/candidate/assessments/{assessment_id}/feedback?token=invalid_token")
        assert resp.status_code == 401
        
        # Expired token (simulate by updating expires_at to past)
        db = SessionLocal()
        tok = db.query(CandidateAccessToken).filter(CandidateAccessToken.assessment_id == assessment_id).first()
        tok.expires_at = datetime.now(timezone.utc) - timedelta(hours=1)
        db.commit()
        db.close()
        
        resp = requests.get(f"{base_url}/candidate/assessments/{assessment_id}/feedback?token={new_candidate_token}")
        assert resp.status_code == 401
        print("Negative cases passed: Invalid and Expired tokens return 401.")

        print("\n--- STEP 17: Negative Case - Candidate Accessing Another Candidate's Assessment ---")
        # Let's create another candidate and assessment in campaign A
        resp = requests.post(f"{base_url}/candidates/", json={
            "campaign_id": campaign_id,
            "name": "John Smith",
            "email": f"johnsmith_{suffix}@example.com"
        }, headers=headers_a)
        resp.raise_for_status()
        cand2 = resp.json()
        
        resp = requests.post(f"{base_url}/assessments/", json={
            "candidate_id": cand2["id"],
            "assessment_round": "Technical Round 1",
            "assessment_source": "ClearHire Coding Assessment",
            "coding_score": 70,
            "overall_score": 72
        }, headers=headers_a)
        resp.raise_for_status()
        assess2 = resp.json()
        
        # Create token for Assessment 2
        resp = requests.post(f"{base_url}/assessments/{assess2['id']}/feedback-token", headers=headers_a)
        resp.raise_for_status()
        token_cand2 = resp.json()["token"]
        
        # Try to access Assessment 1 with token for Assessment 2
        resp = requests.get(f"{base_url}/candidate/assessments/{assessment_id}/feedback?token={token_cand2}")
        print(f"Cross-candidate feedback response status: {resp.status_code}")
        assert resp.status_code == 403 or resp.status_code == 401
        print("Negative case passed: Cross-candidate assessment access is strictly blocked.")

        print("\n--- STEP 18: Verifying Rubric Version 2 Evaluations ---")
        # Generate new draft rubric
        resp = requests.post(f"{base_url}/campaigns/{campaign_id}/generate-rubric", headers=headers_a)
        resp.raise_for_status()
        # Approve version 2
        resp = requests.post(f"{base_url}/campaigns/{campaign_id}/rubric/approve", headers=headers_a)
        resp.raise_for_status()
        campaign = resp.json()
        assert campaign["rubric_version"] == 2
        
        # Generate evaluation for Assessment 2
        resp = requests.post(f"{base_url}/evaluations/", json={"assessment_id": assess2["id"]}, headers=headers_a)
        resp.raise_for_status()
        eval2 = resp.json()
        
        # Check version of Assessment 2 evaluation (should be 2)
        assert eval2["rubric_version"] == 2
        # Check version of Assessment 1 evaluation (should still be 1)
        resp = requests.get(f"{base_url}/evaluations/{eval_id}", headers=headers_a)
        resp.raise_for_status()
        eval1 = resp.json()
        assert eval1["rubric_version"] == 1
        print("Rubric versioning verified: Assessment 1 retains version 1 while Assessment 2 uses version 2.")

        print("\n=== ALL TEST CASES PASSED SUCCESSFULLY! ===")

    finally:
        # Terminate server process
        server_process.terminate()
        server_process.wait()

if __name__ == "__main__":
    run_tests()
