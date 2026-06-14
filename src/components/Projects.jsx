import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText from './AnimatedText'
import Magnetic from './Magnetic'

gsap.registerPlugin(ScrollTrigger)

const Arrow = () => <span className="arr">↗</span>

const PROJECTS = [
  {
    id: '01',
    name: 'BogiAgent',
    mark: 'B/',
    tagline: "A personal AI agent — my “Life OS”.",
    desc: '~13k lines of Python: an LLM agent with 25+ tools, hybrid RAG over my course materials, long-term memory and a safety-first architecture — approval queues, sandboxing and prompt-injection defense. Telegram, CLI and a web dashboard.',
    tags: ['Python', 'Pydantic AI', 'LiteLLM', 'pgvector RAG', 'FastAPI', 'Playwright'],
    links: [
      { label: 'Live demo', href: 'https://randomzname.github.io/life-os/', solid: true },
      { label: 'Code', href: 'https://github.com/randomZname/life-os' },
    ],
  },
  {
    id: '02',
    name: 'Lumora',
    mark: 'L/',
    tagline: 'AI video generation SaaS.',
    desc: 'Turns images and text prompts into short cinematic clips in about 30 seconds. I built the full product — generation pipeline, multiple style presets, auth and Stripe billing with free and paid tiers.',
    tags: ['Next.js 14', 'TypeScript', 'Prisma', 'fal.ai', 'Stripe'],
    links: [
      { label: 'Live site', href: 'https://lumora-delta-lyart.vercel.app/', solid: true },
      { label: 'Code', href: 'https://github.com/randomZname/lumora' },
    ],
  },
  {
    id: '03',
    name: 'AlterMed',
    mark: 'A/',
    tagline: 'Multilingual clinic platform.',
    desc: 'A production website for a medical practice — fully multilingual (EN/BG), a service catalog and a structured booking flow with payment integration. Built for performance and SEO.',
    tags: ['Next.js 16', 'Tailwind v4', 'i18n', 'Booking', 'Payments'],
    links: [
      { label: 'Live site', href: 'https://altermed-bay.vercel.app/en', solid: true },
      { label: 'Code', href: 'https://github.com/randomZname/altermed' },
    ],
  },
]

export default function Projects() {
  const root = useRef(null)

  useGSAP(() => {
    gsap.utils.toArray('.project').forEach((p) => {
      gsap.from(p.querySelectorAll('.project__index, .project__title, .project__tagline, .project__desc, .project__tags, .project__links'), {
        opacity: 0, y: 36, duration: 0.85, ease: 'power3.out', stagger: 0.07,
        scrollTrigger: { trigger: p, start: 'top 78%' },
      })
      gsap.from(p.querySelector('.project__media'), {
        opacity: 0, scale: 0.94, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: p, start: 'top 78%' },
      })
      gsap.to(p.querySelector('.project__mark'), {
        yPercent: -18, ease: 'none',
        scrollTrigger: { trigger: p, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    })
  }, { scope: root })

  return (
    <section id="work" className="projects wrap" ref={root}>
      <div className="projects__head">
        <span className="eyebrow">Selected work</span>
        <AnimatedText as="h2" text="Things I've shipped." />
      </div>

      {PROJECTS.map((p) => (
        <article className="project" key={p.id}>
          <div className="project__media" data-cursor="hover">
            <div className="project__media-glow" />
            <div className="project__media-inner">
              <span className="project__mark" style={{ color: 'var(--accent)' }}>{p.mark}</span>
            </div>
          </div>
          <div className="project__info">
            <div className="project__index">{p.id} — Project</div>
            <h3 className="project__title">{p.name}</h3>
            <p className="project__tagline">{p.tagline}</p>
            <p className="project__desc">{p.desc}</p>
            <div className="project__tags">
              {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
            </div>
            <div className="project__links">
              {p.links.map((l) => (
                <Magnetic key={l.label} strength={0.3}>
                  <a className={`btn ${l.solid ? 'btn--solid' : 'btn--ghost'}`} href={l.href} target="_blank" rel="noopener" data-cursor="hover">
                    {l.label} <Arrow />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
