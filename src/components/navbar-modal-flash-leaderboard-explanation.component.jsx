import IconExit from '../images/icons/icon-exit.svg'
import IconUp from '../images/icons/icon-up.svg'

const NavbarModalFLExplanation = ({ modalCompressed, compressModal, expandModal }) => {

    const toggleModal = () => {
        if ( modalCompressed ) {
            expandModal()
        } else if ( !modalCompressed ) {
            compressModal()
        }
    }

    return (
        <nav className='position-sticky top-0 left-0 w-100 d-flex-row align-items-center j-c-center white z-index-5 pt-xs-4 pb-xs-4 pt-sm-2 pb-sm-2'>
            <div className='container d-flex-row align-items-center j-c-space-between'>
                <div className='avatar-32'></div>

                <div className='avatar-32 d-flex-row align-items-center j-c-center' onClick={toggleModal}>
                    <img
                        className='avatar-32 bg-black-transp50 border-radius-100'
                        src={
                            modalCompressed ? IconUp
                            : IconExit
                        }
                    />
                </div>
            </div>
        </nav>
    )
}

export default NavbarModalFLExplanation