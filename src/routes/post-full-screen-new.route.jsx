import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom'
import { useState, useEffect, useContext, useRef, useMemo } from 'react'

import { CurrentArtistContext } from '../contexts/currentArtist.context'
import { CurrentFanContext } from '../contexts/currentFan.context'
import { FanclubsContext } from '../contexts/fanclubs.context'
import { ArtistsContext } from '../contexts/artists.context'

import SwipeCarouselFull from '../layout/swipe-carousel-full.layout'
import FullPageCenter from '../layout/full-page-center.layout'
import NavbarCloseOnly from '../components/navbar-close-only.component'
import IconSettings from '../images/icons/icon-settings-white.svg'
import IconLink from '../images/icons/icon-link.svg'
import IconThunder from '../images/icons/icon-thunder.svg'
import IconThunderActive from '../images/icons/icon-thunder-active.svg'
import IconComments from '../images/icons/icon-comment-white.svg'
import IconShare from '../images/icons/icon-share-white.svg'
import CommentsModalTextbarLayout from '../layout/comments-modal-textbar.layout'
import NavbarCommentsModal from '../components/navbar-comments-modal.component'
import Container from '../layout/container.layout'
import Comment from '../components/comment.component'
import TextbarComments from '../components/textbar-comments.component'
import Snackbar from '../components/snackbar.component'
import Button from '../components/button.component'

import useSubmitComment from '../utils/handle-submit-comment.hook'
import useLikeComment from '../utils/handle-like-comment.hook'
import useLikeReply from '../utils/handle-like-reply-comment.hook'
import useFanclub from '../utils/get-fanclub.hooks'
import useModal from '../utils/handle-modal.hooks'
import useShare from '../utils/handle-share.hook'
import useAuraPoints from '../utils/handle-aura-points.hook'
import { CLICK_POST_LINK } from '../utils/aura-points-values'
import useLikePost from '../utils/handle-like-post.hook'
import useFanclubSubscription from '../utils/get-fanclub-subscription.hook'
import useFanclubSubscriptionHandler from '../utils/handle-subscription.hook'
import ModalSubscriptionFanclub from '../components/modal-subscription-fanclub.component'
import IconFollow from '../images/icons/icon-follow.svg'
import IconOk from '../images/icons/icon-ok.svg'
import IconUnfollow from '../images/icons/icon-unfollow.svg'

