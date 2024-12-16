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

	const [isMuted, setIsMuted] = useState(true)

	const toggleVolume = () => {
		setIsMuted(!isMuted)
	}

	return (
		<div className='d-flex-column j-c-center align-items-center overflow-all-hidden w-100'
			onMouseDown={handleDragStart}
			onMouseMove={isDragging ? handleDragMove : null}
			onMouseUp={handleDragEnd}
			onMouseLeave={isDragging ? handleDragEnd : null}
			onTouchStart={handleDragStart}
			onTouchMove={handleDragMove}
			onTouchEnd={handleDragEnd}
		>

			<div
				className='carousel-track d-flex-row align-items-center object-fit-cover w-100'
				ref={trackRef}
				style={{
				transform: `translateX(-${currentIndex * 100}%)`, 
				}}
			>
				{images.map((media, index) => (
					<div id='carousel-slide  ' key={index} className='d-flex-row j-c-center align-items-center w-min-100 h-min-100 objcet-fit-cover'>
							{media.type === 'IMAGE' ?
								<img className='w-100 objcet-fit-cover' src={media.url} />
							: media.type === 'VIDEO' ?	
							<video className='w-100  h-100 object-fit-cover' autoPlay playsInline loop muted={!isMuted}>
								<source src={media.url} type='video/mp4' />
							</video>
							: media.type === 'AUDIO'?
								<div className='w-100'>
									<AudioPost src={media.url} />
								</div>
							: <></>
							}
					</div>
				))}
				{text &&
					<p className='w-min-100 fsize-xs-8 t-align-center f-w-600 pl-xs-4 pr-xs-4 line-height-140'>{text}</p>
				}
			</div>
			{((images.length > 0 && text.length > 0) || images.length > 1 ) &&
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
			}
		</div>
	)
}

export default SwipeCarousel