import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Sparkles, BarChart3, LineChart, ShieldCheck, ArrowUpRight } from 'lucide-react'

export default function Features() {
  const features = [
    {
      badge: 'Explainable Reports',
      title: 'Explainable Hiring Reports',
      desc: 'Generate structured reports explaining hiring outcomes without exposing confidential questions, hidden test cases or proprietary scoring.',
      icon: <Sparkles className="w-5 h-5 text-primary" />,
      visual: (
        <div className="w-full rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-gray-100 dark:border-zinc-800 p-4 space-y-4 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-zinc-800/80">
            <span className="font-semibold text-zinc-900 dark:text-white">Coding Assessment</span>
            <span className="text-primary font-bold">88 / 100</span>
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[10px] text-zinc-400 dark:text-zinc-500 mb-0.5">
                <span>Code Modularity</span>
                <span>Excellent</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '92%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] text-zinc-400 dark:text-zinc-500 mb-0.5">
                <span>Time Complexity</span>
                <span>Optimizable</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: '65%' }} />
              </div>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/5 text-[11px] text-zinc-600 dark:text-zinc-300 leading-relaxed">
            💡 <strong>AI Suggestion:</strong> Practice nested-loop refactoring and explore recursion caching to resolve space inefficiencies.
          </div>
        </div>
      ),
    },
    {
      badge: 'Aggregate Metrics',
      title: 'Hiring Intelligence',
      desc: 'Aggregate hiring trends, campaign analytics, evaluation insights and community patterns.',
      icon: <BarChart3 className="w-5 h-5 text-accent" />,
      visual: (
        <div className="w-full rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-gray-100 dark:border-zinc-800 p-4 space-y-4">
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2 rounded-xl bg-white dark:bg-zinc-950/50 border border-gray-100 dark:border-zinc-900">
              <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">Avg Score</div>
              <div className="text-base font-bold text-zinc-900 dark:text-white mt-0.5">82.4%</div>
              <div className="text-[9px] text-accent font-semibold flex items-center justify-center mt-0.5 gap-0.5">
                +4.2% <span className="text-[8px] font-normal text-zinc-400">vs last cohort</span>
              </div>
            </div>
            <div className="p-2 rounded-xl bg-white dark:bg-zinc-950/50 border border-gray-100 dark:border-zinc-900">
              <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">Completion Rate</div>
              <div className="text-base font-bold text-zinc-900 dark:text-white mt-0.5">94.1%</div>
              <div className="text-[9px] text-primary font-semibold flex items-center justify-center mt-0.5 gap-0.5">
                Fast <span className="text-[8px] font-normal text-zinc-400">&bull; 40 min avg</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between text-zinc-500">
              <span>Hiring Funnel Stage Reach</span>
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">240 Candidates</span>
            </div>
            <div className="flex h-3 rounded bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
              <div className="bg-primary/90 h-full" style={{ width: '45%' }} title="Assessment" />
              <div className="bg-primary/60 h-full" style={{ width: '30%' }} title="Interview" />
              <div className="bg-accent h-full" style={{ width: '15%' }} title="Hired" />
              <div className="bg-zinc-300 dark:bg-zinc-700 h-full" style={{ width: '10%' }} title="Rejected" />
            </div>
          </div>
        </div>
      ),
    },
    {
      badge: 'Actionable Dashboard',
      title: 'Recruiter Transparency Dashboard',
      desc: 'Configure evaluation rubrics, generate reports, monitor hiring funnels and improve candidate experience.',
      icon: <LineChart className="w-5 h-5 text-purple-500" />,
      visual: (
        <div className="w-full rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-gray-100 dark:border-zinc-800 p-4 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Candidate NPS</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/25">
              Excellent
            </span>
          </div>
          
          {/* Custom SVG Line Chart */}
          <div className="w-full h-20">
            <svg viewBox="0 0 300 100" className="w-full h-full">
              <defs>
                <linearGradient id="gradient-chart" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6D5EF8" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#6D5EF8" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(128,128,128,0.1)" strokeWidth="1" />
              <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(128,128,128,0.1)" strokeWidth="1" />
              <line x1="0" y1="80" x2="300" y2="80" stroke="rgba(128,128,128,0.1)" strokeWidth="1" />
              
              <path
                d="M0,80 Q50,40 100,55 T200,25 T300,30 L300,100 L0,100 Z"
                fill="url(#gradient-chart)"
              />
              <path
                d="M0,80 Q50,40 100,55 T200,25 T300,30"
                fill="none"
                stroke="#6D5EF8"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="100" cy="55" r="4" fill="#6D5EF8" stroke="white" strokeWidth="1.5" />
              <circle cx="200" cy="25" r="4" fill="#10B981" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
          
          <div className="flex justify-between items-center text-[9px] text-zinc-400 mt-2">
            <span>Aug 26</span>
            <span>Sep 26</span>
            <span>Oct 26 (Current)</span>
          </div>
        </div>
      ),
    },
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  }

  return (
    <section id="features" className="py-20 md:py-28 bg-zinc-50/50 dark:bg-zinc-900/10 border-y border-gray-100 dark:border-zinc-900/60 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16 md:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 dark:bg-accent/10 text-accent text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Why ClearHire</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white">
            Built for candidate trust. Engineered for campaign safety.
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            A comprehensive transparency solution that seamlessly connects candidate curiosity with secure, recruiter-defined assessment constraints.
          </p>
        </div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="flex flex-col justify-between rounded-3xl border border-gray-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-6 md:p-8 shadow-premium hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-zinc-900 flex items-center justify-center border border-gray-100 dark:border-zinc-800">
                  {feature.icon}
                </div>
                
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                    {feature.badge}
                  </span>
                  <h3 className="text-lg font-display font-bold text-zinc-900 dark:text-white flex items-center gap-1 group-hover:text-primary transition-colors">
                    {feature.title} <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4">
                {feature.visual}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
