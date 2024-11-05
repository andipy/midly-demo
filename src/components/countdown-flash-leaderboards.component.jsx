import { useEffect, useState } from 'react'
import IconTime from '../images/icons/icon-time.svg'

const CountdownFlashLeaderboards = ({ announceStartDate, rankStartDate, rankEndDate}) => {

    const [text, setText] = useState(null)
    const [label, setLabel] = useState('')
    const [ended, setEnded] = useState(false)
    const [targetDate, setTargetDate] = useState('')
    const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0})

    const now = new Date()

    useEffect(() => {
        const convAnnounceStartDate = new Date(announceStartDate)
        const convRankStartDate = new Date(rankStartDate)
        const convRankEndDate = new Date(rankEndDate)
        const updateLabel = () => {
        if (now > convAnnounceStartDate && now < convRankStartDate) {
            setTargetDate(rankStartDate)
            setLabel('Inizia tra: ')
        } else if (now > convAnnounceStartDate && now < convRankEndDate) {
            setTargetDate(rankEndDate)
            setLabel('Termina tra:')
        } else {
            setEnded(true)
            setLabel('Classifica flash terminata')
        }
        }

        updateLabel()
    }, [announceStartDate, rankStartDate, rankEndDate])

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
            } else {
                setEnded(true)
                setLabel('Classifica flash terminata')
                setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 })
            }
        }

        const interval = setInterval(calculateTimeRemaining, 1000)

        return () => clearInterval(interval)
    }, [targetDate])

    useEffect(() => {
        setText(label)
    }, [label])

    return (
        <div className='d-flex-row align-items-center pt-xs-1 pb-xs-1 pl-xs-1 pr-xs-2 mb-xs-2 mt-xs-2 bg-white-transp15 border-radius-100 w-max-content no-shrink'>
            <img className='avatar-28' src={IconTime} />
            
            <div className='d-flex-row gap-0_5em fsize-xs-1 no-shrink'>
                <span className='f-w-600'>{text}</span>
                { ended ? (
                    ''
                ) : (
                    <>
                        <span className='f-w-600'>{timeRemaining.days}<span className='f-w-300'>d</span></span>
                        <span className='f-w-600'>{timeRemaining.hours}<span className='f-w-300'>h</span></span>
                        <span className='f-w-600'>{timeRemaining.minutes}<span className='f-w-300'>m</span></span>
                        <span className='f-w-600'>{timeRemaining.seconds}<span className='f-w-300'>s</span></span>
                    </>
                )}
                
            </div>
        </div>
    )
}

export default CountdownFlashLeaderboards