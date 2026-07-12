import { motion } from 'framer-motion'
import { Building, Laptop, Settings2, ShieldCheck, FileText, Compass, ChevronRight } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      title: 'Company',
      desc: 'The employer initiates a recruitment campaign and defines the general evaluation rubric.',
      icon: <Building className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />,
      sub: 'HR & Campaign config',
    },
    {
      title: 'Assessment Platform',
      desc: 'Candidates test via HackerRank, CodeSignal, internal company tools, or Excel/CSV uploads.',
      icon: <Laptop className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />,
      sub: 'Raw evaluation source',
    },
    {
      title: 'Evaluation Mapping Engine',
      desc: 'ClearHire securely links assessment results to the specified company rubric fields.',
      icon: <Settings2 className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />,
      sub: 'Metadata alignment',
    },
    {
      title: 'ClearHire',
      desc: 'Redacts raw answers, validates integrity indicators, and compiles structured feedback summaries.',
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
      sub: 'Anonymization & security',
      highlight: true,
    },
    {
      title: 'Explainable Hiring Report',
      desc: 'Generates candidate-facing insights detailing campaign stages, metrics, and key areas.',
      icon: <FileText className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />,
      sub: 'Candidate visualization',
    },
    {
      title: 'Candidate Learning Roadmap',
      desc: 'Extracts skill gaps and links customized training topics directly into the applicant dashboard.',
      icon: <Compass className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />,
      sub: 'Actionable progression',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white dark:bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16 md:mb-24">
          <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/5 dark:bg-primary/10 border border-primary/10">
            Pipeline Workflow
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white">
            How ClearHire Works
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            ClearHire sits after evaluation phases to transform raw test outcomes into secure, transparent feedback.
          </p>
        </div>

        {/* Workflow timeline grid layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`relative rounded-3xl p-6 border transition-all duration-300 ${
                step.highlight
                  ? 'bg-primary/5 dark:bg-primary/10 border-primary/20 dark:border-primary/30 shadow-lg shadow-primary/5'
                  : 'bg-zinc-50/40 dark:bg-zinc-900/10 border-gray-100 dark:border-zinc-900/60 shadow-premium'
              } hover:border-primary/20 group`}
            >
              {/* Step indicator */}
              <div className="absolute top-4 right-6 text-2xl font-mono font-bold text-zinc-200 dark:text-zinc-800">
                {(idx + 1).toString().padStart(2, '0')}
              </div>

              <div className="flex items-start gap-4">
                {/* Icon wrapper */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0 ${
                  step.highlight
                    ? 'bg-primary text-white border-primary shadow-md'
                    : 'bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border-gray-100 dark:border-zinc-850'
                }`}>
                  {step.icon}
                </div>

                <div className="space-y-1.5 text-left">
                  <h3 className="text-sm font-display font-bold text-zinc-900 dark:text-white pr-6 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono block">
                    {step.sub}
                  </span>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed pt-1 pr-2">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* Connecting indicators (Desktop / Grid flow helper) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-20 w-8 h-8 items-center justify-center text-zinc-300 dark:text-zinc-800 pointer-events-none group-hover:translate-x-0.5 transition-transform">
                  <ChevronRight className="w-5 h-5" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Visual Connector Timeline Diagram Below */}
        <div className="mt-16 p-6 rounded-2xl border border-gray-100 dark:border-zinc-900 bg-zinc-50/20 dark:bg-zinc-900/10 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-[10px] sm:text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            <span>Company</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-900 border border-gray-200/40 dark:border-zinc-800">Assessment Platform</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Mapping Engine</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20 font-bold">ClearHire</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Explainable Report</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Learning Roadmap</span>
          </div>
        </div>

      </div>
    </section>
  )
}
