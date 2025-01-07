import { useState, useEffect } from 'react'
import IconTime from '../images/icons/icon-time.svg'

const CountdownConcert = ({date}) => {
    const [text, setText] = useState(null)
    // const [label, setLabel] = useState('')
    const [ended, setEnded] = useState(false)
    const [targetDate, setTargetDate] = useState('')
    const [timeRemaining, setTimeRemaining] = useState({ 
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    const now = new Date()

    useEffect(() => {
        if ( date ) {
            const [day, month, year] = date.split('-')
            const formattedDate = `${year}-${month}-${day}`
            const founddate = new Date(formattedDate)
            const updateLabel = () => {
                if (now < founddate ) {
                    setTargetDate(founddate)
                    //setLabel('Il live inizia tra: ')
                } 
            }
            updateLabel()
        }
    }, [date])

    useEffect(() => {
        const calculateTimeRemaining = () => {
            const now = new Date()
            const difference = new Date(targetDate) - now

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24))
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((difference % (1000 * 60)) / 1000)
                setTimeRemaining({ days, hours, minutes, seconds })
            }
        }

        const interval = setInterval(calculateTimeRemaining, 1000)

        return () => clearInterval(interval)
    }, [targetDate])

    // useEffect(() => {
    //     setText(label)
    // }, [label])

    return (
        <div className='d-grid-countdown align-items-center gap-0_5em'>
            {/* <span className='f-w-600'>{text}</span> */}
            {!ended &&
                <>
                    {timeRemaining.days > 0 &&
                        <div className='d-inline-flex-row j-c-center align-items-start gap-0_25em'>
                            {timeRemaining.days
                                .toString()
                                .padStart(2, '0')
                                .split('')
                                .map((digit, index) => (
                                    <p
                                        key={index}
                                        className='f-w-400 bg-white-transp15 fsize-xs-8 pt-xs-4 pb-xs-4 pl-xs-10 pr-xs-10 no-shrink border-radius-03'
                                    >
                                        {digit}
                                    </p>
                                ))}
                        </div>
                    }
                    <p className='f-w-400 fsize-xs-8'>:</p>
                    {timeRemaining.days > 0 &&
                        <div className='d-inline-flex-row j-c-center align-items-start gap-0_25em'>
                            {timeRemaining.hours
                                .toString()
                                .padStart(2, '0')
                                .split('')
                                .map((digit, index) => (
                                    <p
                                        key={index}
                                        className='f-w-400 bg-white-transp15 fsize-xs-8 pt-xs-4 pb-xs-4 pl-xs-10 pr-xs-10 no-shrink border-radius-03'
                                    >
                                        {digit}
                                    </p>
                                ))}
                        </div>
                    }
                    <p className='f-w-400 fsize-xs-8'>:</p>
                    {timeRemaining.hours > 0 &&
                        <div className='d-inline-flex-row j-c-center align-items-start gap-0_25em'>
                            {timeRemaining.minutes
                                .toString()
                                .padStart(2, '0')
                                .split('')
                                .map((digit, index) => (
                                    <p
                                        key={index}
                                        className='f-w-400 bg-white-transp15 fsize-xs-8 pt-xs-4 pb-xs-4 pl-xs-10 pr-xs-10 no-shrink border-radius-03'
                                    >
                                        {digit}
                                    </p>
                                ))}
                        </div>
                    }
                    <p className='f-w-400 fsize-xs-8'>:</p>
                    {timeRemaining.minutes > 0 &&
                        <div className='d-inline-flex-row j-c-center align-items-start gap-0_25em'>
                            {timeRemaining.seconds
                                .toString()
                                .padStart(2, '0')
                                .split('')
                                .map((digit, index) => (
                                    <p
                                        key={index}
                                        className='f-w-400 bg-white-transp15 fsize-xs-8 pt-xs-4 pb-xs-4 pl-xs-10 pr-xs-10 no-shrink border-radius-03'
                                    >
                                        {digit}
                                    </p>
                                ))}
                        </div>
                    }
                    <span>giorni</span>
                    <span></span>
                    <span>ore</span>
                    <span></span>
                    <span>minuti</span>
                    <span></span>
                    <span>secondi</span>
                </>
            }
        </div>
    )
}

export default CountdownConcert