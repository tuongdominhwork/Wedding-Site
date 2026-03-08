// PhotoFrame — a single photo frame tile in the gallery orbit
// Props:
//   frameKey — matches CSS class .frame-{key} (for sizing rules)
//   imageSrc — optional image path
//   outer    — true for outer counter-clockwise ring (lazy loading)
// All animations (orbit rotation, fade-in) are driven by GSAP in Gallery.jsx

const PhotoFrame = ({ frameKey, imageSrc, outer = false }) => (
  <div className={`photo-frame frame-${frameKey}`} style={{ opacity: 0 }}>
    {imageSrc ? (
      <img src={imageSrc} alt="" loading={outer ? 'lazy' : 'eager'} decoding="async" />
    ) : (
      <>
        <div className="photo-placeholder-icon">✦</div>
        <div className="photo-placeholder-label">Photo</div>
      </>
    )}
  </div>
)

export default PhotoFrame


