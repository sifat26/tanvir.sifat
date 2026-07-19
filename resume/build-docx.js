/**
 * Premium single-column resume generator — strict-ATS build.
 * Produces resume/Tanvir_Ahmmed_Sifat_Resume.docx
 *
 * Layout mirrors the Arham-Malik-style reference: centered header, ALL CAPS
 * section headings with a hairline rule, tight spacing, one accent colour,
 * and pure paragraph flow (no tables, no multi-column layout) so ATS parsers
 * read every line top-to-bottom cleanly. Keywords are wrapped in bold runs,
 * which stays as plain text to a parser but reads as emphasis in Word/PDF.
 */
const fs = require("fs");
const path = require("path");
const {
  AlignmentType,
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
const NAME_SIZE = 44;    // 22pt
const SUB_SIZE = 22;     // 11pt
const SECTION_SIZE = 21; // 10.5pt
const BODY_SIZE = 20;    // 10pt
const SMALL = 19;        // 9.5pt

const DARK = "111111";   // primary text
const MUTED = "6B6B6B";  // meta / secondary
const ACCENT = "1A3357"; // single accent for role & skill values

const OUTPUT = path.join(__dirname, "Tanvir_Ahmmed_Sifat_Resume.docx");

// ── Small builders ───────────────────────────────────────────────────────────
const run = (text, opts = {}) =>
  new TextRun({ text, font: FONT, size: BODY_SIZE, color: DARK, ...opts });

const link = (label, url, opts = {}) =>
  new ExternalHyperlink({
    children: [run(label, { color: DARK, size: SMALL, underline: {}, ...opts })],
    link: url,
  });

const dot = (padded = true) =>
  run(padded ? "  ·  " : "·", { color: MUTED, size: SMALL });

/**
 * Build a paragraph out of a sentence that mixes plain text and bold keywords.
 * Accepts an array of ["plain string"] or [text, { bold: true }] pairs, so we
 * can highlight ATS keywords without breaking the underlying text flow.
 */
function richLine(parts, opts = {}) {
  const children = parts.map((p) =>
    Array.isArray(p) ? run(p[0], p[1] || {}) : run(p)
  );
  return new Paragraph({
    spacing: { after: opts.after ?? 30, before: opts.before ?? 0 },
    alignment: opts.alignment,
    children,
  });
}

function bullet(parts) {
  const children = parts.map((p) =>
    Array.isArray(p) ? run(p[0], p[1] || {}) : run(p)
  );
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 20 },
    indent: { left: 260, hanging: 200 },
    children,
  });
}

function sectionHeading(text) {
  return new Paragraph({
    spacing: { before: 220, after: 90 },
    border: {
      bottom: { color: DARK, space: 2, style: BorderStyle.SINGLE, size: 8 },
    },
    children: [
      new TextRun({
        text: text.toUpperCase(),
        font: FONT,
        size: SECTION_SIZE,
        bold: true,
        color: DARK,
        characterSpacing: 12,
      }),
    ],
  });
}

// Company / project line (bold left, right-aligned dates via tab stop).
function titleDateRow(leftParts, dates, opts = {}) {
  const children = leftParts.map((p) =>
    Array.isArray(p) ? run(p[0], p[1] || {}) : run(p, { bold: true })
  );
  children.push(new TextRun({ text: "\t", font: FONT }));
  children.push(new TextRun({ text: dates, font: FONT, size: SMALL, color: DARK, bold: true }));
  return new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    spacing: { before: opts.before ?? 120, after: 20 },
    children,
  });
}

// Italic navy role sitting under the company row.
function roleLine(role) {
  return new Paragraph({
    spacing: { after: 40 },
    children: [
      new TextRun({ text: role, font: FONT, size: BODY_SIZE, bold: true, italics: true, color: ACCENT }),
    ],
  });
}

// Italic muted meta line (project stack, publication venue).
function metaLine(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 40 },
    children: [
      new TextRun({ text, font: FONT, size: SMALL, italics: true, color: MUTED }),
    ],
  });
}

// ── Content ──────────────────────────────────────────────────────────────────
const NAME = "Tanvir Ahmmed Sifat";

