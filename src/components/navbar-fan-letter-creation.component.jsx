
import IconExit from '../images/icons/icon-exit.svg'
import { useLocation, useNavigate } from 'react-router-dom'

const NavbarFanLetterCreation = ({artist, transparent, deletePost}) => {
    const location = useLocation()
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const back = () => {
        deletePost()
        navigate(`/artist/${artist.slug}/fanclub/letters`, { state: { artist: artist} })
    }
  return (
    <nav className={`${transparent ? '' : 'bg-dark shadow-dark-750'} top-bar-area-overlay-fixed d-flex-row align-items-center j-c-center white z-index-999 top-0 nav-multi`}>
        <div className='container d-flex-row align-items-center j-c-end'>
            <div className='d-flex-row gap-0_5em'>
                <div className='avatar-32 d-flex-row align-items-center j-c-center bg-black-transp50 border-radius-100' onClick={() => back()}>
                    <img className='avatar-32' src={IconExit} alt='X' />
                </div>
            </div>
        </div>
    </nav>
  )
}

export default NavbarFanLetterCreation