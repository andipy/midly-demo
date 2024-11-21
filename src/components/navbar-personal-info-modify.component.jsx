import { useNavigate} from 'react-router-dom'


import IconExit from "../images/icons/icon-exit.svg"

function NavbarPersonalInfoFieldModify({title}) {

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


  return (
    <nav className='top-bar-area-block d-flex-row align-items-center j-c-center white z-index-999'>
            <div className='container d-flex-row align-items-center j-c-center'>
                <h5 className='f-w-500 fsize-xxl-4 fsize-xl-4 fsize-lg-4 fsize-md-4 fsize-sm-4 fsize-xs-4 letter-spacing-1 j-c-center'>{changedTitle}</h5>
                <div className="topbar-icon-right">
                    <img src={IconExit} alt="CANCEL" onClick={() => navigate(-1)}></img>
                </div>
            </div>
    </nav>
  )
}

export default NavbarPersonalInfoFieldModify