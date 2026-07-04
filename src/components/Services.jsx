import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText from './AnimatedText'
import { services } from '../data/content'
import { prefersReduced } from '../lib/motion'
import '../styles/services.css'

gsap.registerPlugin(ScrollTrigger)

/* "What I build" — three cards as a sticky stack on desktop: each card pins
   at top:15vh and the one before it scales down + dims as the next card
   arrives. Below 900px it degrades to a plain stacked list with a simple
   fade-up reveal (gsap.matchMedia switches behavior at the breakpoint). */
export default function Services() {
  const root = useRef(null)

  useGSAP(() => {
    if (prefersReduced()) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 900px)', () => {
      const cards = gsap.utils.toArray('.service-card')
      cards.forEach((card, i) => {
        const next = cards[i + 1]
        if (!next) return
        gsap.to(card, {
          scale: 0.94,
          filter: 'brightness(0.6)',
          ease: 'none',
          scrollTrigger: {
            trigger: next,
            start: 'top 60%',
            end: 'top 15%',
            scrub: true,
          },
        })
      })
    })

    mm.add('(max-width: 899px)', () => {
      gsap.from('.service-card', {
        opacity: 0,
        y: 48,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.services__stack', start: 'top 82%', once: true },
      })
    })

    return () => mm.revert()
  }, { scope: root })

  return (
    <section id="services" className="services" ref={root}>
      <div className="wrap">
        <header className="services__head">
          <span className="eyebrow">{services.eyebrow}</span>
          <AnimatedText as="h2" className="services__heading" text={services.heading} />
        </header>

        <div className="services__stack">
          {services.items.map((item) => (
            <div className="service-row" key={item.id}>
              <article className="service-card" data-cursor="hover">
                <span className="service-card__corner" aria-hidden="true" />
                <span className="service-card__index">{item.id}</span>
                <div className="service-card__body">
                  <h3 className="service-card__title">{item.title}</h3>
                  <p className="service-card__desc">{item.desc}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
