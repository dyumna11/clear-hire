from app.models.assessment import Assessment


def generate_evaluation(assessment: Assessment):
    overall = assessment.overall_score

    technical_rating = round(
    (
        assessment.coding_score
        + assessment.problem_solving_score
    ) / 20,
    1,
)
    communication_rating = round(
    assessment.communication_score / 10,
    1,
)
    problem_solving_rating = round(
    assessment.problem_solving_score / 10,
    1,
)
    strengths = []
    if assessment.coding_score >= 80:
        strengths.append("Strong coding ability")

    if assessment.problem_solving_score >= 80:
        strengths.append("Excellent analytical thinking")

    if assessment.communication_score >= 80:
        strengths.append("Effective communication")

    
    weaknesses = []
    if assessment.coding_score < 60:
        weaknesses.append("Coding needs improvement")
    if assessment.problem_solving_score < 60:
        weaknesses.append("Problem solving can be improved")
    if assessment.communication_score < 60:
        weaknesses.append("Communication skills need improvement")

    if overall >= 85:
        recommendation = "Proceed"
    elif overall >= 70:
        recommendation = "Hold"
    else:
        recommendation = "Reject"

    confidence_score = min(99, overall + 5)
    reasoning = (
    f"The candidate achieved an overall score of {overall}. "
    f"The recommendation is '{recommendation}' based on "
    f"technical performance and communication."
)
    return {
    "technical_rating": technical_rating,
    "problem_solving_rating": problem_solving_rating,
    "communication_rating": communication_rating,
    "strengths": ", ".join(strengths),
    "weaknesses": ", ".join(weaknesses),
    "recommendation": recommendation,
    "reasoning": reasoning,
    "confidence_score": confidence_score,
}