
import { useState, useRef, useContext, useEffect } from 'react'

import { ArtistsContext } from '../contexts/artists.context'

import IconPlay from '../images/icons/icon-play.svg'
import IconPause from '../images/icons/icon-pause.svg'

const AudioPost = ({ src }) => {

	const { artists } = useContext(ArtistsContext)

	const [isPlaying, setIsPlaying] = useState(false)
	const [progress, setProgress] = useState(0)
	const audioRef = useRef(null)


	const togglePlayPause = () => {
		if (isPlaying) {
		audioRef.current.pause()
		} else {
		audioRef.current.play()
		}
		setIsPlaying(!isPlaying)
	}

	const handleTimeUpdate = () => {
		const audio = audioRef?.current;
		console.log(audio)
		const currentTime = audio?.currentTime;
		const duration = audio?.duration
		if (!audio || !duration) return
		setTimeElapsed(formatTime(currentTime))
		const remainingTime = duration - currentTime
		setTimeRemaining(formatTime(remainingTime))
		const currentProgress = (currentTime / duration) * 100
		setProgress(currentProgress || 0)
	}

	const handleProgressClick = (e) => {
		const rect = e.target.getBoundingClientRect()
		const clickX = e.clientX - rect.left
		const width = rect.width
		const newTime = (clickX / width) * audioRef.current.duration

		audioRef.current.currentTime = newTime
		setProgress((newTime / audioRef.current.duration) * 100)
	}

	const [timeElapsed, setTimeElapsed] = useState('0:00')
	const [timeRemaining, setTimeRemaining] = useState('0:00')

	const formatTime = (seconds) => {
		const roundedSeconds = Math.round(seconds)
		const minutes = Math.floor(roundedSeconds / 60)
		const remainingSeconds = roundedSeconds % 60
		return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
	}

	return (
		<div className="d-flex-column j-c-end align-items-center pr-xs-4 pb-xs-4 pl-xs-4 pt-xs-4 border-radius-02 w-100">
			<audio
				ref={audioRef}
				src={src}
				onTimeUpdate={handleTimeUpdate}
				onEnded={() => setIsPlaying(false)}
			>
				<source src={src} type="audio/mp3" />
				<source src={src.replace('.mp3', '.wav')} type="audio/wav" />
			</audio>
				
			

			<div
				onClick={handleProgressClick}
				style={{
				position: 'relative',
				width: '100%',
				height: '5px',
				background: '#ccc',
				borderRadius: '5px',
				cursor: 'pointer',
				}}
			>
				<div
					style={{
						width: `${progress}%`,
						height: '100%',
						background: '#DAEF64',
						borderRadius: '5px',
					}}
				></div>
			</div>

			<div className='w-100 d-flex-row j-c-space-between align-items-center mb-xs-4'>
				<p className='fsize-xs-0 f-w-300'>{timeElapsed}</p>
				<p className='fsize-xs-0 f-w-300'>-{timeRemaining}</p>
			</div>
			<div className='w-100 d-flex-row j-c-center align-items-center'>
				<div className="avatar-36 bg-white border-radius-100 d-flex-row j-c-center align-items-center" onClick={togglePlayPause}>
				{isPlaying ? (<img className='avatar-20' src={IconPause}/>) : (<img className='avatar-20' src={IconPlay}/>)}
				</div>
			</div>
		</div>
	)
}

export default AudioPost