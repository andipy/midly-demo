import { useState, useEffect, useContext } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { CurrentFanContext } from '../contexts/currentFan.context'
import { ArtistsContext } from '../contexts/artists.context'
import { FlashLeaderboardsContext } from '../contexts/flash-leaderboards.context'

import ContainerDefault from '../layout/container-default.layout'
import FullPageCenter from '../layout/full-page-center.layout'

import NavbarLeaderboardFlashPage from '../components/navbar-leaderboard-flash-page.component'
import CoverArtistPage from '../components/cover-artist-page.component'
import CardLeaderboardYourPosition from '../components/card-leaderboard-your-position.component'
import Button from '../components/button.component'
import CardLeaderboardFan from '../components/card-leaderboard-fan.component'
import LiveMessages from '../components/live-messages.component'
import LiveMusicProduct from '../components/live-music-product.component'
import SimpleSpinnerLoader from '../components/simple-spinner-loader.component'

import IconPoints from '../images/icons/icon-point-xs.svg'
import IconTime from '../images/icons/icon-time-2.svg'
import SpecialBadge1P from '../images/illustrations/flash-podium-1.png'
import SpecialBadge2P from '../images/illustrations/flash-podium-2.png'
import SpecialBadge3P from '../images/illustrations/flash-podium-3.png'

