import { useLocation } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'

import { FlashLeaderboardsContext } from '../contexts/flash-leaderboards.context'
import IconPoints from '../images/icons/icon-points.svg'

const CardFlashLeaderboardYourPosition = ({ currentFan, artist }) => {

    const { pathname } = useLocation()

    const { flashLeaderboards } = useContext(FlashLeaderboardsContext)


    const [currentUserInLeaderboard, setCurrentUserInLeaderboard] = useState({
        points: undefined,
        position: undefined,
        image: undefined
    })

    const [scrolled, setScrolled] = useState(false)
    window.addEventListener('scroll', () => {
        if ( window.pageYOffset >= 40 ) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    })

    useEffect(() => {
        const thisLeaderboard = flashLeaderboards.find(leaderboard => leaderboard.artistId === artist.id).leaderboard

        const thisUser = thisLeaderboard.find(user => user.userId === currentFan.id)
        if ( thisUser ) {
            setCurrentUserInLeaderboard(prev => ({
                ...prev,
                points: thisUser.points,
                position: thisLeaderboard.indexOf(thisUser) + 1,
                image: thisUser.image
            }))
        }

    }, [])

    return (
        <article className={`d-flex-row align-items-center j-c-space-between w-100 position-sticky z-index-5 pr-xs-4 pl-xs-2 mb-xs-4 mt-xs-2 ${pathname.includes('flash-leaderboard') ? `${scrolled ? 'bg-black-transp50' : 'bg-dark-soft'} border-radius-100 pb-xs-2 pt-xs-2` : 'bg-dark-soft border-radius-08 pb-xs-2 pt-xs-2'}`}>
            {currentUserInLeaderboard.points > 0 ?
            <>
                <div className='d-flex-row align-items-center j-c-start no-shrink'>
                    <img className='avatar-28 border-radius-100 mr-xs-6' src={currentUserInLeaderboard?.image} />
                    <span className='fsize-xs-2 f-w-500 grey-100 no-shrink'>La tua posizione</span>
                </div>

                <div className='d-flex-row align-items-center gap-1em'>
                    <span className='fsize-xs-5 f-w-400'>{currentUserInLeaderboard.position}°</span>

                    <div className='d-flex-row align-items-center'>
                        <div className='fsize-xs-3'>{currentUserInLeaderboard.points} </div>
                        <img className='avatar-16 ml-xs-2' src={IconPoints} alt='points' />
                    </div>
                </div>
            </>
            :
            <p className='fsize-xs-2 f-w-400 grey-200 '>Guadagna il tuo primo punto per posizionarti nella classifica dell'artista!</p>
            }
        </article>
    )
}

export default CardFlashLeaderboardYourPosition