import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { journey } from '../data/content'
import { prefersReduced } from '../lib/motion'
import '../styles/journey.css'

gsap.registerPlugin(ScrollTrigger)

/* The operator-who-builds story — a vertical timeline. A progress line draws
   down the spine as you scroll (scrub); rows reveal once. Desktop pins each
   row's year in place while its body scrolls past. */
export default function Journey() {
  const root = useRef(null)

  useGSAP(() => {
    if (prefersReduced()) return

    gsap.from('.journey__head > *', {
      opacity: 0, y: 30, duration: 0.9, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: '.journey__head', start: 'top 85%', once: true },
    })

    gsap.from('.step', {
      opacity: 0,
      y: 44,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: { trigger: '.journey__steps', start: 'top 84%', once: true },
    })

    gsap.fromTo(
      '.journey__line',
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.journey__steps',
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: true,
        },
      },
    )
  }, { scope: root })

  return (
    <section id="journey" className="journey" ref={root}>
      <div className="wrap">
        <header className="journey__head">
          <span className="eyebrow">{journey.eyebrow}</span>
          <h2 className="journey__heading">
            {journey.heading.pre}
            <em className="em-serif">{journey.heading.em}</em>
            {journey.heading.post}
          </h2>
          <p className="journey__lead">{journey.lead}</p>
        </header>

        <div className="journey__steps">
          <div className="journey__line" aria-hidden="true" />
          {journey.steps.map((s, i) => (
            <div className="step" key={i} data-cursor="hover">
              <div className="step__year">{s.year}</div>
              <div className="step__body">
                <h3 className="step__title">{s.title}</h3>
                <p className="step__desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
