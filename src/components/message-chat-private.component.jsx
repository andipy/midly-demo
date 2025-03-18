import { useState, useRef, useEffect } from 'react'
import IconPlay from '../images/icons/icon-play.svg'
import IconPause from '../images/icons/icon-pause.svg'

const MessageChatPrivate = ({ message, currentUserId }) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [timeElapsed, setTimeElapsed] = useState('0:00')
    const [timeRemaining, setTimeRemaining] = useState('0:00')

    const audioRef = useRef(null)
    const togglePlayPause = () => {
        if (!audioRef.current) return
        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }

        setIsPlaying(!isPlaying)
    }

    const handleProgressClick = (e) => {
        const rect = e.target.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const newTime = (clickX / rect.width) * audioRef.current.duration

        audioRef.current.currentTime = newTime
        setProgress((newTime / audioRef.current.duration) * 100)
    }

    const updateProgress = () => {

        const currentTime = audioRef.current.currentTime
        let duration = message?.duration || 0
  
        setProgress((currentTime / duration) * 100)
        setTimeElapsed(formatTime(currentTime))
        setTimeRemaining(formatTime(duration - currentTime))

    }


    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = Math.round(seconds % 60)
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
    }

    const handleLoadedMetadata = () => {
        const audio = audioRef.current
        if (audio) {
            setTimeRemaining(formatTime(audio.duration))
        }
    }

    const handleEnded = () => {
        setIsPlaying(false)
        setProgress(0)
        setTimeElapsed('0:00')
        setTimeRemaining(formatTime(audioRef.current.duration))
    }

    const formatTimeFromCreatedAt = (createdAt) => {
        const date = new Date(createdAt)
        const hours = date.getHours()
        const minutes = date.getMinutes()
        return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`
    }

    return (
        <>
            {message?.userId === currentUserId ? (
                <div className="d-flex-column j-c-center align-items-end mb-xs-4">
                    <div className="bg-dark-soft-2 border-radius-08 pt-xs-2 pb-xs-2 pl-xs-4 pr-xs-4 ml-xs-20">
                        {message.type === 'AUDIO' ? (
                            <div className='d-flex-row j-c-center align-items-center w-100 gap-0_5em'>
                                <audio
                                    ref={audioRef}
                                    src={message.content}
                                    onLoadedMetadata={handleLoadedMetadata}
                                    onEnded={handleEnded}
                                    onTimeUpdate={updateProgress}
                                />
                                <div className="avatar-24 bg-white border-radius-100 d-flex-row j-c-center align-items-center" onClick={togglePlayPause}>
                                    <img className='avatar-16' src={isPlaying ? IconPause : IconPlay} />
                                </div>
                                <div onClick={handleProgressClick} style={progressBarStyle}>
                                    <div style={{ ...progressFillStyle, width: `${progress}%` }} />
                                </div>
                            </div>
                        ) : (
                            <p className="t-align-start">{message.content}</p>
                        )}
                    </div>
                    <div className="d-flex-row j-c-center align-items-center mt-xs-1">
                        <p className="message-time">{formatTimeFromCreatedAt(message.createdAt)}</p>
                    </div>
                </div>
            ) : (
                <div className="d-flex-row j-c-start align-items-end mb-xs-4">
                    {message?.userImage ? (
                        <img src={message?.userImage} className='avatar-28 border-radius-100 mb-xs-8' />
                    ) : (
                        <div className='avatar-28 position-relative'>
                            <div className='d-flex-row j-c-center align-items-center avatar-28 border-radius-100 bg-purple-400 mb-xs-8'>
                                <h5 className='f-w-500 fsize-xs-6'>
                                    {message?.username.charAt(0).toUpperCase()}
                                </h5>
                            </div>
                        </div>
                    )}
                    <div className='d-flex-column j-c-start align-items-start w-100'>
                        <div className="bg-dark-gradient border-radius-08 pt-xs-2 pb-xs-2 pl-xs-4 pr-xs-4 ml-xs-2 mr-xs-20">
                            {message.type === 'AUDIO' ? (
                                <div className='d-flex-row j-c-start align-items-center w-100 gap-0_5em'>
                                    <audio
                                        ref={audioRef}
                                        src={message.content}
                                        onLoadedMetadata={handleLoadedMetadata}
                                        onEnded={handleEnded}
                                        onTimeUpdate={updateProgress}
                                    />
                                    <div className="avatar-24 bg-white border-radius-100 d-flex-row j-c-center align-items-center" onClick={togglePlayPause}>
                                        <img className='avatar-16' src={isPlaying ? IconPause : IconPlay} />
                                    </div>
                                    <div onClick={handleProgressClick} style={progressBarStyle}>
                                        <div style={{ ...progressFillStyle, width: `${progress}%` }} />
                                    </div>
                                </div>
                            ) : (
                                <p className="t-align-start">{message.content}</p>
                            )}
                        </div>
                        
                        <div className="d-flex-row justify-content-start align-items-center mt-xs-1">
                            <p className="message-time">{formatTimeFromCreatedAt(message.createdAt)}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

const progressBarStyle = {
    width: '200px',
    height: '5px',
    background: '#ccc',
    borderRadius: '5px',
    cursor: 'pointer',
}

const progressFillStyle = {
    height: '100%',
    background: '#DAEF64',
    borderRadius: '5px',
}

export default MessageChatPrivate