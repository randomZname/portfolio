import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText from './AnimatedText'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    year: '2023',
    title: 'Financial sales & team lead',
    role: 'Business Consultant · Sales Team Leader',
    desc: 'Sold financial products and led a network-marketing team — learned to communicate value, coach people, and own results.',
  },
  {
    year: '2024–25',
    title: 'Credit consultant',
    role: 'Mortgage & consumer lending',
    desc: 'Advised clients on financing across partner banks and ran applications end-to-end. Numbers, trust, and closing under pressure.',
  },
  {
    year: '2024',
    title: 'Founded a math school',
    role: 'Founder · Mathematics Teacher',
    desc: 'Built a tutoring business from zero — multiple locations, a team of teachers, and the operations behind it. Still teaching today.',
  },
  {
    year: '2024 →',
    title: 'Building AI, end-to-end',
    role: 'CS @ FMI Sofia · Self-taught builder',
    desc: 'Taught myself to ship: agentic AI systems, RAG, automations and full-stack products. From idea to deployed, on my own.',
  },
]

export default function Journey() {
  const root = useRef(null)

  useGSAP(() => {
    gsap.utils.toArray('.step').forEach((step) => {
      gsap.from(step, {
        opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: step, start: 'top 90%' },
      })
    })
  }, { scope: root })

  return (
    <section id="journey" className="journey wrap" ref={root}>
      <div className="journey__head">
        <AnimatedText as="h2" text="From closing deals to shipping AI." />
        <p className="journey__lead">
          Not a straight line — and that's the point. Sales, finance and running my own business taught me to
          own outcomes. Now I point that at building software.
        </p>
      </div>

      <div className="steps">
        {STEPS.map((s) => (
          <div className="step" key={s.year} data-cursor="hover">
            <div className="step__year">{s.year}</div>
            <div className="step__body">
              <h3>{s.title}</h3>
              <div className="step__role">{s.role}</div>
              <p className="step__desc">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