const summaryParts = [
  "Full-stack web developer with ",
  ["2+ years", { bold: true }],
  " shipping ",
  ["production applications", { bold: true }],
  " across frontend, backend, and deployment. Build and maintain live systems with ",
  ["Angular", { bold: true }],
  ", ",
  ["React", { bold: true }],
  ", and ",
  ["Next.js", { bold: true }],
  " on the frontend, backed by ",
  ["Node.js", { bold: true }],
  " and ",
  ["Express", { bold: true }],
  " REST APIs. Delivered three paid client platforms in three-person teams — including ",
  ["Bazarica", { bold: true }],
  ", a multi-vendor marketplace with payment integration and role-based dashboards. Also a graduate researcher in ",
  ["applied deep learning", { bold: true }],
  " with a peer-reviewed publication at an ",
  ["international conference", { bold: true }],
  " (ITSS-IoE 2025, United Kingdom).",
];

const experience = [
  {
    company: "Universal Technology Research and Development Ltd.",
    location: "Bangladesh",
    role: "Web Developer",
    period: "Jun 2024 – Present",
    bullets: [
      [
        "Build and ship ",
        ["Angular", { bold: true }],
        " and ",
        ["Next.js", { bold: true }],
        " applications used in ",
        ["live business operations", { bold: true }],
        ", translating design specs into ",
        ["responsive, accessible", { bold: true }],
        " interfaces.",
      ],
      [
        "Develop ",
        ["reusable component libraries", { bold: true }],
        " that cut duplicate UI work across features and keep the codebase maintainable.",
      ],
      [
        "Integrate ",
        ["REST APIs", { bold: true }],
        " end to end — managing data flow, ",
        ["loading and error states", { bold: true }],
        ", and coordinating ",
        ["API contract", { bold: true }],
        " changes with the backend team.",
      ],
      [
        "Deploy to ",
        ["IIS Server", { bold: true }],
        ", configuring builds and resolving environment-specific issues in production.",
      ],
      [
        "Partner with ",
        ["backend, QA, and product", { bold: true }],
        " to align technical direction and keep releases moving.",
      ],
    ],
  },
  {
    company: "Freelance & Contract",
    location: "Remote",
    role: "Full Stack Developer",
    period: "2023 – Present",
    bullets: [
      [
        "Deliver ",
        ["client web applications", { bold: true }],
        " in three-person teams, contributing across ",
        ["React / Next.js", { bold: true }],
        " frontends and ",
        ["Express REST APIs", { bold: true }],
        ".",
      ],
      [
        "Build features spanning ",
        ["authentication", { bold: true }],
        ", ",
        ["product and order management", { bold: true }],
        ", ",
        ["catalog search", { bold: true }],
        ", and ",
        ["multi-role dashboards", { bold: true }],
        ".",
      ],
      [
        "Configure builds, ",
        ["domains, SEO, and analytics", { bold: true }],
        " for deployments on ",
        ["cPanel, VPS, and Azure", { bold: true }],
        ".",
      ],
    ],
  },
];

const clientProjects = [
  {
    name: "Bazarica — Multi-Vendor Marketplace",
    site: "bazarica.com.bd",
    stack: "Next.js · Node.js · Express · Azure VPS · Payment Gateway",
    bullets: [
      [
        "Built ",
        ["role-based dashboards", { bold: true }],
        " for admin, seller, and customer in ",
        ["Next.js", { bold: true }],
        ".",
      ],
      [
        "Integrated the ",
        ["payment gateway", { bold: true }],
        " and ",
        ["order confirmation flow", { bold: true }],
        " for live transactions.",
      ],
      [
        "Implemented ",
        ["product and order management", { bold: true }],
        " against the ",
        ["Express REST API", { bold: true }],
        ", plus ",
        ["catalog search", { bold: true }],
        " across vendors.",
      ],
      [
        "Set up ",
        ["SEO metadata", { bold: true }],
        " and ",
        ["Google Analytics", { bold: true }],
        ", and deployed on ",
        ["Azure VPS", { bold: true }],
        ".",
      ],
    ],
  },
  {
    name: "Atkias Zone — E-Commerce Platform",
    site: "atkias-zone.vercel.app",
    stack: "Next.js · Node.js · Express · VPS",
    bullets: [
      [
        "Built ",
        ["storefront and product pages", { bold: true }],
        " in Next.js against an Express REST API.",
      ],
      [
        "Implemented ",
        ["user authentication", { bold: true }],
        " and ",
        ["session handling", { bold: true }],
        ".",
      ],
      [
        "Set up ",
        ["SEO metadata", { bold: true }],
        " across product and listing pages and deployed to a production VPS.",
      ],
    ],
  },
  {
    name: "Outfitro — E-Commerce Platform",
    site: "outfitro.com",
    stack: "React · Node.js · Express · cPanel",
    bullets: [
      [
        "Built the ",
        ["storefront and product pages", { bold: true }],
        " in React and developed REST endpoints on the Express API.",
      ],
      [
        "Modeled and integrated the ",
        ["product and user data layer", { bold: true }],
        ".",
      ],
      [
        "Implemented ",
        ["authentication", { bold: true }],
        " and the ",
        ["cart-to-checkout flow", { bold: true }],
        ", and deployed to cPanel hosting.",
      ],
    ],
  },
];

