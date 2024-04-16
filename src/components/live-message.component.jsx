import { useEffect, useState } from 'react'
import { songs } from '../mock-data/songs'
import IconMusic from '../images/icons/icon-music.svg'
import IconMessage from '../images/icons/icon-message-color-03.svg'

const LiveMessage = ({ message }) => {

    const [deg, setDeg] = useState()
    useEffect(() => {
        setDeg(Math.floor(Math.random() * 360))
    }, [])

    return (
        <div className='d-flex-row gap-0_5em align-items-start'>
            <div className='d-flex-row gap-0_25em align-items-center'>
                <img
                    className='avatar-28 border-radius-100 bg-white-transp25'
                    style={message.type == 'SONG' ? { transform: `rotate(${deg}deg)`} : {}}
                    src={message.type == 'SONG' ? IconMusic : IconMessage}
                />
                {message.type == 'COMMENT' && <span className={`fsize-xs-2 f-w-700 color03`}>username:</span>}
            </div>
            <span className="fsize-xs-2 mt-xs-1_5">{message.content}</span>
        </div>   
    )
}

export default LiveMessage;