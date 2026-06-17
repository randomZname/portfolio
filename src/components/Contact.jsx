import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText from './AnimatedText'
import Magnetic from './Magnetic'
import { contact } from '../data/content'
import { prefersReduced } from '../lib/motion'
import '../styles/contact.css'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const root = useRef(null)

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
        <span className="eyebrow contact__eyebrow">{contact.eyebrow}</span>

        <h2 className="contact__heading">
          <AnimatedText as="span" text={contact.heading.replace(/\.$/, '')} />
          <span className="contact__dot">.</span>
        </h2>

        <p className="contact__sub contact__reveal">{contact.sub}</p>

        <a
          className="contact__mail contact__reveal"
          href={`mailto:${contact.email}`}
          data-cursor="hover"
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
        <span className="footer__meta">{contact.location} · {contact.phone}</span>
        <a className="footer__top" href="#top" data-cursor="hover">Back to top ↑</a>
      </footer>
    </div>
  )
}
