import IconArrowLeft from '../images/icons/icon-arrowleft.svg'

const NavbarBackOnly = ({ onClick }) => {

    return (
        <nav className={`d-flex-row align-items-center j-c-center white z-index-999 position-sticky bg-dark top-0`}>
            <div className='container d-flex-row align-items-center j-c-start w-100'>
                <div className='avatar-28' onClick={() => onClick()}>
                    <img className='avatar-28 bg-dark-soft-transp75 border-radius-100' src={IconArrowLeft} />
                </div>
            </div>
        </nav>
    )
}

export default NavbarBackOnly