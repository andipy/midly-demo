import { useLocation, useNavigate } from 'react-router-dom'

import Logo from '../images/logo/logo-simple-artists.svg'

import IconPlus from '../images/icons/icon-plus-black.svg'
import IconSettings from '../images/icons/icon-settings-white.svg'
import IconInfo from '../images/icons/icon-info-white.svg'
import IconInbox from '../images/icons/icon-inbox-white.svg'

const Navbar = ({ fanclub }) => {

    const navigate = useNavigate()
    const { pathname } = useLocation()

    return (
        <nav className='top-bar-area-overlay-fixed bg-dark d-flex-row align-items-center j-c-center white z-index-999 top-0 shadow-dark-400'>
            <div className='container d-flex-row align-items-center j-c-space-between'>
                <div className='d-flex-row align-items-center j-c-center'>
                    <img src={Logo} alt='MIDLY' />
                </div>

                {fanclub?.isActive && pathname.includes('fanclub') &&
                    <div className='d-flex-row gap-0_5em'>
                        <div className='avatar-32 d-flex-row align-items-center j-c-center' onClick={() => navigate('tips')}>
                            <img className='avatar-32' src={IconInfo} alt='?' />
                        </div>

                        <div className='avatar-32 d-flex-row align-items-center j-c-center' onClick={() => navigate('settings')}>
                            <img className='avatar-32' src={IconSettings} alt='O' />
                        </div>

                        <div className='avatar-32 d-flex-row align-items-center j-c-center'>
                            <img className='avatar-32' src={IconInbox} alt='M' />
                        </div>
                        
                        <button className='bg-acid-lime d-flex-row align-items-center j-c-center fsize-xs-2 f-w-500 avatar-32' onClick={() => navigate('/artist-app/content-creation')}>
                            <img src={IconPlus} alt='+' />
                        </button>
                    </div>
                }
            </div>
        </nav>
    )
}

export default Navbar