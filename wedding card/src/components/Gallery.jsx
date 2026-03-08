import PhotoFrame from './PhotoFrame'

// ── Inner ring (clockwise) ──────────────────────────────────────
const FRAMES = [
  { key: 't1', delay:   0, image: '/images/IMG_2968.jpeg' },  // top       (--angle: -90deg)
  { key: 't2', delay:  50, image: '/images/IMG_2969.jpeg' },  // top-right (--angle: -45deg)
  { key: 'mr', delay: 100, image: '/images/IMG_2970.jpeg' },  // right     (--angle:   0deg)
  { key: 'b3', delay: 150, image: '/images/IMG_2972.jpeg' },  // btm-right (--angle:  45deg)
  { key: 'b2', delay: 200, image: '/images/IMG_3005.jpeg' },  // bottom    (--angle:  90deg)
  { key: 'b1', delay: 150, image: '/images/IMG_2974.jpeg' },  // btm-left  (--angle: 135deg)
  { key: 'ml', delay: 100, image: '/images/IMG_2971.jpeg' },  // left      (--angle: 180deg)
  { key: 't3', delay:  50, image: '/images/IMG_3006.jpeg' },  // top-left  (--angle: -135deg)
]

// ── Outer ring (counter-clockwise, larger orbit) ────────────────
// Delays start at ~14900ms so the outer ring only appears after
// the inner ring has completed half a rotation (28s ÷ 2 ≈ 14s orbit + 0.9s fly-in).
// 16 frames at 22.5° intervals for a dense ring.
const FRAMES_OUTER = [
  { key: 'o1',  delay: 2000, image: '/images/IMG_2973.jpeg' },  // -90°
  { key: 'o9',  delay: 2020, image: '/images/IMG_2971.jpeg' },  // -67.5°
  { key: 'o2',  delay: 2050, image: '/images/IMG_2976.jpeg' },  // -45°
  { key: 'o10', delay: 2070, image: '/images/IMG_2972.jpeg' },  // -22.5°
  { key: 'o3',  delay: 2100, image: '/images/IMG_2979.jpeg' },  // 0°
  { key: 'o11', delay: 2120, image: '/images/IMG_3005.jpeg' },  // 22.5°
  { key: 'o4',  delay: 2150, image: '/images/IMG_2980.jpeg' },  // 45°
  { key: 'o12', delay: 2170, image: '/images/IMG_3006.jpeg' },  // 67.5°
  { key: 'o5',  delay: 2200, image: '/images/IMG_3004.jpeg' },  // 90°
  { key: 'o13', delay: 2170, image: '/images/IMG_2974.jpeg' },  // 112.5°
  { key: 'o6',  delay: 2150, image: '/images/IMG_2968.jpeg' },  // 135°
  { key: 'o14', delay: 2120, image: '/images/IMG_2971.jpeg' },  // 157.5°
  { key: 'o7',  delay: 2100, image: '/images/IMG_2969.jpeg' },  // 180°
  { key: 'o15', delay: 2070, image: '/images/IMG_2972.jpeg' },  // -157.5°
  { key: 'o8',  delay: 2050, image: '/images/IMG_2970.jpeg' },  // -135°
  { key: 'o16', delay: 2020, image: '/images/IMG_2974.jpeg' },  // -112.5°
]

// Gallery — full-screen overlay shown when user scrolls
// Props:
//   photos — optional object overriding frame images: { t1: '/img/1.jpg', ... }
const Gallery = ({ photos = {} }) => (
  <div className="gallery">

    <div className="save-the-date">
      <div className="save-the-date-text">Save the Date</div>
      <div className="gold-line" />
    </div>

    <div className="names">
      <div className="gold-line" />
      <div className="names-text">Minh Tường &amp; Thảo Nguyên</div>
    </div>

    {FRAMES.map(f => (
      <PhotoFrame
        key={f.key}
        frameKey={f.key}
        delay={f.delay}
        imageSrc={photos[f.key] || f.image || ''}
      />
    ))}

    {FRAMES_OUTER.map(f => (
      <PhotoFrame
        key={`outer-${f.key}`}
        frameKey={f.key}
        delay={f.delay}
        imageSrc={photos[f.key] || f.image || ''}
        outer
      />
    ))}

  </div>
)

export default Gallery
