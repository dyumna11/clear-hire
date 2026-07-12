import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import {
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  UploadCloud,
  FileSpreadsheet,
  ChevronRight,
  Eye,
  Lock,
  Heart,
  Zap,
  Star,
  TrendingUp
} from 'lucide-react'

interface CreateCampaignModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (campaign: {
    role: string
    status: string
    candidates: number
    reportsGenerated: string
    transparencyScore: number
  }) => void
}

type Step = 1 | 2 | 3 | 4 | 5
type Preset = 'Minimal' | 'Balanced' | 'Transparent' | 'Custom'

export default function CreateCampaignModal({ isOpen, onClose, onCreate }: CreateCampaignModalProps) {
  const [step, setStep] = useState<Step>(1)

  // Step 1: Campaign Details State
  const [company, setCompany] = useState('Acme Corp')
  const [role, setRole] = useState('')
  const [department, setDepartment] = useState('Engineering')
  const [location, setLocation] = useState('Remote, US')
  const [empType, setEmpType] = useState('Full Time')
  const [candidates, setCandidates] = useState(148)
  const [desc, setDesc] = useState('We are looking for a backend engineer with strong recursion and system design basics...')
  const [timeline, setTimeline] = useState('Oct 10 - Oct 24')
  const [deadline, setDeadline] = useState('2026-10-24')

  // Step 2: Assessment Source State
  const [source, setSource] = useState('HackerRank')
  const [fileName, setFileName] = useState<string | null>(null)
  const [fileSize, setFileSize] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Step 3: Evaluation Mapping State
  const [mappings, setMappings] = useState([
    { col: 'coding_score', target: 'Coding Performance', confidence: 98, verified: true },
    { col: 'runtime', target: 'Runtime Efficiency', confidence: 96, verified: true },
    { col: 'os_score', target: 'Operating Systems', confidence: 92, verified: true },
    { col: 'dbms', target: 'Database Systems', confidence: 94, verified: true },
    { col: 'remarks', target: 'Internal Notes (Hidden)', confidence: 99, verified: true },
  ])

  // Step 4: Transparency Policy State
  const [activePreset, setActivePreset] = useState<Preset>('Balanced')

  // Visible to Candidates
  const [timelineShared, setTimelineShared] = useState(true)
  const [categoriesShared, setCategoriesShared] = useState(true)
  const [strengthsShared, setStrengthsShared] = useState(true)
  const [growthShared, setGrowthShared] = useState(false)
  const [aiExplanationShared, setAiExplanationShared] = useState(true)
  const [learningShared, setLearningShared] = useState(true)
  const [prepShared, setPrepShared] = useState(false)
  const [recommendationShared, setRecommendationShared] = useState(false)

  // Protected Information (checked means it IS protected/hidden, unchecked means shared)
  const [questionsProtected, setQuestionsProtected] = useState(true)
  const [casesProtected, setCasesProtected] = useState(true)
  const [rankingProtected, setRankingProtected] = useState(true)
  const [percentileProtected, setPercentileProtected] = useState(true)
  const [cutoffProtected, setCutoffProtected] = useState(true)
  const [notesProtected, setNotesProtected] = useState(true)
  const [commentsProtected, setCommentsProtected] = useState(true)
  const [logicProtected, setLogicProtected] = useState(true)

  // Synchronize Preset choices with visibility toggles
  useEffect(() => {
    if (activePreset === 'Minimal') {
      setTimelineShared(true)
      setCategoriesShared(false)
      setStrengthsShared(false)
      setGrowthShared(false)
      setAiExplanationShared(false)
      setLearningShared(false)
      setPrepShared(false)
      setRecommendationShared(false)
      
      setQuestionsProtected(true)
      setCasesProtected(true)
      setRankingProtected(true)
      setPercentileProtected(true)
      setCutoffProtected(true)
      setNotesProtected(true)
      setCommentsProtected(true)
      setLogicProtected(true)
    } else if (activePreset === 'Balanced') {
      setTimelineShared(true)
      setCategoriesShared(true)
      setStrengthsShared(true)
      setGrowthShared(false)
      setAiExplanationShared(true)
      setLearningShared(true)
      setPrepShared(false)
      setRecommendationShared(false)

      setQuestionsProtected(true)
      setCasesProtected(true)
      setRankingProtected(true)
      setPercentileProtected(true)
      setCutoffProtected(true)
      setNotesProtected(true)
      setCommentsProtected(true)
      setLogicProtected(true)
    } else if (activePreset === 'Transparent') {
      setTimelineShared(true)
      setCategoriesShared(true)
      setStrengthsShared(true)
      setGrowthShared(true)
      setAiExplanationShared(true)
      setLearningShared(true)
      setPrepShared(true)
      setRecommendationShared(true)

      setQuestionsProtected(true)
      setCasesProtected(true)
      setRankingProtected(true)
      setPercentileProtected(true)
      setCutoffProtected(true)
      setNotesProtected(true)
      setCommentsProtected(true)
      setLogicProtected(true)
    }
  }, [activePreset])

  if (!isOpen) return null

  // Calculate Transparency Score dynamically
  const calculateScore = () => {
    let base = 50
    if (timelineShared) base += 6
    if (categoriesShared) base += 6
    if (strengthsShared) base += 6
    if (growthShared) base += 6
    if (aiExplanationShared) base += 6
    if (learningShared) base += 6
    if (prepShared) base += 6
    if (recommendationShared) base += 6

    if (!questionsProtected) base += 2
    if (!casesProtected) base += 2
    if (!rankingProtected) base += 2
    if (!percentileProtected) base += 2
    if (!cutoffProtected) base += 2
    if (!notesProtected) base += 2
    if (!commentsProtected) base += 2
    if (!logicProtected) base += 2

    return Math.min(base, 100)
  }

  const score = calculateScore()

  // Calculate dynamic Candidate Satisfaction based on transparency score
  const getSatisfactionData = () => {
    if (score < 60) return { pct: 48, stars: 2, label: 'Low Candidate Trust' }
    if (score < 80) return { pct: 76, stars: 4, label: 'Moderate Branding Impact' }
    return { pct: 93, stars: 5, label: 'High Candidate Branding Output' }
  }

  const satData = getSatisfactionData()

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true)
    } else if (e.type === 'dragleave') {
      setIsDragging(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setFileName(file.name)
      setFileSize(`${(file.size / 1024).toFixed(1)} KB`)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFileName(file.name)
      setFileSize(`${(file.size / 1024).toFixed(1)} KB`)
    }
  }

  const handlePublish = () => {
    onCreate({
      role,
      status: 'Active',
      candidates,
      reportsGenerated: `0/${candidates}`,
      transparencyScore: score,
    })
    onClose()
  }

  const stepVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-6xl rounded-3xl border border-gray-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-premium overflow-hidden text-left grid grid-cols-1 lg:grid-cols-12 h-[90vh]"
      >
        {/* Left Column: Form Setup (col-span-7) */}
        <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between overflow-y-auto border-r border-gray-100 dark:border-zinc-900/60 no-scrollbar">
          
          {/* Header Progress indicator */}
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">
                  Step {step} of 5 &bull; CAMPAIGN SETUP
                </span>
                <h3 className="text-xl font-display font-bold text-zinc-900 dark:text-white mt-0.5">
                  Create Hiring Campaign
                </h3>
              </div>
              <button
                onClick={onClose}
                type="button"
                className="p-1.5 rounded-lg border border-gray-150 dark:border-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-900 text-zinc-400 hover:text-zinc-700 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Stepper Progress Indicator */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="flex-1 flex flex-col gap-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all ${
                      s <= step ? 'bg-primary' : 'bg-gray-100 dark:bg-zinc-800'
                    }`}
                  />
                  <span className={`text-[8.5px] font-bold uppercase tracking-wider hidden sm:block ${
                    s === step ? 'text-primary' : 'text-zinc-400 dark:text-zinc-650'
                  }`}>
                    {s === 1 && 'Details'}
                    {s === 2 && 'Source'}
                    {s === 3 && 'Mapping'}
                    {s === 4 && 'Policy'}
                    {s === 5 && 'Publish'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Core steps content areas */}
          <div className="my-8 flex-1 min-h-[40vh]">
            <AnimatePresence mode="wait">
              
              {/* Step 1: Details */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6 text-left"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-zinc-850 dark:text-zinc-200">Campaign Details</h4>
                    <p className="text-xs text-zinc-400">Define the hiring campaign before configuring transparency.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Company</label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Role Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Software Engineer (Backend)"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Department</label>
                      <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Location</label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Employment Type</label>
                      <select
                        value={empType}
                        onChange={(e) => setEmpType(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none cursor-pointer"
                      >
                        <option value="Full Time">Full Time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Expected Candidates</label>
                      <input
                        type="number"
                        value={candidates}
                        onChange={(e) => setCandidates(parseInt(e.target.value) || 0)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5 col-span-2">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Timeline & Deadline</label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={timeline}
                          onChange={(e) => setTimeline(e.target.value)}
                          placeholder="Oct 10 - Oct 24"
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                        />
                        <input
                          type="date"
                          value={deadline}
                          onChange={(e) => setDeadline(e.target.value)}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5 col-span-2">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Job Description</label>
                      <textarea
                        rows={2}
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Assessment Source */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6 text-left"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-zinc-850 dark:text-zinc-200">Assessment Source</h4>
                    <p className="text-xs text-zinc-400">Select where candidate performance outcomes originate.</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      'HackerRank',
                      'CodeSignal',
                      'Codility',
                      'LeetCode Enterprise',
                      'Internal Assessment',
                      'CSV',
                      'Excel',
                      'JSON',
                      'Manual Entry',
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSource(opt)}
                        className={`p-4 rounded-2xl border text-center font-semibold text-xs transition-all cursor-pointer ${
                          source === opt
                            ? 'border-primary bg-primary/10 text-primary shadow'
                            : 'border-gray-200/60 dark:border-zinc-850 hover:border-zinc-400'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {/* Drag and Drop box */}
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`relative rounded-3xl border-2 border-dashed p-8 text-center flex flex-col items-center justify-center space-y-3 transition-colors ${
                      isDragging
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 dark:border-zinc-800 bg-zinc-50/20 dark:bg-zinc-950/20'
                    }`}
                  >
                    <UploadCloud className="w-8 h-8 text-zinc-400" />
                    <div>
                      <label className="text-xs font-bold text-primary hover:underline cursor-pointer">
                        Upload Candidate Results File
                        <input
                          type="file"
                          accept=".csv,.xlsx,.json"
                          className="hidden"
                          onChange={handleFileSelect}
                        />
                      </label>
                      <p className="text-[10px] text-zinc-400 mt-1">Drag & Drop CSV, Excel, or JSON here (Max 10MB)</p>
                    </div>

                    {fileName && (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-accent/20 bg-accent/5 text-accent text-xs">
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                        <span>{fileName} ({fileSize})</span>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Evaluation Mapping */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6 text-left"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-zinc-850 dark:text-zinc-200">Evaluation Mapping</h4>
                    <p className="text-xs text-zinc-400">Map imported source columns directly to structured evaluation categories.</p>
                  </div>

                  <div className="space-y-3">
                    {mappings.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl border border-gray-150 dark:border-zinc-900 bg-zinc-50/20 dark:bg-zinc-900/10 gap-3"
                      >
                        <div className="space-y-1 text-left">
                          <code className="text-xs font-bold text-zinc-750 dark:text-zinc-350 px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900">
                            {item.col}
                          </code>
                          <span className="text-[10px] text-zinc-450 dark:text-zinc-500 block">Imported Column</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 text-zinc-300 dark:text-zinc-700 hidden sm:block" />
                          <div className="text-left">
                            <select
                              value={item.target}
                              onChange={(e) => {
                                const newMap = [...mappings]
                                newMap[idx].target = e.target.value
                                setMappings(newMap)
                              }}
                              className="text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 focus:outline-none cursor-pointer"
                            >
                              <option value="Coding Performance">Coding Performance</option>
                              <option value="Runtime Efficiency">Runtime Efficiency</option>
                              <option value="Operating Systems">Operating Systems</option>
                              <option value="Database Systems">Database Systems</option>
                              <option value="Internal Notes (Hidden)">Internal Notes (Hidden)</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-accent/15 text-accent border border-accent/20">
                            <Sparkles className="w-3 h-3 animate-pulse" /> AI Suggested
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400 font-bold">{item.confidence}% confidence</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Transparency Policy */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6 text-left"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-zinc-850 dark:text-zinc-200 font-display">Transparency Policy™</h4>
                    <p className="text-xs text-zinc-450">Define the exact transparency levels candidates will receive post-assessment.</p>
                  </div>

                  {/* Preset selections */}
                  <div className="p-4 rounded-2xl border border-gray-150 dark:border-zinc-900 bg-zinc-50/20 dark:bg-zinc-900/10 space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-450 dark:text-zinc-550 block">
                      Transparency Levels™ Presets
                    </span>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { name: 'Minimal', label: 'Minimal', desc: 'Timeline only' },
                        { name: 'Balanced', label: 'Balanced ⭐', desc: 'Timeline, scores, AI' },
                        { name: 'Transparent', label: 'Transparent', desc: 'Timeline, skills, roadmap' },
                        { name: 'Custom', label: 'Custom', desc: 'Configure options manually' },
                      ].map((p) => (
                        <button
                          key={p.name}
                          type="button"
                          onClick={() => setActivePreset(p.name as Preset)}
                          className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                            activePreset === p.name
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-gray-200/60 dark:border-zinc-850 hover:border-zinc-400'
                          }`}
                        >
                          <span className="text-xs font-bold">{p.label}</span>
                          <span className="text-[9px] text-zinc-400 dark:text-zinc-500 mt-1 font-medium">{p.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Split checklist policies */}
                  <div className="space-y-6">
                    {/* VISIBLE TO CANDIDATES */}
                    <div className="space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                        <Check className="w-4 h-4" /> Visible To Candidates
                      </span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { label: 'Hiring Timeline', val: timelineShared, setter: setTimelineShared, desc: 'Candidate sees progress timeline dates.' },
                          { label: 'Evaluation Categories', val: categoriesShared, setter: setCategoriesShared, desc: 'Candidate sees categorical scores.' },
                          { label: 'Strengths', val: strengthsShared, setter: setStrengthsShared, desc: 'Highlights candidates top areas.' },
                          { label: 'Growth Areas', val: growthShared, setter: setGrowthShared, desc: 'Identifies developmental optimizations.' },
                          { label: 'AI Explanation', val: aiExplanationShared, setter: setAiExplanationShared, desc: 'Textual synthesis explanation of scoring gaps.' },
                          { label: 'Learning Roadmap', val: learningShared, setter: setLearningShared, desc: 'Study resource links tailored to categories.' },
                          { label: 'Interview Prep Resources', val: prepShared, setter: setPrepShared, desc: 'Officially curated manuals and references.' },
                          { label: 'Overall Recommendation', val: recommendationShared, setter: setRecommendationShared, desc: 'Hiring suggestion parameters details.' },
                        ].map((t) => (
                          <div
                            key={t.label}
                            onClick={() => {
                              setActivePreset('Custom')
                              t.setter(!t.val)
                            }}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer text-left space-y-1 relative group ${
                              t.val
                                ? 'border-accent bg-accent/5 dark:bg-accent/10 shadow-sm'
                                : 'border-gray-150 dark:border-zinc-900 bg-white dark:bg-zinc-950'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{t.label}</span>
                              <span className={`w-2 h-2 rounded-full ${t.val ? 'bg-accent' : 'bg-gray-200 dark:bg-zinc-800'}`} />
                            </div>
                            <p className="text-[10px] text-zinc-400 dark:text-zinc-550 leading-snug">{t.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* PROTECTED INFORMATION */}
                    <div className="space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" /> Protected Information (Secrets)
                      </span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { label: 'Coding Questions', val: questionsProtected, setter: setQuestionsProtected, desc: 'Hides raw assessment problem sets.' },
                          { label: 'Hidden Test Cases', val: casesProtected, setter: setCasesProtected, desc: 'Hides backend validation runs.' },
                          { label: 'Internal Rankings', val: rankingProtected, setter: setRankingProtected, desc: 'Hides positional rank in cohort.' },
                          { label: 'Percentile', val: percentileProtected, setter: setPercentileProtected, desc: 'Hides comparative cohort percentiles.' },
                          { label: 'Cutoff Score', val: cutoffProtected, setter: setCutoffProtected, desc: 'Keeps campaign target scores private.' },
                          { label: 'Interviewer Notes', val: notesProtected, setter: setNotesProtected, desc: 'Redacts hiring panel feedback.' },
                          { label: 'Internal Comments', val: commentsProtected, setter: setCommentsProtected, desc: 'Redacts internal administrative logs.' },
                          { label: 'Selection Logic', val: logicProtected, setter: setLogicProtected, desc: 'Hides automatic filter triggers.' },
                        ].map((t) => (
                          <div
                            key={t.label}
                            onClick={() => {
                              setActivePreset('Custom')
                              t.setter(!t.val)
                            }}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer text-left space-y-1 relative group ${
                              t.val
                                ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-sm'
                                : 'border-gray-150 dark:border-zinc-900 bg-white dark:bg-zinc-950'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{t.label}</span>
                              <span className={`w-2 h-2 rounded-full ${t.val ? 'bg-primary' : 'bg-gray-200 dark:bg-zinc-800'}`} />
                            </div>
                            <p className="text-[10px] text-zinc-400 dark:text-zinc-550 leading-snug">{t.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}

              {/* Step 5: Review & Publish */}
              {step === 5 && (
                <motion.div
                  key="step5"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6 text-left"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-zinc-850 dark:text-zinc-200">Review & Publish</h4>
                    <p className="text-xs text-zinc-400">Review configurations before generating transparent reports.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl border border-gray-150 dark:border-zinc-900">
                      <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">CAMPAIGN DETAILS</span>
                      <div className="mt-2 space-y-1 text-xs">
                        <div className="font-bold text-zinc-850 dark:text-zinc-200">{role || 'Untitled Role'}</div>
                        <div className="text-zinc-500 font-medium">{company} &bull; {department} &bull; {empType}</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl border border-gray-150 dark:border-zinc-900">
                      <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">ASSESSMENT DATA</span>
                      <div className="mt-2 space-y-1 text-xs">
                        <div className="font-bold text-zinc-850 dark:text-zinc-200">{source}</div>
                        <div className="text-zinc-500 font-medium">{fileName ? `${fileName} (${fileSize})` : 'No file synced'}</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl border border-gray-150 dark:border-zinc-900 col-span-2 space-y-2">
                      <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block font-display">TRANSPARENCY SUMMARY</span>
                      <div className="flex flex-wrap gap-1.5">
                        {timelineShared && <span className="px-2 py-0.5 rounded bg-accent/10 text-accent font-semibold text-[9px] border border-accent/20">Timeline Shared</span>}
                        {categoriesShared && <span className="px-2 py-0.5 rounded bg-accent/10 text-accent font-semibold text-[9px] border border-accent/20">Scores Shared</span>}
                        {aiExplanationShared && <span className="px-2 py-0.5 rounded bg-accent/10 text-accent font-semibold text-[9px] border border-accent/20">AI Explanation Shared</span>}
                        {learningShared && <span className="px-2 py-0.5 rounded bg-accent/10 text-accent font-semibold text-[9px] border border-accent/20">Roadmap Shared</span>}
                        {strengthsShared && <span className="px-2 py-0.5 rounded bg-accent/10 text-accent font-semibold text-[9px] border border-accent/20">Strengths Shared</span>}
                        {growthShared && <span className="px-2 py-0.5 rounded bg-accent/10 text-accent font-semibold text-[9px] border border-accent/20">Growth Shared</span>}
                      </div>
                    </div>
                  </div>

                  {/* Estimated Report Generation panel */}
                  <div className="p-5 rounded-2xl border border-gray-150 dark:border-zinc-900 bg-zinc-50/20 dark:bg-zinc-900/10 grid grid-cols-3 gap-4 text-center">
                    <div className="space-y-1">
                      <span className="text-[9.5px] font-bold text-zinc-400 uppercase tracking-wider block">REPORTS TO GENERATE</span>
                      <div className="text-xl font-display font-extrabold text-zinc-800 dark:text-zinc-200">{candidates}</div>
                    </div>
                    
                    <div className="space-y-1 border-x border-gray-100 dark:border-zinc-900">
                      <span className="text-[9.5px] font-bold text-zinc-400 uppercase tracking-wider block">EST. PROCESSING TIME</span>
                      <div className="text-xl font-display font-extrabold text-zinc-800 dark:text-zinc-200">
                        {Math.ceil(candidates * 0.12)} Sec
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9.5px] font-bold text-zinc-400 uppercase tracking-wider block">ESTIMATED EMAILS</span>
                      <div className="text-xl font-display font-extrabold text-zinc-850 dark:text-zinc-200">{candidates}</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-accent/5 dark:bg-accent/10 border border-accent/10 flex justify-between items-center text-xs font-semibold">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-accent animate-pulse" />
                      <div>
                        <div className="text-zinc-800 dark:text-zinc-250 font-bold">Ready to Publish</div>
                        <div className="text-[10px] text-zinc-400">All columns successfully mapped to rubrics</div>
                      </div>
                    </div>
                    
                    <span className="font-mono text-xs text-accent font-extrabold">Score Index: {score}/100</span>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Stepper navigation buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-100 dark:border-zinc-900/80">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => (prev - 1) as Step)}
                className="font-bold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-900/60 border border-gray-200/60 dark:border-zinc-800 px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => (prev + 1) as Step)}
                className="bg-primary hover:bg-primary-hover text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-primary/10 cursor-pointer text-xs"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="font-bold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-900/60 border border-gray-200/60 dark:border-zinc-800 px-4 py-2.5 rounded-xl transition-colors cursor-pointer text-xs"
                >
                  Save Draft
                </button>
                <button
                  type="button"
                  onClick={handlePublish}
                  className="bg-accent hover:bg-accent-hover text-white font-bold px-5 py-2.5 rounded-xl shadow-md shadow-accent/10 transition-colors cursor-pointer text-xs flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" /> Publish Policy™
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Sticky Candidate Preview (col-span-5) */}
        <div className="lg:col-span-5 p-6 md:p-8 bg-zinc-50/50 dark:bg-zinc-950/40 flex flex-col justify-between overflow-y-auto no-scrollbar border-t lg:border-t-0 border-gray-100 dark:border-zinc-900">
          
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">STICKY LIVE PREVIEW</span>
              <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Candidate Report Preview</h4>
            </div>

            {/* Candidate Mockup Preview Container */}
            <div className="rounded-2xl border border-gray-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-5 shadow-sm space-y-6 text-xs text-left">
              
              {/* Fake status bar */}
              <div className="flex justify-between items-center pb-3 border-b border-gray-50 dark:border-zinc-900/60">
                <span className="font-semibold text-zinc-850 dark:text-zinc-200">{role || 'Software Engineer Intern'}</span>
                <span className="px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-500 font-bold text-[9px]">
                  Not Selected
                </span>
              </div>

              {/* Dynamic Timeline */}
              {timelineShared && (
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">Timeline Shared</span>
                  <div className="flex justify-between text-[10px] text-zinc-650 dark:text-zinc-400 font-medium">
                    <span>Resume Screened ✓</span>
                    <span>OA Complete ✓</span>
                    <span>Shortlist ✗</span>
                  </div>
                </div>
              )}

              {/* Dynamic Categories progress indicators */}
              {categoriesShared && (
                <div className="space-y-3">
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">Evaluation Areas</span>
                  <div className="space-y-2">
                    {[
                      { name: 'Coding Performance', score: 85 },
                      { name: 'CS Fundamentals', score: 55 },
                    ].map((m) => (
                      <div key={m.name} className="space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span>{m.name}</span>
                          <span className="font-bold">{m.score}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${m.score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dynamic Strengths / Growth */}
              {(strengthsShared || growthShared) && (
                <div className="grid grid-cols-2 gap-4 p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/30 border border-gray-150 dark:border-zinc-900">
                  {strengthsShared && (
                    <div className="space-y-1 text-left">
                      <span className="text-[9px] font-bold text-zinc-400 uppercase">STRENGTHS</span>
                      <div className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-350">Problem Solving</div>
                    </div>
                  )}
                  {growthShared && (
                    <div className="space-y-1 text-left">
                      <span className="text-[9px] font-bold text-zinc-400">GROWTH AREAS</span>
                      <div className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-355">Operating Systems</div>
                    </div>
                  )}
                </div>
              )}

              {/* Dynamic AI Explanation */}
              {aiExplanationShared && (
                <div className="p-3.5 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/10 space-y-1">
                  <span className="text-[9px] font-bold text-primary uppercase">AI Explanation</span>
                  <p className="text-[10px] text-zinc-650 dark:text-zinc-350 leading-relaxed font-medium">
                    "Candidates progressing to interviews generally demonstrated stronger performance in CS fundamentals."
                  </p>
                </div>
              )}

              {/* Dynamic Roadmap */}
              {learningShared && (
                <div className="p-3 rounded-xl border border-accent/15 bg-accent/5 flex justify-between items-center">
                  <div className="space-y-0.5 text-left">
                    <span className="text-[9px] font-bold text-accent uppercase">LEARNING ROADMAP</span>
                    <div className="text-[10px] text-zinc-600 dark:text-zinc-450 font-bold">SQL & &bull; Operating Systems</div>
                  </div>
                  <Eye className="w-3.5 h-3.5 text-accent" />
                </div>
              )}

              {/* Dynamic Recommendation */}
              {recommendationShared && (
                <div className="p-3.5 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10 text-left">
                  <span className="text-[9px] font-bold text-accent uppercase block">OVERALL RECOMMENDATION</span>
                  <p className="text-[10px] text-zinc-600 dark:text-zinc-400 font-medium mt-1">Recommended for interview review.</p>
                </div>
              )}

              {/* Mapped Internal Secrets - Redacted/Masked visual guides */}
              <div className="pt-3 border-t border-gray-50 dark:border-zinc-900/60 grid grid-cols-2 gap-2 text-[9px] font-bold text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-primary flex-shrink-0" />
                  <span>Rankings: Redacted</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-primary flex-shrink-0" />
                  <span>Notes: Redacted</span>
                </div>
              </div>

            </div>
          </div>

          {/* Radial Transparency Score Card & Candidate Satisfaction */}
          <div className="pt-6 border-t border-gray-100 dark:border-zinc-900 space-y-6">
            
            {/* Radial score card */}
            <div className="grid grid-cols-12 items-center gap-4 text-left">
              {/* Radial Score Dial */}
              <div className="col-span-5 relative w-24 h-24 flex items-center justify-center mx-auto">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="transparent" className="stroke-zinc-100 dark:stroke-zinc-900" strokeWidth="8" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    className="stroke-primary"
                    strokeWidth="8"
                    strokeDasharray="282.7"
                    strokeDashoffset={282.7 - (282.7 * score) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-xl font-display font-extrabold text-zinc-900 dark:text-white">{score}</span>
                  <span className="text-[7.5px] uppercase tracking-widest text-zinc-450 block">out of 100</span>
                </div>
              </div>

              {/* Checklist Parameters details */}
              <div className="col-span-7 space-y-2">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-400 tracking-wider">TRANSPARENCY SCORE™</span>
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Excellent Transparency</span>
                </div>
                
                <div className="grid grid-cols-2 gap-1 text-[8.5px] font-semibold text-zinc-500 dark:text-zinc-450">
                  <div>{timelineShared ? '✓ Timeline Shared' : '✗ Timeline Hidden'}</div>
                  <div>{categoriesShared ? '✓ Categories Shared' : '✗ Categories Hidden'}</div>
                  <div>{aiExplanationShared ? '✓ AI Explanation' : '✗ AI Hidden'}</div>
                  <div>{learningShared ? '✓ Roadmap Shared' : '✗ Roadmap Hidden'}</div>
                  <div>{rankingProtected ? '✓ Rankings Hidden' : '✗ Rankings Shared'}</div>
                  <div>{cutoffProtected ? '✓ Cutoffs Hidden' : '✗ Cutoffs Shared'}</div>
                  <div>{casesProtected ? '✓ Test Cases Hidden' : '✗ Test Cases Shared'}</div>
                </div>
              </div>
            </div>

            {/* Candidate Experience Meter */}
            <div className="p-4 rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/30 border border-gray-150 dark:border-zinc-900 text-left space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[9.5px] font-bold text-zinc-400 uppercase tracking-wider">Candidate Experience Meter</span>
                <div className="flex gap-0.5 text-amber-500">
                  {Array.from({ length: satData.stars }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm font-extrabold text-zinc-800 dark:text-zinc-200">
                  Est. Satisfaction: <span className="text-accent">{satData.pct}%</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[9px] font-bold text-accent">
                  <TrendingUp className="w-3.5 h-3.5" /> High Trust
                </span>
              </div>

              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-snug font-medium">
                Organizations with similar transparency settings typically experience higher candidate satisfaction and stronger employer branding.
              </p>
            </div>

            {/* Company Promise card */}
            <div className="p-4 rounded-2xl bg-primary/5 dark:bg-primary/10 border border-primary/10 text-left space-y-1.5">
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-[9.5px] font-bold text-primary uppercase tracking-wider">Company Promise Pledge</span>
              </div>
              <p className="text-[10px] text-zinc-650 dark:text-zinc-350 leading-relaxed font-medium">
                <strong>{company}</strong> commits to providing every candidate with Timeline, Categories, AI Explanation, and Growth details, while protecting proprietary assessments.
              </p>
            </div>

          </div>

        </div>

      </motion.div>
    </div>
  )
}
