import { useNavigate } from 'react-router-dom'

import IconSuccess from '../images/icons/icon-success-standard.svg'

const CardArtistHighlight = ({ artist, isFollowed, length, index }) => {

    const navigate = useNavigate()

    return (
        <div className={`position-relative h-xs-22 overflow-clip border-radius-04 no-shrink ${length === 1 ? 'artist-card-highlight-single' : 'artist-card-highlight-multiple'}`} onClick={() => navigate(`/artist/${artist?.slug}/leaderboard`, { state: {artist: artist} })}>
            <div className='position-relative w-100 h-inherit mb-xs-4'>
                { index &&
                <div className="position-absolute top-0 right-0 bg-black white border-radius-100 pl-xs-2 avatar-20 border-radius-100">
                    <p className="fsize-xs-1 f-w-300">{1}</p>
                </div>
                }
                <div className='overlay-card bg-dark-overlay-card z-index-1'></div>
                <img className='h-inherit w-100 object-fit-cover' src={artist.image} />
                <div className='d-flex-column position-absolute bottom-5 ml-xs-4 z-index-2'>
                    <h5 className='fsize-xs-2 mb-xs-2 f-w-500 letter-spacing-1'>{artist.artistName}</h5>
                </div>
                {isFollowed &&
                    <div className='overlay-card-followed z-index-3 bg-black-transp50 d-flex-row j-c-center align-items-center gap-0_25em h-inherit'>
                        <img src={IconSuccess} alt='Y!' />
                        <span className='t-align-center white fsize-xs-4 z-index-4'>Preferiti</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default CardArtistHighlight