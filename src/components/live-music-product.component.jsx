import { Link, useNavigate, useLocation } from 'react-router-dom'

import IconSpotifyGreen from '../images/icons/icon-spotify-green.svg'
import IconInfoLime from '../images/icons/icon-info-lime.svg'

const LiveMusicProduct = ({ artist, leaderboard }) => {

    const navigate = useNavigate()
    const { state } = useLocation()

    return (
        <div className='d-flex-row align-items-center j-c-space-between gap-0_5em'>
            <Link className='w-music-product d-inline-flex-row align-items-center j-c-space-between gap-0_5em bg-black-transp50 border-radius-100 pl-xs-4 pr-xs-2 pt-xs-1 pb-xs-1' to={leaderboard?.song ? leaderboard.song.url : leaderboard?.album && leaderboard.album.url} target='blank'>
                {/* <div className='avatar-14 border-radius-100 bg-red-400 position-relative'>
                    <div className='border-radius-100 bg-red-400 position-absolute-x-y flash-animation'></div>
                </div> */}
                {/* <span className='fsize-xs-2 green-spotify f-w-600'>{product.length > 10 ? product.substring(0, 10) + '...' : product} - </span> */}
                <span className='fsize-xs-2 green-spotify f-w-600 t-overflow-ellipsis overflow-hidden flex-no-wrap'>{leaderboard?.song ? leaderboard.song.title : leaderboard?.album && leaderboard.album.title}</span>
                <div className='d-flex-row align-items-center'>
                    <span className='fsize-xs-2 green-spotify f-w-600 grow-1 flex-no-wrap'>Ascoltalo su</span>
                    <img className='avatar-32 border-radius-100' src={IconSpotifyGreen} />
                </div>
            </Link>
            <div
                className='d-flex-row align-items-center j-c-center border-radius-100 avatar-40 bg-black-transp50 position-relative'
                onClick={() => navigate(`/artist/${artist?.slug}/flash-leaderboard/rewards`, { state : {...state, invokedModal: true}})}
            >
                <div className='position-absolute-x-y bg-gold-transp25 border-radius-100 z-index-1 flash-animation-badge-icon'></div>
                <img className='avatar-32 z-index-2' src={IconInfoLime} />
            </div>
        </div>
    )
}

export default LiveMusicProduct