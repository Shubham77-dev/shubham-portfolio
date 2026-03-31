// src/App.jsx  — PATCHED
//
// Fallback logic:
//   - If VITE_API_BASE is not set → skip API call entirely, use static data
//   - If API call fails (network error, 4xx, 5xx) → use static data silently
//   - Static data only shown for the default username (FALLBACK_USERNAME)
//   - Any other username with a failing API shows an error + retry

import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import Navbar    from './components/Navbar'
import Hero       from './sections/Hero'
import About      from './sections/About'
import Skills     from './sections/Skills'
import Experience from './sections/Experience'
import Projects   from './sections/Projects'
import Contact    from './sections/Contact'
import Footer     from './components/Footer'
import { fallbackPortfolio, FALLBACK_USERNAME } from './data/fallback'

const API_BASE = import.meta.env.VITE_API_BASE || ''

// Returns true when the backend is configured (env var is set and non-empty).
function isApiConfigured() {
  return typeof API_BASE === 'string' && API_BASE.trim().length > 0
}

export default function App() {
  const { username } = useParams()
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState('')
  const [portfolio, setPortfolio] = useState(null)
  const [usingFallback, setUsingFallback] = useState(false)

  const loadPortfolio = useCallback(async () => {
    if (!username) return

    // ── Fallback path: no API configured ─────────────────────────
    // If VITE_API_BASE is not set, skip the network call entirely.
    // Show fallback data for the default username; error for others.
    if (!isApiConfigured()) {
      if (username === FALLBACK_USERNAME) {
        setPortfolio(fallbackPortfolio)
        setUsingFallback(true)
        setError('')
      } else {
        setError(`Backend not configured. Only /${FALLBACK_USERNAME} is available in offline mode.`)
        setPortfolio(null)
        setUsingFallback(false)
      }
      setLoading(false)
      return
    }

    // ── API path ──────────────────────────────────────────────────
    setLoading(true)
    setError('')
    setUsingFallback(false)

    try {
      const controller = new AbortController()
      const timeoutId  = setTimeout(() => controller.abort(), 8000) // 8 s timeout

      const res = await fetch(
        `${API_BASE}/portfolio/${encodeURIComponent(username)}`,
        { signal: controller.signal }
      )
      clearTimeout(timeoutId)

      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.message || `Server returned ${res.status}`)

      setPortfolio(data?.portfolio || {})
    } catch (err) {
      // ── Silent fallback on error ────────────────────────────────
      // Network error, timeout, or unexpected server failure:
      // show static data for the default user, real error for others.
      if (username === FALLBACK_USERNAME) {
        setPortfolio(fallbackPortfolio)
        setUsingFallback(true)
        setError('')
      } else {
        setError(
          err.name === 'AbortError'
            ? 'Request timed out. The server may be down.'
            : err?.message || 'Failed to load portfolio'
        )
        setPortfolio(null)
      }
    } finally {
      setLoading(false)
    }
  }, [username])

  useEffect(() => {
    loadPortfolio()
  }, [loadPortfolio])

  return (
    <div className="min-h-screen bg-[#080B12] text-gray-100">
      <Navbar />

      {/* Offline / fallback banner */}
      {usingFallback && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-2 text-center">
          <span className="text-[12px] text-amber-300/80">
            Showing offline data — backend unavailable
          </span>
        </div>
      )}

      <main>
        {loading ? (
          /* ── Styled spinner ── */
          <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-accent animate-spin" />
            <p className="text-[14px] text-gray-500">Loading portfolio…</p>
          </div>
        ) : error ? (
          /* ── Error + retry ── */
          <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="text-4xl">⚠️</span>
            <p className="text-[16px] text-gray-300 font-medium">{error}</p>
            <p className="text-[13px] text-gray-500 max-w-[360px]">
              Make sure the backend is running and{' '}
              <code className="text-accent-hi">VITE_API_BASE</code> is set in your{' '}
              <code className="text-accent-hi">.env</code> file.
            </p>
            <button
              onClick={loadPortfolio}
              className="mt-2 px-5 py-2 text-[13px] font-medium text-white bg-accent rounded-lg hover:bg-accent-hi transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <Hero displayName={portfolio?.theme?.displayName || username} />
            <About />
            <Skills     skills={portfolio?.skills     || []} />
            <Experience experiences={portfolio?.experience || []} />
            <Projects   projects={portfolio?.projects  || []} />
            <Contact />
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}