import { useEffect, useRef } from 'react'

/* Custom dot + trailing ring cursor. Ring lerps toward the pointer for a
   smooth lag; grows when hovering elements marked data-cursor="hover". */
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(max-width: 900px)').matches) return

    const pos = { x: innerWidth / 2, y: innerHeight / 2 }
    const ringPos = { ...pos }
    let raf

    const move = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (dot.current) dot.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`
    }

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18
      ringPos.y += (pos.y - ringPos.y) * 0.18
      if (ring.current) ring.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px)`
      raf = requestAnimationFrame(loop)
    }

    const over = (e) => {
      if (e.target.closest('a, button, [data-cursor="hover"]')) ring.current?.classList.add('hover')
    }
    const out = (e) => {
      if (e.target.closest('a, button, [data-cursor="hover"]')) ring.current?.classList.remove('hover')
    }

    window.addEventListener('pointermove', move)
    document.addEventListener('pointerover', over)
    document.addEventListener('pointerout', out)
    loop()

    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.removeEventListener('pointerout', out)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  )
}
