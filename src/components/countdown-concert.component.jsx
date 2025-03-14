import { useState, useEffect } from 'react'
import IconTime from '../images/icons/icon-time.svg'

const CountdownConcert = ({date}) => {
    const [text, setText] = useState(null)
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


    return (
        <div className={`d-flex-row align-items-center pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 mb-xs-2 mt-xs-2 bg-dark-soft-2 border-radius-100 w-max-content no-shrink ${ended ? 'pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4' : ''}`}>
            <p className='fsize-xs-2 f-w-300 '>
                Prossima tappa tra:
            </p>
            <div className='d-flex-row j-c-center align-items-center'>
                {!ended &&
                    <img className='avatar-28' src={IconTime} />
                }

                <div className='d-flex-row gap-0_5em fsize-xs-1 no-shrink'>
                    {!ended &&
                        <>
                            {timeRemaining.days !== 0 &&
                                <span className='f-w-600'>{timeRemaining.days}<span className='f-w-300'>d</span></span>
                            }
                            {timeRemaining.hours !== 0 &&
                                <span className='f-w-600'>{timeRemaining.hours}<span className='f-w-300'>h</span></span>
                            }
                            {timeRemaining.minutes !== 0 &&
                                <span className='f-w-600'>{timeRemaining.minutes}<span className='f-w-300'>m</span></span>
                            }
                            {timeRemaining.seconds !== 0 &&
                                <span className='f-w-600'>{timeRemaining.seconds}<span className='f-w-300'>s</span></span>
                            }
                        </>
                    }
                </div>
            </div>
            
        </div>
    )
}

export default CountdownConcert