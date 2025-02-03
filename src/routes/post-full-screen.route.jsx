import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom'
import { useState, useEffect, useContext, useRef } from 'react'

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
import CommentsModalLayout from '../layout/comments-modal.layout'
import NavbarCommentsModal from '../components/navbar-comments-modal.component'
import Container from '../layout/container.layout'
import Comment from '../components/comment.component'
import TextbarComments from '../components/textbar-comments.component'
import Snackbar from '../components/snackbar.component'

import useSubmitComment from '../utils/handle-submit-comment.hook'
import useLikeComment from '../utils/handle-like-comment.hook'
import useLikeReply from '../utils/handle-like-reply-comment.hook'
import useFanclub from '../utils/get-fanclub.hooks'
import useModal from '../utils/handle-modal.hooks'
import useShare from '../utils/handle-share.hook'
import useAuraPoints from '../utils/handle-aura-points.hook'
import { CLICK_POST_LINK } from '../utils/aura-points-values'
import useLikePost from '../utils/handle-like-post.hook'
const  PostFullScreenRoute = () => {
    const navigate = useNavigate()
    const { state } = useLocation()
    const { pathname } = useLocation()

    const { currentArtist} = useContext(CurrentArtistContext)
    const { currentFan } = useContext(CurrentFanContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)
    const { artists } = useContext(ArtistsContext)

    const { handleSubmitComment } = useSubmitComment()
    const { likeComment } = useLikeComment()
    const { likeReply} = useLikeReply()
    const { modalOpen, openModal, closeModal } = useModal()
    const { share, messageSnackbar, triggered } = useShare()
    const {setAuraPoints} = useAuraPoints()
    const {likePost} = useLikePost()

    
    const [artist, setArtist] = useState()
    const fetchThisArtist = () => {
        if (!state?.artist) {
            console.error('State or state.artist is undefined')
            return
        }
        const thisArtist = artists.find(artist => state.artist.id === artist.id)
        setArtist(thisArtist)
    }

    useEffect(() => {
        if (state && artists.length > 0) {
            fetchThisArtist()
        }
    }, [artists, state, artist])
    const thisFanclub = useFanclub(state?.artist?.id)
    const [post, setPost] = useState({})
    const fetchThisPost = () => {
        const thisPost = thisFanclub?.posts?.find(elem => elem.id === state.id)
        setPost(thisPost)
    }
    useEffect(() => {
        if (thisFanclub) {
            fetchThisPost()
        }
       
    }, [thisFanclub])
    
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
                if ( postInFocus.action === 'OPEN_SETTINGS' ) {
                    navigate(`/artist-app/fanclub/${postInFocus.post.id}/edit-post`, { state: { ...postInFocus.post, invokedModal: true } })
                }
                if ( postInFocus.action === 'SHARE_POST' ) {
                    handleShare(postInFocus.post)
                }
            }
        }, [postInFocus])

    const [showCaption, setShowCaption] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
	useEffect(() => {
		if (post && post.likes && !pathname.includes('/artist-app')) {
			const likedByUser = post.likes.some(like => like.userId === currentFan.id)
			setIsLiked(likedByUser)
		}
		if (post && post.likes && pathname.includes('/artist-app')) {
			const likedByUser = post.likes.some(like => like.userId === currentArtist.id)
			setIsLiked(likedByUser)
		}
	}, [post])

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
            if ( fanclub.artistId === state?.artist.id ) {
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
        handleSubmitComment(currentComment, postInFocus, commentInFocus, state?.artist.id)
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
    const handleShare = (post) => {
        share(post, state?.artist.id)
        setPostInFocus({
            id: undefined,
            action: undefined,
            post: undefined
        })
    }

    const [days, setDays] = useState(0)
	const [hours, setHours] = useState(0)
	const [minutes, setMinutes] = useState(0)
	const [seconds, setSeconds] = useState(0)

    useEffect(() => {
		const specificDate = new Date(post?.createdAt)
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
	}, [post])

    const formatDate = () => {
		const specificDate = new Date(post?.createdAt)
		const day = specificDate.getDate()
		const month = specificDate.toLocaleString('default', { month: 'long' })
		const formattedMonth =  month
		const year = specificDate.getFullYear()
		const today = new Date()
		const thisYear = today.getFullYear()
		return day + ' ' + formattedMonth + ' ' + `${year === thisYear ?  '' : year}`
	}
    
    return (
        <>
        
        <FullPageCenter style=''>
            { pathname.includes('/artist-app') ?
            <NavbarCloseOnly transparent={true} onClick={() => navigate(-1)}/>
            :
            <NavbarCloseOnly transparent={true} onClick={() =>  navigate(`/artist/${artist?.slug}/fanclub`, { state : {artist: artist} })}/>
            }
            <div className='d-flex-row j-c-center align-items-center w-100 h-100' >
                {post?.media?.length >= 0 ?
                    <SwipeCarouselFull images={post.media} text={post.text} />
                        :
                    null
                }
            </div>
            <div className='d-flex-column gap-0_5em position-absolute-y right-5 z-index-5'>
                <div className='d-flex-row align-items-center j-c-center avatar-40 bg-dark-soft-transp75 border-radius-100 mb-xs-2' onClick={() => likePost(state?.artist.id, post.id)}>
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
                    <img className='avatar-32' src={IconComments} onClick={() => focusPost(state.id, 'OPEN_COMMENTS')} />
                </div>
                <div className='d-flex-row align-items-center j-c-center avatar-40 bg-dark-soft-transp75 border-radius-100 mb-xs-2'>
                    <img className='avatar-32' src={IconShare} onClick={() => focusPost(post.id, 'SHARE_POST')} />
                </div>
                {pathname.includes('/artist-app') && 
                <div className='d-flex-row align-items-center j-c-center avatar-40 bg-dark-soft-transp75 border-radius-100 mb-xs-2'>
                    <img className='avatar-32' src={IconSettings} onClick={() => focusPost(post.id, 'OPEN_SETTINGS')} />
                </div>
                }
            </div>
            {post?.link && post?.caption && 
                <div className='d-flex-column j-c-center w-100 position-absolute-x bottom-0 bg-dark-soft-transp75 pt-xs-4 pb-xs-4 pl-xs-6 pr-xs-6'>
                    {post?.caption !== '' &&
                        <p className='pre-wrap mb-xs-2 grey-100 f-w-400 fsize-xs-2'>
                            {post?.caption.length > 95 ?
                            <>
                                {showCaption ?
                                    <>
                                        {post?.caption}
                                        <span className='lime-400 f-w-500' onClick={() => setShowCaption(false)}> meno</span>
                                    </>
                                :
                                    <>
                                        {post?.caption.slice(0, 95)}...
                                        <span className='lime-400 f-w-500' onClick={() => setShowCaption(true)}> altro</span>
                                    </>
                                }
                            </>
                            :
                                post?.caption
                            }
                        </p>
                    }
                    
                    {post?.link.url !== '' &&
                        <Link className='d-flex-row align-items-center grey-100 f-w-400 fsize-xs-1 text-underline mb-xs-3' to={post?.link.url} target='blank' onClick={() => setAuraPoints(CLICK_POST_LINK, 'CLICK_POST_LINK', state?.artist.id)}>
                            <img className='avatar-20' src={IconLink} />
                            <span>{post?.link.name ? post.link.name : 'Apri il link'}</span>
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
        </FullPageCenter>


        <CommentsModalLayout
            modalOpen={modalOpen}
            closeModal={closeComments}
        >
            <NavbarCommentsModal closeModal={closeComments} />
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
                                    likeComment = {() => likeComment(comment.id, post.id, state?.artist.id)}
                                    postId={post.id}
                                    likeReply={(replyId, commentId, postId) => likeReply(replyId, commentId, postId, state?.artist.id)}    
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

        <Outlet context={{ postInFocus, setPostInFocus }} />

        <Snackbar message={messageSnackbar} triggered={triggered} />
        </>
    )
}

export default PostFullScreenRoute