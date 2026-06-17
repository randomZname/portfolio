import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { stats } from '../data/content'
import { prefersReduced } from '../lib/motion'
import '../styles/stats.css'

gsap.registerPlugin(ScrollTrigger)

/* Stat grid — big accent numbers count up from 0 when scrolled into view. */
export default function Stats() {
  const root = useRef(null)

  useGSAP(() => {
    const reduce = prefersReduced()

    if (!reduce) {
      gsap.from('.stat', {
        opacity: 0,
        y: 32,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 85%', once: true },
      })
    }

    root.current.querySelectorAll('.stat__value').forEach((el) => {
      const to = Number(el.dataset.to)
      const counter = el.querySelector('.stat__count')
      if (reduce) { counter.textContent = to; return } // show final value, no count-up
      const obj = { v: 0 }
      gsap.to(obj, {
        v: to,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: root.current, start: 'top 85%', once: true },
        onUpdate: () => { counter.textContent = Math.round(obj.v) },
      })
    })
  }, { scope: root })

  return (
    <section className="stats" ref={root}>
      <div className="wrap stats__grid">
        {stats.map((s, i) => (
          <div className="stat" key={i}>
            <div className="stat__value" data-to={s.value}>
              <span className="stat__count">0</span>
              {s.suffix && <span className="stat__suffix">{s.suffix}</span>}
            </div>
            <div className="stat__label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
