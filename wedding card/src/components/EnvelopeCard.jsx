// EnvelopeCard — the visual envelope with SVG, flap, seal and CTA
import { useRef, useEffect } from 'react'
import gsap from 'gsap'

const EnvelopeCard = ({ phase, onOpen }) => {
  const sceneRef = useRef(null)
  const flapRef  = useRef(null)

  // Flap open animation
  useEffect(() => {
    if (phase === 'flap' && flapRef.current) {
      // .envelope-flap CSS sets transform-box:fill-box + transform-origin:top center
      // so GSAP rotates the polygon around its own top edge (realistic fold)
      gsap.fromTo(flapRef.current,
        { rotateX: 0 },
        { rotateX: -175, duration: 0.9, ease: 'power2.inOut' }
      )
    }
  }, [phase])

  // Fade out scene when expanding
  useEffect(() => {
    if ((phase === 'expanding' || phase === 'done') && sceneRef.current) {
      gsap.to(sceneRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.4, ease: 'power1.in' })
    }
  }, [phase])

  return (
    <div ref={sceneRef} className="envelope-scene">

      <div className="envelope-subtitle">You are cordially invited</div>

      <div
        className={`envelope-wrap${phase !== 'idle' ? ' envelope-wrap--inactive' : ''}`}
        onClick={onOpen}
      >
        <div className="envelope-body">
          <div className="envelope-inner-accent" />

          {/* HTML flap div — clip-path gives the triangle shape, perspective on parent makes rotateX 3D */}
          <div ref={flapRef} className="envelope-flap" />

          <svg className="envelope-svg" viewBox="0 0 360 240" preserveAspectRatio="none">
            <defs>
              <linearGradient id="goldLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="transparent" />
                <stop offset="30%"  stopColor="#b8a880" />
                <stop offset="70%"  stopColor="#b8a880" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>

            {/* Bottom fold lines */}
            <line x1="0"   y1="240" x2="180" y2="120" stroke="#c0b090" strokeWidth="0.8" />
            <line x1="360" y1="240" x2="180" y2="120" stroke="#c0b090" strokeWidth="0.8" />

            {/* Flap crease lines — remain as fold marks on body after flap opens */}
            <line x1="0"   y1="0" x2="180" y2="128" stroke="#c0b090" strokeWidth="0.8" />
            <line x1="360" y1="0" x2="180" y2="128" stroke="#c0b090" strokeWidth="0.8" />

            {/* Gold top / bottom edges */}
            <line x1="0" y1="0.5"   x2="360" y2="0.5"   stroke="url(#goldLine)" strokeWidth="1" />
            <line x1="0" y1="239.5" x2="360" y2="239.5" stroke="url(#goldLine)" strokeWidth="1" />

            {/* T&N wax seal */}
            <circle cx="180" cy="120" r="34" fill="#7a0c0c" />
            <circle cx="180" cy="120" r="30" fill="none" stroke="#a01515" strokeWidth="0.8" />
            <circle cx="180" cy="120" r="26" fill="none" stroke="#a01515" strokeWidth="0.4" strokeDasharray="2,3" />
            <text
              x="180" y="126"
              textAnchor="middle"
              fontFamily="'Cormorant Garamond', Georgia, serif"
              fontSize="16"
              fontWeight="400"
              letterSpacing="1"
              fill="#f5dada"
            >T&amp;N</text>
          </svg>
        </div>
      </div>

      <div className={`cta${phase !== 'idle' ? ' cta--hidden' : ''}`}>
        <div className="cta-line cta-line--left" />
        <span className="cta-text">Open your invitation</span>
        <div className="cta-line cta-line--right" />
      </div>

    </div>
  )
}

export default EnvelopeCard
