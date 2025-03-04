import { useState, useEffect, useRef } from "react"

const StoreImages = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const trackRef = useRef(null)
  const startX = useRef(0)
  const currentTranslate = useRef(0)
  const prevTranslate = useRef(0)

  const handleDragStart = (event) => {
    if (images?.length <= 1) return 
    setIsDragging(true)
    startX.current = event.touches ? event.touches[0].clientX : event.clientX
    currentTranslate.current = prevTranslate.current
    trackRef.current.style.transition = 'none' 
  }

  const handleDragMove = (event) => {
    if (!isDragging) return
    const currentX = event.touches ? event.touches[0].clientX : event.clientX
    const diffX = currentX - startX.current
    currentTranslate.current = prevTranslate.current + diffX
    trackRef.current.style.transform = `translateX(${currentTranslate.current}px)`
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)

    const width = trackRef.current.offsetWidth
    const movedBy = currentTranslate.current - prevTranslate.current

    let newIndex = currentIndex
    const totalSlides = images?.length

    if (movedBy < -width / 4 && currentIndex < totalSlides - 1) {
      newIndex = currentIndex + 1
    } else if (movedBy > width / 4 && currentIndex > 0) {
      newIndex = currentIndex - 1
    }

    setCurrentIndex(newIndex)
    prevTranslate.current = -newIndex * width
    trackRef.current.style.transition = 'transform 0.3s ease-out'
    trackRef.current.style.transform = `translateX(${prevTranslate.current}px)`
  }

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index)
    trackRef.current.style.transition = 'none'
    trackRef.current.style.transform = `translateX(-${index * 100}%)`
    
    setTimeout(() => {
      trackRef.current.style.transition = 'transform 0.3s ease-out'
    }, 50) 
  }

  const canSlide = images?.length > 1

  return (
    <>
      <div
        className="d-flex-column j-c-center align-items-center overflow-all-hidden w-100vw image-wrapper"
        onMouseDown={canSlide ? handleDragStart : undefined}
        onMouseMove={isDragging && canSlide ? handleDragMove : undefined}
        onMouseUp={canSlide ? handleDragEnd : undefined}
        onMouseLeave={isDragging && canSlide ? handleDragEnd : undefined}
        onTouchStart={canSlide ? handleDragStart : undefined}
        onTouchMove={isDragging && canSlide ? handleDragMove : undefined}
        onTouchEnd={canSlide ? handleDragEnd : undefined}
      >
        <div
          className="carousel-track d-flex-row align-items-center object-fit-cover w-100"
          ref={trackRef}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images?.map((media, index) => (
            <div
              id="carousel-slide"
              key={index}
              className="d-flex-row j-c-center align-items-center w-min-100 h-min-100 object-fit-cover"
              style={{
                height: '100%',
                overflow: 'hidden',
              }}
            >
              {media.type === 'IMAGE' ? (
                <img className="object-fit-cover w-100 h-100" src={media.url} alt={`Image ${index}`} />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex-row j-c-center align-items-center gap-0_5em mt-xs-4">
        {images?.map((image, index) => (
          <div
            key={index}
            className={`avatar-64 d-flex-row j-c-center align-items-center position-relative ${
              currentIndex === index ? "selected-thumbnail" : ""
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img className="avatar-64" src={image?.url} alt={`Thumbnail ${index}`} />

            {currentIndex !== index && (
              <div className="overlay-card-followed bg-dark-soft-transp75 d-flex align-items-center j-c-center z-index-2">
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default StoreImages