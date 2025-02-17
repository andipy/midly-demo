import { useState, useRef, useContext, useEffect } from 'react'
import IconPlay from '../images/icons/icon-play.svg'
import IconPause from '../images/icons/icon-pause.svg'
function AudioComponent({message}) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const audioRef = useRef(null)
    const [duration, setDuration] = useState(0)
    const [timeElapsed, setTimeElapsed] = useState('0:00')
    const [timeRemaining, setTimeRemaining] = useState('0:00')

    // Gestione della riproduzione
    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    const handleTimeUpdate = () => {
        const audio = audioRef.current
        if (!audio || !duration) return

        const currentTime = audio.currentTime
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

    const formatTime = (seconds) => {
        const roundedSeconds = Math.round(seconds)
        const minutes = Math.floor(roundedSeconds / 60)
        const remainingSeconds = roundedSeconds % 60
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
    }

    const handleLoadedMetadata = () => {
        const audio = audioRef.current
        if (audio) {
            const audioDuration = audio.duration
            if (audioDuration === Infinity || isNaN(audioDuration)) {
                setDuration(0)
            } else {
                setDuration(audioDuration)
                setTimeRemaining(formatTime(audioDuration))
            }
        }
    }

    const handleLoadedData = () => {
        const audio = audioRef.current
        if (audio) {
            const audioDuration = audio.duration
            if (audioDuration !== Infinity && !isNaN(audioDuration)) {
                setDuration(audioDuration)
                setTimeRemaining(formatTime(audioDuration))
            }
        }
    }

    const handleCanPlayThrough = () => {
        const audio = audioRef.current
        if (audio) {
            const audioDuration = audio.duration
            if (audioDuration !== Infinity && !isNaN(audioDuration)) {
                setDuration(audioDuration)
                setTimeRemaining(formatTime(audioDuration))
            }
        }
    }

    const handlePlay = () => {
        // Dopo aver iniziato la riproduzione, avviare il calcolo del progresso
        handleTimeUpdate()
    }

    useEffect(() => {
        if (message.type === 'AUDIO') {
            const audio = audioRef.current
            if (audio) {
                audio.addEventListener('loadedmetadata', handleLoadedMetadata)
                audio.addEventListener('loadeddata', handleLoadedData)
                audio.addEventListener('canplaythrough', handleCanPlayThrough)
                audio.addEventListener('play', handlePlay)

                return () => {
                    audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
                    audio.removeEventListener('loadeddata', handleLoadedData)
                    audio.removeEventListener('canplaythrough', handleCanPlayThrough)
                    audio.removeEventListener('play', handlePlay)
                }
            }
        }
    }, [message.content])

    useEffect(() => {
        if (isPlaying && audioRef.current) {
            const intervalId = setInterval(() => {
                handleTimeUpdate() // Assicura che venga chiamato anche durante la riproduzione
            }, 1000)

            return () => clearInterval(intervalId) // Pulisce l'intervallo quando non è più necessario
        }
    }, [isPlaying])
  return (
    <div className='d-flex-row j-c-center align-items-center w-100 gap-0_25em'>
        <div className='w-100 d-flex-row j-c-center align-items-center'>
            <div className="avatar-24 bg-white border-radius-100 d-flex-row j-c-center align-items-center" onClick={togglePlayPause}>
            {isPlaying ? (<img className='avatar-16' src={IconPause}/>) : (<img className='avatar-16' src={IconPlay}/>)}
            </div>
        </div>
        <div className="d-flex-column j-c-center align-items-center border-radius-02 w-100">
            <audio
                ref={audioRef}
                src={message.content}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
            >
                <source src={message.content} type="audio/mp3" />
                <source src={message.content.replace('.mp3', '.wav')} type="audio/wav" />
            </audio>
                
            

            <div
                onClick={handleProgressClick}
                style={{
                width: '200px',
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
        </div>
        
    </div>
  )
}

export default AudioComponent