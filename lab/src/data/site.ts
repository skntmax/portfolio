export const site = {
  name: 'Shashi Kant',
  monogram: 'SK',
  role: 'Senior Software Engineer',
  company: 'Paytm',
  status: 'Open to Senior / Lead roles',
  email: 'skntjee@gmail.com',
  phone: '+91 7860735070',
  location: 'Noida, Uttar Pradesh',
  timezone: 'IST (UTC+5:30)',
  notice: 'Standard · open to Senior / Lead roles',
  degree: 'B.Tech (CSE)',
  website: 'http://codexcave.com',
  resumeUrl: '/assets/Shashikant_Aug_2026.pdf',
  photoUrl: '/assets/profile-photo.png',
  narrative: 'Engineering reliable systems behind complex digital products.',
  secondary:
    'Backend architecture × distributed systems × full-stack product engineering.',
  headline: ['Engineering', 'systems that', 'scale.'],
  supporting:
    'Senior Software Engineer building high-availability fintech and enterprise systems with Java, Spring Boot, Kafka, Redis and cloud-native architecture.',
  statement:
    'Senior Backend / Full-Stack Engineer specializing in distributed systems, fintech infrastructure, event-driven architecture, and high-availability applications.',
  aboutParagraphs: [
    'I have 5+ years of experience building cloud-native applications — with strong work in microservices, REST APIs, event-driven systems, distributed systems, and Domain-Driven Design (DDD).',
    'Day to day I work with Java Spring Boot, Node.js, NestJS, Kafka, Redis, and AWS, plus system design (HLD/LLD), API gateways, database tuning, Docker/Kubernetes, CI/CD, and performance engineering.',
    'Currently at Paytm (Noida); previously PolicyBazaar – PB Partners and Value Innovation Labs. I care about reliability, observability, and clear architecture.',
  ],
  aboutClosing:
    'At Paytm I work on Spring Boot + Kafka services with high availability, API Gateway, rate limiting, Redis, and circuit breakers. Earlier: Nest.js microservices at PolicyBazaar; CCIL, EPIL, and Rozgar.com (70K+ job migration, AI resume tools) at Value Innovation Labs. Flagship build: SwiftCab.in (real-time cab booking); also Codexcave.com.',
  stackChips: ['Java', 'Spring', 'Kafka', 'Redis', 'React', 'AWS', 'K8s'],
  domains: [
    'Fintech',
    'Enterprise',
    'Government platforms',
    'Developer products',
    'AI-powered applications',
  ],
  social: {
    github: 'https://github.com/skntmax',
    linkedin: 'https://www.linkedin.com/in/shashi-kant-5a1710185/',
    youtube: 'https://www.youtube.com/@skntmax',
    twitter: 'https://twitter.com/Shashik84927339',
    instagram: 'https://www.instagram.com/skntmax/',
  },
} as const

export const nav = [
  { id: 'systems', label: 'Systems', href: '#systems' },
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'shorts', label: 'Shorts', href: '#project_shorts' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'lab', label: 'Lab', href: '#lab' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'contact', label: 'Contact', href: '#contact' },
] as const

export const heroProof = [
  { value: '5+ YEARS', label: 'Fintech + Enterprise' },
  { value: 'DISTRIBUTED', label: 'Systems focus' },
  { value: 'HA', label: 'Cloud-native delivery' },
] as const

export const impact = [
  {
    value: '100K+',
    label: 'Daily transactions',
    note: 'Microservices at Value Innovation Labs with high reliability',
  },
  {
    value: '70K+',
    label: 'Jobs migrated',
    note: 'MongoDB → MySQL structured mapping for Rozgar.com',
  },
  {
    value: 'HA',
    label: 'Fintech on Kubernetes',
    note: 'Zamtel gov payments — Java microservices + secure Node BFF',
  },
  {
    value: '↓ Latency',
    label: 'Redis + API tuning',
    note: 'Distributed caching, rate limiting, DB/query optimization at Paytm',
  },
  {
    value: 'Resilient',
    label: 'Circuit breakers',
    note: 'Fault-tolerant request paths under failure conditions',
  },
  {
    value: '5 yrs',
    label: 'Fintech & Enterprise',
    note: 'Paytm → PolicyBazaar → gov platforms (CCIL / EPIL)',
  },
] as const

