import { useState, useEffect, useContext } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

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
import MultistepExplanation from '../components/multistep-explanation.component'
import CardConnectSpotify from '../components/card-connect-spotify.component'

import IconPoints from '../images/icons/icon-points.svg'
import IconInfoLime from '../images/icons/icon-info-lime.svg'
import SpecialBadge1P from '../images/illustrations/flash-podium-1.png'
import SpecialBadge2P from '../images/illustrations/flash-podium-2.png'
import SpecialBadge3P from '../images/illustrations/flash-podium-3.png'

const FlashLeaderboardRoute = () => {

    const { state, pathname, } = useLocation()

    const { currentFan } = useContext(CurrentFanContext)
    const { flashLeaderboards } = useContext(FlashLeaderboardsContext)
    const { artists } = useContext(ArtistsContext)

    const [artist, setArtist] = useState(null)
    const [leaderboard, setLeaderboard] = useState()
    const [showComponent, setShowComponent] = useState(null)
    const [userCompeting, setUserCompeting] = useState(null)

    const sliderSteps = 5
    const [sliderPage, setSliderPage] = useState(1)
    const incrementPageSlider = () => {
        if ( sliderPage < sliderSteps ) {
            setSliderPage(prev => prev + 1)
        }
        if ( sliderPage === sliderSteps ) {
            closePopup()
        }
    }
    const decrementPageSlider = () => {
        if ( sliderPage > 1 ) {
            setSliderPage(prev => prev - 1)
        }
    }
    const closePopup = () => {
        const now = new Date()

        // Retrieve existing data or initialize an empty array
        const visitedFlashLeaderboards = JSON.parse(localStorage.getItem('visitedFlashLeaderboards') || '[]')

        if ( visitedFlashLeaderboards?.length === 0 ) {
            localStorage.setItem('visitedFlashLeaderboards', JSON.stringify([{
                flashLeaderboardId: leaderboard.id,
                visitedOn: now.getTime()
            }]))
            setShowComponent(false)
        } else {
            visitedFlashLeaderboards.map(elem => {
                if ( leaderboard.id !== elem.flashLeaderboardId ) {
                    const updatedData = [...visitedFlashLeaderboards, {
                        flashLeaderboardId: leaderboard.id,
                        visitedOn: now.getTime()
                    }]
                    localStorage.setItem('visitedFlashLeaderboards', JSON.stringify(updatedData))
                }
            })
            setShowComponent(false)
        }
    }

    const fetchThisArtist = () => {
        const thisArtist = artists.find(artist => state.id === artist.id)
        setArtist(thisArtist)
    }

    const fetchThisLeaderboard = () => {
        const thisLeaderboard = flashLeaderboards.filter(elem => artist.id === elem.artistId)
        setLeaderboard(thisLeaderboard[0])
    }

    const fetchCompeting = () => {
        if ( currentFan.leaderboardsFollowed.length > 0 ) {
            const favouriteArtistIds = currentFan.leaderboardsFollowed.map(followed => followed.artistId)

            if (favouriteArtistIds.includes(artist.id)) {
                setUserCompeting(true)
            } else {
                setUserCompeting(false)
            }
        } else {
            setUserCompeting(false)
        }
    }

    useEffect(() => {
        if ( artists ) {
            fetchThisArtist()
        }
    }, [artists])

    useEffect(() => {
        if ( artist ) {
            fetchThisLeaderboard()
        }
    }, [artist])

    useEffect(() => {
        if (artist) {
            fetchCompeting()
        }
    }, [currentFan, artist])

    useEffect(() => {
        if (leaderboard) {
            const now = new Date().getTime();
            const visitedFlashLeaderboards = JSON.parse(localStorage.getItem('visitedFlashLeaderboards') || '[]')

            const updatedVisited = visitedFlashLeaderboards.filter(elem => {
                // Keep only entries from the last 8 hours
                return now - elem.visitedOn <= 8 * 60 * 60 * 1000
            })

            localStorage.setItem('visitedFlashLeaderboards', JSON.stringify(updatedVisited))

            if (updatedVisited.some(elem => elem.flashLeaderboardId === leaderboard.id)) {
                setShowComponent(false)
            } else {
                if ( artist?.flashLeaderboard.status !== 'CLOSED_VISIBLE' ) {
                    setShowComponent(true)
                }
            }
        }
    }, [leaderboard])

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
            <NavbarLeaderboardFlashPage artist={artist} leaderboard={leaderboard} />
            <CoverArtistPage leaderboard={leaderboard} />

            <ContainerDefault containerSpecificStyle={`mt-avatar-header-2 pb-xs-24 pb-md-8 ${artist?.flashLeaderboard.status === 'CLOSED_VISIBLE' && 'pt-xs-8'}`}>
                <div className='d-flex-column position-sticky top-navbar z-index-max mb-xs-4'>
                    {artist?.flashLeaderboard.status === 'CLOSED_VISIBLE' &&
                        <CardLeaderboardYourPosition currentFan={currentFan}  />  
                    }
                    {artist?.flashLeaderboard.status !== 'CLOSED_VISIBLE' &&
                        <>
                            <LiveMusicProduct artist={artist} leaderboard={leaderboard} />
                            {!currentFan?.hasSpotify && !pathname.includes('/artist-app') &&
                                <CardConnectSpotify />
                            }
                            {currentFan?.hasSpotify && !userCompeting &&
                                <Button style='bg-acid-lime fsize-xs-3 f-w-500 black mt-xs-4' label='Competi nella classifica' />
                            }
                            {currentFan?.hasSpotify && userCompeting &&
                                <CardLeaderboardYourPosition currentFan={currentFan} artist={artist}  />
                            }
                        </>
                    }
                    
                </div>
                
                {leaderboard ?
                    <section className={pathname.includes('/artist-app') ? 'mt-xs-4' : ''}>
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
                                    <span className='fsize-xs-1 t-align-center letter-spacing-1'>{handleUsername(leaderboard, leaderboard?.leaderboard[0].username, 12)}</span>
                                    <div className='d-flex-row letter-spacing-1'>
                                        <span className='grey-400 fsize-xs-1 letter-spacing-1'>{leaderboard?.leaderboard[0].points}</span>
                                        <img className='avatar-12 ml-xs-2 mt-xs-5' src={IconPoints} />
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
                                    <span className='fsize-xs-1 t-align-center letter-spacing-1'>{handleUsername(leaderboard, leaderboard?.leaderboard[1].username, 12)}</span>
                                    <div className='d-flex-row letter-spacing-1'>
                                        <span className='grey-400 fsize-xs-1 letter-spacing-1'>{leaderboard?.leaderboard[1].points}</span>
                                        <img className='avatar-12 ml-xs-2 mt-xs-5' src={IconPoints} />
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
                                    <span className='fsize-xs-1 t-align-center letter-spacing-1'>{handleUsername(leaderboard, leaderboard?.leaderboard[2].username, 12)}</span>
                                    <div className='d-flex-row letter-spacing-1'>
                                        <span className='grey-400 fsize-xs-1 letter-spacing-1'>{leaderboard?.leaderboard[2].points}</span>
                                        <img className='avatar-12 ml-xs-2 mt-xs-5' src={IconPoints} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {leaderboard?.leaderboard
                        .sort((a, b) => b.points - a.points)
                        .map((fan, index) => index > 2 &&
                            <CardLeaderboardFan
                                fan={fan}
                                position={index + 1}
                                key={index}
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
                <MultistepExplanation sliderSteps={sliderSteps} leaderboard={leaderboard} artist={artist} sliderPage={sliderPage} incrementPageSlider={incrementPageSlider} decrementPageSlider={decrementPageSlider} />
            }

            {/* {showComponent &&
                <FullPageCenter className={'z-index-max bg-black-transp70'}>
                    <ContainerDefault containerSpecificStyle={'centered-popup position-absolute d-flex-column align-items-center gap-0_5em bg-dark-soft-2 border-radius-04 pt-xs-6 pb-xs-6 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2'}>
                        <img className='avatar-48' src={IconInfoLime} />
                        <section className='w-100'>
                            <h3 className='fsize-xs-5 grey-200 f-w-600 mt-xs-4 lime-400'>Come guadagnare punti?</h3>
                            <p className='fsize-xs-2 grey-100 f-w-300'>1) Ogni ascolto del brano {leaderboard?.song.title} vale 3 punti: ti permette di scalare la classifica FLASH più velocemente. Viene conteggiato massimo 10 volte al giorno.</p>

                            <p className='fsize-xs-3 grey-100 f-w-300 mt-xs-4'>2) Ogni altro brano di {state.artistName} ti fa fare 1 punto. Viene conteggiato massimo 3 volte al giorno.</p>
                        </section>

                        <section className='w-100'>
                            <h3 className='fsize-xs-5 grey-200 f-w-600 mt-xs-4 lime-400'>Dopo quanto tempo ricevo i punti?</h3>
                            <p className='fsize-xs-2 grey-100 f-w-300'>Gli ascolti che fai in Spotify si trasformano in punti nella classifica circa entro 60 minuti, ricarica la pagina per aggiornare la classifica.</p>
                        </section>

                        <section className='w-100'>
                            <h3 className='fsize-xs-5 grey-200 f-w-600 mt-xs-4 lime-400'>C'è qualcosa che non va?</h3>
                            <p className='fsize-xs-2 grey-100 f-w-300'>Scrivici per assitenza su telegram:</p>
                            <Link to='https://t.me/midlyofficial'>
                                <Button style='bg-none border-blue-bright-600 blue-bright-600 border-radius-02 fsize-xs-3 f-w-500 mt-xs-2' label='Chiedi aiuto sul canale telegram' />
                            </Link>
                        </section>
                        
                        <Button style='bg-acid-lime black border-radius-04 fsize-xs-3 f-w-500 mt-xs-4' label='Ho capito' onClick={closePopup} />
                    </ContainerDefault>
                </FullPageCenter>
            } */}

            {artist?.flashLeaderboard.status !== 'CLOSED_VISIBLE' ?
                <LiveMessages leaderboard={leaderboard} />
            : artist?.flashLeaderboard.status === 'CLOSED_VISIBLE' &&
                <div className='w-100vw bg-dark border-lime position-fixed bottom-0 z-index-max pt-xs-6 pb-xs-6 pl-xs-6 pb-xs-6'>
                    <p className='fsize-xs-4 mb-xs-2'>CLASSIFICA FLASH {leaderboard?.song.title ? "SUL BRANO " + leaderboard?.song.title : leaderboard?.album.title && "SULL'ALBUM " + leaderboard?.song.title} TERMINATA</p>
                    <p className='grey-200'>Puoi consultare la classifica finale, ma non puoi più fare punti. Se vedi qualche movimento è perché stiamo finendo di contare gli ascolti già fatti, ma la classifica è chiusa.</p>
                </div>
            }
            <Outlet />
        </>
    )
}

export default FlashLeaderboardRoute