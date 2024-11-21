import { useNavigate } from 'react-router-dom'

import IconSuccess from '../images/icons/icon-success-standard.svg';


const CardArtistHighlight = ({ artist, isFollowed, length }) => {

    const navigate = useNavigate()

    return (
        <>
            {length === 1 ? (
            <div className='mr-xs-2 position-relative w-100 h-xs-20' onClick={() => navigate(`/artist/${artist?.slug}/leaderboard`, { state: artist })}>
                <div className='position-relative w-100 h-xs-20 mb-xs-4'>
                    <img className='h-inherit w-100 object-fit-cover border-radius-08' src={artist.image} />
                    <div className='d-flex-column position-absolute bottom-5 ml-xs-8 z-index-2'>
                        <h5 className='fsize-xs-2 mb-xs-2 f-w-500 letter-spacing-1'>{artist.artistName}</h5>
                    </div>
                    {isFollowed && (
                        <div className='overlay-card-followed border-radius-06 z-index-3 bg-grey-transp50 d-flex-row j-c-center align-items-center gap-0_25em'>
                            <img src={IconSuccess} alt='Y!' />
                            <span className='t-align-center white fsize-xs-4 z-index-4'>Preferiti</span>
                        </div>
                    )}
                </div>
            </div>
            ) : (
                <div className='mr-xs-2 position-relative w-80 h-xs-20' onClick={() => navigate(`/artist/${artist?.slug}/leaderboard`, { state: artist })}>
                    <div className='object-fit-cover artist-card-multiple-row bg-dark-gradient border-radius-06 position-relative w-80 h-xs-20'>
                        <div className='h-xs-20 w-80 overlay-card bg-dark-overlay-card border-radius-06 z-index-1'></div>
                        <img
                            className='artist-card-multiple-row h-xs-20 w-80 object-fit-cover border-radius-06'
                            src={artist.image}
                            alt=''
                        />
                        <div className='d-flex-column position-absolute bottom-5 ml-xs-8 z-index-2'>
                            <h5 className='fsize-xs-2 mb-xs-2 f-w-500 letter-spacing-1'>{artist.artistName}</h5>
                        </div>
    
                        {isFollowed && (
                            <div className='overlay-card-followed border-radius-06 z-index-3 bg-grey-transp50 d-flex-row j-c-center align-items-center gap-0_25em'>
                                <img src={IconSuccess} alt='Y!' />
                                <span className='t-align-center white fsize-xs-4 z-index-4'>Preferiti</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default CardArtistHighlight