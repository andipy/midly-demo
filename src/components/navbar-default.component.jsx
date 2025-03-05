import { useNavigate, useLocation } from 'react-router-dom'

import Logo from '../images/logo/logo-text-only-white.svg'
import IconInbox from '../images/icons/icon-inbox-white.svg'
import Container from '../layout/container.layout'
import IconThunder from '../images/icons/icon-thunder.svg'

const NavbarDefault = () => {

    const navigate = useNavigate()
    const location = useLocation()

    return (
        <nav id='top-bar' className='top-bar-area-block d-flex-row align-items-center j-c-space-between white z-index-999'>
            <Container style='d-flex-row align-items-center j-c-space-between'>
                <img className='w-20' src={Logo} alt='MIDLY' />

                {
                    location.pathname.includes('your-favourites') &&
                    <div className='avatar-32 d-flex-row align-items-center j-c-center bg-black-transp50 border-radius-100' onClick={() => navigate('activity')}>
                        <img className='avatar-32' src={IconThunder} alt='M' />
                    </div>
                }
                
            </Container>
        </nav>
    )
}

export default NavbarDefault;