const personalProjects = [
  {
    name: "BlogNest — Full-Stack Publishing Platform",
    stack: "React · Node.js · Express · MongoDB · Firebase",
    desc: [
      "Publishing platform with ",
      ["rich-text authoring", { bold: true }],
      ", ",
      ["nested comment threads", { bold: true }],
      ", ",
      ["trending-post ranking", { bold: true }],
      ", and ",
      ["Google OAuth", { bold: true }],
      ". Designed a comment schema supporting arbitrarily nested replies while keeping MongoDB read queries fast.",
    ],
  },
  {
    name: "Woven Earth — Handcrafted Textiles Marketplace",
    stack: "React · Express · MongoDB · Firebase · Tailwind CSS",
    desc: [
      "Marketplace for handcrafted textiles with a ",
      ["self-service artist portal", { bold: true }],
      ", ",
      ["category-based discovery", { bold: true }],
      ", and authenticated ",
      ["per-user collections", { bold: true }],
      ".",
    ],
  },
];

const skills = [
  ["Frontend", "React, Next.js, Angular, JavaScript, TypeScript, Tailwind CSS, Bootstrap, Responsive Design"],
  ["Backend", "Node.js, Express.js, REST APIs, Authentication, Payment Gateway Integration"],
  ["Databases", "MongoDB, MySQL, Firebase"],
  ["Cloud & Deployment", "Vercel, Azure, VPS, IIS Server, cPanel"],
  ["AI & Machine Learning", "Python, TensorFlow, Deep Learning, Computer Vision, Medical Image Analysis"],
  ["Developer Tools", "Git, GitHub, Postman, Figma, Google Analytics, VS Code"],
  ["Languages", "Bengali (native), English (professional working proficiency)"],
];

// ── Assemble ───────────────────────────────────────────────────────────────
const children = [];

// ── Header (centered) ─────────────────────────────────────────────────────
children.push(
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
    children: [
      new TextRun({
        text: NAME.toUpperCase(),
        font: FONT,
        size: NAME_SIZE,
        bold: true,
        color: DARK,
        characterSpacing: 30,
      }),
    ],
  }),
);
children.push(
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
    children: [
      new TextRun({ text: "Frontend Engineer", font: FONT, size: SUB_SIZE, bold: true, italics: true, color: DARK }),
      new TextRun({ text: " · ", font: FONT, size: SUB_SIZE, color: MUTED }),
      new TextRun({ text: "Full Stack Developer", font: FONT, size: SUB_SIZE, bold: true, italics: true, color: DARK }),
      new TextRun({ text: " · ", font: FONT, size: SUB_SIZE, color: MUTED }),
      new TextRun({ text: "AI Researcher", font: FONT, size: SUB_SIZE, bold: true, italics: true, color: DARK }),
    ],
  }),
);
children.push(
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
    children: [
      run("Bangladesh", { size: SMALL }),
      dot(),
      run("+880 1521 565 259", { size: SMALL }),
      dot(),
      link("sifatict26@gmail.com", "mailto:sifatict26@gmail.com"),
    ],
  }),
);
children.push(
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 20 },
    children: [
      link("tanvir-sifat.vercel.app", "https://tanvir-sifat.vercel.app/"),
      dot(),
      link("linkedin.com/in/sifat26", "https://linkedin.com/in/sifat26"),
      dot(),
      link("github.com/sifat26", "https://github.com/sifat26"),
    ],
  }),
);

