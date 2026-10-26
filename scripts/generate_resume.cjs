/**
 * Build Resume PDF & DOCX
 * Generates ATS-optimized PDF and DOCX in /public
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const {
  Document, Packer, Paragraph, TextRun,
  BorderStyle, LineRuleType,
  TabStopType, TabStopPosition,
  convertInchesToTwip,
} = require('docx');

const publicDir = path.join(__dirname, 'public');
const docxPath = path.join(publicDir, 'Tanvir_Ahmmed_Sifat_Resume.docx');
const pdfPath = path.join(publicDir, 'Tanvir_Ahmmed_Sifat_Resume.pdf');
const htmlTempPath = path.join(__dirname, 'resume_render.html');

// ─── 1. DOCX GENERATION ───────────────────────────────────────────────────────
const C = {
  name:    '0F1A14',
  heading: '1A6647', // dark emerald
  body:    '1F2937',
  sub:     '4B5563',
  dim:     '6B7280',
};
const FONT = 'Calibri';

function rule() {
  return new Paragraph({
    spacing: { before: 200, after: 0 },
    border: { top: { style: BorderStyle.SINGLE, size: 6, color: C.heading, space: 0 } },
    children: [],
  });
}

function sh(label) {
  return new Paragraph({
    spacing: { before: 40, after: 60 },
    children: [new TextRun({ text: label.toUpperCase(), bold: true, size: 20, color: C.heading, font: FONT, characterSpacing: 40 })],
  });
}

function jobHead(leftBold, right) {
  return new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    spacing: { before: 100, after: 0 },
    children: [
      new TextRun({ text: leftBold, bold: true, size: 22, color: C.body, font: FONT }),
      new TextRun({ text: '\t', size: 22 }),
      new TextRun({ text: right, size: 20, color: C.sub, font: FONT, italics: true }),
    ],
  });
}

function jobSub(text) {
  return new Paragraph({
    spacing: { before: 0, after: 50 },
    children: [new TextRun({ text, size: 20, color: C.sub, font: FONT })],
  });
}

function b(text) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { before: 0, after: 32, line: 248, lineRule: LineRuleType.AUTO },
    indent: { left: 340, hanging: 180 },
    children: [new TextRun({ text, size: 19.5, color: C.body, font: FONT })],
  });
}

function skill(label, items) {
  return new Paragraph({
    spacing: { before: 0, after: 36 },
    children: [
      new TextRun({ text: `${label}: `, bold: true, size: 20, color: C.body, font: FONT }),
      new TextRun({ text: items, size: 19.5, color: C.sub, font: FONT }),
    ],
  });
}

function projHead(name, url, tech) {
  return new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    spacing: { before: 100, after: 0 },
    children: [
      new TextRun({ text: name, bold: true, size: 21, color: C.body, font: FONT }),
      new TextRun({ text: '  ·  ', size: 20, color: C.dim, font: FONT }),
      new TextRun({ text: url, size: 20, color: C.heading, font: FONT }),
      new TextRun({ text: '\t', size: 20 }),
      new TextRun({ text: tech, size: 18, color: C.dim, font: FONT, italics: true }),
    ],
  });
}

function pub(num, title, venue, doi, summary) {
  return [
    new Paragraph({
      spacing: { before: 40, after: 0, line: 248, lineRule: LineRuleType.AUTO },
      indent: { left: 280, hanging: 180 },
      children: [
        new TextRun({ text: `${num}.  `, bold: true, size: 20, color: C.body, font: FONT }),
        new TextRun({ text: title, bold: true, size: 19.5, color: C.body, font: FONT }),
        new TextRun({ text: '  —  ', size: 19.5, color: C.dim, font: FONT }),
        new TextRun({ text: venue, size: 19.5, color: C.sub, font: FONT, italics: true }),
        new TextRun({ text: `  ·  DOI: ${doi}`, size: 18, color: C.dim, font: FONT }),
      ],
    }),
    new Paragraph({
      spacing: { before: 0, after: 24 },
      indent: { left: 280 },
      children: [new TextRun({ text: summary, size: 18.5, color: C.sub, font: FONT })],
    }),
  ];
}

function gap(pt = 50) {
  return new Paragraph({ spacing: { before: 0, after: pt }, children: [] });
}

function plain(text, opts = {}) {
  return new Paragraph({
    spacing: { before: opts.before || 0, after: opts.after !== undefined ? opts.after : 36 },
    children: [new TextRun({ text, size: opts.size || 19.5, color: opts.color || C.body, font: FONT, italics: opts.italics || false })],
  });
}

const doc = new Document({
  creator: 'Tanvir Ahmmed Sifat',
  title: 'Tanvir Ahmmed Sifat — Resume',
  styles: {
    default: {
      document: {
        run: { font: FONT, size: 20, color: C.body },
        paragraph: { spacing: { line: 248, lineRule: LineRuleType.AUTO } },
      },
    },
  },
  sections: [{
    properties: {
      page: {
        margin: {
          top:    convertInchesToTwip(0.50),
          bottom: convertInchesToTwip(0.50),
          left:   convertInchesToTwip(0.60),
          right:  convertInchesToTwip(0.60),
        },
      },
    },
    children: [
      // Header
      new Paragraph({
        spacing: { before: 0, after: 30 },
        children: [new TextRun({ text: 'TANVIR AHMMED SIFAT', bold: true, size: 44, color: C.name, font: FONT, characterSpacing: 25 })],
      }),
      new Paragraph({
        spacing: { before: 0, after: 60 },
        children: [new TextRun({ text: 'Web Developer  ·  Full Stack Engineer  ·  Applied AI Researcher', size: 21, color: C.dim, font: FONT })],
      }),
      new Paragraph({
        spacing: { before: 0, after: 0 },
        children: [
          new TextRun({ text: '+880 1521 565 259  ·  ', size: 19, color: C.dim, font: FONT }),
          new TextRun({ text: 'sifatict26@gmail.com  ·  ', size: 19, color: C.heading, font: FONT }),
          new TextRun({ text: 'tanvir-sifat.vercel.app  ·  ', size: 19, color: C.heading, font: FONT }),
          new TextRun({ text: 'linkedin.com/in/sifat26  ·  ', size: 19, color: C.heading, font: FONT }),
          new TextRun({ text: 'github.com/sifat26', size: 19, color: C.heading, font: FONT }),
        ],
      }),

      rule(),

      // Summary
      sh('Professional Summary'),
      new Paragraph({
        spacing: { before: 0, after: 0 },
        children: [new TextRun({
          text: 'Web developer with 2+ years of professional experience translating business requirements into responsive, production-ready web applications using Angular, React, and Next.js, backed by Node.js / Express REST APIs. Contributed across multiple production platforms, including Bazarica, a live multi-vendor marketplace with payment integration. Completing an M.Sc. in ICT at MBSTU with three co-authored, peer-reviewed publications in applied deep learning and medical imaging.',
          size: 19.5, color: C.body, font: FONT,
        })],
      }),

      rule(),

      // Technical Skills
      sh('Technical Skills'),
      skill('Frontend', 'Angular, React, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Sass/SCSS, Tailwind CSS, Bootstrap, Angular Material, Material UI'),
      skill('Backend & APIs', 'Node.js, Express.js, REST API Design & Integration, Authentication, JWT, CRUD, Payment Gateway Integration'),
      skill('Databases & State', 'MongoDB, MySQL, Firebase, Redux Toolkit, Context API'),
      skill('Deployment & Cloud', 'IIS Server, Azure VPS, VPS, cPanel, Vercel'),
      skill('Developer Tools', 'Git, GitHub, VS Code, Postman, Figma, Google Analytics'),
      skill('AI / ML Research', 'Python, TensorFlow, Keras, Deep Learning, Computer Vision, Medical Image Analysis'),

      rule(),

      // Professional Experience
      sh('Professional Experience'),

      jobHead('Web Developer', 'Jun 2024 – Present'),
      jobSub('Universal Technology Research and Development Ltd. · Remote / Bangladesh · Full-time'),
      b('Translate evolving business requirements into responsive frontend features and workflow updates across client applications in mortgage finance, commercial real estate, and venture capital using Angular and Next.js.'),
      b('Build and maintain client-facing portals including mortgage broker dashboards with loan calculation tools, multi-step application forms, and document upload features; and real estate platforms with interactive map search and location filtering.'),
      b('Integrate REST APIs end to end — managing data contracts, request validation, loading and error states, and coordinating contract updates with the backend team as application logic evolves.'),
      b('Develop and maintain reusable UI component libraries with TypeScript to enforce design consistency across modules, and manage production IIS Server builds and deployments.'),

      gap(50),

      jobHead('Full Stack Developer', '2024 – Present'),
      jobSub('Freelance & Contract · Remote'),
      b('Collaborated in small developer teams to deliver three paid client web platforms, building React / Next.js frontends and Node.js / Express REST APIs for authentication, product catalogs, and order workflows.'),
      b('Configured and supported production deployments across Azure VPS, cPanel, and Vercel, including custom domain setup, SEO metadata, and Google Analytics integration.'),

      rule(),

      // Selected Projects
      sh('Selected Projects'),

      projHead('Bazarica — Multi-Vendor Marketplace', 'bazarica.com.bd', 'Next.js · React · Redux · Node.js · Express · MongoDB · Azure VPS'),
      b('Contributed to a live multi-vendor marketplace where independent sellers manage their own product listings and orders independently, while platform admins review vendor accounts, manage commission structures, and oversee operations.'),
      b('Implemented payment gateway integration and order confirmation flows, along with role-based dashboards for admins, sellers, and buyers, cross-vendor catalog search, SEO metadata, and production deployment on Azure VPS.'),

      gap(45),

      projHead('Kahf Treasure — Attar & Fragrance E-Commerce', 'kahf-treasure.vercel.app', 'Next.js · React · Redux Toolkit · Tailwind CSS · Express · MongoDB · Cloudinary'),
      b('Full-stack boutique fragrance e-commerce platform featuring a dynamic product catalog with variant pricing, responsive cart drawer, and Cloudinary media optimization.'),
      b('Engineered centralized client cart and session state using Redux Toolkit, backed by an Express REST API and MongoDB data persistence layer.'),

      gap(45),

      projHead('Nirnoy — EdTech MCQ Assessment Platform', 'nirnoy.vercel.app', 'React · Node.js · Express.js · MongoDB · Tailwind CSS · Zod'),
      b('Engineered a server-authoritative examination flow where question delivery, countdown timing, and scoring are enforced backend-side — stripping correct answers prior to client delivery to eliminate client-side answer inspection.'),
      b('Implemented Zod schema validation across all submission routes, with attempt tracking, score calculation, per-exam leaderboards, and an admin JSON exam importer in MongoDB.'),

      gap(45),

      projHead('Outfitro — E-Commerce Platform', 'outfitro.com', 'React · Node.js · Express · MongoDB · Sass/SCSS · cPanel'),
      b('Contributed to a full-stack fashion platform in a three-member client team: developed storefront pages, product catalog views, Express REST endpoints, and modeled MongoDB product/user schemas.'),
      b('Implemented user authentication and cart-to-checkout flows; managed production build deployment on cPanel hosting.'),

      rule(),

      // Education
      sh('Education'),

      jobHead('M.Sc. in Information & Communication Technology', '2025 – Present'),
      jobSub('Mawlana Bhashani Science & Technology University, Tangail · In progress'),
      plain('Research focus: applied deep learning for medical imaging, computer vision, and network security.', { color: C.sub, after: 0 }),

      gap(50),

      jobHead('B.Sc. in Information & Communication Technology', '2020 – 2025'),
      jobSub('Mawlana Bhashani Science & Technology University, Tangail · Completed · CGPA 3.65 / 4.00'),
      plain('Coursework: software engineering, data structures, algorithms, computer networks, database systems.', { color: C.sub, after: 0 }),

      rule(),

      // Publications
      sh('Research Publications (Co-Author · All 2025)'),

      ...pub('1',
        'Detection and Classification of Kidney Disease from CT Images: An Automated Deep Learning Approach',
        'Technologies (MDPI), Vol. 13, Issue 11, Article 508 (2025)',
        '10.3390/technologies13110508',
        'Co-author. DenseNet121 / EfficientNetB0 soft-voting ensemble for automated kidney disease classification from CT images; reported 99.24% diagnostic accuracy.'),

      ...pub('2',
        'An IoT-Based Lung Cancer Detection System from CT Images Using Deep Learning',
        'Springer Nature · ITSS-IoE 2025, University of Wolverhampton, UK (2025)',
        '10.1007/978-981-92-3681-7_14',
        'Co-author. ResNet152V2 and InceptionV3 with a hybrid channel-spatial attention (HCSA) module; reported 98% classification accuracy on benchmark lung CT dataset.'),

      ...pub('3',
        'Classification of Kidney Disease from CT Images: A Deep Learning-Based Comparative Analysis',
        'IEEE ICSECS 2025, Pekan, Malaysia (2025)',
        '10.1109/ICSECS65227.2025.11279151',
        'Co-author. Comparative deep learning analysis on 12,447 CT images combining ensemble classifiers with explainable AI (XAI); reported 98.98% accuracy and 98.60% F1-score.'),
    ],
  }],
});

// ─── 2. HTML FOR PIXEL-PERFECT ATS PDF ─────────────────────────────────────────
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Tanvir Ahmmed Sifat - Resume</title>
<style>
  @page {
    size: letter;
    margin: 0.48in 0.55in 0.48in 0.55in;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Calibri', 'Segoe UI', Arial, sans-serif;
    color: #1f2937;
    background: #ffffff;
    line-height: 1.34;
    font-size: 10pt;
    -webkit-font-smoothing: antialiased;
  }
  a {
    color: #1a6647;
    text-decoration: none;
  }
  .header {
    margin-bottom: 8px;
  }
  .name {
    font-size: 21pt;
    font-weight: 700;
    letter-spacing: 0.8px;
    color: #0f1a14;
    text-transform: uppercase;
  }
  .tagline {
    font-size: 10.5pt;
    color: #4b5563;
    font-weight: 600;
    margin-top: 2px;
  }
  .contact {
    font-size: 9.5pt;
    color: #4b5563;
    margin-top: 3px;
  }
  .contact a {
    color: #1a6647;
    text-decoration: none;
  }
  .section-divider {
    border-top: 1.5px solid #1a6647;
    margin: 10px 0 6px 0;
  }
  .section-title {
    font-size: 10pt;
    font-weight: 700;
    color: #1a6647;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 5px;
  }
  p.summary {
    font-size: 9.75pt;
    color: #1f2937;
    line-height: 1.38;
    text-align: justify;
  }
  .skills-grid {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .skill-row {
    font-size: 9.5pt;
    line-height: 1.35;
  }
  .skill-label {
    font-weight: 700;
    color: #111827;
  }
  .skill-items {
    color: #374151;
  }
  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-top: 7px;
  }
  .item-title {
    font-size: 10.5pt;
    font-weight: 700;
    color: #111827;
  }
  .item-date {
    font-size: 9.5pt;
    color: #4b5563;
    font-style: italic;
  }
  .item-sub {
    font-size: 9.25pt;
    color: #4b5563;
    margin-bottom: 3px;
  }
  .item-sub strong {
    color: #1f2937;
  }
  ul.bullets {
    margin-left: 17px;
    margin-top: 2px;
    margin-bottom: 4px;
  }
  ul.bullets li {
    font-size: 9.5pt;
    color: #1f2937;
    line-height: 1.35;
    margin-bottom: 2.5px;
  }
  .proj-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-top: 6px;
  }
  .proj-title {
    font-size: 10pt;
    font-weight: 700;
    color: #111827;
  }
  .proj-tech {
    font-size: 8.75pt;
    color: #4b5563;
    font-style: italic;
  }
  .pub-item {
    margin-top: 5px;
    margin-bottom: 4px;
    font-size: 9.25pt;
    line-height: 1.34;
  }
  .pub-title {
    font-weight: 700;
    color: #111827;
  }
  .pub-meta {
    color: #4b5563;
    font-style: italic;
  }
  .pub-doi {
    color: #1a6647;
    font-size: 8.75pt;
  }
  .pub-note {
    font-size: 8.85pt;
    color: #4b5563;
    margin-left: 14px;
    margin-top: 1px;
  }
</style>
</head>
<body>

<div class="header">
  <div class="name">Tanvir Ahmmed Sifat</div>
  <div class="tagline">Web Developer &nbsp;·&nbsp; Full Stack Engineer &nbsp;·&nbsp; Applied AI Researcher</div>
  <div class="contact">
    +880 1521 565 259 &nbsp;·&nbsp;
    <a href="mailto:sifatict26@gmail.com">sifatict26@gmail.com</a> &nbsp;·&nbsp;
    <a href="https://tanvir-sifat.vercel.app">tanvir-sifat.vercel.app</a> &nbsp;·&nbsp;
    <a href="https://linkedin.com/in/sifat26">linkedin.com/in/sifat26</a> &nbsp;·&nbsp;
    <a href="https://github.com/sifat26">github.com/sifat26</a>
  </div>
</div>

<div class="section-divider"></div>
<div class="section-title">Professional Summary</div>
<p class="summary">
  Web developer with 2+ years of professional experience translating business requirements into responsive, production-ready web applications using Angular, React, and Next.js, backed by Node.js / Express REST APIs. Contributed across multiple production platforms, including Bazarica, a live multi-vendor marketplace with payment integration. Completing an M.Sc. in ICT at MBSTU with three co-authored, peer-reviewed publications in applied deep learning and medical imaging.
</p>

<div class="section-divider"></div>
<div class="section-title">Technical Skills</div>
<div class="skills-grid">
  <div class="skill-row"><span class="skill-label">Frontend:</span> <span class="skill-items">Angular, React, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Sass/SCSS, Tailwind CSS, Bootstrap, Angular Material, Material UI</span></div>
  <div class="skill-row"><span class="skill-label">Backend & APIs:</span> <span class="skill-items">Node.js, Express.js, REST API Design & Integration, Authentication, JWT, CRUD, Payment Gateway Integration</span></div>
  <div class="skill-row"><span class="skill-label">Databases & State:</span> <span class="skill-items">MongoDB, MySQL, Firebase, Redux Toolkit, Context API</span></div>
  <div class="skill-row"><span class="skill-label">Deployment & Cloud:</span> <span class="skill-items">IIS Server, Azure VPS, VPS, cPanel, Vercel</span></div>
  <div class="skill-row"><span class="skill-label">Developer Tools:</span> <span class="skill-items">Git, GitHub, VS Code, Postman, Figma, Google Analytics</span></div>
  <div class="skill-row"><span class="skill-label">AI / ML Research:</span> <span class="skill-items">Python, TensorFlow, Keras, Deep Learning, Computer Vision, Medical Image Analysis</span></div>
</div>

<div class="section-divider"></div>
<div class="section-title">Professional Experience</div>

<div class="item-header">
  <span class="item-title">Web Developer</span>
  <span class="item-date">Jun 2024 – Present</span>
</div>
<div class="item-sub">Universal Technology Research and Development Ltd. · Remote / Bangladesh · Full-time</div>
<ul class="bullets">
  <li>Translate evolving business requirements into responsive frontend features and workflow updates across client applications in mortgage finance, commercial real estate, and venture capital using Angular and Next.js.</li>
  <li>Build and maintain client-facing portals including mortgage broker dashboards with loan calculation tools, multi-step application forms, and document upload features; and real estate platforms with interactive map search and location filtering.</li>
  <li>Integrate REST APIs end to end — managing data contracts, request validation, loading and error states, and coordinating contract updates with the backend team as application logic evolves.</li>
  <li>Develop and maintain reusable UI component libraries with TypeScript to enforce design consistency across modules, and manage production IIS Server builds and deployments.</li>
</ul>

<div class="item-header">
  <span class="item-title">Full Stack Developer</span>
  <span class="item-date">2024 – Present</span>
</div>
<div class="item-sub">Freelance & Contract · Remote</div>
<ul class="bullets">
  <li>Collaborated in small developer teams to deliver three paid client web platforms, building React / Next.js frontends and Node.js / Express REST APIs for authentication, product catalogs, and order workflows.</li>
  <li>Configured and supported production deployments across Azure VPS, cPanel, and Vercel, including custom domain setup, SEO metadata, and Google Analytics integration.</li>
</ul>

<div class="section-divider"></div>
<div class="section-title">Selected Projects</div>

<div class="proj-head">
  <span class="proj-title">Bazarica — Multi-Vendor Marketplace <a href="https://bazarica.com.bd">bazarica.com.bd</a></span>
  <span class="proj-tech">Next.js · React · Redux · Node.js · Express · MongoDB · Azure VPS</span>
</div>
<ul class="bullets">
  <li>Contributed to a live multi-vendor marketplace where independent sellers manage their own product listings and orders independently, while platform admins review vendor accounts, manage commission structures, and oversee operations.</li>
  <li>Implemented payment gateway integration and order confirmation flows, along with role-based dashboards for admins, sellers, and buyers, cross-vendor catalog search, SEO metadata, and production deployment on Azure VPS.</li>
</ul>

<div class="proj-head">
  <span class="proj-title">Kahf Treasure — Attar & Fragrance E-Commerce <a href="https://kahf-treasure.vercel.app">kahf-treasure.vercel.app</a></span>
  <span class="proj-tech">Next.js · React · Redux Toolkit · Tailwind CSS · Express · MongoDB · Cloudinary</span>
</div>
<ul class="bullets">
  <li>Full-stack boutique fragrance e-commerce platform featuring a dynamic product catalog with variant pricing, responsive cart drawer, and Cloudinary media optimization.</li>
  <li>Engineered centralized client cart and session state using Redux Toolkit, backed by an Express REST API and MongoDB data persistence layer.</li>
</ul>

<div class="proj-head">
  <span class="proj-title">Nirnoy — EdTech MCQ Assessment Platform <a href="https://nirnoy.vercel.app">nirnoy.vercel.app</a></span>
  <span class="proj-tech">React · Node.js · Express.js · MongoDB · Tailwind CSS · Zod</span>
</div>
<ul class="bullets">
  <li>Engineered a server-authoritative examination flow where question delivery, countdown timing, and scoring are enforced backend-side — stripping correct answers prior to client delivery to eliminate client-side answer inspection.</li>
  <li>Implemented Zod schema validation across all submission routes, with attempt tracking, score calculation, per-exam leaderboards, and an admin JSON exam importer in MongoDB.</li>
</ul>

<div class="proj-head">
  <span class="proj-title">Outfitro — E-Commerce Platform <a href="https://outfitro.com">outfitro.com</a></span>
  <span class="proj-tech">React · Node.js · Express · MongoDB · Sass/SCSS · cPanel</span>
</div>
<ul class="bullets">
  <li>Contributed to a full-stack fashion platform in a three-member client team: developed storefront pages, product catalog views, Express REST endpoints, and modeled MongoDB product/user schemas.</li>
  <li>Implemented user authentication and cart-to-checkout flows; managed production build deployment on cPanel hosting.</li>
</ul>

<div class="section-divider"></div>
<div class="section-title">Education</div>

<div class="item-header">
  <span class="item-title">M.Sc. in Information & Communication Technology</span>
  <span class="item-date">2025 – Present</span>
</div>
<div class="item-sub">Mawlana Bhashani Science & Technology University, Tangail · <em>In progress</em></div>
<div style="font-size: 9.25pt; color: #4b5563; margin-top: 1px;">Research focus: applied deep learning for medical imaging, computer vision, and network security.</div>

<div class="item-header" style="margin-top: 6px;">
  <span class="item-title">B.Sc. in Information & Communication Technology</span>
  <span class="item-date">2020 – 2025</span>
</div>
<div class="item-sub">Mawlana Bhashani Science & Technology University, Tangail · <strong>CGPA 3.65 / 4.00</strong></div>
<div style="font-size: 9.25pt; color: #4b5563; margin-top: 1px;">Coursework: software engineering, data structures, algorithms, computer networks, database systems.</div>

<div class="section-divider"></div>
<div class="section-title">Research Publications (Co-Author · All 2025)</div>

<div class="pub-item">
  <div><strong>1. Detection and Classification of Kidney Disease from CT Images: An Automated Deep Learning Approach</strong></div>
  <div class="pub-meta">Technologies (MDPI), Vol. 13, Issue 11, Article 508 (2025) &nbsp;·&nbsp; DOI: <a class="pub-doi" href="https://doi.org/10.3390/technologies13110508">10.3390/technologies13110508</a></div>
  <div class="pub-note">DenseNet121 / EfficientNetB0 soft-voting ensemble for automated kidney disease classification from CT images; reported 99.24% diagnostic accuracy.</div>
</div>

<div class="pub-item">
  <div><strong>2. An IoT-Based Lung Cancer Detection System from CT Images Using Deep Learning</strong></div>
  <div class="pub-meta">Springer Nature · ITSS-IoE 2025, University of Wolverhampton, UK (2025) &nbsp;·&nbsp; DOI: <a class="pub-doi" href="https://doi.org/10.1007/978-981-92-3681-7_14">10.1007/978-981-92-3681-7_14</a></div>
  <div class="pub-note">ResNet152V2 and InceptionV3 with a hybrid channel-spatial attention (HCSA) module; reported 98% classification accuracy on benchmark lung CT dataset.</div>
</div>

<div class="pub-item">
  <div><strong>3. Classification of Kidney Disease from CT Images: A Deep Learning-Based Comparative Analysis</strong></div>
  <div class="pub-meta">IEEE ICSECS 2025, Pekan, Malaysia (2025) &nbsp;·&nbsp; DOI: <a class="pub-doi" href="https://doi.org/10.1109/ICSECS65227.2025.11279151">10.1109/ICSECS65227.2025.11279151</a></div>
  <div class="pub-note">Comparative deep learning analysis on 12,447 CT images combining ensemble classifiers with explainable AI (XAI); reported 98.98% accuracy and 98.60% F1-score.</div>
</div>

</body>
</html>`;

async function main() {
  // 1. Write DOCX
  console.log('Generating DOCX...');
  const docxBuf = await Packer.toBuffer(doc);
  fs.writeFileSync(docxPath, docxBuf);
  console.log('✓ DOCX written to:', docxPath, `(${(docxBuf.length / 1024).toFixed(1)} KB)`);

  // 2. Write HTML
  fs.writeFileSync(htmlTempPath, htmlContent, 'utf8');

  // 3. Print HTML to PDF using Microsoft Edge headless
  console.log('Generating PDF via headless browser...');
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browserPath = fs.existsSync(edgePath) ? edgePath : chromePath;

  const cmd = `"${browserPath}" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="${pdfPath}" "${htmlTempPath}"`;
  execSync(cmd, { stdio: 'inherit' });

  if (fs.existsSync(pdfPath)) {
    const stats = fs.statSync(pdfPath);
    console.log('✓ PDF written to:', pdfPath, `(${(stats.size / 1024).toFixed(1)} KB)`);
  } else {
    throw new Error('PDF generation failed.');
  }

  // Clean up temp html
  if (fs.existsSync(htmlTempPath)) {
    fs.unlinkSync(htmlTempPath);
  }

  console.log('All resume assets generated successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
