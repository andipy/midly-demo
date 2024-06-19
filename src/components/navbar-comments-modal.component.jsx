import IconExit from '../images/icons/icon-exit.svg'

const NavbarCommentsModal = ({ closeComments }) => {

    return (
        <nav className='position-absolute top-0 w-100 d-flex-row align-items-center j-c-center white z-index-5'>
            <div className='container d-flex-row align-items-center j-c-space-between'>
                <div className='avatar-32'></div>

                <p>Comments</p>

                <div className='avatar-32 d-flex-row align-items-center j-c-center' onClick={closeComments}>
                    <img className='avatar-32' src={IconExit} alt='X' />
                </div>
            </div>
        </nav>
    )
}

export default NavbarCommentsModal