export const glance = [
  { label: 'Open to', value: 'Senior / Lead full-stack or backend roles' },
  { label: 'Domain', value: 'Fintech · Enterprise · Gov platforms' },
  { label: 'Stack focus', value: 'Java Spring · NestJS · React/Next · Kafka' },
  { label: 'Location', value: 'Noida · IST · Remote-friendly discussions' },
] as const

export const howIWork = [
  {
    code: '01',
    title: 'Own the outcome',
    body: 'Design → API → Deploy → Production health. Prefer clear SLAs over vague “done”.',
  },
  {
    code: '02',
    title: 'Design for failure',
    body: 'Circuit breakers, rate limits, caching, and graceful degradation — especially in payments and partner flows.',
  },
  {
    code: '03',
    title: 'Observe everything',
    body: 'Logs, metrics, performance, and production health so issues are visible before customers feel them.',
  },
  {
    code: '04',
    title: 'Build with the team',
    body: 'HLD, LLD, thoughtful reviews, and product collaboration — leave systems easier to maintain.',
  },
] as const

export type SkillGroup = {
  id: string
  label: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'backend',
    label: 'Backend',
    items: ['Java', 'Spring Boot', 'Node.js', 'NestJS', 'Express'],
  },
  {
    id: 'distributed',
    label: 'Distributed Systems',
    items: [
      'Kafka',
      'Microservices',
      'DDD',
      'Event-driven architecture',
      'System Design',
    ],
  },
  {
    id: 'data',
    label: 'Data',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Redux Toolkit'],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    items: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
  },
  {
    id: 'security',
    label: 'Security',
    items: ['JWT', 'OAuth2', 'RBAC', 'API Security'],
  },
  {
    id: 'ai',
    label: 'AI',
    items: ['LLM', 'OpenAI', 'AI Agents', 'n8n'],
  },
]

/** Skill levels from the live portfolio (percentage bars). */
export const skillLevels = [
  { name: 'Java / Spring Boot', level: 90 },
  { name: 'Node.js / NestJS / Express', level: 90 },
  { name: 'JavaScript (ES6+) / TypeScript', level: 95 },
  { name: 'React.js / Next.js / Redux Toolkit', level: 95 },
  { name: 'PostgreSQL / MySQL / MongoDB', level: 90 },
  { name: 'Redis / Caching / Rate Limiting', level: 85 },
  { name: 'Apache Kafka / Event-Driven Architecture', level: 85 },
  { name: 'Microservices / Distributed Systems / DDD', level: 88 },
  { name: 'System Design (HLD/LLD) / DSA', level: 85 },
  { name: 'AWS (EC2, S3, SQS, RDS)', level: 85 },
  { name: 'Docker / Kubernetes', level: 85 },
  { name: 'CI/CD (Jenkins, GitHub Actions)', level: 80 },
  { name: 'Security (JWT, OAuth2, RBAC, API Security)', level: 85 },
  { name: 'Observability & Performance Engineering', level: 80 },
  { name: 'AI Agents / LLM / OpenAI / n8n', level: 75 },
  { name: 'Python / SQL', level: 80 },
  { name: 'React Query / GraphQL / Material UI', level: 80 },
  { name: 'Golang (exploring)', level: 60 },
] as const

export const reliabilityDepth = {
  reliability: [
    'API Gateway · load balancing · rate limiting',
    'Circuit breakers · fault tolerance · HA design',
    'Idempotent APIs · secure request lifecycles',
  ],
  data: [
    'Kafka event-driven / pub-sub architectures',
    'Redis caching & fast state for real-time flows',
    'PostgreSQL / MySQL / MongoDB · indexing · query tuning',
  ],
  security: [
    'JWT · OAuth2 · RBAC · API security',
    'Crypto BFF (symmetric + asymmetric) on Zamtel',
    'Docker · Kubernetes · Jenkins / GitHub Actions · AWS',
  ],
} as const

export type SystemNode = {
  id: string
  label: string
  tech: string
  purpose: string
  failure: string
  scaling: string
}

