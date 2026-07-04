import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { hero } from '../data/content'
import { prefersReduced, supportsWebGL } from '../lib/motion'
import '../styles/hero.css'

const SignalField = lazy(() => import('./SignalField'))

/* SIGNAL hero. The Signal Field (WebGL thermal gradient, or a static CSS
   fallback under reduced-motion/no-WebGL) sits behind the content as the
   "machine" layer; the name/role/meta stack is the "human" layer on top.
   `.hero__inner` stays hidden until `play` flips true (curtain-lift contract
   shared with the preloader), then a single reveal timeline runs. */
export default function Hero({ play }) {
  const root = useRef(null)
  const [clock, setClock] = useState('')

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: hero.meta.tz,
    })
    const tick = () => setClock(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useGSAP(() => {
    if (!play) return

    const reduce = prefersReduced()
    gsap.set('.hero__inner', { visibility: 'visible' })

    if (reduce) {
      gsap.set(['.hero__name-line > span', '.hero__role', '.hero__sub', '.hero__meta', '.hero__scroll-hint'], {
        clearProps: 'all',
        opacity: 1,
        yPercent: 0,
      })
      return
    }

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    tl.from('.hero__name-line > span', { yPercent: 115, duration: 1.1, stagger: 0.12 })
      .from('.hero__role', { opacity: 0, y: 24, duration: 0.8 }, '-=0.7')
      .from('.hero__sub', { opacity: 0, y: 18, duration: 0.7 }, '-=0.6')
      .from('.hero__meta', { opacity: 0, y: 14, duration: 0.7 }, '-=0.5')
      .from('.hero__scroll-hint', { opacity: 0, duration: 0.9 }, '-=0.4')
  }, { dependencies: [play], scope: root })

  return (
    <section id="top" className="hero" ref={root}>
      {prefersReduced() || !supportsWebGL()
        ? <div className="signal-field signal-field--static" aria-hidden="true" />
        : <Suspense fallback={<div className="signal-field signal-field--static" aria-hidden="true" />}>
            <SignalField />
          </Suspense>}

      <div className="hero__inner wrap">
        <h1 className="hero__name">
          <span className="line-mask hero__name-line">
            <span>{hero.name[0]}</span>
          </span>
          <span className="line-mask hero__name-line">
            <span>{hero.name[1]}</span>
          </span>
        </h1>

        <p className="hero__role">
          {hero.role.pre}
          <em className="em-serif">{hero.role.em}</em>
          {hero.role.post}
        </p>

        <p className="hero__sub">{hero.sub}</p>

        <div className="hero__meta">
          <span className="hero__meta-item">{hero.meta.coords}</span>
          <span className="hero__meta-sep" aria-hidden="true">&middot;</span>
          <span className="hero__meta-item hero__clock">{clock}</span>
          <span className="hero__meta-sep" aria-hidden="true">&middot;</span>
          <span className="hero__meta-item hero__avail">
            <span className="hero__avail-dot" aria-hidden="true" />
            {hero.meta.available}
          </span>
        </div>
      </div>

      <div className="hero__scroll-hint" aria-hidden="true">
        <span className="hero__scroll-label">{hero.scrollHint}</span>
        <span className="hero__scroll-arrow" />
      </div>
    </section>
  )
}
