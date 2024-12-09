import React, { useState, useRef } from 'react'
import IconSpeaker from '../images/icons/icon-speaker.png'
import AudioPost from '../components/audio-post.component'

const SwipeCarousel = ({ images, text }) => {

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
		trackRef.current.style.transition = 'none' 
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
		const totalSlides = text ? images.length + 1 : images.length

		if (movedBy < -width / 2 && currentIndex < totalSlides - 1) {
		newIndex = currentIndex + 1
		} else if (movedBy > width / 2 && currentIndex > 0) {
		newIndex = currentIndex - 1
		}

		setCurrentIndex(newIndex)

		prevTranslate.current = -newIndex * width
		trackRef.current.style.transition = 'transform 0.3s ease-out'
		trackRef.current.style.transform = `translateX(${prevTranslate.current}px)`
	}

	const isImage = (media) => {
        if (media.type === 'IMAGE') {
            return true
        } else {
            return false
        }
    }
      
    const isAudio = (media) => {
        if (media.type === 'AUDIO') {
            return true
        } else {
            return false
        }
    }

    const isVideo = (media) => {
        if (media.type === 'VIDEO') {
            return true
        } else {
            return false
        }
    }

	const [isMuted, setIsMuted] = useState(true)

	const toggleVolume = () => {
		setIsMuted(!isMuted)
	}

	return (
		<div className='d-flex-column w-100  position-relative h-100 j-c-center align-items-center'>
		
		<div
			className='w-100 overflow-all-hidden position-relative h-100 '
			onMouseDown={handleDragStart}
			onMouseMove={isDragging ? handleDragMove : null}
			onMouseUp={handleDragEnd}
			onMouseLeave={isDragging ? handleDragEnd : null}
			onTouchStart={handleDragStart}
			onTouchMove={handleDragMove}
			onTouchEnd={handleDragEnd}
		>
		<div
			className='carousel-track d-flex-row align-items-center h-100 w-100 '
			ref={trackRef}
			style={{
			transform: `translateX(-${currentIndex * 100}%)`, 
			}}
		>
			{images.map((media, index) => (
			<div
				key={index}
				className='carousel-slide h-100 overflow-all-hidden w-100 d-flex-row j-c-center align-items-center'>
				{isImage(media) ?
					<div className='w-100'>
						<img className='w-100 h-100' src={media.url} />
					</div>
				:
					null
				}
				
				{isVideo(media) ?
					<>
						{/* <div className='avatar-16 border-radius-100 position-absolute bottom-2 right-0 bg-white z-index-999 mr-xs-2'>
							<button className={`bg-acid-lime black font-body avatar-16 border-radius-100 `} onClick={toggleVolume}>
							<img className='avatar-12' src={IconSpeaker}></img>
							</button>
						</div> */}
						<div className='w-100 position-relative'>
							<video className='w-100' autoPlay playsInline loop muted={!isMuted}>
							<source src={media.url} type='video/mp4' />
							</video>
						</div>
					</>
				:
					null
				}
				{isAudio(media) ?
					<div className='w-100 h-100 position-relative'>
						<AudioPost src={media.url} />
					</div>
				:
					null
				}
			</div>
			))}
			{
			text && (
				<div
				className='carousel-slide h-100 bg-black d-flex-row j-c-center align-items-center pr-xs-2 pl-xs-2'>
				<p className='fsize-xs-8 t-align-center f-w-600'>{text}</p>
				</div>
			)
			}
		</div>
		
		</div>
		{
			(images.length === 1 && text === '') ? (
				<></>
			) : (
			<div className='d-flex-row justify-center mt-xs-2 gap-0_25em'>
				{[...images, ...(text && text !== '' ? [text] : [])].map((_, index) => (
				<div
					key={index}
					className={`indicator avatar-6 border-radius-100 ${
					index === currentIndex ? 'active' : ''
					}`}
				></div>
				))}
			</div>
			)
		}
		
	</div>
	)
}

export default SwipeCarousel