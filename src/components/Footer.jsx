import { GithubIcon, LinkedinIcon } from './ui'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/[0.07] py-8 px-6 md:px-10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-[12px] text-gray-500">© {year} Shubham Patidar · Indore, India</div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/Shubham77-dev" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-200 transition-colors" aria-label="GitHub">
            <GithubIcon size={17} />
          </a>
          <a href="https://linkedin.com/in/shubham-patidar-4794a721b" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-200 transition-colors" aria-label="LinkedIn">
            <LinkedinIcon size={17} />
          </a>
        </div>
        <div className="text-[12px] text-gray-600">
          Built with <span className="text-accent-hi">React</span> · <span className="text-accent-hi">Tailwind</span> · <span className="text-accent-hi">Framer Motion</span>
        </div>
      </div>
    </footer>
  )
}