export const systemNodes: SystemNode[] = [
  {
    id: 'client',
    label: 'Client',
    tech: 'React / TypeScript',
    purpose: 'Product surfaces and operator tools',
    failure: 'Graceful empty / retry states',
    scaling: 'CDN + code splitting',
  },
  {
    id: 'gateway',
    label: 'API Gateway',
    tech: 'Gateway · rate limiting',
    purpose: 'Secure entry, routing, throttling',
    failure: 'Rate limits + load shedding',
    scaling: 'Horizontal gateway replicas',
  },
  {
    id: 'auth',
    label: 'Auth',
    tech: 'JWT · OAuth2 · RBAC',
    purpose: 'Identity and authorization boundaries',
    failure: 'Deny by default · token expiry',
    scaling: 'Stateless token verification',
  },
  {
    id: 'services',
    label: 'Microservices',
    tech: 'Spring Boot · NestJS',
    purpose: 'Domain services and business logic',
    failure: 'Circuit breakers · timeouts',
    scaling: 'Service isolation · replication',
  },
  {
    id: 'kafka',
    label: 'Kafka',
    tech: 'Event bus',
    purpose: 'Event-driven communication',
    failure: 'Retries · DLQ patterns',
    scaling: 'Horizontal partitions · async fan-out',
  },
  {
    id: 'redis',
    label: 'Redis',
    tech: 'Cache · hot state',
    purpose: 'Latency reduction and fast state',
    failure: 'Cache miss fallback to source',
    scaling: 'Distributed cache clusters',
  },
  {
    id: 'database',
    label: 'Database',
    tech: 'PostgreSQL / MySQL / MongoDB',
    purpose: 'Durable system of record',
    failure: 'Replication · backups · indexes',
    scaling: 'Query tuning · partitioning',
  },
  {
    id: 'obs',
    label: 'Observability',
    tech: 'Logs · metrics · perf',
    purpose: 'Production health visibility',
    failure: 'Alerting before customer impact',
    scaling: 'Sampling · aggregation',
  },
]

export type Project = {
  id: string
  index: string
  title: string
  subtitle: string
  problem: string
  architecture: string
  contribution: string
  outcome: string
  tech: string[]
  href?: string
  badge?: string
  image?: string
}

