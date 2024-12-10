import { useEffect, useState, useContext } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'

import { ArtistsContext } from '../contexts/artists.context'
import { CurrentFanContext } from '../contexts/currentFan.context'
import { FanclubsContext } from '../contexts/fanclubs.context'
import { LiveQuizContext } from '../contexts/live-quiz.context'

import ContainerDefault from '../layout/container-default.layout'
import NavbarArtistPage from '../components/navbar-artist-page.component'
import CoverArtistPage from '../components/cover-artist-page.component'
import CardLeaderboardYourPosition from '../components/card-leaderboard-your-position.component'
import Button from '../components/button.component'
import Tab from '../components/tab.component'
import MessageFlashLeaderboard from '../components/message-flash-leaderboard.component'
import MessageFlashLeaderboardModal from '../components/message-flash-leaderboard-modal.component'
import CardInviteFriend from '../components/card-invite-friend.component'
import CardConnectSpotify from '../components/card-connect-spotify.component'
import MessageWhitePoints from '../components/message-white-points.component'
import FullPageCenter from '../layout/full-page-center.layout'

const ArtistRoute = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const { state, pathname } = useLocation()
    
    const { currentFan, setCurrentFan } = useContext(CurrentFanContext)
    const { artists } = useContext(ArtistsContext)
    const { fanclubs } = useContext(FanclubsContext)
    const { quizzes } = useContext(LiveQuizContext)
    const [ artistLiveQuizzes, setArtistLiveQuizzes] = useState()
    
    const [artist, setArtist] = useState()
    const fetchThisArtist = () => {
        if (!state?.artist) {
            console.error('State or state.artist is undefined')
            return
        }
        const thisArtist = artists.find(artist => state.artist.id === artist.id)
        setArtist(thisArtist)
    }

    const [fanclub, setFanclub] = useState()
    const fetchThisFanclub = () => {
        const thisFanclub = fanclubs.find(elem => elem.artistId === artist.id)
        setFanclub(thisFanclub)
    }

    const [userCompeting, setUserCompeting] = useState(false)
    const fetchCompeting = () => {
        if ( currentFan.followedArtists.length > 0 ) {
            const favouriteArtistIds = currentFan.followedArtists.map(followed => followed.artistId)

            if (favouriteArtistIds.includes(artist.id)) {
                setUserCompeting(true)
            } else {
                setUserCompeting(false)
            }
        } else {
            setUserCompeting(false)
        }
    }

    const [showMessageWhitePoints, setShowMessageWhitePoints] = useState(false)
    const [whitePoints, setWhitePoints] = useState(0)
    const [message, setMessage] = useState('')
    
    const handleCompete = () => {
        if (userCompeting) {
            const newfollowedArtists = currentFan.followedArtists.filter(leaderboard => leaderboard.artistId !== artist.id)
            setCurrentFan(prev => ({ ...prev, followedArtists: newfollowedArtists }))
        } else {
            if ((currentFan.followedArtists.length === 4) && !currentFan.actions.some(action => action.type === 'FIVE_ARTISTS_FOLLOWED')) {
                setCurrentFan(prev => ({
                    ...prev,
                    followedArtists: [...prev.followedArtists, { artistId: artist.id }],
                    whiteLabelPoints: Number(prev.whiteLabelPoints) + 10,
                    actions: [...prev.actions, { type: 'FIVE_ARTISTS_FOLLOWED', value: true, createdAt: new Date().toISOString().replace('T', ' ').split('.')[0] }]
                }))
                setShowMessageWhitePoints(true)
                setWhitePoints(10)
                setMessage('Segui almeno 5 artisti')
            } else {
                setCurrentFan(prev => ({
                    ...prev,
                    followedArtists: [...prev.followedArtists, { artistId: artist.id }],
                }))
            }
            
        }
    }

    const handleSpotifyConnect = () => {
        localStorage.setItem('pageFrom', '/profile')
        navigate('/spotify-login')
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
                setShowMessageWhitePoints(true)
                setWhitePoints(10)
                setMessage('Aggiungi Spotify')
    
            }
        }
        
    },[location.state])

    useEffect(() => {
        if (state && artists.length > 0) {
            fetchThisArtist()
        }
    }, [artists, state, artist])

    useEffect(() => {
        if (artist) {
            fetchCompeting()
        }
    }, [currentFan, artist])

    useEffect(() => {
        if (artist) {
            fetchThisFanclub()
        }
    }, [artist])

    /* recupero live quiz artista */
    useEffect(() => {
        if (artist){
            const artistLiveQuizzesFound = quizzes?.filter(quiz => quiz.artistId === artist?.id)
            setArtistLiveQuizzes(artistLiveQuizzesFound)
        }  

    }, [artist?.id])

    // this part of the code handles the flash leaderboard pop up
    const [modalOpen, setModalOpen] = useState(false)
    const [upperModalCompressed, setUpperModalCompressed] = useState(false)
    const [lowerModalCompressed, setLowerModalCompressed] = useState(true)
    
    const toggleModalContent = () => {
        let upperModalDelay
        let lowerModalDelay
        if ( upperModalCompressed ) {
            upperModalDelay = 300
            lowerModalDelay = 0
        } else {
            upperModalDelay = 0
            lowerModalDelay = 300
        }

        setTimeout(() => {
            setUpperModalCompressed(!upperModalCompressed)
        }, upperModalDelay)
        setTimeout(() => {
            setLowerModalCompressed(!lowerModalCompressed)
        }, lowerModalDelay)
    }

    useEffect(() => {
        setTimeout(() => {
            setModalOpen(true)
        }, 600) 
    }, [])

    const sortQuizzes = (a,b) => {
      const dateA = new Date(a.playDate)
      const dateB = new Date(b.playDate)
      return dateB - dateA
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const orderedQuizzes = quizzes
    .filter(quiz2 => {
        const isArtistQuiz = quiz2.artistId === artist?.id
        const quizDate = new Date(quiz2.playDate)
        const isToday = quizDate <= today 
        const hasPlayed = quiz2.responses.some(response => response.userId === currentFan.id)

        return isArtistQuiz && isToday && !hasPlayed
    })
    .sort((a, b) => sortQuizzes(a,b)) 

    const [quizEnded, setQuizEnded] = useState(false)

    const handleQuizShow = (event) => {
        event.preventDefault()
      if (orderedQuizzes?.length > 0) {
        const nextQuiz = orderedQuizzes[0].id
        navigate('/quiz', { replace: true, state: { id: nextQuiz } })
      } else {
        setQuizEnded(true)
      }
      
    }

    const [isExiting, setIsExiting] = useState(false)

    
    useEffect(() => {
        if (quizEnded) {
            const exitDelay = setTimeout(() => {
                setIsExiting(true)
            }, 1000)

            return () => clearTimeout(exitDelay)
        }
    }, [quizEnded])

    useEffect(() => {
        if (isExiting) {
            const endDelay = setTimeout(() => {
                setQuizEnded(false)
                setIsExiting(false)
            }, 400)

            return () => clearTimeout(endDelay)
        }
    }, [isExiting])


   

    return (
        <>
            <NavbarArtistPage artist={artist} onClick={(event) => handleQuizShow(event)}  />
            <CoverArtistPage artist={artist} userCompeting={userCompeting} handleCompete={handleCompete} currentFan={currentFan}  />
            

            <ContainerDefault containerSpecificStyle={''}>
                
                <div className='mt-avatar-header position-sticky top-navbar z-index-999 bg-dark'>
                    {artist?.flashLeaderboard.status === 'CLOSED_VISIBLE' ?
                        <MessageFlashLeaderboard
                            artist={artist}
                            userCompeting={userCompeting}
                        />
                    : 
                        null
                    }
                    
                    {fanclub?.isActive &&
                        <Tab
                            artist={artist}
                        />
                    }
                    
                    {!currentFan.hasSpotify &&
                        <CardConnectSpotify
                            onClick={handleSpotifyConnect}
                        />
                    }
                    {currentFan.hasSpotify && !userCompeting &&
                        <Button
                            style='bg-acid-lime fsize-xs-3 f-w-500 black mt-xs-4'
                            label='Competi nella classifica'
                            onClick={handleCompete}
                        />
                    }
                    {userCompeting && currentFan.hasSpotify && !pathname.includes('fanclub') &&
                        <CardLeaderboardYourPosition
                            currentFan={currentFan}
                            artist={artist}
                        />
                    }
                </div>
                <Outlet context={artist} />
                
            </ContainerDefault>

            {
                quizEnded && 
                <FullPageCenter className={'z-index-1100 bg-black-transp70'}>
                    <ContainerDefault containerSpecificStyle={`centered-popup ${isExiting ? 'fade-out' : ''} position-absolute d-flex-column align-items-center gap-0_5em bg-dark-soft border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 `}>
                        <div className='d-flex-column align-items-center j-c-center w-100 pt-xs-2 pb-xs-2 pr-xs-2 pl-xs-2'>
                            <h2 className='fsize-xs-3 f-w-300 t-align-center'>Non ci sono quiz di</h2>
                            <h2 className='fsize-xs-3 f-w-300 t-align-center lime-400'>{artist?.artistName}</h2>
                            <h2 className='fsize-xs-3 f-w-300 t-align-center'>disponibili per ora</h2>

                        </div>
                    </ContainerDefault>
	            </FullPageCenter>
            }
            
            
            
            
            {showMessageWhitePoints && 
                <MessageWhitePoints
                    points={whitePoints}
                    message={message}
                    onClick={() => setShowMessageWhitePoints(false)}
                />
            }

            {artist?.flashLeaderboard.status === 'PENDING' || artist?.flashLeaderboard.status === 'ONGOING' ?
                <MessageFlashLeaderboardModal
                    artist={artist}
                    userCompeting={userCompeting}
                    modalOpen={modalOpen}
                    toggleModalContent={toggleModalContent}
                    upperModalCompressed={upperModalCompressed}
                    lowerModalCompressed={lowerModalCompressed}
                />
            : 
                null
            }
            
            {!pathname.includes('fanclub') &&
                <ContainerDefault containerSpecificStyle={`position-sticky z-index-5 ${upperModalCompressed ? 'bottom-14' : 'bottom-2'}`}>
                    <CardInviteFriend artist={artist} />
                </ContainerDefault>
            }
        </>
    )
}

export default ArtistRoute