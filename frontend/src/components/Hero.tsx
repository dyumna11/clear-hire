import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import ReportPreviewMockup from './ReportPreviewMockup'

interface HeroProps {
  onGoToDashboard: () => void
}

export default function Hero({ onGoToDashboard }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white dark:bg-zinc-950">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100 -z-10" />
      
      {/* Dynamic ambient glow circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 dark:bg-primary/5 rounded-full filter blur-[80px] -z-10 animate-pulse-slow" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-accent/5 rounded-full filter blur-[60px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center space-y-8">
        
        {/* Banner Announcement */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 dark:border-primary/10 bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 text-xs font-semibold cursor-pointer group"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
          <span>✨ Explainable Hiring™</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-normal">Trusted by Early Adopters</span>
        </motion.div>

        {/* Big Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-zinc-900 dark:text-white max-w-4xl mx-auto leading-[1.1]"
        >
          Bring transparency to <br className="hidden md:inline" /> every{' '}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            hiring decision.
          </span>
        </motion.h1>

        {/* Alternative highlighted text as secondary subtitle block */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm font-semibold tracking-wider uppercase text-accent/80 font-mono"
        >
          Technical hiring shouldn't be a black box.
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 max-w-3xl mx-auto font-normal leading-relaxed"
        >
          ClearHire is the Explainable Hiring Platform that enables organizations to provide transparent, structured hiring reports while protecting confidential assessments, proprietary evaluation logic, and company hiring workflows.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <button
            onClick={onGoToDashboard}
            type="button"
            className="w-full sm:w-auto relative group overflow-hidden bg-primary hover:bg-primary-hover text-white font-medium px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/30 flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <span>Request Demo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={onGoToDashboard}
            type="button"
            className="w-full sm:w-auto font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-gray-50 dark:bg-zinc-900/60 border border-gray-200/60 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 px-8 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer text-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current text-zinc-500" />
            <span>View Candidate Report</span>
          </button>
        </motion.div>

        {/* Report Preview Wrapper */}
        <div className="relative pt-16 md:pt-20 max-w-5xl mx-auto">
          {/* Fading bottom overlay */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-3/5 bg-gradient-to-tr from-primary/10 to-accent/10 rounded-full filter blur-[100px] -z-10" />

          {/* Render Mockup */}
          <div className="transform transition-transform duration-500">
            <ReportPreviewMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
