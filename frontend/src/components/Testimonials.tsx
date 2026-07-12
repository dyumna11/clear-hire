import { Star, Quote } from 'lucide-react'

export default function Testimonials() {
  const reviews = [
    {
      name: 'Sarah Jenkins',
      role: 'Head of Talent Acquisition',
      org: 'Linear',
      avatarText: 'SJ',
      quote: 'We deployed ClearHire for our latest engineering cohort. Candidate follow-up emails fell by 80%, and our candidate net promoter score reached an all-time high.',
      category: 'Recruiter',
    },
    {
      name: 'Alex Rivera',
      role: 'Software Engineer Applicant',
      org: 'Vercel Candidate',
      avatarText: 'AR',
      quote: 'Honestly the best candidate experience I have had. Even though I did not get the offer, I received concrete insights on code structures and timeout edge cases to improve on.',
      category: 'Candidate',
    },
    {
      name: 'Marcus Vance',
      role: 'VP of Engineering',
      org: 'Acme Corp',
      avatarText: 'MV',
      quote: 'Our team was highly concerned about exposing test secrets. ClearHire solves this by structuring reports purely around custom evaluation rubrics.',
      category: 'Recruiter',
    },
  ]

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16 md:mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/5 dark:bg-primary/10 border border-primary/10">
            Endorsements
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white">
            Trusted by candidates and recruiters alike
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Hear from engineering leaders maintaining strict question confidentiality and applicants getting transparent value.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((item, idx) => (
            <div
              key={idx}
              className="relative flex flex-col justify-between rounded-3xl border border-gray-200/60 dark:border-zinc-800/80 bg-zinc-50/30 dark:bg-zinc-900/10 p-8 shadow-premium hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300 group"
            >
              {/* Quote icon overlay */}
              <div className="absolute top-6 right-6 text-zinc-200 dark:text-zinc-800/60 group-hover:text-primary/20 transition-colors">
                <Quote className="w-8 h-8 fill-current" />
              </div>

              <div className="space-y-6">
                {/* Rating stars */}
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 mt-8 pt-6 border-t border-gray-100 dark:border-zinc-900/60">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  {item.avatarText}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {item.name}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {item.role} &bull; <strong className="text-primary font-medium">{item.org}</strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
