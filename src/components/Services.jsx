import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText from './AnimatedText'
import { services } from '../data/content'
import '../styles/services.css'

gsap.registerPlugin(ScrollTrigger)

/* "What I build" — three cards: AI Agents / Web Apps & SaaS / Automations. */
export default function Services() {
  const root = useRef(null)

  useGSAP(() => {
    gsap.from('.service-card', {
      opacity: 0,
      y: 48,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: { trigger: '.services__grid', start: 'top 82%' },
    })
  }, { scope: root })

  return (
    <section id="services" className="services" ref={root}>
      <div className="wrap">
        <header className="services__head">
          <span className="eyebrow">{services.eyebrow}</span>
          <AnimatedText as="h2" className="services__heading" text={services.heading} />
        </header>

        <div className="services__grid">
          {services.items.map((item) => (
            <article className="service-card" key={item.id} data-cursor="hover">
              <span className="service-card__corner" aria-hidden="true" />
              <span className="service-card__index">{item.id}</span>
              <h3 className="service-card__title">{item.title}</h3>
              <p className="service-card__desc">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
