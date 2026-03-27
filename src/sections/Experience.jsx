import { experiences } from '../data'
import { SectionTag, SectionTitle, AnimatedSection } from '../components/ui'

export default function Experience() {
  return (
    <section id="experience" className="bg-[#0D1017] py-24 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <SectionTag>Work Experience</SectionTag>
          <SectionTitle>
            4+ years across
            <br />
            enterprise, startup, and agency.
          </SectionTitle>
        </AnimatedSection>

        {/* Timeline */}
        <div className="mt-14 relative pl-7">
          {/* Vertical line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-accent via-[#30E5D0]/60 to-transparent" />

          {experiences.map((exp, i) => (
            <AnimatedSection key={exp.id} delay={i * 0.08}>
              <div className="relative pb-12 last:pb-0">
                {/* Dot */}
                <div className={`absolute -left-[30px] top-[7px] w-[9px] h-[9px] rounded-full border-2 border-[#0D1017]
                  ${exp.current ? 'bg-accent shadow-[0_0_10px_rgba(91,139,255,0.5)]' : 'bg-accent/60'}
                `} />

                {/* Period */}
                <div className={`text-[11px] font-medium tracking-[0.06em] uppercase mb-1 
                  ${exp.current ? 'text-accent-hi' : 'text-gray-500'}`}>
                  {exp.period}
                  {exp.current && (
                    <span className="ml-2 inline-flex items-center gap-1 text-[#30E5D0] normal-case tracking-normal">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#30E5D0] animate-pulse" />
                      Current
                    </span>
                  )}
                </div>

                {/* Role */}
                <h3 className="font-display text-[19px] font-bold text-white tracking-tight mb-1">
                  {exp.role}
                </h3>

                {/* Company */}
                <div className="text-[14px] text-gray-400 mb-4">
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-hi hover:underline"
                    >
                      {exp.company}
                    </a>
                  ) : (
                    <span>{exp.company}</span>
                  )}
                  {' · '}
                  <span className="text-gray-500">{exp.type}</span>
                  {' · '}
                  <span className="text-gray-500">{exp.location}</span>
                </div>

                {/* Description */}
                <p className="text-[14px] text-gray-400 leading-[1.72] max-w-[620px] mb-3">
                  {exp.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium px-[10px] py-[3px] rounded-full bg-[#181D27] text-gray-500 border border-white/[0.07]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
