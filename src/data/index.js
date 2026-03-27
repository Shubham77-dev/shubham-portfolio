// ─── NAVIGATION LINKS ────────────────────────────────────────────
export const navLinks = [
  { label: 'About',      href: 'about'      },
  { label: 'Skills',     href: 'skills'     },
  { label: 'Experience', href: 'experience' },
  { label: 'Projects',   href: 'projects'   },
  { label: 'Contact',    href: 'contact'    },
]

// ─── SKILLS ──────────────────────────────────────────────────────
export const skillGroups = [
  {
    id: 'core',
    icon: '⚛️',
    title: 'Core Frontend',
    color: 'blue',
    skills: [
      { name: 'React.js',          expert: true  },
      { name: 'JavaScript',        expert: true  },
      { name: 'TypeScript',        expert: true  },
      { name: 'HTML5 / CSS3',      expert: true  },
      { name: 'Next.js',           expert: false },
      { name: 'Vite',              expert: false },
    ],
  },
  {
    id: 'state',
    icon: '🗂️',
    title: 'State & Data',
    color: 'cyan',
    skills: [
      { name: 'Redux',             expert: true  },
      { name: 'Redux Toolkit',     expert: true  },
      { name: 'React Query',       expert: false },
      { name: 'Context API',       expert: true  },
      { name: 'REST APIs',         expert: true  },
    ],
  },
  {
    id: 'styling',
    icon: '🎨',
    title: 'Styling',
    color: 'amber',
    skills: [
      { name: 'Tailwind CSS',      expert: true  },
      { name: 'CSS3 / SCSS',       expert: true  },
      { name: 'Bootstrap',         expert: true  },
      { name: 'Styled Components', expert: false },
      { name: 'Framer Motion',     expert: false },
    ],
  },
  {
    id: 'tooling',
    icon: '🛠️',
    title: 'Tooling & Testing',
    color: 'coral',
    skills: [
      { name: 'Git / GitHub',      expert: true  },
      { name: 'NPM / Yarn',        expert: true  },
      { name: 'Jest',              expert: false },
      { name: 'Node.js',           expert: false },
      { name: 'Firebase',          expert: false },
    ],
  },
]

// ─── EXPERIENCE ───────────────────────────────────────────────────
export const experiences = [
  {
    id: 1,
    period: 'Jan 2025 — Present',
    role: 'Software Developer',
    company: 'RWS Group',
    companyUrl: 'https://www.rws.com',
    location: 'Indore, India',
    type: 'Full-time',
    description:
      'Contributing to enterprise-grade frontend products at one of the world\'s leading language service and technology companies. Collaborating with senior engineers across the full project lifecycle — from architecture decisions through to production deployment. Responsible for developing and maintaining frontend modules with strict performance and accessibility standards.',
    tags: ['React.js', 'TypeScript', 'Enterprise Frontend', 'Agile'],
    current: true,
  },
  {
    id: 2,
    period: 'Jul 2022 — Nov 2024',
    role: 'Frontend Developer',
    company: 'Witmates Pvt. Ltd.',
    companyUrl: null,
    location: 'Indore, India (Remote)',
    type: 'Full-time · Builder.ai Platform',
    description:
      'Contributed to Builder.ai — a platform that lets non-technical founders build software products. Worked as part of a global, cross-functional team on the customer-facing frontend. Built and shipped features for the core app builder interface, handling real-time state management, complex form flows, and responsive layouts. 2+ years of deep ownership over long-running product features.',
    tags: ['React.js', 'Redux', 'Global Team', 'Builder.ai', 'TypeScript'],
    current: false,
  },
  {
    id: 3,
    period: 'Dec 2021 — Jul 2022',
    role: 'Web Developer',
    company: 'HB WebSol',
    companyUrl: null,
    location: 'Indore, India',
    type: 'Full-time',
    description:
      'First professional role — built and maintained client-facing web projects across multiple industries. Developed strong fundamentals in React.js, CSS, and maintaining production codebases under senior mentorship. Handled feature development, bug triage, and clean code handoffs.',
    tags: ['React.js', 'JavaScript', 'CSS', 'Client Projects'],
    current: false,
  },
  {
    id: 4,
    period: '2015 — 2019',
    role: 'Bachelor of Engineering',
    company: 'Shri Vaishnav Institute of Technology and Science',
    companyUrl: null,
    location: 'Indore, Madhya Pradesh',
    type: 'Computer Science',
    description:
      'Four-year CS degree covering data structures, algorithms, software engineering, and system design fundamentals that continue to inform architectural decisions in frontend work.',
    tags: ['Computer Science', 'Data Structures', 'Algorithms'],
    current: false,
    isEducation: true,
  },
]

