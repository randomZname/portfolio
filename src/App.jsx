import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Cursor from './components/Cursor'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Stats from './components/Stats'
import Journey from './components/Journey'
import Projects from './components/Projects'
import Contact from './components/Contact'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [revealed, setRevealed] = useState(false)
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenisRef.current = lenis
    lenis.stop() // hold until preloader finishes

    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Smooth in-page anchor navigation
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (id.length < 2) return
      const el = document.querySelector(id)
      if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: 0 }) }
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  const handleDone = () => {
    setRevealed(true)
    lenisRef.current?.start()
    ScrollTrigger.refresh()
  }

  return (
    <>
      <Cursor />
      <div className="grain" />
      <Preloader onDone={handleDone} />
      <Nav />
      <main>
        <Hero play={revealed} />
        <Marquee />
        <Stats />
        <Journey />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
