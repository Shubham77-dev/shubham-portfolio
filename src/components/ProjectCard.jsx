import { motion } from 'framer-motion'
import { TechTag, ImpactStat, ExternalIcon, GithubIcon } from './ui'

const accentMap = {
  blue:   { badge: 'bg-accent/10 text-accent-hi border-accent/20',     impact: 'bg-accent/[0.05] border-accent/[0.12]'    },
  cyan:   { badge: 'bg-[#30E5D0]/10 text-[#30E5D0] border-[#30E5D0]/20', impact: 'bg-[#30E5D0]/[0.05] border-[#30E5D0]/[0.12]' },
  amber:  { badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20', impact: 'bg-amber-500/[0.05] border-amber-500/[0.12]' },
  coral:  { badge: 'bg-rose-500/10 text-rose-300 border-rose-500/20',   impact: 'bg-rose-500/[0.05] border-rose-500/[0.12]'   },
  purple: { badge: 'bg-violet-500/10 text-violet-300 border-violet-500/20', impact: 'bg-violet-500/[0.05] border-violet-500/[0.12]' },
}

export default function ProjectCard({ project, index }) {
  const accent = accentMap[project.accentColor] || accentMap.blue

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      className="bg-[#121620] border border-white/[0.07] rounded-2xl overflow-hidden transition-all hover:border-white/[0.13] group"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Content */}
        <div className="flex-1 p-8 lg:p-10">
          {/* Meta row */}
          <div className="flex items-center gap-3 mb-4">
            <span className="font-display text-[12px] font-bold text-gray-600 tracking-widest">
              {project.num}
            </span>
            <span className={`text-[10px] font-medium px-3 py-[3px] rounded-full border ${accent.badge}`}>
              {project.badge}
            </span>
            {project.status === 'in-progress' && (
              <span className="text-[10px] font-medium text-[#30E5D0] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#30E5D0] animate-pulse" />
                In progress
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-display text-[20px] md:text-[24px] font-bold text-white tracking-tight leading-tight mb-2">
            {project.title}
          </h3>

          {/* Tagline */}
          <p className="text-[14px] text-[#30E5D0] font-medium italic mb-5">
            {project.tagline}
          </p>

          {/* Problem / Solution */}
          <div className="space-y-4 mb-5">
            <div>
              <div className="text-[10px] font-medium tracking-[0.08em] uppercase text-gray-600 mb-1">
                The Problem
              </div>
              <p className="text-[14px] text-gray-400 leading-relaxed">{project.problem}</p>
            </div>
            <div>
              <div className="text-[10px] font-medium tracking-[0.08em] uppercase text-gray-600 mb-1">
                My Solution
              </div>
              <p className="text-[14px] text-gray-400 leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* Impact bar */}
          <div className={`flex gap-6 flex-wrap rounded-xl p-4 mb-5 border ${accent.impact}`}>
            {project.impact.map((s) => (
              <ImpactStat key={s.label} value={s.value} label={s.label} />
            ))}
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <TechTag key={t}>{t}</TechTag>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[12px] font-medium px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-hi transition-all"
              >
                <ExternalIcon />
                Live Site
              </a>
            )}
            {!project.liveUrl && project.status === 'in-progress' && (
              <span className="inline-flex items-center gap-2 text-[12px] font-medium px-4 py-2 bg-accent/20 text-accent-hi rounded-md border border-accent/20 cursor-default">
                Coming Soon
              </span>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[12px] font-medium px-4 py-2 border border-white/[0.13] text-gray-400 rounded-md hover:border-accent hover:text-accent-hi transition-all"
              >
                <GithubIcon />
                GitHub
              </a>
            )}
            {!project.liveUrl && !project.githubUrl && project.status === 'shipped' && (
              <span className="inline-flex items-center gap-2 text-[12px] font-medium px-4 py-2 border border-white/[0.07] text-gray-500 rounded-md cursor-default">
                Private / Client Work
              </span>
            )}
          </div>
        </div>

        {/* Decorative visual panel */}
        <div className={`hidden lg:flex w-[280px] flex-shrink-0 items-center justify-center p-8 
          ${project.accentColor === 'blue'   ? 'bg-gradient-to-br from-[#080B12] to-[#0e0e24]' : ''}
          ${project.accentColor === 'amber'  ? 'bg-gradient-to-br from-[#080B12] to-[#141008]' : ''}
          ${project.accentColor === 'coral'  ? 'bg-gradient-to-br from-[#080B12] to-[#11080f]' : ''}
          ${project.accentColor === 'purple' ? 'bg-gradient-to-br from-[#080B12] to-[#0f0b1a]' : ''}
          ${project.accentColor === 'cyan'   ? 'bg-gradient-to-br from-[#080B12] to-[#071814]' : ''}
        `}>
          <MockBrowser project={project} accent={accent} />
        </div>
      </div>
    </motion.div>
  )
}

// ─── Browser mockup ───────────────────────────────────────────────
function MockBrowser({ project, accent }) {
  return (
    <div className="w-full max-w-[240px] bg-[#0D1017] rounded-lg border border-white/[0.07] overflow-hidden shadow-2xl">
      {/* Bar */}
      <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-white/[0.07]">
        <span className="w-2 h-2 rounded-full bg-rose-500/70" />
        <span className="w-2 h-2 rounded-full bg-amber-500/70" />
        <span className="w-2 h-2 rounded-full bg-[#30E5D0]/70" />
        <div className="flex-1 ml-2 bg-[#121620] rounded h-4 flex items-center px-2">
          <span className="text-[9px] text-gray-600 font-mono truncate">{project.title.split(' ')[0].toLowerCase()}.app</span>
        </div>
      </div>
      {/* Body */}
      <div className="p-4 space-y-2">
        <div className={`h-2 rounded-full w-[55%] ${accent.badge.includes('accent') ? 'bg-accent/40' : 'bg-[#30E5D0]/30'}`} />
        <div className="h-[5px] rounded bg-white/[0.08] w-full" />
        <div className="h-[5px] rounded bg-white/[0.05] w-[70%]" />
        <div className="grid grid-cols-2 gap-2 pt-2">
          <div className="h-11 rounded-md bg-white/[0.04] border border-white/[0.06]" />
          <div className={`h-11 rounded-md border ${accent.impact}`} />
          <div className="h-11 rounded-md bg-white/[0.04] border border-white/[0.06]" />
          <div className="h-11 rounded-md bg-white/[0.04] border border-white/[0.06]" />
        </div>
      </div>
    </div>
  )
}
