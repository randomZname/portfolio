import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import App from './App.jsx'

// StrictMode intentionally omitted: its dev double-mount conflicts with
// Lenis / GSAP ScrollTrigger lifecycle. Production behaviour is unaffected.
createRoot(document.getElementById('root')).render(<App />)
