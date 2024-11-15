import { useLocation } from 'react-router-dom'
import IconExit from '../images/icons/icon-exit.svg'

const NavbarCommentsModal = ({ closeModal, title }) => {

    const { pathname } = useLocation()

    return (
        <nav className='position-sticky top-0 w-100 d-flex-row align-items-center j-c-center white bg-dark-soft z-index-5 pt-xs-3 pb-xs-3 pt-sm-2 pb-sm-2'>
            <div className='container d-flex-row align-items-center j-c-space-between'>
                <div className='avatar-32'></div>

                {!pathname.includes('/leaderboard') && <p>{title ? title : 'Comments'}</p>}

                <div className='avatar-32 d-flex-row align-items-center j-c-center bg-dark border-radius-100' onClick={closeModal}>
                    <img className='avatar-28' src={IconExit} alt='X' />
                </div>
            </div>
        </nav>
    )
}

export default NavbarCommentsModal