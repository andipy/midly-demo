import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import IconArrowLeft from '../images/icons/icon-arrowleft.svg'
/* import IconArrowUp from '../images/icons/icon-arrowup.svg'
import IconArrowDown from '../images/icons/icon-arrowdown.svg'*/
import IconVerifiedArtist from '../images/icons/icon-verified-artist.svg'
import IconPrize from '../images/icons/icon-prize-rank-card.svg'
import IconMessage from '../images/icons/icon-message.svg'
import SettingsLogo from '../images/icons/icon-settings-white.svg'

const NavbarArtistPage = ({ artist, onClick, quiz, fanclub, openSettings, openMessages, userSubscribed, openModalSubscription}) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [scrolled, setScrolled] = useState(false)
    const [verified, setVerified] = useState(false)

    useEffect(() => {
        setVerified(artist?.verified)
    }, [artist])

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset >= 165) {
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
        <nav className={`top-bar-area-overlay-fixed d-flex-row align-items-center j-c-center white z-index-999 top-0 ${scrolled ? 'bg-dark shadow-dark-750' : ''}`}>
            <div className='container d-flex-row align-items-center j-c-space-between w-100'>
                <div className='avatar-28' onClick={() => navigate('/')}>
                    <img className='avatar-28 bg-dark-soft-transp75 border-radius-100' src={IconArrowLeft} alt='Back' />
                </div>

                <div className={`${scrolled ? 'd-flex-row' : 'd-xs-none'} align-items-center j-c-center grow-1`}>
                    <div className='avatar-36 position-relative mr-xs-4'>
                        <img className='avatar-36 border-radius-100' src={artist?.image} alt='Artist' />
                        {verified && 
                            <img
                            className="artist-avatar-verified-icon avatar-12"
                            src={IconVerifiedArtist}
                            alt="Verified"
                            />
                        }                   
                    </div>
                    <h2 className='f-w-600 fsize-xs-1 letter-spacing-1'>
                        {artist?.artistName.length > 15 ? artist?.artistName.substring(0, 15) + '...' : artist?.artistName}
                    </h2>
                </div>

                <div className='d-flex-row j-c-end align-items-center w-100 gap-0_25em'>
                    
                    <div className='bg-dark-soft-transp75 j-c-center align-items-center pt-xs-2 pb-xs-2 pr-xs-2 pl-xs-2 border-radius-1' onClick={onClick}>
                        <h4 className={`fsize-xs-1 f-w-500 ${quiz ? 'white':'lime-400'}`}>Live quiz</h4>
                    </div>
                    {fanclub && 
                        userSubscribed ?
                        <div className='avatar-32 bg-dark-soft-transp75 pt-xs-1 pb-xs-1 pl-xs-1 pr-xs-1 border-radius-100 d-flex-row j-c-center align-items-center' onClick={openSettings}>
                            <img className='avatar-32' src={SettingsLogo}/>
                        </div>
                        :
                        <div className='avatar-32 bg-dark-soft-transp75 pt-xs-1 pb-xs-1 pl-xs-1 pr-xs-1 border-radius-100 d-flex-row j-c-center align-items-center' onClick={openModalSubscription}>
                            <img className='avatar-32' src={SettingsLogo}/>
                        </div>
                    }
                    {fanclub && userSubscribed &&
                        <div className='avatar-32 bg-dark-soft-transp75 pt-xs-1 pb-xs-1 pl-xs-1 pr-xs-1 border-radius-100 d-flex-row j-c-center align-items-center' onClick={openMessages}>
                            <img className='avatar-32' src={IconMessage}/>
                        </div>
                    }
                </div>

                

                {/* <div className={`${scrolled ? 'd-flex-row' : 'd-xs-none'} align-items-center j-c-center border-radius-100 avatar-36 bg-dark-soft-transp75 d-flex-row`}>
                </div> */}
                
                {/* <div className={`${scrolled ? 'd-flex-row' : 'd-xs-none'} align-items-center j-c-center border-radius-100 avatar-36 bg-dark-soft-transp75 d-flex-row`}>
                    {!location.pathname.includes('sanremo') && (
                        <>
                            <img className='avatar-28' src={IconPrize} alt='Prize' />
                            <p className='artist-avatar-verified-icon avatar-16 fsize-xs-1 bg-red-300 border-radius-100 d-flex-row align-items-center j-c-center dark-900 f-w-600'>5</p>
                        </>
                    )}
                </div> */}
            </div>
        </nav>
    )
}

export default NavbarArtistPage