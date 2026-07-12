import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { AlertCircle, HelpCircle, ShieldCheck } from 'lucide-react'

export default function WhyNow() {
  const stats = [
    {
      metric: '90%',
      title: 'No Meaningful Feedback',
      desc: 'Candidates receive no meaningful feedback after rejection, leading to generic emails and frustration.',
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      borderColor: 'border-red-500/10 hover:border-red-500/25',
      glowColor: 'bg-red-500/5',
    },
    {
      metric: 'Thousands',
      title: 'Opaque Assessments',
      desc: 'Technical assessments are completed every day without transparent outcomes or learning explanations.',
      icon: <HelpCircle className="w-5 h-5 text-primary" />,
      borderColor: 'border-primary/10 hover:border-primary/25',
      glowColor: 'bg-primary/5',
    },
    {
      metric: '100%',
      title: 'Strict Confidentiality',
      desc: 'Assessment confidentiality remains protected. Coding prompts and test inputs are never exposed.',
      icon: <ShieldCheck className="w-5 h-5 text-accent" />,
      borderColor: 'border-accent/10 hover:border-accent/25',
      glowColor: 'bg-accent/5',
    },
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
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
    <section id="why-now" className="py-20 md:py-28 bg-zinc-50/50 dark:bg-zinc-900/10 border-t border-gray-100 dark:border-zinc-900/60 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-100 -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16 md:mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-accent px-3 py-1 rounded-full bg-accent/5 dark:bg-accent/10 border border-accent/10">
            Market Context
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white">
            Technical hiring has become a black box.
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Millions of candidates prepare for technical interviews every year yet receive little or no explanation after rejection.
          </p>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className={`relative rounded-3xl border bg-white dark:bg-zinc-950 p-8 shadow-premium transition-all duration-300 overflow-hidden group ${stat.borderColor}`}
            >
              {/* Decorative radial blur gradient on card hover */}
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-full filter blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 ${stat.glowColor}`} />
              
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-zinc-900 flex items-center justify-center border border-gray-100 dark:border-zinc-800">
                    {stat.icon}
                  </div>
                  <span className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-zinc-900 dark:text-white bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
                    {stat.metric}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-display font-bold text-zinc-900 dark:text-white">
                    {stat.title}
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
