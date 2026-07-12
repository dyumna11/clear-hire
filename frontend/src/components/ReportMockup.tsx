import { Lock, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react'

export default function ReportMockup() {
  return (
    <div className="w-full max-w-3xl mx-auto rounded-3xl border border-gray-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl shadow-premium overflow-hidden transition-all duration-500 hover:shadow-primary/5 hover:border-primary/20 text-left">
      {/* Top Bar / Header */}
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
            Software Engineer Intern (Backend)
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Campaign Ref: <code className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-zinc-800">CH-ACME-4091</code> &bull; Acme Corp
          </p>
        </div>
        
        <div className="flex items-center md:text-right gap-3">
          <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-800 dark:text-zinc-200">
            AC
          </div>
          <div>
            <div className="text-xs text-zinc-400 dark:text-zinc-500">Evaluated</div>
            <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Oct 24, 2026</div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        {/* Timeline Progress */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
            Campaign Timeline
          </h4>
          <div className="grid grid-cols-4 gap-2 relative">
            {/* Background Line */}
            <div className="absolute top-2.5 left-[12.5%] right-[12.5%] h-0.5 bg-gray-100 dark:bg-zinc-800 -z-10" />
            
            {/* Timeline Steps */}
            {[
              { title: 'Applied', date: 'Oct 10', checked: true },
              { title: 'Assessment', date: 'Oct 14', checked: true },
              { title: 'Technical Interview', date: 'Oct 22', checked: true },
              { title: 'Report Generated', date: 'Oct 24', checked: true, active: true },
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    step.active
                      ? 'bg-accent text-white ring-4 ring-accent/20 scale-110'
                      : step.checked
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 dark:bg-zinc-800 text-zinc-400'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mt-2 block">
                  {step.title}
                </span>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                  {step.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Two-Column Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Skills Breakdown */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
                Skill Rubric Scores
              </h4>
              
              <div className="space-y-4">
                {[
                  { name: 'Coding Accuracy', score: 88, weight: 'High', color: 'bg-primary' },
                  { name: 'Runtime Efficiency', score: 72, weight: 'Medium', color: 'bg-primary/80' },
                  { name: 'CS Fundamentals', score: 90, weight: 'High', color: 'bg-primary' },
                  { name: 'Resume Match', score: 80, weight: 'Medium', color: 'bg-zinc-400 dark:bg-zinc-600' },
                  { name: 'Integrity Verification', score: 100, weight: 'Mandatory', color: 'bg-accent' },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1.5 group">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-primary transition-colors">
                        {item.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400">
                          {item.weight}
                        </span>
                        <span className="font-mono font-bold text-zinc-900 dark:text-white">
                          {item.score}%
                        </span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Interactive Protected Content Showcase */}
            <div className="relative rounded-2xl border border-gray-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/30 p-5 overflow-hidden">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3 flex items-center gap-1.5">
                Evaluated Coding Questions
              </h4>
              
              <div className="space-y-3 filter blur-[1.5px] pointer-events-none select-none">
                <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4"></div>
                <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2"></div>
              </div>

              {/* Confidentiality Lock Glass Plate */}
              <div className="absolute inset-0 bg-white/70 dark:bg-zinc-950/80 backdrop-blur-[6px] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2 animate-bounce">
                  <Lock className="w-5 h-5" />
                </div>
                <h5 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Assessment Content Protected
                </h5>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 max-w-xs mt-1">
                  Questions, test cases, and hidden test inputs are redacted to safeguard proprietary campaign items.
                </p>
              </div>
            </div>
          </div>

          {/* AI Explanation & Feedback */}
          <div className="md:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="p-5 rounded-2xl bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                AI Feedback Synthesis
              </h4>
              
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                  Key Strengths
                </span>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 mt-1 leading-relaxed">
                  Excellent algorithm runtime efficiency. Code demonstrates clean modularity, precise naming, and highly optimal recursion complexity.
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                  Areas of Improvement
                </span>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 mt-1 leading-relaxed">
                  Handling boundary edge cases, specifically with empty inputs or unexpected null pointers under high timeout settings.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-gray-100 dark:border-zinc-900 bg-white dark:bg-zinc-900/20 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
                Recommended Actions <HelpCircle className="w-3 h-3 text-zinc-400" />
              </h4>
              
              <ul className="text-xs space-y-2 text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span>
                  <span>Practice Big-O space optimization on Graph Algorithms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span>
                  <span>Explore <strong>Defensive Programming with TypeScript</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
