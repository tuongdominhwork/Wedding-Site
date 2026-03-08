import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles/main.css'
import EnvelopeCard from './components/EnvelopeCard'
import Gallery from './components/Gallery'

gsap.registerPlugin(ScrollTrigger)

const Envelope = ({ videoSrc, photos }) => {
  const [phase, setPhase]         = useState('idle')
  const [scrolled, setScrolled]   = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const videoWrapRef              = useRef(null)
  const videoRef                  = useRef(null)

  // ── Video intro sequence ──────────────────────────────────────
  const handleOpen = () => {
    if (phase !== 'idle') return
    setPhase('flap')

    const vw = videoWrapRef.current
    gsap.set(vw, {
      visibility: 'visible',
      position: 'fixed',
      top: '50%', left: '50%',
      xPercent: -50, yPercent: -10,
      width: 'var(--env-w)', height: 'var(--env-h)',
      borderRadius: 4,
      opacity: 0,
      zIndex: 50,
      overflow: 'hidden',
    })

    const tl = gsap.timeline()

    // Rising — slide up and fade in
    tl.to(vw, {
      opacity: 1,
      yPercent: -145,
      duration: 0.85,
      ease: 'power2.out',
      onStart: () => setPhase('rising'),
    }, 0.9)

    // Expanding — grow to fullscreen
    tl.to(vw, {
      width: '100vw',
      height: '100vh',
      xPercent: -50,
      yPercent: -50,
      borderRadius: 0,
      duration: 1.1,
      ease: 'power2.inOut',
      onStart: () => {
        setPhase('expanding')
        videoRef.current?.play()
      },
    }, '+=0.15')

    tl.call(() => setPhase('done'), null, '+=0.1')
  }

  // ── Scroll-driven transitions via ScrollTrigger ───────────────
  useEffect(() => {
    if (phase !== 'done') return

    const vw = videoWrapRef.current

    gsap.set(vw, {
      position: 'fixed',
      top: '50%', left: '50%',
      xPercent: -50, yPercent: -50,
      width: '100vw', height: '100vh',
      borderRadius: 0,
      opacity: 1,
      zIndex: 20,
      overflow: 'hidden',
    })

    // At 20% scroll — shrink video to circle, show gallery
    const st1 = ScrollTrigger.create({
      trigger: document.body,
      start: `${window.innerHeight * 0.2}px top`,
      onEnter: () => {
        setScrolled(true)
        gsap.to(vw, {
          width: 'var(--vid-size)',
          height: 'var(--vid-size)',
          borderRadius: 6,
          duration: 0.9,
          ease: 'power2.inOut',
        })
      },
      onLeaveBack: () => {
        setScrolled(false)
        gsap.to(vw, {
          width: '100vw',
          height: '100vh',
          borderRadius: 0,
          duration: 0.9,
          ease: 'power2.inOut',
        })
      },
    })

    // At 80% scroll — collapse everything; video flies out after frames
    const st2 = ScrollTrigger.create({
      trigger: document.body,
      start: `${window.innerHeight * 0.8}px top`,
      onEnter: () => {
        setCollapsed(true)
        // Video follows after frames have flown out (~1.2s for outer+inner stagger)
        gsap.to(vw, {
          width: 0,
          height: 0,
          opacity: 0,
          borderRadius: '50%',
          duration: 0.6,
          ease: 'power2.in',
          delay: 1.2,
        })
      },
      onLeaveBack: () => {
        setCollapsed(false)
        gsap.killTweensOf(vw)
        gsap.to(vw, {
          width: 'var(--vid-size)',
          height: 'var(--vid-size)',
          opacity: 1,
          borderRadius: 6,
          duration: 0.5,
          ease: 'power2.out',
        })
      },
    })

    return () => { st1.kill(); st2.kill() }
  }, [phase])

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
        <Gallery photos={photos} collapsed={collapsed} />
      )}

      {/* Video wrapper — always in DOM, GSAP morphs its size/position */}
      <div
        ref={videoWrapRef}
        style={{ position: 'fixed', visibility: 'hidden', top: '50%', left: '50%', overflow: 'hidden' }}
      >
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
