import { useRef } from 'react'
import gsap from 'gsap'

/* Wraps a child and pulls it toward the pointer while hovered (magnetic CTA). */
export default function Magnetic({ children, strength = 0.4 }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * strength
    const y = (e.clientY - (r.top + r.height / 2)) * strength
    gsap.to(el, { x, y, duration: 0.6, ease: 'power3.out' })
  }

  const onLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
  }

  return (
    <span ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} style={{ display: 'inline-block' }}>
      {children}
    </span>
  )
}
