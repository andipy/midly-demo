import React, { useState, useRef } from "react"

const SwipeCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0) 
  const [isDragging, setIsDragging] = useState(false) 
  const trackRef = useRef(null) 
  const startX = useRef(0) 
  const currentTranslate = useRef(0) 
  const prevTranslate = useRef(0) 

  const handleDragStart = (event) => {
    setIsDragging(true)
    startX.current = event.touches ? event.touches[0].clientX : event.clientX
    currentTranslate.current = prevTranslate.current
    trackRef.current.style.transition = "none" 
  }

  const handleDragMove = (event) => {
    if (!isDragging) return

    const currentX = event.touches
      ? event.touches[0].clientX
      : event.clientX
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

    if (movedBy < -width / 2 && currentIndex < images.length - 1) {
      newIndex = currentIndex + 1
    } else if (movedBy > width / 2 && currentIndex > 0) {
      newIndex = currentIndex - 1
    }

    setCurrentIndex(newIndex)

    prevTranslate.current = -newIndex * width
    trackRef.current.style.transition = "transform 0.3s ease-out" // Animazione di ritorno
    trackRef.current.style.transform = `translateX(${prevTranslate.current}px)`
  }

  return (
    <div className=" d-flex-column w-100  position-relative h-100 j-c-center align-items-center">
    
    <div
      className="w-100 overflow-all-hidden position-relative h-100"
      onMouseDown={handleDragStart}
      onMouseMove={isDragging ? handleDragMove : null}
      onMouseUp={handleDragEnd}
      onMouseLeave={isDragging ? handleDragEnd : null}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      <div
        className="carousel-track d-flex-row h-100"
        ref={trackRef}
        style={{
          transform: `translateX(-${currentIndex * 101}%)`, 
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="carousel-slide h-100"
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>
      
    </div>
    {
        images.length === 1 ? (
            <></>
        ) : (
            <div className="d-flex-row justify-center mt-xs-2 gap-0_25em">
            {images.map((_, index) => (
            <div
                key={index}
                className={`indicator avatar-8 border-radius-100 ${index === currentIndex ? "active" : ""}`}
            ></div>
            ))}
            </div>
        )
    }
    
  </div>
  )
}

export default SwipeCarousel