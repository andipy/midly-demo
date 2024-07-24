import { useState, useEffect, useContext } from 'react'
import { useOutletContext } from 'react-router-dom'

import { LeaderboardsContext } from '../contexts/leaderboards.context'

import CardLeaderboardFan from '../components/card-leaderboard-fan.component'

import IconPoints from '../images/icons/icon-point-xs.svg'

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
                    <div className='d-flex-column w-33'>
                        <div className='d-flex-row align-items-center j-c-center align-items-stretch position-relative first-position'>
                            <img className='first-position object-fit-cover bg-gold-linear-gradient border-radius-100 p-xs-7' src={leaderboard?.leaderboard[0].image} />
                            <div className='podium-position-indicator p-xs-16 bg-gold-radial-gradient d-flex-row align-items-center j-c-center position-absolute border-radius-100 top-0 right-0'>{leaderboard?.leaderboard[0].position}°</div>
                        </div>
                        <div className='text-info d-flex-column align-items-center'>
                            <div className='fsize-xs-1 t-align-center letter-spacing-1'>{handleUsername(leaderboard, leaderboard?.leaderboard[0].username, 12)}</div>
                            <div className='d-flex-row letter-spacing-1'>
                                <div className='grey-400 fsize-xs-1 letter-spacing-1'>{leaderboard?.leaderboard[0].points} </div>
                                <img className='ml-xs-2' src={IconPoints} alt=' points' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='d-flex-row j-c-start mt-xs-negative20'>
                    <div className='d-flex-column w-33'>
                        <div className='d-flex-row align-items-center j-c-center align-items-stretch position-relative second-position'>
                            <img className='second-position object-fit-cover bg-silver-linear-gradient border-radius-100 p-xs-6' src={leaderboard?.leaderboard[1].image} />
                            <div className='podium-position-indicator p-xs-14 bg-silver-radial-gradient d-flex-row align-items-center j-c-center position-absolute border-radius-100 top-0 right-0'>{leaderboard?.leaderboard[1].position}°</div>
                        </div>
                        <div className='text-info d-flex-column align-items-center'>
                            <div className='fsize-xs-1 t-align-center letter-spacing-1'>{handleUsername(leaderboard, leaderboard?.leaderboard[1].username, 12)}</div>
                            <div className='d-flex-row letter-spacing-1'>
                                <div className='grey-400 fsize-xs-1 letter-spacing-1'>{leaderboard?.leaderboard[1].points} </div>
                                <img className='ml-xs-2' src={IconPoints} alt=' points' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='d-flex-row j-c-end mt-xs-negative25'>
                    <div className='d-flex-column w-33'>
                        <div className='d-flex-row align-items-center j-c-center align-items-stretch position-relative third-position'>
                            <img className='third-position object-fit-cover bg-bronze-linear-gradient border-radius-100 p-xs-5' src={leaderboard?.leaderboard[2].image} />
                            <div className='podium-position-indicator p-xs-12 bg-bronze-radial-gradient d-flex-row align-items-center j-c-center position-absolute border-radius-100 top-0 right-0'>{leaderboard?.leaderboard[2].position}°</div>
                        </div>
                        <div className='text-info d-flex-column align-items-center'>
                            <div className='fsize-xs-1 t-align-center letter-spacing-1'>{handleUsername(leaderboard, leaderboard?.leaderboard[2].username, 12)}</div>
                            <div className='d-flex-row letter-spacing-1'>
                                <div className='grey-400 fsize-xs-1 letter-spacing-1'>{leaderboard?.leaderboard[2].points} </div>
                                <img className='ml-xs-2' src={IconPoints} alt=' points' />
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