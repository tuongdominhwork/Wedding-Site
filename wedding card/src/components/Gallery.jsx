import PhotoFrame from './PhotoFrame'

// ── Frame config ────────────────────────────────────────────────
// key    → matches CSS class .frame-{key} (positions & sizes in main.css)
// delay  → fly-in animation delay in ms
// image  → leave empty for placeholder; fill in when you have photos
// ────────────────────────────────────────────────────────────────
const FRAMES = [
  { key: 't1', delay:   0, image: '/images/IMG_2968.jpeg' },  // top      (--angle: -90deg  in CSS)
  { key: 't2', delay:  50, image: '/images/IMG_2969.jpeg' },  // top-right (--angle: -45deg)
  { key: 'mr', delay: 100, image: '/images/IMG_2970.jpeg' },  // right     (--angle:   0deg)
  { key: 'b3', delay: 150, image: '/images/IMG_2972.jpeg' },  // btm-right (--angle:  45deg)
  { key: 'b2', delay: 200, image: '/images/IMG_3005.jpeg' },  // bottom    (--angle:  90deg)
  { key: 'b1', delay: 150, image: '/images/IMG_2974.jpeg' },  // btm-left  (--angle: 135deg)
  { key: 'ml', delay: 100, image: '/images/IMG_2971.jpeg' },  // left      (--angle: 180deg)
  { key: 't3', delay:  50, image: '/images/IMG_3006.jpeg' },  // top-left  (--angle: -135deg)
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

  </div>
)

export default Gallery
