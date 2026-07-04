// Single source of truth for all portfolio copy + data.
// Components import from here — do not hardcode copy in components.
//
// CONTRACT NOTES (builders — read before consuming):
// - Split headings use { pre, em, post }: render `pre`, then `em` inside
//   <em className="em-serif">, then `post`. Never flatten into one string.
// - Section ids must be: #work, #services, #journey, #contact (palette + nav
//   anchors depend on them).
// - hero.meta.tz feeds the live local-time clock (Intl.DateTimeFormat).

export const nav = {
  logo: 'Bogdan',
  links: [
    { label: 'Work', href: '#work' },
    { label: 'Journey', href: '#journey' },
    { label: 'Contact', href: '#contact' },
    { label: 'Résumé ↗', href: '/cv/Bogdan_Stefanov_CV_EN.pdf', external: true },
  ],
  paletteHint: 'Ctrl K',
}

export const preloader = {
  lines: [
    'initializing signal…',
    'loading weights…',
    'mounting tools…',
    'signal acquired',
  ],
}

export const hero = {
  availability: 'Available — AI roles, freelance & collabs',
  name: ['BOGDAN', 'STEFANOV'],
  role: { pre: 'AI developer who builds agents that ', em: 'ship', post: '.' },
  sub: 'Custom LLM agents, web apps & automations — end to end.',
  meta: {
    coords: 'SOFIA · 42.69°N 23.32°E',
    tz: 'Europe/Sofia',
    available: 'AVAILABLE',
  },
  scrollHint: 'scroll',
}

export const marquee = [
  'LLM Agents', 'Tool Use', 'RAG', 'Whisper', 'Pydantic AI', 'LiteLLM', 'Python',
  'TypeScript', 'Next.js', 'FastAPI', 'pgvector', 'Playwright', 'n8n',
  'Automation', 'Docker', 'Stripe', 'Signal', 'Shipping',
]

export const services = {
  eyebrow: 'What I build',
  heading: 'Three things, shipped end to end.',
  items: [
    { id: '01', title: 'AI Agents', desc: 'Custom LLM agents with tool use, RAG and memory that actually do the work — not demos.' },
    { id: '02', title: 'Web Apps & SaaS', desc: 'Full-stack products from zero — auth, payments, the whole thing, shipped.' },
    { id: '03', title: 'Automations', desc: 'Workflows and bots that delete the busywork and run themselves.' },
  ],
}

export const stats = {
  eyebrow: 'Telemetry',
  items: [
    { value: 2, suffix: 'y+', label: 'Running my own business' },
    { value: 4, suffix: '', label: 'Products shipped & live' },
    { value: 13, suffix: 'K+', label: 'Lines of Python in my AI agent' },
    { value: 25, suffix: '+', label: 'Agent tools built' },
  ],
}

export const journey = {
  eyebrow: 'Who I am',
  heading: { pre: 'I build things that ', em: 'ship', post: '.' },
  lead: "Founder, operator and self-taught engineer. I've led teams and run my own business — now I build AI products end to end. Give me a problem; I'll learn whatever it takes and ship the solution.",
  steps: [
    { year: '2023', title: 'Sold & led', desc: 'Closed financial products and led a sales team. Learned to read people and own the number.' },
    { year: '2024–25', title: 'Advised on the money', desc: 'Guided clients through financing across banks, start to signed. Trust, numbers, pressure.' },
    { year: '2024 →', title: 'Built a business', desc: 'Founded a tutoring school — multiple locations, a team I hired and run. Still running it.' },
    { year: '2024 →', title: 'Now I build AI', desc: 'Self-taught my way to shipping agentic AI, SaaS and automations — alone, end to end.' },
  ],
}

export const projects = {
  eyebrow: 'Selected work',
  heading: { pre: 'Things I have ', em: 'shipped', post: '.' },
  items: [
    {
      id: '01',
      name: 'BogiAgent',
      image: '/projects/bogiagent.jpg',
      tagline: 'A personal AI agent that runs my life.',
      desc: '13k lines of Python: an LLM agent with 25+ tools, hybrid RAG, long-term memory and a safety-first architecture. Telegram, CLI and a web dashboard.',
      tags: ['Python', 'Pydantic AI', 'LiteLLM', 'pgvector RAG', 'FastAPI', 'Playwright'],
      live: 'https://randomzname.github.io/life-os/',
      code: 'https://github.com/randomZname/life-os',
      liveLabel: 'Live demo',
    },
    {
      id: '02',
      name: 'Lumora',
      image: '/projects/lumora.jpg',
      tagline: 'AI video generation, as a product.',
      desc: 'Turns images and prompts into cinematic clips in ~30s. Full SaaS — generation pipeline, auth and Stripe billing.',
      tags: ['Next.js 14', 'TypeScript', 'Prisma', 'fal.ai', 'Stripe'],
      live: 'https://lumora-delta-lyart.vercel.app/',
      code: 'https://github.com/randomZname/lumora',
      liveLabel: 'Live site',
    },
    {
      id: '03',
      name: 'Watchless',
      image: '/projects/watchless.jpg',
      tagline: 'YouTube content intelligence, without the watching.',
      desc: 'A pipeline that watches so I don\'t have to: transcripts → LLM knowledge cards → canonical dedupe → RAG answers with citations → cross-video synthesis reports.',
      tags: ['Python', 'FastAPI', 'Whisper', 'RAG', 'SQLite', 'LLM pipeline'],
      live: 'https://yt-signal-desk.vercel.app',
      code: 'https://github.com/randomZname/watchless',
      liveLabel: 'Live demo',
    },
    {
      id: '04',
      name: 'AlterMed',
      image: '/projects/altermed.jpg',
      tagline: 'A clinic platform, production-ready.',
      desc: 'Multilingual medical site — service catalog and a booking flow with payments. Built for speed and SEO.',
      tags: ['Next.js 16', 'Tailwind v4', 'i18n', 'Booking', 'Payments'],
      live: 'https://altermed-bay.vercel.app/en',
      code: 'https://github.com/randomZname/altermed',
      liveLabel: 'Live site',
    },
  ],
}

export const contact = {
  eyebrow: "Let's build",
  heading: { pre: "Let's build ", em: 'something', post: '.' },
  sub: "Got a problem worth solving? I'm open to AI / Agentic / Automation roles, freelance and collabs.",
  email: 'bogdan.mstefanov@gmail.com',
  phone: '+359 877 772 253',
  location: 'Sofia, Bulgaria',
  tz: 'Europe/Sofia',
  socials: [
    { label: 'GitHub', href: 'https://github.com/randomZname' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bogdan-stefanov-2032802b0' },
    { label: 'Email', href: 'mailto:bogdan.mstefanov@gmail.com' },
    { label: 'Résumé', href: '/cv/Bogdan_Stefanov_CV_EN.pdf' },
  ],
}

// Command palette (Ctrl+K / '/'). external: true → target _blank.
export const palette = {
  placeholder: 'Where to?',
  groups: [
    {
      label: 'Navigate',
      items: [
        { label: 'Work', href: '#work' },
        { label: 'What I build', href: '#services' },
        { label: 'Journey', href: '#journey' },
        { label: 'Contact', href: '#contact' },
      ],
    },
    {
      label: 'Links',
      items: [
        { label: 'GitHub', href: 'https://github.com/randomZname', external: true },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bogdan-stefanov-2032802b0', external: true },
        { label: 'Résumé', href: '/cv/Bogdan_Stefanov_CV_EN.pdf', external: true },
        { label: 'Email', href: 'mailto:bogdan.mstefanov@gmail.com', external: true },
      ],
    },
  ],
}
