import { useLocation } from 'react-router-dom'

import IconPoints from '../images/icons/icon-points.svg'

const CardLeaderboardFan = ({ fan, position, onClick }) => {

    const { pathname } = useLocation()
    const handleUsername = (condition, username, limit) => {
        if ( condition ) {
            const usernameNoEmail = username.split('@')[0]
            if ( usernameNoEmail.length > limit ) {
                const usernameNoEmailTruncated = usernameNoEmail.slice(0, limit) + '...'
                return usernameNoEmailTruncated
            }
            return usernameNoEmail
        }
    }

    return (
        <article className={`d-flex-row align-items-center j-c-space-between bg-dark-gradient ${pathname.includes('flash-leaderboard') ? 'pb-xs-2 pt-xs-2 pr-xs-4 pl-xs-2 border-radius-100 mb-xs-2' : 'pb-xs-4 pt-xs-4 pr-xs-6 pl-xs-6 border-radius-1 mb-xs-3'}` } onClick={onClick}>
            <div className='d-flex-row align-items-center w-100'>
                <img className='avatar-38 border-radius-100 mr-xs-4' src={fan?.image} />
                <div className='text-info d-flex-column'>
                    <div className='letter-spacing-1'>{handleUsername(fan, fan?.username, 18)}</div>
                    <div className='d-flex-row align-items-center letter-spacing-1'>
                        <div className='grey-400 fsize-xs-1 letter-spacing-1'>{fan?.points} </div>
                        <img className='avatar-12 ml-xs-2 mt-xs-1' src={IconPoints} alt=' points' />
                    </div>
                </div>
            </div>
            <span className='fsize-xs-7 f-w-300'>{position}°</span>
        </article>
    )
}

export default CardLeaderboardFan