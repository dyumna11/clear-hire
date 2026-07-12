import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

interface NavbarProps {
  darkMode: boolean
  toggleDarkMode: () => void
  onGoToDashboard: () => void
}

export default function Navbar({ darkMode, toggleDarkMode, onGoToDashboard }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Track scroll position to change background styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Product Preview', href: '#product-preview' },
    { name: 'Vision', href: '#vision' },
    { name: 'FAQ', href: '#faq' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-900 shadow-sm py-4'
          : 'bg-transparent border-b border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
            {/* Elegant transparent key icon */}
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 7a2 2 0 012 2m-3 4H3m9 9a9 9 0 01-9-9V9a9 9 0 019-9h9a2 2 0 012 2v3m-7 7v6m-4-3h4"
              />
            </svg>
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-zinc-900 dark:text-white">
            Clear<span className="text-primary">Hire</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          
          <button
            onClick={onGoToDashboard}
            type="button"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-primary dark:hover:text-primary transition-colors px-3 py-2 cursor-pointer"
          >
            Log In
          </button>
          
          <button
            onClick={onGoToDashboard}
            type="button"
            className="relative group overflow-hidden bg-primary hover:bg-primary-hover text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md shadow-primary/10 hover:shadow-primary/25 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>

        {/* Mobile menu trigger & ThemeToggle combo */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-xl border border-gray-200/60 dark:border-white/10 bg-white/60 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-350 hover:border-primary/30 transition-all cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-x-0 top-[73px] bottom-0 z-40 bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-900 px-6 py-8 flex flex-col justify-between transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
        }`}
      >
        <nav className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-semibold text-zinc-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors border-b border-gray-50 dark:border-zinc-900/40 pb-2"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-4 mt-auto">
          <button 
            onClick={() => {
              setIsOpen(false)
              onGoToDashboard()
            }} 
            className="w-full text-center font-medium text-zinc-700 dark:text-zinc-300 hover:text-primary py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-colors cursor-pointer"
          >
            Log In
          </button>
          
          <button 
            onClick={() => {
              setIsOpen(false)
              onGoToDashboard()
            }} 
            className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-primary/10 transition-colors cursor-pointer"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
