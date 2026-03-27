import { SectionTag, SectionTitle, AnimatedSection } from '../components/ui'

const valueCards = [
  {
    icon: '🌍',
    title: 'Global product experience',
    desc: 'Built and shipped features used across 8 countries — Kuwait, UAE, Qatar, Bahrain, Oman, KSA, Egypt, and New Zealand.',
  },
  {
    icon: '🤝',
    title: 'Remote-first collaboration',
    desc: 'Worked on globalised teams at Witmates — async communication, PR reviews, and cross-timezone delivery are second nature.',
  },
  {
    icon: '🚀',
    title: 'Breadth across domains',
    desc: 'Healthcare, EdTech, FinTech, Social platforms — I context-switch fast and ramp up without hand-holding.',
  },
]

export default function About() {
  return (
    <section id="about" className="bg-[#0D1017] py-24 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <SectionTag>About Me</SectionTag>
          <SectionTitle>
            More than a React developer.
            <br />
            A product-minded engineer.
          </SectionTitle>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-16 mt-14 items-start">
          {/* Story */}
          <AnimatedSection delay={0.05}>
            <div className="space-y-5 text-[16px] text-gray-400 font-light leading-[1.78]">
              <p>
                I started my frontend journey in 2021 at{' '}
                <strong className="text-gray-200 font-medium">HB WebSol</strong>, where I
                learned what it means to own code end-to-end — not just build it, but
                maintain it, debug it at 11pm, and hand it off cleanly.
              </p>
              <p>
                At{' '}
                <strong className="text-gray-200 font-medium">Witmates</strong>, I joined
                a global team working on{' '}
                <span className="text-accent-hi">Builder.ai</span> — one of the most
                ambitious app-building platforms in the world. Collaborating across
                timezones taught me that the quality of your code matters far less than
                your ability to communicate what it does.
              </p>
              <p>
                Now at{' '}
                <strong className="text-gray-200 font-medium">RWS Group</strong>, I'm
                contributing to enterprise-grade products where performance,
                accessibility, and correctness aren't optional. I bring the same
                attention to detail whether I'm building a reusable component or
                debugging a hydration mismatch in production.
              </p>
              <p>
                Outside work I'm building{' '}
                <strong className="text-gray-200 font-medium">HAI</strong> — an
                AI-powered translation platform — and exploring everything from
                TypeScript generics to the science of cricket.
              </p>
            </div>
          </AnimatedSection>

          {/* Cards */}
          <div className="flex flex-col gap-4">
            {valueCards.map((card, i) => (
              <AnimatedSection key={card.title} delay={0.1 + i * 0.08}>
                <div className="bg-[#121620] border border-white/[0.07] rounded-2xl p-5 transition-all hover:border-white/[0.13] hover:translate-x-1 duration-200">
                  <div className="text-xl mb-2">{card.icon}</div>
                  <div className="font-display text-[14px] font-semibold text-white mb-1.5">
                    {card.title}
                  </div>
                  <div className="text-[13px] text-gray-400 leading-relaxed">{card.desc}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
