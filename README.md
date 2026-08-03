# Tanvir Ahmmed Sifat — Portfolio

A modern, fully responsive personal portfolio built with **React 19**, **Vite**, and **Tailwind CSS**. It showcases my work as a **Frontend-focused Full-Stack Developer** — from production Angular/Next.js apps to full-stack React projects — along with my education, experience, and AI/ML research interests.

Live site: _add your deployed URL here_

---

## About Me

Hi, I'm **Tanvir Ahmmed Sifat** (Sifat) — a Full-Stack Developer based in Bangladesh 🇧🇩.

I'm a frontend-focused full-stack developer with hands-on experience building and deploying production web applications using **Angular**, **React**, and **Next.js**. I've contributed to real products shipped on **IIS Server**, collaborated across API boundaries, and owned UI from component design through deployment.

My technical range spans the full JavaScript ecosystem — from Tailwind-based component systems and REST API integration on the client side, to **Express.js** servers and **MongoDB/MySQL** databases on the backend. I'm also pursuing my **M.Sc. in ICT** with a research focus on applied AI and machine learning using **Python** and **TensorFlow**.

- **Role:** Full-Stack Developer
- **Location:** Bangladesh
- **Email:** sifatict26@gmail.com
- **Phone / WhatsApp:** +880 1521 565 259
- **Availability:** Open to freelance & full-time roles

---

## Highlights

- **Frontend Engineering** — Production experience with Angular, React, and Next.js. Strong focus on component architecture, responsive design, and clean, maintainable code.
- **Full-Stack Capability** — End-to-end development with Node.js, Express.js, MongoDB, and MySQL. Comfortable across the entire request lifecycle.
- **AI & ML Research** — Actively exploring deep learning applications using Python and TensorFlow as part of graduate research.

**Quick stats:** 5+ Projects Shipped · 1+ Year Professional Experience · 12+ Technologies

---

## Tech Stack

**Frontend**
- React · Next.js · Angular · Tailwind CSS · Bootstrap

**Backend**
- Node.js · Express.js · MongoDB · MySQL

**Deployment**
- Vercel · cPanel · IIS Server

**AI / ML**
- Python · TensorFlow

---

## Experience

### Frontend Developer — Universal Technology Research and Development Limited (UTRD Ltd.)
_Bangladesh · Present_

Built and maintained production web applications using Angular and Next.js. Led frontend UI development, integrated REST APIs, and managed deployment pipelines to IIS Server environments.

- Developed responsive, component-driven UIs using Angular and Next.js
- Built and maintained reusable component libraries for production-grade applications
- Integrated RESTful APIs, managing data fetching, error states, and loading patterns
- Deployed and configured frontend applications on IIS Server infrastructure
- Collaborated directly with backend developers to align on API contracts and architecture

**Tech:** Angular · Next.js · IIS Server · REST APIs

---

## Education

- **M.Sc. Engineering, Information & Communication Technology** — Mawlana Bhashani Science & Technology University (2025 — Present)
  Graduate research in advanced computing, machine learning, and applied AI.
- **B.Sc. Engineering, Information & Communication Technology** — Mawlana Bhashani Science & Technology University (2020 — 2025)
  Software engineering, data structures, algorithms, databases, and web technologies.
- **Higher Secondary Certificate, Science** — Major General Mahmudul Hasan Adarsha College, Tangail (2017 — 2019) · GPA 4.83 / 5.00
- **Secondary School Certificate, Science** — Adi Tangail High School, Tangail (2017) · GPA 5.00 / 5.00 

---

## Featured Projects

### 1. BlogNest — Full-Stack Blogging Platform
A community-driven blogging platform with rich content management, nested comments, and a trending-blogs algorithm.

- **Tech:** React · Node.js · Express · MongoDB · Firebase
- **Features:** Rich-text editor · Wishlist · Nested comments · Search & tag filters · Top 10 trending blogs · Google OAuth
- **Live:** https://blognest-d41ff.web.app/
- **Client:** https://github.com/sifat26/BlogNest_Client
- **Server:** https://github.com/sifat26/BlogNest_Project_Server_Side

