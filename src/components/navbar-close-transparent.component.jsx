import IconExit from '../images/icons/icon-exit.svg'

const NavbarCloseTransparent = ({closeModal}) => {
  return (
    <nav className=' w-100 d-flex-row align-items-center j-c-center white  z-index-5 pt-xs-3 pb-xs-3 pt-sm-2 pb-sm-2'>
        <div className='container d-flex-row align-items-center j-c-space-between'>
            <div className='avatar-32'></div>

            <div className='avatar-32 d-flex-row align-items-center j-c-center bg-dark border-radius-100' onClick={closeModal}>
                <img className='avatar-28' src={IconExit} alt='X' />
            </div>
        </div>
    </nav>
  )
}

export default NavbarCloseTransparent