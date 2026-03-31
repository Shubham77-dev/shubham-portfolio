import { SectionTag, SectionTitle, Pill, AnimatedSection } from '../components/ui'

// Skills come from the API as a flat array: [{ name, expert, _id }]
// We display them in two visual groups: Expert (highlighted) and Proficient.
export default function Skills({ skills = [] }) {
  const safeSkills = Array.isArray(skills) ? skills : []

  const expertSkills    = safeSkills.filter((s) => s.expert)
  const proficientSkills = safeSkills.filter((s) => !s.expert)

  const isEmpty = safeSkills.length === 0

  return (
    <section id="skills" className="py-24 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <SectionTag>Expertise</SectionTag>
          <SectionTitle>
            What I bring to
            <br />
            every codebase.
          </SectionTitle>
          <p className="text-[16px] text-gray-400 max-w-[480px] mb-14">
            <span className="text-accent-hi">Highlighted</span> = where I move
            without thinking. Everything else is production-proficient.
          </p>
        </AnimatedSection>

        {isEmpty ? (
          /* ── Empty state ── */
          <AnimatedSection>
            <div className="bg-[#121620] border border-dashed border-white/[0.12] rounded-2xl p-10 flex flex-col items-center gap-3 text-center">
              <span className="text-3xl">🛠️</span>
              <p className="text-[15px] text-gray-400 font-medium">Skills coming soon</p>
              <p className="text-[13px] text-gray-600">
                Add skills in the Admin panel → Skills tab.
              </p>
            </div>
          </AnimatedSection>
        ) : (
          <div className="flex flex-col gap-5">
            {/* Expert group */}
            {expertSkills.length > 0 && (
              <AnimatedSection>
                <div className="bg-[#121620] border border-white/[0.07] rounded-2xl p-7 transition-all hover:border-white/[0.13] duration-200">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-accent-hi" />
                    <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-accent-hi">
                      Expert
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {expertSkills.map((skill) => (
                      <Pill key={skill._id || skill.name} expert>
                        {skill.name}
                      </Pill>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* Proficient group */}
            {proficientSkills.length > 0 && (
              <AnimatedSection delay={0.06}>
                <div className="bg-[#121620] border border-white/[0.07] rounded-2xl p-7 transition-all hover:border-white/[0.13] duration-200">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-gray-500" />
                    <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-gray-500">
                      Proficient
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {proficientSkills.map((skill) => (
                      <Pill key={skill._id || skill.name}>
                        {skill.name}
                      </Pill>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )}
          </div>
        )}
      </div>
    </section>
  )
}