import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { palette } from '../data/content'
import { prefersReduced } from '../lib/motion'
import '../styles/command-palette.css'

/* Ctrl+K / '/' overlay command palette. Substring-filters content.palette
   groups, arrow-key navigable, Enter activates (in-page anchors scroll +
   close, external links open in a new tab). Esc closes and focus returns to
   whatever triggered the palette. Also opens on the window CustomEvent
   'palette:open' dispatched by Nav's hint chip. */
export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const panelRef = useRef(null)
  const inputRef = useRef(null)
  const lastFocused = useRef(null)

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return palette.groups
    return palette.groups
      .map((g) => ({ ...g, items: g.items.filter((it) => it.label.toLowerCase().includes(q)) }))
      .filter((g) => g.items.length > 0)
  }, [query])

  const flatItems = useMemo(() => filteredGroups.flatMap((g) => g.items), [filteredGroups])

  const indexByHref = useMemo(() => {
    const map = new Map()
    flatItems.forEach((item, i) => map.set(item.href, i))
    return map
  }, [flatItems])

  const openPalette = useCallback(() => {
    lastFocused.current = document.activeElement
    setQuery('')
    setActiveIndex(0)
    setOpen(true)
  }, [])

  const closePalette = useCallback(() => {
    setOpen(false)
    if (lastFocused.current && typeof lastFocused.current.focus === 'function') {
      lastFocused.current.focus()
    }
  }, [])

  const activate = useCallback((item) => {
    if (!item) return
    if (item.href.startsWith('#')) {
      const el = document.querySelector(item.href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      closePalette()
      return
    }
    if (item.external) window.open(item.href, '_blank', 'noreferrer')
    else window.location.href = item.href
    closePalette()
  }, [closePalette])

  // Listen for the external open trigger (Nav's "Ctrl K" hint chip).
  useEffect(() => {
    window.addEventListener('palette:open', openPalette)
    return () => window.removeEventListener('palette:open', openPalette)
  }, [openPalette])

  // Global shortcuts + in-dialog keyboard navigation.
  useEffect(() => {
    const onKeydown = (e) => {
      if ((e.key === 'k' || e.key === 'K') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        if (open) closePalette()
        else openPalette()
        return
      }

      if (!open) {
        const el = document.activeElement
        const typing = el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)
        if (e.key === '/' && !typing) {
          e.preventDefault()
          openPalette()
        }
        return
      }

      if (e.key === 'Escape') { e.preventDefault(); closePalette(); return }
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, flatItems.length - 1)); return }
      if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); return }
      if (e.key === 'Enter') { e.preventDefault(); activate(flatItems[activeIndex]) }
    }

    window.addEventListener('keydown', onKeydown)
    return () => window.removeEventListener('keydown', onKeydown)
  }, [open, flatItems, activeIndex, openPalette, closePalette, activate])

  // Focus the input whenever the palette opens.
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // Entrance fade + scale-in, guarded by prefers-reduced-motion.
  useEffect(() => {
    if (!open || !panelRef.current || prefersReduced()) return
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.32, ease: 'power3.out' }
    )
  }, [open])

  if (!open) return null

  return (
    <div className="cmdk" onMouseDown={(e) => { if (e.target === e.currentTarget) closePalette() }}>
      <div className="cmdk__panel" ref={panelRef} role="dialog" aria-modal="true" aria-label="Command palette">
        <div className="cmdk__input-row">
          <span className="cmdk__prompt" aria-hidden="true">/</span>
          <input
            ref={inputRef}
            className="cmdk__input"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIndex(0) }}
            placeholder={palette.placeholder}
            aria-label={palette.placeholder}
            autoComplete="off"
            spellCheck="false"
          />
          <span className="cmdk__hint">esc</span>
        </div>

        <div className="cmdk__results">
          {flatItems.length === 0 && <div className="cmdk__empty">No matches</div>}
          {filteredGroups.map((group) => (
            <div className="cmdk__group" key={group.label}>
              <div className="cmdk__group-label">{group.label}</div>
              {group.items.map((item) => {
                const idx = indexByHref.get(item.href)
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`cmdk__row${idx === activeIndex ? ' cmdk__row--active' : ''}`}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={(e) => { e.preventDefault(); activate(item) }}
                    {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    <span>{item.label}</span>
                    <span className="cmdk__row-arr" aria-hidden="true">{item.external ? '↗' : '→'}</span>
                  </a>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
