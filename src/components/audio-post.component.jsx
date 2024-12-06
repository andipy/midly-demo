
import { useState, useRef, useContext, useEffect } from 'react'

import { ArtistsContext } from '../contexts/artists.context'

import IconPlay from '../images/icons/icon-play-white.png'
import IconPause from '../images/icons/icon-pause-white.png'

const AudioPost = ({ src, artistId }) => {

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
    const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100
    setProgress(currentProgress)
  }

  const handleProgressClick = (e) => {
    const rect = e.target.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const newTime = (clickX / width) * audioRef.current.duration

    audioRef.current.currentTime = newTime
    setProgress((newTime / audioRef.current.duration) * 100)
  }

  const [artistImageSrc, setArtistImageSrc] = useState()

  useEffect(() => {
    const artist = artists?.find(artist => artist?.id === artistId)
    if (artist) {
        setArtistImageSrc(artist.image)
    }
  }, [artists, artistId])

  return (
    <div className="w-100 d-flex-row j-c-center align-items-center bg-black pr-xs-4 pb-xs-4 pl-xs-4 pt-xs-4 border-radius-08 gap-1em">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      
    
      <button className="avatar-20 bg-black" onClick={togglePlayPause}>
        {isPlaying ? (<img className='avatar-20' src={IconPause}/>) : (<img className='avatar-20' src={IconPlay}/>)}
      </button>

      <div
        className=""
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
          className=""
          style={{
            width: `${progress}%`,
            height: '100%',
            background: '#DAEF64',
            borderRadius: '5px',
          }}
        ></div>
        
      </div>
      <img className='avatar-36 border-radius-100' src={artistImageSrc}/>
    </div>
  )
}

export default AudioPost