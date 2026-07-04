import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { preloader } from '../data/content'
import { prefersReduced } from '../lib/motion'
import '../styles/preloader.css'

/* Mono boot-log lines reveal sequentially alongside a 00 -> 100 counter, then
   a curtain slides up in ink to reveal the page. onDone() fires on the
   curtain's onStart so the hero intro OVERLAPS the lift — that overlap is
   what prevents the name double-flashing.
   prefersReduced() -> skip the whole sequence instantly and call onDone(). */
export default function Preloader({ onDone }) {
  const root = useRef(null)
  const count = useRef(null)

  useGSAP(() => {
    if (prefersReduced()) {
      onDone?.()
      if (root.current) root.current.style.display = 'none'
      return
    }

    const counter = { v: 0 }
    const tl = gsap.timeline()

    tl.set('.preloader__line', { opacity: 0, y: 8 })
      .to('.preloader__line', {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.3,
      }, 0.1)
      .to(counter, {
        v: 100,
        duration: 1.7,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(2, '0')
        },
      }, 0)
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
        <div className="preloader__row preloader__row--log">
          {preloader.lines.map((line, i) => (
            <div className="preloader__line" key={i}>
              <span className="preloader__caret">&gt;</span> {line}
            </div>
          ))}
        </div>
        <div className="preloader__row preloader__row--count">
          <span ref={count} className="preloader__count">00</span>
          <span className="preloader__pct">%</span>
        </div>
      </div>
    </div>
  )
}
