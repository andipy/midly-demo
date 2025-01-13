import { useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react'

import { CurrentArtistContext } from '../contexts/currentArtist.context'

import Logo from '../images/logo/logo-simple-artists.svg'

import IconPlus from '../images/icons/icon-plus-black.svg'
import IconSettings from '../images/icons/icon-settings-white.svg'
import IconInfo from '../images/icons/icon-info-white.svg'
import IconInbox from '../images/icons/icon-inbox-white.svg'
import IconMessage from '../images/icons/icon-message.svg'

const Navbar = ({ fanclub, background, create, artist }) => {

    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { currentArtist } = useContext(CurrentArtistContext)

    return (
        <nav className={`top-bar-area-overlay-fixed d-flex-row align-items-center j-c-center white z-index-999 top-0 ${background === 'transparent50' ? 'bg-black-transp50 shadow-dark-750' : background === 'transparent100' && ''}`}>
            <div className='container d-flex-row align-items-center j-c-space-between'>
                <div className='d-flex-row align-items-center j-c-center'>
                    <img src={Logo} alt='MIDLY' />
                </div>

                {fanclub?.isActive && pathname.includes('fanclub') &&
                    <div className='d-flex-row gap-0_5em'>
                        <div className='avatar-32 d-flex-row align-items-center j-c-center bg-black-transp50 border-radius-100' onClick={() => navigate('tips')}>
                            <img className='avatar-32' src={IconInfo} alt='?' />
                        </div>

                        <div className='avatar-32 d-flex-row align-items-center j-c-center bg-black-transp50 border-radius-100' onClick={() => navigate('settings', { state: {field: 'FANCLUB_PRICING' }})}>
                            <img className='avatar-32' src={IconSettings} alt='O' />
                        </div>

                        <div className='avatar-32 d-flex-row align-items-center j-c-center bg-black-transp50 border-radius-100' onClick={() => navigate('activity')}>
                            <img className='avatar-32' src={IconInbox} alt='M' />
                        </div>

                        <div className='avatar-32 d-flex-row align-items-center j-c-center bg-black-transp50 border-radius-100' onClick={() =>  navigate(`/artist-app/fanclub/chats`, { state: currentArtist })}>
                            <img className='avatar-32' src={IconMessage} alt='M' />
                        </div>

                        <button className='bg-acid-lime d-flex-row align-items-center j-c-center fsize-xs-2 f-w-500 avatar-32 border-radius-100' onClick={() => create()}>
                            <img src={IconPlus} alt='+' />
                        </button>
                    </div>
                }
            </div>
        </nav>
    )
}

export default Navbar