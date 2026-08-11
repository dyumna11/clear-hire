import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Bell,
  Sparkles,
  Plus,
  ArrowRight,
  LogOut,
  FolderOpen,
  Clipboard,
  ExternalLink,
  Scale,
  ArrowLeft,
  CheckCircle
} from 'lucide-react'
import CreateCampaignModal from './CreateCampaignModal'
import ThemeToggle from './ThemeToggle'
import { api } from '../utils/api'

interface RecruiterDashboardProps {
  darkMode: boolean
  toggleDarkMode: () => void
  onGoToHome: () => void
}

export default function RecruiterDashboard({ darkMode, toggleDarkMode, onGoToHome }: RecruiterDashboardProps) {
  const [isEmptyState, setIsEmptyState] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Subview routing
  const [subView, setSubView] = useState<'overview' | 'campaigns' | 'candidates' | 'campaign-detail' | 'candidate-detail'>('overview')

  // Auth States
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [authView, setAuthView] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [companyId, setCompanyId] = useState('')
  const [recruiterInfo, setRecruiterInfo] = useState<any>(null)
  const [authError, setAuthError] = useState<string | null>(null)
  const [authLoading, setAuthLoading] = useState(false)

  // API Data States
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [campaignsLoading, setCampaignsLoading] = useState(false)
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null)
  const [selectedCampaignDetail, setSelectedCampaignDetail] = useState<any>(null)
  const [candidatesList, setCandidatesList] = useState<any[]>([])
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null)
  const [selectedCandidateDetail, setSelectedCandidateDetail] = useState<any>(null)
  const [candidateAssessments, setCandidateAssessments] = useState<any[]>([])
  const [candidateEvaluation, setCandidateEvaluation] = useState<any>(null)

  // Rubric Edit States
  const [isEditingRubric, setIsEditingRubric] = useState(false)
  const [editWeightsTech, setEditWeightsTech] = useState(40)
  const [editWeightsProblem, setEditWeightsProblem] = useState(30)
  const [editWeightsComm, setEditWeightsComm] = useState(15)
  const [editWeightsProj, setEditWeightsProj] = useState(15)
  const [editMinCoding, setEditMinCoding] = useState(70)
  const [editMinOverall, setEditMinOverall] = useState(70)
  const [editMandatorySkills, setEditMandatorySkills] = useState('')
  const [editPreferredSkills, setEditPreferredSkills] = useState('')
  const [editGuidelines, setEditGuidelines] = useState('')

  // Add Candidate States
  const [newCandName, setNewCandName] = useState('')
  const [newCandEmail, setNewCandEmail] = useState('')
  const [newCandResume, setNewCandResume] = useState('')
  const [addingCand, setAddingCand] = useState(false)

  // Add Assessment States
  const [newRound, setNewRound] = useState('Technical Round 1')
  const [newScoreCoding, setNewScoreCoding] = useState(80)
  const [newScoreMcq, setNewScoreMcq] = useState(80)
  const [newScoreProblem, setNewScoreProblem] = useState(80)
  const [newScoreComm, setNewScoreComm] = useState(80)
  const [savingAssessment, setSavingAssessment] = useState(false)

  // Share Token States
  const [shareTokenText, setShareTokenText] = useState('')
  const [generatingShareToken, setGeneratingShareToken] = useState(false)
  const [evaluationLoading, setEvaluationLoading] = useState(false)
  const [evaluationError, setEvaluationError] = useState<string | null>(null)

  // Notifications dropdown simulation
  const [showNotifications, setShowNotifications] = useState(false)
  const notifications = [
    { text: 'Alex Rivera viewed transparency report', time: '10 min ago' },
    { text: 'Sarah Jenkins accepted offer letter', time: '4 hours ago' },
    { text: 'Campaign Software Engineer Backend synchronized', time: '5 hours ago' },
  ]

  // Main menu links
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, view: 'overview' as const },
    { name: 'Campaigns', icon: <FolderOpen className="w-4 h-4" />, view: 'campaigns' as const },
    { name: 'Candidates', icon: <Users className="w-4 h-4" />, view: 'candidates' as const },
  ]

  // Recruiter info sync on startup
  useEffect(() => {
    if (token) {
      api.getMe()
        .then((me) => {
          setRecruiterInfo(me)
          loadCampaigns()
        })
        .catch(() => {
          handleLogout()
        })
    }
  }, [token])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthLoading(true)
    setAuthError(null)
    try {
      await api.login({ email, password })
      const me = await api.getMe()
      setRecruiterInfo(me)
      setToken(localStorage.getItem('token'))
      setSubView('overview')
    } catch (err: any) {
      setAuthError(err.message || 'Login failed')
    } finally {
      setAuthLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthLoading(true)
    setAuthError(null)
    try {
      await api.register({ company_id: companyId, name, email, password })
      setAuthView('login')
      setAuthError('Registration successful. Please log in.')
    } catch (err: any) {
      setAuthError(err.message || 'Registration failed')
    } finally {
      setAuthLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setRecruiterInfo(null)
    onGoToHome()
  }

  const loadCampaigns = async () => {
    setCampaignsLoading(true)
    try {
      const data = await api.getCampaigns()
      setCampaigns(data)
      setIsEmptyState(data.length === 0)
    } catch (err) {
      console.error(err)
    } finally {
      setCampaignsLoading(false)
    }
  }

  const handleCreateCampaign = async (newCamp: any) => {
    try {
      await api.createCampaign(newCamp)
      await loadCampaigns()
      setIsModalOpen(false)
    } catch (err: any) {
      alert(err.message || 'Failed to create campaign')
    }
  }

  const viewCampaignDetail = async (campaignId: number) => {
    try {
      const detail = await api.getCampaign(campaignId)
      setSelectedCampaignDetail(detail)
      setSelectedCampaignId(campaignId)
      await loadCampaignCandidates(campaignId)
      
      // Initialize rubric edit state
      if (detail.evaluation_rubric) {
        const rubric = detail.evaluation_rubric
        setEditWeightsTech(rubric.weights?.technical || 40)
        setEditWeightsProblem(rubric.weights?.problem_solving || 30)
        setEditWeightsComm(rubric.weights?.communication || 15)
        setEditWeightsProj(rubric.weights?.projects || 15)
        setEditMinCoding(rubric.minimum_scores?.coding || 70)
        setEditMinOverall(rubric.minimum_scores?.overall || 70)
        setEditMandatorySkills(rubric.mandatory_skills?.join(', ') || '')
        setEditPreferredSkills(rubric.preferred_skills?.join(', ') || '')
        setEditGuidelines(rubric.evaluation_guidelines || '')
      }
      
      setSubView('campaign-detail')
    } catch (err) {
      console.error(err)
    }
  }

  const loadCampaignCandidates = async (campaignId: number) => {
    try {
      const candidates = await api.getCandidates(campaignId)
      setCandidatesList(candidates)
    } catch (err) {
      console.error(err)
    }
  }

  const handleAddCandidate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCampaignId) return
    setAddingCand(true)
    try {
      await api.createCandidate({
        campaign_id: selectedCampaignId,
        name: newCandName,
        email: newCandEmail,
        resume_url: newCandResume
      })
      setNewCandName('')
      setNewCandEmail('')
      setNewCandResume('')
      await loadCampaignCandidates(selectedCampaignId)
    } catch (err: any) {
      alert(err.message || 'Failed to add candidate')
    } finally {
      setAddingCand(false)
    }
  }

  const generateRubric = async () => {
    if (!selectedCampaignId) return
    try {
      const updatedCampaign = await api.generateRubric(selectedCampaignId)
      setSelectedCampaignDetail(updatedCampaign)
      // Refresh fields
      const rubric = updatedCampaign.evaluation_rubric
      setEditWeightsTech(rubric.weights?.technical || 40)
      setEditWeightsProblem(rubric.weights?.problem_solving || 30)
      setEditWeightsComm(rubric.weights?.communication || 15)
      setEditWeightsProj(rubric.weights?.projects || 15)
      setEditMinCoding(rubric.minimum_scores?.coding || 70)
      setEditMinOverall(rubric.minimum_scores?.overall || 70)
      setEditMandatorySkills(rubric.mandatory_skills?.join(', ') || '')
      setEditPreferredSkills(rubric.preferred_skills?.join(', ') || '')
      setEditGuidelines(rubric.evaluation_guidelines || '')
    } catch (err: any) {
      alert(err.message || 'Failed to generate rubric')
    }
  }

  const saveRubricEdits = async () => {
    if (!selectedCampaignId) return
    try {
      const rubricPayload = {
        weights: {
          technical: Number(editWeightsTech),
          problem_solving: Number(editWeightsProblem),
          communication: Number(editWeightsComm),
          projects: Number(editWeightsProj),
        },
        minimum_scores: {
          coding: Number(editMinCoding),
          overall: Number(editMinOverall),
        },
        mandatory_skills: editMandatorySkills.split(',').map(s => s.trim()).filter(Boolean),
        preferred_skills: editPreferredSkills.split(',').map(s => s.trim()).filter(Boolean),
        evaluation_guidelines: editGuidelines,
      }
      const updatedCampaign = await api.updateRubric(selectedCampaignId, rubricPayload)
      setSelectedCampaignDetail(updatedCampaign)
      setIsEditingRubric(false)
    } catch (err: any) {
      alert(err.message || 'Failed to update rubric')
    }
  }

  const approveRubric = async () => {
    if (!selectedCampaignId) return
    try {
      const approvedCampaign = await api.approveRubric(selectedCampaignId)
      setSelectedCampaignDetail(approvedCampaign)
      setIsEditingRubric(false)
      loadCampaigns() // refresh overall list
    } catch (err: any) {
      alert(err.message || 'Failed to approve rubric')
    }
  }

  const viewCandidateDetail = async (candidateId: number) => {
    try {
      // Find candidate in candidatesList
      const candidateObj = candidatesList.find(c => c.id === candidateId)
      setSelectedCandidateDetail(candidateObj)
      setSelectedCandidateId(candidateId)
      setShareTokenText('')
      
      // Load candidate's assessments
      const allAssessments = await api.getAssessments()
      const filtered = allAssessments.filter((a: any) => a.candidate_id === candidateId)
      setCandidateAssessments(filtered)

      // Reset evaluation info
      setCandidateEvaluation(null)
      if (filtered.length > 0) {
        // Fetch all evaluations and filter by assessment_id
        try {
          const evals = await api.getEvaluations()
          const matchedEval = evals.find((ev: any) => ev.assessment_id === filtered[0].id)
          if (matchedEval) {
            setCandidateEvaluation(matchedEval)
          }
        } catch {
          // Evaluation not generated yet
        }
      }

      setSubView('candidate-detail')
    } catch (err) {
      console.error(err)
    }
  }

  const handleSaveAssessment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCandidateId) return
    setSavingAssessment(true)
    try {
      await api.createAssessment({
        candidate_id: selectedCandidateId,
        assessment_round: newRound,
        assessment_source: selectedCampaignDetail?.assessment_source || 'Offline',
        coding_score: newScoreCoding,
        mcq_score: newScoreMcq,
        problem_solving_score: newScoreProblem,
        communication_score: newScoreComm,
      })
      // Reload details
      await viewCandidateDetail(selectedCandidateId)
    } catch (err: any) {
      alert(err.message || 'Failed to save assessment')
    } finally {
      setSavingAssessment(false)
    }
  }

  const handleGenerateEvaluation = async (assessmentId: number) => {
    setEvaluationLoading(true)
    setEvaluationError(null)
    try {
      const evalObj = await api.generateEvaluation(assessmentId)
      setCandidateEvaluation(evalObj)
    } catch (err: any) {
      setEvaluationError(err.message || 'Evaluation generation failed')
    } finally {
      setEvaluationLoading(false)
    }
  }

  const handleGenerateShareToken = async (assessmentId: number) => {
    setGeneratingShareToken(true)
    try {
      const data = await api.generateFeedbackToken(assessmentId)
      const tokenLink = `${window.location.origin}/candidate/assessments/${assessmentId}/feedback?token=${data.token}`
      setShareTokenText(tokenLink)
    } catch (err: any) {
      alert(err.message || 'Failed to generate token')
    } finally {
      setGeneratingShareToken(false)
    }
  }

  // Auth Screen Render
  if (!token) {
    return (
      <div className="min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full rounded-3xl border border-gray-200/60 dark:border-zinc-900 bg-white dark:bg-zinc-950/40 backdrop-blur-xl p-8 shadow-premium space-y-6 text-left">
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer justify-center" onClick={onGoToHome}>
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 7a2 2 0 012 2m-3 4H3m9 9a9 9 0 01-9-9V9a9 9 0 019-9h9a2 2 0 012 2v3m-7 7v6m-4-3h4" />
              </svg>
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-zinc-900 dark:text-white">
              Clear<span className="text-primary">Hire</span>
            </span>
          </div>

          <div className="text-center space-y-1">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
              {authView === 'login' ? 'Recruiter Login' : 'Recruiter Registration'}
            </h3>
            <p className="text-xs text-zinc-400">
              {authView === 'login' ? 'Access your recruiter workspace' : 'Create a recruiter workspace account'}
            </p>
          </div>

          {authError && (
            <div className={`p-3.5 rounded-xl text-xs font-semibold border ${
              authError.includes('successful')
                ? 'bg-accent/5 border-accent/15 text-accent'
                : 'bg-red-500/5 border-red-500/10 text-red-505'
            }`}>
              {authError}
            </div>
          )}

          <form onSubmit={authView === 'login' ? handleLogin : handleRegister} className="space-y-4">
            {authView === 'register' && (
              <>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Company ID</label>
                  <input
                    type="number"
                    required
                    value={companyId}
                    onChange={(e) => setCompanyId(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                    placeholder="e.g. 1"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                    placeholder="Sarah Jenkins"
                  />
                </div>
              </>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                placeholder="sarah@company.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-primary hover:bg-primary-hover text-white text-xs font-bold py-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center"
            >
              {authLoading ? 'Processing...' : authView === 'login' ? 'Log In' : 'Register'}
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => {
                setAuthView(authView === 'login' ? 'register' : 'login')
                setAuthError(null)
              }}
              className="text-xs text-primary hover:underline cursor-pointer font-semibold"
            >
              {authView === 'login' ? "Don't have an account? Register" : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 flex">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex flex-col justify-between w-64 border-r border-gray-200/80 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-6 flex-shrink-0">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={onGoToHome}>
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-md shadow-primary/10">
              <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 7a2 2 0 012 2m-3 4H3m9 9a9 9 0 01-9-9V9a9 9 0 019-9h9a2 2 0 012 2v3m-7 7v6m-4-3h4" />
              </svg>
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-zinc-900 dark:text-white">
              Clear<span className="text-primary">Hire</span>
            </span>
          </div>

          {/* Menu */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block px-3 mb-2">
              Navigation
            </span>
            {menuItems.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setSubView(item.view)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
                  subView === item.view
                    ? 'bg-primary/10 text-primary'
                    : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Profile / Footer */}
        <div className="border-t border-gray-100 dark:border-zinc-900 pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-left">
            <div className="w-8.5 h-8.5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
              {recruiterInfo?.name?.substring(0, 1) || 'R'}
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900 dark:text-white">{recruiterInfo?.name || 'Recruiter'} 👋</div>
              <div className="text-[10px] text-zinc-400">{recruiterInfo?.email || 'Acme TA'}</div>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            type="button"
            className="p-1.5 rounded-lg border border-gray-150 dark:border-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="h-16 border-b border-gray-200/80 dark:border-zinc-900 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md px-6 md:px-8 flex items-center justify-between sticky top-0 z-40">
          {/* Company switcher */}
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200/60 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-xs font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
              <span>Workspace</span>
            </div>
          </div>

          {/* Right Header items */}
          <div className="flex items-center gap-3">
            <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                type="button"
                className="relative p-2.5 rounded-xl border border-gray-200/60 dark:border-white/10 bg-white/60 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-350 hover:border-primary/20 transition-all cursor-pointer"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setShowNotifications(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-72 rounded-2xl border border-gray-150 dark:border-zinc-900 bg-white dark:bg-zinc-950 shadow-premium p-4 z-40 text-left space-y-3"
                    >
                      <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                        Notifications
                      </h4>
                      <div className="space-y-2">
                        {notifications.map((notif, idx) => (
                          <div key={idx} className="text-xs border-b border-gray-55 dark:border-zinc-900/60 pb-2 space-y-0.5">
                            <p className="font-semibold text-zinc-700 dark:text-zinc-350 leading-snug">{notif.text}</p>
                            <span className="text-[10px] text-zinc-400 block">{notif.time}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="w-8.5 h-8.5 rounded-full bg-zinc-150 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs text-zinc-700 dark:text-zinc-200 border border-gray-100 dark:border-zinc-900">
              {recruiterInfo?.name?.substring(0, 2) || 'TA'}
            </div>
          </div>
        </header>

        {/* Dashboard Content Container */}
        <div className="p-6 md:p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-64px)] no-scrollbar text-left">
          
          {campaignsLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-zinc-400">Syncing campaigns...</p>
            </div>
          ) : subView === 'overview' ? (
            /* OVERVIEW SCREEN */
            <>
              {/* Top Greeting row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-display font-extrabold text-zinc-900 dark:text-white">
                    Welcome back, {recruiterInfo?.name || 'Recruiter'} 👋
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Manage your hiring campaigns and candidate transparency reports.
                  </p>
                </div>
                
                <button
                  onClick={() => setIsModalOpen(true)}
                  type="button"
                  className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-primary/10 cursor-pointer self-start md:self-auto"
                >
                  <Plus className="w-4 h-4" /> Create Hiring Campaign
                </button>
              </div>

              {isEmptyState ? (
                /* ELEGANT EMPTY STATE ONBOARDING */
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl border border-dashed border-gray-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/20 backdrop-blur-xl p-10 md:p-16 flex flex-col items-center text-center max-w-2xl mx-auto space-y-6"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <FolderOpen className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-display font-extrabold text-zinc-900 dark:text-white">
                      Create your first hiring campaign
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed">
                      ClearHire generates transparent candidate reports from raw assessments. Define a rubric framework, sync candidates, and publish feedback in minutes.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    type="button"
                    className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-5 py-3.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-primary/10 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-accent" /> Create First Campaign <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                /* POPULATED DASHBOARD VIEW */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left: Campaigns list */}
                  <div className="lg:col-span-8 space-y-6">
                    <div className="rounded-2xl border border-gray-200/60 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-5 md:p-6 shadow-premium space-y-4">
                      <h3 className="text-base font-display font-bold text-zinc-900 dark:text-white">
                        Hiring Campaigns
                      </h3>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                          <thead>
                            <tr className="border-b border-gray-100 dark:border-zinc-900 text-zinc-400 dark:text-zinc-500 pb-2">
                              <th className="py-2.5 font-bold uppercase tracking-wider">Role Title</th>
                              <th className="py-2.5 font-bold uppercase tracking-wider">Department</th>
                              <th className="py-2.5 font-bold uppercase tracking-wider">Rubric Status</th>
                              <th className="py-2.5 font-bold uppercase tracking-wider">Rubric Version</th>
                              <th className="py-2.5 font-bold uppercase tracking-wider">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {campaigns.map((camp) => (
                              <tr key={camp.id} className="border-b border-gray-50 dark:border-zinc-900/60 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition-colors">
                                <td className="py-3.5 font-semibold text-zinc-800 dark:text-zinc-200">{camp.title}</td>
                                <td className="py-3.5 text-zinc-550 dark:text-zinc-400">{camp.department}</td>
                                <td className="py-3.5">
                                  <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                                    camp.rubric_status === 'approved'
                                      ? 'bg-accent/5 border-accent/15 text-accent'
                                      : 'bg-amber-500/5 border-amber-500/10 text-amber-500'
                                  }`}>
                                    {camp.rubric_status?.toUpperCase() || 'DRAFT'}
                                  </span>
                                </td>
                                <td className="py-3.5 font-mono text-zinc-650 dark:text-zinc-400">v{camp.rubric_version || 0}</td>
                                <td className="py-3.5">
                                  <button
                                    onClick={() => viewCampaignDetail(camp.id)}
                                    className="text-[10px] font-bold text-primary hover:underline cursor-pointer"
                                  >
                                    Manage
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Right Panel: Satisfaction & Funnel Stats */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="rounded-2xl border border-gray-200/60 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-5 md:p-6 shadow-premium space-y-4">
                      <h3 className="text-sm font-display font-bold text-zinc-900 dark:text-white">
                        Hiring FunnelProgression
                      </h3>
                      <div className="space-y-3.5">
                        {[
                          { stage: 'Applications Received', count: 480, pct: 100 },
                          { stage: 'Assessments Finished', count: 210, pct: 43 },
                          { stage: 'AI Evaluations Complete', count: 184, pct: 38 },
                          { stage: 'Offers Released', count: 18, pct: 3.7 }
                        ].map((stage, idx) => (
                          <div key={idx} className="space-y-1 text-xs">
                            <div className="flex justify-between items-center text-zinc-700 dark:text-zinc-300">
                              <span className="font-semibold">{stage.stage}</span>
                              <span className="font-bold text-zinc-900 dark:text-white font-mono">{stage.count}</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: `${stage.pct}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : subView === 'campaigns' ? (
            /* CAMPAIGNS SUBVIEW */
            <div className="rounded-2xl border border-gray-200/60 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-5 md:p-6 shadow-premium space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-display font-bold text-zinc-900 dark:text-white">Hiring Campaigns</h3>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 shadow-md cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Create Campaign
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-gray-150 dark:border-zinc-900 text-zinc-400 dark:text-zinc-500 pb-2">
                      <th className="py-2.5 font-bold uppercase tracking-wider">Campaign Title</th>
                      <th className="py-2.5 font-bold uppercase tracking-wider">Department</th>
                      <th className="py-2.5 font-bold uppercase tracking-wider">Assessment Source</th>
                      <th className="py-2.5 font-bold uppercase tracking-wider">Status</th>
                      <th className="py-2.5 font-bold uppercase tracking-wider">Rubric Version</th>
                      <th className="py-2.5 font-bold uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((camp) => (
                      <tr key={camp.id} className="border-b border-gray-50 dark:border-zinc-900/60 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition-colors">
                        <td className="py-3.5 font-bold text-zinc-800 dark:text-zinc-200">{camp.title}</td>
                        <td className="py-3.5 text-zinc-550 dark:text-zinc-400">{camp.department}</td>
                        <td className="py-3.5 text-zinc-550 dark:text-zinc-400">{camp.assessment_source}</td>
                        <td className="py-3.5">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            camp.rubric_status === 'approved'
                              ? 'bg-accent/5 border-accent/15 text-accent'
                              : 'bg-amber-500/5 border-amber-500/10 text-amber-500'
                          }`}>
                            {camp.rubric_status || 'draft'}
                          </span>
                        </td>
                        <td className="py-3.5 font-mono text-zinc-600 dark:text-zinc-400">v{camp.rubric_version || 0}</td>
                        <td className="py-3.5">
                          <button
                            onClick={() => viewCampaignDetail(camp.id)}
                            className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                          >
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : subView === 'candidates' ? (
            /* CANDIDATES DIRECT VIEW */
            <div className="rounded-2xl border border-gray-200/60 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-5 md:p-6 shadow-premium space-y-4">
              <h3 className="text-lg font-display font-bold text-zinc-900 dark:text-white">Active Candidates</h3>
              <p className="text-xs text-zinc-500">Select a campaign first to manage candidate assessments and view AI evaluations.</p>
              <button
                onClick={() => setSubView('campaigns')}
                className="bg-primary text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer"
              >
                Go to Campaigns List
              </button>
            </div>
          ) : subView === 'campaign-detail' && selectedCampaignDetail ? (
            /* CAMPAIGN DETAIL & RUBRIC WORKSPACE */
            <div className="space-y-8">
              {/* Header and Details card */}
              <div className="rounded-2xl border border-gray-200/60 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-6 shadow-premium space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Hiring Campaign</span>
                    <h2 className="text-2xl font-display font-extrabold text-zinc-900 dark:text-white">
                      {selectedCampaignDetail.title}
                    </h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Department: {selectedCampaignDetail.department} &bull; Assessment Source: {selectedCampaignDetail.assessment_source}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setSubView('campaigns')}
                    className="text-xs text-zinc-400 hover:text-zinc-800 dark:hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Campaigns
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 dark:border-zinc-900 pt-4 text-xs">
                  <div>
                    <h4 className="font-bold text-zinc-800 dark:text-zinc-200 mb-1">Job Description</h4>
                    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-900/40 p-3.5 rounded-xl border border-gray-150 dark:border-zinc-900">
                      {selectedCampaignDetail.job_description || 'Not provided.'}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-800 dark:text-zinc-200 mb-1">Hiring Notes</h4>
                    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-900/40 p-3.5 rounded-xl border border-gray-150 dark:border-zinc-900">
                      {selectedCampaignDetail.hiring_notes || 'Not provided.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Rubric Review Workspace */}
              <div className="rounded-2xl border border-gray-200/60 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-6 shadow-premium space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-zinc-900">
                  <div className="space-y-1">
                    <h3 className="text-base font-display font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                      <Scale className="w-5 h-5 text-primary" /> Evaluation Criteria Rubric
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Review, edit, and approve the rubric before triggering AI evaluations.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold border uppercase tracking-wider ${
                      selectedCampaignDetail.rubric_status === 'approved'
                        ? 'bg-accent/10 border-accent/20 text-accent'
                        : 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                    }`}>
                      {selectedCampaignDetail.rubric_status || 'draft'} (v{selectedCampaignDetail.rubric_version || 0})
                    </span>

                    {!selectedCampaignDetail.evaluation_rubric && (
                      <button
                        onClick={generateRubric}
                        className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md"
                      >
                        <Sparkles className="w-4 h-4 text-accent" /> Generate AI Rubric
                      </button>
                    )}

                    {selectedCampaignDetail.evaluation_rubric && !isEditingRubric && (
                      <>
                        <button
                          onClick={() => setIsEditingRubric(true)}
                          className="px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-xs font-bold text-zinc-700 dark:text-zinc-300 transition-colors"
                        >
                          Edit Rubric
                        </button>
                        {selectedCampaignDetail.rubric_status !== 'approved' && (
                          <button
                            onClick={approveRubric}
                            className="bg-accent hover:bg-accent/90 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md"
                          >
                            Approve Rubric
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Rubric View vs Edit Panel */}
                {selectedCampaignDetail.evaluation_rubric ? (
                  isEditingRubric ? (
                    /* EDIT RUBRIC FORM */
                    <div className="space-y-5 text-xs">
                      <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-4 font-bold text-zinc-800 dark:text-zinc-200">Category Weights (%)</div>
                        <div>
                          <span className="text-[10px] text-zinc-400 block mb-1">Technical Skills</span>
                          <input
                            type="number"
                            value={editWeightsTech}
                            onChange={(e) => setEditWeightsTech(Number(e.target.value))}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-zinc-400 block mb-1">Problem Solving</span>
                          <input
                            type="number"
                            value={editWeightsProblem}
                            onChange={(e) => setEditWeightsProblem(Number(e.target.value))}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-zinc-400 block mb-1">Communication</span>
                          <input
                            type="number"
                            value={editWeightsComm}
                            onChange={(e) => setEditWeightsComm(Number(e.target.value))}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-zinc-400 block mb-1">Project/Exp</span>
                          <input
                            type="number"
                            value={editWeightsProj}
                            onChange={(e) => setEditWeightsProj(Number(e.target.value))}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="font-bold text-zinc-800 dark:text-zinc-200 block mb-1">Min Coding Score</label>
                          <input
                            type="number"
                            value={editMinCoding}
                            onChange={(e) => setEditMinCoding(Number(e.target.value))}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-zinc-800 dark:text-zinc-200 block mb-1">Min Overall Score</label>
                          <input
                            type="number"
                            value={editMinOverall}
                            onChange={(e) => setEditMinOverall(Number(e.target.value))}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-zinc-800 dark:text-zinc-200 block">Mandatory Skills (Comma separated)</label>
                        <input
                          type="text"
                          value={editMandatorySkills}
                          onChange={(e) => setEditMandatorySkills(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-zinc-800 dark:text-zinc-200 block">Preferred Skills (Comma separated)</label>
                        <input
                          type="text"
                          value={editPreferredSkills}
                          onChange={(e) => setEditPreferredSkills(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-zinc-800 dark:text-zinc-200 block">Evaluation Guidelines</label>
                        <textarea
                          rows={3}
                          value={editGuidelines}
                          onChange={(e) => setEditGuidelines(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                        />
                      </div>

                      <div className="flex gap-2 justify-end pt-2">
                        <button
                          onClick={() => setIsEditingRubric(false)}
                          className="px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={saveRubricEdits}
                          className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl"
                        >
                          Save Rubric Draft
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* VIEW RUBRIC DETAILS */
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-left">
                      {/* Weights & Minimums */}
                      <div className="bg-zinc-50 dark:bg-zinc-900/30 p-4 rounded-xl border border-gray-150 dark:border-zinc-900/80 space-y-4">
                        <div>
                          <h4 className="font-bold text-zinc-850 dark:text-white mb-2 uppercase tracking-wide text-[10px] text-zinc-400">
                            Weights Breakdown
                          </h4>
                          <div className="space-y-1.5 font-semibold text-zinc-650 dark:text-zinc-300">
                            <div className="flex justify-between"><span>Technical Skills</span><span className="font-mono">{selectedCampaignDetail.evaluation_rubric.weights?.technical}%</span></div>
                            <div className="flex justify-between"><span>Problem Solving</span><span className="font-mono">{selectedCampaignDetail.evaluation_rubric.weights?.problem_solving}%</span></div>
                            <div className="flex justify-between"><span>Communication</span><span className="font-mono">{selectedCampaignDetail.evaluation_rubric.weights?.communication}%</span></div>
                            <div className="flex justify-between"><span>Projects / Experience</span><span className="font-mono">{selectedCampaignDetail.evaluation_rubric.weights?.projects}%</span></div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-gray-150 dark:border-zinc-900">
                          <h4 className="font-bold text-zinc-850 dark:text-white mb-2 uppercase tracking-wide text-[10px] text-zinc-400">
                            Minimum Pass Scores
                          </h4>
                          <div className="space-y-1.5 font-semibold text-zinc-650 dark:text-zinc-300">
                            <div className="flex justify-between"><span>Minimum Coding Score</span><span className="font-mono">{selectedCampaignDetail.evaluation_rubric.minimum_scores?.coding || 0}/100</span></div>
                            <div className="flex justify-between"><span>Minimum Overall Score</span><span className="font-mono">{selectedCampaignDetail.evaluation_rubric.minimum_scores?.overall || 0}/100</span></div>
                          </div>
                        </div>
                      </div>

                      {/* Skills lists */}
                      <div className="bg-zinc-50 dark:bg-zinc-900/30 p-4 rounded-xl border border-gray-150 dark:border-zinc-900/80 space-y-4 col-span-1 md:col-span-2">
                        <div>
                          <h4 className="font-bold text-red-400 mb-2 uppercase tracking-wide text-[10px]">
                            Mandatory Requirements (Must Have)
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedCampaignDetail.evaluation_rubric.mandatory_skills?.map((s: string) => (
                              <span key={s} className="px-2.5 py-1 rounded-lg bg-red-500/5 border border-red-500/10 text-red-400 font-bold text-[10px]">
                                {s}
                              </span>
                            ))}
                            {(!selectedCampaignDetail.evaluation_rubric.mandatory_skills || selectedCampaignDetail.evaluation_rubric.mandatory_skills.length === 0) && (
                              <span className="text-zinc-400 italic">None defined</span>
                            )}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-gray-150 dark:border-zinc-900">
                          <h4 className="font-bold text-zinc-400 mb-2 uppercase tracking-wide text-[10px]">
                            Preferred Criteria (Nice to Have)
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedCampaignDetail.evaluation_rubric.preferred_skills?.map((s: string) => (
                              <span key={s} className="px-2.5 py-1 rounded-lg bg-zinc-200 dark:bg-zinc-900 border border-gray-250 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold text-[10px]">
                                {s}
                              </span>
                            ))}
                            {(!selectedCampaignDetail.evaluation_rubric.preferred_skills || selectedCampaignDetail.evaluation_rubric.preferred_skills.length === 0) && (
                              <span className="text-zinc-400 italic">None defined</span>
                            )}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-gray-150 dark:border-zinc-900">
                          <h4 className="font-bold text-zinc-850 dark:text-white mb-1.5 uppercase tracking-wide text-[10px] text-zinc-400">
                            Guidelines
                          </h4>
                          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                            {selectedCampaignDetail.evaluation_rubric.evaluation_guidelines}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-900/20 border border-dashed border-gray-200 dark:border-zinc-900 rounded-xl space-y-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <p className="text-xs text-zinc-400 text-center max-w-sm">
                      There is no active evaluation rubric for this campaign. Generate one using the AI tool or define manual parameters.
                    </p>
                    <button
                      onClick={generateRubric}
                      className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer"
                    >
                      Generate Suggested AI Rubric
                    </button>
                  </div>
                )}
              </div>

              {/* Candidates list section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                
                {/* Left: Candidates table list */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="rounded-2xl border border-gray-200/60 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-5 md:p-6 shadow-premium space-y-4">
                    <h3 className="text-base font-display font-bold text-zinc-900 dark:text-white">
                      Candidates Applied ({candidatesList.length})
                    </h3>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead>
                          <tr className="border-b border-gray-100 dark:border-zinc-900 text-zinc-400 dark:text-zinc-500 pb-2">
                            <th className="py-2.5 font-bold uppercase tracking-wider">Name</th>
                            <th className="py-2.5 font-bold uppercase tracking-wider">Email</th>
                            <th className="py-2.5 font-bold uppercase tracking-wider">Status</th>
                            <th className="py-2.5 font-bold uppercase tracking-wider">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {candidatesList.map((cand) => (
                            <tr key={cand.id} className="border-b border-gray-50 dark:border-zinc-900/60 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition-colors">
                              <td className="py-3.5 font-bold text-zinc-800 dark:text-zinc-200">{cand.name}</td>
                              <td className="py-3.5 font-semibold text-zinc-550 dark:text-zinc-400">{cand.email}</td>
                              <td className="py-3.5">
                                <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                                  cand.status === 'Evaluated'
                                    ? 'bg-accent/5 border-accent/15 text-accent'
                                    : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-900 border-zinc-200'
                                }`}>
                                  {cand.status || 'Pending'}
                                </span>
                              </td>
                              <td className="py-3.5">
                                <button
                                  onClick={() => viewCandidateDetail(cand.id)}
                                  className="text-xs font-bold text-primary hover:underline cursor-pointer"
                                >
                                  Open Detail
                                </button>
                              </td>
                            </tr>
                          ))}
                          {candidatesList.length === 0 && (
                            <tr>
                              <td colSpan={4} className="py-8 text-center text-zinc-400 italic">No candidates added yet. Add a candidate using the panel on the right.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Right: Add Candidate Form */}
                <div className="lg:col-span-4">
                  <div className="rounded-2xl border border-gray-200/60 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-5 md:p-6 shadow-premium space-y-4">
                    <h3 className="text-sm font-display font-bold text-zinc-900 dark:text-white">
                      Add Candidate
                    </h3>
                    <form onSubmit={handleAddCandidate} className="space-y-3.5">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-wide">Candidate Name</label>
                        <input
                          type="text"
                          required
                          value={newCandName}
                          onChange={(e) => setNewCandName(e.target.value)}
                          className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                          placeholder="Jane Doe"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-wide">Email Address</label>
                        <input
                          type="email"
                          required
                          value={newCandEmail}
                          onChange={(e) => setNewCandEmail(e.target.value)}
                          className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                          placeholder="jane@example.com"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-wide">Resume Link (Optional)</label>
                        <input
                          type="url"
                          value={newCandResume}
                          onChange={(e) => setNewCandResume(e.target.value)}
                          className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                          placeholder="https://example.com/resume.pdf"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={addingCand}
                        className="w-full bg-primary hover:bg-primary-hover text-white text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer"
                      >
                        {addingCand ? 'Saving...' : 'Add Candidate'}
                      </button>
                    </form>
                  </div>
                </div>

              </div>
            </div>
          ) : subView === 'candidate-detail' && selectedCandidateDetail ? (
            /* CANDIDATE DETAIL & EVALUATION */
            <div className="space-y-8">
              {/* Header metadata card */}
              <div className="rounded-2xl border border-gray-200/60 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-6 shadow-premium space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Candidate Record</span>
                    <h2 className="text-2xl font-display font-extrabold text-zinc-900 dark:text-white">
                      {selectedCandidateDetail.name}
                    </h2>
                    <p className="text-xs text-zinc-500">
                      Email: {selectedCandidateDetail.email} &bull; Resume: {selectedCandidateDetail.resume_url ? (
                        <a href={selectedCandidateDetail.resume_url} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                          View PDF <ExternalLink className="inline-block w-3 h-3 ml-0.5" />
                        </a>
                      ) : 'None Provided'}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => viewCampaignDetail(selectedCampaignId!)}
                    className="text-xs text-zinc-400 hover:text-zinc-800 dark:hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Campaign
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                
                {/* Left: Assessments and AI Evaluation results */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Assessments list */}
                  <div className="rounded-2xl border border-gray-200/60 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-5 md:p-6 shadow-premium space-y-4">
                    <h3 className="text-base font-display font-bold text-zinc-900 dark:text-white">
                      Assessment Marks
                    </h3>
                    
                    {candidateAssessments.length === 0 ? (
                      <p className="text-xs text-zinc-400 italic">No assessment marks uploaded yet. Use the panel on the right to sync scores.</p>
                    ) : (
                      <div className="space-y-4">
                        {candidateAssessments.map((assess) => (
                          <div key={assess.id} className="p-4 rounded-xl border border-gray-150 dark:border-zinc-900/80 bg-zinc-50 dark:bg-zinc-900/30 text-xs space-y-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="font-bold text-zinc-800 dark:text-zinc-200">{assess.assessment_round}</span>
                                <span className="text-[10px] text-zinc-400 block mt-0.5">Source: {assess.assessment_source}</span>
                              </div>

                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Overall Marks</span>
                                  <span className="font-mono font-bold text-sm text-primary">{assess.overall_score}/100</span>
                                </div>

                                {selectedCampaignDetail?.rubric_status === 'approved' ? (
                                  candidateEvaluation ? (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-bold bg-accent/10 border border-accent/20 text-accent uppercase tracking-wider">
                                      <CheckCircle className="w-3.5 h-3.5" /> Evaluation Generated
                                    </span>
                                  ) : (
                                    <button
                                      onClick={() => handleGenerateEvaluation(assess.id)}
                                      disabled={evaluationLoading}
                                      className="bg-primary hover:bg-primary-hover text-white text-[10px] font-bold px-3 py-2 rounded-xl flex items-center gap-1 shadow-sm cursor-pointer"
                                    >
                                      {evaluationLoading ? 'Evaluating...' : 'Run Rubric Evaluation'}
                                    </button>
                                  )
                                ) : (
                                  <span className="text-[10px] font-semibold text-amber-500 bg-amber-550/5 border border-amber-500/10 p-2 rounded-lg">
                                    Rubric Approval Required
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-4 gap-2 text-center pt-2 border-t border-gray-100 dark:border-zinc-900">
                              <div className="p-2 rounded bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-900">
                                <span className="text-[9px] text-zinc-400 block mb-0.5">Coding</span>
                                <span className="font-mono font-bold">{assess.coding_score}</span>
                              </div>
                              <div className="p-2 rounded bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-900">
                                <span className="text-[9px] text-zinc-400 block mb-0.5">MCQ</span>
                                <span className="font-mono font-bold">{assess.mcq_score}</span>
                              </div>
                              <div className="p-2 rounded bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-900">
                                <span className="text-[9px] text-zinc-400 block mb-0.5">Problem Solv</span>
                                <span className="font-mono font-bold">{assess.problem_solving_score}</span>
                              </div>
                              <div className="p-2 rounded bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-900">
                                <span className="text-[9px] text-zinc-400 block mb-0.5">Comm</span>
                                <span className="font-mono font-bold">{assess.communication_score}</span>
                              </div>
                            </div>
                            
                            {/* Evaluation Error */}
                            {evaluationError && (
                              <div className="p-3.5 bg-red-500/5 border border-red-500/10 rounded-xl text-red-500 text-xs">
                                {evaluationError}
                              </div>
                            )}

                            {/* Share Access Token Section */}
                            {candidateEvaluation && (
                              <div className="pt-4 border-t border-gray-100 dark:border-zinc-900 space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="font-bold text-zinc-800 dark:text-zinc-200">Candidate Transparency Report Sharing</span>
                                  <button
                                    onClick={() => handleGenerateShareToken(assess.id)}
                                    disabled={generatingShareToken}
                                    className="bg-accent hover:bg-accent/90 text-white text-[10px] font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer"
                                  >
                                    <Clipboard className="w-3.5 h-3.5" /> {generatingShareToken ? 'Generating...' : 'Get Secure Share Link'}
                                  </button>
                                </div>
                                {shareTokenText && (
                                  <div className="flex gap-2 items-center bg-zinc-950 border border-zinc-900 p-2.5 rounded-xl select-all">
                                    <input
                                      type="text"
                                      readOnly
                                      value={shareTokenText}
                                      className="w-full text-[10px] font-mono bg-transparent text-accent focus:outline-none border-none"
                                    />
                                    <button
                                      onClick={() => {
                                        navigator.clipboard.writeText(shareTokenText)
                                        alert('Link copied to clipboard!')
                                      }}
                                      className="text-primary hover:underline font-bold text-[10px] flex-shrink-0"
                                    >
                                      Copy
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Recruiter-Only Evaluation View */}
                  {candidateEvaluation && (
                    <div className="rounded-2xl border border-gray-200/60 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-5 md:p-6 shadow-premium space-y-6">
                      <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-zinc-900">
                        <div>
                          <h3 className="text-base font-display font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-red-500" /> Recruiter Evaluation Panel (Proprietary)
                          </h3>
                          <p className="text-xs text-zinc-400">This workspace is private and secured. Candidates cannot access these metrics.</p>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-400 border border-gray-200 dark:border-zinc-800 text-[9px] font-bold uppercase tracking-wider font-mono">
                          Rubric v{candidateEvaluation.rubric_version}
                        </span>
                      </div>

                      {/* AI recommendations header */}
                      <div className="grid grid-cols-3 gap-4 text-xs">
                        <div className="p-4 rounded-xl border border-gray-150 dark:border-zinc-900/60 bg-zinc-50 dark:bg-zinc-900/30 space-y-1">
                          <span className="text-[10px] font-bold text-zinc-450 block uppercase tracking-wide">AI Recommendation</span>
                          <span className={`text-lg font-display font-extrabold ${
                            candidateEvaluation.recommendation?.toLowerCase().includes('hire') && !candidateEvaluation.recommendation?.toLowerCase().includes('no')
                              ? 'text-accent'
                              : 'text-red-500'
                          }`}>
                            {candidateEvaluation.recommendation}
                          </span>
                          <span className="text-[9px] text-zinc-400 block leading-tight pt-1 border-t border-gray-100 dark:border-zinc-800">
                            Note: Recruiters review and make final decision.
                          </span>
                        </div>
                        <div className="p-4 rounded-xl border border-gray-150 dark:border-zinc-900/60 bg-zinc-50 dark:bg-zinc-900/30 space-y-1">
                          <span className="text-[10px] font-bold text-zinc-450 block uppercase tracking-wide">Confidence Score</span>
                          <span className="text-lg font-display font-extrabold text-zinc-900 dark:text-white">
                            {candidateEvaluation.confidence_score}%
                          </span>
                        </div>
                        <div className="p-4 rounded-xl border border-gray-150 dark:border-zinc-900/60 bg-zinc-50 dark:bg-zinc-900/30 space-y-1">
                          <span className="text-[10px] font-bold text-zinc-450 block uppercase tracking-wide">Rubric Match</span>
                          <span className="text-lg font-display font-extrabold text-primary">
                            {candidateEvaluation.match_percentage}%
                          </span>
                        </div>
                      </div>

                      {/* Rating details */}
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="p-3 bg-zinc-50 dark:bg-zinc-900/30 rounded-xl border border-gray-150 dark:border-zinc-900">
                          <span className="text-[9px] text-zinc-400 block mb-0.5">Technical Rating</span>
                          <span className="font-bold font-mono text-sm">{candidateEvaluation.technical_rating}/10</span>
                        </div>
                        <div className="p-3 bg-zinc-50 dark:bg-zinc-900/30 rounded-xl border border-gray-150 dark:border-zinc-900">
                          <span className="text-[9px] text-zinc-400 block mb-0.5">Problem Solving Rating</span>
                          <span className="font-bold font-mono text-sm">{candidateEvaluation.problem_solving_rating}/10</span>
                        </div>
                        <div className="p-3 bg-zinc-50 dark:bg-zinc-900/30 rounded-xl border border-gray-150 dark:border-zinc-900">
                          <span className="text-[9px] text-zinc-400 block mb-0.5">Communication Rating</span>
                          <span className="font-bold font-mono text-sm">{candidateEvaluation.communication_rating}/10</span>
                        </div>
                      </div>

                      {/* Recruiter reasoning */}
                      <div className="space-y-4 text-xs leading-relaxed">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">Recruiter strengths (Public)</h4>
                            <p className="bg-zinc-50 dark:bg-zinc-900/30 p-3.5 rounded-xl border border-gray-150 dark:border-zinc-900">{candidateEvaluation.strengths}</p>
                          </div>
                          <div>
                            <h4 className="font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">Recruiter weaknesses (Public)</h4>
                            <p className="bg-zinc-50 dark:bg-zinc-900/30 p-3.5 rounded-xl border border-gray-150 dark:border-zinc-900">{candidateEvaluation.weaknesses}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold text-zinc-800 dark:text-zinc-200 mb-1">Recruiter-Only Detailed Reasoning (Confidential)</h4>
                          <p className="bg-zinc-50 dark:bg-zinc-900/30 p-3.5 rounded-xl border border-gray-150 dark:border-zinc-900">{candidateEvaluation.reasoning}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100 dark:border-zinc-900">
                          <div>
                            <h4 className="font-bold text-zinc-400 mb-1 text-[10px] uppercase">Matched Skills</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {candidateEvaluation.matched_skills?.map((s: string) => (
                                <span key={s} className="px-2 py-0.5 rounded bg-accent/5 border border-accent/15 text-accent text-[9px] font-bold">{s}</span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold text-zinc-400 mb-1 text-[10px] uppercase">Missing Skills</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {candidateEvaluation.missing_skills?.map((s: string) => (
                                <span key={s} className="px-2 py-0.5 rounded bg-red-500/5 border border-red-500/10 text-red-500 text-[9px] font-bold">{s}</span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-gray-100 dark:border-zinc-900 flex items-center gap-2">
                          <span className="font-bold text-zinc-800 dark:text-zinc-200">Mandatory Requirements Met:</span>
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            candidateEvaluation.mandatory_requirements_met
                              ? 'bg-accent/10 border-accent/20 text-accent'
                              : 'bg-red-500/10 border-red-500/20 text-red-500'
                          }`}>
                            {candidateEvaluation.mandatory_requirements_met ? 'MET' : 'NOT MET'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Right: Mock Add Assessment Form */}
                <div className="lg:col-span-4">
                  <div className="rounded-2xl border border-gray-200/60 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-5 md:p-6 shadow-premium space-y-4">
                    <h3 className="text-sm font-display font-bold text-zinc-900 dark:text-white">
                      Enter Assessment Marks
                    </h3>
                    
                    <form onSubmit={handleSaveAssessment} className="space-y-3.5 text-xs text-left">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-wide">Round Name</label>
                        <input
                          type="text"
                          required
                          value={newRound}
                          onChange={(e) => setNewRound(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-wide">Coding Score (0-100)</label>
                        <input
                          type="number"
                          required
                          value={newScoreCoding}
                          onChange={(e) => setNewScoreCoding(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-wide">MCQ Score (0-100)</label>
                        <input
                          type="number"
                          required
                          value={newScoreMcq}
                          onChange={(e) => setNewScoreMcq(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-wide">Problem Solving (0-100)</label>
                        <input
                          type="number"
                          required
                          value={newScoreProblem}
                          onChange={(e) => setNewScoreProblem(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-wide">Communication (0-100)</label>
                        <input
                          type="number"
                          required
                          value={newScoreComm}
                          onChange={(e) => setNewScoreComm(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={savingAssessment}
                        className="w-full bg-primary hover:bg-primary-hover text-white text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer"
                      >
                        {savingAssessment ? 'Saving...' : 'Save Assessment Scores'}
                      </button>
                    </form>
                  </div>
                </div>

              </div>
            </div>
          ) : null}

        </div>
      </div>

      {/* Creation campaign modal */}
      <AnimatePresence>
        {isModalOpen && (
          <CreateCampaignModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onCreate={handleCreateCampaign}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
