import { useEffect, useState, useContext } from 'react'

import { ArtistsContext } from '../contexts/artists.context'
import { FanclubsContext } from '../contexts/fanclubs.context'

import IconArrowLeft from '../images/icons/icon-arrowleft.svg'
import IconVerifiedArtist from '../images/icons/icon-verified-artist.svg'
import { useLocation, useNavigate } from 'react-router-dom'

function NavbarChat({artist, fan, from}) {
    const location = useLocation()
    const { pathname } = useLocation()
    const navigate = useNavigate()

    return (
        <nav className='top-bar-area-overlay-fixed bg-dark d-flex-row align-items-center j-c-start white z-index-1000 top-0'>
            <div className='container d-flex-row align-items-center j-c-space-between w-100 gap-1em'>
                {!pathname.includes('/artist-app/') &&
                    <div className='avatar-28' onClick={() => navigate(from, { state: { artist: artist } })}>
                        <img className='avatar-28 bg-dark-soft-transp75 border-radius-100' src={IconArrowLeft} alt='Back' />
                    </div>
                }
                {pathname.includes('/artist-app/') &&
                    <div className='avatar-28' onClick={() =>  navigate(-1)}>
                        <img className='avatar-28 bg-dark-soft-transp75 border-radius-100' src={IconArrowLeft} alt='Back' />
                    </div>
                } 
                {artist &&
                <div className='d-flex-row align-items-center j-c-center gap-0_25em w-100'>
                    <div className='avatar-36 position-relative mr-xs-4'>
                        <img className='avatar-36 border-radius-100' src={artist?.image} alt='Artist' />
                        {artist.verified && 
                            <img
                            className="artist-avatar-verified-icon avatar-12"
                            src={IconVerifiedArtist}
                            alt="Verified"
                            />
                        }                   
                    </div> 
                    <div className='d-flex-column j-c-center align-items-start'>
                        <h2 className='f-w-600 fsize-xs-3 letter-spacing-1'>
                            {artist.artistName}
                        </h2>                  
                    </div>
                </div>
                }
                {fan &&
                <div className='d-flex-row align-items-center j-c-center gap-0_25em w-100'>
                    {fan?.image ?
                    <div className='avatar-36 position-relative mr-xs-4'>
                        <img className='avatar-36 border-radius-100' src={fan?.image} alt='Artist' />   
                    </div>
                    : 
                    <div className='avatar-36 position-relative'>
                        <div className='d-flex-row j-c-center align-items-center avatar-36 border-radius-100 bg-purple-400'>
                            <h5 className='f-w-500 fsize-xs-6'>
                                {fan?.username.charAt(0).toUpperCase()}
                            </h5>
                        </div>
                    </div>
                    }
                    
                    
                    <div className='d-flex-column j-c-center align-items-start'>
                        <h2 className='f-w-600 fsize-xs-3 letter-spacing-1'>
                            {fan.username}
                        </h2>                  
                    </div>
                </div>
                }
                

                <div className='avatar-28'></div>
            </div>
        </nav>
    )
}

export default NavbarChat