const FlashLeaderboardRoute = () => {

    const [showComponent, setShowComponent] = useState(null)
    const closePopup = () => {
        const now = new Date()
        localStorage.setItem('showFlashLeaderboardPopUp', false)
        localStorage.setItem('showFlashLeaderboardPopUpExpiry', now.getTime())
        setShowComponent(false)
    }
    useEffect(() => {
        const now = new Date()
        if ( localStorage.getItem('showFlashLeaderboardPopUp') ) {
            if ( localStorage.getItem('showFlashLeaderboardPopUp') === false ) {
                setShowComponent(false)
            }
            console.log(localStorage.getItem('showFlashLeaderboardPopUpExpiry'))
            if ( ( now - localStorage.getItem('showFlashLeaderboardPopUpExpiry') ) > ( 24 * 60 * 60 * 1000 ) ) {
                localStorage.removeItem('showFlashLeaderboardPopUp')
                localStorage.removeItem('showFlashLeaderboardPopUpExpiry')
            }
        } else {
            setShowComponent(true)
        }
    }, [])

    const { state, pathname } = useLocation()

    const { currentFan } = useContext(CurrentFanContext)
    
    const { artists } = useContext(ArtistsContext)
    const [artist, setArtist] = useState(null)
    const fetchThisArtist = () => {
        const thisArtist = artists.find(artist => state.id === artist.id)
        setArtist(thisArtist)
    }

    useEffect(() => {
        if ( artists ) {
            fetchThisArtist()
        }
    }, [artists])

    const { flashLeaderboards } = useContext(FlashLeaderboardsContext)
    const [leaderboard, setLeaderboard] = useState()
    const fetchThisLeaderboard = () => {
        const thisLeaderboard = flashLeaderboards.filter(elem => artist.id === elem.artistId)
        setLeaderboard(thisLeaderboard[0])
    }

    useEffect(() => {
        if ( artist ) {
            fetchThisLeaderboard()
        }
    }, [artist])

    return (
        <>
            <NavbarLeaderboardFlashPage artist={artist} leaderboard={leaderboard} />
            <CoverArtistPage leaderboard={leaderboard} />

            <ContainerDefault containerSpecificStyle='mt-avatar-header-2 pb-xs-24 pb-md-8'>
                <div className='d-flex-column position-sticky top-navbar z-index-max'>
                    <LiveMusicProduct artist={artist} leaderboard={leaderboard} />
                    {currentFan.hasSpotify && !pathname.includes('artist-app') ?
                        <CardLeaderboardYourPosition currentFan={currentFan}  />
                    : !pathname.includes('artist-app') &&
                        <Button style='bg-green-spotify white letter-spacing-1 f-w-500 mt-xs-4' label='CONNETTI SPOTIFY E COMPETI' />
                    }
                </div>
                
                {leaderboard ?
                    <section className={pathname.includes('artist-app') ? 'mt-xs-4' : ''}>
                    <div className='mb-xs-4'>
                        <div className='d-flex-row j-c-center'>
                            <div className='d-flex-column align-items-center w-33 position-relative gap-0_5em'>
                                <div className='first-position position-relative'>
                                    <img className='position-absolute-x-y first-position-graphic z-index-2' src={SpecialBadge1P} />
                                    
                                    {leaderboard?.leaderboard[0].image ?
                                        <img className='first-position position-absolute-x-y object-fit-cover border-radius-100 p-xs-6 z-index-1' src={leaderboard?.leaderboard[0].image} />
                                    :
                                        <div className='first-position position-absolute-x-y bg-dark-soft border-radius-100 z-index-1 d-flex-row align-items-center j-c-center fsize-xs-6'>{leaderboard?.leaderboard[0].username.charAt(0)}</div>
                                    }
                                </div>

                                <div className='d-flex-column align-items-center'>
                                    <span className='fsize-xs-1 t-align-center letter-spacing-1'>{leaderboard?.leaderboard[0].username.length > 12 ? leaderboard?.leaderboard[0].username.substring(0, 12) + '...' : leaderboard?.leaderboard[0].username}</span>
                                    <div className='d-flex-row letter-spacing-1'>
                                        <span className='grey-400 fsize-xs-1 letter-spacing-1'>{leaderboard?.leaderboard[0].points}</span>
                                        <img className='ml-xs-2' src={IconPoints} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='d-flex-row j-c-start mt-xs-negative10'>
                            <div className='d-flex-column align-items-center w-33 position-relative gap-0_5em'>
                                <div className='second-position position-relative'>
                                    <img className='position-absolute-x-y second-position-graphic z-index-2' src={SpecialBadge2P} />

                                    {leaderboard?.leaderboard[1].image ?
                                        <img className='second-position position-absolute-x-y object-fit-cover border-radius-100 p-xs-6 z-index-1' src={leaderboard?.leaderboard[1].image} />
                                    :
                                        <div className='second-position position-absolute-x-y bg-dark-soft border-radius-100 z-index-1 d-flex-row align-items-center j-c-center fsize-xs-6'>{leaderboard?.leaderboard[1].username.charAt(0)}</div>
                                    }
                                </div>

                                <div className='d-flex-column align-items-center'>
                                    <span className='fsize-xs-1 t-align-center letter-spacing-1'>{leaderboard?.leaderboard[1].username.length > 12 ? leaderboard?.leaderboard[1].username.substring(0, 12) + '...' : leaderboard?.leaderboard[1].username}</span>
                                    <div className='d-flex-row letter-spacing-1'>
                                        <span className='grey-400 fsize-xs-1 letter-spacing-1'>{leaderboard?.leaderboard[1].points}</span>
                                        <img className='ml-xs-2' src={IconPoints} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='d-flex-row j-c-end mt-xs-negative35'>
                            <div className='d-flex-column align-items-center w-33 position-relative gap-0_5em'>
                                <div className='third-position position-relative'>
                                    <img className='position-absolute-x-y third-position-graphic z-index-2' src={SpecialBadge3P} />

                                    {leaderboard?.leaderboard[2].image ?
                                        <img className='third-position position-absolute-x-y object-fit-cover border-radius-100 p-xs-6 z-index-1' src={leaderboard?.leaderboard[2].image} />
                                    :
                                        <div className='third-position position-absolute-x-y bg-dark-soft border-radius-100 z-index-1 d-flex-row align-items-center j-c-center fsize-xs-6'>{leaderboard?.leaderboard[2].username.charAt(0)}</div>
                                    }
                                </div>

                                <div className='d-flex-column align-items-center'>
                                    <span className='fsize-xs-1 t-align-center letter-spacing-1'>{leaderboard?.leaderboard[2].username.length > 12 ? leaderboard?.leaderboard[2].username.substring(0, 12) + '...' : leaderboard?.leaderboard[2].username}</span>
                                    <div className='d-flex-row letter-spacing-1'>
                                        <span className='grey-400 fsize-xs-1 letter-spacing-1'>{leaderboard?.leaderboard[2].points}</span>
                                        <img className='ml-xs-2' src={IconPoints} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {leaderboard?.leaderboard.map(fan => fan.position > 3 &&
                        <CardLeaderboardFan
                            fan={fan}
                            key={fan.position}
                        />
                    )}
                </section>
                :
                <div className='mt-xs-8 mb-xs-8'>
                    <SimpleSpinnerLoader />
                </div>
                }
            </ContainerDefault>

            {showComponent &&
                <FullPageCenter className={'z-index-max bg-black-transp70'}>
                    <ContainerDefault containerSpecificStyle={'centered-popup position-absolute d-flex-column align-items-center gap-0_5em bg-dark-soft-2 border-radius-04 pt-xs-6 pb-xs-6 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2'}>
                        <img className='avatar-48' src={IconTime} />
                        <p className='fsize-xs-4 grey-100 f-w-300 t-align-center'>Gli ascolti che fai in Spotify si trasformano in punti nella classifica circa entro 60 minuti, ricarica la pagina per aggiornare la classifica.</p>
                        <Button style='bg-acid-lime black border-radius-04 fsize-xs-3 f-w-500 mt-xs-4' label='Ho capito' onClick={closePopup} />
                    </ContainerDefault>
                </FullPageCenter>
            }

            <LiveMessages />

            <Outlet />
        </>
    )
}

export default FlashLeaderboardRoute