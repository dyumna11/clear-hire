const API_BASE_URL = 'http://localhost:8000';

export function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    let errorDetail = 'API call failed';
    try {
      const data = await response.json();
      errorDetail = data.detail || errorDetail;
    } catch {
      // ignore
    }
    const err = new Error(errorDetail) as any;
    err.status = response.status;
    throw err;
  }
  return response.json();
}

export const api = {
  // Authentication
  async login(formValues: Record<string, string>) {
    const formData = new URLSearchParams();
    formData.append('username', formValues.email);
    formData.append('password', formValues.password);

    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });
    const data = await handleResponse(res);
    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
    }
    return data;
  },

  async register(formValues: Record<string, any>) {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        company_id: Number(formValues.company_id),
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
      }),
    });
    return handleResponse(res);
  },

  async getMe() {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        ...getAuthHeaders(),
      },
    });
    return handleResponse(res);
  },

  // Campaigns
  async getCampaigns() {
    const res = await fetch(`${API_BASE_URL}/campaigns/`, {
      method: 'GET',
      headers: {
        ...getAuthHeaders(),
      },
    });
    return handleResponse(res);
  },

  async getCampaign(campaignId: number) {
    const res = await fetch(`${API_BASE_URL}/campaigns/${campaignId}`, {
      method: 'GET',
      headers: {
        ...getAuthHeaders(),
      },
    });
    return handleResponse(res);
  },

  async createCampaign(payload: Record<string, any>) {
    const res = await fetch(`${API_BASE_URL}/campaigns/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify({
        title: payload.title,
        department: payload.department,
        assessment_source: payload.assessment_source,
        job_description: payload.job_description || null,
        hiring_notes: payload.hiring_notes || null,
        evaluation_parameters: payload.evaluation_parameters || null,
      }),
    });
    return handleResponse(res);
  },

  async generateRubric(campaignId: number) {
    const res = await fetch(`${API_BASE_URL}/campaigns/${campaignId}/generate-rubric`, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
      },
    });
    return handleResponse(res);
  },

  async updateRubric(campaignId: number, rubric: Record<string, any>) {
    const res = await fetch(`${API_BASE_URL}/campaigns/${campaignId}/rubric`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(rubric),
    });
    return handleResponse(res);
  },

  async approveRubric(campaignId: number) {
    const res = await fetch(`${API_BASE_URL}/campaigns/${campaignId}/rubric/approve`, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
      },
    });
    return handleResponse(res);
  },

  // Candidates
  async getCandidates(campaignId: number) {
    const res = await fetch(`${API_BASE_URL}/candidates/campaign/${campaignId}`, {
      method: 'GET',
      headers: {
        ...getAuthHeaders(),
      },
    });
    return handleResponse(res);
  },

  async createCandidate(payload: Record<string, any>) {
    const res = await fetch(`${API_BASE_URL}/candidates/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify({
        campaign_id: Number(payload.campaign_id),
        name: payload.name,
        email: payload.email,
        resume_url: payload.resume_url || null,
      }),
    });
    return handleResponse(res);
  },

  // Assessments
  async createAssessment(payload: Record<string, any>) {
    const res = await fetch(`${API_BASE_URL}/assessments/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify({
        candidate_id: Number(payload.candidate_id),
        assessment_round: payload.assessment_round,
        assessment_source: payload.assessment_source,
        status: payload.status || 'Pending',
        coding_score: Number(payload.coding_score || 0),
        mcq_score: Number(payload.mcq_score || 0),
        problem_solving_score: Number(payload.problem_solving_score || 0),
        communication_score: Number(payload.communication_score || 0),
        duration_minutes: Number(payload.duration_minutes || 0),
      }),
    });
    return handleResponse(res);
  },

  async getAssessments() {
    const res = await fetch(`${API_BASE_URL}/assessments/`, {
      method: 'GET',
      headers: {
        ...getAuthHeaders(),
      },
    });
    return handleResponse(res);
  },

  // Evaluations
  async generateEvaluation(assessmentId: number) {
    const res = await fetch(`${API_BASE_URL}/evaluations/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify({
        assessment_id: assessmentId,
      }),
    });
    return handleResponse(res);
  },

  async getEvaluation(evaluationId: number) {
    const res = await fetch(`${API_BASE_URL}/evaluations/${evaluationId}`, {
      method: 'GET',
      headers: {
        ...getAuthHeaders(),
      },
    });
    return handleResponse(res);
  },

  async getEvaluations() {
    const res = await fetch(`${API_BASE_URL}/evaluations/`, {
      method: 'GET',
      headers: {
        ...getAuthHeaders(),
      },
    });
    return handleResponse(res);
  },

  // Feedback Tokens
  async generateFeedbackToken(assessmentId: number) {
    const res = await fetch(`${API_BASE_URL}/assessments/${assessmentId}/feedback-token`, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
      },
    });
    return handleResponse(res);
  },

  // Candidate Feedback View
  async getCandidateFeedback(assessmentId: number, token: string) {
    const res = await fetch(`${API_BASE_URL}/candidate/assessments/${assessmentId}/feedback?token=${encodeURIComponent(token)}`, {
      method: 'GET',
    });
    return handleResponse(res);
  },

  // Integrations / External Assessments
  async importExternalAssessment(payload: Record<string, any>) {
    const res = await fetch(`${API_BASE_URL}/integrations/assessment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  async getExternalAssessment(assessmentId: number) {
    const res = await fetch(`${API_BASE_URL}/integrations/assessment/${assessmentId}`, {
      method: 'GET',
      headers: {
        ...getAuthHeaders(),
      },
    });
    return handleResponse(res);
  },

  async generateExternalInterviewQuestions(assessmentId: number) {
    const res = await fetch(`${API_BASE_URL}/integrations/assessment/${assessmentId}/generate-questions`, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
      },
    });
    return handleResponse(res);
  },

  async generateExternalRecruiterReport(assessmentId: number) {
    const res = await fetch(`${API_BASE_URL}/integrations/assessment/${assessmentId}/generate-report`, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
      },
    });
    return handleResponse(res);
  },
};
