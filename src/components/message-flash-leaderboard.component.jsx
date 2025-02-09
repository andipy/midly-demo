import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from './button.component'

import IconRightDark from '../images/icons/icon-arrowright-dark.svg'

const MessageFlashLeaderboard = ({ artist }) => {

    const navigate = useNavigate()
    
    const [seconds, setSeconds] = useState(59)
    useEffect(() => {
        setTimeout(() => {
            if (seconds > 0) {
                setSeconds(prev => prev -1)
            } else {
                setSeconds(59)
            }
        }, 1000)    
    }, [seconds])
    const [minutes, setMinutes] = useState(37)
    useEffect(() => {
        setTimeout(() => {
            if (minutes < 0) {
                setMinutes(prev => prev -1)
            } else {
                setMinutes(59)
            }
        }, 60000)
    }, [minutes])

    return (
        <>
        {/* {artist?.flashLeaderboard.status === 'ONGOING' &&
            <div className='d-flex-row align-items-center j-c-space-between bg-dark-soft border-radius-100 border-lime-1 pl-xs-4 pr-xs-1 pt-xs-1 pb-xs-1 mb-xs-4' onClick={() => navigate(`/artist/${artist.slug}/flash-leaderboard`, { state: artist })}>
                <div className='d-flex-row align-items-center gap-0_5em'>
                    <div className='avatar-14 border-radius-100 bg-acid-lime position-relative'>
                        <div className='border-radius-100 bg-acid-lime position-absolute-x-y flash-animation'></div>
                    </div>
                    <p className='fsize-xs-1'>CLASSIFICA FLASH ATTIVA</p>
                </div>

                <Button style={'button-flash-leaderboard-live d-flex-row align-items-center j-c-center bg-acid-lime border-radius-100 black w-auto pl-xs-4 pr-xs-4 pt-xs-2 pb-xs-2 fsize-xs-1 f-w-600'} label='ENTRA' />
            </div>
        } */}
        {/* {artist.flashLeaderboard.status === 'ONGOING' &&
            <div className={`bg-brand-gradient pl-xs-6 pr-xs-6 pt-xs-4 pb-xs-4 border-radius-06`} onClick={() => navigate(`/artist/${artist.slug}/flash-leaderboard`, { state: artist })}>
                <p className='fsize-xs-4 f-w-600 black'>CLASSIFICA FLASH ATTIVA</p>

                <Button style='bg-dark lime-400 fsize-xs-3 f-w-600 dark-900 letter-spacing-1' label='ENTRA →' />
            </div>
        } */}
        {/* {artist.flashLeaderboard.status === 'PENDING' &&
            <div className='d-flex-row align-items-center j-c-space-between bg-dark-soft border-radius-100 border-lime-1 pl-xs-1 pr-xs-1 pt-xs-1 pb-xs-1 mb-xs-4'>
                <div className='d-flex-row j-c-center align-items-center pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 bg-white-transp15 border-radius-100 w-100'>
                    <p className='fsize-xs-2 no-shrink'><span className='f-w-600'>CLASSIFICA FLASH →</span> <span className='f-w-600'>18</span>h <span className='f-w-600'>{minutes}</span>min <span className='f-w-600'>{seconds}</span>s</p>
                </div>
            </div>
        } */}
        {artist.flashLeaderboard.status === 'CLOSED_VISIBLE' &&
            <div className='d-flex-row align-items-center j-c-space-between bg-brand-gradient border-radius-100 pl-xs-4 pr-xs-2 pt-xs-2 pb-xs-2' onClick={() => navigate(`/artist/${artist.slug}/flash-leaderboard`, { state: artist })}>
                <p className='fsize-xs-2 black f-w-600'>CLASSIFICA FLASH TERMINATA</p>
                <img className='avatar-24 bg-white border-radius-100' src={IconRightDark} alt='GO!' />
            </div>
        }
        </>
    )
}

export default MessageFlashLeaderboard