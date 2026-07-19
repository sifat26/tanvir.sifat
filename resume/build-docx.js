/**
 * Premium single-column resume generator — strict-ATS build.
 * Produces resume/Tanvir_Ahmmed_Sifat_Resume.docx
 *
 * Design: one accent (navy), strong type hierarchy, generous spacing, and
 * consistent section rules. Everything is linear paragraph text — no tables,
 * no multi-column layout, no images/icons on data — so ATS parsers read it
 * top to bottom cleanly. Tab stops handle right-aligned dates and the aligned
 * skills labels; those are still plain text to a parser. A4 page size.
 */
const fs = require("fs");
const path = require("path");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  ExternalHyperlink,
  BorderStyle,
  TabStopType,
  TabStopPosition,
} = require("docx");

// ── Palette + type scale (sizes in half-points) ─────────────────────────────
const FONT = "Calibri";
const NAME_SIZE = 40; // 20pt
const TITLE_SIZE = 22; // 11pt
const SECTION_SIZE = 22; // 11pt
const BODY_SIZE = 20; // 10pt
const SMALL = 18; // 9pt

const DARK = "1A1A1A"; // primary text
const GREY = "555555"; // meta / secondary
const NAVY = "1F3A5F"; // single accent
const RULE = "AEBACB"; // light navy for hairlines
const CALLOUT = "F1F5FA"; // faint navy tint for the publication block

const OUTPUT = path.join(__dirname, "Tanvir_Ahmmed_Sifat_Resume.docx");

// ── Small builders ───────────────────────────────────────────────────────────
const run = (text, opts = {}) =>
  new TextRun({ text, font: FONT, size: BODY_SIZE, color: DARK, ...opts });

const link = (label, url, opts = {}) =>
  new ExternalHyperlink({
    children: [run(label, { color: NAVY, size: SMALL, ...opts })],
    link: url,
  });

const sep = () => run("   |   ", { color: RULE, size: SMALL });

function sectionHeading(text) {
  return new Paragraph({
    spacing: { before: 260, after: 120 },
    border: {
      bottom: { color: NAVY, space: 3, style: BorderStyle.SINGLE, size: 8 },
    },
    children: [
      new TextRun({
        text: text.toUpperCase(),
        font: FONT,
        size: SECTION_SIZE,
        bold: true,
        color: NAVY,
        characterSpacing: 16,
      }),
    ],
  });
}

// Title (bold dark) left, dates (grey) right-aligned via tab stop.
function titleDateRow(title, dates, opts = {}) {
  return new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    spacing: { before: opts.before ?? 160, after: 6 },
    children: [
      new TextRun({ text: title, font: FONT, size: BODY_SIZE, bold: true, color: DARK }),
      new TextRun({ text: "\t" + dates, font: FONT, size: SMALL, color: GREY }),
    ],
  });
}

// Company (navy, bold) with optional trailing meta.
function companyRow(company, trailing) {
  const kids = [new TextRun({ text: company, font: FONT, size: BODY_SIZE, bold: true, color: NAVY })];
  if (trailing) kids.push(new TextRun({ text: "  ·  " + trailing, font: FONT, size: SMALL, color: GREY }));
  return new Paragraph({ spacing: { after: 60 }, children: kids });
}

function bullet(text) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 30 },
    indent: { left: 260, hanging: 200 },
    children: [run(text)],
  });
}

function plain(children, opts = {}) {
  return new Paragraph({ spacing: { after: opts.after ?? 60, before: opts.before ?? 0 }, children });
}

// ── Content ──────────────────────────────────────────────────────────────────
const NAME = "Tanvir Ahmmed Sifat";
const TITLE = "Frontend & Full Stack Developer — React · Next.js · Angular";

const summary =
  "Web developer building and shipping production applications. My day-to-day is Angular, React, and Next.js on the frontend, backed by Node.js and Express APIs, and I own deployments through to release. I work across the delivery cycle — component architecture, responsive UI, and API integration. Also a graduate researcher in applied deep learning, with a contribution to an international conference publication.";

// Six logical groups, rendered one per line (single-column, ATS-safe).
const skills = [
  ["Frontend", "React, Next.js, Angular, JavaScript, TypeScript, Tailwind CSS, Bootstrap, Responsive Design"],
  ["Backend", "Node.js, Express.js, REST APIs, Authentication, Payment Gateway Integration"],
  ["Databases", "MongoDB, MySQL, Firebase"],
  ["Cloud & Deployment", "Vercel, Azure, VPS, IIS Server, cPanel"],
  ["AI / ML", "Python, TensorFlow, Deep Learning, Computer Vision"],
  ["Developer Tools", "Git, GitHub, Postman, Figma, Google Analytics, VS Code"],
];

