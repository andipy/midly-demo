import { useState, useEffect } from 'react'
import CountdownFlashLeaderboards from './countdown-flash-leaderboards.component'

const WidgetFlashLeaderboardComplete = ({leaderboard, type, artistName, title}) => {

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
        return result
    }

    const metrics = [
        {
            id: 1,
            widgetLabel: 'STREAM GENERATI: ',
            widgetValue: streamGenerated
        },{
            id: 2,
            widgetLabel: 'FAN IN CLASSIFICA FLASH: ',
            widgetValue: numberFanFlashLeaderboards,
        },{
            id: 3,
            widgetLabel: 'ASCOLTI MEDI PER FAN: ',
            widgetValue: calcRatio(),
        }
    ]

    const formatNumber = (value) => {
        if (value < 1000) {
            if (Number.isInteger(value)) {
                return value
            } else {
                return value.toFixed(1)
            }
        } else if (value > 1000000) {
            if (Number.isInteger(value / 1000)) {
                return value/1000000 + 'M'
            } else {
                return (value/1000000).toFixed(1) + 'M'
            }
        } else {
            if (Number.isInteger(value / 1000)) {
                return value/1000 + 'K'
            } else {
                return (value/1000).toFixed(1) + 'K'
            }
        }
    }
  
  return (    
    <div className='d-flex-column position-relative align-items-start j-c-start bg-dark-gradient border-radius-1 mb-xs-3 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 gap-0_5em'>
        <img id='image' className='h-96px w-100 object-fit-cover border-radius-08 mt-xs-2' src={leaderboard.image} />
        <div id='top' className='d-flex-row j-c-space-between align-items-center w-100'>
            <div id='' className='d-flex-row align-items-center pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 mb-xs-2 mt-xs-2 ml-xs-1 bg-white-transp15 border-radius-100 w-max-content '>
                <p className='fsize-xs-1 grey-300 letter-spacing-3 lime-500'>{type}</p>    
            </div>
            <div id='' className='d-flex-row align-items-center mb-xs-2 mt-xs-2 mr-xs-2'>
                {started &&
                    <CountdownFlashLeaderboards announceStartDate={leaderboard.announceStartDate} rankStartDate={leaderboard.rankStartDate} rankEndDate={leaderboard.rankEndDate}/>
                }
            </div>
        </div>
        <div id='info'className='d-flex-column mt-xs-2'>
            <p className='fsize-xs-3 white'>{artistName} - {title}</p>
            {started && (
                <>
                {metrics?.map(metric => {
                    return (
                        <div className='mt-xs-2 d-flex-row'>
                            <p className="fsize-xs-1 grey-300 letter-spacing-3">{metric.widgetLabel}</p>
                            <div className="d-flex-row align-items-center ml-xs-2">
                                <h4 className="fsize-xs-1 letter-spacing-3 lime-500">{formatNumber(metric.widgetValue)}</h4>
                            </div>
                        </div>
                    )
                })}
                </>  
            )}
        </div>

        {!started && (
            <div className='overlay-card-followed bg-dark-soft-transp75 d-flex-column j-c-center align-items-center border-radius-1'>
                <p className='fsize-xs-2 f-w-700 white'>Classifica non ancora iniziata</p>
                <CountdownFlashLeaderboards announceStartDate={leaderboard.announceStartDate} rankStartDate={leaderboard.rankStartDate} rankEndDate={leaderboard.rankEndDate}/>
            </div>
        )}

    </div>
  )
}

export default WidgetFlashLeaderboardComplete