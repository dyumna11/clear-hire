import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Award,
  BookOpen,
  Code,
  Brain,
  MessageSquare,
  AlertTriangle,
  FileText,
  Sparkles,
  ArrowLeft,
  CheckCircle,
  HelpCircle
} from 'lucide-react'
import { api } from '../utils/api'

interface CandidateFeedbackProps {
  assessmentId: number
  token: string
  onGoToHome: () => void
}

export default function CandidateFeedback({ assessmentId, token, onGoToHome }: CandidateFeedbackProps) {
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<any>(null)

  useEffect(() => {
    async function loadFeedback() {
      try {
        setLoading(true)
        setErrorMsg(null)
        const data = await api.getCandidateFeedback(assessmentId, token)
        setFeedback(data)
      } catch (err: any) {
        console.error(err)
        if (err.status === 401 || err.status === 403) {
          setErrorMsg("Your feedback link is invalid or has expired.")
        } else {
          setErrorMsg("Your feedback link is invalid or has expired.")
        }
      } finally {
        setLoading(false)
      }
    }
    loadFeedback()
  }, [assessmentId, token])

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-zinc-400">Loading your feedback report...</p>
        </div>
      </div>
    )
  }

  if (errorMsg) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full rounded-3xl border border-red-500/20 bg-zinc-900/40 backdrop-blur-xl p-8 text-center space-y-6"
        >
          <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto border border-red-500/20">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Feedback Access Denied</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {errorMsg}
            </p>
          </div>
          <button
            onClick={onGoToHome}
            className="w-full bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold py-3.5 rounded-xl transition-all cursor-pointer"
          >
            Return to Homepage
          </button>
        </motion.div>
      </div>
    )
  }

  const breakdownItems = [
    { name: 'Coding Proficiency', score: feedback?.score_breakdown?.coding, icon: <Code className="w-4 h-4 text-primary" /> },
    { name: 'Problem Solving', score: feedback?.score_breakdown?.problem_solving, icon: <Brain className="w-4 h-4 text-accent" /> },
    { name: 'MCQ (Core Concepts)', score: feedback?.score_breakdown?.mcq, icon: <HelpCircle className="w-4 h-4 text-purple-500" /> },
    { name: 'Communication', score: feedback?.score_breakdown?.communication, icon: <MessageSquare className="w-4 h-4 text-amber-500" /> },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 antialiased py-10 px-6 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onGoToHome}>
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-md shadow-primary/10">
              <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 7a2 2 0 012 2m-3 4H3m9 9a9 9 0 01-9-9V9a9 9 0 019-9h9a2 2 0 012 2v3m-7 7v6m-4-3h4" />
              </svg>
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-white">
              Clear<span className="text-primary">Hire</span>
            </span>
          </div>
          
          <button
            onClick={onGoToHome}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Exit Report
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl border border-zinc-900 bg-zinc-900/20 backdrop-blur-xl p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8 text-left">
            <div className="space-y-3">
              <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                Official Feedback Report
              </span>
              <h1 className="text-2xl md:text-3xl font-display font-extrabold text-white">
                Your Assessment Feedback
              </h1>
              <p className="text-xs md:text-sm text-zinc-400 max-w-xl leading-relaxed">
                Here's a summary of your assessment performance and personalized feedback.
              </p>
            </div>

            {/* Overall Score Circle */}
            <div className="flex flex-col items-center bg-zinc-950/60 p-6 rounded-2xl border border-zinc-900 w-full md:w-44 flex-shrink-0">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2">Overall Score</span>
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="transparent" className="stroke-zinc-900" strokeWidth="6" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    className="stroke-primary"
                    strokeWidth="6"
                    strokeDasharray="282.7"
                    strokeDashoffset={282.7 - (282.7 * (feedback?.overall_score || 0)) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-2xl font-display font-extrabold text-white">
                  {feedback?.overall_score}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
          
          {/* Left Side: Score Breakdown */}
          <div className="md:col-span-6 space-y-6">
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/10 p-5 md:p-6 space-y-6">
              <h3 className="text-sm font-display font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" /> Evaluation Categories
              </h3>
              
              <div className="space-y-4">
                {breakdownItems.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2 text-zinc-300">
                        {item.icon}
                        <span className="font-semibold">{item.name}</span>
                      </div>
                      <span className="font-mono font-bold text-white">{item.score !== undefined ? `${item.score}/100` : '--'}</span>
                    </div>
                    
                    <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        style={{ width: `${item.score || 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths Card */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/10 p-5 md:p-6 space-y-4">
              <h3 className="text-sm font-display font-bold text-white flex items-center gap-2">
                <CheckCircle className="w-4.5 h-4.5 text-accent" /> YOUR STRENGTHS
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/40 p-4 rounded-xl border border-zinc-900/60">
                {feedback?.strengths}
              </p>
            </div>
          </div>

          {/* Right Side: AI Feedback & Improvement */}
          <div className="md:col-span-6 space-y-6">
            
            {/* Personalized Feedback */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/10 p-5 md:p-6 space-y-4">
              <h3 className="text-sm font-display font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" /> PERSONALIZED FEEDBACK
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/40 p-4 rounded-xl border border-zinc-900/60">
                {feedback?.personalized_feedback}
              </p>
            </div>

            {/* Areas for Improvement */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/10 p-5 md:p-6 space-y-4">
              <h3 className="text-sm font-display font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-500" /> AREAS FOR IMPROVEMENT
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/40 p-4 rounded-xl border border-zinc-900/60">
                {feedback?.areas_for_improvement}
              </p>
            </div>

            {/* Suggested Topics to Learn */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/10 p-5 md:p-6 space-y-4">
              <h3 className="text-sm font-display font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-500" /> SUGGESTED TOPICS
              </h3>
              <div className="flex flex-wrap gap-2">
                {feedback?.suggested_topics?.map((topic: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-[10px] font-semibold px-3 py-1.5 rounded-lg border border-purple-500/20 bg-purple-500/5 text-purple-300"
                  >
                    {topic}
                  </span>
                ))}
                {(!feedback?.suggested_topics || feedback.suggested_topics.length === 0) && (
                  <span className="text-xs text-zinc-555">No recommendations required. Great job!</span>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
