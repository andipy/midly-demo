import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import IconTime from '../images/icons/icon-time.svg'

const Countdown = ({ flashLeadeboardStatus }) => {

    const location = useLocation()

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

    const [text, setText] = useState(null)

    useEffect(() => {
        console.log("Status:", flashLeadeboardStatus);
        switch ( flashLeadeboardStatus ) {
            case 'PENDING':
                setText('')
                break
            case 'ONGOING':
                setText('Termina tra:')
                break
            default:
                setText('Time left:')
                break
        }
    }, [flashLeadeboardStatus])

    return (
        <div className='d-flex-row align-items-center pt-xs-1 pb-xs-1 pl-xs-1 pr-xs-2 mb-xs-2 mt-xs-2 bg-white-transp15 border-radius-100 w-max-content no-shrink'>
            <img className='avatar-28' src={IconTime} />
            
            <div className='d-flex-row gap-0_5em fsize-xs-2 no-shrink'
            >
                <span className='f-w-600'>{text}</span>
                <span className='f-w-600'>1<span className='f-w-300'>d</span></span>
                <span className='f-w-600'>23<span className='f-w-300'>h</span></span>
                <span className='f-w-600'>{minutes}<span className='f-w-300'>m</span></span>
                <span className='f-w-600'>{seconds}<span className='f-w-300'>s</span></span>
            </div>
        </div>
    )
}

export default Countdown;