const experience = [
  {
    role: "Web Developer",
    company: "Universal Technology Research and Development Ltd. (UTRDL)",
    location: "Bangladesh",
    period: "June 2024 – Present",
    bullets: [
      "Build and ship Angular and Next.js applications used in live business operations, translating design specs into responsive, accessible interfaces.",
      "Develop reusable component libraries that cut duplicate UI work across features and keep the codebase maintainable.",
      "Integrate REST APIs end to end, managing data flow, loading and error states, and API contract changes with the backend team.",
      "Deploy to IIS Server, configuring builds and resolving environment-specific issues in production.",
      "Partner with backend, QA, and product to align technical direction and keep releases moving.",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "Freelance & Contract",
    location: "Remote",
    period: "2023 – Present",
    bullets: [
      "Deliver client web applications in three-person teams, contributing across React/Next.js frontends and Express REST APIs (see selected projects below).",
      "Build features spanning authentication, product and order management, catalog search, and multi-role dashboards.",
      "Configure builds, domains, SEO, and analytics for deployments on cPanel, VPS, and Azure.",
    ],
  },
];

const clientProjects = [
  {
    name: "Bazarica",
    site: { label: "bazarica.com.bd", url: "https://bazarica.com.bd/" },
    category: "Multi-Vendor Marketplace",
    stack: "Next.js, Node.js, Express",
    bullets: [
      "Built dashboard views for the admin, seller, and customer roles in Next.js.",
      "Integrated the payment gateway and order confirmation flow for live transactions.",
      "Implemented product and order management against the Express REST API, plus catalog search across vendors.",
      "Set up SEO metadata and Google Analytics, and deployed the app on an Azure VPS.",
    ],
  },
  {
    name: "Atkias Zone",
    site: { label: "atkias-zone.vercel.app", url: "https://atkias-zone.vercel.app/" },
    category: "E-Commerce Platform",
    stack: "Next.js, Node.js, Express",
    bullets: [
      "Built storefront and product pages in Next.js and connected them to the Express REST API.",
      "Implemented user authentication and session handling.",
      "Set up SEO metadata across product and listing pages, and deployed to a production VPS.",
    ],
  },
  {
    name: "Outfitro",
    site: { label: "outfitro.com", url: "https://outfitro.com/" },
    category: "E-Commerce Platform",
    stack: "React, Node.js, Express",
    bullets: [
      "Built the storefront and product pages in React and developed REST endpoints on the Express API.",
      "Modeled and integrated the product and user data layer.",
      "Implemented authentication and the cart-to-checkout flow, and deployed the app to cPanel hosting.",
    ],
  },
];

const personalProjects = [
  {
    name: "BlogNest",
    meta: "React, Node.js, Express, MongoDB, Firebase",
    desc: "Full-stack publishing platform with rich-text authoring, nested comment threads, a trending-post ranking, and Google OAuth. Designed a comment schema supporting arbitrarily nested replies while keeping MongoDB read queries fast.",
  },
  {
    name: "Woven Earth",
    meta: "React, Express, MongoDB, Firebase, Tailwind CSS",
    desc: "Full-stack marketplace for handcrafted textiles, with a self-service artist portal for managing listings, category-based discovery, and authenticated per-user collections.",
  },
];

// ── Assemble ───────────────────────────────────────────────────────────────
const children = [];

// Header block
children.push(
  new Paragraph({
    spacing: { after: 40 },
    children: [
      new TextRun({ text: NAME, font: FONT, size: NAME_SIZE, bold: true, color: NAVY, characterSpacing: 20 }),
    ],
  }),
);
children.push(
  new Paragraph({
    spacing: { after: 100 },
    children: [new TextRun({ text: TITLE, font: FONT, size: TITLE_SIZE, color: GREY })],
  }),
);
children.push(
  plain(
    [
      run("Bangladesh", { color: GREY, size: SMALL }),
      sep(),
      link("sifatict26@gmail.com", "mailto:sifatict26@gmail.com"),
      sep(),
      run("+880 1521 565 259", { color: GREY, size: SMALL }),
    ],
    { after: 30 },
  ),
);
children.push(
  new Paragraph({
    spacing: { after: 60 },
    border: {
      bottom: { color: RULE, space: 6, style: BorderStyle.SINGLE, size: 6 },
    },
    children: [
      link("sifat26.vercel.app", "https://sifat26.vercel.app/"),
      sep(),
      link("github.com/sifat26", "https://github.com/sifat26"),
      sep(),
      link("linkedin.com/in/sifat26", "https://linkedin.com/in/sifat26"),
    ],
  }),
);

// Professional summary
children.push(sectionHeading("Professional Summary"));
children.push(plain([run(summary)]));

// Technical skills — single-column list, one line per group (label : values).
// Plain paragraphs (no table) so every ATS reads "Label: a, b, c" cleanly.
children.push(sectionHeading("Technical Skills"));
for (const [label, values] of skills) {
  children.push(
    new Paragraph({
      spacing: { after: 40 },
      indent: { left: 0 },
      children: [
        run(label + ": ", { bold: true, color: NAVY }),
        run(values, { size: SMALL, color: DARK }),
      ],
    }),
  );
}

// Professional experience
children.push(sectionHeading("Professional Experience"));
for (const job of experience) {
  children.push(titleDateRow(job.role, job.period));
  children.push(companyRow(job.company, job.location));
  job.bullets.forEach((b) => children.push(bullet(b)));
}

// Professional client projects
children.push(sectionHeading("Professional Client Projects"));
children.push(
  new Paragraph({
    spacing: { after: 20 },
    children: [
      run(
        "Paid production work delivered in three-person development teams. Bullets reflect my individual contributions.",
        { size: SMALL, color: GREY, italics: true },
      ),
    ],
  }),
);
for (const p of clientProjects) {
  children.push(
    new Paragraph({
      tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
      spacing: { before: 160, after: 6 },
      children: [
        new TextRun({ text: p.name, font: FONT, size: BODY_SIZE, bold: true, color: NAVY }),
        new TextRun({ text: "\t", font: FONT, size: SMALL }),
        link(p.site.label, p.site.url),
      ],
    }),
  );
  children.push(
    new Paragraph({
      spacing: { after: 30 },
      children: [
        run(p.category, { size: SMALL, color: GREY, italics: true }),
        run("   ·   Role: ", { size: SMALL, color: GREY }),
        run("Full Stack Developer", { size: SMALL, color: DARK }),
      ],
    }),
  );
  children.push(
    new Paragraph({
      spacing: { after: 40 },
      children: [run("Tech: ", { size: SMALL, bold: true, color: GREY }), run(p.stack, { size: SMALL, color: DARK })],
    }),
  );
  p.bullets.forEach((b) => children.push(bullet(b)));
}

// Selected personal projects
children.push(sectionHeading("Selected Projects"));
for (const p of personalProjects) {
  children.push(
    new Paragraph({
      spacing: { before: 140, after: 6 },
      children: [run(p.name, { bold: true, color: NAVY }), run("   " + p.meta, { color: GREY, size: SMALL })],
    }),
  );
  children.push(plain([run(p.desc)], { after: 20 }));
}

// Publication — normal section, styled like Selected Projects
children.push(sectionHeading("Publication"));
children.push(
  new Paragraph({
    spacing: { before: 140, after: 6 },
    children: [
      run("An IoT-Based Lung Cancer Detection System from CT Images Using Deep Learning", { bold: true, color: NAVY }),
      run("   Contributing Author", { size: SMALL, color: GREY }),
    ],
  }),
);
children.push(
  new Paragraph({
    spacing: { after: 6 },
    children: [
      run(
        "ITSS-IoE 2025 — International Conference on Intelligent Technology, Systems and Services for the Internet of Everything. University of Wolverhampton, United Kingdom.",
        { size: SMALL, color: GREY },
      ),
    ],
  }),
);
children.push(
  plain(
    [run("Combines IoT infrastructure with deep learning to detect lung cancer from CT images.")],
    { after: 20 },
  ),
);

// Education
children.push(sectionHeading("Education"));
const edu = [
  ["M.Sc. in Information & Communication Technology", "Mawlana Bhashani Science & Technology University", "2025 – Present"],
  ["B.Sc. in Information & Communication Technology", "Mawlana Bhashani Science & Technology University", "2020 – 2025"],
];
for (const [deg, inst, period] of edu) {
  children.push(titleDateRow(deg, period, { before: 120 }));
  children.push(new Paragraph({ spacing: { after: 20 }, children: [run(inst, { size: SMALL, color: GREY })] }));
}

// Languages (kept — compact, useful)
children.push(sectionHeading("Languages"));
children.push(
  plain([run("Bengali (native)   ·   English (professional working proficiency)", { size: SMALL })], { after: 0 }),
);

// ── Document ─────────────────────────────────────────────────────────────────
const doc = new Document({
  creator: NAME,
  title: `${NAME} — Resume`,
  description: "Resume",
  styles: {
    default: {
      document: { run: { font: FONT, size: BODY_SIZE, color: DARK }, paragraph: { spacing: { line: 264 } } },
    },
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 }, // A4 in twips (210 × 297 mm)
          margin: { top: 850, bottom: 850, left: 1020, right: 1020 }, // ~15 / 18 mm
        },
      },
      children,
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(OUTPUT, buf);
  console.log("Wrote", OUTPUT, `(${(buf.length / 1024).toFixed(1)} KB)`);
});
