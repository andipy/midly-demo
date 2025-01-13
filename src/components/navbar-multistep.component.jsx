import { useNavigate, useLocation } from 'react-router-dom'

import IconBack from '../images/icons/icon-arrowleft.svg'
import IconExit from '../images/icons/icon-exit.svg'
import IconEdit from '../images/icons/icon-edit.svg'

const NavbarMultistep = ({ stepNumber, totalStepNumber, dismissable, transparent, editable, editPath, forcedBackPath, forcedExitPath, clear }) => {

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
            if ( pathname.includes('/artist-app/content-creation') ) {
                clear()
            }
            navigate(forcedExitPath)
        } else {
            navigate(-1)
        }
    }

    return (
        <nav className={`${transparent ? '' : 'bg-dark shadow-dark-750'} top-bar-area-overlay-fixed d-flex-row align-items-center j-c-center white z-index-999 top-0 nav-multi`}>
            <div className='container d-flex-row align-items-center j-c-space-between'>
                {stepNumber !== 1 || totalStepNumber === 1 && !dismissable ?
                    <div className='avatar-32 d-flex-row align-items-center j-c-center bg-black-transp50 border-radius-100' onClick={handleBackNavigation}>
                        <img src={IconBack} alt='MIDLY' />
                    </div>
                :
                    <div className='avatar-32'></div>
                }

                {totalStepNumber > 1 &&
                    <span className='fsize-xs-2 bg-black-transp50 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 border-radius-100 no-shirnk'>Step {stepNumber} di {totalStepNumber}</span>
                }

                <div className='d-flex-row gap-0_5em'>
                    {dismissable && !editable &&
                        <div className='avatar-32 d-flex-row align-items-center j-c-center bg-black-transp50 border-radius-100' onClick={handleExit}>
                            <img className='avatar-32' src={IconExit} alt='X' />
                        </div>
                    }
                    {editable && !dismissable &&
                        <div className='avatar-32 d-flex-row align-items-center j-c-center bg-black-transp50 border-radius-100' onClick={() => navigate(editPath)}>
                            <img className='avatar-32' src={IconEdit} alt='X' />
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default NavbarMultistep