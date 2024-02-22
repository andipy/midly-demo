import { Link, useNavigate, useLocation } from "react-router-dom"

import IconSpotifyWhite from '../images/icons/icon-spotify.svg'
import IconPrize from '../images/icons/icon-prize.svg'

const LiveMusicProduct = () => {

    const navigate = useNavigate()
    const { state } = useLocation()

    return (
        <div className="d-flex-row align-items-center j-c-space-between gap-0_5em">
            <Link className="d-inline-flex-row align-items-center gap-0_5em bg-black-transp50 border-radius-100 border-green-spotify pl-xs-4 pr-xs-2 pt-xs-2 pb-xs-2" to='https://open.spotify.com/intl-it/track/5Hjy8lyZ4h99OjrW8jzPQ8' target='blank'>
                <div className="avatar-14 border-radius-100 bg-red-400 position-relative">
                    <div className="border-radius-100 bg-red-400 position-absolute-x-y flash-animation"></div>
                </div>
                <span className="fsize-xs-1 f-w-600">Titolo del bra... - </span>
                <span className="fsize-xs-2 green-spotify f-w-600 grow-1">Ascoltalo su</span>
                <img className="avatar-28 border-radius-100 bg-green-spotify" src={IconSpotifyWhite} />
            </Link>
            <div
                    className="d-flex-row align-items-center j-c-center border-radius-100 avatar-40 bg-purple-400-op-75"
                    onClick={() => navigate(`/artist/${state.artistSlug}/leaderboard-flash/rewards`, { state : {...state, invokedModal: true}})}
            >
                <img className="avatar-28" src={IconPrize} alt="" />
            </div>
        </div>
    )
}

export default LiveMusicProduct;