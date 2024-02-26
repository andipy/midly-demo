import { useLocation } from 'react-router-dom'
import { useState } from 'react'

import IconPoints from '../images/icons/icon-point-xs.svg'

const CardLeaderboardYourPosition = ({ currentFanPosition, currentFanPoints, currentFanImage, onClick }) => {

    const { pathname } = useLocation()

    const [scrolled, setScrolled] = useState(false)
    window.addEventListener("scroll", () => {
        if ( window.pageYOffset >= 40 ) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    })

    return (
        <article className={`d-flex-row align-items-center j-c-space-between w-100 position-sticky z-index-5 pr-xs-4 pl-xs-4 mb-xs-4 mt-xs-2 ${pathname.includes('leaderboard-flash') ? `${scrolled ? 'bg-black-transp50' : 'bg-dark-soft'} border-radius-100 pb-xs-3 pt-xs-3` : 'bg-dark-soft border-radius-08 pb-xs-3 pt-xs-3'}`} onClick={onClick}>
            {currentFanPoints > 0 ?
            <>
                <div className="d-flex-row align-items-center j-c-start no-shrink">
                    <img className="avatar-28 border-radius-100 mr-xs-6" src={currentFanImage} />
                    <span className="fsize-xs-2 f-w-500 grey-100 no-shrink">La tua posizione</span>
                </div>

                <div className="d-flex-row align-items-center gap-1em">
                    <span className="fsize-xs-5 f-w-400">{currentFanPosition}°</span>

                    <div className="d-flex-row align-items-center">
                        <div className="fsize-xs-3">{currentFanPoints} </div>
                        <img className="avatar-12 ml-xs-2" src={IconPoints} alt="points" />
                    </div>
                </div>
            </>
            :
            <p className="fsize-xs-2 f-w-400 grey-200 ">Guadagna il tuo primo punto per posizionarti nella classifica dell'artista!</p>
            }
        </article>
    )
}

export default CardLeaderboardYourPosition;