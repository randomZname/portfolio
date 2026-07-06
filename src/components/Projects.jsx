import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Magnetic from './Magnetic'
import { projects } from '../data/content'
import { prefersReduced } from '../lib/motion'
import '../styles/projects.css'

gsap.registerPlugin(ScrollTrigger)

const Arrow = () => <span className="arr">↗</span>

/* Media is a plain link now — no pointer-driven 3D tilt. The reveal + hover
   sheen are handled entirely by CSS/ScrollTrigger; Builder A's cursor picks
   up the "View" label from data-cursor-label. */
function Media({ image, name, live, liveLabel }) {
  return (
    <a
      className="project__media"
      href={live}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="hover"
      data-cursor-label="View"
      aria-label={`${name} — view live`}
    >
      <span className="project__border" aria-hidden="true" />
      <div className="project__media-inner">
        <img className="project__img" src={image} alt={`${name} screenshot`} loading="lazy" />
      </div>
      <span className="project__view">{liveLabel || 'View live'} <Arrow /></span>
    </a>
  )
}

export default function Projects() {
  const root = useRef(null)

  useGSAP(() => {
    if (prefersReduced()) return

    gsap.from('.projects__head > *', {
      opacity: 0, y: 30, duration: 0.9, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: '.projects__head', start: 'top 85%', once: true },
    })

    gsap.utils.toArray('.project').forEach((p) => {
      gsap.from(
        p.querySelectorAll('.project__index, .project__title, .project__tagline, .project__desc, .project__tags, .project__links'),
        {
          opacity: 0, y: 36, duration: 0.85, ease: 'power3.out', stagger: 0.07,
          scrollTrigger: { trigger: p, start: 'top 78%', once: true },
        },
      )

      // clip-path wipe reveal: box grows from a sliver at the top down to full height.
      gsap.fromTo(
        p.querySelector('.project__media-inner'),
        { clipPath: 'inset(0% 0% 100% 0% round 17px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 17px)',
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: p, start: 'top 75%', once: true },
        },
      )

      gsap.to(p.querySelector('.project__img'), {
        yPercent: -8, ease: 'none',
        scrollTrigger: { trigger: p, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    })
  }, { scope: root })

  return (
    <section id="work" className="projects" ref={root}>
      <div className="ribbon projects__ribbon" aria-hidden="true" />

      <div className="wrap">
        <div className="projects__head">
          <span className="eyebrow">{projects.eyebrow}</span>
          <h2 className="projects__heading">
            {projects.heading.pre}
            <em className="em-serif">{projects.heading.em}</em>
            {projects.heading.post}
          </h2>
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
                {p.code && (
                  <Magnetic strength={0.3}>
                    <a className="btn btn--ghost" href={p.code} target="_blank" rel="noopener noreferrer" data-cursor="hover">
                      Code <Arrow />
                    </a>
                  </Magnetic>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
