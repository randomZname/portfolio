import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText from './AnimatedText'
import { journey } from '../data/content'
import '../styles/journey.css'

gsap.registerPlugin(ScrollTrigger)

/* The operator-who-builds story — rows of year + title + line, revealed on scroll. */
export default function Journey() {
  const root = useRef(null)

  useGSAP(() => {
    gsap.from('.step', {
      opacity: 0,
      y: 44,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: { trigger: '.journey__steps', start: 'top 84%' },
    })
  }, { scope: root })

  return (
    <section id="journey" className="journey" ref={root}>
      <div className="wrap">
        <header className="journey__head">
          <span className="eyebrow">{journey.eyebrow}</span>
          <AnimatedText as="h2" className="journey__heading" text={journey.heading} />
          <p className="journey__lead">{journey.lead}</p>
        </header>

        <div className="journey__steps">
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
