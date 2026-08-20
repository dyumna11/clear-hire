# ClearHire

## AI-Powered Hiring Transparency Platform

**ClearHire** is a full-stack hiring transparency platform designed to make assessment-based hiring more structured, explainable, and candidate-friendly.

It creates a structured bridge between **job requirements, candidate assessments, recruiter evaluation, and candidate feedback**.

Instead of treating an assessment score as a black box, ClearHire allows recruiters to define role-specific evaluation criteria, evaluate candidates against those criteria, and provide candidates with meaningful feedback while keeping confidential recruiter decisions private.

---

## 🚀 Live Demo

### [Try ClearHire →](https://clear-hire-pied.vercel.app/)

You can either:

- **Try the demo** with sample assessment data
- Create a recruiter account and explore the platform

### GitHub

[github.com/dyumna11/clear-hire](https://github.com/dyumna11/clear-hire)

---

## 💡 The Problem

Assessment-based hiring can create a disconnect between recruiters and candidates.

Candidates may receive an assessment score or hiring outcome without understanding:

- What skills were evaluated
- How their performance mapped to the role
- Where they performed well
- Where they can improve

At the same time, recruiters need to protect:

- Internal evaluation criteria
- Hiring decisions
- Recruiter notes
- Sensitive assessment information

This creates a **transparency vs. confidentiality** problem.

---

## 💡 The ClearHire Approach

ClearHire introduces a structured evaluation layer between assessments and hiring decisions.

```text
Job Description + Recruiter Requirements
                    ↓
        Role-Specific Evaluation Rubric
                    ↓
            Candidate Assessment
                    ↓
       Evaluation Against Criteria
                    ↓
        Match Score + Recommendations
                    ↓
        Personalized Candidate Feedback
```

Recruiters receive detailed evaluation insights while candidates receive meaningful feedback without gaining access to confidential recruiter-only information.

---

## ✨ Key Features

### Recruiter Workflow

- Create hiring campaigns from job requirements
- Define hiring criteria and evaluation parameters
- Generate and approve role-specific evaluation rubrics
- Evaluate candidate assessment performance
- View match scores and hiring recommendations
- Manage candidates and assessments

### Candidate Experience

- Secure candidate-specific feedback links
- Personalized performance feedback
- Candidate-facing evaluation insights
- No recruiter account required to access feedback
- Recruiter-only decisions remain confidential

### Security

- JWT-based recruiter authentication
- Company-level authorization
- Assessment-bound secure tokens
- SHA-256 token hashing
- Separation of recruiter-only and candidate-facing information

---

## 🤖 AI-Powered Evaluation

ClearHire integrates AI into the hiring workflow to help transform unstructured hiring requirements into structured evaluation insights.

The platform can work with:

- Job descriptions
- Recruiter-defined requirements
- Evaluation criteria
- Assessment performance
- Candidate information

The AI layer supports structured hiring workflows while maintaining separation between recruiter and candidate experiences.

### AI Technology

- Gemini API
- AI-assisted evaluation
- Structured evaluation generation
- Personalized feedback generation

---

## 🏗️ System Architecture

```text
                         ClearHire
                            │
             ┌──────────────┴──────────────┐
             │                             │
       Recruiter Portal              Candidate Portal
             │                             │
             └──────────────┬──────────────┘
                            │
                       FastAPI API
                            │
             ┌──────────────┼──────────────┐
             │              │              │
             ↓              ↓              ↓
        PostgreSQL       Gemini API     Auth Layer
             │
             ↓
      Application Data
```

### Production Architecture

```text
                    Internet
                       │
                       ↓
              ┌─────────────────┐
              │     Vercel      │
              │ React Frontend  │
              └────────┬────────┘
                       │
                       ↓
              ┌─────────────────┐
              │     Render      │
              │ FastAPI Backend │
              └────────┬────────┘
                       │
                       ↓
              ┌─────────────────┐
              │ Render Postgres │
              └─────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

- React.js
- TypeScript
- Vite

### Backend

- Python
- FastAPI
- SQLAlchemy
- Alembic
- REST APIs

### Database

- PostgreSQL

### AI

- Google Gemini API

### Authentication & Security

- JWT
- SHA-256
- Company-level authorization
- Secure assessment tokens

### Deployment

- Vercel — Frontend
- Render — Backend
- Render PostgreSQL — Database

### Developer Tools

- Git
- GitHub
- VS Code
- Linux / macOS

---

## 🔄 Complete Product Workflow

### 1. Recruiter Registration

A recruiter can create an account and associate it with a company.

```text
Recruiter
   ↓
Sign Up
   ↓
Company
   ↓
Recruiter Account
```

### 2. Create Hiring Campaign

The recruiter creates a campaign using the job requirements.

```text
Job Description
       +
Hiring Requirements
       ↓
Campaign
```

### 3. Generate Evaluation Rubric

ClearHire structures hiring requirements into a role-specific rubric.

```text
Campaign
   ↓
Evaluation Criteria
   ↓
Weights + Thresholds
   ↓
Versioned Rubric
```

The recruiter can review and approve the generated rubric.

### 4. Add Candidate

Candidates can be associated with the campaign and assessment.

### 5. Evaluate Assessment

Candidate performance is evaluated against the approved hiring criteria.

```text
Candidate Assessment
        ↓
Evaluation Rubric
        ↓
Criteria Mapping
        ↓
Match Score
        ↓
Recommendation
```

### 6. Recruiter Insights

Recruiters receive structured information to help understand candidate performance.

### 7. Candidate Feedback

ClearHire generates a secure candidate-facing feedback experience.

Candidates receive:

- Personalized feedback
- Performance insights
- Areas for improvement

Recruiter-only information remains protected.

---

## 🔐 Security Model

ClearHire separates recruiter-facing and candidate-facing data.

```text
                    ClearHire
                       │
          ┌────────────┴────────────┐
          │                         │
      Recruiter                 Candidate
          │                         │
       JWT Auth              Secure Token
          │                         │
          ↓                         ↓
   Recruiter Portal         Candidate Portal
          │                         │
          ↓                         ↓
 Internal Evaluation        Candidate Feedback
 Internal Decisions         Personalized Insights
```

### Recruiter Authentication

Recruiter access uses:

- JWT authentication
- Protected API routes
- Company-level authorization
- Authenticated sessions

### Candidate Access

Candidate feedback uses:

- Assessment-specific secure tokens
- SHA-256 token hashing
- Assessment-bound authorization

---

## 📊 Evaluation Model

ClearHire uses structured criteria rather than treating an assessment score as the only signal.

```text
Candidate Performance
        ↓
 ┌─────────────────────┐
 │ Evaluation Rubric   │
 ├─────────────────────┤
 │ Skill Criteria      │
 │ Weights             │
 │ Thresholds          │
 │ Role Requirements   │
 └─────────────────────┘
        ↓
    Match Score
        ↓
   Recommendation
        ↓
 Candidate Feedback
```

This allows evaluation logic to be tied to the actual requirements of the role.

---

## 📂 Project Structure

```text
clear-hire/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── v1/
│   │   │   │   └── endpoints/
│   │   │   └── router.py
│   │   ├── core/
│   │   │   └── config.py
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── services/
│   │   └── main.py
│   │
│   ├── alembic/
│   │   └── versions/
│   ├── alembic.ini
│   ├── requirements.txt
│   └── .python-version
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── vercel.json
│
└── README.md
```

---

## ⚙️ Local Development

### Prerequisites

- Python 3.13+
- Node.js
- npm
- PostgreSQL
- Git

### Clone the Repository

```bash
git clone https://github.com/dyumna11/clear-hire.git
cd clear-hire
```

---

## Backend Setup

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on macOS/Linux:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## Environment Variables

Create:

```text
backend/.env
```

Example:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/clearhire
SECRET_KEY=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

Use your actual local PostgreSQL credentials.

**Never commit `.env` or other secrets to GitHub.**

---

## Database Migration

Run:

```bash
alembic upgrade head
```

Check the current migration:

```bash
alembic current
```

View migration history:

```bash
alembic history
```

---

## Start the Backend

```bash
uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create:

```text
frontend/.env.local
```

Add:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Start the frontend:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🌐 Production Deployment

ClearHire uses separate frontend and backend deployments.

### Frontend — Vercel

The React frontend is deployed on Vercel.

Production environment variable:

```env
VITE_API_URL=https://YOUR-RENDER-BACKEND.onrender.com
```

The API URL is configured through an environment variable so local development can continue using:

```env
VITE_API_URL=http://127.0.0.1:8000
```

without changing the application code.

### Backend — Render

The FastAPI backend is deployed on Render.

Start command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

The backend uses the production PostgreSQL database through:

```env
DATABASE_URL=...
```

### Database — Render PostgreSQL

The production database runs on Render PostgreSQL.

The production `DATABASE_URL` is configured through Render environment variables and is never committed to source control.

---

## 🔄 Environment Configuration

### Local

```text
Frontend
   ↓
VITE_API_URL=http://127.0.0.1:8000
   ↓
Local FastAPI
   ↓
Local PostgreSQL
```

### Production

```text
Vercel
   ↓
VITE_API_URL=https://your-backend.onrender.com
   ↓
Render FastAPI
   ↓
Render PostgreSQL
```

---

## 🧪 Testing Checklist

### Authentication

- [x] Recruiter sign up
- [x] Recruiter login
- [x] JWT authentication
- [x] Protected routes
- [x] Recruiter logout

### Campaigns

- [x] Campaign creation
- [x] Campaign retrieval
- [x] Company-level authorization
- [x] Campaign workflow

### Rubrics

- [x] Rubric generation
- [x] Rubric review
- [x] Rubric approval
- [x] Rubric versioning

### Candidate Evaluation

- [x] Candidate creation
- [x] Assessment association
- [x] Evaluation
- [x] Match score generation
- [x] Recommendations

### Candidate Portal

- [x] Secure feedback link
- [x] Token validation
- [x] Candidate feedback
- [x] Recruiter data isolation
- [x] Direct access to candidate feedback routes

### Deployment

- [x] Vercel frontend
- [x] Render backend
- [x] Render PostgreSQL
- [x] CORS configuration
- [x] SPA routing
- [x] Secure candidate links

---

## 🔒 Production Security Considerations

ClearHire is designed around separation between recruiter and candidate data.

Production deployments should ensure:

- Secrets are stored as environment variables
- Database credentials are never committed
- JWT secrets remain server-side
- Candidate tokens are securely generated
- Candidate tokens are stored using SHA-256 hashing
- Recruiter endpoints require authentication
- Company-level authorization is enforced
- Candidate endpoints expose only candidate-facing information
- CORS is restricted to trusted frontend origins

---

## 🚧 Current Prototype Scope

ClearHire is a working prototype demonstrating the complete product workflow.

The assessment data used in the demo is **sample/test data** rather than a live integration with an external assessment provider.

The architecture is designed so that assessment-platform integrations can be added as the product evolves.

---

## 🔮 Future Improvements

### Assessment Platform Integrations

Direct integrations with assessment platforms to retrieve:

- Candidate assessment results
- Skill scores
- Test metadata
- Assessment completion status

### Advanced Candidate Analytics

- Skill-level performance
- Role readiness
- Candidate improvement areas
- Comparative performance

### Recruiter Collaboration

- Multiple recruiters
- Organization-level permissions
- Hiring team collaboration
- Custom recruiter roles

### AI-Powered Insights

- Evaluation explanations
- Candidate improvement recommendations
- Interview preparation
- Hiring trend analysis

---

## 🎯 Product Vision

> **Hiring shouldn't be a black box.**

Candidates deserve to understand how they performed and how they can improve.

Recruiters deserve structured evaluation tools without compromising confidential hiring decisions.

ClearHire aims to create a bridge between the two.

---

## 👩‍💻 Author

### Dyumna Negi

Third-year Electronics and Communication Engineering student at IIIT Jabalpur.

Interested in:

- Software Engineering
- Full-Stack Development
- Machine Learning
- AI-powered products
- Developer tools
- Hiring technology

### Links

- **GitHub:** [https://github.com/dyumna11](https://github.com/dyumna11)
- **LinkedIn:** [https://www.linkedin.com/in/dyumna-negi](https://www.linkedin.com/in/dyumna-negi)
- **Portfolio:** [https://portfolio-eight-ebon-8qluyfcfve.vercel.app/](https://portfolio-eight-ebon-8qluyfcfve.vercel.app/)

---

## ⭐ Try ClearHire

**Live Application:**
[https://clear-hire-pied.vercel.app/](https://clear-hire-pied.vercel.app/)

Feedback and suggestions are welcome.