export const projects: Project[] = [
  {
    id: 'swiftcab',
    index: '01',
    badge: 'Flagship',
    title: 'SwiftCab',
    subtitle: 'Real-time mobility system · Jan 2025 – Present',
    problem:
      'Ride-hailing needs low-latency matching, durable trip state, and event-driven scale — not a CRUD monolith.',
    architecture:
      'Rider / Driver ↔ WebSockets → matching engine · Kafka for async scale · Redis for hot ride state · PostgreSQL for durable trips · Go for latency-sensitive paths (exploring).',
    contribution:
      'End-to-end design and build of realtime matching, event flow, caching, and durable booking state.',
    outcome:
      'Live product at SwiftCab.in — real-time cab booking infrastructure as personal flagship system.',
    tech: ['TypeScript', 'Kafka', 'Redis', 'PostgreSQL', 'WebSockets', 'Golang'],
    href: 'https://swiftcab.in',
    image: '/assets/projects/swiftcab.jpg',
  },
  {
    id: 'zamtel',
    index: '02',
    title: 'Zamtel',
    subtitle: 'Government fintech infrastructure (Zambia)',
    problem:
      'Regulated digital payments require secure request lifecycles, HA paths, and fault tolerance under load.',
    architecture:
      'Client (React/TS) → Node BFF (encrypt/decrypt) → Java microservices on Kubernetes → HA payment paths.',
    contribution:
      'Scalable Java microservices, secure Node.js BFF with cryptography, Kubernetes delivery.',
    outcome:
      'Government-regulated payments platform with high availability and secure request-response lifecycle.',
    tech: ['React/TS', 'Java microservices', 'Node.js BFF', 'Kubernetes'],
    image: '/assets/projects/zamtel.jpg',
  },
  {
    id: 'rozgar',
    index: '03',
    title: 'Rozgar',
    subtitle: 'AI-powered employment platform',
    problem:
      'Legacy job data and weak SEO blocked growth; apply tooling needed structured content quality.',
    architecture:
      'Next.js SEO frontend · Java/Node services · MySQL after 70K+ job migration from Mongo · AI resume / summary / cover-letter generators.',
    contribution:
      'Migrated 70,000+ job records MongoDB → MySQL; rebuilt on Next.js; shipped AI apply tooling and Grammarly integration.',
    outcome:
      'Structured employment data pipeline with SEO-ready product surface and AI-assisted apply path.',
    tech: ['Next.js', 'Java microservices', 'Node.js', 'MySQL', 'AI tooling'],
    href: 'https://rozgar.com',
    image: '/assets/projects/rozgar.png',
  },
  {
    id: 'phoenix',
    index: '04',
    title: 'Phoenix',
    subtitle: 'Partner sales & event-driven platform',
    problem:
      'PolicyBazaar partners needed end-to-end visibility across renewals, leads, regions, and operations.',
    architecture:
      'Next.js surfaces · Nest.js microservices · REST APIs with RBAC · Kafka event flows.',
    contribution:
      'Backend microservices, RBAC APIs, and event-driven partner operations flows.',
    outcome:
      'Sales-driven partner platform for renewals, leads, region coverage, and operations tracking.',
    tech: ['Next.js', 'Nest.js', 'TypeScript', 'Kafka', 'RBAC'],
    image: '/assets/projects/phoenix.jpg',
  },
  {
    id: 'ccil',
    index: '05',
    title: 'CCIL / eOffice',
    subtitle: 'Government enterprise workflow',
    problem:
      'Enterprise file/leave workflows needed multi-level approvals and committee governance with production stability.',
    architecture:
      'React.js · Node.js · PostgreSQL — multi-level approvals and Committee Module with mandatory multi-member sign-off.',
    contribution:
      'Workflow modules, production issue resolution, and stability improvements for CCIL eOffice.',
    outcome:
      'Live government workflow platform at eoffice.cciltd.in.',
    tech: ['React.js', 'Node.js', 'PostgreSQL'],
    href: 'https://eoffice.cciltd.in/',
    image: '/assets/projects/ccil.png',
  },
  {
    id: 'codexcave',
    index: '06',
    title: 'Codexcave',
    subtitle: 'Developer learning platform',
    problem:
      'Developers need structured practice, interview prep, and technical content with scalable APIs.',
    architecture:
      'React frontend · Node APIs · MongoDB · structured problem modules and content delivery.',
    contribution:
      'Scalable backend APIs, problem modules, performance, SEO, and clean product UX.',
    outcome:
      'Developer learning platform at Codexcave.com.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'System Design'],
    href: 'http://codexcave.com',
    image: '/assets/projects/codexcave.jpg',
  },
  {
    id: 'luxorpen',
    index: '07',
    title: 'Luxorpen',
    subtitle: 'Commerce / CMS platform',
    problem:
      'Manufacturer/exporter needed CMS, product catalog, and admin tooling with polished motion.',
    architecture:
      'Next.js frontend · Node.js backend · MongoDB · React admin portal · GSAP motion.',
    contribution:
      'CMS website, product catalog, and admin portal for writing-instruments manufacturer & exporter.',
    outcome:
      'Commerce/CMS surface with catalog and admin operations.',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'GSAP'],
    image: '/assets/projects/luxorpen.png',
  },
]

export const miniProjects = [
  {
    title: 'Contact List',
    blurb: 'React demo contact management UI',
    href: 'https://react-demo44.netlify.app',
    image: '/assets/mini/contact-list.png',
  },
  {
    title: 'Blog Management',
    blurb: 'MERN stack blog management',
    href: 'https://react-demo44.netlify.app/',
    image: '/assets/mini/blog.png',
  },
  {
    title: 'E-store',
    blurb: 'E-commerce store with MERN',
    href: 'https://e-store-1.netlify.app/',
    image: '/assets/mini/e-store.png',
  },
  {
    title: 'YouTube Lite',
    blurb: 'YouTube Data API v3 + React frontend',
    href: 'https://youtube-lyte.netlify.app/',
    image: '/assets/mini/youtube-lite.png',
  },
  {
    title: 'Chat App',
    blurb: 'Socket.io · Node · React · push notifications',
    href: 'https://chatapp-lyte.netlify.app/',
    image: '/assets/mini/chatapp.png',
  },
] as const

export type ProjectShort = {
  title: string
  blurb: string
  image: string
  preview?: string
  href?: string
}

