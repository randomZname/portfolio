import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { marquee } from '../data/content'
import { prefersReduced } from '../lib/motion'
import '../styles/marquee.css'

gsap.registerPlugin(ScrollTrigger)

/* Infinite horizontal scroll. A duplicated track loops via xPercent -50;
   scroll velocity nudges the loop's timeScale/direction. */
export default function Marquee() {
  const root = useRef(null)
  const track = useRef(null)

  useGSAP(() => {
    if (prefersReduced()) return // no infinite scroll under reduced motion
    const loop = gsap.to(track.current, {
      xPercent: -50,
      duration: 26,
      ease: 'none',
      repeat: -1,
    })

    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const v = 1 + Math.min(Math.abs(self.getVelocity()) / 1000, 4)
        gsap.to(loop, { timeScale: self.direction * v, duration: 0.4, overwrite: true })
      },
    })

    return () => st.kill()
  }, { scope: root })

  // duplicated track so the -50% loop is seamless
  const row = [...marquee, ...marquee]

  return (
    <div className="marquee" aria-hidden="true" ref={root}>
      <div className="marquee__track" ref={track}>
        {row.map((item, i) => (
          <span className="marquee__item" key={i}>
            <span className="marquee__word">{item}</span>
            <span className="marquee__sep">&#10022;</span>
          </span>
        ))}
      </div>
    </div>
  )
}
