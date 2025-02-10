import { useEffect, useState, useContext, useRef } from 'react'
import { useNavigate, useLocation, useParams, Navigate, Outlet } from 'react-router-dom'

import { ArtistsContext } from '../contexts/artists.context'
import { CurrentFanContext } from '../contexts/currentFan.context'
import { FanclubsContext } from '../contexts/fanclubs.context'
import { LiveQuizContext } from '../contexts/live-quiz.context'

import useFanclubSubscriptionHandler from '../utils/handle-subscription.hook'
import useFanclubSubscription from '../utils/get-fanclub-subscription.hook'
import useSubmitComment from '../utils/handle-submit-comment.hook'
import useLikeComment from '../utils/handle-like-comment.hook'
import useLikeReply from '../utils/handle-like-reply-comment.hook'
import useFanclub from '../utils/get-fanclub.hooks'
import useModal from '../utils/handle-modal.hooks' 
import useShare from '../utils/handle-share.hook'

import Container from '../layout/container.layout'
import NavbarArtistPage from '../components/navbar-artist-page.component'
import CoverArtistPage from '../components/cover-artist-page.component'
import CardLeaderboardYourPosition from '../components/card-leaderboard-your-position.component'
import Button from '../components/button.component'
import MessageFlashLeaderboard from '../components/message-flash-leaderboard.component'
import MessageFlashLeaderboardModal from '../components/message-flash-leaderboard-modal.component'
import CardInviteFriend from '../components/card-invite-friend.component'
import CardConnectSpotify from '../components/card-connect-spotify.component'
import MessageWhitePoints from '../components/message-white-points.component'
import FullPageCenter from '../layout/full-page-center.layout'
import ModalSubscriptionFanclub from '../components/modal-subscription-fanclub.component'
import CommentsModalLayout from '../layout/comments-modal.layout'
import NavbarCommentsModal from '../components/navbar-comments-modal.component'
import Comment from '../components/comment.component'
import TextbarComments from '../components/textbar-comments.component'
import TabFanclub from '../components/tab-fanclub.component'
import Snackbar from '../components/snackbar.component'

import IconFollow from '../images/icons/icon-follow.svg'
import IconUnfollow from '../images/icons/icon-unfollow.svg'

