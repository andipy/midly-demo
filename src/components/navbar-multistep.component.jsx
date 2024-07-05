import { useNavigate, useLocation } from 'react-router-dom'

import IconBack from '../images/icons/icon-arrowleft.svg'
import IconExit from '../images/icons/icon-exit.svg'
import IconEdit from '../images/icons/icon-edit.svg'

const NavbarMultistep = ({ stepNumber, totalStepNumber, dismissable, editable, editPath, forcedBackPath, forcedExitPath }) => {

    const navigate = useNavigate()
    const { pathname } = useLocation()
    
    const handleBackNavigation = () => {
        if ( forcedBackPath ) {
            navigate(forcedBackPath)
        } else {
            navigate(-1)
        }
    }

    const handleExit = () => {
        if ( forcedExitPath ) {
            navigate(forcedExitPath)
        } else {
            navigate(-1)
        }
    }

    return (
        <nav className='top-bar-area-overlay-fixed bg-dark d-flex-row align-items-center j-c-center white z-index-max top-0 shadow-dark-400 nav-multi'>
            <div className='container d-flex-row align-items-center j-c-space-between'>
                {stepNumber !== 1 || totalStepNumber === 1 && !dismissable ?
                    <div className='d-flex-row align-items-center j-c-center' onClick={handleBackNavigation}>
                        <img src={IconBack} alt='MIDLY' />
                    </div>
                :
                    <div className='avatar-32'></div>
                }

                {totalStepNumber > 1 &&
                    <span>Passo {stepNumber} di 3</span>
                }

                <div className='d-flex-row gap-0_5em'>
                    {dismissable && !editable &&
                        <div className='avatar-32 d-flex-row align-items-center j-c-center' onClick={handleExit}>
                            <img className='avatar-32' src={IconExit} alt='X' />
                        </div>
                    }
                    {editable && !dismissable &&
                        <div className='avatar-32 d-flex-row align-items-center j-c-center' onClick={() => navigate(editPath)}>
                            <img className='avatar-32' src={IconEdit} alt='X' />
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default NavbarMultistep