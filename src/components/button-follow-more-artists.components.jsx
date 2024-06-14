import { Link } from 'react-router-dom'
import IconPlus from '../images/icons/icon-plus.svg'

const ButtonFollowMoreArtists = () => {
    return (
        <div to='/search' className='d-flex-row align-items-center j-c-center bg-dark-gradient border-radius-08 z-index-2 mt-xs-4 pt-xs-6 pb-xs-6 gap-0_5em'>
            <img className='avatar-28' src={IconPlus} />
            <h5 className='fsize-xs-3 f-w-300 letter-spacing-1'>Segui altri artisti</h5>                                
        </div>
    )
}

export default ButtonFollowMoreArtists;