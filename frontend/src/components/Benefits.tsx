import { motion } from 'framer-motion'
import { Award, UserCheck, ShieldCheck, Check } from 'lucide-react'

export default function Benefits() {
  const candidateBenefits = [
    { text: 'Understand hiring outcomes' },
    { text: 'Know evaluation categories' },
    { text: 'Receive AI learning roadmap' },
    { text: 'Improve interview preparation' },
    { text: 'Build trust' },
  ]

  const recruiterBenefits = [
    { text: 'Improve employer branding' },
    { text: 'Reduce support requests' },
    { text: 'Standardize communication' },
    { text: 'Configure evaluation visibility' },
    { text: 'Protect confidential assessments' },
  ]

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  }

  return (
    <section id="benefits" className="py-20 md:py-28 bg-zinc-50/50 dark:bg-zinc-900/10 border-t border-gray-100 dark:border-zinc-900/60">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16 md:mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-accent px-3 py-1 rounded-full bg-accent/5 dark:bg-accent/10 border border-accent/10">
            Mutual Benefits
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white">
            Built for candidates. Designed for recruiters.
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            ClearHire fosters confidence, helping recruiters save communication hours while giving candidates the feedback they need.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Candidates Benefit Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="rounded-3xl border border-gray-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-8 shadow-premium space-y-8 hover:border-primary/20 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">FOR CANDIDATES</span>
                <h3 className="text-xl font-display font-bold text-zinc-900 dark:text-white">
                  Actionable Transparency
                </h3>
              </div>
            </div>

            <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Understand outcomes so you can learn which areas to target for future campaigns and interviews.
            </p>

            <ul className="space-y-3.5">
              {candidateBenefits.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Recruiters Benefit Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="rounded-3xl border border-gray-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-8 shadow-premium space-y-8 hover:border-accent/20 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">FOR RECRUITERS</span>
                <h3 className="text-xl font-display font-bold text-zinc-900 dark:text-white">
                  Confidential Campaigns
                </h3>
              </div>
            </div>

            <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Define what categories candidates can review, automating feedback updates without sharing question files.
            </p>

            <ul className="space-y-3.5">
              {recruiterBenefits.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* Highlight Banner (Quick Stats) */}
        <div className="mt-16 p-8 md:p-10 rounded-3xl border border-gray-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 shadow-premium flex flex-col md:flex-row items-center justify-between gap-8 hover:shadow-accent/5 transition-all duration-300 text-left">
          <div className="space-y-2 max-w-xl">
            <h4 className="text-lg font-display font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-accent" />
              100% Protected Assessments
            </h4>
            <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
              ClearHire integrates behind existing test platforms. Candidates review score distributions and concepts, while raw prompts, codes, and test files remain secure.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
