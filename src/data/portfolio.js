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
  // Locally served, pre-resized portraits (WebP + JPEG fallback). Self-hosting
  // these removes a cross-origin request on the LCP element.
  portrait: '/portrait-hero.jpg',
  portraitWebp: '/portrait-hero.webp',
  portraitSquare: '/portrait-square.jpg',
  portraitSquareWebp: '/portrait-square.webp',
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
  { label: 'Blog', href: '#blog' },
  { label: 'Research', href: '#research' },
  { label: 'Education', href: '#education' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

// ─── ABOUT ────────────────────────────────────────────────────
// `short` is the default, always-visible bio. `paragraphs` is revealed by the
// "Read more" toggle in AboutMeSection — keep the two non-overlapping so the
// expanded view reads as a continuation, not a repeat.
export const about = {
  headline: 'I build software end to end — and research where it goes next.',
  short: [
    'I ship production web applications — React, Next.js, and Angular on the front, Node.js and Express behind them — and deploy them myself.',
    "Alongside that I'm doing an M.Sc. in ICT, applying deep learning to medical imaging and network security. My first international paper was presented in the UK.",
  ],
  paragraphs: [
    'At Universal Technology Research and Development Limited I engineer Angular, React, and Next.js interfaces for enterprise clients across the UK and UAE — spanning multi-tenant FinTech SaaS, geospatial location analytics, and venture capital management platforms.',
    'Through client work I have delivered full-stack web platforms end to end, deployed to cPanel, VPS, Azure, and IIS — including Bazarica, a multi-vendor marketplace with payment integration and separate admin, seller, and customer dashboards.',
    'Most of what I care about is the part users never see: reusable component systems, clean REST API contracts, and robust deployments. Loading and error states, state synchronization, and the architectural details that keep high-traffic business applications solid.',
    'My graduate research at Mawlana Bhashani Science & Technology University covers applied deep learning for medical image analysis, computer vision, and network security — with 3 peer-reviewed publications across MDPI Technologies, Springer Nature, and IEEE ICSECS.',
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
      'Engineer production Angular, React, and Next.js interfaces and Node.js microservices across multi-tenant FinTech SaaS, geospatial analytics, and venture capital management platforms for UK and UAE clients.',
    highlights: [
      'Multi-Tenant FinTech & Mortgage SaaS: Architected responsive client portals and broker CRM interfaces featuring dynamic mortgage calculation engines, multi-step loan applications, and secure KYC document verification workflows.',
      'Geospatial Analytics & Location Intelligence: Engineered commercial location intelligence web app interfaces, integrating interactive map visualization, spatial demographic boundary filters, and high-density performance analytics.',
      'Venture Capital & Startup Incubation Portals: Built end-to-end founder application workflows and evaluation pipelines with multi-tier role-based access control (RBAC), scoring matrices, and status tracking for venture investment firms.',
      'Asset Management & Investor Dashboards: Developed institutional investor dashboards with real-time fund performance metrics, portfolio asset breakdown charts, and corporate financial disclosures.',
      'Component Systems & IIS Production Delivery: Designed modular, accessible UI design systems cutting duplicate frontend code by 40%, integrated REST APIs end to end, and maintained zero-downtime builds on production IIS servers.',
    ],
    tech: ['Angular', 'Next.js', 'React', 'TypeScript', 'Node.js', 'FinTech SaaS', 'REST APIs', 'IIS Server'],
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
      'Delivered three production e-commerce platforms end to end for paying clients — React/Next.js frontends, Express APIs, and the deployment behind them.',
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
    notes: [
      'Coursework across software engineering, data structures, algorithms, computer networks, and databases.',
      'CGPA 3.65 / 4.00',
    ],
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
    notes: ['GPA 5.00 / 5.00 '],
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
    image: 'https://res.cloudinary.com/dklcgg4jx/image/upload/v1787860572/portfolio/projects/t5fhvymejs6pnp6yxqpd.png',
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
    image: 'https://res.cloudinary.com/dklcgg4jx/image/upload/v1787860658/portfolio/projects/yfp19s4ivepfvojuytpk.png',
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
    image: 'https://res.cloudinary.com/dklcgg4jx/image/upload/v1787860739/portfolio/projects/b13bcrijdmeouehlacda.png',
    links: { live: 'https://outfitro.com/', github: null, githubServer: null },
  },
];

// ─── PERSONAL PROJECTS ────────────────────────────────────────
export const projects = [
  {
    id: 1,
    type: 'personal',
    title: 'Kahf Treasure',
    category: 'E-Commerce Platform',
    year: '2026',
    featured: true,
    tagline: 'A full-stack e-commerce platform for an attar and fragrance shop.',
    problem:
      'The client needed a high-performance, bilingual luxury storefront to present authentic alcohol-free attar oils with custom scent profiles, package deals, and instant WhatsApp ordering for the Bangladesh market.',
    solution:
      'Architected a Next.js App Router application with React 19, Redux Toolkit for cart state, Tailwind CSS v4 design system, Cloudinary media handling, and automated WhatsApp order message generation.',
    features: [
      'Dynamic product catalog with volume and price variations',
      'Interactive Enquiry Bag / Cart Drawer',
      'One-click WhatsApp order generation',
      'Bilingual interface with custom typography',
      'Full SEO metadata with JSON-LD schemas',
      'Framer Motion scroll reveal micro-interactions',
    ],
    challenges:
      'Implementing smooth bilingual typography while maintaining fast server-rendered performance and seamless responsive cart management.',
    tech: ['Next.js', 'React', 'Redux Toolkit', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Cloudinary'],
    image: 'https://res.cloudinary.com/dklcgg4jx/image/upload/v1787860479/portfolio/projects/vjwxhhcxvqyhvmrsppiz.png',
    links: {
      live: 'https://kahf-treasure.vercel.app',
      github: 'https://github.com/sifat26/KAHF-TREASURE',
      githubServer: null,
    },
  },
  {
    id: 2,
    type: 'personal',
    title: 'Nirnoy',
    category: 'EdTech & Assessment Platform',
    year: '2026',
    featured: true,
    tagline: 'A full-stack, server-authoritative MCQ exam and assessment platform.',
    problem:
      'SSC/HSC students in Bangladesh needed a reliable, portable platform to practice curriculum-aligned exams with fair server-side grading and real-time timer synchronization without cheating or answer leaks.',
    solution:
      'Designed and shipped a full-stack platform with React 19, Express 5, and MongoDB. Features a server-authoritative timer, answer-stripping security, instant server-side grading with rich explanations, attempt history, and admin JSON exam upload + analytics leaderboard.',
    features: [
      'Server-authoritative countdown timer robust to tab throttling',
      'Server-side grading & answer-stripping security',
      'Student account history & personal score analytics',
      'Admin dashboard with JSON exam importer & CSV export',
      'Per-exam leaderboards & question difficulty breakdown',
      'Responsive UI with Bengali font support',
    ],
    challenges:
      'Ensuring zero client answer leakage prior to submission while guaranteeing precise timer synchronization across disparate network speeds.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Zod'],
    image: 'https://res.cloudinary.com/dklcgg4jx/image/upload/v1788083807/portfolio/projects/cjgejjy9x14o9gyufczf.png',
    links: {
      live: 'https://nirnoy.vercel.app',
      github: 'https://github.com/sifat26/mcq-exam-platform',
      githubServer: null,
    },
  },
  {
    id: 3,
    type: 'personal',
    title: 'SelfMatrix',
    category: 'AI & Assessment Platform',
    year: '2026',
    featured: true,
    tagline: 'A scenario-based communication personality assessment with AI-powered personalized insights.',
    problem:
      'Standard personality tests are often generic and lack actionable communication guidance, while users need contextual insights on how they make decisions, handle conflict, and collaborate in teams.',
    solution:
      'Engineered a 32-scenario interactive assessment evaluating 4 archetypes (Driver, Influencer, Supporter, Analyst) with custom scoring algorithms and LLM-powered personalized growth plans.',
    features: [
      '32 original scenario-based questions with reverse-style consistency checks',
      'Scoring algorithm calculating primary, secondary, and blend profiles',
      'AI-powered personalized action plans & communication advice',
      'Shareable result URLs with state encoding',
      'Interactive Radix UI & Tailwind CSS responsive interface',
    ],
    challenges:
      'Developing an accurate weighted multi-dimensional scoring algorithm while maintaining strict AI guardrails for supportive, actionable feedback.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express.js', 'Tailwind CSS', 'Supabase'],
    image: 'https://res.cloudinary.com/dklcgg4jx/image/upload/v1788083789/portfolio/projects/hw5fby1jqjopyu7t75jc.png',
    links: {
      live: 'https://selfmatrix.vercel.app',
      github: 'https://github.com/sifat26/personality-quiz',
      githubServer: null,
    },
  },
  {
    id: 4,
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
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Firebase'],
    image: 'https://i.postimg.cc/2yxXm5S4/blognestss.png',
    links: {
      live: 'https://blognest-d41ff.web.app/',
      github: 'https://github.com/sifat26/BlogNest_Client',
      githubServer: 'https://github.com/sifat26/BlogNest_Project_Server_Side',
    },
  },
  {
    id: 5,
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
    tech: ['React', 'Firebase', 'MongoDB', 'Express.js', 'Tailwind CSS'],
    image: 'https://i.postimg.cc/fLc8jbmM/woben.png',
    links: {
      live: 'https://art-and-craft-b1839.web.app/',
      github: 'https://github.com/sifat26/Woven-earth-client',
      githubServer: 'https://github.com/sifat26/Woven-earth-server',
    },
  },
  {
    id: 6,
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
      title: 'Detection and Classification of Kidney Disease from CT Images: An Automated Deep Learning Approach',
      authors: 'Hossain, M. N., Bhuiyan, E., Miah, M. B. A., Sifat, T. A., Muhammad, Z., and Al Masud, M. F.',
      role: 'Co-author',
      journal: 'Technologies (MDPI), Vol. 13, Issue 11, Article 508',
      conference: 'Technologies — MDPI Journal',
      venue: 'Basel, Switzerland',
      publisher: 'MDPI',
      year: '2025',
      doi: '10.3390/technologies13110508',
      doiUrl: 'https://doi.org/10.3390/technologies13110508',
      url: 'https://www.mdpi.com/2227-7080/13/11/508',
      summary:
        'Published in MDPI Technologies — an automated deep learning framework integrating DenseNet121 and EfficientNetB0 with soft-voting ensemble classification for kidney abnormalities from CT scans, achieving 99.24% accuracy.',
      context:
        'Early and accurate detection of renal abnormalities significantly influences clinical outcomes. This journal study formulates an automated multi-class diagnostic framework evaluated across diverse CT imaging benchmarks.',
      abstract:
        'Kidney disease is a critical global health challenge where early and accurate detection significantly influences patient outcomes. Traditional diagnostic workflows are often time-consuming and subject to human error. In this study, we propose an automated deep learning framework designed to detect and classify kidney abnormalities—including cysts, stones, tumors, and normal tissue—using computed tomography (CT) medical images. The architecture integrates DenseNet121 and EfficientNetB0 for deep feature extraction, paired with an ensemble of Support Vector Machine (SVM), Random Forest (RF), and XGBoost classifiers united via soft voting. The proposed framework achieved a state-of-the-art overall diagnostic accuracy of 99.24% on benchmark datasets, offering a highly reliable and scalable clinical decision-support tool for medical imaging.',
      highlights: [
        'Hybrid DenseNet121 and EfficientNetB0 deep feature extraction pipeline',
        'Soft-voting ensemble of Support Vector Machine, Random Forest, and XGBoost',
        '99.24% overall classification accuracy across cysts, stones, tumors, and normal kidney tissue',
        'Automated clinical decision support designed for radiology and diagnostic imaging',
      ],
      tags: ['Deep Learning', 'Medical Imaging', 'CT Scans', 'Kidney Disease', 'DenseNet121', 'EfficientNetB0', 'Ensemble Learning', 'MDPI'],
    },
    {
      id: 2,
      title: 'An IoT-Based Lung Cancer Detection System from CT Images Using Deep Learning',
      authors: 'Hossain, M. M., Miah, M. B. A., Saedi, M., Sifat, T. A., Hossain, M. N., and Hussain, N.',
      role: 'Co-author',
      conference:
        '3rd International Conference on Intelligent Technology, System and Service for Internet of Everything (ITSS-IoE 2025)',
      venue: 'University of Wolverhampton, United Kingdom',
      publisher: 'Springer Nature Singapore',
      series: 'Lecture Notes in Electrical Engineering (LNEE), vol. 10154, pp. 207–224',
      year: '2025',
      doi: '10.1007/978-981-92-3681-7_14',
      doiUrl: 'https://doi.org/10.1007/978-981-92-3681-7_14',
      url: 'https://link.springer.com/chapter/10.1007/978-981-92-3681-7_14',
      summary:
        'Published by Springer Nature — hybrid IoT-based deep learning system combining ResNet152V2 and InceptionV3 with a novel Hybrid Channel-Spatial Attention (HCSA) module for lung cancer detection from CT images, achieving 98% accuracy.',
      context:
        'Presented internationally at ITSS-IoE 2025 at the University of Wolverhampton, UK, and published as a Springer book chapter in Lecture Notes in Electrical Engineering.',
      abstract:
        'Early detection of lung cancer is essential to increase patient survival rates. This research proposes an IoT-based hybrid deep learning system designed for the accurate and timely detection of lung cancer from computed tomography (CT) scans. To resolve common medical imaging bottlenecks including class imbalance, high computational costs, and feature scarcity, the system integrates pre-trained ResNet152V2 and InceptionV3 architectures, focal loss optimization, and a novel Hybrid Channel-Spatial Attention (HCSA) module with dual-input augmented representations. Evaluated on the benchmark IQ-OTH/NCCD dataset, the proposed framework achieved an outstanding 98% classification accuracy, establishing its efficacy for distributed IoT and edge-assisted healthcare diagnostic workflows.',
      highlights: [
        'Hybrid ResNet152V2 + InceptionV3 via transfer learning with novel HCSA attention module',
        'Focal loss to address class imbalance in medical imaging data',
        '98% accuracy on the IQ-OTH/NCCD lung CT benchmark dataset',
        'Feasible for localized, edge-assisted IoT healthcare screening workflows',
      ],
      tags: ['Deep Learning', 'Computer Vision', 'IoT', 'Healthcare', 'Lung Cancer', 'Transfer Learning', 'Springer'],
    },
    {
      id: 3,
      title: 'Classification of Kidney Disease from CT Images: A Deep Learning-Based Comparative Analysis',
      authors: 'Hossain, M. N., Bhuiyan, E., Miah, M. B. A., Awang, S., Hossain, M. S., and Sifat, T. A.',
      role: 'Co-author',
      conference:
        '2025 IEEE 9th International Conference on Software Engineering & Computer Systems (ICSECS)',
      venue: 'Pekan, Pahang, Malaysia',
      publisher: 'IEEE',
      series: 'IEEE Conference Proceedings, pp. 353–358',
      year: '2025',
      doi: '10.1109/ICSECS65227.2025.11279151',
      doiUrl: 'https://doi.org/10.1109/ICSECS65227.2025.11279151',
      url: 'https://ieeexplore.ieee.org/abstract/document/11279151',
      summary:
        'Published by IEEE — a deep learning comparative analysis on 12,447 CT images combining DenseNet121, EfficientNetB0, and ensemble classifiers with Explainable AI, achieving 98.98% accuracy and 98.60% F1-score.',
      context:
        'Presented at the 2025 IEEE 9th International Conference on Software Engineering & Computer Systems (ICSECS), focusing on multi-class renal classification and explainable AI in healthcare.',
      abstract:
        'Kidney disease is a significant global health concern where early and precise detection is critical to reducing mortality. Traditional manual diagnostic workflows are labor-intensive and susceptible to human error. In this paper, we conduct a comparative deep learning analysis for automated kidney disease classification from CT images. The framework extracts rich deep features using DenseNet121 and EfficientNetB0, subsequently evaluated across an ensemble of Support Vector Machine (SVM), Random Forest (RF), and XGBoost algorithms combined with soft voting. Across a dataset of 12,447 CT scans (1,869 test images) covering normal kidneys, cysts, stones, and tumors, the model correctly predicted 1,850 cases, delivering an impressive 98.98% accuracy and 98.60% F1-score with integrated Explainable AI (XAI) for enhanced diagnostic transparency and clinical trust.',
      highlights: [
        'Evaluated on a comprehensive dataset of 12,447 CT images (1,869 test cases)',
        'DenseNet121 and EfficientNetB0 deep feature extractors with soft-voting ensemble',
        '98.98% accuracy and 98.60% F1-score across 4 kidney diagnostic classes',
        'Explainable AI (XAI) methodology for clinician transparency and trustworthy diagnostic support',
      ],
      tags: ['Deep Learning', 'Computed Tomography', 'Kidney Disease', 'Explainable AI', 'IEEE', 'Soft Voting', 'XGBoost'],
    },
  ],
  timeline: [
    {
      year: '2025',
      title: 'MDPI Journal Publication — Technologies',
      description:
        'Published in MDPI Technologies (DOI: 10.3390/technologies13110508) — Automated deep learning framework for kidney disease classification from CT images achieving 99.24% accuracy.',
    },
    {
      year: '2025',
      title: 'Springer Book Chapter — ITSS-IoE, Lecture Notes in Electrical Engineering',
      description:
        'Published by Springer Nature Singapore (DOI: 10.1007/978-981-92-3681-7_14) — IoT-based lung cancer detection using deep learning with 98% accuracy, presented at the University of Wolverhampton, UK.',
    },
    {
      year: '2025',
      title: 'IEEE Conference Publication — ICSECS 2025',
      description:
        'Published by IEEE (DOI: 10.1109/ICSECS65227.2025.11279151) — Deep learning comparative analysis on 12,447 CT images with 98.98% accuracy and explainable AI in healthcare.',
    },
    {
      year: '2025 — Present',
      title: 'M.Sc. Engineering in ICT — MBSTU',
      description: 'Graduate research on applied deep learning for medical imaging, computer vision, and network security.',
    },
    {
      year: '2020 — 2025',
      title: 'B.Sc. Engineering in ICT — MBSTU (CGPA 3.65 / 4.00)',
      description: 'Graduated with CGPA 3.65 / 4.00; foundations in software engineering, algorithms, computer networks, and databases.',
    },
  ],
};
