import AnimatedText from './AnimatedText'
import Magnetic from './Magnetic'

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/randomZname' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bogdan-stefanov-2032802b0' },
  { label: 'Email', href: 'mailto:bogdan.mstefanov@gmail.com' },
  { label: 'Résumé', href: '/cv/Bogdan_Stefanov_CV_EN.pdf' },
]

export default function Contact() {
  return (
    <>
      <section id="contact" className="contact wrap">
        <span className="eyebrow contact__eyebrow">Let's build something</span>
        <AnimatedText as="h2" text="Let's talk." />
        <p style={{ fontSize: 'clamp(1.1rem,2vw,1.6rem)', color: 'var(--muted)' }}>
          Open to AI / Agentic / Automation roles —{' '}
          <a className="contact__mail" href="mailto:bogdan.mstefanov@gmail.com" data-cursor="hover">
            bogdan.mstefanov@gmail.com
          </a>
        </p>
        <div className="contact__socials">
          {SOCIALS.map((s) => (
            <Magnetic key={s.label} strength={0.25}>
              <a className="btn btn--ghost" href={s.href} target="_blank" rel="noopener" data-cursor="hover">
                {s.label} <span className="arr">↗</span>
              </a>
            </Magnetic>
          ))}
        </div>
      </section>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Bogdan Stefanov</span>
        <span>Sofia, Bulgaria · +359 877 772 253</span>
        <a href="#top" data-cursor="hover">Back to top ↑</a>
      </footer>
    </>
  )
}
