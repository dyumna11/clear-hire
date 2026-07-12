# Product Requirements Document (PRD)

# ClearHire

### AI-Powered Hiring Transparency Platform

**Version:** 1.0
**Status:** MVP

---

# 1. Vision

ClearHire is a hiring transparency platform that helps companies communicate hiring decisions more effectively while protecting confidential assessment content.

Instead of candidates receiving a generic rejection email, ClearHire transforms evaluation data into structured, understandable reports that explain the hiring process, evaluation categories, strengths, and improvement areas—without revealing assessment questions, answers, hidden test cases, or proprietary scoring methods.

Our mission is to build trust in technical hiring by making hiring decisions more transparent for candidates and easier to communicate for recruiters.

---

# 2. Problem Statement

Technical hiring has become increasingly opaque.

Candidates spend weeks preparing for online assessments but typically receive only a generic rejection message after evaluation.

As a result, candidates are left wondering:

* What was actually evaluated?
* Which skills mattered the most?
* Which hiring stage did they reach?
* What should they improve before their next application?

Recruiters, on the other hand:

* already possess evaluation data,
* do not want to expose proprietary assessments,
* cannot manually provide feedback to thousands of candidates,
* still want to provide a positive candidate experience.

There is currently no standardized transparency layer between assessment platforms and candidates.

---

# 3. Solution

ClearHire acts as a transparency layer that sits after the hiring evaluation process.

Recruiters define the evaluation framework used for a hiring campaign.

After candidate evaluations are complete, ClearHire automatically generates structured transparency reports that explain:

* Hiring stages
* Evaluation categories
* Candidate strengths
* Growth areas
* AI-generated improvement suggestions

without exposing confidential hiring information.

---

# 4. Target Users

## Primary Users

### Recruiters

* Talent Acquisition Teams
* Campus Hiring Teams
* HR Managers

### Candidates

* Engineering Students
* Internship Applicants
* Software Engineers

---

# 5. Product Goals

### Candidate Goals

* Understand hiring decisions.
* Learn what skills were evaluated.
* Receive actionable improvement guidance.
* Build trust in the hiring process.

### Recruiter Goals

* Improve candidate experience.
* Automate communication.
* Reduce repetitive feedback requests.
* Maintain assessment confidentiality.

---

# 6. Core Features (MVP)

## Recruiter Portal

### Authentication

Recruiters can register and log in securely.

---

### Company Management

Recruiters can:

* Create company profile
* Manage company information

---

### Hiring Campaign

Recruiters can create hiring campaigns including:

* Role
* Description
* Hiring timeline

---

### Evaluation Rubric Builder

Recruiters define:

* Evaluation categories
* Importance level
* Candidate visibility

Example:

Coding Accuracy — High

Runtime Efficiency — Medium

CS Fundamentals — High

Resume Match — Medium

Integrity Checks — Mandatory

---

### Candidate Import

Recruiters upload candidate evaluation data through:

* CSV
* Excel

Future versions may support integrations with assessment platforms.

---

### AI Report Generation

ClearHire converts evaluation data into structured transparency reports for every candidate.

---

### Recruiter Dashboard

Displays:

* Active campaigns
* Candidate statistics
* Hiring funnel
* Report generation status

---

# Candidate Portal

## Authentication

Candidate login

---

## Dashboard

Displays:

* Applications
* Reports
* Company Insights
* Profile

---

## Transparency Report

Each report includes:

Application Status

Hiring Timeline

Evaluation Categories

Strengths

Growth Areas

AI Explanation

Recommended Learning

---

## Company Insights

Displays AI-generated insights based on publicly available information.

Examples:

Likely hiring stages

Frequently discussed topics

Role expectations

These insights are clearly marked as community-generated or AI-estimated unless officially provided by the company.

---

# 7. Future Features

* ATS integrations
* Assessment platform integrations
* Email reports
* Learning roadmap
* Resume-job fit analysis
* Recruiter analytics
* Transparency certification
* Community interview experiences
* AI hiring assistant

---

# 8. User Flow

## Recruiter

Login

↓

Create Company

↓

Create Hiring Campaign

↓

Define Evaluation Rubric

↓

Upload Candidate Results

↓

Generate Reports

↓

Publish Reports

---

## Candidate

Login

↓

Dashboard

↓

Applications

↓

Transparency Report

↓

Learning Recommendations

---

# 9. Pages

## Public

Landing Page

About

Login

Signup

---

## Candidate

Dashboard

Applications

Transparency Report

Company Insights

Profile

---

## Recruiter

Dashboard

Campaigns

Create Campaign

Candidates

Reports

Analytics

Settings

---

# 10. Technology Stack

Frontend

* React
* TypeScript
* Tailwind CSS
* shadcn/ui

Backend

* FastAPI
* SQLAlchemy

Database

* PostgreSQL

Authentication

* Clerk or Firebase

AI

* Gemini API

Deployment

* Vercel
* Railway
* Neon PostgreSQL

---

# 11. Design Principles

The product should feel like a modern SaaS application.

Design inspiration:

* Linear
* Stripe
* Vercel
* Notion

Characteristics:

* Minimal
* Premium
* Professional
* Clean
* Accessible
* Responsive

---

# 12. MVP Success Criteria

The MVP is successful when:

A recruiter can:

* Create a hiring campaign.
* Define evaluation criteria.
* Upload candidate evaluations.
* Generate AI-powered transparency reports.

A candidate can:

* Log in.
* View application status.
* View transparency report.
* Receive AI-generated improvement suggestions.

---

# 13. Long-Term Vision

ClearHire aims to become the transparency layer for technical hiring.

Before an assessment, candidates gain AI-powered insights into the hiring process.

After an assessment, partnered companies provide official transparency reports that explain evaluation outcomes without exposing confidential assessment content.

By combining recruiter-configurable transparency with AI-driven candidate guidance, ClearHire seeks to make hiring more understandable, trustworthy, and candidate-friendly while preserving assessment security.
