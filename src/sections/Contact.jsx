import { useState } from 'react'
import { motion } from 'framer-motion'
import { contactLinks } from '../data'
import { SectionTag, AnimatedSection, MailIcon, PhoneIcon, LinkedinIcon, GithubIcon, ArrowRightIcon } from '../components/ui'

const iconMap = {
  mail:     MailIcon,
  phone:    PhoneIcon,
  linkedin: LinkedinIcon,
  github:   GithubIcon,
}

export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const mailto = `mailto:patidarshubham18@gmail.com?subject=Portfolio Inquiry from ${form.name}&body=${encodeURIComponent(form.message + '\n\nFrom: ' + form.email)}`
    window.location.href = mailto
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="bg-[#0D1017] py-24 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <SectionTag>Get In Touch</SectionTag>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-14 items-start mt-4">
          {/* Left */}
          <AnimatedSection delay={0.05}>
            <h2 className="font-display text-[28px] md:text-[36px] font-bold text-white tracking-tight leading-[1.2] mb-4">
              Looking for a React engineer who ships?{' '}
              <span className="text-accent-hi">Let's talk.</span>
            </h2>
            <p className="text-[15px] text-gray-400 leading-[1.72] max-w-[380px] mb-8">
              Open to full-time frontend roles, contract work, and interesting side projects —
              especially anything involving React, TypeScript, or product-level UI challenges.
            </p>
            <div className="flex flex-col gap-3">
              {contactLinks.map((link) => {
                const Icon = iconMap[link.icon]
                return (
                  <a
                    key={link.icon}
                    href={link.href}
                    target={link.icon !== 'mail' && link.icon !== 'phone' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[14px] text-gray-400 px-4 py-3 rounded-xl border border-white/[0.07] bg-[#121620] transition-all hover:border-accent hover:text-gray-200 group"
                  >
                    <div className="w-8 h-8 rounded-md bg-[#181D27] flex items-center justify-center text-gray-400 group-hover:text-accent-hi transition-colors flex-shrink-0">
                      {Icon && <Icon size={15} />}
                    </div>
                    <span className="truncate">{link.label}</span>
                  </a>
                )
              })}
            </div>
          </AnimatedSection>

          {/* Right — Form */}
          <AnimatedSection delay={0.1}>
            <div className="bg-[#121620] border border-white/[0.07] rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[12px] font-medium text-gray-400 mb-2 tracking-wide">Your name</label>
                  <input
                    type="text" required placeholder="Jane Smith"
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#080B12] border border-white/[0.07] rounded-xl text-gray-100 text-[14px] px-4 py-3 outline-none transition-all focus:border-accent placeholder:text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-gray-400 mb-2 tracking-wide">Email address</label>
                  <input
                    type="email" required placeholder="jane@company.com"
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#080B12] border border-white/[0.07] rounded-xl text-gray-100 text-[14px] px-4 py-3 outline-none transition-all focus:border-accent placeholder:text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-gray-400 mb-2 tracking-wide">Message</label>
                  <textarea
                    required rows={4}
                    placeholder="Full-time role, freelance project, or just a chat..."
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[#080B12] border border-white/[0.07] rounded-xl text-gray-100 text-[14px] px-4 py-3 outline-none transition-all focus:border-accent placeholder:text-gray-600 resize-none"
                  />
                </div>
                <motion.button
                  type="submit" whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[14px] font-medium transition-all ${
                    submitted ? 'bg-[#30E5D0] text-black' : 'bg-accent text-white hover:bg-accent-hi hover:shadow-[0_6px_22px_rgba(91,139,255,0.35)]'
                  }`}
                >
                  {submitted ? '✓ Opening your mail client…' : <><span>Send Message</span><ArrowRightIcon /></>}
                </motion.button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
