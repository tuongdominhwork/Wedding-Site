// PhotoFrame — a single photo frame tile in the gallery mosaic
// Props:
//   frameKey  — matches CSS class .frame-{key} (t1, t2, t3, ml, mr, b1, b2, b3, o1–o8)
//   delay     — animation fly-in delay in milliseconds
//   imageSrc  — optional image path; shows placeholder if omitted
//   outer     — set true for the outer counter-clockwise ring

const PhotoFrame = ({ frameKey, delay, imageSrc, outer = false }) => (
  <div
    className={`photo-frame${outer ? ' photo-frame-outer' : ''} frame-${frameKey}`}
    style={{ '--delay': `${delay}ms` }}
  >
    {imageSrc ? (
      <img src={imageSrc} alt="" />
    ) : (
      <>
        <div className="photo-placeholder-icon">✦</div>
        <div className="photo-placeholder-label">Photo</div>
      </>
    )}
  </div>
)

export default PhotoFrame
