# CLAUDE.md — AI Assistant Guide for personal-website

This file provides context and conventions for AI assistants (e.g., Claude Code) working on this repository.

---

## Project Overview

A **vanilla HTML/CSS/JavaScript** single-page portfolio website for Carlos Bejar, deployed on GitHub Pages.

- **Live URL**: https://cbejar93.github.io/personal-website/
- **Repository**: https://github.com/cbejar93/personal-website
- **Stack**: No frameworks, no build tools, no package manager — pure browser-native code

---

## Repository Structure

```
personal-website/
├── index.html          # Entire single-page portfolio (HTML structure + inline JSON-LD)
├── home.js             # All interactive behaviour and animations (~6.8 KB)
├── styles.css          # All visual styles, theming, and animations (~19 KB)
├── files/
│   └── carlos-bejar-resume.pdf   # Downloadable resume asset
└── README.md           # Project overview and setup instructions
```

There is **no build step**. Open `index.html` directly in a browser for local development.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic tags, Schema.org JSON-LD, OpenGraph meta) |
| Styles | CSS3 (custom properties, Flexbox, Grid, keyframe animations) |
| Logic | Vanilla ES6+ JavaScript |
| Icons | Font Awesome v6, Devicons, Simple Icons (all via CDN) |
| Fonts | Google Fonts — Inter |
| Hosting | GitHub Pages (branch: `master`) |

No transpilation, bundling, or dependency installation is required.

---

## Key Source File Details

### `index.html`
- **Single page** with collapsible sections: About Me, Experience, Projects, Contact
- Hero section contains a canvas-based animated star field
- Avatar displays initials "CB" with a conic-gradient border
- Floating Action Button (FAB) for resume download
- Structured data via `<script type="application/ld+json">` (Schema.org `Person`)
- All section toggles use `aria-expanded` and `aria-controls` for accessibility

### `home.js`
Key functions (all in global scope, executed on `DOMContentLoaded`):

| Function | Purpose |
|----------|---------|
| `toggleDarkMode()` | Switches theme class and persists to `localStorage` |
| `applyTheme(theme)` | Applies `.dark-mode` class, updates sun/moon icon |
| `typeWriter()` | Animates tagline character-by-character |
| `initStarField()` | Canvas starfield with twinkling; respects `prefers-reduced-motion` |
| `showToast(msg)` | Displays a temporary toast notification |
| Collapsible toggles | `querySelectorAll('.collapsible-header')` with smooth height transitions |
| Email clipboard | Click `.contact-card` email element to copy, triggers toast |
| Scroll reveal | `IntersectionObserver` fades in sections as they enter the viewport |

### `styles.css`
- **CSS variables** defined on `:root` for theming — always use variables, never hardcode colours
- Dark mode via `.dark-mode` class on `<body>` (toggled by JS)
- Mobile breakpoints: `max-width: 600px` (mobile), `min-width: 768px` (tablet+)
- Animations respect `@media (prefers-reduced-motion: reduce)`

**Core CSS variables:**
```css
--bg-light: #f9fafb
--bg-dark:  #111827
--primary:  #fb923c   /* orange accent */
--button:   #4169e1   /* royal blue */
```

---

## Development Conventions

### HTML
- Use semantic HTML5 elements (`<header>`, `<section>`, `<footer>`, `<article>`)
- Maintain heading hierarchy: `h1` → `h2` → `h3` → `h4` — never skip levels
- All interactive elements must have `aria-label` or associated label text
- Keep SEO meta tags and JSON-LD structured data up to date when content changes

### CSS
- Always use CSS custom properties (`var(--...)`) for colours, never hardcode hex values
- Prefer `rem` units for spacing and font sizes
- Follow existing class-naming style: lowercase, hyphenated (`.skill-card`, `.contact-card`)
- New animations must include a `prefers-reduced-motion` override
- Add dark-mode styles under `.dark-mode` selector when adding new themed elements

### JavaScript
- Vanilla ES6+ only — no libraries, no imports, no `npm`
- Initialise everything inside or after `DOMContentLoaded`
- Use `localStorage` for any user preference persistence
- Use `IntersectionObserver` (not scroll events) for scroll-triggered behaviour
- Avoid blocking the main thread; keep animations on `requestAnimationFrame` or CSS

### Accessibility
- All interactive elements must be keyboard-navigable (focus rings are defined in CSS)
- Respect `prefers-reduced-motion` — skip or simplify animations when set
- Do not remove `aria-expanded` / `aria-controls` from collapsible sections

---

## Git & Branching Workflow

- **Deployment branch**: `master` (auto-deployed to GitHub Pages)
- **Development**: feature branches following the convention `claude/<feature-name>-<uuid>`
- **Commit style**: Conventional Commits — `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`
- **Workflow**: branch → commit → push → open PR → merge to `master`
- **Never push directly to `master`** — always go through a PR

Example branch names from history:
```
claude/hero-layout-polish-abc123
claude/dark-mode-fix-xyz789
```

---

## Content Reference

### Professional Experience
- **Cisco** (2022–Present) — Software Engineer: distributed systems, modernisation, migration
- **Infosys** (2019–2022) — Software Engineer: document systems, backend services, dashboards

### Featured Projects
- **AstroLounge** — Full-stack social app (NestJS, React, TypeScript, PostgreSQL, Supabase) — astrolounge.net
- **Personal Portfolio** — This site (HTML, CSS, JavaScript)

### Skill Categories (used in About section)
- **Frontend**: JavaScript, TypeScript, Angular, React, Vue
- **Backend**: Node.js, Java, OracleDB, MongoDB, PLSQL
- **Infrastructure**: OpenShift, GitHub, Docker, Jenkins, Spinnaker

---

## What There Is No Setup For

- **No package.json / npm** — do not run `npm install`
- **No build tool** — do not run `npm run build` or `vite build`
- **No test framework** — testing is manual (open in browser, test responsiveness)
- **No linter config** — follow existing code style by inspection
- **No CI/CD config file** — GitHub Pages deployment is handled by GitHub automatically from `master`

---

## Common Tasks

### Add a new skill
1. In `index.html`, find the appropriate skill category under the About section
2. Add a `<div class="skill-card">` following the existing pattern (icon + label)
3. No JS or CSS changes required for standard skill cards

### Add a new project
1. In `index.html`, find the `#projects` section
2. Duplicate an existing `.project-card` block and update its content
3. If it is a featured project, include the `.featured-badge` element

### Add a new section
1. Add the HTML `<section>` with a `.collapsible-header` and `.collapsible-content` structure
2. The existing JS event listener on `.collapsible-header` will pick it up automatically
3. Add any section-specific styles to `styles.css` following existing patterns

### Update resume
Replace `files/carlos-bejar-resume.pdf` — the filename is hardcoded in the FAB link in `index.html`

### Change colour scheme
Update the CSS custom properties in the `:root` block and `.dark-mode` block of `styles.css`
