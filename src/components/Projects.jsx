import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText from './AnimatedText'
import Magnetic from './Magnetic'
import { projects } from '../data/content'
import { prefersReduced } from '../lib/motion'
import '../styles/projects.css'

gsap.registerPlugin(ScrollTrigger)

const Arrow = () => <span className="arr">↗</span>

function Media({ image, name, live, liveLabel }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
    gsap.to(el, {
      rotateY: (px - 0.5) * 9,
      rotateX: (0.5 - py) * 9,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000,
      overwrite: 'auto',
    })
  }
  const onLeave = () => gsap.to(ref.current, { rotateY: 0, rotateX: 0, duration: 0.7, ease: 'power3.out' })

  return (
    <a
      ref={ref}
      className="project__media"
      href={live}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="hover"
      aria-label={`${name} — view live`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <span className="project__border" aria-hidden="true" />
      <div className="project__media-inner">
        <img className="project__img" src={image} alt={`${name} screenshot`} loading="lazy" />
        <span className="project__spotlight" aria-hidden="true" />
      </div>
      <span className="project__view">{liveLabel || 'View live'} <span className="arr">↗</span></span>
    </a>
  )
}

export default function Projects() {
  const root = useRef(null)

  useGSAP(() => {
    if (prefersReduced()) return
    gsap.utils.toArray('.project').forEach((p) => {
      gsap.from(
        p.querySelectorAll('.project__index, .project__title, .project__tagline, .project__desc, .project__tags, .project__links'),
        {
          opacity: 0, y: 36, duration: 0.85, ease: 'power3.out', stagger: 0.07,
          scrollTrigger: { trigger: p, start: 'top 78%' },
        },
      )
      gsap.from(p.querySelector('.project__media'), {
        opacity: 0, scale: 0.94, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: p, start: 'top 78%' },
      })
      gsap.to(p.querySelector('.project__img'), {
        yPercent: -8, ease: 'none',
        scrollTrigger: { trigger: p, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    })
  }, { scope: root })

  return (
    <section id="work" className="projects wrap" ref={root}>
      <div className="projects__head">
        <span className="eyebrow">{projects.eyebrow}</span>
        <AnimatedText as="h2" className="projects__heading" text={projects.heading} />
      </div>

      {projects.items.map((p) => (
        <article className="project" key={p.id}>
          <Media image={p.image} name={p.name} live={p.live} liveLabel={p.liveLabel} />
          <div className="project__info">
            <div className="project__index">{p.id} — Project</div>
            <h3 className="project__title">{p.name}</h3>
            <p className="project__tagline">{p.tagline}</p>
            <p className="project__desc">{p.desc}</p>
            <div className="project__tags">
              {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
            </div>
            <div className="project__links">
              <Magnetic strength={0.3}>
                <a className="btn btn--solid" href={p.live} target="_blank" rel="noopener noreferrer" data-cursor="hover">
                  {p.liveLabel} <Arrow />
                </a>
              </Magnetic>
              <Magnetic strength={0.3}>
                <a className="btn btn--ghost" href={p.code} target="_blank" rel="noopener noreferrer" data-cursor="hover">
                  Code <Arrow />
                </a>
              </Magnetic>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
