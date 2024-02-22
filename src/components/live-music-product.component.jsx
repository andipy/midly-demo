import { Link } from "react-router-dom"

import IconSpotifyWhite from '../images/icons/icon-spotify.svg'

const LiveMusicProduct = () => {
    return (
        <div className="d-flex-row align-items-center j-c-space-between gap-0_5em">
            <div className="d-inline-flex-row align-items-center gap-0_5em bg-black-transp50 border-radius-100 border-red-dashed-1 pl-xs-4 pr-xs-4 pt-xs-3 pb-xs-3">
                <div className="avatar-14 border-radius-100 bg-red-400 position-relative">
                    <div className="border-radius-100 bg-red-400 position-absolute-x-y flash-animation"></div>
                </div>
                <span className="fsize-xs-1 f-w-600">Titolo del brano co...</span>
            </div>
            <Link className="d-inline-flex-row align-items-center gap-0_5em bg-black-transp50 border-radius-100 border-green-spotify pl-xs-4 pr-xs-1 pt-xs-1 pb-xs-1" to='https://open.spotify.com/intl-it/track/5Hjy8lyZ4h99OjrW8jzPQ8' target='blank'>
                <span className="fsize-xs-2 green-spotify f-w-600 grow-1">Ascoltalo su</span>
                <img className="avatar-28 border-radius-100 bg-green-spotify" src={IconSpotifyWhite} />
            </Link>
        </div>
    )
}

export default LiveMusicProduct;