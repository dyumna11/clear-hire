import sys
from app.services.ai_evaluation_service import generate_evaluation

# Create a mock assessment class resembling the SQLAlchemy model
class MockAssessment:
    def __init__(self):
        self.coding_score = 85
        self.mcq_score = 90
        self.problem_solving_score = 80
        self.communication_score = 95
        self.overall_score = 88

try:
    print("Testing generate_evaluation service...")
    assessment = MockAssessment()
    result = generate_evaluation(assessment)
    print("\nSUCCESS!")
    print(f"Result type: {type(result)}")
    print("Result content:")
    import pprint
    pprint.pprint(result)
except Exception as e:
    print(f"\nFAILED: {type(e).__name__}: {e}")
    sys.exit(1)