export const projectShorts: ProjectShort[] = [
  {
    title: 'CSC OAuth resume flow',
    blurb: 'OAuth integration for resume creation in collaboration with Rozgar.com',
    image: '/assets/shorts/csc-oauth.png',
    preview: '/assets/shorts/csc-screenshot.png',
  },
  {
    title: 'Geolocation tracker',
    blurb: 'Map-based candidate locality tracking for recruiters and admins',
    image: '/assets/shorts/geolocation-tracker.png',
    preview: '/assets/shorts/geolocation-tracker-2.png',
  },
  {
    title: 'Zoom interviews',
    blurb: 'In-platform interviews for candidates and recruiters on Rozgar',
    image: '/assets/shorts/zoom-interviews.png',
    preview: '/assets/shorts/zoom-interviews-2.png',
  },
  {
    title: 'Rozgar.com',
    blurb: 'Job portal rebuilt with Next.js, SEO, and AI-assisted apply flows',
    image: '/assets/shorts/rozgar.png',
    href: 'https://rozgar.com',
  },
  {
    title: 'CCIL eOffice',
    blurb: 'Government file & leave workflow for Cement Corporation of India',
    image: '/assets/shorts/ccil.png',
    href: 'https://eoffice.cciltd.in/',
  },
  {
    title: 'AI cover letter',
    blurb: 'On-the-spot cover letter & profile summary while applying for jobs',
    image: '/assets/shorts/cover-letter.png',
  },
  {
    title: 'GPT summariser',
    blurb: 'OpenAI-powered profile summary generation for job applications',
    image: '/assets/shorts/summariser.png',
  },
  {
    title: 'Luxorpen',
    blurb: "Next.js CMS & product catalog for India's leading pen brand",
    image: '/assets/shorts/luxorpen.png',
    preview: '/assets/shorts/luxorpen-2.png',
  },
]

export type Certificate = {
  title: string
  meta?: string
  href?: string
}

export const certificates: Certificate[] = [
  {
    title: 'Full Stack Developer – Internshala',
    meta: 'CN: 972670B8-3D5F-7E61-BD07-20E9DBCCCD22',
    href: 'https://trainings.internshala.com/verify_certificate',
  },
  {
    title: 'React JS for Beginners – Simplilearn',
    href: 'https://simpli-web.app.link/e/Rg6NqdV5jDb',
  },
  {
    title: 'SQL Certification – HackerRank',
    href: 'https://bit.ly/3F9UBl2',
  },
  {
    title: 'Getting Started with NodeJS – SkillUp',
    href: 'https://bit.ly/3f11jPQ',
  },
  {
    title: 'Introduction to Kubernetes',
    href: 'https://simpli-web.app.link/e/lzXAud25jDb',
  },
  {
    title: 'Oracle Database PL/SQL Developer Certified Professional',
    meta: 'CN: 63f0d0bd484f',
  },
  {
    title: 'React.js Frontend Developer – HackerRank',
  },
  {
    title: 'Full Stack JavaScript Development (MongoDB, Node)',
    href: 'https://shorturl.at/qzJ23',
  },
  {
    title: 'React Native Essential Training',
    href: 'https://shorturl.at/mrBO0',
  },
  {
    title: 'Introduction to Cloud Computing',
    href: 'http://surl.li/npbib',
  },
  {
    title: 'AWS Cloud Essentials',
    href: 'https://rb.gy/myilzy',
  },
  {
    title: 'JavaScript Intermediate Certification',
    href: 'https://shorturl.at/wDVWZ',
  },
  {
    title: 'Google Digital Marketing Garage',
    meta: 'Credential ID: KEW 7FF URH',
    href: 'https://learndigital.withgoogle.com/digitalunlocked/validate-certificate-code',
  },
]

export type ExperienceItem = {
  period: string
  role: string
  org: string
  location: string
  bullets: string[]
}

export const experience: ExperienceItem[] = [
  {
    period: 'Jan 2025 — Present',
    role: 'Senior Software Engineer',
    org: 'Paytm',
    location: 'Noida',
    bullets: [
      'Designed scalable microservices for high availability and fault tolerance using Spring Boot and Kafka',
      'Implemented API Gateway, rate limiting, and load balancing for secure, scalable request handling',
      'Built distributed Redis caching to reduce latency and improve performance',
      'Applied circuit breaker patterns to improve resilience under failure conditions',
      'Optimized APIs and databases to improve response time and throughput',
    ],
  },
  {
    period: 'Apr 2024 — Jan 2025',
    role: 'Technical Associate',
    org: 'PolicyBazaar (PB Partners)',
    location: 'Gurgaon',
    bullets: [
      'Developed scalable backend systems using Nest.js microservices',
      'Designed REST APIs with RBAC security and API Gateway integration',
      'Built event-driven systems using Kafka for horizontal scalability',
      'Improved database performance under high concurrency workloads',
    ],
  },
  {
    period: 'Nov 2021 — Apr 2024',
    role: 'Full Stack Developer',
    org: 'Value Innovation Labs',
    location: 'Noida',
    bullets: [
      'Built microservices handling 100K+ daily transactions with high reliability',
      'Designed scalable systems with caching and optimized DB queries',
      'Improved system stability and significantly reduced production issues',
      'Delivered modules for CCIL, EPIL, Rozgar.com, and related enterprise platforms',
    ],
  },
  {
    period: 'Certification & training',
    role: 'Full Stack Development',
    org: 'Internshala',
    location: 'Remote',
    bullets: [
      'Full Stack Developer program [CN: 972670B8-3D5F-7E61-BD07-20E9DBCCCD22]',
      'Completed full-stack training covering frontend, backend, and databases',
    ],
  },
]

