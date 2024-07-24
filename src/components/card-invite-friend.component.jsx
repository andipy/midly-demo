import { useNavigate } from 'react-router-dom'

import IconRightDark from '../images/icons/icon-arrowright-dark.svg'
import IconPoints from '../images/icons/icon-points.svg'

const CardInviteFriend = ({ artist }) => {

    const navigate = useNavigate()

    return (
        <article className='d-flex-row align-items-center j-c-space-between bg-dark pb-xs-3 pt-xs-3 pr-xs-6 pl-xs-6 mt-xs-12 invite-friend-card' onClick={() => navigate(`/artist/${artist?.slug}/invite-friend`, {state: artist})}>
            <div className='text-info d-flex-column grow-1'>
                <div className='fsize-xs-4 f-w-600 mb-xs-2'>Invita un amico</div>
                <p className='d-flex-row align-items-center gap-0_5em grey-200 fsize-xs-1 font-body pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 align-self-start border-radius-100'>Ottieni 15 <img className='avatar-16 no-shrink' src={IconPoints} alt=' points' /> in clasifica!</p>
            </div>
            <img className='avatar-24 bg-brand-gradient border-radius-100' src={IconRightDark} alt='GO!' />
        </article>
    )
}

export default CardInviteFriend