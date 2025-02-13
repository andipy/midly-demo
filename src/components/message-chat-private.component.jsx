/* import AudioPost from "./audio-post.component"
 */
import { useState, useRef, useContext, useEffect } from 'react'

import { ArtistsContext } from '../contexts/artists.context'

import IconPlay from '../images/icons/icon-play.svg'
import IconPause from '../images/icons/icon-pause.svg'
const MessageChatPrivate = ({message, currentUserId}) => {

    
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
    
        const currentTime = audio?.currentTime;

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

    const [duration, setDuration] = useState(0)

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
    
        useEffect(() => {
        if (message.type === 'AUDIO') {
            const audio = audioRef.current
            if (audio) {
        
                audio.addEventListener('loadedmetadata', handleLoadedMetadata)
                audio.addEventListener('loadeddata', handleLoadedData)
                audio.addEventListener('canplaythrough', handleCanPlayThrough)
        
                return () => {
                audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
                audio.removeEventListener('loadeddata', handleLoadedData)
                audio.removeEventListener('canplaythrough', handleCanPlayThrough)
                }
            }
        }
        
        }, [message.content])
    return (
      <>
      {message?.userId === currentUserId ?
            <div className="d-flex-column j-c-center align-items-end mb-xs-4 ">
            <div className="bg-dark-soft-2 border-radius-08 pt-xs-2 pb-xs-2 pl-xs-4 pr-xs-4 ml-xs-20"> 
                {
                    message.type === 'AUDIO' ?
                    <div className='d-flex-row j-c-center align-items-center w-100 gap-0_5em'>
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
                
                        {/* <div className='w-100 d-flex-row j-c-space-between align-items-center mb-xs-4'>
                            <p className='fsize-xs-0 f-w-300'>{timeElapsed}</p>
                            <p className='fsize-xs-0 f-w-300'>-{timeRemaining}</p>
                        </div> */}
                        </div>
                        <div className='w-100 d-flex-row j-c-center align-items-center'>
                            <div className="avatar-24 bg-white border-radius-100 d-flex-row j-c-center align-items-center" onClick={togglePlayPause}>
                            {isPlaying ? (<img className='avatar-16' src={IconPause}/>) : (<img className='avatar-16' src={IconPlay}/>)}
                            </div>
                        </div>
                    </div>
                    :
                    <p className="t-align-start">{message.content}</p>
                }
            </div>
            
            </div>
      :
      <>
      <div className="d-flex-row j-c-start align-items-end mb-xs-4">
          {message?.userImage ? 
              <img
                  src={message?.userImage}
                  className='avatar-28 border-radius-100'
              />
          : 
              <div className='avatar-28 position-relative'>
                  <div className='d-flex-row j-c-center align-items-center avatar-28 border-radius-100 bg-purple-400'>
                      <h5 className='f-w-500 fsize-xs-6'>
                          {message?.username.charAt(0).toUpperCase()}
                      </h5>
                  </div>
              </div>
                          
          }
          <div className="bg-dark-gradient border-radius-08 pt-xs-2 pb-xs-2 pl-xs-4 pr-xs-4 ml-xs-2 mr-xs-20"> 
              {
                message.type === 'AUDIO' ?
                <div className='d-flex-row j-c-start align-items-center w-100 gap-0_5em'>
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
                                width: '170px',
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
                
                        {/* <div className='w-100 d-flex-row j-c-space-between align-items-center mb-xs-4'>
                            <p className='fsize-xs-0 f-w-300'>{timeElapsed}</p>
                            <p className='fsize-xs-0 f-w-300'>-{timeRemaining}</p>
                        </div> */}
                        </div>
                        
                    </div>
                :
                <p className="t-align-start">{message.content}</p>
              }
          </div>
      </div>
      </>
      }
      </>
      
    )
  }
  
  export default MessageChatPrivate