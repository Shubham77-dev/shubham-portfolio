import { SectionTag, SectionTitle, AnimatedSection } from '../components/ui'
import ProjectCard from '../components/ProjectCard'

export default function Projects({ projects = [] }) {
  const safeProjects = Array.isArray(projects) ? projects : []

  return (
    <section id="projects" className="py-24 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <SectionTag>Selected Work</SectionTag>
          <SectionTitle>
            Production work across
            <br />
            healthcare, AI, and e-commerce.
          </SectionTitle>
          <p className="text-[16px] text-gray-400 max-w-[480px] mb-14">
            Real projects, real users, real constraints — not tutorial clones.
          </p>
        </AnimatedSection>

        {safeProjects.length === 0 ? (
          /* ── Empty state ── */
          <AnimatedSection>
            <div className="bg-[#121620] border border-dashed border-white/[0.12] rounded-2xl p-10 flex flex-col items-center gap-3 text-center">
              <span className="text-3xl">🚀</span>
              <p className="text-[15px] text-gray-400 font-medium">Projects coming soon</p>
              <p className="text-[13px] text-gray-600">
                Add projects in the Admin panel → Projects tab.
              </p>
            </div>
          </AnimatedSection>
        ) : (
          <div className="flex flex-col gap-6">
            {safeProjects.map((project, i) => (
              <ProjectCard
                key={project._id || project.id || i}
                project={project}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}