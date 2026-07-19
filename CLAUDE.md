# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Vite dev server with HMR
npm run build     # Production build to dist/
npm run preview   # Serve the built dist/ locally
npm run lint      # ESLint over the repo
```

There is no test runner configured.

## Architecture

Single-page React 19 + Vite portfolio site. There is one route (`/`) rendering one page (`Home`) composed of section components. React Router is used for its layout/provider structure, not for multiple pages.

**Rendering chain:** `main.jsx` → `RouterProvider` (`src/Routes/Routes.jsx`) → `Main` layout (`src/Layout/Main.jsx`) → `Home` (`src/pages/Home/Home/Home.jsx`).

- `Main.jsx` wraps every page with `Navbar`, an `<Outlet/>`, `Footer`, and the always-mounted `PortfolioChatbot`.
- `Home.jsx` is the whole visible site: it renders the section components in order (Hero, AboutMe, Experience, Projects, Research, Skills, Education, Contact).

**Content is data-driven.** All copy — bio, experience, education, skills, projects, research, socials, nav links — lives in `src/data/portfolio.js` as named exports. Section components import from it and render; they hold layout/markup, not content. To change what the site says, edit `portfolio.js`, not the components. (The chatbot's `PROFILE_CONTEXT` in `PortfolioChatbot.jsx` is a separate hardcoded copy — update it too when facts change.)

**Navigation is hash-anchor scrolling, not routing.** `navLinks` in `portfolio.js` point to `#about`, `#experience`, etc. Each section component sets the matching `id` on its root element (`id='about'`, `id="projects"`, `id='research'`, ...). The Hero uses `id='top'`. If you add or rename a section, keep the `navLinks` href and the section's `id` in sync.

## Styling & theming

Tailwind CSS 3 (`darkMode: 'class'`) plus a hand-written design system in `src/index.css`. The design system defines CSS custom properties (`--bg`, `--text`, `--accent`, `--border`, `--radius`, ...) under `:root` and overrides them under `.dark`, then exposes reusable component classes (`.btn`, `.btn-primary`, `.card`, `.eyebrow`, `.tag`, `.timeline`, `.container-page`, `.input`, `.chatbot-*`, etc.). Prefer these tokens/classes for anything themed rather than hardcoding colors, so light/dark stays consistent.

**Dark mode** is applied via the `dark` class on `<html>`:

- An inline no-flash script in `index.html` reads `localStorage.theme` (falling back to `prefers-color-scheme`) and sets the class _before_ React mounts.
- `src/hooks/useTheme.js` reads that initial class, then owns toggling and persisting `theme` to `localStorage`.

## SEO

SEO metadata lives entirely in `index.html` (title, description, Open Graph, Twitter card, JSON-LD Person schema, theme-color). Note `src/pages/Components/SEO/SEO.jsx` is fully commented-out dead code (an old react-helmet approach) — do not treat it as active.

## Chatbot & environment

`PortfolioChatbot.jsx` calls the OpenRouter chat completions API directly from the browser. It reads Vite env vars (`import.meta.env.VITE_*`) — see `.env.example` for the keys (`VITE_OPENROUTER_API_KEY`, `VITE_OPENROUTER_MODEL`, etc.). Because these are `VITE_`-prefixed, they are bundled into the client and publicly visible; do not put secrets that must stay private here. The component has a `FALLBACK_MODELS` list it retries through if the primary model fails.

## Deployment

Primary target is Vercel (canonical URL `https://tanvir-sifat.vercel.app/`). The repo also ships helper scripts and configs for VPS/cPanel/IIS deploys: `deploy.sh`, `vps-setup.sh`, `nginx.conf`, and `DEPLOYMENT_GUIDE.md` / `DEPLOYMENT_README.md`.

## Conventions

- Components are `.jsx`, one component per folder under `src/pages/Components/<Section>/`, default-exported. Reusable presentational pieces (`SectionHeader`, `SocialLinks`, `Tag`, `ProjectCard`) live in `src/components/ui/`.
- ESLint (`eslint.config.js`) treats unused vars as errors but ignores identifiers matching `^[A-Z_]` (constants/components).
- Icons come from `lucide-react`; animation from `motion` (imported as `motion/react`). Shared fade-up-on-scroll presets live in `src/lib/motion.js` (`fadeUp`, `fadeUpDelay`, `viewportOnce`) — reuse them instead of re-declaring inline variants, so timing/easing stays consistent.