// ─── PROJECTS ─────────────────────────────────────────────────────
export const projects = [
  {
    id: 1,
    num: '01',
    badge: 'AI · SaaS · Ongoing',
    title: 'HAI — AI Translation Platform',
    tagline: '"Reach audiences everywhere — in their language"',
    problem:
      'Creators and businesses waste hours coordinating with translators for every content update. There was no simple tool to handle bulk AI-powered translation with a clean dashboard for managing jobs across languages.',
    solution:
      'Building an AI-powered platform that enables creators to translate and distribute content across languages at scale. Full frontend architecture in React.js — file upload flows, real-time translation status tracking, and a polished multi-language job dashboard.',
    impact: [
      { value: 'Real-time', label: 'Status tracking' },
      { value: 'Multi-lang', label: 'Support' },
      { value: 'AI-first', label: 'Architecture' },
    ],
    tech: ['React.js', 'TypeScript', 'AI Integration', 'REST APIs', 'Dashboard UI'],
    liveUrl: null,
    githubUrl: 'https://github.com/Shubham77-dev',
    accentColor: 'blue',
    status: 'in-progress',
  },
  {
    id: 2,
    num: '02',
    badge: 'FinTech · Multi-country',
    title: 'Warranty App — Global Warranty Platform',
    tagline: '"One platform. Eight countries. Localised for each."',
    problem:
      'A warranty sales business needed to operate across 8 Middle East and APAC markets — each with different currencies, payment gateways, product catalogues, and compliance requirements — without maintaining 8 separate codebases.',
    solution:
      'A React.js SPA with a country-selector architecture that dynamically loads locale-specific configs — product catalogues, currency formatting, and payment gateway integrations. Built the in-app chat support interface and payment handling flows for all 8 markets.',
    impact: [
      { value: '8',        label: 'Countries supported' },
      { value: '1',        label: 'Unified codebase'    },
      { value: 'Payments', label: '+ Chat integrated'   },
    ],
    tech: ['React.js', 'Redux', 'i18n', 'Payment APIs', 'Chat Integration', 'TypeScript'],
    liveUrl: null,
    githubUrl: null,
    accentColor: 'amber',
    status: 'shipped',
  },
  {
    id: 3,
    num: '03',
    badge: 'Healthcare · Full-stack',
    title: 'AdinaHealth — Online Doctor Consulting',
    tagline: '"Book a specialist in seconds. Manage everything from one dashboard."',
    problem:
      'Patients needed a frictionless way to book specialist consultations online. Doctors needed a simple availability calendar and inventory manager — without a bloated admin panel.',
    solution:
      'Built the complete React.js frontend over a Codeigniter backend. Designed the appointment booking flow (specialisation → doctor → time slot → confirmation) as a multi-step form with optimistic UI updates. Doctors get a real-time availability calendar with slot locking to prevent double-bookings.',
    impact: [
      { value: '3-step', label: 'Booking flow'   },
      { value: '2 roles', label: 'Patient + Doctor UI' },
      { value: 'Live',    label: 'Slot locking'  },
    ],
    tech: ['React.js', 'Codeigniter API', 'Calendar UI', 'Multi-role Auth', 'Booking Flows'],
    liveUrl: 'https://adinahealth.com',
    githubUrl: null,
    accentColor: 'coral',
    status: 'shipped',
  },
  {
    id: 4,
    num: '04',
    badge: 'Social Platform',
    title: 'IdeaAtlas — Collaborative Idea Development',
    tagline: '"Co-build ideas. Version them. Watch them evolve."',
    problem:
      'Teams lose great ideas because they live in scattered notes, emails, or chat messages — with no way to version, fork, or co-develop them over time.',
    solution:
      'A social platform where users collaboratively develop ideas through versioned "iterations" — each containing context, problem, and solution. Built a tree-structured state model in Redux and a custom timeline component for version history navigation.',
    impact: [
      { value: 'Versioned', label: 'Iterations'     },
      { value: 'Real-time', label: 'Collaboration'  },
      { value: 'Redux',     label: 'Tree state model' },
    ],
    tech: ['React.js', 'Redux', 'Node.js', 'Version Control UI', 'Social Features'],
    liveUrl: null,
    githubUrl: 'https://github.com/Shubham77-dev/ideaProject',
    accentColor: 'purple',
    status: 'shipped',
  },
]

// ─── STATS ────────────────────────────────────────────────────────
export const stats = [
  { value: '4+',  suffix: '',  label: 'Years experience'           },
  { value: '3',   suffix: '',  label: 'Companies worked at'        },
  { value: '6+',  suffix: '',  label: 'Production projects'        },
  { value: '8',   suffix: '',  label: 'Countries served (Warranty)' },
]

// ─── CONTACT ──────────────────────────────────────────────────────
export const contactLinks = [
  {
    icon: 'mail',
    label: 'patidarshubham18@gmail.com',
    href: 'mailto:patidarshubham18@gmail.com',
  },
  {
    icon: 'phone',
    label: '+91 77488 10294',
    href: 'tel:+917748810294',
  },
  {
    icon: 'linkedin',
    label: 'linkedin.com/in/shubham-patidar',
    href: 'https://linkedin.com/in/shubham-patidar-4794a721b',
  },
  {
    icon: 'github',
    label: 'github.com/Shubham77-dev',
    href: 'https://github.com/Shubham77-dev',
  },
]
