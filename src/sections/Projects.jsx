import { projects } from '../data'
import { SectionTag, SectionTitle, AnimatedSection } from '../components/ui'
import ProjectCard from '../components/ProjectCard'

export default function Projects() {
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

        <div className="flex flex-col gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
