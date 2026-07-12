import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Check,
  AlertCircle,
  UploadCloud,
  FileSpreadsheet,
  ChevronRight,
  Sparkles,
  Database,
  RefreshCw,
  FileText
} from 'lucide-react'

interface UploadResultsProps {
  campaignName: string
  onBack: () => void
  onContinue: () => void
}

export default function UploadResults({ campaignName, onBack, onContinue }: UploadResultsProps) {
  // Upload workflow state
  const [selectedSource, setSelectedSource] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)
  const [fileDetails, setFileDetails] = useState<{
    name: string
    size: string
    rows: number
    cols: number
    candidates: number
  } | null>(null)

  // Interactive Validation Warnings states
  const [warnings, setWarnings] = useState([
    {
      id: 'emails',
      title: 'Missing Emails',
      desc: '2 candidate records are missing email addresses. Reports cannot be delivered.',
      autofixed: false,
      fixLabel: 'Assign Mock Emails'
    },
    {
      id: 'duplicates',
      title: 'Duplicate Candidates',
      desc: '1 duplicate candidate record detected with matching assessment identifier.',
      autofixed: false,
      fixLabel: 'Drop Duplicate Record'
    },
    {
      id: 'scores',
      title: 'Missing Scores',
      desc: '3 candidates have empty test marks for the "CS Fundamentals" section.',
      autofixed: false,
      fixLabel: 'Default Blanks to 0'
    },
    {
      id: 'columns',
      title: 'Unknown Columns',
      desc: 'Column "avg_latency" cannot be automatically mapped to rubrics.',
      autofixed: false,
      fixLabel: 'Map to Hidden Notes'
    }
  ])

  // Mock File upload progress simulator
  useEffect(() => {
    if (uploadProgress !== null && uploadProgress < 100) {
      const timer = setTimeout(() => {
        setUploadProgress((prev) => (prev !== null ? prev + 10 : 0))
      }, 150)
      return () => clearTimeout(timer)
    } else if (uploadProgress === 100 && !fileDetails) {
      setFileDetails({
        name: 'engineering_oa_results.csv',
        size: '42.5 KB',
        rows: 148,
        cols: 6,
        candidates: 148
      })
    }
  }, [uploadProgress, fileDetails])

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true)
    } else if (e.type === 'dragleave') {
      setIsDragging(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Trigger upload loader
      setUploadProgress(0)
    }
  }

  const handleFileSelect = () => {
    setUploadProgress(0)
  }

  const handleAutofix = (id: string) => {
    setWarnings(
      warnings.map((w) => (w.id === id ? { ...w, autofixed: true } : w))
    )
  }

  // Calculate active warnings remaining
  const activeWarningsCount = warnings.filter((w) => !w.autofixed).length

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4 text-left">
      
      {/* Breadcrumb & Header row */}
      <div className="space-y-4">
        <nav className="flex items-center gap-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500">
          <button onClick={onBack} className="hover:text-primary transition-colors cursor-pointer">
            Dashboard
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-zinc-500">{campaignName || 'Campaign'}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-zinc-900 dark:text-white font-bold">Upload Results</span>
        </nav>

        <div>
          <h2 className="text-2xl font-display font-extrabold text-zinc-900 dark:text-white">
            Upload Assessment Results
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Import candidate evaluation data from assessment platforms or spreadsheets.
          </p>
        </div>
      </div>

      {/* Upload Source Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Select Assessment Platform Source
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: 'HackerRank',
              desc: 'Sync campaign results directly via official API access integration.',
              formats: 'API Connection',
              icon: <Database className="w-5 h-5 text-[#2EC866]" />
            },
            {
              name: 'CodeSignal',
              desc: 'Export coding test results using secure webhook configurations.',
              formats: 'Webhook Sync',
              icon: <Sparkles className="w-5 h-5 text-primary" />
            },
            {
              name: 'Codility',
              desc: 'Retrieve XML candidates trackers and mapping records.',
              formats: 'API / XML logs',
              icon: <RefreshCw className="w-5 h-5 text-blue-500" />
            },
            {
              name: 'CSV Upload',
              desc: 'Bulk import results from comma-separated tabular spreadsheets.',
              formats: '.csv',
              icon: <FileSpreadsheet className="w-5 h-5 text-accent" />
            },
            {
              name: 'Excel Upload',
              desc: 'Bulk import assessment sheets from Microsoft Excel workbooks.',
              formats: '.xlsx',
              icon: <FileText className="w-5 h-5 text-emerald-500" />
            },
            {
              name: 'Manual Entry',
              desc: 'Create evaluations individually through an in-app spreadsheet form.',
              formats: 'Direct Grid Input',
              icon: <Check className="w-5 h-5 text-amber-500" />
            }
          ].map((item) => (
            <div
              key={item.name}
              onClick={() => setSelectedSource(item.name)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between h-44 ${
                selectedSource === item.name
                  ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-sm'
                  : 'border-gray-200/60 dark:border-zinc-900 bg-white dark:bg-zinc-950 hover:border-zinc-400'
              }`}
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800">
                    {item.icon}
                  </div>
                  {selectedSource === item.name && (
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  )}
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white pt-1">{item.name}</h4>
                <p className="text-[10px] text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-50 dark:border-zinc-900/60 text-[9px] font-semibold text-zinc-400">
                <span>Formats: {item.formats}</span>
                <button
                  type="button"
                  className="text-primary hover:underline font-bold cursor-pointer"
                >
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Drag and drop upload dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Dropzone area & loading metrics */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Drag & Drop Files
            </h3>
            
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-4 transition-colors min-h-[300px] ${
                isDragging
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 dark:border-zinc-900 bg-white dark:bg-zinc-950'
              }`}
            >
              <UploadCloud className="w-10 h-10 text-zinc-400" />
              
              <div className="space-y-1">
                <label className="text-sm font-bold text-primary hover:underline cursor-pointer">
                  Select candidate results tracker
                  <input
                    type="file"
                    accept=".csv,.xlsx,.json"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </label>
                <p className="text-xs text-zinc-400">CSV, Excel, or JSON formats supported (Max 10MB)</p>
              </div>

              {/* Progress bar overlay */}
              {uploadProgress !== null && (
                <div className="w-full max-w-xs space-y-2">
                  <div className="flex justify-between text-[10px] font-semibold text-zinc-500">
                    <span>Uploading results file...</span>
                    <span className="font-mono">{uploadProgress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Dynamic File preview details metadata */}
          <AnimatePresence>
            {fileDetails && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-5 rounded-2xl border border-gray-200/60 dark:border-zinc-900 bg-white dark:bg-zinc-950 shadow-premium space-y-4"
              >
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Imported File Metadata
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="space-y-0.5">
                    <span className="text-zinc-400 block text-[10px]">File Name</span>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">{fileDetails.name}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-zinc-400 block text-[10px]">Rows Mapped</span>
                    <span className="font-bold font-mono text-zinc-800 dark:text-zinc-200">{fileDetails.rows}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-zinc-400 block text-[10px]">Columns Detected</span>
                    <span className="font-bold font-mono text-zinc-800 dark:text-zinc-200">{fileDetails.cols}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-zinc-400 block text-[10px]">Candidates Mapped</span>
                    <span className="font-bold font-mono text-zinc-850 dark:text-zinc-250">{fileDetails.candidates}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-50 dark:border-zinc-900/60 flex justify-between items-center text-xs">
                  <span className="text-zinc-550 font-medium">Schema validation outcomes</span>
                  {activeWarningsCount > 0 ? (
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/10">
                      {activeWarningsCount} schema warnings found
                    </span>
                  ) : (
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent/10 text-accent border border-accent/15">
                      Schema Fully Validated ✓
                    </span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right validation checker lists */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Data Validation Warnings
            </h3>

            {/* List of Warning cards */}
            <div className="space-y-3">
              {warnings.map((warn) => (
                <div
                  key={warn.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 text-xs ${
                    warn.autofixed
                      ? 'border-gray-100 dark:border-zinc-900 bg-gray-50/20 dark:bg-zinc-950/20 opacity-60'
                      : 'border-amber-500/20 bg-amber-500/5 text-zinc-800 dark:text-zinc-200'
                  }`}
                >
                  <div className="flex gap-2.5 items-start">
                    {warn.autofixed ? (
                      <Check className="w-4.5 h-4.5 text-accent flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4.5 h-4.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    )}

                    <div className="space-y-0.5">
                      <h4 className={`font-bold ${warn.autofixed ? 'text-zinc-500' : 'text-zinc-850 dark:text-zinc-100'}`}>
                        {warn.title}
                      </h4>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-snug">{warn.desc}</p>
                    </div>
                  </div>

                  {!warn.autofixed && (
                    <button
                      onClick={() => handleAutofix(warn.id)}
                      type="button"
                      className="self-end text-[10px] font-bold text-primary bg-primary/5 hover:bg-primary/10 border border-primary/10 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                    >
                      Autofix: {warn.fixLabel}
                    </button>
                  )}
                  
                  {warn.autofixed && (
                    <span className="self-end text-[9px] font-semibold text-accent block">
                      Resolved
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Nav action buttons footer */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200/80 dark:border-zinc-900">
        <button
          onClick={onBack}
          type="button"
          className="font-bold text-zinc-700 dark:text-zinc-350 hover:text-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-900/60 border border-gray-200/60 dark:border-zinc-800 px-5 py-3 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <button
          onClick={onContinue}
          type="button"
          disabled={!fileDetails}
          className={`font-bold px-6 py-3 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer text-xs ${
            fileDetails
              ? 'bg-primary hover:bg-primary-hover text-white shadow-md shadow-primary/10'
              : 'bg-zinc-150 dark:bg-zinc-900 text-zinc-400 cursor-not-allowed border border-gray-100 dark:border-zinc-850'
          }`}
        >
          Continue to Evaluation Mapping <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  )
}
