import { useNavigate, useLocation } from 'react-router-dom'

import IconOk from '../images/icons/icon-ok.svg'
import IconUnfollow from '../images/icons/icon-unfollow.svg'

const CardArtistWithFanclub = ({ artist, isFollowed, isSubscribed, length, index }) => {

    const navigate = useNavigate()
    const location = useLocation()

    return (
        <div className={`position-relative h-xs-30 overflow-clip border-radius-04 no-shrink ${length === 1 ? 'artist-card-highlight-single' : 'artist-card-highlight-multiple'}`} 
           /* MAJOR CHANGES  onClick={() => navigate(`/artist/${artist?.slug}/leaderboard`, { state: {artist: artist} })} */
           onClick={() => navigate(`/artist/${artist?.slug}`, { state: {artist: artist, from: location?.pathname} })}
        >
            <div className='position-relative w-100 h-inherit mb-xs-4'>
                {index &&
                <div className="position-absolute top-0 right-0 bg-black white border-radius-100 pl-xs-2 avatar-20 border-radius-100">
                    <p className="fsize-xs-1 f-w-300">{1}</p>
                </div>
                }
                <div className='overlay-card bg-dark-overlay-card z-index-1'></div>
                <img className='h-inherit w-100 object-fit-cover' src={artist.image} />
                <div className='d-flex-column position-absolute bottom-5 ml-xs-4 z-index-2'>
                    <h5 className='fsize-xs-2 mb-xs-2 f-w-500 letter-spacing-1'>{artist.artistName}</h5>
                </div>
                {isFollowed && !isSubscribed &&
                    <div className='overlay-card-followed z-index-3 bg-black-transp50 d-flex-row j-c-center align-items-center gap-0_25em h-inherit'>
                        <div className='button-leave-leaderboard d-flex-row align-items-center j-c-center bg-dark-soft-2 border-radius-04 grey-300 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 w-auto gap-0_25em no-shrink position-absolute-x-y'>
                            <img className='avatar-16' src={IconUnfollow} />
                            <span className='fsize-xs-1'>Segui già</span>
                        </div>
                    </div>
                }
                {isSubscribed &&
                    <div className='overlay-card-followed z-index-3 bg-black-transp50 d-flex-row j-c-center align-items-center gap-0_25em h-inherit'>
                        <div className='button-leave-leaderboard d-flex-row align-items-center j-c-center bg-dark-soft-2 border-radius-04 grey-300 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 w-auto gap-0_25em no-shrink position-absolute-x-y'>
                            <img className='avatar-16' src={IconOk} />
                            <span className='fsize-xs-1'>Sei abbonato</span>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default CardArtistWithFanclub