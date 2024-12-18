import { useNavigate} from 'react-router-dom'


import IconArrowLeft from "../images/icons/icon-arrowleft.svg"
import IconEdit from "../images/icons/icon-edit.svg"

function NavbarPersonalInfoField({title}) {

    const navigate = useNavigate()

    const changedTitle = (() => {
        switch (title) {
            case 'USERNAME': return 'Username'
            case 'INSTAGRAM_USERNAME': return 'Instagram username'
            case 'EMAIL': return 'Email'
            case 'BIRTHDATE': return 'Data di nascita'
            case 'GENRE': return 'Genere'
            case 'CELLPHONE': return 'Cellulare'
            case 'ADDRESS': return 'Indirizzo'
        }
    })()

    const handleEditClick = () => {
        navigate('/user-info-field-modify', { state: { field: title } });
    };


  return (
    <nav className='top-bar-area-block d-flex-row align-items-center j-c-center white z-index-999'>
            <div className='container d-flex-row align-items-center j-c-center'>
                <div className="topbar-icon-left" onClick={() => navigate(-1)}>
                    <img src={IconArrowLeft} alt='ARROW LEFT' />
                </div>
                <h5 className='f-w-500 fsize-xxl-4 fsize-xl-4 fsize-lg-4 fsize-md-4 fsize-sm-4 fsize-xs-4 letter-spacing-1 j-c-center'>{changedTitle}</h5>
                <div className='topbar-icon-right' onClick={handleEditClick}>
                    <img src={IconEdit} alt='EDIT' />
                </div>
            </div>
    </nav>
  )
}

export default NavbarPersonalInfoField