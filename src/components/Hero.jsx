import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

/* Big name reveal. Runs its intro timeline once `play` flips true
   (i.e. the preloader has finished). */
export default function Hero({ play }) {
  const root = useRef(null)

  useGSAP(() => {
    if (!play) return
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    tl.from('.hero__line > span', { yPercent: 115, duration: 1.1, stagger: 0.12 })
      .from('.hero__avail', { opacity: 0, y: 20, duration: 0.8 }, '-=0.8')
      .from('.hero__tag, .hero__scroll', { opacity: 0, y: 30, duration: 0.9, stagger: 0.12 }, '-=0.6')
      .from('.hero__glow', { opacity: 0, scale: 0.6, duration: 1.6, ease: 'power2.out' }, 0)
  }, { dependencies: [play], scope: root })

  return (
    <section id="top" className="hero wrap" ref={root}>
      <div className="hero__glow" />
      <div className="hero__inner">
        <span className="hero__avail"><span className="dot" /> Available for AI / Agentic roles — remote & Sofia</span>

        <h1 className="hero__title">
          <span className="line-mask hero__line"><span style={{ display: 'inline-block' }}>BOGDAN</span></span>
          <span className="line-mask hero__line"><span style={{ display: 'inline-block' }}>STEFANOV<span className="accent">.</span></span></span>
        </h1>

        <div className="hero__sub">
          <p className="hero__tag">
            <b>AI Developer</b> building <b>agentic systems</b> & <b>automations</b> end-to-end — from LLM agents and RAG pipelines to full-stack products.
          </p>
          <a href="#work" className="hero__scroll" data-cursor="hover">
            Scroll <span className="arrow" />
          </a>
        </div>
      </div>
    </section>
  )
}
