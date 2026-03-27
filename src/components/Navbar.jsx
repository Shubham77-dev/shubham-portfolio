import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavbar, useScrollSpy } from '../hooks'
import { navLinks } from '../data'

export default function Navbar() {
  const scrolled = useNavbar(20)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeId = useScrollSpy(navLinks.map((l) => l.href))

  const scrollTo = (href) => {
    const el = document.getElementById(href)
    if (el) {
      const offset = 64
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setMobileOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-10 transition-all duration-300 ${
          scrolled
            ? 'bg-[#080B12]/90 backdrop-blur-xl border-b border-white/[0.07]'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display text-[17px] font-bold text-white tracking-tight hover:text-accent-hi transition-colors"
        >
          Shubham<span className="text-accent-hi">.</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className={`text-[13px] transition-colors duration-200 ${
                  activeId === link.href
                    ? 'text-white'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="mailto:patidarshubham18@gmail.com"
            className="text-[13px] font-medium text-accent-hi bg-accent/10 border border-accent/20 px-4 py-[7px] rounded-md transition-all hover:bg-accent/20 hover:border-accent"
          >
            Hire Me →
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-300 p-1"
          aria-label="Toggle menu"
        >
          <div className={`w-5 h-px bg-current transition-all duration-200 mb-1.5 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-5 h-px bg-current transition-all duration-200 mb-1.5 ${mobileOpen ? 'opacity-0' : ''}`} />
          <div className={`w-5 h-px bg-current transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-1' : ''}`} />
        </button>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#080B12]/97 backdrop-blur-xl border-b border-white/[0.07] px-6 py-5"
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className={`text-[15px] w-full text-left transition-colors ${
                      activeId === link.href ? 'text-white' : 'text-gray-400'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-2 border-t border-white/[0.07]">
                <a
                  href="mailto:patidarshubham18@gmail.com"
                  className="text-[14px] font-medium text-accent-hi"
                >
                  patidarshubham18@gmail.com
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