// ── Summary ───────────────────────────────────────────────────────────────
children.push(sectionHeading("Summary"));
children.push(richLine(summaryParts, { after: 40 }));

// ── Experience ────────────────────────────────────────────────────────────
children.push(sectionHeading("Experience"));
for (const job of experience) {
  children.push(
    titleDateRow(
      [
        [job.company, { bold: true }],
        ["   " + job.location, { italics: true, color: MUTED, size: SMALL }],
      ],
      job.period,
      { before: 160 },
    ),
  );
  children.push(roleLine(job.role));
  job.bullets.forEach((b) => children.push(bullet(b)));
}

// ── Projects ──────────────────────────────────────────────────────────────
children.push(sectionHeading("Projects"));
for (const p of clientProjects) {
  children.push(
    titleDateRow(
      [[p.name, { bold: true }]],
      p.site,
      { before: 140 },
    ),
  );
  children.push(metaLine(p.stack, { after: 30 }));
  p.bullets.forEach((b) => children.push(bullet(b)));
}
for (const p of personalProjects) {
  children.push(
    titleDateRow(
      [[p.name, { bold: true }]],
      p.stack,
      { before: 140 },
    ),
  );
  children.push(richLine(p.desc, { after: 40 }));
}

// ── Skills ────────────────────────────────────────────────────────────────
children.push(sectionHeading("Skills"));
for (const [label, values] of skills) {
  children.push(
    new Paragraph({
      spacing: { after: 30 },
      children: [
        run(label + ": ", { bold: true, color: DARK }),
        run(values, { color: ACCENT }),
      ],
    }),
  );
}

// ── Publication ───────────────────────────────────────────────────────────
children.push(sectionHeading("Publication"));
children.push(
  titleDateRow(
    [["An IoT-Based Lung Cancer Detection System from CT Images Using Deep Learning", { bold: true }]],
    "2025",
    { before: 100 },
  ),
);
children.push(
  metaLine(
    "ITSS-IoE 2025 — International Conference on Intelligent Technology, Systems and Services for the Internet of Everything, University of Wolverhampton, United Kingdom",
    { after: 30 },
  ),
);
children.push(
  richLine(
    [
      "Combines ",
      ["IoT infrastructure", { bold: true }],
      " with ",
      ["deep learning", { bold: true }],
      " to detect lung cancer from ",
      ["CT images", { bold: true }],
      ", contributing on data pipeline design and model evaluation as a co-author.",
    ],
    { after: 40 },
  ),
);

// ── Education ─────────────────────────────────────────────────────────────
children.push(sectionHeading("Education"));
const edu = [
  ["Mawlana Bhashani Science & Technology University", "Bangladesh", "M.Sc. in Information & Communication Technology", "2025 – Present"],
  ["Mawlana Bhashani Science & Technology University", "Bangladesh", "B.Sc. in Information & Communication Technology", "2020 – 2025"],
];
for (const [inst, loc, degree, period] of edu) {
  children.push(
    titleDateRow(
      [
        [inst, { bold: true }],
        ["   " + loc, { italics: true, color: MUTED, size: SMALL }],
      ],
      period,
      { before: 120 },
    ),
  );
  children.push(
    new Paragraph({
      spacing: { after: 30 },
      children: [run(degree, { italics: true, color: MUTED, size: SMALL })],
    }),
  );
}

// ── Document ─────────────────────────────────────────────────────────────────
const doc = new Document({
  creator: NAME,
  title: `${NAME} — Resume`,
  description: "Resume",
  styles: {
    default: {
      document: {
        run: { font: FONT, size: BODY_SIZE, color: DARK },
        paragraph: { spacing: { line: 260 } },
      },
    },
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 }, // A4 in twips (210 × 297 mm)
          margin: { top: 720, bottom: 720, left: 900, right: 900 }, // ~12.5 / 16 mm
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
