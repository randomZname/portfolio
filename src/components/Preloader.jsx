import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import '../styles/preloader.css'

/* Counter 00 -> 100, then a curtain slides up to reveal the page.
   onDone() fires on the curtain's onStart so the hero intro OVERLAPS the
   lift — that overlap is what prevents the name double-flashing. */
export default function Preloader({ onDone }) {
  const root = useRef(null)
  const count = useRef(null)

  useGSAP(() => {
    const counter = { v: 0 }
    const tl = gsap.timeline()

    tl.to(counter, {
      v: 100,
      duration: 1.7,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(2, '0')
      },
    })
      .to('.preloader__row', { yPercent: -130, duration: 0.7, ease: 'power3.in', stagger: 0.05 }, '+=0.15')
      .to(root.current, {
        yPercent: -100,
        duration: 1.05,
        ease: 'expo.inOut',
        onStart: () => onDone?.(),
        onComplete: () => { if (root.current) root.current.style.display = 'none' },
      }, '-=0.05')
  }, { scope: root })

  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <div className="preloader__bar">
        <div className="preloader__row preloader__row--label">
          <span className="preloader__dot" />
          <span className="preloader__label">booting bogdan.stefanov</span>
        </div>
        <div className="preloader__row preloader__row--count">
          <span ref={count} className="preloader__count">00</span>
          <span className="preloader__pct">%</span>
        </div>
      </div>
    </div>
  )
}
