import React, { useState, useRef, useEffect } from 'react'

const AudioPlayer = ({ src, startTime }) => {
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

  /* const handleSeek = (e) => {
    const seekTo = (e.target.value / 100) * audioRef.current.duration
    audioRef.current.currentTime = seekTo
  } */

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = startTime
    }
  }, [startTime])

  return (
    <div className="d-flex-column j-c-center align-items-center">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="">
        <button className={`bg-acid-lime black font-body avatar-60  border-radius-100 ${isPlaying ? 'floating-shadow' : ''}`} onClick={togglePlayPause}>
            <span className="fsize-xs-3 f-w-500">
                {isPlaying ? 'Pause' : 'Play'}
            </span>
        </button>
        {/* <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
        /> */}
      </div>
    </div>
  )
}

export default AudioPlayer