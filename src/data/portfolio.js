/**
 * ============================================================
 *  PORTFOLIO DATA — Single Source of Truth
 *  All portfolio content lives here.
 * ============================================================
 */

// ─── PERSONAL ─────────────────────────────────────────────────
export const personal = {
  name: 'Tanvir Ahmmed Sifat',
  shortName: 'Sifat',
  role: 'Frontend & Full Stack Engineer, AI Researcher',
  headline: 'Building scalable web applications and intelligent systems.',
  intro:
    "I'm a full-stack engineer shipping production web applications — from React and Next.js interfaces to Node.js and Express APIs — and a graduate researcher applying deep learning to medical imaging, computer vision, and network security.",
  location: 'Bangladesh',
  email: 'sifatict26@gmail.com',
  phone: '+880 1521 565 259',
  whatsapp: 'https://wa.me/8801521565259',
  resumeUrl: '/Tanvir_Ahmmed_Sifat_Resume.pdf', // served from /public
  resumeDocx: '/Tanvir_Ahmmed_Sifat_Resume.docx', // Word version
  resumeUpdated: 'July 2026', // shown on the resume preview card
  portrait: 'https://github.com/sifat26/portfoliov2/blob/main/IMG-20260719-WA0061.jpg.jpeg?raw=true',
  availability: 'Open to Frontend, Full Stack, and AI Engineering roles',
};

// ─── SOCIAL LINKS ─────────────────────────────────────────────
export const socials = {
  github: 'https://github.com/sifat26',
  linkedin: 'https://linkedin.com/in/sifat26',
  twitter: 'https://x.com/tanvirahmmedsi2',
  facebook: 'https://www.facebook.com/sifat.7847/',
  instagram: 'https://www.instagram.com/tanvir_ahmmed_sifat/',
};

