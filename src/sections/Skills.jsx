import { skillGroups } from '../data'
import { SectionTag, SectionTitle, Pill, AnimatedSection } from '../components/ui'

const groupAccent = {
  blue:  'bg-accent/10',
  cyan:  'bg-[#30E5D0]/[0.09]',
  amber: 'bg-amber-500/10',
  coral: 'bg-rose-500/10',
}

export default function Skills() {
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
            Grouped by category.{' '}
            <span className="text-accent-hi">Highlighted</span> = where I move
            without thinking.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 gap-5">
          {skillGroups.map((group, i) => (
            <AnimatedSection key={group.id} delay={i * 0.08}>
              <div className="bg-[#121620] border border-white/[0.07] rounded-2xl p-7 h-full transition-all hover:border-white/[0.13] hover:-translate-y-0.5 duration-200">
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-9 h-9 rounded-md flex items-center justify-center text-[18px] ${groupAccent[group.color]}`}>
                    {group.icon}
                  </div>
                  <span className="font-display text-[14px] font-semibold text-white">
                    {group.title}
                  </span>
                </div>

                {/* Pills */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Pill key={skill.name} expert={skill.expert}>
                      {skill.name}
                    </Pill>
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
