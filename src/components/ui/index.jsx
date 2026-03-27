import { motion } from 'framer-motion'
import { useInView } from '../../hooks'

// ─── SectionTag ───────────────────────────────────────────────────
export function SectionTag({ children }) {
  return (
    <div className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] uppercase text-accent-hi mb-4">
      <span className="block w-5 h-px bg-accent" />
      {children}
    </div>
  )
}

// ─── SectionTitle ─────────────────────────────────────────────────
export function SectionTitle({ children, className = '' }) {
  return (
    <h2 className={`font-display text-3xl md:text-[38px] lg:text-[42px] font-bold leading-[1.12] tracking-[-0.03em] text-white mb-3 ${className}`}>
      {children}
    </h2>
  )
}

// ─── GlowDot ──────────────────────────────────────────────────────
export function GlowDot({ className = '' }) {
  return (
    <span className={`inline-block w-1.5 h-1.5 rounded-full bg-cyan-DEFAULT animate-pulse ${className}`} />
  )
}

// ─── Pill ─────────────────────────────────────────────────────────
export function Pill({ children, expert = false }) {
  return (
    <span className={expert
      ? 'text-[11px] font-medium px-3 py-[5px] rounded-full border border-accent/30 text-accent-hi bg-accent/10 cursor-default'
      : 'text-[11px] font-medium px-3 py-[5px] rounded-full border border-white/[0.07] text-gray-400 cursor-default transition-all hover:border-accent hover:text-accent-hi'
    }>
      {children}
    </span>
  )
}

// ─── TechTag ──────────────────────────────────────────────────────
export function TechTag({ children }) {
  return (
    <span className="text-[11px] font-medium px-[10px] py-1 rounded-md bg-[#181D27] text-gray-400 border border-white/[0.07]">
      {children}
    </span>
  )
}

// ─── AnimatedSection ──────────────────────────────────────────────
export function AnimatedSection({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView()
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── ImpactStat ───────────────────────────────────────────────────
export function ImpactStat({ value, label }) {
  return (
    <div>
      <div className="font-display text-xl font-bold text-[#30E5D0] tracking-tight">{value}</div>
      <div className="text-[11px] text-gray-500 mt-0.5">{label}</div>
    </div>
  )
}

// ─── Icon components ──────────────────────────────────────────────
export function ArrowRightIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function ExternalIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M6 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-3M10 2h4m0 0v4m0-4L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function GithubIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
    </svg>
  )
}

export function MailIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M2 4a1 1 0 011-1h10a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 4l6 5 6-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export function PhoneIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M5.4 2H3a1 1 0 00-1 1c0 7.18 5.82 13 13 13a1 1 0 001-1v-2.4a1 1 0 00-.75-.97l-2.5-.625a1 1 0 00-1.04.38l-.87 1.22A9.056 9.056 0 014.42 6.16l1.22-.87a1 1 0 00.38-1.04L5.4 2.75A1 1 0 004.42 2H5.4z" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  )
}

export function LinkedinIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 01.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
    </svg>
  )
}
