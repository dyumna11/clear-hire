import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, Users, FileBarChart2, Settings, Database, Check, Lock, BookOpen } from 'lucide-react'

export default function ProductPreview() {
  const [activeTab, setActiveTab] = useState<'candidate' | 'recruiter'>('candidate')

  return (
    <section id="product-preview" className="py-20 md:py-28 bg-white dark:bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12 md:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/5 dark:bg-primary/10 border border-primary/10">
            Product Showcase
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white">
            Dual-Portal Ecosystem
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            A look into the dashboards designed to coordinate transparent campaign outcomes for talent managers and job applicants.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-xl bg-zinc-100 dark:bg-zinc-900 p-1.5 border border-gray-200/40 dark:border-zinc-800">
            <button
              onClick={() => setActiveTab('candidate')}
              className={`px-6 py-2.5 rounded-lg text-xs font-bold font-display transition-all cursor-pointer ${
                activeTab === 'candidate'
                  ? 'bg-white dark:bg-zinc-800 text-primary shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-850 dark:hover:text-zinc-300'
              }`}
            >
              Candidate Portal View
            </button>
            <button
              onClick={() => setActiveTab('recruiter')}
              className={`px-6 py-2.5 rounded-lg text-xs font-bold font-display transition-all cursor-pointer ${
                activeTab === 'recruiter'
                  ? 'bg-white dark:bg-zinc-800 text-primary shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-850 dark:hover:text-zinc-300'
              }`}
            >
              Recruiter Portal View
            </button>
          </div>
        </div>

        {/* Dashboard Display Frame */}
        <div className="w-full max-w-5xl mx-auto rounded-3xl border border-gray-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10 p-2 md:p-4 shadow-premium overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'candidate' ? (
              <motion.div
                key="candidate"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="w-full rounded-2xl bg-white dark:bg-zinc-950 border border-gray-200/60 dark:border-zinc-900 shadow-sm overflow-hidden text-left grid grid-cols-1 md:grid-cols-12"
              >
                {/* Mock sidebar */}
                <div className="md:col-span-3 border-r border-gray-100 dark:border-zinc-900 p-5 space-y-6 bg-zinc-50/30 dark:bg-zinc-950/20">
                  <div className="text-xs font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                    CANDIDATE SUITE
                  </div>
                  <nav className="space-y-1.5">
                    {[
                      { name: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4 text-primary" />, active: true },
                      { name: 'Applications', icon: <FileBarChart2 className="w-4 h-4" /> },
                      { name: 'Company Insights', icon: <Database className="w-4 h-4" /> },
                      { name: 'Recommended Learning', icon: <BookOpen className="w-4 h-4" /> },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                          item.active
                            ? 'bg-primary/10 text-primary'
                            : 'text-zinc-500 hover:bg-gray-50 dark:hover:bg-zinc-900 hover:text-zinc-800'
                        }`}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Mock Main Panel */}
                <div className="md:col-span-9 p-6 md:p-8 space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-150 dark:border-zinc-900">
                    <div>
                      <span className="text-[10px] font-bold text-accent uppercase tracking-wider block">APPLICATION OVERVIEW</span>
                      <h3 className="text-lg font-display font-bold text-zinc-900 dark:text-white mt-0.5">
                        My Job Applications
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                      Last update: Oct 2026
                    </span>
                  </div>

                  {/* Mock content blocks representing PRD details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div className="p-4 rounded-xl border border-gray-150 dark:border-zinc-900 space-y-3.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-zinc-400 uppercase tracking-wide">STATUS</span>
                        <span className="px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-500 font-bold text-[10px]">
                          Not Selected
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="text-[10px] text-zinc-400">Position</div>
                        <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Software Engineer (Backend)</div>
                        <div className="text-[10px] text-zinc-400 mt-1">Hiring Timeline</div>
                        <div className="text-xs text-zinc-600 dark:text-zinc-300">Resume Checked &bull; OA Complete &bull; Evaluation Released</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-150 dark:border-zinc-900 space-y-3">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide block">EVALUATION METRICS</span>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span>Coding accuracy</span>
                          <span className="font-bold">85%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Runtime optimization</span>
                          <span className="font-bold">60%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Computer Science fundamentals</span>
                          <span className="font-bold text-amber-500">55%</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Strengths / Growth Areas */}
                  <div className="p-4 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/15 space-y-3.5 text-xs">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="font-bold text-zinc-400 block mb-1 uppercase text-[10px]">STRENGTHS</span>
                        <p className="font-semibold text-zinc-700 dark:text-zinc-300">&bull; Problem Solving &bull; Code Quality</p>
                      </div>
                      <div>
                        <span className="font-bold text-zinc-400 block mb-1 uppercase text-[10px]">GROWTH AREAS</span>
                        <p className="font-semibold text-zinc-700 dark:text-zinc-300">&bull; Operating Systems &bull; Database Design</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-primary/10">
                      <span className="font-bold text-zinc-400 block uppercase text-[10px]">AI EXPLANATION</span>
                      <p className="text-zinc-650 dark:text-zinc-300 leading-relaxed mt-1 text-xs">
                        "Candidates progressing to interviews generally demonstrated stronger performance in CS fundamentals. Prioritize relational mapping complexity optimizations."
                      </p>
                    </div>
                  </div>

                  {/* Learning roadmap */}
                  <div className="p-4 rounded-xl bg-accent/5 dark:bg-accent/10 border border-accent/15 flex items-center justify-between text-xs">
                    <div className="space-y-1">
                      <span className="font-bold text-zinc-400 uppercase text-[10px]">RECOMMENDED LEARNING ROADMAP</span>
                      <div className="text-zinc-700 dark:text-zinc-300 text-xs font-semibold">SQL &bull; Operating Systems &bull; Concurrency</div>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold hover:bg-zinc-800 transition-colors cursor-pointer text-[10px]">
                      Access Roadmap
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="recruiter"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="w-full rounded-2xl bg-white dark:bg-zinc-950 border border-gray-200/60 dark:border-zinc-900 shadow-sm overflow-hidden text-left grid grid-cols-1 md:grid-cols-12"
              >
                {/* Mock sidebar */}
                <div className="md:col-span-3 border-r border-gray-100 dark:border-zinc-900 p-5 space-y-6 bg-zinc-50/30 dark:bg-zinc-950/20">
                  <div className="text-xs font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                    RECRUITER SUITE
                  </div>
                  <nav className="space-y-1.5">
                    {[
                      { name: 'Campaign Overview', icon: <LayoutDashboard className="w-4 h-4 text-primary" />, active: true },
                      { name: 'Rubric Builder', icon: <Settings className="w-4 h-4" /> },
                      { name: 'Candidates List', icon: <Users className="w-4 h-4" /> },
                      { name: 'Campaign Analytics', icon: <FileBarChart2 className="w-4 h-4" /> },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                          item.active
                            ? 'bg-primary/10 text-primary'
                            : 'text-zinc-500 hover:bg-gray-50 dark:hover:bg-zinc-900 hover:text-zinc-800'
                        }`}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Mock Main Panel */}
                <div className="md:col-span-9 p-6 md:p-8 space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-150 dark:border-zinc-900">
                    <div>
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">CAMPAIGNS CONSOLE</span>
                      <h3 className="text-lg font-display font-bold text-zinc-900 dark:text-white mt-0.5">
                        Software Engineer Intern (Backend)
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-accent/15 text-accent border border-accent/20">
                      Transparency Score: 87/100
                    </span>
                  </div>

                  {/* Grid details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl border border-gray-150 dark:border-zinc-900">
                      <div className="text-[10px] text-zinc-400 uppercase font-bold">Import Status</div>
                      <div className="text-base font-bold mt-1 text-zinc-800 dark:text-zinc-200">240 Candidates</div>
                      <div className="text-[9px] text-accent mt-0.5 font-semibold">CSV Import Success</div>
                    </div>
                    <div className="p-4 rounded-xl border border-gray-150 dark:border-zinc-900">
                      <div className="text-[10px] text-zinc-400 uppercase font-bold">Reports Status</div>
                      <div className="text-base font-bold mt-1 text-zinc-800 dark:text-zinc-200">240 Generated</div>
                      <div className="text-[9px] text-primary mt-0.5 font-semibold">100% Sync Complete</div>
                    </div>
                    <div className="p-4 rounded-xl border border-gray-150 dark:border-zinc-900">
                      <div className="text-[10px] text-zinc-400 uppercase font-bold">Active Funnel</div>
                      <div className="text-base font-bold mt-1 text-zinc-800 dark:text-zinc-200">Stage 3 (Decision)</div>
                      <div className="text-[9px] text-zinc-500 mt-0.5">Published to candidate base</div>
                    </div>
                  </div>

                  {/* Rubric Framework */}
                  <div className="p-5 rounded-xl border border-gray-150 dark:border-zinc-900 space-y-4">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide block">EVALUATION FRAMEWORK (RUBRIC)</span>
                    
                    <div className="space-y-2 text-xs">
                      {[
                        { field: 'Coding Accuracy', weight: 'High', share: true },
                        { field: 'Runtime Efficiency', weight: 'Medium', share: true },
                        { field: 'CS Fundamentals', weight: 'High', share: true },
                        { field: 'Coding Questions & Cases', weight: 'High', share: false },
                      ].map((rubric, idx) => (
                        <div key={idx} className="flex justify-between items-center border-b border-gray-50 dark:border-zinc-900/50 pb-2">
                          <span className="font-semibold text-zinc-700 dark:text-zinc-350">{rubric.field}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">{rubric.weight}</span>
                            {rubric.share ? (
                              <span className="text-[9px] text-accent font-bold flex items-center gap-0.5">
                                <Check className="w-3 h-3" /> Shared
                              </span>
                            ) : (
                              <span className="text-[9px] text-primary font-bold flex items-center gap-0.5">
                                <Lock className="w-3 h-3" /> Protected
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
