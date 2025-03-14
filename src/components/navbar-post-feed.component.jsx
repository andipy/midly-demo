
import IconArrowLeft from '../images/icons/icon-arrowleft.svg'
import IconVerifiedArtist from '../images/icons/icon-verified-artist.svg'
import { useLocation, useNavigate } from 'react-router-dom'

const NavbarPostFeed = ({artist, type, from}) => {
    const location = useLocation()
    const { pathname } = useLocation()
    const navigate = useNavigate()

  return (
    <nav className='top-bar-area-overlay-fixed bg-dark d-flex-row align-items-center j-c-center white z-index-1000 top-0'>
        <div className='container d-flex-row align-items-center j-c-space-between w-100 '>
            {
                <div className='avatar-28' onClick={() => navigate(from, { state: { artist: artist } })}>
                    <img className='avatar-28 bg-dark-soft-transp75 border-radius-100' src={IconArrowLeft} alt='Back' />
                </div>
            }
            {artist &&
            <div className='d-flex-column j-c-center align-items-center  w-100 mt-xs-2'>
                <div className='d-flex-row align-items-center j-c-center gap-0_25em'>
                    <div className='avatar-32 position-relative mr-xs-4'>
                        <img className='avatar-32 border-radius-100' src={artist?.image} alt='Artist' />
                        {artist.verified && 
                            <img
                            className="artist-avatar-verified-icon avatar-12"
                            src={IconVerifiedArtist}
                            alt="Verified"
                            />
                        }                   
                    </div> 
                    <div className='d-flex-row j-c-center align-items-start'>
                        <h2 className='f-w-500 fsize-xs-2 letter-spacing-1 no-shrink'>
                            {artist.artistName}
                        </h2>                  
                    </div>
                </div>
                {
                    type === 'FORUM' ?
                    <p className='fsize-xs-3 f-w-600'>
                        Topic salvati
                    </p>
                    : type !== '' ?
                    <p className='fsize-xs-3 f-w-600'>
                        {type}
                    </p>
                    :
                    <></>
                }
                
            </div>
            
            }
            {
                <div className='avatar-28'>
                </div>
            }
            
        </div>
    </nav>
  )
}

export default NavbarPostFeed