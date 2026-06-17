import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReduced } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* Splits text into word masks and reveals them with a stagger when scrolled
   into view. `as` chooses the wrapper tag; extra props pass through. */
export default function AnimatedText({ text, as = 'span', className = '', delay = 0, stagger = 0.04, ...rest }) {
  const ref = useRef(null)
  const Tag = as

  useGSAP(() => {
    if (prefersReduced()) return // leave words in natural visible state
    const words = ref.current.querySelectorAll('.word > span')
    gsap.from(words, {
      yPercent: 110,
      duration: 0.9,
      ease: 'power4.out',
      stagger,
      delay,
      scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
    })
  }, { scope: ref })

  const words = String(text).split(' ')

  return (
    <Tag ref={ref} className={className} {...rest}>
      {words.map((w, i) => (
        <span key={i} className="word" style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', padding: '0.08em 0', margin: '-0.08em 0' }}>
          <span style={{ display: 'inline-block', willChange: 'transform' }}>
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </Tag>
  )
}
