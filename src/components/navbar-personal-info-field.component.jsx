import { useNavigate} from 'react-router-dom'


import IconArrowLeft from "../images/icons/icon-arrowleft.svg"
import IconEdit from "../images/icons/icon-edit.svg"

function NavbarPersonalInfoField({title}) {

    const navigate = useNavigate()

    const handleEditClick = () => {
        navigate('/user-info-field-modify', { state: { field: title } });
    };


  return (
    <nav className='top-bar-area-block d-flex-row align-items-center j-c-center white z-index-max'>
            <div className='container d-flex-row align-items-center j-c-center'>
                <div className="topbar-icon-left" onClick={() => navigate(-1)}>
                    <img src={IconArrowLeft} alt='ARROW LEFT'></img>
                </div>
                <h5 className='f-w-500 fsize-xxl-4 fsize-xl-4 fsize-lg-4 fsize-md-4 fsize-sm-4 fsize-xs-4 letter-spacing-1 j-c-center'>{title}</h5>
                <div className='topbar-icon-right' onClick={handleEditClick}>
                    <img src={IconEdit} alt='EDIT'></img>
                </div>
            </div>
    </nav>
  )
}

export default NavbarPersonalInfoField