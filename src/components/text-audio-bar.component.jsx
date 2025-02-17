
import { useLocation } from 'react-router-dom'

import IconArrowUp from '../images/icons/icon-arrow-up.svg'
import IconMic from '../images/icons/icon-mic-black.png'
import IconStop from '../images/icons/icon-stop-black.svg'
import IconExit from '../images/icons/icon-exit-black.svg'
import AudioComponent from './audio.component'


const TextAudioBar = ({ currentComment, handleCurrentComment, handleSubmitComment, onClick, className, toggleRecordingAudio, recordingAudio, elapsedTime, handleSubmitAudio, clear }) => {
    const { pathname } = useLocation()
  return (
    <section className={`text-bar-live-chat ${className}`}>
        <div
            className='container d-flex-row align-items-center j-c-end gap-1em'
        >
            {
                recordingAudio ?
                <div className="recording-indicator d-flex-row align-items-center gap-05em">
                    <span className="recording-dot"></span>
                    <span className="recording-time">
                        {String(elapsedTime.minutes).padStart(2, '0')}:
                        {String(elapsedTime.seconds).padStart(2, '0')}
                    </span>
                </div>
                : 
                    (currentComment.type === 'AUDIO' && currentComment.content) ?
                    <AudioComponent message={currentComment} />
                    :
                    <input
                        className={``} 
                        type='text'
                        name='user-message'
                        placeholder={
                            pathname.includes('concert') ?
                            "Messaggio"
                            : !pathname.includes('artist-app') ?
                                'Lascia un messaggio'
                            :
                                'Chatta con i tuoi fan'
                        }
                        onChange={(e) => handleCurrentComment(e)}
                        value={currentComment.content}
                        onClick={onClick}
                    />
            }
            {
                recordingAudio ?
                    <button className='chat-button d-flex-row align-items-center j-c-center bg-acid-lime no-shrink' onClick={toggleRecordingAudio}><img className='avatar-20' src={IconStop} /></button>
                :
                (currentComment.type === 'AUDIO' && currentComment.content) ?
                    <>
                        <button className='chat-button d-flex-row align-items-center j-c-center bg-acid-lime no-shrink' onClick={clear}><img className='avatar-20' src={IconExit} /></button>
                        <button className='chat-button d-flex-row align-items-center j-c-center bg-acid-lime no-shrink' onClick={handleSubmitAudio}><img className='avatar-20' src={IconArrowUp} /></button>
                    </>

                :
                    <>
                        <button className='chat-button d-flex-row align-items-center j-c-center bg-acid-lime no-shrink' onClick={(e) => handleSubmitComment(e, currentComment)}><img className='avatar-20' src={IconArrowUp} /></button>
                        <button className='chat-button d-flex-row align-items-center j-c-center bg-acid-lime no-shrink' onClick={toggleRecordingAudio}><img className='avatar-20' src={IconMic} /></button>
                    </>

            }     
            
        </div> 
                  
    </section>
  )
}

export default TextAudioBar