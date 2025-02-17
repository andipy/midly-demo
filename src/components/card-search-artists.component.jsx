import { useNavigate, useLocation } from 'react-router-dom'

import IconSuccess from '../images/icons/icon-success-standard.svg'
import IconOk from '../images/icons/icon-ok.svg'
import IconUnfollow from '../images/icons/icon-unfollow.svg'

const CardArtist = ({ artist, isFollowed, isSubscribed }) => {

    const navigate = useNavigate()
    const location = useLocation()

    return (
        <div className='artist-card-multiple-row bg-dark-gradient border-radius-06 position-relative' 
            /* MAJOR CHANGES onClick={() => navigate(`/artist/${artist?.slug}/leaderboard`, { state: { artist: artist } })} */
            onClick={() => navigate(`/artist/${artist?.slug}`, { state: { artist: artist, from: location?.pathname } })}
        >
            <div className='overlay-card bg-dark-overlay-card border-radius-06 z-index-1'></div>
            <img className='artist-card-multiple-row object-fit-cover border-radius-06' src={artist.image} alt='' />
            <div className='d-flex-column position-absolute bottom-5 ml-xs-8 z-index-2'>
                <h5 className='fsize-xs-2 mb-xs-2 f-w-500 letter-spacing-1'>{artist.artistName}</h5>
            </div>

            {isFollowed && !isSubscribed &&
                <div className='overlay-card-followed border-radius-06 z-index-3 bg-black-transp50 d-flex-row j-c-center align-items-center overlay-card-followed border-radius-06 z-index-4 gap-0_25em'>
                    <div className='button-leave-leaderboard d-flex-row align-items-center j-c-center bg-dark-soft-2 border-radius-04 grey-300 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 w-auto gap-0_25em no-shrink position-absolute-x-y'>
                        <img className='avatar-16' src={IconUnfollow} />
                        <span className='fsize-xs-1 no-shrink'>Segui già</span>
                    </div>
                </div>
            }
            {isSubscribed && 
                <div className='overlay-card-followed border-radius-06 z-index-3 bg-black-transp50 d-flex-row j-c-center align-items-center overlay-card-followed border-radius-06 z-index-4 gap-0_25em'>
                    <div className='button-leave-leaderboard d-flex-row align-items-center j-c-center bg-dark-soft-2 border-radius-04 grey-300 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 w-auto gap-0_25em no-shrink position-absolute-x-y'>
                        <img className='avatar-16' src={IconOk} />
                        <span className='fsize-xs-1 no-shrink'>Sei abbonato</span>
                    </div>
                </div>
            }
        </div>
    )
}

export default CardArtist

