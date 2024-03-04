import { useNavigate } from 'react-router-dom'

import IconRight from '../images/icons/icon-arrowright.svg'
import IconPoints from '../images/icons/icon-point-xs.svg'

const CardInviteFriend = ({ state }) => {

    const navigate = useNavigate()

    return (
        <article className='d-flex-row align-items-center j-c-space-between bg-purple-gradient pb-xs-3 pt-xs-3 pr-xs-6 pl-xs-6 border-radius-1 mt-xs-12' onClick={() => navigate(`/artist/${state.artistSlug}/invite-friend`, {state: state})}>
            <div className="text-info d-flex-column grow-1">
                <div className="fsize-xs-4 f-w-600 mb-xs-2">Invita un amico</div>
                <p className="purple-100 bg-purple-200-transp10 fsize-xs-1 font-body pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 align-self-start border-radius-100">Ottieni <span>15 <img src={IconPoints} alt=" points" /></span> in clasifica!</p>
            </div>
            <img className='avatar-24 bg-dark-soft border-radius-100' src={IconRight} alt="GO!" />
        </article>
    )
}

export default CardInviteFriend