import { useNavigate } from 'react-router-dom'

import Logo from '../images/logo/logo-text-only-white.svg'
import IconInbox from '../images/icons/icon-inbox-white.svg'
import Container from '../layout/container.layout'

const NavbarDefault = () => {

    const navigate = useNavigate()

    return (
        <nav id='top-bar' className='top-bar-area-block d-flex-row align-items-center j-c-space-between white z-index-999'>
            <Container style='d-flex-row align-items-center j-c-space-between'>
                <img className='w-20' src={Logo} alt='MIDLY' />


                <div className='avatar-32 d-flex-row align-items-center j-c-center bg-black-transp50 border-radius-100' onClick={() => navigate('activity')}>
                    <img className='avatar-32' src={IconInbox} alt='M' />
                </div>
            </Container>
        </nav>
    )
}

export default NavbarDefault;