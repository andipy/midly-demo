import { useEffect, useState, useContext } from "react"
import { useOutletContext,Outlet, useNavigate } from "react-router-dom"
import { CurrentFanContext } from "../contexts/currentFan.context"
import useFanclub from "../utils/get-fanclub.hooks"
import CardLeaderboardFan from "../components/card-leaderboard-fan.component"
import IconPoints from '../images/icons/icon-points.svg'
import CardLeaderboardYourPosition from "../components/card-leaderboard-your-position.component"

const FanclubLeaderboardRoute = () => {
    const {context} = useOutletContext()
    const navigate = useNavigate()
    const fanclub = useFanclub(context?.id)
    const {currentFan} = useContext(CurrentFanContext)
    const [leaderboard, setLeaderboard] = useState()
    useEffect(() => {
        if (fanclub) {
            const sortedLeaderboard = fanclub.leaderboard.sort((a, b) => b.auraPoints - a.auraPoints)
            setLeaderboard(sortedLeaderboard)
        }
    }, [fanclub])
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
    <>
        {leaderboard &&
            <section className='mt-xs-4'>
            <div className='mb-xs-4'>
                <div className='d-flex-row j-c-center'>
                    <div className='d-flex-column align-items-center w-33'>
                        <div className='first-position podium-border position-relative' onClick={(event) => {event.preventDefault(); navigate(`/artist/${context.slug}/fanclub/leaderboard/fan`, {state: { invokedModal: true, artist: context, fan: leaderboard[0] }});}}>
                            {leaderboard[0].image &&
                                <img className='object-fit-cover position-absolute-x-y podium-border-empty-image-inner z-index-2' src={leaderboard[0].image} />
                            }
                            <div className='d-flex-row j-c-center align-items-center podium-border-empty-image-inner position-absolute-x-y z-index-1'>
                                {leaderboard[0].username.slice(0, 1).toUpperCase()}
                            </div>
                            <div className='podium-position-indicator p-xs-16 bg-brand-gradient black f-w-600 d-flex-row align-items-center j-c-center position-absolute border-radius-100 top-0 right-0'>{leaderboard.indexOf(leaderboard[0]) + 1}°</div>
                        </div>
                        <div className='text-info d-flex-column align-items-center'>
                            <div className='fsize-xs-1 t-align-center letter-spacing-1'>{handleUsername(leaderboard, leaderboard[0].username, 12)}</div>
                            <div className='d-flex-row letter-spacing-1'>
                                <div className='grey-400 fsize-xs-1 letter-spacing-1'>{leaderboard[0].auraPoints} </div>
                                <img className='avatar-12 ml-xs-2 mt-xs-5' src={IconPoints} alt=' points' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='d-flex-row j-c-start mt-xs-negative20'>
                    <div className='d-flex-column align-items-center w-33'>
                        <div className='second-position podium-border position-relative' onClick={(event) => {event.preventDefault(); navigate(`/artist/${context.slug}/fanclub/leaderboard/fan`, {state: { invokedModal: true, artist: context, fan: leaderboard[1] }});}}>
                            {leaderboard[1].image &&
                                <img className='object-fit-cover position-absolute-x-y podium-border-empty-image-inner z-index-2' src={leaderboard[1].image} />
                            }
                            <div className='d-flex-row j-c-center align-items-center podium-border-empty-image-inner position-absolute-x-y z-index-1'>
                                {leaderboard[1].username.slice(0, 1).toUpperCase()}
                            </div>
                            <div className='podium-position-indicator p-xs-16 bg-brand-gradient black f-w-600 d-flex-row align-items-center j-c-center position-absolute border-radius-100 top-0 right-0'>{leaderboard.indexOf(leaderboard[1]) + 1}°</div>
                        </div>
                        <div className='text-info d-flex-column align-items-center'>
                            <div className='fsize-xs-1 t-align-center letter-spacing-1'>{handleUsername(leaderboard, leaderboard[1].username, 12)}</div>
                            <div className='d-flex-row letter-spacing-1'>
                                <div className='grey-400 fsize-xs-1 letter-spacing-1'>{leaderboard[1].auraPoints} </div>
                                <img className='avatar-12 ml-xs-2 mt-xs-5' src={IconPoints} alt=' points' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='d-flex-row j-c-end mt-xs-negative25'>
                    <div className='d-flex-column align-items-center w-33'>
                        <div className='third-position podium-border position-relative' onClick={(event) => {event.preventDefault(); navigate(`/artist/${context.slug}/fanclub/leaderboard/fan`, {state: { invokedModal: true, artist: context, fan: leaderboard[2] }});}}>
                            {leaderboard[2].image &&
                                <img className='object-fit-cover position-absolute-x-y podium-border-empty-image-inner z-index-2' src={leaderboard[2].image} />
                            }
                            <div className='d-flex-row j-c-center align-items-center podium-border-empty-image-inner position-absolute-x-y z-index-1'>
                                {leaderboard[2].username.slice(0, 1).toUpperCase()}
                            </div>
                            <div className='podium-position-indicator p-xs-16 bg-brand-gradient black f-w-600 d-flex-row align-items-center j-c-center position-absolute border-radius-100 top-0 right-0'>{leaderboard.indexOf(leaderboard[2]) + 1}°</div>
                        </div>
                        <div className='text-info d-flex-column align-items-center'>
                            <div className='fsize-xs-1 t-align-center letter-spacing-1'>{handleUsername(leaderboard, leaderboard[2].username, 12)}</div>
                            <div className='d-flex-row letter-spacing-1'>
                                <div className='grey-400 fsize-xs-1 letter-spacing-1'>{leaderboard[2].auraPoints} </div>
                                <img className='avatar-12 ml-xs-2 mt-xs-5' src={IconPoints} alt=' points' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {leaderboard.map((fan, index) => index >= 3 &&
                <CardLeaderboardFan
                    fan={fan}
                    position={index + 1}
                    key={index}
                    onClick={(event) => {
                        event.preventDefault(); // Evita comportamenti indesiderati
                        navigate(`/artist/${context.slug}/fanclub/leaderboard/fan`, {
                            state: { invokedModal: true, artist: context, fan: fan },
                        });
                    }}  
                    aura={true}           
                />)
            }
            
            
            </section>

        
        

        
        }   

        <div className='position-relative w-100 d-flex-column j-c-center align-items-center'>
            <Outlet /> 
        </div>
    </>
  )
}

export default FanclubLeaderboardRoute