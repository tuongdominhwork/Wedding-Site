import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import PhotoFrame from './PhotoFrame'

// ── Inner ring (clockwise, 28 s) ────────────────────────────────
const FRAMES = [
  { key: 't1', delay:   0, startAngle: -90,  image: '/images/webp/IMG_2968.webp' },
  { key: 't2', delay:  50, startAngle: -45,  image: '/images/webp/IMG_2969.webp' },
  { key: 'mr', delay: 100, startAngle:   0,  image: '/images/webp/IMG_2970.webp' },
  { key: 'b3', delay: 150, startAngle:  45,  image: '/images/webp/IMG_2972.webp' },
  { key: 'b2', delay: 200, startAngle:  90,  image: '/images/webp/IMG_3005.webp' },
  { key: 'b1', delay: 150, startAngle: 135,  image: '/images/webp/IMG_2974.webp' },
  { key: 'ml', delay: 100, startAngle: 180,  image: '/images/webp/IMG_2971.webp' },
  { key: 't3', delay:  50, startAngle: -135, image: '/images/webp/IMG_3006.webp' },
]

// ── Outer ring (counter-clockwise, 36 s) ────────────────────────
const FRAMES_OUTER = [
  { key: 'o1',  delay: 2000, startAngle:  -90,   image: '/images/webp/IMG_2973.webp' },
  { key: 'o9',  delay: 2020, startAngle:  -67.5, image: '/images/webp/IMG_2971.webp' },
  { key: 'o2',  delay: 2050, startAngle:  -45,   image: '/images/webp/IMG_2976.webp' },
  { key: 'o10', delay: 2070, startAngle:  -22.5, image: '/images/webp/IMG_2972.webp' },
  { key: 'o3',  delay: 2100, startAngle:    0,   image: '/images/webp/IMG_2979.webp' },
  { key: 'o11', delay: 2120, startAngle:   22.5, image: '/images/webp/IMG_3005.webp' },
  { key: 'o4',  delay: 2150, startAngle:   45,   image: '/images/webp/IMG_2980.webp' },
  { key: 'o12', delay: 2170, startAngle:   67.5, image: '/images/webp/IMG_3006.webp' },
  { key: 'o5',  delay: 2200, startAngle:   90,   image: '/images/webp/IMG_3004.webp' },
  { key: 'o13', delay: 2170, startAngle:  112.5, image: '/images/webp/IMG_2974.webp' },
  { key: 'o6',  delay: 2150, startAngle:  135,   image: '/images/webp/IMG_2968.webp' },
  { key: 'o14', delay: 2120, startAngle:  157.5, image: '/images/webp/IMG_2971.webp' },
  { key: 'o7',  delay: 2100, startAngle:  180,   image: '/images/webp/IMG_2969.webp' },
  { key: 'o15', delay: 2070, startAngle: -157.5, image: '/images/webp/IMG_2972.webp' },
  { key: 'o8',  delay: 2050, startAngle: -135,   image: '/images/webp/IMG_2970.webp' },
  { key: 'o16', delay: 2020, startAngle: -112.5, image: '/images/webp/IMG_2974.webp' },
]

const Gallery = ({ photos = {}, collapsed = false }) => {
  const galleryRef   = useRef(null)
  const clusterRef   = useRef(null)
  const innerArmsRef = useRef([])
  const outerArmsRef = useRef([])
  const allTweens    = useRef([])   // all orbit + counter-rotate tweens
  const collapseTl   = useRef(null) // current collapse timeline

  // ── Start orbit tweens on mount ───────────────────────────────
  useEffect(() => {
    const CW_DUR  = 28
    const CCW_DUR = 36
    const tweens  = []

    innerArmsRef.current.forEach((arm, i) => {
      if (!arm) return
      const f = FRAMES[i]
      gsap.set(arm, { rotation: f.startAngle })
      tweens.push(gsap.to(arm, {
        rotation: f.startAngle + 360,
        duration: CW_DUR, ease: 'none', repeat: -1, delay: f.delay / 1000,
      }))
      const frame = arm.querySelector('.photo-frame')
      if (frame) {
        gsap.set(frame, { rotation: -f.startAngle })
        tweens.push(gsap.to(frame, {
          rotation: -(f.startAngle + 360),
          duration: CW_DUR, ease: 'none', repeat: -1, delay: f.delay / 1000,
        }))
      }
    })

    outerArmsRef.current.forEach((arm, i) => {
      if (!arm) return
      const f = FRAMES_OUTER[i]
      gsap.set(arm, { rotation: f.startAngle })
      tweens.push(gsap.to(arm, {
        rotation: f.startAngle - 360,
        duration: CCW_DUR, ease: 'none', repeat: -1, delay: f.delay / 1000,
      }))
      const frame = arm.querySelector('.photo-frame')
      if (frame) {
        gsap.set(frame, { rotation: -f.startAngle })
        tweens.push(gsap.to(frame, {
          rotation: -(f.startAngle - 360),
          duration: CCW_DUR, ease: 'none', repeat: -1, delay: f.delay / 1000,
        }))
      }
    })

    allTweens.current = tweens
    return () => tweens.forEach(t => t.kill())
  }, [])

  // ── Fade-in each frame after its delay ───────────────────────
  useEffect(() => {
    ;[...innerArmsRef.current, ...outerArmsRef.current].filter(Boolean).forEach((arm, i) => {
      const isOuter = i >= FRAMES.length
      const f = isOuter ? FRAMES_OUTER[i - FRAMES.length] : FRAMES[i]
      gsap.fromTo(
        arm.querySelector('.photo-frame'),
        { opacity: 0 },
        { opacity: 1, duration: 0.9, delay: f.delay / 1000, ease: 'power1.inOut' }
      )
    })
  }, [])

  // ── Stagger fly-out on collapse: outer → inner → text ─────────
  useEffect(() => {
    if (!clusterRef.current) return

    // Kill any in-progress collapse animation
    if (collapseTl.current) collapseTl.current.kill()

    const outer   = outerArmsRef.current.filter(Boolean)
    const inner   = innerArmsRef.current.filter(Boolean)
    const textEls = galleryRef.current?.querySelectorAll('.save-the-date, .names')

    if (collapsed) {
      // Pause orbit tweens so frames stop mid-orbit during fly-out
      allTweens.current.forEach(t => t.pause())

      const tl = gsap.timeline()
      collapseTl.current = tl

      // Outer ring first — fly to top-left one by one
      tl.to(outer, {
        x: '-160vw', y: '-160vh',
        opacity: 0,
        duration: 0.55,
        ease: 'power3.in',
        stagger: 0.04,
      })
      // Inner ring follows
      tl.to(inner, {
        x: '-160vw', y: '-160vh',
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in',
        stagger: 0.05,
      }, '-=0.2')
      // Text last
      tl.to(textEls, {
        x: '-100vw', y: '-100vh',
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        stagger: 0.1,
      }, '-=0.25')

    } else {
      // Restore all arms to orbit center, resume tweens
      const tl = gsap.timeline({ onComplete: () => allTweens.current.forEach(t => t.resume()) })
      collapseTl.current = tl

      tl.to([...outer, ...inner], {
        x: 0, y: 0, opacity: 1,
        duration: 0.6, ease: 'power2.out', stagger: 0.03,
      })
      tl.to(textEls, {
        x: 0, y: 0, opacity: 1,
        duration: 0.5, ease: 'power2.out',
      }, '<')
    }
  }, [collapsed])

  return (
    <div ref={galleryRef} className="gallery">

      <div className="save-the-date">
        <div className="save-the-date-text">Save the Date</div>
        <div className="gold-line" />
      </div>

      <div className="names">
        <div className="gold-line" />
        <div className="names-text">Minh Tường &amp; Thảo Nguyên</div>
      </div>

      {/* frames-cluster — 0×0 point at viewport center, GSAP scales it for collapse */}
      <div ref={clusterRef} className="frames-cluster">

        {FRAMES.map((f, i) => (
          <div
            key={f.key}
            ref={el => innerArmsRef.current[i] = el}
            className="rotate-wrap"
          >
            <PhotoFrame frameKey={f.key} imageSrc={photos[f.key] || f.image || ''} />
          </div>
        ))}

        {FRAMES_OUTER.map((f, i) => (
          <div
            key={f.key}
            ref={el => outerArmsRef.current[i] = el}
            className="rotate-wrap rotate-wrap-outer"
          >
            <PhotoFrame frameKey={f.key} imageSrc={photos[f.key] || f.image || ''} outer />
          </div>
        ))}

      </div>

    </div>
  )
}

export default Gallery
