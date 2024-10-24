import { useNavigate } from 'react-router-dom'

import IconSuccess from "../images/icons/icon-success-standard.svg";


const CardArtist = ({ artist, isFollowed }) => {

    const navigate = useNavigate()

    return (
        <a className='mr-xs-2' href={''} onClick={() => navigate(`/artist/${artist?.slug}/leaderboard`, { state : artist })}>
            <div className='artist-card-multiple-row bg-dark-gradient border-radius-06 position-relative'>
                <div className='overlay-card bg-dark-overlay-card border-radius-06 z-index-1'></div>
                <img className='artist-card-multiple-row object-fit-cover border-radius-06' src={artist.image} alt=""/>
                <div className='d-flex-column position-absolute bottom-5 ml-xs-8 z-index-2'>
                    <h5 className='fsize-xs-2 mb-xs-2 f-w-500 letter-spacing-1'>{artist.artistName}</h5>
                </div>

                {isFollowed && 
                    <>
                    <div className="overlay-card-followed border-radius-06  z-index-3 bg-grey-transp50">
                    </div>
                    <div className="d-flex-row j-c-center align-items-center overlay-card-followed border-radius-06 z-index-4">
                        <p className='t-align-center white fsize-xs-4 z-index-4'>
                            Preferiti
                        </p>
                        <img src={IconSuccess} alt=""></img>
                    </div>
                    </>
                }
            </div>
        </a>
    )
}

export default CardArtist;

