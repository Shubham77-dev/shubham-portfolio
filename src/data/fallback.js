// src/data/fallback.js
//
// Static Shubham portfolio data — used when:
//   a) VITE_API_BASE is not set, OR
//   b) The backend API call fails (network error, server down, etc.)
//
// Shape matches the API response: GET /portfolio/:username
// so App.jsx can use it without any conditional logic in child components.

export const FALLBACK_USERNAME = 'shubham' || "";

export const fallbackPortfolio = {
  // theme — drives Hero section display name
  theme: {
    displayName: 'Shubham Patidar',
    location:    'Indore, India',
    tagline:     'React.js · TypeScript · Next.js · 4+ Years',
    bio:         'Frontend engineer specialising in React.js — crafting performant, accessible, and visually precise web experiences.',
  },

  // skills — flat array matching API shape [{name, expert}]
  skills: [
    { name: 'React.js',          expert: true  },
    { name: 'JavaScript',        expert: true  },
    { name: 'TypeScript',        expert: true  },
    { name: 'HTML5 / CSS3',      expert: true  },
    { name: 'Next.js',           expert: false },
    { name: 'Redux',             expert: true  },
    { name: 'Redux Toolkit',     expert: true  },
    { name: 'React Query',       expert: false },
    { name: 'Context API',       expert: true  },
    { name: 'REST APIs',         expert: true  },
    { name: 'Tailwind CSS',      expert: true  },
    { name: 'CSS3 / SCSS',       expert: true  },
    { name: 'Bootstrap',         expert: true  },
    { name: 'Styled Components', expert: false },
    { name: 'Framer Motion',     expert: false },
    { name: 'Git / GitHub',      expert: true  },
    { name: 'NPM / Yarn',        expert: true  },
    { name: 'Jest',              expert: false },
    { name: 'Node.js',           expert: false },
    { name: 'Firebase',          expert: false },
  ],

  // experience — same shape as ExperienceSchema in Portfolio.js
  experience: [
    {
      id:          1,
      period:      'Jan 2025 — Present',
      role:        'Software Developer',
      company:     'RWS Group',
      companyUrl:  'https://www.rws.com',
      location:    'Indore, India',
      type:        'Full-time',
      description: 'Contributing to enterprise-grade frontend products at one of the world\'s leading language service and technology companies. Collaborating with senior engineers across the full project lifecycle — from architecture decisions through to production deployment.',
      tags:        ['React.js', 'TypeScript', 'Enterprise Frontend', 'Agile'],
      current:     true,
      isEducation: false,
    },
    {
      id:          2,
      period:      'Jul 2022 — Nov 2024',
      role:        'Frontend Developer',
      company:     'Witmates Pvt. Ltd.',
      companyUrl:  null,
      location:    'Indore, India (Remote)',
      type:        'Full-time · Builder.ai Platform',
      description: 'Contributed to Builder.ai — a platform that lets non-technical founders build software products. Worked as part of a global, cross-functional team on the customer-facing frontend. Built and shipped features for the core app builder interface, handling real-time state management, complex form flows, and responsive layouts.',
      tags:        ['React.js', 'Redux', 'Global Team', 'Builder.ai', 'TypeScript'],
      current:     false,
      isEducation: false,
    },
    {
      id:          3,
      period:      'Dec 2021 — Jul 2022',
      role:        'Web Developer',
      company:     'HB WebSol',
      companyUrl:  null,
      location:    'Indore, India',
      type:        'Full-time',
      description: 'First professional role — built and maintained client-facing web projects. Developed strong fundamentals in React.js, CSS, and maintaining production codebases under senior mentorship.',
      tags:        ['React.js', 'JavaScript', 'CSS', 'Client Projects'],
      current:     false,
      isEducation: false,
    },
    {
      id:          4,
      period:      '2015 — 2019',
      role:        'Bachelor of Engineering',
      company:     'Shri Vaishnav Institute of Technology and Science',
      companyUrl:  null,
      location:    'Indore, Madhya Pradesh',
      type:        'Computer Science',
      description: 'Four-year CS degree covering data structures, algorithms, software engineering, and system design fundamentals.',
      tags:        ['Computer Science', 'Data Structures', 'Algorithms'],
      current:     false,
      isEducation: true,
    },
  ],

  // projects — same shape as ProjectSchema in Portfolio.js
  projects: [
    {
      id:          1,
      num:         '01',
      badge:       'AI · SaaS · Ongoing',
      title:       'HAI — AI Translation Platform',
      tagline:     '"Reach audiences everywhere — in their language"',
      problem:     'Creators and businesses waste hours coordinating with translators for every content update.',
      solution:    'An AI-powered platform that enables creators to translate and distribute content across languages at scale. Full frontend in React.js — file upload flows, real-time translation status, and a polished multi-language job dashboard.',
      impact:      [{ value: 'Real-time', label: 'Status tracking' }, { value: 'Multi-lang', label: 'Support' }, { value: 'AI-first', label: 'Architecture' }],
      tech:        ['React.js', 'TypeScript', 'AI Integration', 'REST APIs'],
      liveUrl:     null,
      githubUrl:   'https://github.com/Shubham77-dev',
      accentColor: 'blue',
      status:      'in-progress',
    },
    {
      id:          2,
      num:         '02',
      badge:       'FinTech · Multi-country',
      title:       'Warranty App — Global Warranty Platform',
      tagline:     '"One platform. Eight countries. Localised for each."',
      problem:     'A warranty sales business needed to operate across 8 markets — each with different currencies, payment gateways, and catalogues — without maintaining 8 separate codebases.',
      solution:    'A React.js SPA with a country-selector architecture that dynamically loads locale-specific configs — product catalogues, currency formatting, and payment gateway integrations.',
      impact:      [{ value: '8', label: 'Countries supported' }, { value: '1', label: 'Unified codebase' }, { value: 'Payments', label: '+ Chat integrated' }],
      tech:        ['React.js', 'Redux', 'i18n', 'Payment APIs', 'TypeScript'],
      liveUrl:     null,
      githubUrl:   null,
      accentColor: 'amber',
      status:      'shipped',
    },
    {
      id:          3,
      num:         '03',
      badge:       'Healthcare · Full-stack',
      title:       'AdinaHealth — Online Doctor Consulting',
      tagline:     '"Book a specialist in seconds. Manage everything from one dashboard."',
      problem:     'Patients needed a frictionless way to book specialist consultations. Doctors needed a simple availability calendar without a bloated admin panel.',
      solution:    'Complete React.js frontend over a Codeigniter backend. Multi-step booking flow with optimistic UI. Real-time availability calendar with slot locking.',
      impact:      [{ value: '3-step', label: 'Booking flow' }, { value: '2 roles', label: 'Patient + Doctor UI' }, { value: 'Live', label: 'Slot locking' }],
      tech:        ['React.js', 'Codeigniter API', 'Calendar UI', 'Multi-role Auth'],
      liveUrl:     'https://adinahealth.com',
      githubUrl:   null,
      accentColor: 'coral',
      status:      'shipped',
    },
  ],
};