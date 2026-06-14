import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 13, suffix: 'K+', label: 'Lines of Python in my AI agent' },
  { value: 25, suffix: '+', label: 'Agent tools built' },
  { value: 3, suffix: '', label: 'Products shipped & live' },
  { text: 'C1', label: 'English · IELTS 7.0' },
]

export default function Stats() {
  const root = useRef(null)

  useGSAP(() => {
    gsap.from('.stat', {
      opacity: 0, y: 30, duration: 0.8, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: root.current, start: 'top 85%' },
    })
    root.current.querySelectorAll('.stat__num[data-to]').forEach((el) => {
      const to = Number(el.dataset.to)
      const obj = { v: 0 }
      gsap.to(obj, {
        v: to, duration: 1.6, ease: 'power2.out',
        scrollTrigger: { trigger: root.current, start: 'top 85%' },
        onUpdate: () => { el.firstChild.textContent = Math.round(obj.v) },
      })
    })
  }, { scope: root })

  return (
    <section className="stats wrap" ref={root}>
      {STATS.map((s, i) => (
        <div className="stat" key={i}>
          {s.text ? (
            <div className="stat__num">{s.text}</div>
          ) : (
            <div className="stat__num" data-to={s.value}><span>0</span>{s.suffix}</div>
          )}
          <div className="stat__label">{s.label}</div>
        </div>
      ))}
    </section>
  )
}
