// PhotoFrame — a single photo frame tile in the gallery mosaic
// Props:
//   frameKey  — matches CSS class .frame-{key} (t1, t2, t3, ml, mr, b1, b2, b3)
//   delay     — animation fly-in delay in milliseconds
//   imageSrc  — optional image path; shows placeholder if omitted

const PhotoFrame = ({ frameKey, delay, imageSrc }) => (
  <div
    className={`photo-frame frame-${frameKey}`}
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
