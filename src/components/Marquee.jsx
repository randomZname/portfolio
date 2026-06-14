import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  'LLM Agents', 'Tool Use', 'RAG', 'Pydantic AI', 'LiteLLM', 'Python',
  'TypeScript', 'Next.js', 'FastAPI', 'pgvector', 'Playwright', 'n8n',
  'Prompt Engineering', 'Automation', 'Docker', 'Stripe',
]

/* Infinite marquee that also nudges its speed/direction with scroll velocity. */
export default function Marquee() {
  const track = useRef(null)

  useGSAP(() => {
    const loop = gsap.to(track.current, {
      xPercent: -50,
      duration: 22,
      ease: 'none',
      repeat: -1,
    })
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const v = 1 + Math.min(Math.abs(self.getVelocity()) / 1200, 4)
        gsap.to(loop, { timeScale: self.direction * v, duration: 0.3, overwrite: true })
      },
    })
    return () => st.kill()
  }, { scope: track })

  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track" ref={track}>
        {row.map((t, i) => <span key={i} className="marquee__item">{t}</span>)}
      </div>
    </div>
  )
}
