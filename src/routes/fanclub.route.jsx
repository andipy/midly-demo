import { useState, useEffect, useContext, useRef } from 'react'
import { useOutletContext, Outlet, useNavigate, useLocation } from 'react-router-dom'

import { FanclubsContext } from '../contexts/fanclubs.context'
import { CurrentFanContext } from '../contexts/currentFan.context'
import { ArtistsContext } from '../contexts/artists.context'

import NavbarCommentsModal from '../components/navbar-comments-modal.component'
import Comment from '../components/comment.component'
import TextbarComments from '../components/textbar-comments.component'
import Container from '../layout/container.layout'
import CommentsModalLayout from '../layout/comments-modal.layout'
import FullPageCenter from '../layout/full-page-center.layout'
import Snackbar from '../components/snackbar.component'
import TabFanclub from '../components/tab-fanclub.component'
import ModalSubscriptionFanclub from '../components/modal-subscription-fanclub.component'

import useFanclubSubscription from '../utils/get-fanclub-subscription.hook'
import useFanclubSubscriptionHandler from '../utils/handle-subscription.hook'
import useSubmitComment from '../utils/handle-submit-comment.hook'
import useLikeComment from '../utils/handle-like-comment.hook'
import useLikeReply from '../utils/handle-like-reply-comment.hook'
import useArtistName from '../utils/get-artist-name.hook'
import useFanclub from '../utils/get-fanclub.hooks'
import useModal from '../utils/handle-modal.hooks'
const Fanclub = () => {
    const navigate = useNavigate()
    const context = useOutletContext()
    const {state } = useLocation()
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)
    const { currentFan } = useContext(CurrentFanContext)
    const {artists} = useContext(ArtistsContext)

    const hasUserSubscribed = useFanclubSubscription(context?.id)
    const artistName = useArtistName(context?.id)
    const fanclub = useFanclub(context?.id)

    const { handleSubscription, err, isExiting } = useFanclubSubscriptionHandler()
    const { handleSubmitComment } = useSubmitComment()
    const { likeComment } = useLikeComment()
    const { likeReply} = useLikeReply()
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
        comments: []
    })
    const handleCurrentComment = (e) => {
        e.preventDefault()
        let commentsNumber
        let currentDate = new Date()
        let date = currentDate.toISOString().split('T')[0]
        fanclubs.map(fanclub => {
            if ( fanclub.artistId === context.id ) {
                fanclub.posts.map(post => {
                    if ( post.id === postInFocus.id ) {
                        commentsNumber = post.comments.length + 1
                    }
                })
            }
        })

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

    const [commentInFocus, setCommentInFocus] = useState(null)
    const inputRef = useRef(null)
    const spotCommentToReply = (id) => {
        setCommentInFocus(id)
        inputRef.current.focus()
    }

    const submitComment = (e) => {
        e.preventDefault()
        handleSubmitComment(currentComment, postInFocus, commentInFocus, context.id)
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
        setCommentInFocus(null)
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
                triggerSnackbar('Link al post copiato negli appunti')
            }
            if ( postInFocus.action === 'FULL_SCREEN_POST' ) {
                navigate(`${postInFocus.post.id}`, { state: { ...postInFocus.post, artist: context} })
            }
        }
    }, [postInFocus])

    const [triggered, setTriggered] = useState(false)
	const [messageSnackbar, setMessageSnackbar] = useState('')
	const triggerSnackbar = (message) => {
		setMessageSnackbar(message)
		setTriggered(true)
		setTimeout(() => {
			setTriggered(false)
		}, 2000)
	}
    
    const [modalSubscription, setModalSubscription] = useState(false)


    return (
        <>
            <div className='d-flex-column j-c-start '>
                <div className='d-flex-row j-c-space-between align-items-center'>
                    <h2 className='fsize-xs-5 f-w-600'>{fanclub?.name}</h2>
                </div>
                
                <p className='fsize-xs-2 f-w-400 grey-300'>{fanclub?.description}</p>
            </div>
            <div className='mt-xs-2'>
                <TabFanclub/>
            </div>
            <Container>
                <Outlet context={{context, focusPost}}/>
            </Container>
            
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
                                        spotCommentToReply={() => spotCommentToReply(comment.id)}
                                        modalUserModeration={() => navigate('user-moderation', {state: { userId: comment.userId, commentId: comment.id, fanclubId: fanclub?.id, postId: post.id}})}
                                        likeComment = {() => likeComment(comment.id, post.id, context.id)}
                                        postId={post.id}
                                        likeReply={(replyId, commentId, postId) => likeReply(replyId, commentId, postId, context.id)}
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
                />

            </CommentsModalLayout>

            
            {err && 
                <FullPageCenter style='z-index-1300 bg-black-transp70'>
                    <Container style={`centered-popup ${isExiting ? 'fade-out' : ''} position-absolute d-flex-column align-items-center gap-0_5em bg-red-400 border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 `}>
                        <div className='d-flex-column align-items-center j-c-center w-100 pt-xs-2 pb-xs-2 pr-xs-2 pl-xs-2'>
                            <h2 className='fsize-xs-2 f-w-300 t-align-center'>Il fanclub di {artistName} è al completo</h2>
                        </div>
                    </Container>
	            </FullPageCenter>
            }

            <Snackbar message={messageSnackbar} triggered={triggered} />
            {
                modalSubscription &&
                <ModalSubscriptionFanclub closeModal={() => setModalSubscription(false)} fanclub={fanclub} handleSubscription={() => handleSubscription(context?.id)}/>
            }
            
        </>
    )
}

export default Fanclub