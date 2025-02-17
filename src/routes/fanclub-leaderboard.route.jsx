import { useEffect, useState, useContext } from "react"
import { useOutletContext,Outlet, useNavigate, useLocation } from "react-router-dom"
import { CurrentFanContext } from "../contexts/currentFan.context"
import { CurrentArtistContext } from "../contexts/currentArtist.context"
import useFanclub from "../utils/get-fanclub.hooks"
import CardLeaderboardFan from "../components/card-leaderboard-fan.component"
import IconPoints from '../images/icons/icon-points.svg'
import Button from "../components/button.component"
import ModalRulesAuraboard from "../components/modal-rules-auraboard.component"
import IconInfo from '../images/icons/icon-info-black.svg'
import CommentsModalLayout from "../layout/comments-modal.layout"
import Container from "../layout/container.layout"
import SpotifyLogo from '../images/icons/icon-spotify.svg'
import CardConnectSpotify from "../components/card-connect-spotify.component"
const FanclubLeaderboardRoute = () => {
    /* MAJOR CHANGES */
    const { artist}  = useOutletContext()
    const location = useLocation()
    const { currentArtist } = useContext(CurrentArtistContext)
    const {currentFan} = useContext(CurrentFanContext)
    let artistF = location?.pathname.includes("/artist-app") ? currentArtist : artist
    const navigate = useNavigate()
    const fanclub = useFanclub(artistF?.id)

    //regole
    const storageKey = `rulesViewed_${artistF?.id}`
    const [rules, setRules] = useState(false)

    useEffect(() => {
        setRules(sessionStorage.getItem(storageKey) === "true" ? false : true)
    }, [storageKey])

    const closeRules = () => {
        setRules(false);
        sessionStorage.setItem(storageKey, "true")
    }

    const openRules = () => {
        setRules(true)
    }


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
    const [empty, setEmpty] = useState(true)
    useEffect(() => {
        if (fanclub?.leaderboard.length > 0) {
            setEmpty(false)
        }
    }, [fanclub])

    const handleSpotifyConnect = () => {
        localStorage.setItem('pageFrom', location?.pathname)
        navigate('/spotify-login')
    }
  return (
    <>
        {empty &&
            <div className="w-100 d-flex-column j-c-center align-items-center h-100 mt-xs-20 mb-xs-20">
                <div className=' w-70 bg-black-transp50 pt-xs-4 pb-xs-6 pl-xs-6 pr-xs-6 border-radius-06'>
                    {!location.pathname.includes("/artist-app") ?
                        <p className='t-align-center mb-xs-4 letter-spacing-1 grey-400 f-w-600'>Più interagisci con il fanclub di {artistF?.artistName}, più verrai riconosciuto come un suo Super fan.</p>
                    :
                        <p className='t-align-center mb-xs-4 letter-spacing-1 grey-400 f-w-600'>Qui vedrai i Superfan che intergiscono di più con te.</p>
                    }
                </div>
            </div>
        }
        
        {leaderboard && leaderboard.length > 0 &&
            <section className='mt-xs-4'>
            <div className='mb-xs-4'>
                <div className='d-flex-row j-c-center'>
                    <div className='d-flex-column align-items-center w-33'>
                        <div className='first-position podium-border position-relative' 
                            onClick={(event) => {
                            event.preventDefault();
                            if (!window.location.pathname.includes("artist-app")) {
                                navigate(`/artist/${artistF.slug}/leaderboard/fan`, { 
                                    state: { invokedModal: true, artist: artistF, fan: leaderboard[0] } 
                                });
                            }
                        }}>
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

                {leaderboard.length > 1 &&
                    <div className='d-flex-row j-c-start mt-xs-negative20'>
                    <div className='d-flex-column align-items-center w-33'>
                        <div className='second-position podium-border position-relative' 
                            onClick={(event) => {
                                event.preventDefault()
                                if (!window.location.pathname.includes("artist-app")) {
                                    navigate(`/artist/${artistF.slug}/leaderboard/fan`, { 
                                        state: { invokedModal: true, artist: artistF, fan: leaderboard[1] } 
                                    })
                                }
                            }}
                        >
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
                }
                
                {leaderboard.length > 2 &&
                    <div className='d-flex-row j-c-end mt-xs-negative25'>
                    <div className='d-flex-column align-items-center w-33'>
                        <div className='third-position podium-border position-relative' 
                        onClick={(event) => {
                            event.preventDefault();
                            if (!window.location.pathname.includes("artist-app")) {
                                navigate(`/artist/${artistF.slug}/leaderboard/fan`, { 
                                    state: { invokedModal: true, artist: artistF, fan: leaderboard[2] } 
                                });
                            }
                        }}>
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
                }
                
            </div>

            {leaderboard.map((fan, index) => index >= 3 &&
                <CardLeaderboardFan
                    fan={fan}
                    position={index + 1}
                    key={index}
                    onClick={(event) => {
                        event.preventDefault(); // Evita comportamenti indesiderati
                        if (!window.location.pathname.includes("artist-app")) {
                            navigate(`/artist/${artistF.slug}/leaderboard/fan`, {
                                state: { invokedModal: true, artist: artistF, fan: fan },
                            })
                        }
                    }}  
                    aura={true}           
                />)
            }
            
            </section>
        }   

        <div className='position-relative w-100 d-flex-column j-c-center align-items-center'>
            <Outlet /> 
        </div>
        {/* {
            rules &&
            <ModalRulesAuraboard closeModal={() => closeRules()}/>
        } */}
        {
            <div className='bg-acid-lime avatar-40 border-radius-100 bottom-5 right-5 position-fixed z-index-999 d-flex-row j-c-center align-items-center' onClick={() => openRules()}>
                <img className='' src={IconInfo}/>
            </div> 
            
        }
        <CommentsModalLayout
            modalOpen={rules}
            closeModal={closeRules}
        >
            <Container style={'d-flex-column j-c-center align-items-center h-100 pt-xs-8 pb-xs-8'}>
            <div className="d-flex-column h-100 j-c-space-between align-items-center">
            <div className="d-flex-column j-c-start align-items-center">
                <h1 className="fsize-xs-5 f-w-600 letter-spacing-1 mb-xs-4">
                    Che azioni danno punti?
                </h1>
                
            </div>
            <div>
                <p className='fsize-xs-2 f-w-300 t-align-center'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                {
                !currentFan.hasSpotify ?
                <CardConnectSpotify onClick={handleSpotifyConnect} />
                :
                <></>
                }
            </div>
            <div className="d-flex-column w-100">
                
                <Button 
                    style='bg-acid-lime fsize-xs-3 f-w-500 black mt-xs-2'
                    label='Chiudi'
                    onClick={closeRules}
                />
            </div>
            </div>
            </Container>
        </CommentsModalLayout>
    </>
  )
}

export default FanclubLeaderboardRoute