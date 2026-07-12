import { motion } from 'framer-motion'
import { Star, ShieldAlert, Sparkles } from 'lucide-react'

export default function HiringDnaCard() {
  const googleDna = [
    { name: 'Problem Solving', rating: 5 },
    { name: 'System Design', rating: 5 },
    { name: 'CS Fundamentals', rating: 5 },
    { name: 'Communication', rating: 4 },
    { name: 'Resume Match', rating: 3 },
  ]

  const ciscoDna = [
    { name: 'Networking', rating: 5 },
    { name: 'Operating Systems', rating: 4 },
    { name: 'DBMS', rating: 4 },
    { name: 'Coding', rating: 4 },
    { name: 'Linux', rating: 4 },
  ]

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5 text-amber-500">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < rating ? 'fill-current' : 'text-zinc-200 dark:text-zinc-800'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <section className="py-20 md:py-28 bg-zinc-50/50 dark:bg-zinc-900/10 border-t border-gray-100 dark:border-zinc-900/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16 md:mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-accent px-3 py-1 rounded-full bg-accent/5 dark:bg-accent/10 border border-accent/10">
            Signature Feature
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white">
            Hiring DNA™
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Every company has a unique hiring profile. See exactly what skills and rubrics matter most.
          </p>
        </div>

        {/* DNA Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Google Profile (Official) */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="rounded-3xl border border-primary/25 bg-white dark:bg-zinc-950 p-6 md:p-8 shadow-premium space-y-6 hover:shadow-primary/5 transition-all duration-300 text-left"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  G
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-zinc-900 dark:text-white">
                    Google
                  </h3>
                  <span className="text-[9px] font-mono text-zinc-400 dark:text-zinc-500 block">
                    SAN FRANCISCO, CA
                  </span>
                </div>
              </div>
              
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-accent/15 text-accent border border-accent/20">
                <Sparkles className="w-3 h-3" /> Official Company Rubric
              </span>
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Google's verified entry points focus on backend systems, scale complexity, and computer science theory.
            </p>

            <div className="space-y-3 pt-2">
              {googleDna.map((dna) => (
                <div key={dna.name} className="flex justify-between items-center text-xs border-b border-gray-50 dark:border-zinc-900/60 pb-2">
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                    {dna.name}
                  </span>
                  {renderStars(dna.rating)}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Cisco Profile (Community Estimated) */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="rounded-3xl border border-gray-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-6 md:p-8 shadow-premium space-y-6 hover:shadow-primary/5 hover:border-zinc-750 transition-all duration-300 text-left"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 flex items-center justify-center font-bold">
                  C
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-zinc-900 dark:text-white">
                    Cisco Systems
                  </h3>
                  <span className="text-[9px] font-mono text-zinc-400 dark:text-zinc-500 block">
                    SAN JOSE, CA
                  </span>
                </div>
              </div>
              
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-gray-250 dark:border-zinc-800">
                <ShieldAlert className="w-3 h-3" /> Community Estimated
              </span>
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Cisco's engineering profile emphasizes networks configuration, low-level OS protocols, and database management.
            </p>

            <div className="space-y-3 pt-2">
              {ciscoDna.map((dna) => (
                <div key={dna.name} className="flex justify-between items-center text-xs border-b border-gray-50 dark:border-zinc-900/60 pb-2">
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                    {dna.name}
                  </span>
                  {renderStars(dna.rating)}
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Explanatory footer */}
        <div className="mt-12 text-center max-w-xl mx-auto">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            * <strong>Note:</strong> Hiring DNA™ is generated from recruiter-defined evaluation rubrics together with publicly available hiring information and community insights. Official company rubrics are marked with verified badge overlays.
          </p>
        </div>

      </div>
    </section>
  )
}
