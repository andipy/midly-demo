import { useEffect, useState } from 'react'
import IconTime from '../images/icons/icon-time.svg'

const Countdown = () => {

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
    const [minutes, setMinutes] = useState(7)
    useEffect(() => {
        setTimeout(() => {
            if (minutes >= 0) {
                setMinutes(prev => prev -1)
            } else {
                setMinutes(59)
            }
        }, 60000)    
    }, [minutes])

    return (
        <div className='d-flex-row align-items-center pt-xs-1 pb-xs-1 pl-xs-1 pr-xs-2 mb-xs-2 mt-xs-2 bg-white-transp15 border-radius-100 w-max-content'>
            <img className='avatar-28' src={IconTime} />
            <p className="fsize-xs-2 no-shrink"><span className="f-w-600">Time left:</span> <span className="f-w-600">1</span>day <span className="f-w-600">23</span>h <span className="f-w-600">{minutes}</span>min <span className="f-w-600">{seconds}</span>s</p>
        </div>
    )
}

export default Countdown;