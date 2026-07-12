import { motion } from 'framer-motion'
import { Database, ShieldCheck, ChevronRight, GraduationCap, FileCheck } from 'lucide-react'

export default function Vision() {
  const flow = [
    { name: 'Assessment Platform', desc: 'Raw score generation', icon: <Database className="w-5 h-5" /> },
    { name: 'Evaluation Mapping', desc: 'Campaign filters data', icon: <FileCheck className="w-5 h-5" /> },
    { name: 'ClearHire Layer', desc: 'Masks questions & test cases', icon: <ShieldCheck className="w-5 h-5 text-white" />, highlight: true },
    { name: 'Candidate Roadmap', desc: 'Course targets & growth', icon: <GraduationCap className="w-5 h-5" /> },
  ]

  return (
    <section id="vision" className="py-20 md:py-28 bg-zinc-50/50 dark:bg-zinc-900/10 border-t border-gray-100 dark:border-zinc-900/60 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/5 rounded-full filter blur-[90px] -z-10 animate-pulse-slow" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-left md:text-center">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-accent px-3 py-1 rounded-full bg-accent/5 dark:bg-accent/10 border border-accent/10">
            Our Vision
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white">
            Building Trust in Technical Hiring
          </h2>
          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-405 leading-relaxed max-w-xl mx-auto">
            ClearHire is not replacing applicant tracking systems (ATS) or coding evaluation providers. Instead, it becomes the essential transparency layer that transforms raw assessment scores into explainable, candidate-friendly reports.
          </p>
        </div>

        {/* Visual flow layout */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            
            {flow.map((node, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-6 rounded-2xl border flex flex-col justify-between h-44 text-left transition-all ${
                  node.highlight
                    ? 'bg-primary/5 dark:bg-primary/10 border-primary/25 shadow-md shadow-primary/5'
                    : 'bg-white dark:bg-zinc-950 border-gray-150 dark:border-zinc-900 shadow-premium'
                } hover:border-primary/15 group`}
              >
                <div>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                    node.highlight
                      ? 'bg-primary text-white border-primary shadow'
                      : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-350 border-gray-100 dark:border-zinc-800'
                  }`}>
                    {node.icon}
                  </div>
                  
                  <h4 className="text-xs md:text-sm font-display font-bold text-zinc-900 dark:text-white mt-4 group-hover:text-primary transition-colors">
                    {node.name}
                  </h4>
                </div>

                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono">
                  {node.desc}
                </p>

                {/* Grid connections (desktop helper arrows) */}
                {idx < flow.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-20 w-8 h-8 items-center justify-center text-zinc-300 dark:text-zinc-800 pointer-events-none group-hover:translate-x-0.5 transition-transform">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                )}
              </motion.div>
            ))}

          </div>
        </div>

      </div>
    </section>
  )
}
