import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import IconArrowLeft from '../images/icons/icon-arrowleft.svg'
import IconVerifiedArtist from '../images/icons/icon-verified-artist.svg'
import IconPrize from '../images/icons/icon-prize-rank-card.svg'

const NavbarArtistPage = ({ artist }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset >= 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    return (
        <nav className={`top-bar-area-overlay-fixed d-flex-row align-items-center j-c-center white z-index-max top-0 ${scrolled ? 'bg-dark shadow-dark-400' : ''}`}>
            <div className='container d-flex-row align-items-center j-c-space-between w-100'>
                <div className='avatar-28' onClick={() => navigate(-1)}>
                    <img className='avatar-28 bg-dark-soft-transp75 border-radius-100' src={IconArrowLeft} alt='Back' />
                </div>

                <div className={`${scrolled ? 'd-flex-row' : 'd-xs-none'} align-items-center j-c-center grow-1`}>
                    <div className='avatar-36 position-relative mr-xs-4'>
                        <img className='avatar-36 border-radius-100' src={artist?.image} alt='Artist' />
                        <img className='artist-avatar-verified-icon avatar-12' src={IconVerifiedArtist} alt='Verified' />
                    </div>
                    <h2 className='f-w-600 fsize-xs-1 letter-spacing-1'>
                        {artist?.artistName.length > 15 ? artist?.artistName.substring(0, 15) + '...' : artist?.artistName}
                    </h2>
                </div>

                <div className={`${scrolled ? 'd-flex-row' : 'd-xs-none'} align-items-center j-c-center border-radius-100 avatar-36 bg-dark-soft-transp75 d-flex-row`}>
                    {!location.pathname.includes('sanremo') && (
                        <>
                            <img className='avatar-28' src={IconPrize} alt='Prize' />
                            <p className='artist-avatar-verified-icon avatar-16 fsize-xs-1 bg-red-300 border-radius-100 d-flex-row align-items-center j-c-center dark-900 f-w-600'>5</p>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default NavbarArtistPage