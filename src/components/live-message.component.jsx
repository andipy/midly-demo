import { useEffect, useState } from 'react'
import IconMusic from '../images/icons/icon-music.svg'
import IconMessage from '../images/icons/icon-message-color-03.svg'
import IconVerifiedArtist from '../images/icons/icon-verified-artist.svg'

const LiveMessage = ({ message }) => {

    const [deg, setDeg] = useState()
    useEffect(() => {
        setDeg(Math.floor(Math.random() * 360))
    }, [])

    return (
        <div className='d-flex-row gap-0_5em align-items-start'>
            <div className={`d-flex-row gap-0_25em align-items-center no-shrink ${message.user_type == 'artist' && 'bg-acid-lime border-radius-100 px-xs-1 pl-xs-1 pt-xs-1 pb-xs-1'}`}>
                {message.type == 'SONG' &&
                    <img
                        className='avatar-24 border-radius-100 bg-white-transp25'
                        style={{ transform: `rotate(${deg}deg)`}}
                        src={IconMusic}
                    />
                }
                {message.type == 'COMMENT' && message.user_type == 'fan' &&
                    <img
                        className='avatar-28 border-radius-100 bg-white-transp25'
                        src={IconMessage}
                    />
                }
                {message.type == 'COMMENT' && message.user_type == 'artist' &&
                    <img
                        className='avatar-16 border-radius-100 bg-white-transp25'
                        src={IconVerifiedArtist}
                    />
                }
                {message.type == 'COMMENT' && message.user_type == 'fan' &&
                    <span className={`fsize-xs-2 f-w-700 color03`}>username:</span>
                }
                {message.type == 'COMMENT' && message.user_type == 'artist' &&
                    <span className={`fsize-xs-2 f-w-700 black no-shrink`}>thasup:</span>
                }
            </div>
            <span className={`fsize-xs-2 ${message.user_type == 'fan' ? 'mt-xs-1_5' : 'mt-xs-1'}`}>{message.content}</span>
        </div>   
    )
}

export default LiveMessage;