import { Sun, Moon } from 'lucide-react'

interface ThemeToggleProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

export default function ThemeToggle({ darkMode, toggleDarkMode }: ThemeToggleProps) {
  return (
    <button
      onClick={toggleDarkMode}
      type="button"
      className="relative p-2.5 rounded-xl border border-gray-200/60 dark:border-white/10 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md text-gray-700 dark:text-zinc-300 hover:text-primary dark:hover:text-primary hover:border-primary/30 dark:hover:border-primary/30 shadow-sm transition-all duration-300 active:scale-95 group overflow-hidden cursor-pointer"
      aria-label="Toggle Dark Mode"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {darkMode ? (
          <Sun className="w-5 h-5 transition-transform duration-500 ease-out rotate-0 scale-100 text-amber-500" />
        ) : (
          <Moon className="w-5 h-5 transition-transform duration-500 ease-out rotate-0 scale-100 text-primary" />
        )}
      </div>
      
      {/* Dynamic hover ring */}
      <span className="absolute inset-0 rounded-xl ring-2 ring-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  )
}