export const education = [
  {
    period: '2017 — 2021',
    title: 'B.Tech — Computer Science',
    org: 'Chhatrapati Shahu Ji Maharaj University, Kanpur',
    note: 'B.Tech in Computer Science (2017 – 2021). Foundation in DSA, systems, and full-stack engineering.',
  },
  {
    period: '2015 — 2016',
    title: '12th (CBSE)',
    org: 'Swami Harsewanand Public School, Garhwaghat, Varanasi',
    note: 'CBSE affiliated co-ed secondary education managed by Swami Harsewanand Shikshan Society.',
  },
] as const

export const experiments = [
  {
    code: '01',
    title: 'SwiftCab realtime matching',
    blurb: 'WebSockets + Kafka + Redis for ride state and scale.',
  },
  {
    code: '02',
    title: 'Zamtel crypto BFF',
    blurb: 'Symmetric + asymmetric request lifecycle for regulated payments.',
  },
  {
    code: '03',
    title: 'Three.js / WebGL systems viz',
    blurb: 'Distributed-system metaphor as navigable portfolio space.',
  },
  {
    code: '04',
    title: 'AI agents & LLM workflows',
    blurb: 'Resume / summary / cover-letter tooling and automation experiments.',
  },
  {
    code: '05',
    title: 'Go performance paths',
    blurb: 'Exploring Golang for latency-sensitive services.',
  },
  {
    code: '06',
    title: 'Developer tooling',
    blurb: 'Codexcave practice modules and structured content delivery.',
  },
] as const

export const proofLinks = [
  {
    label: 'Resume PDF',
    href: '/assets/Shashikant_Aug_2026.pdf',
    note: 'Aug 2026 download',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/skntmax',
    note: 'Code, experiments, and public work',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/shashi-kant-5a1710185/',
    note: 'Manager & peer recommendations',
  },
  {
    label: 'CCIL eOffice',
    href: 'https://eoffice.cciltd.in/',
    note: 'Live government workflow platform',
  },
  {
    label: 'Rozgar.com',
    href: 'https://rozgar.com',
    note: 'Job portal with AI apply tooling',
  },
  {
    label: 'Codexcave.com',
    href: 'http://codexcave.com',
    note: 'Developer learning & practice platform',
  },
] as const

export const hire = {
  title: "Let's build something that scales.",
  blurb: 'Open to Senior / Lead backend and full-stack opportunities.',
  replyNote:
    'Hiring or collaboration — reply within 24–48 hours on business days. Timezone: IST (UTC+5:30).',
} as const

export const sceneStates = [
  { id: 'intro', label: 'System online', from: 0, to: 0.16 },
  { id: 'engineer', label: 'The engineer', from: 0.16, to: 0.32 },
  { id: 'scale', label: 'Scale', from: 0.32, to: 0.48 },
  { id: 'architecture', label: 'Architecture', from: 0.48, to: 0.64 },
  { id: 'flagship', label: 'Flagship', from: 0.64, to: 0.82 },
  { id: 'contact', label: 'Open channel', from: 0.82, to: 1 },
] as const

/** Labels for 3D node hover (subtle inspect mode). */
export const nodeInspect = [
  { id: 'core', kind: 'CORE', name: 'Computational Core' },
  { id: 'gateway', kind: 'API', name: 'Spring Boot Gateway' },
  { id: 'kafka', kind: 'SERVICE', name: 'Kafka Event Processing' },
  { id: 'redis', kind: 'CACHE', name: 'Redis' },
  { id: 'db', kind: 'DATABASE', name: 'PostgreSQL' },
  { id: 'obs', kind: 'OBS', name: 'Observability' },
] as const
