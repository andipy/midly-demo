import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { CurrentArtistContext } from '../contexts/currentArtist.context'
import { FlashLeaderboardsContext } from '../contexts/flash-leaderboards.context'

import IconTrophy from '../images/icons/icon-flash-leaderboard-inactive.svg'
import IllustrationTrophy from '../images/illustrations/GENERIC.png'

import Countdown from './countdown.component'
import Button from './button.component'
import CountdownFlashLeaderboards from './countdown-flash-leaderboards.component'

const CardFlashLeaderboard = () => {

    const navigate = useNavigate()
    
    const { currentArtist } = useContext(CurrentArtistContext)
    const { flashLeaderboards } = useContext(FlashLeaderboardsContext)

    const [leaderboard, setLeaderboard] = useState()

    const fetchThisLeaderboard = () => {
        const thisLeaderboard = flashLeaderboards.filter(elem => currentArtist.id === elem.artistId)
        console.log(thisLeaderboard)
        setLeaderboard(thisLeaderboard[0])
    }

    useEffect(() => {
        if ( currentArtist ) {
            fetchThisLeaderboard()
        }
    }, [currentArtist])

    const [value, setValue] = useState()

    useEffect(() => {
        const now = new Date()
        const convAnnounceStartDate = new Date(leaderboard?.announceStartDate)
        const convRankStartDate = new Date(leaderboard?.rankStartDate)
        const convRankEndDate = new Date(leaderboard?.rankEndDate)
        const updateLabel = () => {
            if (now > convAnnounceStartDate && now < convRankStartDate) {
                setValue('PENDING')
            } else if (now > convAnnounceStartDate && now < convRankEndDate) {
                setValue('ONGOING')
            } else {
                setValue('ENDED')
            }
        }

        updateLabel()
    }, [leaderboard?.announceStartDate, leaderboard?.rankStartDate, leaderboard?.rankEndDate])

    return (
        <>
            {value === 'ONGOING' ?
                <div className='bg-dark-gradient d-flex-column align-items-center j-c-center border-radius-1 pt-xs-12 pb-xs-12'>
                    <img className='w-25' src={IllustrationTrophy} />
                    <h4 className='fsize-xs-2 mb-xs-4 letter-spacing-1 f-w-300 white t-align-center mt-xs-4 line-height-140'>CLASSIFICA FLASH ATTIVA <br /> {leaderboard?.song ? "SUL BRANO:" : leaderboard?.album && "SULL'ALBUM:"}</h4>
                    <h4 className='fsize-xs-4 mb-xs-4 letter-spacing-1 f-w-500 white t-align-center mb-xs-6 w-85'>"{leaderboard?.song ? leaderboard.song.title : leaderboard?.album && leaderboard.album.title}"</h4>
                    <Button style='bg-acid-lime dark-900 border-radius-04 w-85 pl-xs-4 pr-xs-4 pt-xs-4 pb-xs-4 fsize-xs-3 f-w-600' label='Controlla la classifica' onClick={() => navigate('/artist-app/flash-leaderboard', {state: currentArtist})} />
                    <div className='w-100 d-flex-row j-c-center align-items-center mt-xs-8'>
                        <CountdownFlashLeaderboards 
                                announceStartDate={leaderboard.announceStartDate} 
                                rankStartDate={leaderboard.rankStartDate} 
                                rankEndDate={leaderboard.rankEndDate} 
                        />
                    </div>
                </div>
            : value === 'PENDING' ?
                <div className='bg-dark-gradient d-flex-column align-items-center j-c-center border-radius-1 pt-xs-20 pb-xs-20'>
                    <div className='d-flex-column align-items-center j-c-center'>
                        <img className='w-25' src={IllustrationTrophy} />
                        <h4 className='fsize-xs-3 mb-xs-4 letter-spacing-1 f-w-400 white t-align-center mt-xs-4'>CLASSIFICA FLASH APRE TRA:</h4>
                        <CountdownFlashLeaderboards 
                                announceStartDate={leaderboard.announceStartDate} 
                                rankStartDate={leaderboard.rankStartDate} 
                                rankEndDate={leaderboard.rankEndDate} 
                        />
                    </div>
                </div>

            :
                <div className='d-flex-column align-items-center j-c-center'>
                    <img className='avatar-48' src={IconTrophy} />
                    <h4 className='fsize-xs-3 mb-xs-8 letter-spacing-1 f-w-400 white t-align-center mt-xs-4 w-50'>Nessuna classifica flash al momento!</h4>
                    <div className='d-flex-column align-items-center j-c-center gap-1em'>
                        <p className='letter-spacing-1 grey-300 fsize-xs-2 t-align-center w-80'>Scrivi al team di MIDLY per attivare una classifica FLASH su un tuo brano o album:</p>
                        <a href='mailto:daniel@midly.it' className='fsize-xs-2 letter-spacing-1 f-w-400 blue-300 t-align-center'>daniel@midly.it</a>
                    </div>
                </div>
            }
        </>
    )
}

export default CardFlashLeaderboard