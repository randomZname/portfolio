import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Magnetic from './Magnetic'
import { contact } from '../data/content'
import { prefersReduced } from '../lib/motion'
import '../styles/contact.css'

gsap.registerPlugin(ScrollTrigger)

/* Full-bleed thermal glow behind a giant CTA. Footer carries a live local
   clock (Intl.DateTimeFormat, ticking every second) + back-to-top. */
export default function Contact() {
  const root = useRef(null)
  const [clock, setClock] = useState('')

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: contact.tz,
    })
    const tick = () => setClock(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useGSAP(() => {
    if (prefersReduced()) return
    gsap.from(root.current.querySelectorAll('.contact__reveal'), {
      opacity: 0, y: 30, duration: 0.85, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
    })
  }, { scope: root })

  return (
    <div ref={root}>
      <section id="contact" className="contact wrap">
        <span className="eyebrow contact__eyebrow contact__reveal">{contact.eyebrow}</span>

        <div className="contact__cta">
          <div className="contact__glow ribbon" aria-hidden="true" />
          <h2 className="contact__heading contact__reveal">
            {contact.heading.pre}
            <em className="em-serif">{contact.heading.em}</em>
            {contact.heading.post === '.'
              ? <span className="contact__dot">.</span>
              : contact.heading.post}
          </h2>
        </div>

        <p className="contact__sub contact__reveal">{contact.sub}</p>

        <a
          className="contact__mail contact__reveal"
          href={`mailto:${contact.email}`}
          data-cursor-label="Email"
        >
          {contact.email}
        </a>

        <div className="contact__socials contact__reveal">
          {contact.socials.map((s) => (
            <Magnetic key={s.label} strength={0.25}>
              <a
                className="btn btn--ghost"
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
              >
                {s.label} <span className="arr">↗</span>
              </a>
            </Magnetic>
          ))}
        </div>
      </section>

      <footer className="footer wrap">
        <span>© {new Date().getFullYear()} Bogdan Stefanov</span>
        <span className="footer__meta">
          {contact.location} · {contact.phone} · <span className="footer__clock">{clock}</span>
        </span>
        <a className="footer__top" href="#top" data-cursor="hover">Back to top ↑</a>
      </footer>
    </div>
  )
}
