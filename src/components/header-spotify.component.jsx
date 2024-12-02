import LogoSpotify from '../images/icons/icon-spotify-full-white.svg'
const HeaderSpotify = () => {
  return (
    <nav className='top-bar-area-overlay-fixed bg-dark d-flex-row align-items-center j-c-center white z-index-999 top-0 shadow-dark-750'>
            <div className='container d-flex-row align-items-center j-c-space-between'>
                <div className='d-flex-row align-items-center j-c-center  ml-xs-0'>
                    <div className='avatar-48'><img className='avatar-48' src={LogoSpotify} alt='MIDLY' /></div>
                    <h4 className='fsize-xs-5 f-w-800 mr-xs-2'>Spotify</h4>
                </div>
            </div>
        </nav>
    )
}

export default HeaderSpotify