import { motion } from 'framer-motion'
import { Check, ShieldAlert, ArrowRight, ShieldCheck } from 'lucide-react'

export default function TransparencyScoreCard() {
  const score = 87
  const strokeDashoffset = 282.7 - (282.7 * score) / 100

  const included = [
    'Hiring stages shared',
    'Evaluation categories shared',
    'AI explanation provided',
    'Learning roadmap linked',
    'Recruiter-defined framework used',
  ]

  const protectedItems = [
    'Coding questions hidden',
    'Hidden test cases isolated',
    'Internal ranking secret',
    'Cutoff scores protected',
  ]

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full filter blur-[100px] -z-10" />

      <div className="max-w-4xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16 text-left md:text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/5 dark:bg-primary/10 border border-primary/10">
            Signature Feature
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white">
            Transparency Score™
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Establish candidate confidence with a quantifiable standard of application feedback honesty.
          </p>
        </div>

        {/* Dashboard Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-gray-200/80 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/40 backdrop-blur-xl shadow-premium p-6 md:p-8 space-y-8 hover:shadow-primary/5 hover:border-primary/15 transition-all duration-300"
        >
          {/* Main Visual Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Radial Chart */}
            <div className="md:col-span-5 flex flex-col items-center text-center space-y-4">
              <div className="relative w-44 h-44 flex items-center justify-center">
                {/* Glow ring */}
                <div className="absolute inset-0 bg-primary/10 dark:bg-primary/5 rounded-full filter blur-[12px] animate-pulse-slow" />
                
                {/* SVG Radial chart */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background Track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    className="stroke-zinc-100 dark:stroke-zinc-800"
                    strokeWidth="8"
                  />
                  {/* Active Progress */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    className="stroke-primary"
                    strokeWidth="8"
                    strokeDasharray="282.7"
                    initial={{ strokeDashoffset: 282.7 }}
                    whileInView={{ strokeDashoffset }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    strokeLinecap="round"
                  />
                </svg>
                
                {/* Inner Text info */}
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-display font-extrabold text-zinc-900 dark:text-white">
                    {score}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 dark:text-zinc-500 mt-0.5">
                    out of 100
                  </span>
                </div>
              </div>

              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
                  Excellent Transparency
                </span>
              </div>
            </div>

            {/* Right Column: Parameters List */}
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              
              {/* Included Checklist */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  Included Information
                </h4>
                <ul className="space-y-2.5">
                  {included.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      <Check className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Protected Checklist */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-accent" />
                  Protected Secrets
                </h4>
                <ul className="space-y-2.5">
                  {protectedItems.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

          {/* Bottom explanations and CTA */}
          <div className="pt-6 border-t border-gray-100 dark:border-zinc-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">
              The Transparency Score™ measures how transparent a hiring process is while protecting confidential assessments. It represents the degree of rubric visibility and guidance detail provided.
            </p>
            <button className="flex-shrink-0 text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1 cursor-pointer transition-colors group">
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </motion.div>

      </div>
    </section>
  )
}
