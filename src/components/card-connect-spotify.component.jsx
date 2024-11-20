import IconSpotifyWhiteFull from '../images/icons/icon-spotify-full-white.svg'
import IconSpotifyGreenFull from '../images/icons/icon-spotify-full-green.svg'

const CardConnectSpotify = ({onClick}) => {

    return (
        <div className='d-flex-row align-items-center j-c-space-between bg-brand-gradient fsize-xs-3 f-w-500 white mt-xs-4 border-radius-06 pt-xs-2 pb-xs-2 pl-xs-4 pr-xs-4' onClick={onClick}>
            <p className='black line-height-140'>Connetti Spotify per fare punti nella classifica!</p>
            <img className='avatar-48 no-shrink' src={IconSpotifyWhiteFull} />
        </div>
    )
}

export default CardConnectSpotify