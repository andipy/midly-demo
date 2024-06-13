import React from 'react'
import { useNavigate } from 'react-router-dom'

const CardFollowedArtist = ({ artist }) => {

    const navigate = useNavigate()

    return (
        <div onClick={() => navigate(`/artist/${artist?.slug}/leaderboard`, { state : artist })} className='d-flex-row align-items-center bg-dark-gradient border-radius-1 mb-xs-3 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 gap-0_5em'>                        
                <img className='followed-artist-img object-fit-cover border-radius-1' src={artist?.image} />

                <h5 className='fsize-xs-4 f-w-500'>{artist?.artistName}</h5>

                {artist?.flashLeaderboard.status === 'ONGOING' &&
                    <div className='avatar-14 border-radius-100 bg-red-400 position-relative ml-xs-2'>
                        <div className='border-radius-100 bg-red-400 position-absolute-x-y flash-animation'></div>
                    </div>
                }
        </div>
    )
}

export default CardFollowedArtist