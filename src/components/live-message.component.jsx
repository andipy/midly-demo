import { useEffect, useState } from 'react'
import { songs } from '../mock-data/songs'
import IconMusic from '../images/icons/icon-music.svg'
import IconMessage from '../images/icons/icon-message-color-03.svg'

const LiveMessage = ({ submittedComment }) => {

    const [liveMessage, setLiveMessage] = useState({
        type: '',
        content: ''
    })
    useEffect(() => {
        if ( submittedComment.content.length > 0 ) {
            setLiveMessage(submittedComment)
        } else {
            setLiveMessage(songs[Math.floor(Math.random() * songs.length)])  
        }
    }, [])

    const [deg, setDeg] = useState()
    useEffect(() => {
        setDeg(Math.floor(Math.random() * 360))
    }, [])

    return (
        <div className={`d-flex-row gap-0_5em position-absolute live-listening align-items-center`}>
            <img
                className='avatar-28 border-radius-100 bg-white-transp25'
                style={liveMessage.type == 'SONG' ? { transform: `rotate(${deg}deg)`} : {}}
                src={liveMessage.type == 'SONG' ? IconMusic : IconMessage}
            />
            {liveMessage.type == 'COMMENT' && <span className={`fsize-xs-2 f-w-700 color03`}>username:</span> }
            <span className="fsize-xs-2">{liveMessage.content}</span>
        </div>   
    )
}

export default LiveMessage;