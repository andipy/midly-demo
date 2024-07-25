import { useState, useEffect, useContext } from 'react'
import { useOutletContext } from 'react-router-dom'

import { LeaderboardsContext } from '../contexts/leaderboards.context'

import CardLeaderboardFan from '../components/card-leaderboard-fan.component'

import IconPoints from '../images/icons/icon-points.svg'

const LeaderboardRoute = () => {

    const context = useOutletContext()

    const { leaderboards } = useContext(LeaderboardsContext)
    
    const [leaderboard, setLeaderboard] = useState()
    const fetchThisLeaderboard = () => {
        const thisLeaderboard = leaderboards.find(elem => context.id === elem.artistId)
        setLeaderboard(thisLeaderboard)
    }

    useEffect(() => {
        if ( context ) {
            fetchThisLeaderboard()
        }
    }, [context])

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
        <section className='mt-xs-4'>
            <div className='mb-xs-4'>
                <div className='d-flex-row j-c-center'>
                    <div className='d-flex-column align-items-center w-33'>
                        <div className='first-position podium-border position-relative'>
                            {leaderboard?.leaderboard[0].image &&
                                <img className='object-fit-cover position-absolute-x-y podium-border-empty-image-inner z-index-2' src={leaderboard?.leaderboard[0].image} />
                            }
                            <div className='d-flex-row j-c-center align-items-center podium-border-empty-image-inner position-absolute-x-y z-index-1'>
                                {leaderboard?.leaderboard[0].username.slice(0, 1).toUpperCase()}
                            </div>
                            <div className='podium-position-indicator p-xs-16 bg-brand-gradient black f-w-600 d-flex-row align-items-center j-c-center position-absolute border-radius-100 top-0 right-0'>{leaderboard?.leaderboard[0].position}°</div>
                        </div>
                        <div className='text-info d-flex-column align-items-center'>
                            <div className='fsize-xs-1 t-align-center letter-spacing-1'>{handleUsername(leaderboard, leaderboard?.leaderboard[0].username, 12)}</div>
                            <div className='d-flex-row letter-spacing-1'>
                                <div className='grey-400 fsize-xs-1 letter-spacing-1'>{leaderboard?.leaderboard[0].points} </div>
                                <img className='avatar-12 ml-xs-2 mt-xs-5' src={IconPoints} alt=' points' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='d-flex-row j-c-start mt-xs-negative20'>
                    <div className='d-flex-column align-items-center w-33'>
                        <div className='second-position podium-border position-relative'>
                            {leaderboard?.leaderboard[1].image &&
                                <img className='object-fit-cover position-absolute-x-y podium-border-empty-image-inner z-index-2' src={leaderboard?.leaderboard[1].image} />
                            }
                            <div className='d-flex-row j-c-center align-items-center podium-border-empty-image-inner position-absolute-x-y z-index-1'>
                                {leaderboard?.leaderboard[1].username.slice(0, 1).toUpperCase()}
                            </div>
                            <div className='podium-position-indicator p-xs-16 bg-brand-gradient black f-w-600 d-flex-row align-items-center j-c-center position-absolute border-radius-100 top-0 right-0'>{leaderboard?.leaderboard[1].position}°</div>
                        </div>
                        <div className='text-info d-flex-column align-items-center'>
                            <div className='fsize-xs-1 t-align-center letter-spacing-1'>{handleUsername(leaderboard, leaderboard?.leaderboard[1].username, 12)}</div>
                            <div className='d-flex-row letter-spacing-1'>
                                <div className='grey-400 fsize-xs-1 letter-spacing-1'>{leaderboard?.leaderboard[1].points} </div>
                                <img className='avatar-12 ml-xs-2 mt-xs-5' src={IconPoints} alt=' points' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='d-flex-row j-c-end mt-xs-negative25'>
                    <div className='d-flex-column align-items-center w-33'>
                        <div className='third-position podium-border position-relative'>
                            {leaderboard?.leaderboard[2].image &&
                                <img className='object-fit-cover position-absolute-x-y podium-border-empty-image-inner z-index-2' src={leaderboard?.leaderboard[2].image} />
                            }
                            <div className='d-flex-row j-c-center align-items-center podium-border-empty-image-inner position-absolute-x-y z-index-1'>
                                {leaderboard?.leaderboard[2].username.slice(0, 1).toUpperCase()}
                            </div>
                            <div className='podium-position-indicator p-xs-16 bg-brand-gradient black f-w-600 d-flex-row align-items-center j-c-center position-absolute border-radius-100 top-0 right-0'>{leaderboard?.leaderboard[2].position}°</div>
                        </div>
                        <div className='text-info d-flex-column align-items-center'>
                            <div className='fsize-xs-1 t-align-center letter-spacing-1'>{handleUsername(leaderboard, leaderboard?.leaderboard[2].username, 12)}</div>
                            <div className='d-flex-row letter-spacing-1'>
                                <div className='grey-400 fsize-xs-1 letter-spacing-1'>{leaderboard?.leaderboard[2].points} </div>
                                <img className='avatar-12 ml-xs-2 mt-xs-5' src={IconPoints} alt=' points' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {leaderboard?.leaderboard.map(fan => fan.position > 3 && <CardLeaderboardFan fan={fan} key={fan.position} />)}
        </section>
    )
}

export default LeaderboardRoute