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

const  PostFullScreenRoute = () => {
    const navigate = useNavigate()
    const { state } = useLocation()
    const { pathname } = useLocation()

    const { currentArtist} = useContext(CurrentArtistContext)
    const { currentFan } = useContext(CurrentFanContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)
    const { artists } = useContext(ArtistsContext)

    const [post, setPost] = useState({})
    
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

    const [thisFanclub, setThisFanclub] = useState(null)
    const fetchThisFanclub = () => {
        if (!fanclubs || !currentArtist) {
            console.warn('fanclubs or currentArtist is undefined')
            return
        }
    
        const fanclub = fanclubs.find(elem => elem.artistId === currentArtist.id)
        setThisFanclub(fanclub)
    }

    const fetchThisPost = () => {
        const thisPost = thisFanclub?.posts?.find(elem => elem.id === state.id)
        setPost(thisPost)
    }
    useEffect(() => {
        if (fanclubs && currentArtist) {
            fetchThisFanclub()
        }
       
    }, [fanclubs, currentArtist])
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
                    triggerSnackbar('Link al post copiato negli appunti')
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

    const likePost = (id) => {
        if ( pathname.includes('/artist-app') ) {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === currentArtist.id) {
                    return {
                        ...fanclub,
                        posts: fanclub.posts.map(post => {
                            if (post.id === id) {
                                const hasLiked = post.likes.some(like => like.userId === currentArtist.id)
                                return {
                                    ...post,
                                    likes: hasLiked
                                        ? post.likes.filter(like => like.userId !== currentArtist.id) // Rimuove il like
                                        : [...post.likes, { userId: currentArtist.id }] // Aggiunge il like
                                }
                            }
                            return post
                        })
                    }
                }
                return fanclub
            })
        )
        } else if (!pathname.includes('/artist-app')) {
            setFanclubs(prevFanclubs =>
                prevFanclubs.map(fanclub => {
                    if (fanclub.artistId === thisFanclub.artistId) {
                        return {
                            ...fanclub,
                            posts: fanclub.posts.map(post => {
                                if (post.id === id) {
                                    const hasLiked = post.likes.some(like => like.userId === currentFan.id)
                                    return {
                                        ...post,
                                        likes: hasLiked
                                            ? post.likes.filter(like => like.userId !== currentFan.id) // Rimuove il like
                                            : [...post.likes, { userId: currentFan.id }] // Aggiunge il like
                                    }
                                }
                                return post
                            })
                        }
                    }
                    return fanclub
                })
            )
        }
    }

    const [modalOpen, setModalOpen] = useState(false)
        const inputRef = useRef(null)
        const openComments = (id) => {
            setModalOpen(true)
        }
        const closeModal = () => {
            setModalOpen(false)
            setPostInFocus({
                id: undefined,
                action: undefined,
                post: undefined
            })
            setCommentInFocus(null)
    }
    const [commentInFocus, setCommentInFocus] = useState(null)
        const spotCommentToReply = (id) => {
            setCommentInFocus(id)
            inputRef.current.focus()
        }
        const [currentComment, setCurrentComment] = useState({
            id: undefined,
            userId: undefined,
            userType: undefined,
            userImage: undefined,
            username: undefined,
            createdAt: undefined,
            comment: '',
            likes: [],
            comments: []
        })
        const handleCurrentComment = (e) => {
            e.preventDefault()
            let commentsNumber
            let currentDate = new Date()
            let date = currentDate.toISOString().split('T')[0]
            fanclubs.map(fanclub => {
                if ( fanclub.artistId === thisFanclub.artistId ) {
                    fanclub.posts.map(post => {
                        if ( post.id === postInFocus.id ) {
                            commentsNumber = post.comments.length + 1
                        }
                    })
                }
            })

            if ( pathname.includes('/artist-app') ) {
    
            setCurrentComment(prev => ({
                ...prev,
                id: commentsNumber,
                userId: currentArtist.id,
                userType: currentArtist.type,
                userImage: currentArtist.image,
                username: currentArtist.artistName,
                createdAt: date,
                comment: e.target.value
            }))
        } else if (!pathname.includes('/artist-app')) {

            setCurrentComment(prev => ({
                ...prev,
                id: commentsNumber,
                userId: currentFan.id,
                userType: currentFan.type,
                userImage: currentFan.image,
                username: currentFan.username,
                createdAt: date,
                comment: e.target.value
            }))
        }
        }
    
        const handleSubmitComment = (e) => {
            e.preventDefault()
            if ( currentComment.comment !== '' ) {
                if ( commentInFocus ) {
                    setFanclubs(prevFanclubs =>
                        prevFanclubs.map(fanclub => {
                            if (fanclub.artistId === thisFanclub.artistId) {
                                return {
                                    ...fanclub,
                                    posts: fanclub.posts.map(post => {
                                        if (post.id === postInFocus.id) {
                                            return {
                                                ...post,
                                                comments: post.comments.map(comment => {
                                                    if (comment.id === commentInFocus) {
                                                        return {
                                                            ...comment,
                                                            comments: [...comment.comments, currentComment]
                                                        }
                                                    }
                                                    return comment
                                                })
                                            }
                                        }
                                        return post
                                    })
                                }
                            }
                            return fanclub
                        })
                    )
                    setCommentInFocus(null)
                } else if ( !commentInFocus ) {
                    setFanclubs(prevFanclubs =>
                        prevFanclubs.map(fanclub => {
                            if (fanclub.artistId === thisFanclub.artistId) {
                                return {
                                    ...fanclub,
                                    posts: fanclub.posts.map(post => {
                                        if (post.id === postInFocus.id) {
                                            return {
                                                ...post,
                                                comments: [...post.comments, currentComment]
                                            }
                                        }
                                        return post
                                    })
                                }
                            }
                            return fanclub
                        })
                    )
                }
            }
            
            setCurrentComment({
                id: undefined,
                userId: undefined,
                userType: undefined,
                userImage: undefined,
                username: undefined,
                createdAt: undefined,
                comment: '',
                likes: [],
                comments: []
            })
        }

        const likeComment = (commentId, postId) => {
            if ( pathname.includes('/artist-app') ) {
            setFanclubs(prevFanclubs =>
                prevFanclubs.map(fanclub => {
                    if (fanclub.artistId === thisFanclub.artistId) {
                        return {
                            ...fanclub,
                            posts: fanclub.posts.map(post => {
                                if (post.id === postId) {
                                    return {
                                        ...post,
                                        comments: post.comments.map(comment => {
                                            if (comment.id === commentId) {
                                                const hasLiked = comment.likes.some(like => like.userId === currentArtist.id && (like.type === 'ARTIST'))
                                                return {
                                                    ...comment,
                                                    likes: hasLiked
                                                        ? comment.likes.filter(like => !(like.userId === currentArtist.id && like.type === 'ARTIST')) // Rimuove il like
                                                        : [...comment.likes, { userId: currentArtist.id, type: 'ARTIST' }] // Aggiunge il like
                                                }
                                            }
                                            return comment
                                        })
                                    }
                                }
                                return post
                            })
                        }
                    }
                    return fanclub
                })
            )
        } else if (!pathname.includes('/artist-app')) {
            setFanclubs(prevFanclubs =>
                prevFanclubs.map(fanclub => {
                    if (fanclub.artistId === thisFanclub.artistId) {
                        return {
                            ...fanclub,
                            posts: fanclub.posts.map(post => {
                                if (post.id === postId) {
                                    return {
                                        ...post,
                                        comments: post.comments.map(comment => {
                                            if (comment.id === commentId) {
                                                const hasLiked = comment.likes.some(like => like.userId === currentFan.id && (like.type === 'FAN'))
                                                return {
                                                    ...comment,
                                                    likes: hasLiked
                                                        ? comment.likes.filter(like => !(like.userId === currentFan.id && like.type === 'FAN')) // Rimuove il like
                                                        : [...comment.likes, { userId: currentFan.id, type: 'FAN' }] // Aggiunge il like
                                                }
                                            }
                                            return comment
                                        })
                                    }
                                }
                                return post
                            })
                        }
                    }
                    return fanclub
                })
            )
        }
        }
        
        const likeReply = (replyId, commentId, postId) => {
            if ( pathname.includes('/artist-app') ) {
            setFanclubs(prevFanclubs =>
                prevFanclubs.map(fanclub => {
                    if (fanclub.artistId === thisFanclub.artistId) {
                        return {
                            ...fanclub,
                            posts: fanclub.posts.map(post => {
                                if (post.id === postId) {
                                    return {
                                        ...post,
                                        comments: post.comments.map(comment => {
                                            if (comment.id === commentId) {
                                                return {
                                                    ...comment,
                                                    comments: comment.comments.map(reply => {
                                                        if (reply.id === replyId) {
                                                            const hasLiked = reply.likes.some(like => like.userId === currentArtist.id && (like.type === 'ARTIST'))
                                                            return {
                                                                ...reply,
                                                                likes: hasLiked
                                                                    ? reply.likes.filter(like => !(like.userId === currentArtist.id && like.type === 'ARTIST')) //rimuove like
                                                                    : [...reply.likes, { userId: currentArtist.id, type: 'ARTIST' }] // Aggiunge il like
                                                            }
                                                        }
                                                        return reply
                                                    })
                                                }
                                            }
                                            return comment
                                        })
                                    }
                                }
                                return post
                            })
                        }
                    }
                    return fanclub
                })
            )
        } else if (!pathname.includes('/artist-app')){
            setFanclubs(prevFanclubs =>
                prevFanclubs.map(fanclub => {
                    if (fanclub.artistId === thisFanclub.artistId) {
                        return {
                            ...fanclub,
                            posts: fanclub.posts.map(post => {
                                if (post.id === postId) {
                                    return {
                                        ...post,
                                        comments: post.comments.map(comment => {
                                            if (comment.id === commentId) {
                                                return {
                                                    ...comment,
                                                    comments: comment.comments.map(reply => {
                                                        if (reply.id === replyId) {
                                                            const hasLiked = reply.likes.some(like => like.userId === currentFan.id && (like.type === 'FAN'))
                                                            return {
                                                                ...reply,
                                                                likes: hasLiked
                                                                    ? reply.likes.filter(like => !(like.userId === currentFan.id && like.type === 'FAN')) //rimuove like
                                                                    : [...reply.likes, { userId: currentFan.id, type: 'FAN' }] // Aggiunge il like
                                                            }
                                                        }
                                                        return reply
                                                    })
                                                }
                                            }
                                            return comment
                                        })
                                    }
                                }
                                return post
                            })
                        }
                    }
                    return fanclub
                })
            )
        }
    }

    const [triggered, setTriggered] = useState(false)
	const [messageSnackbar, setMessageSnackbar] = useState('')
	const triggerSnackbar = (message) => {
		setMessageSnackbar(message)
		setTriggered(true)
		setTimeout(() => {
			setTriggered(false)
		}, 2000)
	}

    const [days, setDays] = useState(0)
	const [hours, setHours] = useState(0)
	const [minutes, setMinutes] = useState(0)
	const [seconds, setSeconds] = useState(0)

    useEffect(() => {
		const specificDate = new Date(post.createdAt)
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
		const specificDate = new Date(post.createdAt)
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
                <div className='d-flex-row align-items-center j-c-center avatar-40 bg-dark-soft-transp75 border-radius-100 mb-xs-2' onClick={() => likePost(post.id)}>
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
                        <Link className='d-flex-row align-items-center grey-100 f-w-400 fsize-xs-1 text-underline mb-xs-3' to={post?.link.url} target='blank'>
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
            closeModal={closeModal}
        >
            <NavbarCommentsModal closeModal={closeModal} />
            <Container style={'pb-xs-12 pb-sm-2'}>
                {thisFanclub?.posts.map(post => {
                    if ( post.id ===  postInFocus.id) {
                        return post.comments.map(comment => {
                            return (
                                <Comment
                                    comment={comment}
                                    key={comment.id}
                                    inputRef={inputRef}
                                    spotCommentToReply={() => spotCommentToReply(comment.id)}
                                    modalUserModeration={() => navigate('user-moderation', {state: { userId: comment.userId, commentId: comment.id, fanclubId: thisFanclub?.id, postId: post.id }})}
                                    likeComment = {() => likeComment(comment.id, post.id)}
                                    postId={post.id}
                                    likeReply={likeReply}
                                />
                            )
                        })
                    }})
                }
            </Container>

            <TextbarComments
                handleCurrentComment={handleCurrentComment}
                handleSubmitComment={handleSubmitComment}
                currentComment={currentComment}
                setCurrentComment={setCurrentComment}
                modalOpen={modalOpen}
                inputRef={inputRef}
            />
        </CommentsModalLayout>

        <Outlet context={{ postInFocus, setPostInFocus }} />

        <Snackbar message={messageSnackbar} triggered={triggered} />
        </>
    )
}

export default PostFullScreenRoute