import Logo from '../images/logo/logo-text-only-white.svg'

const NavbarDefault = () => {
    return (
        <nav className='top-bar-area-block d-flex-row align-items-center j-c-center white z-index-999'>
            <div className='container d-flex-row align-items-center j-c-center'>
                <img src={Logo} alt='MIDLY' />
            </div>
        </nav>
    )
}

export default NavbarDefault;