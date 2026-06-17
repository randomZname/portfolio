import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { hero } from '../data/content'
import '../styles/hero.css'

/* Emphasise capability keywords in the role line without hardcoding the copy:
   wrap any of these phrases (if present in content) in a strong tag. */
const ROLE_EMPHASIS = ['AI agents', 'web apps', 'automations', 'end to end']
function renderRole(text) {
  const pattern = new RegExp(`(${ROLE_EMPHASIS.join('|')})`, 'gi')
  return String(text)
    .split(pattern)
    .filter((part) => part !== '')
    .map((part, i) =>
      ROLE_EMPHASIS.some((p) => p.toLowerCase() === part.toLowerCase())
        ? <strong key={i}>{part}</strong>
        : <span key={i}>{part}</span>
    )
}

/* Agent-Terminal hero. Left = fake terminal that types its lines in; right =
   big name block. Everything inside .hero__inner is visibility:hidden until
   `play` flips true, so nothing flashes behind the preloader; then a single
   intro timeline runs as the curtain lifts. Respects reduced motion. */
export default function Hero({ play }) {
  const root = useRef(null)

  useGSAP(() => {
    if (!play) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lines = gsap.utils.toArray('.hero__line-item')

    // Always make the content visible first.
    gsap.set('.hero__inner', { visibility: 'visible' })

    if (reduce) {
      gsap.set(['.hero__name-line > span', '.hero__avail', '.hero__role', '.hero__terminal'], {
        clearProps: 'all',
        opacity: 1,
        yPercent: 0,
      })
      gsap.set(lines, { opacity: 1 })
      return
    }

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    // Name lines rise out of their masks.
    tl.from('.hero__name-line > span', { yPercent: 115, duration: 1.1, stagger: 0.12 })
      .from('.hero__avail', { opacity: 0, y: 18, duration: 0.7 }, '-=0.85')
      .from('.hero__role', { opacity: 0, y: 24, duration: 0.9 }, '-=0.6')
      // Terminal panel fades up alongside the name.
      .from('.hero__terminal', { opacity: 0, y: 30, duration: 0.9 }, '-=1.0')

    // Then the terminal lines type/reveal in sequence.
    tl.to(lines, {
      opacity: 1,
      duration: 0.01,
      stagger: 0.32,
      ease: 'none',
    }, '-=0.4')

    // Per-line typewriter: a left-to-right clip reveal (works with wrapping).
    lines.forEach((line, i) => {
      const type = line.querySelector('.hero__type')
      if (type) {
        tl.fromTo(
          type,
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'steps(20)' },
          0.45 + i * 0.32
        )
      }
    })
  }, { dependencies: [play], scope: root })

  return (
    <section id="top" className="hero" ref={root}>
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__inner wrap">
        {/* LEFT — terminal */}
        <div className="hero__terminal" data-cursor="hover">
          <div className="hero__bar">
            <span className="hero__dots" aria-hidden="true">
              <i /><i /><i />
            </span>
            <span className="hero__title-mono">{hero.terminalTitle}</span>
          </div>

          <div className="hero__body">
            {hero.terminal.map((line, i) => {
              if (line.type === 'chips') {
                return (
                  <div className="hero__line-item hero__chips" key={i}>
                    {line.items.map((chip) => (
                      <span className="hero__chip" key={chip}>{chip}</span>
                    ))}
                  </div>
                )
              }
              const cls =
                line.type === 'cmd' ? 'hero__cmd'
                : line.type === 'tool' ? 'hero__tool'
                : 'hero__ans'
              return (
                <div className={`hero__line-item ${cls}`} key={i}>
                  <span className="hero__type">{line.text}</span>
                </div>
              )
            })}
            <div className="hero__line-item hero__prompt">
              <span className="hero__caret" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* RIGHT — name block */}
        <div className="hero__name-block">
          <span className="hero__avail">
            <span className="hero__avail-dot" aria-hidden="true" />
            {hero.availability}
          </span>

          <h1 className="hero__name">
            <span className="line-mask hero__name-line">
              <span>{hero.name[0]}</span>
            </span>
            <span className="line-mask hero__name-line">
              <span>{hero.name[1]}<span className="hero__name-dot">.</span></span>
            </span>
          </h1>

          <p className="hero__role">{renderRole(hero.role)}</p>
        </div>
      </div>
    </section>
  )
}
