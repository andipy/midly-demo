import {useContext, useEffect, useState} from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'

import { CurrentFanContext } from '../contexts/currentFan.context'
import { FanclubsContext } from '../contexts/fanclubs.context'
import { ArtistsContext } from '../contexts/artists.context'

import NavbarDefault from '../components/navbar-default.component'
import Container from '../layout/container.layout'
import TextTitle from '../components/text-title.component'
import Appbar from '../components/appbar.component'
import ProgressBar from '../components/progress-bar-points.component'
import MessageWhitePoints from '../components/message-white-points.component'

import IconPoints from '../images/icons/icon-points.svg'
/* import IconArrowRight from '../images/icons/icon-arrowright.svg' */
import IconArrowRight from '../images/icons-comp/arrow-right.icon'
import InfoLogo from '../images/icons/icon-info-white.svg'
import IconTerms from '../images/icons/icon-terms.svg'
/* import IconCookies from '../images/icons/icon-cookie.svg'*/
import IconCookie from '../images/icons-comp/cookie.icon'
import IconEdit from "../images/icons/icon-edit.svg"
import IconTrophyGold from '../images/icons/icon-trophy-gold.svg'
import IconOk from '../images/icons/icon-ok.svg'
import SettingsLogo from '../images/icons/icon-settings-white.svg'
import SpotifyLogo from '../images/icons/icon-spotify-full-green.svg'
import GoldBagde from '../images/illustrations/GOLD.png'
import MessageDisconnectSpotify from '../components/message-disconnect-spotify.component'

