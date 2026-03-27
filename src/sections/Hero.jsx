import { motion } from 'framer-motion'
import { stats } from '../data'
import { ArrowRightIcon, MailIcon } from '../components/ui'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 md:px-10 overflow-hidden"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/[0.10] blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#30E5D0]/[0.07] blur-[100px]" />

      <div className="relative max-w-5xl mx-auto w-full">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col">

          {/* Availability badge */}
          <motion.div variants={item} className="mb-6">
            <span className="inline-flex items-center gap-2 text-[12px] font-medium text-[#30E5D0] bg-[#30E5D0]/[0.07] border border-[#30E5D0]/20 px-3 py-[5px] rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#30E5D0] animate-pulse" />
              Open to new opportunities · Indore, India
            </span>
          </motion.div>

          {/* Eyebrow */}
          <motion.p variants={item} className="text-[13px] text-gray-500 tracking-wide mb-5">
            React.js · TypeScript · Next.js · 4+ Years Professional Experience
          </motion.p>

          {/* Main headline */}
          <motion.h1
            variants={item}
            className="font-display font-extrabold leading-[1.0] tracking-[-0.045em] text-white mb-2"
            style={{ fontSize: 'clamp(46px, 8vw, 92px)' }}
          >
            Shubham
            <br />
            Patidar
            <br />
            <span className="bg-gradient-to-r from-accent-hi to-[#30E5D0] bg-clip-text text-transparent">
              builds fast.
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={item}
            className="text-gray-400 font-light leading-relaxed mt-5 mb-10 max-w-[520px]"
            style={{ fontSize: 'clamp(15px, 1.8vw, 18px)' }}
          >
            Frontend engineer with{' '}
            <strong className="text-gray-200 font-medium">4+ years</strong> shipping
            production React applications — from global enterprise platforms at{' '}
            <strong className="text-gray-200 font-medium">RWS Group</strong> to
            AI-powered tools and multi-country e-commerce. I turn complex
            requirements into interfaces users trust.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-3 mb-14">
            <button
              onClick={() => scrollTo('projects')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white text-[14px] font-medium rounded-[10px] transition-all hover:bg-accent-hi hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(91,139,255,0.35)]"
            >
              <ArrowRightIcon />
              View My Projects
            </button>
            <a
              href="mailto:patidarshubham18@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-gray-100 text-[14px] rounded-[10px] border border-white/[0.13] transition-all hover:border-accent hover:text-accent-hi"
            >
              <MailIcon />
              Get In Touch
            </a>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            variants={item}
            className="flex flex-wrap gap-8 pt-8 border-t border-white/[0.07]"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-[28px] font-bold text-white tracking-tight leading-none">
                  {s.value}
                  <span className="text-accent-hi">{s.suffix}</span>
                </div>
                <div className="text-[12px] text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
