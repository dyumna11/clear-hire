import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  FileBarChart2,
  Settings,
  ShieldCheck,
  Search,
  Bell,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Plus,
  ArrowRight,
  CheckCircle,
  FileText,
  Clock,
  LogOut,
  FolderOpen,
  Lock
} from 'lucide-react'
import CreateCampaignModal from './CreateCampaignModal'
import ThemeToggle from './ThemeToggle'
import UploadResults from './UploadResults'
import EvaluationMapping from './EvaluationMapping'

interface Campaign {
  role: string
  status: string
  candidates: number
  reportsGenerated: string
  transparencyScore: number
}

interface RecruiterDashboardProps {
  darkMode: boolean
  toggleDarkMode: () => void
  onGoToHome: () => void
}

export default function RecruiterDashboard({ darkMode, toggleDarkMode, onGoToHome }: RecruiterDashboardProps) {
  const [isEmptyState, setIsEmptyState] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Subview routing
  const [subView, setSubView] = useState<'overview' | 'upload_results' | 'evaluation_mapping'>('overview')
  const [selectedCampaign, setSelectedCampaign] = useState<string>('')

  // Default active campaigns
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      role: 'Software Engineer (Backend)',
      status: 'Active',
      candidates: 148,
      reportsGenerated: '148/148',
      transparencyScore: 92,
    },
    {
      role: 'Frontend Developer',
      status: 'Active',
      candidates: 180,
      reportsGenerated: '175/180',
      transparencyScore: 84,
    },
    {
      role: 'QA Automation Engineer',
      status: 'Completed',
      candidates: 90,
      reportsGenerated: '90/90',
      transparencyScore: 90,
    },
    {
      role: 'Product Manager',
      status: 'Draft',
      candidates: 0,
      reportsGenerated: '0/0',
      transparencyScore: 0,
    },
  ])

  // Notifications dropdown simulation
  const [showNotifications, setShowNotifications] = useState(false)
  const notifications = [
    { text: 'Alex Rivera viewed transparency report', time: '10 min ago' },
    { text: 'Sarah Jenkins accepted offer letter', time: '4 hours ago' },
    { text: 'Campaign Software Engineer Backend synchronized', time: '5 hours ago' },
  ]

  // Main menu links
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, active: true },
    { name: 'Campaigns', icon: <FolderOpen className="w-4 h-4" /> },
    { name: 'Candidates', icon: <Users className="w-4 h-4" /> },
    { name: 'Reports', icon: <FileText className="w-4 h-4" /> },
    { name: 'Analytics', icon: <FileBarChart2 className="w-4 h-4" /> },
    { name: 'Transparency Score', icon: <ShieldCheck className="w-4 h-4" /> },
    { name: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ]

  const metrics = [
    {
      title: 'Active Campaigns',
      value: isEmptyState ? '0' : '3',
      trend: '+1 this week',
      isPositive: true,
      icon: <FolderOpen className="w-4.5 h-4.5 text-primary" />,
      chart: (
        <svg viewBox="0 0 100 30" className="w-20 h-8">
          <path d="M0,25 Q25,10 50,15 T100,5" fill="none" stroke="#6D5EF8" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: 'Candidates Evaluated',
      value: isEmptyState ? '0' : '1,420',
      trend: '+12% vs last cohort',
      isPositive: true,
      icon: <Users className="w-4.5 h-4.5 text-accent" />,
      chart: (
        <svg viewBox="0 0 100 30" className="w-20 h-8">
          <path d="M0,25 Q25,20 50,10 T100,2" fill="none" stroke="#10B981" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: 'Reports Generated',
      value: isEmptyState ? '0' : '1,385',
      trend: '98% completion rate',
      isPositive: true,
      icon: <FileText className="w-4.5 h-4.5 text-purple-500" />,
      chart: (
        <svg viewBox="0 0 100 30" className="w-20 h-8">
          <path d="M0,25 L30,15 L70,8 L100,2" fill="none" stroke="#a855f7" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: 'Transparency Score',
      value: isEmptyState ? '--' : '86/100',
      trend: '+2 points increase',
      isPositive: true,
      icon: <ShieldCheck className="w-4.5 h-4.5 text-blue-500" />,
      chart: (
        <svg viewBox="0 0 100 30" className="w-20 h-8">
          <path d="M0,20 Q40,15 70,5 T100,8" fill="none" stroke="#3b82f6" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: 'Candidate Satisfaction',
      value: isEmptyState ? '--' : '4.7/5',
      trend: '+0.2 satisfaction index',
      isPositive: true,
      icon: <Sparkles className="w-4.5 h-4.5 text-amber-500" />,
      chart: (
        <svg viewBox="0 0 100 30" className="w-20 h-8">
          <path d="M0,25 Q30,10 60,12 T100,2" fill="none" stroke="#f59e0b" strokeWidth="2" />
        </svg>
      ),
    },
  ]

  const funnelStages = [
    { stage: 'Applications', count: 1420, pct: 100 },
    { stage: 'Resume Screen', count: 920, pct: 64 },
    { stage: 'Online Assessment', count: 650, pct: 45 },
    { stage: 'Evaluation', count: 480, pct: 33 },
    { stage: 'Interview', count: 210, pct: 14 },
    { stage: 'Offer', count: 18, pct: 1.2 },
  ]

  const recentReports = [
    { name: 'Alex Rivera', role: 'Backend Engineer', status: 'Not Selected', time: '2 hours ago' },
    { name: 'Sarah Jenkins', role: 'Full Stack Dev', status: 'Selected', time: '4 hours ago' },
    { name: 'David Kim', role: 'QA Analyst', status: 'In Interview', time: '1 day ago' },
  ]

  const activityFeed = [
    { text: 'Campaign Created: "Software Engineer (Backend)"', time: '2 hours ago', type: 'create' },
    { text: 'CSV Uploaded: "Acme_OA_Candidates.csv" (240 rows)', time: '4 hours ago', type: 'upload' },
    { text: 'Reports Generated: 240 transparency reports compiled', time: '5 hours ago', type: 'generate' },
    { text: 'Candidate Viewed Report: Alex Rivera reviewed feedback', time: '10 min ago', type: 'view' },
  ]

  const handleCreateCampaign = (newCamp: Campaign) => {
    setCampaigns([newCamp, ...campaigns])
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
                onClick={() => setSubView('overview')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
                  item.active && subView === 'overview'
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
              S
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900 dark:text-white">Sarah 👋</div>
              <div className="text-[10px] text-zinc-400">Acme Corp TA</div>
            </div>
          </div>
          
          <button
            onClick={onGoToHome}
            type="button"
            className="p-1.5 rounded-lg border border-gray-150 dark:border-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            aria-label="Logout to Landing Page"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="h-16 border-b border-gray-200/80 dark:border-zinc-900 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md px-6 md:px-8 flex items-center justify-between sticky top-0 z-40">
          {/* Company Switcher */}
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200/60 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-xs font-semibold cursor-pointer">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
              <span>Acme Corp</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            </div>

            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-150 dark:border-zinc-900 bg-zinc-50/30 dark:bg-zinc-900/30 w-72">
              <Search className="w-3.5 h-3.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search candidates, reports..."
                className="w-full text-xs bg-transparent focus:outline-none placeholder-zinc-400 border-none"
              />
            </div>
          </div>

          {/* Right Header items */}
          <div className="flex items-center gap-3">
            {/* Onboarding Empty state toggle selector */}
            <button
              onClick={() => setIsEmptyState(!isEmptyState)}
              type="button"
              className="text-[10px] font-bold px-2 py-1.5 rounded-lg border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-all cursor-pointer mr-2"
            >
              Toggle Onboarding View
            </button>

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
                {!isEmptyState && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
                )}
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
                        Recent Notifications
                      </h4>
                      <div className="space-y-2">
                        {notifications.map((notif, idx) => (
                          <div key={idx} className="text-xs border-b border-gray-50 dark:border-zinc-900/60 pb-2 space-y-0.5">
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

            {/* Profile image avatar */}
            <div className="w-8.5 h-8.5 rounded-full bg-zinc-150 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs text-zinc-700 dark:text-zinc-200 border border-gray-100 dark:border-zinc-900">
              Sarah
            </div>
          </div>
        </header>

        {/* Dashboard Content Container */}
        <div className="p-6 md:p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-64px)] no-scrollbar text-left">
          
          {subView === 'upload_results' ? (
            <UploadResults
              campaignName={selectedCampaign}
              onBack={() => setSubView('overview')}
              onContinue={() => setSubView('evaluation_mapping')}
            />
          ) : subView === 'evaluation_mapping' ? (
            <EvaluationMapping
              campaignName={selectedCampaign}
              onBack={() => setSubView('upload_results')}
              onContinue={() => setSubView('overview')}
            />
          ) : (
            <>
              {/* Top Greeting row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-display font-extrabold text-zinc-900 dark:text-white">
                    Welcome back, Sarah 👋
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

              {/* Metric cards grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-gray-200/60 dark:border-zinc-900 bg-white dark:bg-zinc-950 shadow-premium flex flex-col justify-between h-36 relative overflow-hidden group hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
                        {metric.title}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center border border-gray-100 dark:border-zinc-800">
                        {metric.icon}
                      </div>
                    </div>

                    <div className="mt-2 space-y-1">
                      <div className="text-xl md:text-2xl font-display font-extrabold text-zinc-900 dark:text-white">
                        {metric.value}
                      </div>
                      <div className="flex items-center gap-1 text-[9px] font-semibold text-accent">
                        {metric.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        <span>{metric.trend}</span>
                      </div>
                    </div>

                    {/* Mini chart SVG panel */}
                    <div className="absolute bottom-0 right-0 left-0 h-8 opacity-25 group-hover:opacity-50 transition-opacity pointer-events-none overflow-hidden">
                      {metric.chart}
                    </div>
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {isEmptyState ? (
                  /* ELEGANT EMPTY STATE ONBOARDING */
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
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
                  /* DASHBOARD POPULATED STATE GRID */
                  <motion.div
                    key="populated"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                  >
                    {/* Left Side: Campaigns table & Funnel */}
                    <div className="lg:col-span-8 space-y-8">
                      
                      {/* Recent Campaigns Table */}
                      <div className="rounded-2xl border border-gray-200/60 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-5 md:p-6 shadow-premium space-y-4">
                        <h3 className="text-base font-display font-bold text-zinc-900 dark:text-white">
                          Recent Campaigns
                        </h3>
                        
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs text-left">
                            <thead>
                              <tr className="border-b border-gray-100 dark:border-zinc-900 text-zinc-400 dark:text-zinc-500 pb-2">
                                <th className="py-2.5 font-bold uppercase tracking-wider">Role</th>
                                <th className="py-2.5 font-bold uppercase tracking-wider">Status</th>
                                <th className="py-2.5 font-bold uppercase tracking-wider">Candidates</th>
                                <th className="py-2.5 font-bold uppercase tracking-wider">Reports Sync</th>
                                <th className="py-2.5 font-bold uppercase tracking-wider">Transparency Score</th>
                                <th className="py-2.5 font-bold uppercase tracking-wider">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {campaigns.map((camp, idx) => (
                                <tr key={idx} className="border-b border-gray-50 dark:border-zinc-900/60 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition-colors">
                                  <td className="py-3.5 font-semibold text-zinc-800 dark:text-zinc-200">{camp.role}</td>
                                  <td className="py-3.5">
                                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                                      camp.status === 'Completed'
                                        ? 'bg-zinc-100 border-zinc-200 text-zinc-500'
                                        : camp.status === 'Draft'
                                        ? 'bg-amber-500/5 border-amber-500/10 text-amber-500'
                                        : 'bg-accent/5 border-accent/15 text-accent'
                                    }`}>
                                      {camp.status}
                                    </span>
                                  </td>
                                  <td className="py-3.5 font-mono text-zinc-650 dark:text-zinc-400">{camp.candidates}</td>
                                  <td className="py-3.5 font-mono text-zinc-650 dark:text-zinc-400">{camp.reportsGenerated}</td>
                                  <td className="py-3.5">
                                    {camp.transparencyScore > 0 ? (
                                      <span className="font-mono font-bold text-primary">{camp.transparencyScore}/100</span>
                                    ) : (
                                      <span className="text-zinc-400">--</span>
                                    )}
                                  </td>
                                  <td className="py-3.5">
                                    <button
                                      onClick={() => {
                                        setSelectedCampaign(camp.role)
                                        setSubView('upload_results')
                                      }}
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

                      {/* Hiring Funnel visual breakdown */}
                      <div className="rounded-2xl border border-gray-200/60 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-5 md:p-6 shadow-premium space-y-6">
                        <div>
                          <h3 className="text-base font-display font-bold text-zinc-900 dark:text-white">
                            Hiring Funnel Progression
                          </h3>
                          <p className="text-xs text-zinc-400 mt-0.5">Aggregate candidate conversion stats across all campaigns.</p>
                        </div>

                        <div className="space-y-4">
                          {funnelStages.map((stage, idx) => (
                            <div key={idx} className="space-y-1.5 text-xs">
                              <div className="flex justify-between items-center text-zinc-700 dark:text-zinc-300">
                                <span className="font-semibold">{stage.stage}</span>
                                <div className="flex items-center gap-2 font-mono">
                                  <span className="font-bold text-zinc-900 dark:text-white">{stage.count}</span>
                                  <span className="text-[10px] text-zinc-400">({stage.pct}%)</span>
                                </div>
                              </div>
                              
                              <div className="h-2 w-full bg-gray-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${stage.pct}%` }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.8, delay: idx * 0.05 }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Right Side Panels */}
                    <div className="lg:col-span-4 space-y-8">
                      
                      {/* Transparency Score Panel */}
                      <div className="rounded-2xl border border-gray-200/60 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-5 md:p-6 shadow-premium space-y-6">
                        <h3 className="text-sm font-display font-bold text-zinc-900 dark:text-white">
                          Overall Transparency Score
                        </h3>

                        <div className="flex flex-col items-center text-center space-y-3">
                          <div className="relative w-32 h-32 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90 animate-pulse-slow" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r="45" fill="transparent" className="stroke-zinc-100 dark:stroke-zinc-900" strokeWidth="8" />
                              <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="transparent"
                                className="stroke-primary"
                                strokeWidth="8"
                                strokeDasharray="282.7"
                                strokeDashoffset={282.7 - (282.7 * 86) / 100}
                                strokeLinecap="round"
                              />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                              <span className="text-2xl font-display font-extrabold text-zinc-900 dark:text-white">86</span>
                              <span className="text-[9px] uppercase tracking-widest text-zinc-450 block">out of 100</span>
                            </div>
                          </div>
                          <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-accent/15 text-accent border border-accent/20">
                            Excellent Transparency
                          </span>
                        </div>

                        {/* Breakdown settings lists */}
                        <div className="space-y-4 pt-2 border-t border-gray-50 dark:border-zinc-900/60">
                          
                          <div className="space-y-2 text-[11px] font-semibold text-zinc-700 dark:text-zinc-355">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block mb-1">
                              Included Metrics
                            </span>
                            {['Hiring stages', 'Evaluation categories', 'Learning roadmap', 'AI explanation'].map((item) => (
                              <div key={item} className="flex items-center gap-2">
                                <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                                <span>{item} shared</span>
                              </div>
                            ))}
                          </div>

                          <div className="space-y-2 text-[11px] font-semibold text-zinc-700 dark:text-zinc-355 pt-2 border-t border-gray-50 dark:border-zinc-900/60">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block mb-1">
                              Protected Secrets
                            </span>
                            <div className="flex items-center gap-2">
                              <Lock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                              <span>Coding questions hidden</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Lock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                              <span>Internal test cases hidden</span>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* Recent reports generated */}
                      <div className="rounded-2xl border border-gray-200/60 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-5 md:p-6 shadow-premium space-y-4">
                        <h3 className="text-sm font-display font-bold text-zinc-900 dark:text-white">
                          Recent Candidate Reports
                        </h3>

                        <div className="space-y-3">
                          {recentReports.map((report, idx) => (
                            <div key={idx} className="flex justify-between items-center text-xs pb-3 border-b border-gray-50 dark:border-zinc-900/50">
                              <div>
                                <div className="font-semibold text-zinc-805 dark:text-zinc-200">{report.name}</div>
                                <div className="text-[10px] text-zinc-450 mt-0.5">{report.role} &bull; {report.time}</div>
                              </div>
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                                report.status === 'Selected'
                                  ? 'bg-accent/10 text-accent'
                                  : report.status === 'Not Selected'
                                  ? 'bg-red-500/10 text-red-500'
                                  : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-850'
                              }`}>
                                {report.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Activity Feed */}
                      <div className="rounded-2xl border border-gray-200/60 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-5 md:p-6 shadow-premium space-y-4">
                        <h3 className="text-sm font-display font-bold text-zinc-900 dark:text-white">
                          System Activity Logs
                        </h3>

                        <div className="space-y-4">
                          {activityFeed.map((activity, idx) => (
                            <div key={idx} className="flex gap-3 text-xs items-start">
                              <div className="mt-0.5 w-6 h-6 rounded-lg bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center flex-shrink-0 text-zinc-400">
                                <Clock className="w-3.5 h-3.5" />
                              </div>
                              <div className="space-y-0.5">
                                <p className="text-zinc-650 dark:text-zinc-300 leading-snug">{activity.text}</p>
                                <span className="text-[10px] text-zinc-400 dark:text-zinc-555 block">{activity.time}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}

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
