import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Magnetic from './Magnetic'
import { nav } from '../data/content'
import '../styles/nav.css'

/* Top navigation. Logo + links pulled from content.js. Drops in from the top
   on mount (after the preloader is already lifting, so it feels layered). */
export default function Nav() {
  const root = useRef(null)

  useGSAP(() => {
    gsap.from(root.current, {
      y: -24,
      opacity: 0,
      duration: 1,
      delay: 0.9,
      ease: 'power3.out',
    })
  }, { scope: root })

  return (
    <nav className="nav" ref={root}>
      <a href="#top" className="nav__logo" data-cursor="hover">
        {nav.logo}<span className="nav__dot">.</span>
      </a>
      <div className="nav__links">
        {nav.links.map((link) => (
          <Magnetic strength={0.3} key={link.label}>
            <a
              href={link.href}
              className="nav__link"
              data-cursor="hover"
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {link.label}
            </a>
          </Magnetic>
        ))}
      </div>
    </nav>
  )
}
