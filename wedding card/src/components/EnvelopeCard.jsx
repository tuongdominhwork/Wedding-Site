// EnvelopeCard — the visual envelope with SVG, flap, seal and CTA

const EnvelopeCard = ({ phase, onOpen }) => {
  const isHidden = phase === 'expanding' || phase === 'done'

  return (
    <div className={`envelope-scene${isHidden ? ' envelope-scene--hidden' : ''}`}>

      <div className="envelope-subtitle">You are cordially invited</div>

      <div
        className={`envelope-wrap${phase !== 'idle' ? ' envelope-wrap--inactive' : ''}`}
        onClick={onOpen}
      >
        <div className="envelope-body">
          <div className="envelope-inner-accent" />

          <svg className="envelope-svg" viewBox="0 0 360 240" preserveAspectRatio="none">
            <defs>
              <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#f0ebe0" />
                <stop offset="100%" stopColor="#e4ddd0" />
              </linearGradient>
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

            {/* Flap — animates open on click */}
            <polygon
              points="0,0 360,0 180,128"
              fill="url(#flapGrad)"
              className={phase !== 'idle' ? 'flap-open' : ''}
            />

            {/* Flap crease lines */}
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