const ProfileRoute = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const { currentFan, setCurrentFan } = useContext(CurrentFanContext)
    const {fanclubs} = useContext(FanclubsContext)
    const {artists} = useContext(ArtistsContext)
    /* const [showMessageWhitePoints, setShowMessageWhitePoints] = useState(false)
    const [whitePoints, setWhitePoints] = useState(0)
    const [message, setMessage] = useState("") */


    const handleFileChange = (event) => {
        const file = event.target.files[0]
        /*modifica solo in locale ora*/
        
        if (file && file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file)
            if (currentFan.actions.some(action => action.type === 'PROFILE_IMAGE_ADDED')) {
                setCurrentFan((prev) => ({
                    ...prev,
                    image: imageUrl,
                }))
            } else {
                setCurrentFan((prev) => ({
                    ...prev,
                    image: imageUrl,
                    whiteLabelPoints: Number(prev.whiteLabelPoints) + 5,
                    actions: [...prev.actions, { type: 'PROFILE_IMAGE_ADDED', value: true, createdAt: new Date().toISOString().replace('T', ' ').split('.')[0] }]
                }))

                /* setShowMessageWhitePoints(true)
                setWhitePoints(5)
                setMessage('Aggiungi immagine di profilo') */
            }
        } else {
            return
        }
    }

    useEffect(() => {
        localStorage.removeItem('pageFrom')
        if (location.state?.returningFromSpotify) {
            if (currentFan.actions.some(action => action.type === 'SPOTIFY_ADDED')) {
                setCurrentFan((prev) => ({
                    ...prev,
                    hasSpotify: true,
                }))
            } else {
                setCurrentFan((prev) => ({
                    ...prev,
                    hasSpotify: true,
                    whiteLabelPoints: Number(prev.whiteLabelPoints) + 10,
                    actions: [...prev.actions, { type: 'SPOTIFY_ADDED', value: true, createdAt: new Date().toISOString().replace('T', ' ').split('.')[0] }]
                }))
                /* setShowMessageWhitePoints(true)
                setWhitePoints(10)
                setMessage('Aggiungi Spotify') */
    
            }
        }
        
    },[location.state])

    const handleSpotifyConnect = () => {
        //modulo connection spotify da gestire
        localStorage.setItem('pageFrom', '/profile')
        navigate('/spotify-login')
    }

    const logout = () => {
        /* gestisci logout */
        navigate('/login')
    }

    const [showMessageDisconnectSpotify, setShowMessageDisconnectSpotify] = useState(false)

    const disconnectSpotify = () => {
        setCurrentFan((prev) => ({
            ...prev,
            hasSpotify: false,
        }))
    }

    return (
        <>
        <NavbarDefault />
        <Container style={'pb-xs-appbar'}>
        <TextTitle title={'Profilo'} />
        
        <div>
            <div className='mt-xs-2 d-flex-column align-items-start mb-xs-12'>
                <div className='d-flex-row align-items-center w-100'>
                    <label>
                        {currentFan.image ? 
                            <img
                                src={currentFan.image}
                                className='avatar-96 border-radius-100'
                            />
                        : 
                            <div className='avatar-96 position-relative'>
                                <div className='d-flex-row j-c-center align-items-center avatar-96 border-radius-100 bg-purple-400'>
                                    <h5 className='f-w-500 fsize-xs-6'>
                                        {currentFan.username.charAt(0).toUpperCase()}
                                    </h5>
                                </div>
                                {/* <div className='d-flex-row align-items-center j-c-center    position-absolute-y right-neg5 position-absolute-x top-95 avatar-36 border-radius-100 bg-dark-gradient'>
                                    <div className='fsize-xs-3'>{5}</div>
                                    <img className='avatar-16 ml-xs-2' src={IconPoints} />
                                </div> */}
                            </div>
                            
                        }
                        <input type='file' accept='image/*' style={{ display: 'none' }} onChange={handleFileChange} onClick={(e) => {e.target.value = null}} />
                    </label>
                    <div className='d-flex-column j-c-start ml-xs-4 position-relative '>
                        <div className='d-flex-row align-items-center j-c-start'>
                            <h5 className='fsize-xs-5 f-w-500 letter-spacing-1'>{currentFan.username}</h5>
                            <Link to='/user-info-field-modify' state={{ field: 'USERNAME' }}><img className='avatar-22' src={IconEdit} /></Link>
                        </div>
                        <span className='fsize-xs-1 f-w-300 grey-200 letter-spacing-1 no-shrink grow-1 w-100'>Member since 2022-10-28</span>
                    </div>
                </div>
            </div>
            

            {!currentFan.hasSpotify && 
                <div className='mt-xs-4 mb-xs-4'>  
                    <div className='bg-dark-gradient-radial border-radius-1 d-flex-column align-items-start j-c-center pt-xs-8 pb-xs-8 pr-xs-8 pl-xs-8 position-relative'>
                        <div className='d-flex-row gap-0_25em align-items-center mb-xs-4 mt-xs-4'>
                            <img className='social-logo' src={SpotifyLogo} alt='SPOTIFY'/>
                            <span className='fsize-xs-3'>Connetti Spotify per fare punti!</span>
                        </div>
                        <p className='f-w-400 fsize-xs-1 grey-200 line-height-140'>Midly traccia i brani che ascolti e li converte in punti nelle classifiche degli artisti che segui!</p>
                        <button className='bg-green-spotify dark-900 mt-xs-4 letter-spacing-1 f-w-500' onClick={handleSpotifyConnect}>CONNETTI SPOTIFY</button>
                        {/* <div className='bg-dark-gradient border-radius-100 d-flex-row j-c-center align-items-center avatar-36 ml-xs-2 position-absolute top-2 right-2'>
                            <div className='d-flex-row align-items-center'>
                                <div className='fsize-xs-3'>{10}</div>
                                <img className='avatar-16 ml-xs-2' src={IconPoints} alt='points' />
                            </div>
                        </div> */}
                    </div>
                </div>  
            }

            {/* <section>
                <h4 className='fsize-xs-5 mb-lg-1 letter-spacing-2 f-w-500'>I tuoi punti personali</h4>
                <div className='mt-xs-4 mb-xs-4'>
                    <Link to='/personal-user-points'>
                        <div className='bg-dark-gradient border-radius-1 d-flex-row j-c-space-between align-items-center pt-xs-4 pb-xs-4 pl-xs-6 pr-xs-6'>
                            <div className='d-flex-column w-100 j-c-center align-items-center'>
                                <img className='avatar-28 border-radius-100' src={IconPoints} alt='points' />
                                <div className='d-flex-column j-c-center align-items-center mb-xs-4 mt-xs-4'>
                                    <div className='d-flex-row w-100 j-c-center align-items-center'>
                                        <span className='font-heading fsize-xs-4 f-w-600 letter-spacing-1 no-shrink'>I tuoi punti white label</span>
                                        <IconArrowRight color='white' size={32} viewBox={32} strokeWidth={2} />
                                    </div>
                                    <span className='grey-300 fsize-xs-1 f-w-300 letter-spacing-1 no-shrink mt-xs-2 t-align-center'>Usa questi punti nella classifica degli artisti che vuoi per scalare posizioni</span>
                                </div>
                                {currentFan.pointTank === 0 ? (
                                    <div className='d-flex-row w-100 j-c-space-between align-items-center'>
                                        <p className='f-w-400 fsize-xs-1 grey-200 line-height-140'>Scopri come guadagnare punti</p>
                                    </div>
                                ) : (
                                    <div className='d-flex-row w-100 j-c-space-between align-items-center'>
                                        <ProgressBar points={currentFan.whiteLabelPoints} max={50}/>   
                                    </div>  
                                )}
                            </div>
                            <div className='d-flex-row j-c-end align-items-center'>
                                <img src={IconArrowRight} alt='->'/>
                            </div>      
                        </div>
                    </Link>
                </div>
            </section> */}

            <section className='mt-xs-4 mb-xs-4'>
                {/* <h4 className='fsize-xs-5 mb-lg-1 letter-spacing-2 f-w-500 mb-xs-2'>I tuoi riconoscimenti</h4> */}
                <Link to='/badges'>
                    <div>
                        <div className='bg-dark-gradient d-flex-row border-radius-1 d-flex-row j-c-space-between align-items-center pt-xs-6 pb-xs-6 pl-xs-6 pr-xs-6'>
                            <div className='d-flex-column w-100 j-c-center align-items-center'>
                                <img className='avatar-32' src={IconTrophyGold} alt='Y' />
                                <div className='d-flex-column w-100 align-items-center j-c-center mt-xs-4'>
                                    <div className='d-flex-row w-100 j-c-center align-items-center'>
                                        <span className='font-heading fsize-xs-4 f-w-600 letter-spacing-1 no-shrink'>I tuoi badge</span>
                                        <IconArrowRight color='white' size={32} viewBox={32} strokeWidth={2} />
                                    </div>
                                    
                                    <span className='grey-300 fsize-xs-1 f-w-300 letter-spacing-1 no-shrink mt-xs-2 t-align-center'>Vedi qui il tuo andamento nel corso dei mesi nelle classifiche dei tuoi artisti preferiti</span>
                                </div>
                            </div>
                           {/*  <div className='d-flex-row j-c-end align-items-center'>
                                     <img src={IconArrowRight} alt='->'/> 
                            </div> */}
                        </div> 
                    </div>
                </Link>
            </section>

            {currentFan.hasSpotify && 
                <div className='mt-xs-4 mb-xs-4'>
                    <div className='bg-dark-gradient-radial border-radius-1 d-flex-column j-c-center align-items-center w-100 pb-xs-4 pt-xs-4' onClick={() => setShowMessageDisconnectSpotify(true)}>
                        <div className='bg-black pl-xs-1 pr-xs-2 pt-xs-1 pb-xs-1 d-flex-row j-c-center align-items-center border-radius-100'>
                            <img className='avatar-36'src={SpotifyLogo} alt='SPOTIFY' />
                            <p className='fsize-xs-2 f-w-500 green-spotify'>Spotify connesso</p>
                        </div>
                        <div className='d-flex-row align-items-center j-c-space-between mt-xs-4'>
                            <p className='red-400 fsize-xs-1'>Tocca per disconnettere</p>
                        </div>
                    </div>
                </div>
            }
            {currentFan?.fanclubsSubscribed?.length > 0 &&
                <div className='mt-xs-4 mb-xs-4'>  
                    <div className='bg-dark-gradient-radial border-radius-1 d-flex-column align-items-start j-c-center pt-xs-8 pb-xs-8 pr-xs-8 pl-xs-8 position-relative'>
                        <div className='d-flex-row w-100 j-c-center align-items-center'>
                            <span className='font-heading fsize-xs-4 f-w-600 letter-spacing-1 no-shrink'>I tuoi punti aura</span>
                        </div>
                        <div className='d-flex-column w-100'>
                        {currentFan?.fanclubsSubscribed.map((item) => {
                            const fanclub = fanclubs.find(f => f.artistId === item.artistId)
                            const thisLeaderboard = fanclub?.leaderboard.sort((a, b) => b.auraPoints - a.auraPoints)
                            const thisArtist = artists?.find(artist => artist.id === item.artistId)
                            const thisUser = thisLeaderboard?.find(user => user.userId === currentFan.id)
                            
                            return fanclub ? (
                                <div className='d-flex-row j-c-space-between align-items-center w-100 mt-xs-4'>
                                    <div className='d-flex-row j-c-start align-items-center gap-0_5em'>
                                        <img className='avatar-32 border-radius-100' src={fanclub?.cover.url} />
                                        <p className='fsize-xs-2 f-w-500'>{thisArtist?.artistName}:</p>
                                    </div>
                                    <div className='d-flex-row j-c-end align-items-center'>
                                        <p className='fsize-xs-2 f-w-500'>{thisUser?.auraPoints}</p>
                                        <img className='avatar-16 ml-xs-2' src={IconPoints} alt='points' />
                                    </div>
                                </div>
                            ) : null;
                        })}
                        </div>
                    </div>
                </div> 
            }
        </div>

        <section>
            <div id='profile-settings' className='mt-xs-12 mt-lg-5'> 
                <h4 className='fsize-xs-5 mb-xs-4 mb-lg-2 letter-spacing-2 f-w-500'>Impostazioni</h4>
                <div className='d-flex-column'>
                    <Link to='/user-info'>
                        <div className='d-flex-row j-c-space-between mb-xs-3'>
                            <div className='d-flex-row align-items-center w-100'>
                                <img className='mr-xs-2' src={SettingsLogo} alt='SETTINGS' />
                                <h6 className='fsize-xs-3 f-w-300 letter-spacing-1'>Informazioni personali</h6>
                            </div>
                            <IconArrowRight color='white' size={32} viewBox={32} strokeWidth={2} />
                        </div>
                    </Link>
                    <Link to='/payments-info'>
                        <div className='d-flex-row j-c-space-between mb-xs-3'>
                            <div className='d-flex-row align-items-center w-100'>
                                <div className='avatar-32 bg-dark-gradient mr-xs-2'></div>
                                <h6 className='fsize-xs-3 f-w-300 letter-spacing-1'>Informazioni di pagamento</h6>
                            </div>
                            <IconArrowRight color='white' size={32} viewBox={32} strokeWidth={2} />
                        </div>
                    </Link>
                    <Link to='/subscriptions'>
                        <div className='d-flex-row j-c-space-between mb-xs-3'>
                            <div className='d-flex-row align-items-center w-100'>
                            <div className='avatar-32 bg-dark-gradient mr-xs-2'></div>
                                <h6 className='fsize-xs-3 f-w-300 letter-spacing-1'>Abbonamenti</h6>
                            </div>
                            <IconArrowRight color='white' size={32} viewBox={32} strokeWidth={2} />
                        </div>
                    </Link>
                    <Link to='/faq'>
                        <div className='d-flex-row j-c-space-between mb-xs-3'>
                            <div className='d-flex-row align-items-center w-100'>
                                <img className='mr-xs-2' src={InfoLogo} alt='SETTINGS' />
                                <h6 className='fsize-xs-3 f-w-300 letter-spacing-1'>FAQs</h6>
                            </div>
                            <IconArrowRight color='white' size={32} viewBox={32} strokeWidth={2} />
                        </div>
                    </Link>
                    <Link to='/terms-and-conditions-fans'>
                        <div className='d-flex-row j-c-space-between mb-xs-3'>
                            <div className='d-flex-row align-items-center w-100'>
                                <img className='mr-xs-2' src={IconTerms} alt='SETTINGS' />
                                <h6 className='fsize-xs-3 f-w-300 letter-spacing-1'>Termini e condizioni fan</h6>
                            </div>
                            <IconArrowRight color='white' size={32} viewBox={32} strokeWidth={2} />
                        </div>
                    </Link>
                    <Link to='/privacy-policy-fans'>
                        <div className='d-flex-row j-c-space-between mb-xs-3'>
                            <div className='d-flex-row align-items-center w-100'>
                                <img className='mr-xs-2' src={IconTerms} alt='O' />
                                <h6 className='fsize-xs-3 f-w-300 letter-spacing-1'>Privacy e policy fan</h6>
                            </div>
                            <IconArrowRight color='white' size={32} viewBox={32} strokeWidth={2} />
                        </div>
                    </Link>
                    <Link to='/cookie-policy-fans'>
                        <div className='d-flex-row j-c-space-between mb-xs-3'>
                            <div className='d-flex-row align-items-center w-100'>
                                <IconCookie color='white' size={32} viewBox={32} strokeWidth={2} />
                                <h6 className='fsize-xs-3 f-w-300 letter-spacing-1'>Cookie policy</h6>
                            </div>
                            <IconArrowRight color='white' size={32} viewBox={32} strokeWidth={2} />
                        </div>
                    </Link>
                </div>
            </div>
            <div className='mt-xs-10 mb-xs-10 mt-lg--4 mb-lg-4' onClick={logout}>
                <h6 className='fsize-xs-3 f-w-500 blue-300 letter-spacing-1'>Esegui il log out</h6>
            </div>
            
            <div className='t-align-center mt-xs-5 mb-xs-2 mt-lg-2 mb-lg-1'>
                <span className='grey-300 fsize-xs-1'>© Midly Srl 2024 - DEMO</span>
            </div>
        </section>

        </Container>
        {/* {showMessageWhitePoints && 
            <MessageWhitePoints points={whitePoints} message={message} onClick={() => setShowMessageWhitePoints(false)} />
        } */}
        {showMessageDisconnectSpotify && 
            <MessageDisconnectSpotify onClick={() => disconnectSpotify()} close={() => setShowMessageDisconnectSpotify(false)} />
        }
        <Appbar />
        </>
    )
}

export default ProfileRoute