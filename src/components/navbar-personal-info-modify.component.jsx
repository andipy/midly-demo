import { useNavigate} from 'react-router-dom'


import IconExit from "../images/icons/icon-exit.svg"

function NavbarPersonalInfoFieldModify({title}) {

    const navigate = useNavigate()


  return (
    <nav className='top-bar-area-block d-flex-row align-items-center j-c-center white z-index-max'>
            <div className='container d-flex-row align-items-center j-c-center'>
                <h5 className='f-w-500 fsize-xxl-4 fsize-xl-4 fsize-lg-4 fsize-md-4 fsize-sm-4 fsize-xs-4 letter-spacing-1 j-c-center'>{title}</h5>
                <div className="topbar-icon-right">
                    <img src={IconExit} alt="CANCEL" onClick={() => navigate(-2)}></img>
                </div>
            </div>
    </nav>
  )
}

export default NavbarPersonalInfoFieldModify