import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from './button.component'

const MessageFlashLeaderboard = ({ state }) => {

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
        {state.artName == 'thasup' ?
            <div className="d-flex-row align-items-center j-c-space-between bg-dark-soft border-radius-100 border-red-dashed-1 pl-xs-4 pr-xs-2 pt-xs-2 pb-xs-2" onClick={() => navigate(`/artist/${state.artistSlug}/leaderboard-flash`, { state: state })}>
                <div className="d-flex-row align-items-center gap-0_5em">
                    <div className="avatar-14 border-radius-100 bg-red-400 position-relative">
                        <div className="border-radius-100 bg-red-400 position-absolute-x-y flash-animation"></div>
                    </div>
                    <p className="fsize-xs-2">Classifica FLASH live now.</p>
                </div>

                <Button style={"bg-red-400 border-radius-100 white w-auto pl-xs-4 pr-xs-4 pt-xs-2 pb-xs-2"} label="Entra" />
            </div>
        : state.artName == 'Arctic Monkeys' &&
            <div className="d-flex-row align-items-center j-c-space-between bg-dark-soft border-radius-100 border-red-dashed-1 pl-xs-2 pr-xs-2 pt-xs-2 pb-xs-2">
                <div className='d-flex-row j-c-center align-items-center pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-4 bg-white-transp15 border-radius-100 w-100'>
                    <p className="fsize-xs-2 no-shrink"><span className="f-w-600">Classifica FLASH apre tra:</span> <span className="f-w-600">18</span>h <span className="f-w-600">{minutes}</span>min <span className="f-w-600">{seconds}</span>s</p>
                </div>
            </div>
        }
        </>
    )
}

export default MessageFlashLeaderboard;