import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

/* Counter 0 -> 100, then the panel slides up to reveal the page.
   Calls onDone when the reveal completes so the hero can start. */
export default function Preloader({ onDone }) {
  const root = useRef(null)
  const count = useRef(null)

  useGSAP(() => {
    const counter = { v: 0 }
    const tl = gsap.timeline()

    tl.to(counter, {
      v: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => { count.current.textContent = String(Math.round(counter.v)).padStart(2, '0') },
    })
      .to('.preloader__count, .preloader__label', { yPercent: -120, duration: 0.7, ease: 'power3.in', stagger: 0.06 }, '+=0.15')
      .to(root.current, {
        yPercent: -100,
        duration: 1.05,
        ease: 'expo.inOut',
        onStart: () => onDone?.(),           // reveal hero as the curtain lifts
        onComplete: () => { root.current.style.display = 'none' },
      }, '-=0.1')
  }, { scope: root })

  return (
    <div ref={root} className="preloader">
      <span ref={count} className="preloader__count">00</span>
      <span className="preloader__label">Loading portfolio</span>
    </div>
  )
}
