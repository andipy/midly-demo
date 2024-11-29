import React, { useState, useRef, useEffect } from 'react'
import IconSpeaker from '../images/icons/icon-speaker.png'

const AudioPlayer = ({ src, startTime, userIsPlaying }) => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [progress, setProgress] = useState(0)
	const audioRef = useRef(null)

	const togglePlayPause = () => {
		if ( userIsPlaying ) {
			if (isPlaying) {
				audioRef.current.pause()
			} else {
				audioRef.current.play()
			}
			setIsPlaying(!isPlaying)
		}
	}

	const handleTimeUpdate = () => {
		const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100
		setProgress(currentProgress)

		if (audioRef.current.currentTime >= startTime+30) {
			audioRef.current.pause()
			setIsPlaying(false)
		}
	}

	useEffect(() => {
		if (startTime) {
			if (audioRef.current) {
				audioRef.current.currentTime = startTime
			}
		} else {
			audioRef.current.currentTime = 0
		}
	}, [startTime])

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.currentTime = startTime
		}
	}, [startTime])

	return (
		<div className="d-flex-column j-c-center align-items-center position-relative">
			{/* <div className='position-absolute-x-y flash-animation'></div> */}
			<audio
				ref={audioRef}
				src={src}
				onTimeUpdate={handleTimeUpdate}
				onEnded={() => setIsPlaying(false)}
			/>

			<button className={`bg-acid-lime black font-body avatar-40 border-radius-100 ${isPlaying ? 'floating-shadow' : ''}`} onClick={togglePlayPause}>
				<img src={IconSpeaker}></img>
			</button>
		</div>
	)
}

export default AudioPlayer