const PostFullScreenNewRoute = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { postId, artistId, fromPage, posts } = location.state || {}
    const { pathname } = useLocation()
    const {artists} = useContext(ArtistsContext)
    const {currentFan, setCurrentFan} = useContext(CurrentFanContext)
    const {fanclubs} = useContext(FanclubsContext)
    const {currentArtist} = useContext(CurrentArtistContext)
    const {setAuraPoints} = useAuraPoints()
    const {likePost} = useLikePost()
    const { share, messageSnackbar, triggered } = useShare()
    const { modalOpen, openModal, closeModal } = useModal()
    const { handleSubmitComment } = useSubmitComment()
    const { likeComment } = useLikeComment()
    const { likeReply} = useLikeReply()
    const { handleSubscription, err, isExiting } = useFanclubSubscriptionHandler()
    const initialIndex = posts.findIndex(post => post.id === postId && post?.artistId === artistId)
    const [currentPostIndex, setCurrentPostIndex] = useState(initialIndex)

    const [artist, setArtist] = useState()
    const [hasUserSubscribed, setHasUserSubscribed] = useState(false)
    const [userFollowing, setUserFollowing] = useState(false)
    const [thisFanclub, setThisFanclub] = useState()
    const [thisPost, setThisPost] = useState()
    useEffect(() => {
        if (posts && posts?.length > 0) {
            const currentPost = posts[currentPostIndex]

            const foundArtist = artists.find(artist => artist.id === currentPost?.artistId)
            setArtist(foundArtist)

            const fanclub = fanclubs.find((elem) => elem.artistId === currentPost?.artistId)
            setThisFanclub(fanclub)

            const isSubscribed = currentFan && fanclubs && currentFan.fanclubsSubscribed.some(sub => sub.artistId === currentPost?.artistId)
            setHasUserSubscribed(isSubscribed)

            const thisPost = fanclub?.posts.find(post => post.id === currentPost.id)
            setThisPost(thisPost)

            if ( currentFan?.followedArtists?.length > 0 ) {
                const favouriteArtistIds = currentFan.followedArtists.map(followed => followed.artistId)
    
                if (favouriteArtistIds.includes(artist?.id)) {
                    setUserFollowing(true)
                } else {
                    setUserFollowing(false)
                }
            } else {
                setUserFollowing(false)
            }
        }
    }, [currentPostIndex, artists, currentFan, fanclubs])

    console.log('Artist id: ', artist?.id)
    console.log('Post id: ', thisPost?.id)
    
    const postWrapperRef = useRef(null)

    // Riferimenti per il touch
    const touchStartY = useRef(0)
    const touchEndY = useRef(0)
    const isDragging = useRef(false)

    const handleTouchStart = (e) => {
        touchStartY.current = e.touches[0].clientY
        isDragging.current = true
    }

    const handleTouchMove = (e) => {
        if (!isDragging.current) return
        touchEndY.current = e.touches[0].clientY
    }

    const handleTouchEnd = () => {
        if (!isDragging.current) return
        const diff = touchStartY.current - touchEndY.current
        
        if (diff > 50 && currentPostIndex < posts?.length - 1) {
            // Scorrimento verso l'alto (swipe verso il basso per vedere il prossimo post)
            setCurrentPostIndex(prevIndex => Math.min(prevIndex + 1, posts?.length - 1))
        } else if (diff < -50 && currentPostIndex > 0) {
            // Scorrimento verso il basso (swipe verso l'alto per vedere il post precedente)
            setCurrentPostIndex(prevIndex => Math.max(prevIndex - 1, 0))
        }
        isDragging.current = false
    }
    useEffect(() => {
        const postWrapper = postWrapperRef.current;
        
        // Aggiungi gli eventi solo a questo div
        if (postWrapper) {
            postWrapper.addEventListener('touchstart', handleTouchStart);
            postWrapper.addEventListener('touchmove', handleTouchMove);
            postWrapper.addEventListener('touchend', handleTouchEnd);
        }

        // Pulisci gli event listener al momento dello smontaggio del componente
        return () => {
            if (postWrapper) {
                postWrapper.removeEventListener('touchstart', handleTouchStart);
                postWrapper.removeEventListener('touchmove', handleTouchMove);
                postWrapper.removeEventListener('touchend', handleTouchEnd);
            }
        };
    }, [currentPostIndex]);

    const [days, setDays] = useState(0)
	const [hours, setHours] = useState(0)
	const [minutes, setMinutes] = useState(0)
	const [seconds, setSeconds] = useState(0)

    useEffect(() => {
		const specificDate = new Date(posts[currentPostIndex]?.createdAt)
		const currentDate = new Date()
		const timeDifference = currentDate - specificDate
		const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
	
		if (daysPassed === 0) {
			const hoursPassed = Math.floor(timeDifference / (1000 * 60 * 60))
			const minutesPassed = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
			const secondsPassed = Math.floor((timeDifference % (1000 * 60)) / 1000)
	
			setDays(0)
			setHours(hoursPassed)
			setMinutes(minutesPassed)
			setSeconds(secondsPassed)
		} else {
			setDays(daysPassed)
		}
	}, [currentPostIndex])

    const formatDate = () => {
		const specificDate = new Date(posts[currentPostIndex]?.createdAt)
		const day = specificDate.getDate()
		const month = specificDate.toLocaleString('default', { month: 'long' })
		const formattedMonth =  month
		const year = specificDate.getFullYear()
		const today = new Date()
		const thisYear = today.getFullYear()
		return day + ' ' + formattedMonth + ' ' + `${year === thisYear ?  '' : year}`
	}

    const [showCaption, setShowCaption] = useState(false)

    const handleFollow = () => {
        if ((currentFan?.followedArtists?.length === 4) && !currentFan.actions.some(action => action.type === 'FIVE_ARTISTS_FOLLOWED')) {
            setCurrentFan(prev => ({
                ...prev,
                followedArtists: [...prev.followedArtists, { artistId: artist?.id }],
                whiteLabelPoints: Number(prev.whiteLabelPoints) + 10,
                actions: [...prev.actions, { type: 'FIVE_ARTISTS_FOLLOWED', value: true, createdAt: new Date().toISOString().replace('T', ' ').split('.')[0] }]
            }))
        } else {
            setCurrentFan(prev => ({
                ...prev,
                followedArtists: [...prev.followedArtists, { artistId: artist?.id }],
            }))
        } 
    }

    const [postInFocus, setPostInFocus] = useState({
        id: undefined,
        action: undefined,
        post: undefined
    })
    const focusPost = (id, action) => {
        const thisPost = thisFanclub.posts.find(post => post.id === id)
        setPostInFocus({
            id: thisPost.id,
            action: action,
            post: thisPost
        })
    }

    useEffect(() => {
        if ( postInFocus.id ) {
            if ( postInFocus.action === 'OPEN_COMMENTS' ) {
                openComments(postInFocus.id)
            }
            /*
            if ( postInFocus.action === 'OPEN_SETTINGS' ) {
                navigate(`/artist-app/fanclub/${postInFocus.post.id}/edit-post`, { state: { ...postInFocus.post, invokedModal: true } })
            }
            */
            if ( postInFocus.action === 'SHARE_POST' ) {
                handleShare(postInFocus.post)
            } 
        }
    }, [postInFocus])

    const [isLiked, setIsLiked] = useState(false)
	useEffect(() => {
		if (thisPost && thisPost.likes && !pathname.includes('/artist-app')) {
			const likedByUser = thisPost.likes.some(like => like.userId === currentFan.id)
			setIsLiked(likedByUser)
		}
		/* if (thisPost && thisPost.likes && pathname.includes('/artist-app')) {
			const likedByUser = thisPost.likes.some(like => like.userId === currentArtist.id)
			setIsLiked(likedByUser)
		} */
	}, [thisPost])

    const handleShare = (post) => {
        share(post, artist?.id)
        setPostInFocus({
            id: undefined,
            action: undefined,
            post: undefined
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

    const [modalSubscription, setModalSubscription] = useState(false)


    return (
        <>
            {
            pathname.includes('/artist-app') &&
                <NavbarCloseOnly transparent={true} onClick={() => navigate(-1)}/>
            }
            {
            pathname.includes('/your-favourites') &&
                <NavbarCloseOnly transparent={true} onClick={() => navigate(-1)}/>
            }
            {
            !pathname.includes('/your-favourites') && !pathname.includes('/artist-app') &&
                <NavbarCloseOnly transparent={true} onClick={() =>  navigate(`/artist/${artist?.slug}/posts`, { state : {artist: artist} })}/>
            }
            <FullPageCenter style='z-index-999'>
                <div
                    className="d-flex-column j-c-center align-items-center overflow-hidden w-100vw"
                    style={{
                        height: '100vh',
                        overflow: 'hidden',
                        position: 'relative',
                    }}
                >
                    <div
                        ref={postWrapperRef}
                        className="posts-wrapper"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            transition: 'transform 0.5s ease', 
                            transform: `translateY(-${currentPostIndex * 100}vh)`, 
                        }}
                    >
                        {posts?.map((post, index) => (
                            <div
                                key={index}
                                className={`${(post?.settings?.isPrivate && hasUserSubscribed === false && !pathname.includes('/artist-app/')) ? 'blur-50' : ''} post`} 
                                style={{
                                    width: '100vw',
                                    height: '100vh', 
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <SwipeCarouselFull images={post.media} text={post.text} />
                                
                            </div>
                        ))}
                    </div>
                </div>
                {!hasUserSubscribed && !pathname.includes('/artist-app/') && posts[currentPostIndex]?.settings?.isPrivate &&
                <div className='position-absolute-x-y w-80 bg-black-transp50 pt-xs-4 pb-xs-6 pl-xs-6 pr-xs-6 border-radius-06 z-index-1300'>
                    <p className='t-align-center mb-xs-4'>Vuoi accedere ai contenuti esclusivi dell'artista?</p>
                    <Button style='bg-acid-lime black f-w-500 fsize-xs-2' label='Abbonati' onClick={() => setModalSubscription(true)} />
                </div>
                }
            </FullPageCenter>         
            <div 
				className='d-flex-row j-c-start align-items-center gap-0_5em mb-xs-2 mt-xs-4 bg-color-none position-absolute-y top-5  z-index-1300 ml-xs-6 '
                onClick={() => navigate(`/artist/${artist?.slug}`, { state: {artist: artist} })}
				>
                    <div className='d-flex-row j-c-center align-items-center gap-0_25em z-index-1100' >
                        <img className='avatar-28 border-radius-100' src={artist?.image}/>
                        <p className='fsize-xs-1 f-w-500'>{artist?.artistName}</p>
                    </div>
			</div>
            {
                (hasUserSubscribed || pathname.includes('/artist-app/') || !posts[currentPostIndex]?.settings?.isPrivate) &&

                <>
                <div className='d-flex-column gap-0_5em position-absolute-y right-5 z-index-1000'>
                <div className='d-flex-row align-items-center j-c-center avatar-40 bg-dark-soft-transp75 border-radius-100 mb-xs-2' onClick={() => likePost(artist?.id, thisPost.id)}>
                    {isLiked ?		
                        <img
                            className='avatar-32 border-radius-100'
                            src={IconThunderActive}
                            alt='Liked'
                        />
                    :
                        <img
                            className='avatar-32 border-radius-100'
                            src={IconThunder}
                            alt='Not Liked'
                        />
                    }
                </div>
                <div className='d-flex-row align-items-center j-c-center avatar-40 bg-dark-soft-transp75 border-radius-100 mb-xs-2'>
                    <img className='avatar-32' src={IconComments} onClick={() => focusPost(posts[currentPostIndex].id, 'OPEN_COMMENTS')} />
                </div>
                <div className='d-flex-row align-items-center j-c-center avatar-40 bg-dark-soft-transp75 border-radius-100 mb-xs-2'>
                    <img className='avatar-32' src={IconShare} onClick={() => focusPost(posts[currentPostIndex].id, 'SHARE_POST')} />
                </div>
                {pathname.includes('/artist-app') && 
                <div className='d-flex-row align-items-center j-c-center avatar-40 bg-dark-soft-transp75 border-radius-100 mb-xs-2'>
                    <img className='avatar-32' src={IconSettings} onClick={() => focusPost(posts[currentPostIndex].id, 'OPEN_SETTINGS')} />
                </div>
                }
            </div>
            <div className='bg-dark-soft-transp75 position-absolute-x bottom-0 w-100 pt-xs-4 pb-xs-4 z-index-1100'>
                <Container style='d-flex-column j-c-center gap-0_5em'>
                    {!posts[currentPostIndex]?.settings?.isPrivate && !hasUserSubscribed && !userFollowing &&
                        <Button
                            style='border-lime bg-black lime-400 fsize-xs-2 w-30 f-w-500 black'
                            label='Segui'
                            onClick={handleFollow}
                        >
                            <img className='avatar-22' src={IconFollow} />
                        </ Button>
                    }
                    {hasUserSubscribed &&
                        <Button
                            style='button-leave-leaderboard d-flex-row align-items-center j-c-center bg-dark-soft-2 border-radius-04 grey-300 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 align-self-start w-auto gap-0_25em'
                            label={`Sei abbonato a ${artist?.artistName}`}
                            /* onClick={openSettingsSubscription} */
                        >
                            <img className='avatar-20' src={IconOk} />
                        </Button>
                    }
                    {!hasUserSubscribed && userFollowing &&
                        <Button
                            style='button-leave-leaderboard d-flex-row align-items-center j-c-center bg-dark-soft-2 border-radius-04 grey-300 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 align-self-start w-auto gap-0_25em'
                            label='Segui già'
                            /* onClick={handleFollow} */
                        >
                            <img className='avatar-20' src={IconUnfollow} />
                        </Button>
                    }
                    
                    {posts[currentPostIndex]?.link && posts[currentPostIndex]?.caption && 
                        <div className='d-flex-column j-c-center w-100'>
                            {posts[currentPostIndex]?.caption !== '' &&
                                <p className='pre-wrap mb-xs-2 grey-100 f-w-400 fsize-xs-2'>
                                    {posts[currentPostIndex]?.caption?.length > 95 ?
                                    <>
                                        {showCaption ?
                                            <>
                                                {posts[currentPostIndex]?.caption}
                                                <span className='lime-400 f-w-500' onClick={() => setShowCaption(false)}> meno</span>
                                            </>
                                        :
                                            <>
                                                {posts[currentPostIndex]?.caption.slice(0, 95)}...
                                                <span className='lime-400 f-w-500' onClick={() => setShowCaption(true)}> altro</span>
                                            </>
                                        }
                                    </>
                                    :
                                    posts[currentPostIndex]?.caption
                                    }
                                </p>
                            }
                            
                            {posts[currentPostIndex]?.link.url !== '' &&
                                <Link className='d-flex-row align-items-center grey-100 f-w-400 fsize-xs-1 text-underline mb-xs-3' to={posts[currentPostIndex]?.link.url} target='blank' onClick={() => setAuraPoints(CLICK_POST_LINK, 'CLICK_POST_LINK', artist?.id)}>
                                    <img className='avatar-20' src={IconLink} />
                                    <span>{posts[currentPostIndex]?.link.name ? posts[currentPostIndex].link.name : 'Apri il link'}</span>
                                </Link>
                            }

                            <p className='fsize-xs-1 f-w-100 grey-300 mt-xs-2'>
                                {days > 31 ?
                                    <span>{formatDate()}</span>
                                : days > 0 ?
                                    <span>{days} giorni fa</span>
                                : days <= 0 ?
                                <>
                                    {hours <= 0 ?
                                    <>
                                            {minutes <= 0 ?
                                                <span>{seconds} secondi fa</span>
                                            :
                                                <span>{minutes} minuti fa</span>
                                            }
                                    </>
                                        :
                                            <span>{hours} ore fa</span>
                                    }
                                </>
                                :
                                    <span>{days} giorni fa</span>
                                }
                            </p>
                        </div>
                    
                }
                </Container>
            </div>
            </>
            }
            {
                modalOpen &&
        
                <CommentsModalTextbarLayout
                    modalOpen={modalOpen}
                    closeModal={closeComments}
                    handleCurrentComment={handleCurrentComment}
                    handleSubmitComment={submitComment}
                    currentComment={currentComment}
                    setCurrentComment={setCurrentComment}
                    inputRef={inputRef}
                    replyingUser={replyingUser}
                    
                >
                    <Container style={'pb-xs-12 pb-sm-2'}>
                        {thisFanclub?.posts.map(post => {
                            if ( post.id ===  postInFocus.id) {
                                return post.comments.map(comment => {
                                    return (
                                        <Comment
                                            comment={comment}
                                            key={comment.id}
                                            inputRef={inputRef}
                                            spotCommentToReply={spotCommentToReply}
                                            modalUserModeration={() => navigate('user-moderation', {state: { userId: comment.userId, commentId: comment.id, fanclubId: thisFanclub?.id, postId: post.id}})}
                                            modalUserModerationRep={(userId) => 
                                                navigate('user-moderation', { 
                                                    state: { 
                                                    userId, 
                                                    commentId: comment.id, 
                                                    fanclubId: thisFanclub?.id, 
                                                    postId: post.id 
                                                    } 
                                                })
                                            }
                                            commentUserModeration={() => navigate('user-moderation/report', {state: {  userId: comment.userId, commentId: comment.id, fanclubId: thisFanclub?.id, postId: post.id, artistId: thisFanclub?.artistId, reported: false, type: 'COMMENT', comment: comment }})}
                                            replyUserModeration={(userId, reply, replyId) => navigate('user-moderation/report', {state: {  userId, commentId: comment.id, fanclubId: thisFanclub?.id, postId: post.id, artistId: thisFanclub?.artistId, reported: false, type: 'COMMENT', reply, replyId }})}
                                            likeComment = {() => likeComment(comment.id, post.id, artist.id)}
                                            postId={post.id}
                                            likeReply={(replyId, commentId, postId) => likeReply(replyId, commentId, postId, artist.id)}
                                            deleteComment = {() => navigate('user-moderation/delete', {state: {  userId: comment.userId, commentId: comment.id, fanclubId: thisFanclub?.id, postId: post.id, deleted: false}})}
                                            deleteReply = {(replyId, userId) => navigate('user-moderation/delete', {state: {  userId: userId, commentId: comment.id, fanclubId: thisFanclub?.id, postId: post.id, deleted: false, replyId: replyId, type: 'REPLY'}})}
                                        />
                                    )
                                })
                            }})
                        }
                    </Container>

                </CommentsModalTextbarLayout>
            }

            <Snackbar message={messageSnackbar} triggered={triggered} />
            {
            modalSubscription &&
                <ModalSubscriptionFanclub closeModal={() => setModalSubscription(false)} fanclub={thisFanclub} handleSubscription={(period) => handleSubscription(artist?.id, period)}/>
            }
        </>
        
    )
}

export default PostFullScreenNewRoute