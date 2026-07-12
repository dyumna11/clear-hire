import { motion } from 'framer-motion'
import { Check, X, ShieldCheck, Lock, AlertCircle, HelpCircle } from 'lucide-react'

export default function ReportPreviewMockup() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  }

  const childVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="w-full max-w-3xl mx-auto rounded-3xl border border-red-500/10 dark:border-red-500/10 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl shadow-premium overflow-hidden text-left"
    >
      {/* Top Banner indicating status */}
      <div className="bg-red-500/5 dark:bg-red-500/10 border-b border-red-500/10 dark:border-red-500/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <span className="text-xs font-semibold text-red-600 dark:text-red-400">
            Hiring Campaign Finished &bull; Candidate Feedback Available
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400 bg-red-500/10 px-2.5 py-0.5 rounded-full border border-red-500/20">
          Not Selected
        </span>
      </div>

      {/* Header Info */}
      <div className="p-6 md:p-8 border-b border-gray-100 dark:border-zinc-900/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              ClearHire Transparency Report
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-accent">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Secure
            </span>
          </div>
          <h3 className="text-xl font-display font-bold text-zinc-900 dark:text-white">
            Software Engineer (Backend)
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Campaign Ref: <code className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-zinc-800">CH-DEC-5012</code> &bull; Tech Corp
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-800 dark:text-zinc-200">
            TC
          </div>
          <div>
            <div className="text-xs text-zinc-400 dark:text-zinc-500">Evaluated</div>
            <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Nov 28, 2026</div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        
        {/* Timeline Progress */}
        <motion.div variants={childVariants}>
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
            Campaign Timeline
          </h4>
          
          <div className="grid grid-cols-4 gap-2 relative">
            <div className="absolute top-2.5 left-[12.5%] right-[12.5%] h-0.5 bg-gray-100 dark:bg-zinc-800 -z-10" />
            
            {[
              { title: 'Resume Screened', checked: true },
              { title: 'Online Assessment', checked: true },
              { title: 'Evaluation', checked: true },
              { title: 'Interview Shortlist', checked: false, failed: true },
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    step.failed
                      ? 'bg-red-500 text-white ring-4 ring-red-500/20'
                      : step.checked
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 dark:bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {step.failed ? <X className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                </div>
                <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mt-2 block">
                  {step.title}
                </span>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                  {step.failed ? 'Not Shortlisted' : 'Completed'}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Breakdown details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Rubric metrics */}
          <div className="md:col-span-7 space-y-6">
            <motion.div variants={childVariants}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
                Evaluation Areas
              </h4>
              
              <div className="space-y-4">
                {[
                  { name: 'Coding Accuracy', score: 85, weight: 'High', color: 'bg-primary' },
                  { name: 'Runtime Efficiency', score: 60, weight: 'Medium', color: 'bg-primary/80' },
                  { name: 'CS Fundamentals', score: 55, weight: 'High', color: 'bg-amber-500' },
                  { name: 'Resume Match', score: 78, weight: 'Medium', color: 'bg-zinc-400 dark:bg-zinc-600' },
                  { name: 'Integrity Check', score: 100, weight: 'Mandatory', color: 'bg-accent' },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1 group">
                    <div className="flex justify-between items-center text-xs md:text-sm">
                      <span className="font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-primary transition-colors">
                        {item.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400">
                          {item.weight}
                        </span>
                        <span className="font-mono font-bold text-zinc-900 dark:text-white">
                          {item.score}%
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${item.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Safety lock */}
            <motion.div 
              variants={childVariants}
              className="relative rounded-2xl border border-gray-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/30 p-5 overflow-hidden"
            >
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3 flex items-center gap-1.5">
                Evaluated Coding Questions
              </h4>
              
              <div className="space-y-3 filter blur-[2px] pointer-events-none select-none">
                <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4"></div>
                <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
              </div>

              <div className="absolute inset-0 bg-white/70 dark:bg-zinc-950/85 backdrop-blur-[6px] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2 animate-pulse">
                  <Lock className="w-5 h-5" />
                </div>
                <h5 className="text-xs font-bold text-zinc-900 dark:text-white">
                  Assessment Protection Active
                </h5>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 max-w-xs mt-0.5">
                  Coding prompts, test cases, and candidate input streams are hidden to protect campaign confidentiality.
                </p>
              </div>
            </motion.div>
          </div>

          {/* AI explanations */}
          <div className="md:col-span-5 flex flex-col justify-between gap-6">
            <motion.div 
              variants={childVariants}
              className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-gray-100 dark:border-zinc-900 space-y-4"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                  Verified Strengths
                </span>
                <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mt-1">
                  &bull; Problem Solving
                </p>
                <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mt-0.5">
                  &bull; Code Quality
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-500">
                  Growth Areas
                </span>
                <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mt-1">
                  &bull; Operating Systems
                </p>
                <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mt-0.5">
                  &bull; Database Design
                </p>
              </div>
            </motion.div>

            <motion.div 
              variants={childVariants}
              className="p-5 rounded-2xl bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 space-y-3"
            >
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-primary">
                AI Explanation
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Candidates progressing to interviews generally demonstrated stronger performance in CS fundamentals.
              </p>
            </motion.div>

            <motion.div 
              variants={childVariants}
              className="p-5 rounded-2xl border border-gray-100 dark:border-zinc-900 bg-white dark:bg-zinc-900/20 space-y-3"
            >
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
                Recommended Learning <HelpCircle className="w-3.5 h-3.5 text-zinc-400" />
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {['SQL', 'Operating Systems', 'Concurrency'].map((course) => (
                  <span
                    key={course}
                    className="text-[10px] px-2 py-1 rounded bg-gray-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </motion.div>
  )
}