const ArtistRoute = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const { artistSlug } = useParams()

    const { state, pathname } = useLocation()
    
    const { currentFan, setCurrentFan } = useContext(CurrentFanContext)
    const { artists } = useContext(ArtistsContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)
    const { quizzes } = useContext(LiveQuizContext)
    const [ artistLiveQuizzes, setArtistLiveQuizzes] = useState()

    const { handleSubscription, err, isExiting } = useFanclubSubscriptionHandler()
    
    const [artist, setArtist] = useState()

    const fetchThisArtist = () => {
        if (state?.artist) {
            const thisArtist = artists.find(artist => state.artist.id === artist.id)
            setArtist(thisArtist)
            return
        }

        if (artistSlug) {
            const thisArtist = artists.find(artist => artist.slug === artistSlug)
            if (thisArtist) {
                setArtist(thisArtist)
            } else {
                console.error('Artist not found with slug:', artistSlug)
            }
        } else {
            console.error('No artist data found in state or URL')
        }
    }

    const fanclub = useFanclub(artist?.id)
    const hasUserSubscribed = useFanclubSubscription(artist?.id)

    const [userFollowing, setUserFollowing] = useState(false)
    const fetchCompeting = () => {
        if ( currentFan.followedArtists.length > 0 ) {
            const favouriteArtistIds = currentFan.followedArtists.map(followed => followed.artistId)

            if (favouriteArtistIds.includes(artist.id)) {
                setUserFollowing(true)
            } else {
                setUserFollowing(false)
            }
        } else {
            setUserFollowing(false)
        }
    }

    const [showMessageWhitePoints, setShowMessageWhitePoints] = useState(false)
    const [whitePoints, setWhitePoints] = useState(0)
    const [message, setMessage] = useState('')
    
    const handleFollow = () => {
        if (userFollowing) {
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
        if (artists.length > 0) {
            fetchThisArtist()
        }
    }, [artists, state, artistSlug])

    useEffect(() => {
        if (artist) {
            fetchCompeting()
        }
    }, [currentFan, artist])


    /* recupero live quiz artista */
    useEffect(() => {
        if (artist) {
            const artistLiveQuizzesFound = quizzes?.filter(quiz => quiz.artistId === artist?.id)
            setArtistLiveQuizzes(artistLiveQuizzesFound)
        }
    }, [artist?.id])

    // this part of the code handles the flash leaderboard pop up
    const [modalOpenFlash, setModalOpenFlash] = useState(false)
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
            setModalOpenFlash(true)
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

    const [settings, setSettings] = useState(false)
    const openSettings= () => {
        setSettings(true)
    }

    const [isExitingQuiz, setIsExitingQuiz] = useState(false)

    useEffect(() => {
        if (quizEnded) {
            const exitDelay = setTimeout(() => {
                setIsExitingQuiz(true)
            }, 1000)

            return () => clearTimeout(exitDelay)
        }
    }, [quizEnded])

    useEffect(() => {
        if (isExitingQuiz) {
            const endDelay = setTimeout(() => {
                setQuizEnded(false)
                setIsExitingQuiz(false)
            }, 400)

            return () => clearTimeout(endDelay)
        }
    }, [isExitingQuiz])

    const [isExitingSettings, setIsExitingSettings] = useState(false)
    useEffect(() => {
        if (isExitingSettings) {
            const endDelay = setTimeout(() => {
                setSettings(false)
                setIsExitingSettings(false)
            }, 400)

            return () => clearTimeout(endDelay)
        }
    }, [isExitingSettings])

    const openMessages = () => {
       navigate(`/artist/${artist.slug}/chat`, { state: { from: location, artist: artist } })
    }

    const [modalSubscription, setModalSubscription] = useState(false)

    /* const { handleSubscription, err, isExiting } = useFanclubSubscriptionHandler() */
    const { handleSubmitComment } = useSubmitComment()
    const { likeComment } = useLikeComment()
    const { likeReply} = useLikeReply()
   /*  const { modalOpen, openModal, closeModal } = useModal() */
    const { share, messageSnackbar, triggered } = useShare()
    const { modalOpen, openModal, closeModal } = useModal()
    

    const [postInFocus, setPostInFocus] = useState({
        id: undefined,
        action: undefined,
        post: undefined
    })
    const focusPost = (id, action) => {
        const thisPost = fanclub.posts.find(post => post.id === id)
        setPostInFocus({
            id: thisPost.id,
            action: action,
            post: thisPost
        })
    }

    // handle comment section
    const [currentComment, setCurrentComment] = useState({
        id: undefined,
        userId: undefined,
        userType: undefined,
        userImage: undefined,
        username: undefined,
        createdAt: undefined,
        comment: '',
        likes: [],
        comments: [],
        repliedUsername: undefined
    })
    const handleCurrentComment = (e) => {
        e.preventDefault()
        let commentsNumber
        let currentDate = new Date()
        let date = currentDate.toISOString().split('T')[0]
        fanclubs.map(fanclub => {
            if ( fanclub.artistId === artist?.id ) {
                fanclub.posts.map(post => {
                    if ( post.id === postInFocus.id ) {
                        commentsNumber = post?.commentsCount + 1
                    }
                })
            }
        })

        let replied
        if ( commentInFocus) {
            replied = replyingUser
        }

        setCurrentComment(prev => ({
            ...prev,
            id: commentsNumber,
            userId: currentFan.id,
            userType: currentFan.type,
            userImage: currentFan.image,
            username: currentFan.username,
            createdAt: date,
            comment: e.target.value,
            repliedUsername: replied
        }))
    }

    const inputRef = useRef(null)
    const [commentInFocus, setCommentInFocus] = useState(null)
    const [replyingUser, setReplyingUser] = useState(null)
    const spotCommentToReply = (id, username) => {
        setReplyingUser(username)
        setCommentInFocus(id)
        inputRef.current.focus()
    }

    const submitComment = (e) => {
        e.preventDefault()
        handleSubmitComment(currentComment, postInFocus, commentInFocus, artist?.id)
        setCurrentComment({
            id: undefined,
            userId: undefined,
            userType: undefined,
            userImage: undefined,
            username: undefined,
            createdAt: undefined,
            comment: '',
            likes: [],
            comments: [],
            repliedUsername: undefined
        })
        setCommentInFocus(null)
        setReplyingUser(null)
    }
    const openComments = (id) => {
        openModal()
    }
    const closeComments = () => {
        closeModal()
        setPostInFocus({
            id: undefined,
            action: undefined,
            post: undefined
        })
        setCommentInFocus(null)
    }

    useEffect(() => {
        if ( postInFocus.id ) {
            if ( postInFocus.action === 'OPEN_COMMENTS' ) {
                openComments()
            }
            if ( postInFocus.action === 'OPEN_SETTINGS' ) {
                navigate(`/artist-app/fanclub/${postInFocus.post.id}`, { state: { ...postInFocus.post, invokedModal: true } })
            }
            if ( postInFocus.action === 'SHARE_POST' ) {
                handleShare(postInFocus.post)
            }
            if ( postInFocus.action === 'FULL_SCREEN_POST' ) {
                navigate(`${postInFocus.post.id}`, { state: { postId: postInFocus.id, artistId: artist.id} })
            }
        }
    }, [postInFocus])
    
    /* const [modalSubscription, setModalSubscription] = useState(false)*/
    const handleShare = (post) => {
        share(post, artist?.id)
        setPostInFocus({
            id: undefined,
            action: undefined,
            post: undefined
        })
    }

    useEffect(() => {
        if (fanclub !== undefined) {
            if (fanclub?.isActive) {
                navigate(`/artist/${artistSlug}/posts`)
            } else {
                navigate(`/artist/${artistSlug}/leaderboard-streaming`)
            }

            if (fanclub === null) {
                navigate(`/artist/${artistSlug}/leaderboard-streaming`)
            }
        }
    }, [fanclub, navigate, artistSlug])

    return (
        <>
            <NavbarArtistPage artist={artist} onClick={(event) => handleQuizShow(event)} fanclub={fanclub} openSettings={() => openSettings()}  openMessages={openMessages} userSubscribed={hasUserSubscribed} openModalSubscription={() => setModalSubscription(true)} />

            <CoverArtistPage
                fanclub={fanclub}
                artist={artist}
                userFollowing={userFollowing}
                handleFollow={handleFollow}
                userSubscribed={hasUserSubscribed}
                openSettingsSubscription={() => openSettings()}
                openModalSubscription={() => setModalSubscription(true)}
            />

            <Container style='d-flex-column j-c-start mt-avatar-header'>
                <div className='d-flex-row j-c-space-between align-items-center'>
                    <h2 className='fsize-xs-5 f-w-600'>{fanclub?.name}</h2>
                </div>
                <p className='fsize-xs-2 f-w-400 grey-300'>{fanclub?.description}</p>
            </Container>
            
            <article className='position-sticky top-navbar z-index-999 bg-dark pb-xs-2'>
                <Container className='container'>
                    {artist?.flashLeaderboard.status === 'CLOSED_VISIBLE' &&
                        <MessageFlashLeaderboard artist={artist} />
                    }

                    {!currentFan.hasSpotify &&
                        <CardConnectSpotify onClick={handleSpotifyConnect} />
                    }

                    {/* MAJOR CHANGES */}
                    {/* {userFollowing && currentFan.hasSpotify && !pathname.includes('fanclub') &&
                        <CardLeaderboardYourPosition
                            currentFan={currentFan}
                            artist={artist}
                        />
                    } */}

                    <div className='d-flex-row gap-0_5em mt-xs-2'>
                        {/* {!hasUserSubscribed && userFollowing &&
                            <Button
                                style='bg-dark-soft-3 black w-20'
                                onClick={handleFollow}
                            >
                                <img src={IconUnfollow} />
                            </ Button>
                        } */}
                        {!userFollowing && !hasUserSubscribed &&
                            <Button
                                style='border-lime bg-black lime-400 fsize-xs-3 f-w-500 black'
                                label='Segui'
                                onClick={handleFollow}
                            >
                                <img src={IconFollow} />
                            </ Button>
                        }
                        {!hasUserSubscribed && fanclub?.isActive &&
                            <Button
                                style='border-lime bg-black lime-400 fsize-xs-3 f-w-500 black grow-1'
                                label='Abbonati'
                                onClick={() => setModalSubscription(true)}
                            />
                        }
                    </div>

                    {fanclub?.isActive &&
                        <TabFanclub />
                    }

                </Container>
            </article>

            <Container style=''>
                <Outlet context={{ artist, focusPost }} />
            </Container>

            {/* MAJOR CHANGES */}
            <CommentsModalLayout
                modalOpen={modalOpen}
                closeModal={closeComments}
            >
                <NavbarCommentsModal
                    closeModal={closeComments}
                />
                <Container style={'pb-xs-12 pb-sm-2'}>
                    {fanclub?.posts.map(post => {
                        if ( post.id ===  postInFocus.id) {
                            return post.comments.map(comment => {
                                return (
                                    <Comment
                                        comment={comment}
                                        key={comment.id}
                                        inputRef={inputRef}
                                        spotCommentToReply={spotCommentToReply}
                                        modalUserModeration={() => navigate('user-moderation', {state: { userId: comment.userId, commentId: comment.id, fanclubId: fanclub?.id, postId: post.id}})}
                                        likeComment = {() => likeComment(comment.id, post.id, artist.id)}
                                        postId={post.id}
                                        likeReply={(replyId, commentId, postId) => likeReply(replyId, commentId, postId, artist.id)}
                                    />
                                )
                            })
                        }})
                    }
                </Container>

                <TextbarComments
                    handleCurrentComment={handleCurrentComment}
                    handleSubmitComment={submitComment}
                    currentComment={currentComment}
                    setCurrentComment={setCurrentComment}
                    modalOpen={modalOpen}
                    inputRef={inputRef}
                    replyingUser={replyingUser}
                />

            </CommentsModalLayout>

            {quizEnded && 
                <FullPageCenter style='z-index-1100 bg-black-transp70'>
                    <Container style={`centered-popup ${isExitingQuiz ? 'fade-out' : ''} position-absolute d-flex-column align-items-center gap-0_5em bg-dark-soft border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 `}>
                        <div className='d-flex-column align-items-center j-c-center w-100 pt-xs-2 pb-xs-2 pr-xs-2 pl-xs-2'>
                            <h2 className='fsize-xs-3 f-w-300 t-align-center'>Non ci sono quiz di</h2>
                            <h2 className='fsize-xs-3 f-w-300 t-align-center lime-400'>{artist?.artistName}</h2>
                            <h2 className='fsize-xs-3 f-w-300 t-align-center'>disponibili per ora</h2>

                        </div>
                    </Container>
	            </FullPageCenter>
            }

            {showMessageWhitePoints && 
                <MessageWhitePoints
                    points={whitePoints}
                    message={message}
                    onClick={() => setShowMessageWhitePoints(false)}
                />
            }

            {(artist?.flashLeaderboard.status === 'PENDING' || artist?.flashLeaderboard.status === 'ONGOING')  ?
                <MessageFlashLeaderboardModal
                    artist={artist}
                    modalOpen={modalOpenFlash}
                    toggleModalContent={toggleModalContent}
                    upperModalCompressed={upperModalCompressed}
                    lowerModalCompressed={lowerModalCompressed}
                />
            : 
                null
            }

            {settings &&
            <FullPageCenter style='z-index-1000 bg-black-transp70'>
                <Container style={`centered-popup ${isExitingSettings ? 'fade-out' : ''} position-absolute d-flex-column align-items-center gap-0_5em bg-dark-soft border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 `}>
                    <div className='w-100 d-flex-column mt-xs-4 gap-1em'>
                        <p className='fsize-xs-4 grey-100'>Gestisci il tuo abbonamento al fanclub di {artist?.artistName}.</p>
                        {
                            !hasUserSubscribed ?
                            <Button
                                disabled={false}
                                style='fsize-xs-3 f-w-600 letter-spacing-1 bg-acid-lime black border-lime border-radius-04'
                                label='Abbonati'
                                onClick={() => {handleSubscription(artist?.id); setIsExitingSettings(true)}}
                            />
                            :
                            <Button
                                disabled={false}
                                style='fsize-xs-3 f-w-600 letter-spacing-1 bg-red-300 black border-radius-04'
                                label='Disattiva abbonamento'
                                onClick={() => {handleSubscription(artist?.id); setIsExitingSettings(true)}}
                            />
                        }
                        
                        <Button
                            disabled={false}
                            style='fsize-xs-3 f-w-400 letter-spacing-1 bg-dark-soft-2 white  border-radius-04'
                            label='Chiudi'
                            onClick={() => setIsExitingSettings(true)} 
                        />
                    </div>
                </Container>
            </FullPageCenter>
            }

            {err && 
                <FullPageCenter style='z-index-1100 bg-black-transp70'>
                    <Container style={`centered-popup ${isExiting ? 'fade-out' : ''} position-absolute d-flex-column align-items-center gap-0_5em bg-red-400 border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 `}>
                        <div className='d-flex-column align-items-center j-c-center w-100 pt-xs-2 pb-xs-2 pr-xs-2 pl-xs-2'>
                            <h2 className='fsize-xs-2 f-w-300 t-align-center'>Il fanclub di {artists.find(artist => artist.id === fanclub?.artistId).artistName} è al completo</h2>
                        </div>
                    </Container>
	            </FullPageCenter>
            }

            {/* MAJOR CHANGES */}
            {/* {!pathname.includes('fanclub') &&
                <Container style={`position-sticky z-index-5 ${upperModalCompressed ? 'bottom-14' : 'bottom-2'}`}>
                    <CardInviteFriend artist={artist} />
                </Container>
            } */}
            {
                modalSubscription &&
                <ModalSubscriptionFanclub closeModal={() => setModalSubscription(false)} fanclub={fanclub} handleSubscription={(period) => handleSubscription(artist?.id, period)}/>
            }
            {/* MAJOR CHANGES */}
            <Snackbar message={messageSnackbar} triggered={triggered} />
        </>
    )
}

export default ArtistRoute