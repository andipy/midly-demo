import { useContext, useState, useEffect } from "react"
import { useOutletContext, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { CurrentArtistContext } from "../contexts/currentArtist.context"
import { FlashLeaderboardsContext } from '../contexts/flash-leaderboards.context'

import Container from '../layout/container.layout'

import Button from "../components/button.component"
import IllustrationTrophy from '../images/illustrations/GENERIC.png'
import IconRightDark from '../images/icons/icon-arrowright-dark.svg'

const FanclubFlashLeaderboardStatus = () => {
    const {artist, handlePopUp} = useOutletContext()
    const navigate = useNavigate()
    const {currentArtist} = useContext(CurrentArtistContext)
    const location = useLocation()

    const { flashLeaderboards } = useContext(FlashLeaderboardsContext)
    
    const matchingLeaderboard = flashLeaderboards.find(lb => lb.artistId === artist?.id)


    const [targetDate, setTargetDate] = useState('')
    const [timeRemaining, setTimeRemaining] = useState({ 
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    const now = new Date()

    useEffect(() => {
        const convAnnounceStartDate = new Date(matchingLeaderboard.announceStartDate)
        const convRankStartDate = new Date(matchingLeaderboard.rankStartDate)
        const convRankEndDate = new Date(matchingLeaderboard.rankEndDate)
        const updateLabel = () => {
            if (now > convAnnounceStartDate && now < convRankStartDate) {
                setTargetDate(matchingLeaderboard.rankStartDate)
            } else if (now > convAnnounceStartDate && now < convRankEndDate) {
                setTargetDate(matchingLeaderboard.rankEndDate)
            }
        }

        updateLabel()
    }, [matchingLeaderboard.announceStartDate, matchingLeaderboard.rankStartDate, matchingLeaderboard.rankEndDate])

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
    <>
    {artist.flashLeaderboard.status === 'PENDING' &&
        <div
            className={` pb-xs-4 pt-xs-4 pr-xs-4 pl-xs-4  mb-xs-4 mt-xs-4 bg-dark-soft-2 d-flex-column j-c-center align-items-center border-radius-08`}
        >
                <img className='avatar-80' src={IllustrationTrophy} />
                <h4 className='fsize-xs-4 mb-xs-4 letter-spacing-1 f-w-300 line-height-140 white t-align-center mt-xs-4 w-80'>Sta per uscire {matchingLeaderboard.album ? matchingLeaderboard.album.title : matchingLeaderboard.song.title} il nuovo {matchingLeaderboard.album ? 'album' : 'brano'} di {artist.artistName}! {matchingLeaderboard.announceMessage}</h4>
                <div className='d-flex-row j-c-center gap-0_5em fsize-xs-2 no-shrink bg-brand-gradient pt-xs-4 pb-xs-4 border-radius-04 w-100'>
                    <span className='f-w-600 black fsize-xs-4'>SI ATTIVA TRA </span>
                    {timeRemaining.days > 0 &&
                        <span className='f-w-600 black fsize-xs-4'>{timeRemaining.days}<span className='f-w-300'>G</span></span>
                    }
                    {timeRemaining.hours > 0 &&
                        <span className='f-w-600 black fsize-xs-4'>{timeRemaining.hours}<span className='f-w-300'>H</span></span>
                    }
                    {timeRemaining.minutes > 0 &&
                        <span className='f-w-600 black fsize-xs-4'>{timeRemaining.minutes}<span className='f-w-300'>M</span></span>
                    }
                    {timeRemaining.seconds > 0 &&
                        <span className='f-w-600 black fsize-xs-4'>{timeRemaining.seconds}<span className='f-w-300'>S</span></span>
                    }
                </div>
                <Button
                    style='bg-dark-soft border-lime lime-400 border-radius-04 fsize-xs-3 f-w-500 mt-xs-4 z-index-6'
                    label="COS'È UNA CLASSIFICA FLASH?"
                    onClick={() => navigate('/flash-leaderboard-explanation')}
                />
            {/* <div className={`bg-brand-gradient w-100 position-sticky bottom-0 z-index-999 `} >
                <Container style={`d-flex-column align-items-center j-c-center overflow-all-hidden z-index-6 `}>
                    <h4 className='fsize-xs-3 f-w-500 black'>CLASSIFICA FLASH SI ATTIVA TRA:</h4>
                    <div className='d-flex-row j-c-center gap-0_5em fsize-xs-3 no-shrink mt-xs-4 border-radius-04 w-100'>
                        {timeRemaining.days > 0 &&
                            <span className='f-w-600 black'>{timeRemaining.days}<span className='f-w-300'>G</span></span>
                        }
                        {timeRemaining.hours > 0 &&
                            <span className='f-w-600 black'>{timeRemaining.hours}<span className='f-w-300'>H</span></span>
                        }
                        {timeRemaining.minutes > 0 &&
                            <span className='f-w-600 black'>{timeRemaining.minutes}<span className='f-w-300'>M</span></span>
                        }
                        {timeRemaining.seconds > 0 &&
                            <span className='f-w-600 black'>{timeRemaining.seconds}<span className='f-w-300'>S</span></span>
                        }
                    </div>
                </Container>
            </div> */}
        </div>
    }
    {artist.flashLeaderboard.status === 'ONGOING' &&
        <div className={` pb-xs-4 pt-xs-4 pr-xs-4 pl-xs-4  mb-xs-4 mt-xs-4 bg-dark-soft-2 d-flex-column j-c-center align-items-center border-radius-08`}>

            
                <img className='avatar-80' src={IllustrationTrophy} />
                <h4 className='fsize-xs-4 letter-spacing-1 f-w-300 line-height-140 white t-align-center mt-xs-4 mb-xs-4'>La classifica flash di "<span className='lime-400 f-w-500'>{matchingLeaderboard.album ? matchingLeaderboard.album.title : matchingLeaderboard.song.title}</span>" è attiva: ascolta {matchingLeaderboard.album ? 'i brani' : 'il brano'} e competi nella classifica dei super fan di {artist.artistName}.</h4>

                <Button
                    style='bg-acid-lime fsize-xs-3 f-w-500 black mt-xs-2 mb-xs-2'
                    label="ENTRA →"
                    onClick={() => navigate(`/artist/${artist.slug}/flash-leaderboard`, { state: artist })}
                />

                <div className='d-flex-row j-c-center gap-0_5em fsize-xs-3 no-shrink pt-xs-4 border-radius-04 w-100'>
                    <span className='f-w-600 white'>TERMINA TRA: </span>
                    {timeRemaining.days > 0 &&
                        <span className='f-w-600 white'>{timeRemaining.days}<span className='f-w-300'>D</span></span>
                    }
                    {timeRemaining.hours > 0 &&
                        <span className='f-w-600 white'>{timeRemaining.hours}<span className='f-w-300'>H</span></span>
                    }
                    {timeRemaining.minutes > 0 &&
                        <span className='f-w-600 white'>{timeRemaining.minutes}<span className='f-w-300'>M</span></span>
                    }
                    {timeRemaining.seconds > 0 &&
                        <span className='f-w-600 white'>{timeRemaining.seconds}<span className='f-w-300'>S</span></span>
                    }
                </div>

            {/* <div className={`bg-brand-gradient w-100 position-sticky bottom-0 z-index-999 ${lowerModalCompressed ? 'compress-down' : 'expand-down pt-xs-6 pb-xs-6'}`} onClick={toggleModalContent}>
                <Container style={'d-flex-row align-items-center j-c-space-between'}>
                        <div className='d-flex-row align-items-center gap-0_5em'>
                            <img src={IconThunderBlack} />
                            <h4 className='fsize-xs-4 f-w-500 black'>CLASSIFICA FLASH ATTIVA</h4>
                        </div>
                        <img className='avatar-24 bg-white border-radius-100' src={IconRightDark} alt='GO!' />
                </Container>
            </div> */}
        </div>
    }
    {artist.flashLeaderboard.status === 'CLOSED_VISIBLE' &&
        <div className={` pb-xs-4 pt-xs-4 pr-xs-4 pl-xs-4  mb-xs-4 mt-xs-4 bg-dark-soft-2 d-flex-column j-c-center align-items-center border-radius-08`}>

                <img className='avatar-80' src={IllustrationTrophy} />
                <h4 className='fsize-xs-4 letter-spacing-1 f-w-300 line-height-140 white t-align-center mt-xs-4 mb-xs-4'>La classifica flash di "<span className='lime-400 f-w-500'>{matchingLeaderboard.album ? matchingLeaderboard.album.title : matchingLeaderboard.song.title}</span>" è terminata: vedi i risultati.</h4>

                <Button
                    style='bg-acid-lime black border-radius-04 fsize-xs-3 f-w-500 z-index-6 mb-xs-4'
                    label="CLASSIFICA FLASH TERMINATA →"
                    onClick={() => navigate(`/artist/${artist.slug}/flash-leaderboard`, { state: artist })}
                />

        </div>
    }
    </>
  )
}

export default FanclubFlashLeaderboardStatus