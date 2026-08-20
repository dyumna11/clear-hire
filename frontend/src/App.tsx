import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhyNow from './components/WhyNow'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Benefits from './components/Benefits'
import TransparencyScoreCard from './components/TransparencyScoreCard'
import HiringDnaCard from './components/HiringDnaCard'
import ProductPreview from './components/ProductPreview'
import Vision from './components/Vision'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import RecruiterDashboard from './components/RecruiterDashboard'
import CandidateFeedback from './components/CandidateFeedback'

export default function App() {
  // App views: 'landing', 'recruiter', or 'candidate-feedback'
  const [view, setView] = useState<'landing' | 'recruiter' | 'candidate-feedback'>('landing')
  const [candidateRouteParams, setCandidateRouteParams] = useState<{ assessmentId: number; token: string } | null>(null)
  const [demoTriggered, setDemoTriggered] = useState(false)

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme ? savedTheme === 'dark' : true
  })

  // Sync theme selection to root document class list
  useEffect(() => {
    const root = window.document.documentElement
    if (darkMode) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  // Parse path to support direct feedback URL routing
  useEffect(() => {
    const path = window.location.pathname
    const match = path.match(/\/candidate\/assessments\/(\d+)\/feedback/i)
    if (match) {
      const assessmentId = parseInt(match[1], 10)
      const params = new URLSearchParams(window.location.search)
      const token = params.get('token') || ''
      setCandidateRouteParams({ assessmentId, token })
      setView('candidate-feedback')
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Handle routing navigation callback triggers
  const handleGoToDashboard = () => {
    setDemoTriggered(false)
    setView('recruiter')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleGoToDemo = () => {
    setDemoTriggered(true)
    setView('recruiter')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleGoToHome = () => {
    setDemoTriggered(false)
    setView('landing')
    window.history.pushState({}, '', '/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (view === 'candidate-feedback' && candidateRouteParams) {
    return (
      <CandidateFeedback
        assessmentId={candidateRouteParams.assessmentId}
        token={candidateRouteParams.token}
        onGoToHome={handleGoToHome}
      />
    )
  }

  if (view === 'recruiter') {
    return (
      <RecruiterDashboard
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onGoToHome={handleGoToHome}
        demoTriggered={demoTriggered}
        clearDemoTriggered={() => setDemoTriggered(false)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300 antialiased selection:bg-primary/20 selection:text-primary">
      {/* Floating navigation header bar with navigation triggers */}
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onGoToDashboard={handleGoToDashboard}
        onGoToDemo={handleGoToDemo}
      />

      {/* Main Sections */}
      <main>
        {/* Hero Section containing headline, report preview mockup and buttons */}
        <Hero
          onGoToDashboard={handleGoToDashboard}
          onGoToDemo={handleGoToDemo}
        />

        {/* Why Now Section displaying critical market evaluation stats */}
        <WhyNow />

        {/* Features list (Reports, Intelligence, Recruiter Dashboard) */}
        <Features />

        {/* Modular animated workflow chart sequence */}
        <HowItWorks />

        {/* Mutual Benefits breakdown for candidate & recruiter */}
        <Benefits />

        {/* Transparency Score Signature Card */}
        <TransparencyScoreCard />

        {/* Hiring DNA comparison profiles (Google vs Cisco) */}
        <HiringDnaCard />

        {/* Double Dashboard visual portal displays */}
        <ProductPreview
          onNavigateToFeedback={(assessmentId, token) => {
            setCandidateRouteParams({ assessmentId, token })
            setView('candidate-feedback')
            window.history.pushState({}, '', `/candidate/assessments/${assessmentId}/feedback?token=${encodeURIComponent(token)}`)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />

        {/* Corporate transparency pipeline vision */}
        <Vision />

        {/* Expanded 7-Question FAQ Section */}
        <FAQ />
      </main>

      {/* Structured Footer with links and socials */}
      <Footer />
    </div>
  )
}
