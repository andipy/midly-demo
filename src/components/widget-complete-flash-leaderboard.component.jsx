import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CountdownFlashLeaderboards from './countdown-flash-leaderboards.component'

const WidgetFlashLeaderboardComplete = ({leaderboard, type, artistName, title}) => {

  const navigate = useNavigate()
  
    const [started, setStarted] = useState()

    useEffect(() => {
        const calculateTimeRemaining = () => {
            const now = Date.now()
            const start = new Date(leaderboard.rankStartDate)
            const startParsed = start.getTime()
            setStarted(now >= startParsed)
        }
        const interval = setInterval(calculateTimeRemaining, 1000)
        return () => clearInterval(interval)
    }, [leaderboard.rankStartDate])

    const numberFanFlashLeaderboards = leaderboard.participants
    const streamGenerated = leaderboard.totalStreams

    const calcRatio = () => {
        const result = streamGenerated / numberFanFlashLeaderboards
        const rounded = Math.round(result * 10) / 10
        return rounded
    }

    const metrics = [
        {
            id: 1,
            widgetLabel: `STREAM ${type === 'ALBUM' ? "SULL'ALBUM:" : 'SUL BRANO:'}`,
            widgetValue: streamGenerated
        },{
            id: 2,
            widgetLabel: 'FAN IN CLASSIFICA FLASH:',
            widgetValue: numberFanFlashLeaderboards,
        },{
            id: 3,
            widgetLabel: 'ASCOLTI MEDI PER FAN:',
            widgetValue: calcRatio(),
        }
    ]

    const formatNumber = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'")
    }
  
    return (    
        <div className='d-flex-column position-relative align-items-start j-c-start bg-dark-gradient border-radius-1 mb-xs-3 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 gap-0_5em'>
            <div className='position-relative w-100 h-96px'>
                <img className='h-96px w-100 object-fit-cover border-radius-08' src={leaderboard.image} />
                <div className='d-flex-row align-items-center pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 ml-xs-1 bg-black-transp70 border-radius-100 w-max-content position-absolute bottom-0 left-0 ml-xs-2 mb-xs-2'>
                    <p className='fsize-xs-1 f-w-500 grey-100 letter-spacing-2'>{type}</p>    
                </div>
            </div>
            <div className='d-flex-column'>
                <p className='fsize-xs-3 f-w-500 white'>{title} - {artistName}</p>
                {started &&
                    <>
                        {metrics?.map(metric => {
                            return (
                                <div className='mt-xs-4 d-flex-row'>
                                    <p className='fsize-xs-1 grey-100 letter-spacing-1 no-shrink'>{metric.widgetLabel}</p>
                                    <div className='d-flex-row align-items-center ml-xs-2'>
                                        <span className='fsize-xs-2 grey-100'>{formatNumber(metric.widgetValue)}</span>
                                    </div>
                                </div>
                            )
                        })}
                        {type === 'ALBUM' &&
                            <div
                                onClick={() => navigate('/flash-leaderboards-dashboard/flash-leaderboard-metrics-detail', { state: { leaderboardId: leaderboard.id, artistName: artistName } })}
                            >
                                <p className='lime-400 text-underline w-100 mt-xs-4 mb-xs-4'>Vedi split ascolti per brano →</p>
                            </div>
                        }
                        <div className='d-flex-row align-items-center mb-xs-2 mt-xs-2 mr-xs-2'>
                            <CountdownFlashLeaderboards announceStartDate={leaderboard.announceStartDate} rankStartDate={leaderboard.rankStartDate} rankEndDate={leaderboard.rankEndDate}/>
                        </div>
                    </>
                }
                {!started &&
                    <CountdownFlashLeaderboards announceStartDate={leaderboard.announceStartDate} rankStartDate={leaderboard.rankStartDate} rankEndDate={leaderboard.rankEndDate}/>
                }
            </div>
        </div>
    )
}

export default WidgetFlashLeaderboardComplete