// ─── NAVIGATION ───────────────────────────────────────────────
export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Research', href: '#research' },
  { label: 'Education', href: '#education' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

// ─── ABOUT ────────────────────────────────────────────────────
export const about = {
  headline: 'I build software end to end — and research where it goes next.',
  paragraphs: [
    'I ship production web applications for a living. At Universal Technology Research and Development Limited I build Angular and Next.js interfaces for live business systems, and through client work I have delivered full-stack e-commerce platforms end to end — React and Next.js on the front, Node.js and Express APIs on the back, deployed to cPanel, VPS, and Azure. That includes Bazarica, a multi-vendor marketplace with payment integration and separate admin, seller, and customer dashboards.',
    'Most of what I care about is the part users never see: reusable components, clear API contracts, and deployments I understand end to end instead of handing off. Loading and error states, data flow, the boring details that decide whether an app feels solid or breaks under real traffic.',
    "Alongside the engineering work I'm doing an M.Sc. in ICT at Mawlana Bhashani Science & Technology University, on applied deep learning for medical image analysis, computer vision, and network intrusion detection. My first international paper was presented at ITSS-IoE 2025 in the United Kingdom.",
    "I'm looking for teams building software that has to hold up in production, where the research side is a plus rather than a distraction.",
  ],
};

// ─── EXPERIENCE ───────────────────────────────────────────────
export const experiences = [
  {
    id: 1,
    role: 'Web Developer',
    company: 'Universal Technology Research and Development Ltd.',
    shortName: 'UTRDL',
    location: 'Bangladesh',
    period: 'June 2024 — Present',
    type: 'Full-time',
    summary:
      'Ship production Angular and Next.js applications to internal IIS Server infrastructure, owning UI from component design through deployment.',
    highlights: [
      'Build and ship Angular and Next.js applications used in live business operations, turning design specs into responsive, accessible interfaces.',
      'Built shared component libraries that cut repeated UI work across features and kept the codebase easier to maintain.',
      'Integrated REST APIs end to end — data flow, loading and error states, and coordinating contract changes with the backend team.',
      'Deployed to IIS Server, configuring builds and resolving environment-specific issues in production.',
      'Partnered with backend, QA, and product to align technical direction and keep releases moving.',
    ],
    tech: ['Angular', 'Next.js', 'TypeScript', 'REST APIs', 'IIS Server'],
  },
  {
    id: 2,
    role: 'Full Stack Developer',
    company: 'Freelance & Contract',
    shortName: 'Client Work',
    location: 'Remote',
    period: '2023 — Present',
    type: 'Contract',
    summary:
      'Delivered production e-commerce platforms end to end for paying clients — building both the React/Next.js frontends and the Node.js/Express APIs behind them, then owning deployment.',
    highlights: [
      'Shipped three production e-commerce platforms as part of three-person teams, including Bazarica, a multi-vendor marketplace with payments and separate admin, seller, and customer dashboards.',
      'Worked across the stack — React/Next.js frontends and Express REST APIs for authentication, product and order management, and catalog search.',
      'Deployed to cPanel, VPS, and Azure — builds, domains, and SEO setup for live traffic.',
      'Set up SEO and Google Analytics so client storefronts were discoverable and measurable.',
      'Coordinated frontend and backend contracts with teammates to ship on client timelines.',
    ],
    tech: ['Next.js', 'React', 'Node.js', 'Express', 'MongoDB', 'Azure'],
  },
];

// ─── EDUCATION ────────────────────────────────────────────────
export const education = [
  {
    degree: 'M.Sc. Engineering — Information & Communication Technology',
    institute: 'Mawlana Bhashani Science & Technology University',
    period: '2025 — Present',
    status: 'In progress',
    notes: [
      'Research focus: deep learning applications in medical imaging, computer vision, and network intrusion detection.',
    ],
  },
  {
    degree: 'B.Sc. Engineering — Information & Communication Technology',
    institute: 'Mawlana Bhashani Science & Technology University',
    period: '2020 — 2025',
    status: 'Completed',
    notes: ['Coursework across software engineering, data structures, algorithms, computer networks, and databases.'],
  },
  {
    degree: 'Higher Secondary Certificate — Science',
    institute: 'Major General Mahmudul Hasan Adarsha College, Tangail',
    period: '2017 — 2019',
    status: 'Completed',
    notes: ['GPA 4.83 / 5.00'],
  },
  {
    degree: 'Secondary School Certificate — Science',
    institute: 'Adi Tangail High School, Tangail',
    period: '2017',
    status: 'Completed',
    notes: ['GPA 5.00 / 5.00 — Perfect Score'],
  },
];

// ─── SKILLS ───────────────────────────────────────────────────
export const skills = [
  {
    group: 'Frontend',
    items: ['Angular', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    group: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs', 'Authentication', 'Payment Gateways'],
  },
  {
    group: 'AI / ML',
    items: ['Python', 'TensorFlow', 'Deep Learning', 'Computer Vision'],
  },
  {
    group: 'Databases',
    items: ['MongoDB', 'MySQL', 'Firebase'],
  },
  {
    group: 'Deployment',
    items: ['Vercel', 'Azure', 'VPS', 'IIS Server', 'cPanel'],
  },
  {
    group: 'Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Figma', 'Google Analytics'],
  },
];

// ─── CLIENT / PRODUCTION PROJECTS ─────────────────────────────
// Paid production work. Presented before personal projects.
// To add screenshots: drop an image in /public and set `image`.
// To publish links: replace the [ADD_*_URL] tokens (buttons stay hidden until then).
export const clientProjects = [
  {
    id: 'bazarica',
    type: 'client',
    title: 'Bazarica',
    category: 'Multi-Vendor Marketplace',
    role: 'Full Stack Developer',
    team: 'Built collaboratively with a 3-member development team',
    year: '2026',
    featured: true,
    tagline: 'A production multi-vendor marketplace with payments, dashboards, and search.',
    overview:
      'A live multi-vendor marketplace where sellers list and sell independently, with separate admin, seller, and customer experiences. Built by a three-person team as paid client work; the points below are the parts I owned.',
    contributions: [
      'Built dashboard views for the admin, seller, and customer roles in Next.js',
      'Integrated the payment gateway and order confirmation flow for live transactions',
      'Implemented product and order management against the Express REST API',
      'Added catalog search across the multi-vendor product listings',
      'Wired up SEO metadata and Google Analytics on the storefront',
      'Deployed and configured the app on an Azure VPS',
    ],
    tech: ['Next.js', 'Node.js', 'Express.js'],
    image: null,
    links: { live: 'https://bazarica.com.bd/', github: null, githubServer: null },
  },
  {
    id: 'atkias-zone',
    type: 'client',
    title: 'Atkias Zone',
    category: 'E-Commerce Platform',
    role: 'Full Stack Developer',
    team: 'Built collaboratively with a 3-member development team',
    year: '2026',
    tagline: 'A full-stack storefront, from Next.js UI to production deployment.',
    overview:
      'A paid e-commerce build shipped by a three-person team — Next.js storefront, an Express API behind it, and a production VPS deployment. My work spanned both ends of that stack.',
    contributions: [
      'Built storefront pages and product views in Next.js',
      'Connected the frontend to the Express REST API',
      'Implemented user authentication and session handling',
      'Set up SEO metadata across product and listing pages',
      'Deployed the app to a production VPS',
    ],
    tech: ['Next.js', 'Node.js', 'Express.js'],
    image: null,
    links: { live: 'https://atkias-zone.vercel.app/', github: null, githubServer: null },
  },
  {
    id: 'outfitro',
    type: 'client',
    title: 'Outfitro',
    category: 'E-Commerce Platform',
    role: 'Full Stack Developer',
    team: 'Built collaboratively with a 3-member development team',
    year: '2025',
    tagline: 'A full-stack fashion storefront with authentication and cart checkout.',
    overview:
      'A paid e-commerce build shipped by a three-person team — a React frontend on a Node.js and Express API, deployed to cPanel. My work ran across the frontend and the API.',
    contributions: [
      'Built storefront and product pages in React',
      'Developed REST endpoints on the Express API',
      'Modeled and integrated the product and user data layer',
      'Implemented authentication and the cart-to-checkout flow',
      'Deployed the app to cPanel hosting',
    ],
    tech: ['React', 'Node.js', 'Express.js'],
    image: null,
    links: { live: 'https://outfitro.com/', github: null, githubServer: null },
  },
];

// ─── PERSONAL PROJECTS ────────────────────────────────────────
export const projects = [
  {
    id: 1,
    type: 'personal',
    title: 'BlogNest',
    category: 'Full-Stack Platform',
    year: '2024',
    tagline: 'A community-driven publishing platform for writers and readers.',
    problem:
      'Independent writers wanted a clean, focused place to publish long-form content and build a reading community — without the noise of general-purpose platforms.',
    solution:
      'Designed and shipped a full-stack application with React on the client and Express/MongoDB on the server, plus Firebase-based authentication. Built a trending algorithm, nested comment threading, and personalized reading lists.',
    features: [
      'Rich-text authoring and editing',
      'Nested comment threads',
      'Personalized wishlist and reading history',
      'Trending algorithm ranking top posts',
      'Search, tag, and category filtering',
      'Google OAuth authentication',
    ],
    challenges:
      'Designing a comment schema that supported arbitrarily nested replies while keeping read queries performant on MongoDB.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Firebase'],
    image: 'https://i.postimg.cc/2yxXm5S4/blognestss.png',
    links: {
      live: 'https://blognest-d41ff.web.app/',
      github: 'https://github.com/sifat26/BlogNest_Client',
      githubServer: 'https://github.com/sifat26/BlogNest_Project_Server_Side',
    },
  },
  {
    id: 2,
    type: 'personal',
    title: 'Woven Earth',
    category: 'E-Commerce',
    year: '2024',
    tagline: 'A curated marketplace for handcrafted textile art.',
    problem:
      'Independent textile artists lacked a purpose-built platform to present their craft. Generic e-commerce templates flattened the artisanal nature of the work.',
    solution:
      'Built a full-stack React application with a MongoDB persistence layer, Firebase authentication, and a dedicated artist portal to submit, update, and manage listings.',
    features: [
      'Dynamic homepage with a rotating hero banner',
      'Category-based craft discovery',
      'Artist submission and self-service management portal',
      'Authenticated per-user collections',
      'Accessible product galleries with detail pages',
      'Responsive across all breakpoints',
    ],
    challenges:
      'Balancing an editorial, gallery-first visual style with the utility of an e-commerce interface, without falling back on template patterns.',
    tech: ['React', 'Firebase', 'MongoDB', 'Express', 'Tailwind CSS'],
    image: 'https://i.postimg.cc/fLc8jbmM/woben.png',
    links: {
      live: 'https://art-and-craft-b1839.web.app/',
      github: 'https://github.com/sifat26/Woven-earth-client',
      githubServer: 'https://github.com/sifat26/Woven-earth-server',
    },
  },
  {
    id: 3,
    type: 'personal',
    title: 'RoyalStays',
    category: 'Hospitality',
    year: '2024',
    tagline: 'A property discovery portal for travelers.',
    problem:
      'Travelers browsing accommodations — from boutique guesthouses to luxury hotels — needed a visually rich, filterable portal with clear property details and a smooth exploration flow.',
    solution:
      'Built a client-side React application with Firebase backend and multi-provider authentication, focused on interactive property exploration and clean visual storytelling.',
    features: [
      'Multi-provider auth (Google, GitHub)',
      'Interactive property detail exploration',
      'Curated accommodation listings',
      'Per-property image galleries',
      'Smooth scroll-based reveal animations',
      'Fully responsive across devices',
    ],
    challenges:
      'Structuring content so that the visual browsing experience remained fast and clear even as the property catalog grew.',
    tech: ['React', 'Firebase', 'Tailwind CSS', 'Node.js'],
    image: 'https://i.postimg.cc/d1VhnHTR/royal.png',
    links: {
      live: 'https://real-state-hospitality.web.app/',
      github: 'https://github.com/sifat26/A9-RoyalStays',
      githubServer: null,
    },
  },
];

