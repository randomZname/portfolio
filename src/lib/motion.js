// Shared reduced-motion check. When true, reveal animations should be skipped
// entirely so content renders in its natural (visible) state — never hidden.
export const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