### 2. Woven Earth — Handcrafted Textile Marketplace
An elegant, purpose-built platform for independent textile artists to showcase and sell handcrafted work.

- **Tech:** React · Firebase · MongoDB · Express · Tailwind CSS
- **Features:** Rotating banner · Category discovery · Artist submission portal · Authenticated collection management · Accessible gallery
- **Live:** https://art-and-craft-b1839.web.app/
- **Client:** https://github.com/sifat26/Woven-earth-client
- **Server:** https://github.com/sifat26/Woven-earth-server

### 3. RoyalStays — Hospitality Portal
A visually rich property listing and exploration portal for travelers, with multi-provider auth and smooth animations.

- **Tech:** React · Firebase · Tailwind CSS · Node.js
- **Features:** Fully responsive · Google & GitHub auth · Interactive property details · Virtual galleries · AOS scroll animations
- **Live:** https://real-state-hospitality.web.app/
- **Client:** https://github.com/sifat26/A9-RoyalStays

---

## Portfolio Website — Under the Hood

This portfolio itself is a showcase of my frontend engineering approach.

### Tech Stack
- **Framework:** React 19 + Vite 7
- **Routing:** React Router DOM 7
- **Styling:** Tailwind CSS 3 · custom fonts (Manrope, Mulish)
- **Animation:** Motion (Framer Motion successor) · React Simple Typewriter
- **Icons:** Lucide React · React Icons
- **UX:** React Toastify · custom Portfolio Chatbot

### Structure

```
src/
├── Layout/            # Main app layout (Navbar + Outlet + Footer)
├── Routes/            # React Router configuration
├── data/
│   └── portfolio.js   # Single source of truth for all portfolio content
└── pages/
    ├── Home/          # Landing page composition
    ├── Components/    # Section components
    │   ├── AboutMe/
    │   ├── ExperienceSection/
    │   ├── EducationSection/
    │   ├── ProjectsSection/
    │   ├── ContactSection/
    │   ├── Chatbot/
    │   └── SEO/
    └── Shared/        # Navbar & Footer
```

All content (bio, experience, education, projects, tech stack, socials) is centralized in [portfolio.js](file:///g:/Portfolio/sifat-portfolio/src/data/portfolio.js) — edit one file to update the entire site.

### Features
- Fully responsive, mobile-first design
- Smooth motion-based animations and typewriter hero
- SEO-optimized with a dedicated SEO component
- Built-in portfolio chatbot for interactive Q&A
- Clean, data-driven architecture

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server (Vite HMR)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint
npm run lint
```

### Environment
Copy `.env.example` to `.env` and configure any required keys.

---

## Deployment

Ready-to-use deployment resources are included:

- [DEPLOYMENT_GUIDE.md](file:///g:/Portfolio/sifat-portfolio/DEPLOYMENT_GUIDE.md) — full VPS/cPanel/Vercel guide
- [DEPLOYMENT_README.md](file:///g:/Portfolio/sifat-portfolio/DEPLOYMENT_README.md) — quick reference
- [nginx.conf](file:///g:/Portfolio/sifat-portfolio/nginx.conf) — sample Nginx config
- [deploy.sh](file:///g:/Portfolio/sifat-portfolio/deploy.sh) — one-shot deploy script
- [vps-setup.sh](file:///g:/Portfolio/sifat-portfolio/vps-setup.sh) — VPS bootstrap script

Supported targets: **Vercel**, **cPanel**, and **IIS Server**.

---

## Connect With Me

- **GitHub:** https://github.com/sifat26
- **LinkedIn:** https://linkedin.com/in/sifat26
- **Twitter / X:** https://x.com/tanvirahmmedsi2
- **Facebook:** https://www.facebook.com/sifat.7847/
- **Instagram:** https://www.instagram.com/tanvir_ahmmed_sifat/
- **Email:** sifatict26@gmail.com
- **WhatsApp:** https://wa.me/8801521565259

---

_Built with React, Vite, and Tailwind CSS — designed and developed by Tanvir Ahmmed Sifat._
