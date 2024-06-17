import { useNavigate } from 'react-router-dom'

import IconBack from '../images/icons/icon-arrowleft.svg'
import IconExit from '../images/icons/icon-exit.svg'

const NavbarMultistep = ({ stepNumber }) => {

    const navigate = useNavigate()

    return (
        <nav className='top-bar-area-overlay-fixed bg-dark d-flex-row align-items-center j-c-center white z-index-max top-0 shadow-dark-400'>
            <div className='container d-flex-row align-items-center j-c-space-between'>
                {stepNumber !== 1 ?
                    <div className='d-flex-row align-items-center j-c-center' onClick={() => navigate(-1)}>
                        <img src={IconBack} alt='MIDLY' />
                    </div>
                :
                    <div className='avatar-32'></div>
                }

                <span>Passo {stepNumber} di 3</span>

                <div className='d-flex-row gap-0_5em'>
                    <div className='avatar-32 d-flex-row align-items-center j-c-center'>
                        <img className='avatar-32' src={IconExit} alt='X' />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavbarMultistep