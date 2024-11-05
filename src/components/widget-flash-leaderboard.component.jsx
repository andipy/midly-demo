import { useState, useEffect } from 'react'
import CountdownFlashLeaderboards from './countdown-flash-leaderboards.component'
const WidgetFlashLeaderboard = ({leaderboard, type, artistName, title, onClick}) => {

  const [started, setStarted] = useState(true)

  useEffect(() => {
    const now = Date.now()
    const start = new Date(leaderboard.rankStartDate)
    setStarted(now >= start) 
  }, [leaderboard.rankStartDate])
  
  return (    
    <div className='d-flex-row position-relative align-items-center bg-dark-gradient border-radius-1 mb-xs-3 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 gap-0_5em' onClick={started ? () => onClick() : null}>
      <img className='followed-artist-img object-fit-cover border-radius-1' src={leaderboard.image} />
      <div className='d-flex-column mt-xs-2'>
        <div className='d-flex-row align-items-center pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 mb-xs-2 mt-xs-2 bg-white-transp15 border-radius-100 w-max-content '>
        <p className='fsize-xs-1 grey-300 letter-spacing-3 lime-500'>{type}</p>
        </div>
        <p className='fsize-xs-3 white'>{artistName} - {title}</p>
        {started &&
          <CountdownFlashLeaderboards announceStartDate={leaderboard.announceStartDate} rankStartDate={leaderboard.rankStartDate} rankEndDate={leaderboard.rankEndDate}/>
        }
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

export default WidgetFlashLeaderboard