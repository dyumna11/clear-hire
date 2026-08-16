# Walkthrough - HackerRank-Compatible Assessment Evaluation Layer

We have extended the ClearHire MVP into an AI-powered post-assessment evaluation and transparency layer. Recruiters can now import standardized JSON reports from external platforms, inspect question-level scoring, and generate personalized, evidence-backed recruiter reports and interview questions using Gemini.

---

## 1. Implemented Database Schema
- **`ExternalAssessment` Model** (`backend/app/models/external_assessment.py`):
  - Stores candidate name, assessment name, overall score, and question-level metrics (scores, time taken, tests passed/total).
  - Persists the generated AI interview questions and recruiter report.
- **Generic Link**: Connected dynamically to the core `Assessment` model.
- **Alembic Migration**: Auto-generated and successfully applied the database changes (` Detected added table 'external_assessments'`).

---

## 2. API Endpoints (`backend/app/api/v1/endpoints/integrations.py`)
- `POST /api/v1/integrations/assessment`: Webhook-like import API. Finds or creates a candidate and registers the external assessment data.
- `GET /api/v1/integrations/assessment/{assessment_id}`: Retrieves question-level details.
- `POST /api/v1/integrations/assessment/{assessment_id}/generate-questions`: Generates structured technical and debugging interview questions based on performance.
- `POST /api/v1/integrations/assessment/{assessment_id}/generate-report`: Generates structured, evidence-backed evaluation reports.

---

## 3. Structured Gemini Services (`backend/app/services/ai_evaluation_service.py`)
- Added structured Pydantic return schemas: `InterviewQuestionsResult` and `RecruiterReportResult`.
- Conditionally routed standard evaluations to `generate_external_evaluation` if the assessment source is `External`, utilizing question details to construct rich, rubric-aligned candidate feedback.

---

## 4. Frontend Recruiter Dashboard (`frontend/src/components/RecruiterDashboard.tsx`)
- **Interactive Import Tab**: Added an "External Import" tab to the right-hand panel where recruiters can paste JSON, click **"Load Sample HackerRank JSON"** to load test data instantly, and submit.
- **Performance Details**: Renders a table showing each question's title, skill category, score, duration, and exact tests passed/total.
- **Interview Question Generator**: A button that renders custom interview questions with highlighted reasoning.
- **Evidence Recruiter Report**: Renders recommendation level, skill ratings, key strengths, validation areas, and traceable evidence points mapping opinion to numbers.

---

## 5. Verification Results

All tests completed successfully! The integration test script (`test_integrations.py`) verified the entire end-to-end flow:
1. **Webhook Import**: Imported the mock JSON for "Alex Sharma" with 82% overall score (Algorithms: 70%, SQL: 95%).
2. **AI Question Generation**: Gemini successfully analyzed the performance and created tailored interview questions:
   - **Debugging Question**: Focuses on why 2/10 tests failed on Graph Traversal.
   - **Technical Question**: Focuses on why graph traversal took 420 seconds.
   - **Skill-Validation Question**: Probes scaling SQL queries for high-concurrency databases because the candidate scored 95% in 180 seconds.
3. **Evidence-Based Report**: Generated strengths, validation areas, and explicitly linked statements to exact metrics (e.g. *"Candidate scored 95% on the SQL Query question, successfully passing 10/10 test cases in 180 seconds"*).
