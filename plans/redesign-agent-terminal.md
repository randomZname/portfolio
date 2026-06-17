# Portfolio Redesign — "Agent Terminal" direction

## Goal
Rebuild the existing portfolio (Vite + React + GSAP + Lenis) into the **Agent Terminal**
design direction with **confident copy** that signals Bogdan builds **custom AI agents,
web apps and automations end-to-end**. Keep it dark, premium, heavily animated. Replace
placeholder letter-marks with **real screenshots** of his shipped sites.

Live target: https://bogdan-stefanov.vercel.app (Vercel, already linked).

## Why
Current site is "clean but not wow" and under-sells him. New version must read as:
an **operator who builds** — founder + self-taught engineer who ships products, learns
fast, and can be hired or partnered with.

## Acceptance criteria
- [ ] `npm run build` passes with no errors; bundle reasonable.
- [ ] Dev server renders with **no console errors** (verified via puppeteer in `.shot/`).
- [ ] Preloader → hero handoff smooth, **no double-flash** of the name.
- [ ] Hero = animated terminal (typing + tool-call lines + capability chips) beside the big name.
- [ ] New **"What I build"** section: AI Agents / Web Apps & SaaS / Automations.
- [ ] Projects show **real screenshots** (`/projects/*.png`), with hover spotlight + tilt + "View live" + correct live/code links.
- [ ] Copy is confident throughout (see CONTENT below). No weak "I sold things" phrasing.
- [ ] Stats reframed with business + technical metrics.
- [ ] Smooth scroll (Lenis), scroll reveals, custom cursor, magnetic buttons all work.
- [ ] Responsive down to mobile (terminal stacks above name; grids collapse).
- [ ] Résumé link works (`/cv/Bogdan_Stefanov_CV_EN.pdf`).

## Section order (App.jsx — LEAD owns)
1. Preloader → 2. Cursor → 3. Nav → 4. Hero (terminal) → 5. Marquee →
6. Services ("What I build") → 7. Stats → 8. Journey (operator story) →
9. Projects (real screenshots) → 10. Contact + footer.

## Architecture / ownership (NO two agents edit the same file)

**LEAD (me) owns:** `src/main.jsx`, `src/App.jsx`, `index.html`,
`src/styles/tokens.css` (design tokens + base reset, imported once in main.jsx),
`src/data/content.js` (all copy + project data). Deploy + integration.

**Agent A — `shell`** owns:
`src/components/Preloader.jsx` (+`src/styles/preloader.css`),
`src/components/Nav.jsx` (+`nav.css`),
`src/components/Cursor.jsx`,
`src/components/Hero.jsx` (+`hero.css`) — the terminal hero,
`src/components/Magnetic.jsx`,
`src/components/AnimatedText.jsx`.

**Agent B — `story`** owns:
`src/components/Marquee.jsx` (+`marquee.css`),
`src/components/Services.jsx` NEW (+`services.css`),
`src/components/Stats.jsx` (+`stats.css`),
`src/components/Journey.jsx` (+`journey.css`).

**Agent C — `work`** owns:
`src/components/Projects.jsx` (+`projects.css`),
`src/components/Contact.jsx` (+`contact.css`).

**Off-limits to all agents:** `index.html`, `App.jsx`, `main.jsx`, `tokens.css`,
`content.js`, `.env*`, `public/cv/*`, `.shot/`, `vercel`/deploy. Read them, never write.

## Shared contract

