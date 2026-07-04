// Shared reduced-motion check. When true, reveal animations should be skipped
// entirely so content renders in its natural (visible) state — never hidden.
export const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// WebGL capability gate for the SignalField hero canvas. When false the
// hero renders the static CSS gradient fallback instead of a <Canvas>.
export function supportsWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}
