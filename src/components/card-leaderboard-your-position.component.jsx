import { useLocation } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'


import { LeaderboardsContext } from '../contexts/leaderboards.context'


import IconPoints from '../images/icons/icon-points.svg'

const CardLeaderboardYourPosition = ({ currentFan, artist }) => {

    const { pathname } = useLocation()

    const {leaderboards} = useContext(LeaderboardsContext)


    const [position, setPosition] = useState()
    const [points, setPoints] = useState()

    const [scrolled, setScrolled] = useState(false)
    window.addEventListener('scroll', () => {
        if ( window.pageYOffset >= 40 ) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    })

    useEffect(() => {
        const selectedLeaderboards = leaderboards.find(leaderboard => leaderboard.artistId === artist.id)
        const selectedUser = selectedLeaderboards.leaderboard.find(user => user.userId === currentFan.id)
        setPosition(selectedUser.position)
        setPoints(selectedUser.points)
    }, [artist?.id])


    return (
        <article className={`d-flex-row align-items-center j-c-space-between w-100 position-sticky z-index-5 pr-xs-4 pl-xs-2 mb-xs-4 mt-xs-2 ${pathname.includes('flash-leaderboard') ? `${scrolled ? 'bg-black-transp50' : 'bg-dark-soft'} border-radius-100 pb-xs-2 pt-xs-2` : 'bg-dark-soft border-radius-08 pb-xs-2 pt-xs-2'}`}>
            {points > 0 ?
            <>
                <div className='d-flex-row align-items-center j-c-start no-shrink'>
                    <img className='avatar-28 border-radius-100 mr-xs-6' src={currentFan?.image} />
                    <span className='fsize-xs-2 f-w-500 grey-100 no-shrink'>La tua posizione</span>
                </div>

                <div className='d-flex-row align-items-center gap-1em'>
                    <span className='fsize-xs-5 f-w-400'>{position}°</span>

                    <div className='d-flex-row align-items-center'>
                        <div className='fsize-xs-3'>{points} </div>
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

export default CardLeaderboardYourPosition;