// src/scripts/seed.ts
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

// Import all models
import About from '../app/modules/About/about.model';
import Admin from '../app/modules/Admin/admin.model';
import Education from '../app/modules/Education/education.model';
import Experience from '../app/modules/Experience/experience.model';
import Personal from '../app/modules/Personal/personal.model';
import Project from '../app/modules/Projects/projects.model';
import Research from '../app/modules/Research/research.model';
import Skills from '../app/modules/Skills/skills.model';
import Socials from '../app/modules/Socials/socials.model';

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log('Connected to MongoDB');

  // Admin
  const adminExists = await Admin.findOne({ email: 'sifatict26@gmail.com' });
  if (!adminExists) {
    const hashed = await bcrypt.hash('Admin@1234', 12);
    await Admin.create({
      name: 'Tanvir Ahmmed Sifat',
      email: 'sifatict26@gmail.com',
      password: hashed,
      isBlocked: false,
      mustChangePassword: false,
    });
    console.log('Admin created: sifatict26@gmail.com / Admin@1234 (change this!)');
  } else {
    console.log('Admin already exists, skipping.');
  }

  // Personal
  await Personal.findOneAndUpdate(
    {},
    {
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
      resumeUrl: '/Tanvir_Ahmmed_Sifat_Resume.pdf',
      resumeDocx: '/Tanvir_Ahmmed_Sifat_Resume.docx',
      resumeUpdated: 'July 2026',
      portrait: '/portrait-hero.jpg',
      portraitWebp: '/portrait-hero.webp',
      portraitSquare: '/portrait-square.jpg',
      portraitSquareWebp: '/portrait-square.webp',
      availability: 'Open to Frontend, Full Stack, and AI Engineering roles',
    },
    { upsert: true, new: true },
  );
  console.log('Personal seeded');

  // Socials
  await Socials.findOneAndUpdate(
    {},
    {
      github: 'https://github.com/sifat26',
      linkedin: 'https://linkedin.com/in/sifat26',
      twitter: 'https://x.com/tanvirahmmedsi2',
      facebook: 'https://www.facebook.com/sifat.7847/',
      instagram: 'https://www.instagram.com/tanvir_ahmmed_sifat/',
    },
    { upsert: true, new: true },
  );
  console.log('Socials seeded');

  // About
  await About.findOneAndUpdate(
    {},
    {
      headline: 'I build software end to end — and research where it goes next.',
      short: [
        'I ship production web applications — React, Next.js, and Angular on the front, Node.js and Express behind them — and deploy them myself.',
        "Alongside that I'm doing an M.Sc. in ICT, applying deep learning to medical imaging and network security. My first international paper was presented in the UK.",
      ],
      paragraphs: [
        'At Universal Technology Research and Development Limited I build Angular and Next.js interfaces for live business systems.',
        'Most of what I care about is the part users never see: reusable components, clear API contracts, and deployments I understand end to end.',
        'My graduate research at Mawlana Bhashani Science & Technology University covers applied deep learning for medical image analysis and network intrusion detection.',
        "I'm looking for teams building software that has to hold up in production, where the research side is a plus rather than a distraction.",
      ],
    },
    { upsert: true, new: true },
  );
  console.log('About seeded');

  // Experiences
  const expCount = await Experience.countDocuments();
  if (expCount === 0) {
    await Experience.insertMany([
      {
        role: 'Web Developer',
        company: 'Universal Technology Research and Development Ltd.',
        shortName: 'UTRDL',
        location: 'Bangladesh',
        period: 'June 2024 — Present',
        type: 'Full-time',
        summary: 'Build and ship Angular and Next.js apps used in live business operations.',
        highlights: [
          'Build and ship Angular and Next.js applications used in live business operations.',
          'Built shared component libraries.',
          'Integrated REST APIs end to end.',
          'Deployed to IIS Server.',
        ],
        tech: ['Angular', 'Next.js', 'TypeScript', 'REST APIs', 'IIS Server'],
        order: 1,
      },
      {
        role: 'Full Stack Developer',
        company: 'Freelance & Contract',
        shortName: 'Client Work',
        location: 'Remote',
        period: '2023 — Present',
        type: 'Contract',
        summary: 'Delivered three production e-commerce platforms end to end.',
        highlights: [
          'Shipped three production e-commerce platforms.',
          'Worked across the stack — React/Next.js frontends and Express REST APIs.',
          'Deployed to cPanel, VPS, and Azure.',
        ],
        tech: ['Next.js', 'React', 'Node.js', 'Express', 'MongoDB', 'Azure'],
        order: 2,
      },
    ]);
    console.log('Experiences seeded');
  }

  // Education
  const eduCount = await Education.countDocuments();
  if (eduCount === 0) {
    await Education.insertMany([
      {
        degree: 'M.Sc. Engineering — Information & Communication Technology',
        institute: 'Mawlana Bhashani Science & Technology University',
        period: '2025 — Present',
        status: 'In progress',
        notes: [
          'Research focus: deep learning applications in medical imaging, computer vision, and network intrusion detection.',
        ],
        order: 1,
      },
      {
        degree: 'B.Sc. Engineering — Information & Communication Technology',
        institute: 'Mawlana Bhashani Science & Technology University',
        period: '2020 — 2025',
        status: 'Completed',
        notes: [
          'Coursework across software engineering, data structures, algorithms, computer networks, and databases.',
        ],
        order: 2,
      },
      {
        degree: 'Higher Secondary Certificate — Science',
        institute: 'Major General Mahmudul Hasan Adarsha College, Tangail',
        period: '2017 — 2019',
        status: 'Completed',
        notes: ['GPA 4.83 / 5.00'],
        order: 3,
      },
      {
        degree: 'Secondary School Certificate — Science',
        institute: 'Adi Tangail High School, Tangail',
        period: '2017',
        status: 'Completed',
        notes: ['GPA 5.00 / 5.00'],
        order: 4,
      },
    ]);
    console.log('Education seeded');
  }

  // Skills
  const skillsCount = await Skills.countDocuments();
  if (skillsCount === 0) {
    await Skills.insertMany([
      {
        group: 'Frontend',
        items: ['Angular', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Bootstrap'],
        order: 1,
      },
      {
        group: 'Backend',
        items: ['Node.js', 'Express.js', 'REST APIs', 'Authentication', 'Payment Gateways'],
        order: 2,
      },
      { group: 'AI / ML', items: ['Python', 'TensorFlow', 'Deep Learning', 'Computer Vision'], order: 3 },
      { group: 'Databases', items: ['MongoDB', 'MySQL', 'Firebase'], order: 4 },
      { group: 'Deployment', items: ['Vercel', 'Azure', 'VPS', 'IIS Server', 'cPanel'], order: 5 },
      { group: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Figma', 'Google Analytics'], order: 6 },
    ]);
    console.log('Skills seeded');
  }

  // Projects
  const projCount = await Project.countDocuments();
  if (projCount === 0) {
    await Project.insertMany([
      {
        type: 'client',
        title: 'Bazarica',
        category: 'Multi-Vendor Marketplace',
        role: 'Full Stack Developer',
        team: 'Built with a 3-member team',
        year: '2026',
        featured: true,
        tagline: 'A production multi-vendor marketplace with payments, dashboards, and search.',
        overview: 'A live multi-vendor marketplace where sellers list and sell independently.',
        contributions: [
          'Built dashboard views for admin, seller, and customer roles in Next.js',
          'Integrated the payment gateway and order confirmation flow',
          'Implemented product and order management',
          'Deployed on Azure VPS',
        ],
        tech: ['Next.js', 'Node.js', 'Express.js'],
        links: { live: 'https://bazarica.com.bd/', github: null, githubServer: null },
        order: 1,
      },
      {
        type: 'client',
        title: 'Atkias Zone',
        category: 'E-Commerce Platform',
        role: 'Full Stack Developer',
        year: '2026',
        tagline: 'A full-stack storefront.',
        tech: ['Next.js', 'Node.js', 'Express.js'],
        links: { live: 'https://atkias-zone.vercel.app/' },
        order: 2,
      },
      {
        type: 'client',
        title: 'Outfitro',
        category: 'E-Commerce Platform',
        role: 'Full Stack Developer',
        year: '2025',
        tagline: 'A full-stack fashion storefront with authentication and cart checkout.',
        tech: ['React', 'Node.js', 'Express.js'],
        links: { live: 'https://outfitro.com/' },
        order: 3,
      },
      {
        type: 'personal',
        title: 'BlogNest',
        category: 'Full-Stack Platform',
        year: '2024',
        tagline: 'A community-driven publishing platform.',
        tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Firebase'],
        image: 'https://i.postimg.cc/2yxXm5S4/blognestss.png',
        links: {
          live: 'https://blognest-d41ff.web.app/',
          github: 'https://github.com/sifat26/BlogNest_Client',
          githubServer: 'https://github.com/sifat26/BlogNest_Project_Server_Side',
        },
        order: 4,
      },
      {
        type: 'personal',
        title: 'Woven Earth',
        category: 'E-Commerce',
        year: '2024',
        tagline: 'A curated marketplace for handcrafted textile art.',
        tech: ['React', 'Firebase', 'MongoDB', 'Express', 'Tailwind CSS'],
        image: 'https://i.postimg.cc/fLc8jbmM/woben.png',
        links: {
          live: 'https://art-and-craft-b1839.web.app/',
          github: 'https://github.com/sifat26/Woven-earth-client',
          githubServer: 'https://github.com/sifat26/Woven-earth-server',
        },
        order: 5,
      },
    ]);
    console.log('Projects seeded');
  }

  // Research
  const researchExists = await Research.findOne();
  if (!researchExists) {
    await Research.create({
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
          'My current graduate research explores how deep learning models can be applied to real-world diagnostic imaging and security-critical systems.',
      },
      futureDirection: 'Extending current work toward robust, deployable AI systems.',
      publications: [
        {
          title: 'An IoT-Based Lung Cancer Detection System from CT Images Using Deep Learning',
          role: 'Author',
          conference:
            'International Conference on Intelligent Technology, Systems and Services for the Internet of Everything (ITSS-IoE 2025)',
          venue: 'University of Wolverhampton, United Kingdom',
          year: '2025',
          summary: 'Pairs IoT infrastructure with deep learning to detect lung cancer from CT images.',
          context: 'Presented at ITSS-IoE 2025, held alongside the CyberVehiCare Launch Event.',
          tags: ['Deep Learning', 'Computer Vision', 'IoT', 'Healthcare'],
          order: 1,
        },
      ],
      timeline: [
        {
          year: '2025',
          title: 'International publication — ITSS-IoE 2025 (United Kingdom)',
          description: 'Presented research on IoT-based lung cancer detection.',
          order: 1,
        },
        {
          year: '2025 — Present',
          title: 'M.Sc. research at MBSTU',
          description: 'Graduate research on applied deep learning.',
          order: 2,
        },
        {
          year: '2020 — 2025',
          title: 'B.Sc. in ICT — MBSTU',
          description: 'Foundations in software engineering.',
          order: 3,
        },
      ],
    });
    console.log('Research seeded');
  }

  console.log('\nSeed complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
