import { useState } from 'react'
import {
  ArrowLeft,
  Check,
  AlertCircle,
  ChevronRight,
  Sparkles,
  Lock,
  Search,
  FileSpreadsheet,
  TrendingUp
} from 'lucide-react'

interface EvaluationMappingProps {
  campaignName: string
  onBack: () => void
  onContinue: () => void
}

interface MappingItem {
  col: string
  target: string
  confidence: number
  isManual: boolean
}

export default function EvaluationMapping({ campaignName, onBack, onContinue }: EvaluationMappingProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // Mapping state items
  const [mappings, setMappings] = useState<MappingItem[]>([
    { col: 'coding_score', target: 'Coding Performance', confidence: 98, isManual: false },
    { col: 'runtime', target: 'Runtime Efficiency', confidence: 96, isManual: false },
    { col: 'dbms', target: 'Database Systems', confidence: 94, isManual: false },
    { col: 'os', target: 'Operating Systems', confidence: 95, isManual: false },
    { col: 'communication', target: 'Communication', confidence: 76, isManual: false }, // Low confidence mapping!
    { col: 'resume_score', target: 'Resume Match', confidence: 97, isManual: false },
    { col: 'remarks', target: 'Internal Notes (Hidden)', confidence: 99, isManual: false },
    { col: 'status', target: 'Hiring Outcome', confidence: 99, isManual: false }
  ])

  // Raw dataset columns list
  const columnsList = [
    'candidate_name',
    'email',
    'coding_score',
    'runtime',
    'dbms',
    'os',
    'communication',
    'resume_score',
    'remarks',
    'status',
    'uploaded_by',
    'test_timestamp'
  ]

  // Filter columns list by search query
  const filteredColumns = columnsList.filter((col) =>
    col.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleTargetChange = (index: number, newTarget: string) => {
    setMappings(
      mappings.map((item, idx) =>
        idx === index ? { ...item, target: newTarget, isManual: true } : item
      )
    )
  }

  // Get active mapped names for candidate report preview syncing
  const getMappedName = (colName: string, defaultName: string) => {
    const found = mappings.find((m) => m.col === colName)
    return found ? found.target : defaultName
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-4 text-left">
      
      {/* Breadcrumbs & Title */}
      <div className="space-y-4">
        <nav className="flex items-center gap-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500">
          <button onClick={onBack} className="hover:text-primary transition-colors cursor-pointer">
            Dashboard
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-zinc-500">{campaignName || 'Campaign'}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-zinc-500">Import Results</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-zinc-900 dark:text-white font-bold">Evaluation Mapping</span>
        </nav>

        <div>
          <h2 className="text-2xl font-display font-extrabold text-zinc-900 dark:text-white">
            Evaluation Mapping Workspace
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
            Review and validate how imported assessment data maps into ClearHire's standardized evaluation framework before generating candidate reports.
          </p>
        </div>
      </div>

      {/* Main split grids (Left, Center, Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT PANEL: Dataset information list (col-span-3) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="rounded-2xl border border-gray-200/60 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-5 shadow-premium space-y-5 text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div className="text-left space-y-0.5">
                <h4 className="font-bold text-zinc-850 dark:text-zinc-200">Dataset Specs</h4>
                <p className="text-[10px] text-zinc-400">Software_Engineer_Backend.csv</p>
              </div>
            </div>

            {/* Quality index */}
            <div className="space-y-2">
              <div className="flex justify-between font-semibold">
                <span className="text-zinc-500">Data Quality Index</span>
                <span className="text-accent font-extrabold">96%</span>
              </div>
              <div className="h-1.5 w-full bg-gray-150 dark:bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: '96%' }} />
              </div>
            </div>

            <div className="space-y-1.5 pt-3 border-t border-gray-50 dark:border-zinc-900/60 text-[11px] font-semibold text-zinc-500">
              <div className="flex justify-between">
                <span>Total Candidates</span>
                <span className="text-zinc-800 dark:text-zinc-200 font-bold font-mono">148</span>
              </div>
              <div className="flex justify-between">
                <span>Columns Synced</span>
                <span className="text-zinc-800 dark:text-zinc-200 font-bold font-mono">12</span>
              </div>
              <div className="flex justify-between">
                <span>Synced Time</span>
                <span className="text-zinc-800 dark:text-zinc-200 font-bold font-mono">2 min ago</span>
              </div>
            </div>
          </div>

          {/* Expandable columns lookup search */}
          <div className="rounded-2xl border border-gray-200/60 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-5 shadow-premium space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Imported Columns
            </h4>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-150 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/30 w-full text-xs">
              <Search className="w-3.5 h-3.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search dataset fields..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent focus:outline-none placeholder-zinc-400 border-none"
              />
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto no-scrollbar pt-1 text-xs">
              {filteredColumns.map((col) => (
                <div
                  key={col}
                  className="flex items-center justify-between py-1.5 border-b border-gray-50 dark:border-zinc-900/40 text-zinc-650 dark:text-zinc-400 font-medium"
                >
                  <code className="font-mono text-[10px] text-zinc-800 dark:text-zinc-200">{col}</code>
                  <Check className="w-3.5 h-3.5 text-accent" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER PANEL: AI Mapping Engine (col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-gray-200/60 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-5 md:p-6 shadow-premium space-y-4">
            <div>
              <h3 className="text-base font-display font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" /> AI Mapping Engine
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">Automatically map raw columns to standardized evaluation rubrics.</p>
            </div>

            <div className="space-y-3.5">
              {mappings.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col p-4 rounded-xl border border-gray-150 dark:border-zinc-900/60 bg-zinc-50/20 dark:bg-zinc-900/10 space-y-3 text-xs"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-zinc-550 dark:text-zinc-400">
                      Field: <code className="font-mono text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-850 px-1 rounded">{item.col}</code>
                    </span>
                    
                    <div className="flex items-center gap-1.5">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        item.confidence < 80
                          ? 'bg-amber-500/15 text-amber-500 border border-amber-500/20'
                          : 'bg-accent/15 text-accent border border-accent/20'
                      }`}>
                        {item.confidence}% confidence
                      </span>
                      {item.isManual && (
                        <span className="text-[9px] font-bold text-primary">Override</span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-2">
                    <span className="text-[10px] text-zinc-400 font-medium">Maps to metric</span>
                    
                    <select
                      value={item.target}
                      onChange={(e) => handleTargetChange(idx, e.target.value)}
                      className="font-bold text-zinc-800 dark:text-zinc-200 px-2 py-1 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:outline-none cursor-pointer text-xs"
                    >
                      <option value="Coding Performance">Coding Performance</option>
                      <option value="Runtime Efficiency">Runtime Efficiency</option>
                      <option value="Operating Systems">Operating Systems</option>
                      <option value="Database Systems">Database Systems</option>
                      <option value="Communication">Communication</option>
                      <option value="Resume Match">Resume Match</option>
                      <option value="Internal Notes (Hidden)">Internal Notes (Hidden)</option>
                      <option value="Hiring Outcome">Hiring Outcome</option>
                    </select>
                  </div>

                  {item.confidence < 80 && (
                    <div className="flex items-center gap-1.5 text-[9px] font-semibold text-amber-500 bg-amber-500/5 p-2 rounded-lg border border-amber-500/10">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Low confidence mapping. Verify target rubric classification.</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Validation indicators */}
          <div className="rounded-2xl border border-gray-200/60 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-5 shadow-premium flex items-center justify-between text-xs font-semibold">
            <div className="grid grid-cols-3 gap-4 text-center w-full">
              <div className="space-y-0.5">
                <span className="text-[10px] text-zinc-400 block">Mapped</span>
                <span className="text-sm font-extrabold text-accent">9 Columns</span>
              </div>
              <div className="space-y-0.5 border-x border-gray-100 dark:border-zinc-900">
                <span className="text-[10px] text-zinc-400 block">Review</span>
                <span className="text-sm font-extrabold text-amber-500">1 Mapping</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-zinc-400 block">Ignored</span>
                <span className="text-sm font-extrabold text-zinc-500">2 Mappings</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Sticky candidate report preview (col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-gray-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-5 shadow-premium space-y-5 text-xs">
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">STICKY LIVE PREVIEW</span>
              <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Candidate Report preview</h4>
            </div>

            {/* Candidate report card mockup */}
            <div className="rounded-xl border border-gray-150 dark:border-zinc-900 bg-zinc-50/20 dark:bg-zinc-950/20 p-4 space-y-5 text-[11px] text-left">
              
              {/* Fake status bar */}
              <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-zinc-900/60">
                <span className="font-bold text-zinc-800 dark:text-zinc-200">Candidate Evaluation</span>
                <span className="px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-500 font-extrabold text-[8.5px] uppercase">
                  {getMappedName('status', 'Not Selected')}
                </span>
              </div>

              {/* timeline */}
              <div className="space-y-1 text-zinc-500">
                <span className="text-[8px] font-bold uppercase text-zinc-400 block">Timeline Stages</span>
                <div className="flex justify-between font-semibold">
                  <span>Resume Screen ✓</span>
                  <span>OA Complete ✓</span>
                  <span>Offer ✗</span>
                </div>
              </div>

              {/* Dynamic categories map ratings */}
              <div className="space-y-2">
                <span className="text-[8px] font-bold uppercase text-zinc-400 block">Evaluation Categories</span>
                
                <div className="space-y-1.5">
                  {[
                    { raw: 'coding_score', def: 'Coding Performance', score: 92 },
                    { raw: 'runtime', def: 'Runtime Efficiency', score: 84 },
                    { raw: 'dbms', def: 'Database Systems', score: 88 },
                    { raw: 'os', def: 'Operating Systems', score: 78 },
                    { raw: 'communication', def: 'Communication', score: 62 },
                    { raw: 'resume_score', def: 'Resume Match', score: 80 }
                  ].map((cat) => (
                    <div key={cat.raw} className="space-y-0.5">
                      <div className="flex justify-between font-semibold text-[10px]">
                        <span>{getMappedName(cat.raw, cat.def)}</span>
                        <span className="font-bold">{cat.score}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full animate-pulse-slow" style={{ width: `${cat.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mock masked elements */}
              <div className="pt-2 border-t border-gray-100 dark:border-zinc-900/60 space-y-1.5">
                <span className="text-[8px] font-bold uppercase text-zinc-400 block">Shielded Secrets (Masked)</span>
                
                <div className="flex items-center gap-1.5 text-zinc-400 font-bold text-[9px]">
                  <Lock className="w-3 h-3 text-primary flex-shrink-0" />
                  <span>Rankings: Redacted</span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-400 font-bold text-[9px]">
                  <Lock className="w-3 h-3 text-primary flex-shrink-0" />
                  <span>Interviewer remarks: Mapped to Hidden ({getMappedName('remarks', 'Internal Remarks')})</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM PANEL: AI Insights (col-span-12) */}
        <div className="lg:col-span-12">
          <div className="rounded-2xl border border-gray-200/60 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-5 shadow-premium grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-left">
            <div className="space-y-1.5">
              <span className="text-[9.5px] font-bold text-zinc-400 uppercase tracking-wider block">Detected Categories</span>
              <div className="flex flex-wrap gap-1">
                {['Coding', 'Runtime', 'Resume', 'Communication', 'Database', 'Operating Systems'].map((c) => (
                  <span key={c} className="px-2 py-0.5 rounded bg-zinc-50 dark:bg-zinc-900 font-semibold border border-gray-100 dark:border-zinc-800 text-[9px]">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1 md:border-l md:pl-6 border-gray-100 dark:border-zinc-900">
              <span className="text-[9.5px] font-bold text-zinc-400 uppercase tracking-wider block">Estimated Report Quality</span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xl font-display font-extrabold text-zinc-850 dark:text-white">95%</span>
                <span className="inline-flex px-1.5 py-0.5 rounded bg-accent/15 text-accent font-bold text-[9px]">Excellent</span>
              </div>
            </div>

            <div className="space-y-1 md:border-l md:pl-6 border-gray-100 dark:border-zinc-900">
              <span className="text-[9.5px] font-bold text-zinc-400 uppercase tracking-wider block font-display">Est. Report Generation Time</span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xl font-display font-extrabold text-zinc-850 dark:text-white">18 Seconds</span>
                <span className="text-[9.5px] text-zinc-400">Total compile duration</span>
              </div>
            </div>

            <div className="space-y-1 md:border-l md:pl-6 border-gray-100 dark:border-zinc-900">
              <span className="text-[9.5px] font-bold text-zinc-400 uppercase tracking-wider block">Expected Candidates</span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xl font-display font-extrabold text-zinc-850 dark:text-white">148 Candidates</span>
                <span className="inline-flex items-center gap-1 text-[9px] font-bold text-accent">
                  <TrendingUp className="w-3.5 h-3.5 animate-pulse" /> Validated
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Nav Actions Footer */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200/80 dark:border-zinc-900">
        <button
          onClick={onBack}
          type="button"
          className="font-bold text-zinc-700 dark:text-zinc-350 hover:text-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-900/60 border border-gray-200/60 dark:border-zinc-800 px-5 py-3 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Upload
        </button>

        <div className="flex gap-2.5">
          <button
            onClick={onContinue}
            type="button"
            className="font-bold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-900/60 border border-gray-200/60 dark:border-zinc-800 px-5 py-3 rounded-xl transition-colors cursor-pointer text-xs"
          >
            Save Mapping
          </button>
          <button
            onClick={onContinue}
            type="button"
            className="bg-primary hover:bg-primary-hover text-white font-bold px-6 py-3 rounded-xl flex items-center gap-1.5 shadow-md shadow-primary/10 transition-colors cursor-pointer text-xs"
          >
            Continue to Transparency Policy <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  )
}