### CSS tokens (defined in `src/styles/tokens.css`, already created by lead)
Use these CSS variables; do NOT hardcode hex. Each component imports its OWN css file
(e.g. `import '../styles/hero.css'`). tokens.css is global (imported in main.jsx).
Key vars: `--bg`, `--bg-soft`, `--bg-card`, `--text`, `--muted`, `--muted-2`,
`--accent` (#c6f432), `--accent-dim`, `--line`, `--line-soft`,
`--font-display` (Space Grotesk), `--font-body` (Inter), `--font-mono` (JetBrains Mono),
`--pad`, `--maxw`, `--ease`. Class helpers: `.wrap` (max-width container), `.eyebrow`.

### Content (import from `src/data/content.js`, created by lead)
All copy lives there: `hero`, `services`, `stats`, `journey`, `projects`, `contact`,
`marquee`, `nav`. Components READ from it; do not invent copy. Project images are at
`/projects/bogiagent.png`, `/projects/lumora.png`, `/projects/altermed.png`.

### Component contracts (props the LEAD will pass in App.jsx)
- `<Preloader onDone={fn} />` — calls `onDone()` as the curtain lifts (overlap).
- `<Hero play={bool} />` — runs intro timeline when `play` is true; inner hidden until then (no flash).
- `<Cursor />`, `<Nav />`, `<Marquee />`, `<Services />`, `<Stats />`, `<Journey />`,
  `<Projects />`, `<Contact />` — no required props (read content.js).
- `<Magnetic strength={num}>{children}</Magnetic>` — unchanged API.
- `<AnimatedText as="h2" text="..." />` — word-mask reveal on scroll.

### Animation/runtime conventions
- GSAP via `@gsap/react` `useGSAP`, `gsap`, `gsap/ScrollTrigger`. Register ScrollTrigger
  in each file that uses it. Lenis drives ScrollTrigger from App (lead) — agents just use
  ScrollTrigger normally.
- Respect `prefers-reduced-motion`.
- `data-cursor="hover"` on interactive elements to grow the custom cursor.
- No StrictMode (lead handles), so effects run once.

## CONTENT (confident copy — source of truth)

### Hero terminal (typed sequence)
```
$ whoami
▸ booting bogdan.stefanov ✓
▸ loading capabilities ✓
[ AI Agents ]  [ Web Apps ]  [ Automations ]
I build custom AI agents, apps and automations —
end to end. Idea to shipped.
$ _
```
- Availability pill: "Available — AI roles, freelance & collabs"
- Name: BOGDAN / STEFANOV. (accent dot)
- Role line: "I build custom AI agents, web apps & automations — end to end."

### Services — "What I build"
- **AI Agents** — "Custom LLM agents with tool use, RAG and memory that actually do the work — not demos."
- **Web Apps & SaaS** — "Full-stack products from zero — auth, payments, the whole thing, shipped."
- **Automations** — "Workflows and bots that delete the busywork and run themselves."

### About / Journey (operator story, confident)
Headline: "I build things that ship."
Lead: "Founder, operator and self-taught engineer. I've led teams and run my own business —
now I build AI products end to end. Give me a problem; I'll learn whatever it takes and ship the solution."
Steps (year — title — one confident line):
- 2023 — "Sold & led" — "Closed financial products and led a sales team. Learned to read people and own the number."
- 2024–25 — "Advised on the money" — "Guided clients through financing across banks, start to signed. Trust, numbers, pressure."
- 2024 → — "Built a business" — "Founded a tutoring school — multiple locations, a team I hired and run. Still running it."
- 2024 → — "Now I build AI" — "Self-taught my way to shipping agentic AI, SaaS and automations — alone, end to end."

### Stats
- 2y+ — "Running my own business"
- 3 — "Products shipped & live"
- 13K+ — "Lines of Python in my AI agent"
- 25+ — "Agent tools built"

### Projects (real screenshots)
1. **BogiAgent** — img `/projects/bogiagent.png` — "A personal AI agent that runs my life."
   "13k lines of Python: an LLM agent with 25+ tools, hybrid RAG, long-term memory and a
   safety-first architecture. Telegram, CLI and a web dashboard."
   tags: Python, Pydantic AI, LiteLLM, pgvector RAG, FastAPI, Playwright.
   live: https://randomzname.github.io/life-os/ · code: https://github.com/randomZname/life-os
2. **Lumora** — img `/projects/lumora.png` — "AI video generation, as a product."
   "Turns images and prompts into cinematic clips in ~30s. Full SaaS — pipeline, auth, Stripe billing."
   tags: Next.js 14, TypeScript, Prisma, fal.ai, Stripe.
   live: https://lumora-delta-lyart.vercel.app/ · code: https://github.com/randomZname/lumora
3. **AlterMed** — img `/projects/altermed.png` — "A clinic platform, production-ready."
   "Multilingual medical site — service catalog and a booking flow with payments. Built for speed and SEO."
   tags: Next.js 16, Tailwind v4, i18n, Booking, Payments.
   live: https://altermed-bay.vercel.app/en · code: https://github.com/randomZname/altermed

### Contact
Eyebrow: "Let's build"
Headline: "Let's build something."
Sub: "Got a problem worth solving? I'm open to AI / Agentic / Automation roles, freelance and collabs."
Email: bogdan.mstefanov@gmail.com · Phone: +359 877 772 253
Socials: GitHub (https://github.com/randomZname), LinkedIn
(https://www.linkedin.com/in/bogdan-stefanov-2032802b0), Email, Résumé (/cv/Bogdan_Stefanov_CV_EN.pdf)

### Marquee items
LLM Agents · Tool Use · RAG · Pydantic AI · LiteLLM · Python · TypeScript · Next.js ·
FastAPI · pgvector · Playwright · n8n · Automation · Docker · Stripe · Shipping

### Nav
Logo "Bogdan." · links: Work (#work), Journey (#journey), Contact (#contact),
"Résumé ↗" (/cv/Bogdan_Stefanov_CV_EN.pdf, new tab).

## Validation each agent runs before "done"
1. `npm run build` passes (from `C:\Users\bogda\Documents\Personal CV\portfolio`).
2. Their components import only their own CSS + tokens; no edits outside ownership.
3. No hardcoded colors (use tokens), copy pulled from content.js.
4. Report: files changed, any contract questions, validation result.

## Lead end-to-end validation
- `npm run build`, run preview, puppeteer screenshots of every section (desktop + mobile),
  check console errors, verify links, smooth handoff. Fix via the owning agent. Then deploy
  + re-point alias `bogdan-stefanov.vercel.app`.
