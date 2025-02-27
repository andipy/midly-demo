import { useNavigate } from 'react-router-dom'
import IconExit from '../images/icons/icon-exit.svg'
import IconBack from '../images/icons/icon-arrowleft.svg'

const NavbarFanLetterCreation = ({artist, transparent, deletePost, goBack}) => {

    const navigate = useNavigate()
    const back = () => {
        deletePost()
        /*  navigate(`/artist/${artist.slug}/fanclub/letters`, { state: { artist: artist} }) */
        /* MAJOR CHANGES */
       navigate(`/artist/${artist.slug}/letters`, { state: { artist: artist} })
    }
    const handleBackNavigation = () => {
        deletePost()
        navigate(-1)
    }
  return (
    <nav className={`${transparent ? '' : 'bg-dark shadow-dark-750'} top-bar-area-overlay-fixed d-flex-row align-items-center j-c-center white z-index-999 top-0 nav-multi`}>
        <div className='container d-flex-row align-items-center j-c-end'>
            <div className={`d-flex-row w-100 gap-0_5em align-items-center ${goBack ? 'j-c-space-between' : 'j-c-end'}`}>
                {goBack &&
                    <div className='avatar-32 d-flex-row align-items-center j-c-center bg-black-transp50 border-radius-100' onClick={handleBackNavigation}>
                        <img src={IconBack} alt='MIDLY' />
                    </div>
                }   
                <div className='avatar-32 d-flex-row align-items-center j-c-center bg-black-transp50 border-radius-100' onClick={() => back()}>
                    <img className='avatar-32' src={IconExit} alt='X' />
                </div>
            </div>
        </div>
    </nav>
  )
}

export default NavbarFanLetterCreation