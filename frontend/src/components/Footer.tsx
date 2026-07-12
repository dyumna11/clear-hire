import { Send } from 'lucide-react'

export default function Footer() {
  const links = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Documentation', href: '#' },
      { name: 'Developers', href: '#' },
      { name: 'API', href: '#' },
      { name: 'Pricing (Coming Soon)', href: '#' },
    ],
    company: [
      { name: 'About', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
      { name: 'Contact', href: '#' },
    ],
  }

  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-900/60 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Footer Top */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-gray-100 dark:border-zinc-900/60 text-left">
          
          {/* Logo & Info */}
          <div className="md:col-span-4 space-y-4">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-md shadow-primary/10">
                <svg
                  className="w-4.5 h-4.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M15 7a2 2 0 012 2m-3 4H3m9 9a9 9 0 01-9-9V9a9 9 0 019-9h9a2 2 0 012 2v3m-7 7v6m-4-3h4"
                  />
                </svg>
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-zinc-900 dark:text-white">
                Clear<span className="text-primary">Hire</span>
              </span>
            </a>
            <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
              The candidate-first transparency layer bridging the gap between automated assessment scoring and clear explanation.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white flex items-center justify-center border border-gray-100 dark:border-zinc-800/80 transition-colors"
                aria-label="GitHub Link"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white flex items-center justify-center border border-gray-100 dark:border-zinc-800/80 transition-colors"
                aria-label="LinkedIn Link"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:col-span-8">
            <div>
              <h5 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-widest mb-4">
                Product
              </h5>
              <ul className="space-y-2.5 text-xs md:text-sm">
                {links.product.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-zinc-500 hover:text-primary dark:text-zinc-400 dark:hover:text-primary transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-widest mb-4">
                Company
              </h5>
              <ul className="space-y-2.5 text-xs md:text-sm">
                {links.company.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-zinc-500 hover:text-primary dark:text-zinc-400 dark:hover:text-primary transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h5 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-widest mb-4">
                Subscribe
              </h5>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3 leading-relaxed">
                Stay updated on security compliance and transparency standards.
              </p>
              
              {/* Subscribe Input */}
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-primary/50"
                  aria-label="Email for Newsletter"
                />
                <button
                  type="button"
                  className="p-2.5 rounded-xl bg-primary text-white hover:bg-primary-hover shadow-md transition-colors cursor-pointer"
                  aria-label="Submit Email"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-zinc-400 dark:text-zinc-600">
            &copy; {new Date().getFullYear()} ClearHire Inc. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-zinc-400 dark:text-zinc-600">
            <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">Security Policy</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">Trust Verification</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