// ─── RESEARCH ─────────────────────────────────────────────────
export const research = {
  interests: [
    'Deep Learning',
    'Computer Vision',
    'Medical Image Analysis',
    'Network Intrusion Detection',
    'Cybersecurity',
    'IoT Systems',
  ],
  thesis: {
    title: 'Applied deep learning for medical imaging and network security',
    description:
      'My current graduate research explores how deep learning models can be applied to real-world diagnostic imaging and security-critical systems — with a focus on model reliability, dataset quality, and deployability on constrained environments including IoT.',
  },
  futureDirection:
    'Extending current work toward robust, deployable AI systems — combining computer vision, edge inference, and intrusion detection into practical safety-critical applications.',
  publications: [
    {
      id: 1,
      title: 'An IoT-Based Lung Cancer Detection System from CT Images Using Deep Learning',
      role: 'Author',
      conference:
        'International Conference on Intelligent Technology, Systems and Services for the Internet of Everything (ITSS-IoE 2025)',
      venue: 'University of Wolverhampton, United Kingdom',
      year: '2025',
      context: 'Presented during ITSS-IoE 2025, held in conjunction with the CyberVehiCare Launch Event.',
      abstract:
        'This work combines IoT infrastructure with deep learning to detect lung cancer from CT images, contributing toward earlier diagnosis and more accessible, intelligent healthcare tooling.',
      tags: ['Deep Learning', 'Computer Vision', 'IoT', 'Healthcare'],
    },
  ],
  timeline: [
    {
      year: '2025',
      title: 'International publication — ITSS-IoE 2025 (United Kingdom)',
      description:
        'Presented research on IoT-based lung cancer detection using deep learning at the University of Wolverhampton.',
    },
    {
      year: '2025 — Present',
      title: 'M.Sc. research at MBSTU',
      description: 'Graduate research on applied deep learning for medical imaging and network intrusion detection.',
    },
    {
      year: '2020 — 2025',
      title: 'B.Sc. in ICT — MBSTU',
      description: 'Foundations in software engineering, algorithms, computer networks, and databases.',
    },
  ],
};
