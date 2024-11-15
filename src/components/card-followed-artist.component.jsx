import React from 'react'
import { useNavigate } from 'react-router-dom'

const CardFollowedArtist = ({ artist }) => {

    const navigate = useNavigate()

    const statusConvert = {
        'ONGOING' : 'Classifica flash attiva',
        'PENDING' : 'Classifica flash apre tra poco',
        'CLOSED_VISIBLE': 'Classifica flash terminata'
    }

    return (
        <div onClick={() => navigate(`/artist/${artist?.slug}/leaderboard`, { state : artist })} className='d-flex-row align-items-center bg-dark-gradient border-radius-1 mb-xs-3 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 gap-0_5em'>                        
                <img className='followed-artist-img object-fit-cover border-radius-1' src={artist?.image} />
                <div className='d-flex-col'>
                    <div className='mb-xs-2 d-flex-row'>
                    <h5 className='fsize-xs-4 f-w-500 no-shrink'>{artist?.artistName}</h5>
                    </div>
                    <div className='d-flex-row align-items-center pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 mb-xs-2 mt-xs-2 bg-white-transp15 border-radius-100 w-max-content '>
                        <p className='fsize-xs-0 letter-spacing-1 lime-400'>{statusConvert[artist.flashLeaderboard.status]}</p>
                    </div>
                </div>

                

                {/* {artist?.flashLeaderboard.status === 'ONGOING' &&
                    <div className='avatar-14 border-radius-100 bg-red-400 position-relative ml-xs-2'>
                        <div className='border-radius-100 bg-red-400 position-absolute-x-y flash-animation'></div>
                    </div>
                } */}
        </div>
    )
}

export default CardFollowedArtist