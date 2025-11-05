import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Search, User, Settings } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/60 border-b border-slate-800/60">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ rotate: -12, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-[0_0_30px_-10px_rgba(56,189,248,0.7)]"
            >
              <Brain className="h-5 w-5 text-white" />
            </motion.div>
            <span className="text-white font-semibold tracking-tight text-lg">MedRag</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
            <a href="#dashboard" className="text-slate-300 hover:text-white transition-colors">Dashboard</a>
            <a href="#patients" className="text-slate-300 hover:text-white transition-colors">Patients</a>
            <a href="#about" className="text-slate-300 hover:text-white transition-colors">About</a>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2">
            <button className="group inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm text-slate-200 hover:border-slate-700 hover:bg-slate-900">
              <Search className="h-4 w-4 text-slate-400 group-hover:text-slate-300" />
              Search
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-cyan-500/20 hover:brightness-110 active:brightness-95">
              <User className="h-4 w-4" />
              Sign In
            </button>
            <button className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 text-slate-200 hover:border-slate-700">
              <Settings className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 p-2 text-slate-200"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden pb-4"
          >
            <div className="mt-2 grid gap-2">
              {[
                { href: '#features', label: 'Features' },
                { href: '#dashboard', label: 'Dashboard' },
                { href: '#patients', label: 'Patients' },
                { href: '#about', label: 'About' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-slate-200"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
