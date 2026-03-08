import { useState, useRef, useEffect } from 'react'
import './styles/main.css'
import EnvelopeCard from './components/EnvelopeCard'
import Gallery from './components/Gallery'

// ── Video animation phases ──────────────────────────────────────
// idle → flap → rising → expanding → done
// ───────────────────────────────────────────────────────────────

function getVideoStyle(phase, scrolled) {
  if (phase === 'idle') return {
    position: 'fixed',
    visibility: 'hidden',
    opacity: 0,
    pointerEvents: 'none',
    top: '50%', left: '50%',
  }

  if (phase === 'flap') return {
    position: 'fixed', overflow: 'hidden', zIndex: 50,
    top: '50%', left: '50%',
    width: 'var(--env-w)', height: 'var(--env-h)',
    borderRadius: 4,
    opacity: 0,
    transform: 'translate(-50%, -10%)',
    transition: 'none',
  }

  if (phase === 'rising') return {
    position: 'fixed', overflow: 'hidden', zIndex: 50,
    top: '50%', left: '50%',
    width: 'var(--env-w)', height: 'var(--env-h)',
    borderRadius: 4,
    opacity: 1,
    transform: 'translate(-50%, -145%)',
    transition: 'transform 0.85s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.35s ease',
    boxShadow: '0 28px 80px rgba(0,0,0,0.22)',
  }

  if (phase === 'expanding') return {
    position: 'fixed', overflow: 'hidden', zIndex: 50,
    top: '50%', left: '50%',
    width: '100vw', height: '100vh',
    borderRadius: 0,
    opacity: 1,
    transform: 'translate(-50%, -50%)',
    transition: `
      width 1.1s cubic-bezier(0.4, 0, 0.2, 1),
      height 1.1s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94),
      border-radius 0.8s ease
    `,
  }

  if (scrolled) return {
    position: 'fixed', zIndex: 20,
    top: '50%', left: '50%',
    width: 'var(--vid-size)', height: 'var(--vid-size)',
    transform: 'translate(-50%, -50%)',
    borderRadius: 6, overflow: 'hidden', opacity: 1,
    transition: 'width 0.9s cubic-bezier(0.4,0,0.2,1), height 0.9s cubic-bezier(0.4,0,0.2,1), border-radius 0.5s ease',
    boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
  }

  return {
    position: 'fixed', inset: 0,
    width: '100%', height: '100%',
    zIndex: 20, opacity: 1,
    transition: 'all 0.9s cubic-bezier(0.4,0,0.2,1)',
  }
}

const Envelope = ({ videoSrc, photos }) => {
  const [phase, setPhase]       = useState('idle')
  const [scrolled, setScrolled] = useState(false)
  const videoRef                = useRef(null)

  useEffect(() => {
    if (phase !== 'done') return
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.2)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [phase])

  const handleOpen = () => {
    if (phase !== 'idle') return
    setPhase('flap')
    setTimeout(() => setPhase('rising'),    900)
    setTimeout(() => setPhase('expanding'), 1900)
    setTimeout(() => setPhase('done'),      3000)
    setTimeout(() => { videoRef.current?.play() }, 1900)
  }

  return (
    <div>
      {/* Screen 1 — envelope hero */}
      <div className="hero-screen">
        <div className="vignette" />
        <EnvelopeCard phase={phase} onOpen={handleOpen} />
      </div>

      {/* Spacer — makes page scrollable once video is fullscreen */}
      {phase === 'done' && (
        <div style={{ height: '100vh', background: 'var(--color-bg)' }} />
      )}

      {/* Scroll cue */}
      {phase === 'done' && !scrolled && (
        <div className="scroll-cue">
          <span className="scroll-cue-label">Scroll</span>
          <div className="scroll-cue-line" />
        </div>
      )}

      {/* Gallery overlay */}
      {phase === 'done' && scrolled && (
        <Gallery photos={photos} />
      )}

      {/* Video — always in DOM, styles morph per phase */}
      <div style={getVideoStyle(phase, scrolled)}>
        <video
          ref={videoRef}
          src={videoSrc || '/hero.mp4'}
          loop
          muted
          playsInline
          preload="auto"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    </div>
  )
}

export default Envelope
