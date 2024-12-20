import { useState, useEffect, useContext, useRef } from 'react'
import { useOutletContext, Outlet, useNavigate } from 'react-router-dom'

import { FanclubsContext } from '../contexts/fanclubs.context'
import { CurrentFanContext } from '../contexts/currentFan.context'

import Post from '../components/post.component'
import NavbarCommentsModal from '../components/navbar-comments-modal.component'
import Comment from '../components/comment.component'
import TextbarComments from '../components/textbar-comments.component'
import Container from '../layout/container.layout'
import CommentsModalLayout from '../layout/comments-modal.layout'

const Fanclub = () => {
    const navigate = useNavigate()
    const context = useOutletContext()
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)
    const { currentFan, setCurrentFan } = useContext(CurrentFanContext)

    // fetch the fanclub
    const [fanclub, setFanclub] = useState()
    const fetchThisFanclub = () => {
        const thisFanclub = fanclubs.find(elem => elem.artistId === context.id)
        setFanclub(thisFanclub)
    }

    // handle and check current fan's subscription
    const [hasUserSubscribed, setHasUserSubscribed] = useState(false)
    const handleSubscription = () => {
        setCurrentFan(prev => ({
            ...prev,
            fanclubsSubscribed: [...prev.fanclubsSubscribed, { artistId: context.id }]
        }))
    }
    const checkFanclubSubscription = () => {
        let isSubscribed
        if ( currentFan.fanclubsSubscribed.find(sub => sub.artistId === context.id) ) {
            isSubscribed = true
        } else {
            isSubscribed = false
        }
        setHasUserSubscribed(isSubscribed)
    }

    // handle post actions
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
    const [modalOpen, setModalOpen] = useState(false)
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

    useEffect(() => {
        if ( postInFocus.id ) {
            if ( postInFocus.action === 'OPEN_COMMENTS' ) {
                openComments(postInFocus.id)
            }
            if ( postInFocus.action === 'OPEN_SETTINGS' ) {
                navigate(`/artist-app/fanclub/${postInFocus.post.id}`, { state: { ...postInFocus.post, invokedModal: true } })
            }
        }
    }, [postInFocus])

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

    const handleSubmitComment = (e) => {
        e.preventDefault()
        if ( commentInFocus ) {
            setFanclubs(prevFanclubs =>
                prevFanclubs.map(fanclub => {
                    if (fanclub.artistId === context.id) {
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
                    if (fanclub.artistId === context.id) {
                        return {
                            ...fanclub,
                            posts: fanclub.posts.map(post => {
                                if (post.id === postInFocus.id) {
                                    return {
                                        ...post,
                                        comments: [...post.comments, currentComment]
                                    }
                                }
                                return post;
                            })
                        }
                    }
                    return fanclub;
                })
            )
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

    const [commentInFocus, setCommentInFocus] = useState(null)
    const inputRef = useRef(null)
    const spotCommentToReply = (id) => {
        setCommentInFocus(id)
        inputRef.current.focus()
    }

    useEffect(() => {
        if ( context ) {
            fetchThisFanclub()
            checkFanclubSubscription()
        }
    }, [context, fanclubs, currentFan])

    const sortPosts = (a, b) => {
        if (a.settings.isPinned !== b.settings.isPinned) {
            return b.settings.isPinned - a.settings.isPinned
        }
        return new Date(b.createdAt) - new Date(a.createdAt)
    }

    const [modalUserModeration, setModalUserModeration] = useState(false)
    const [userToModerate, setUserToModerate] = useState(null)
    const openModalUserModeration = (userId) => {
        setUserToModerate(userId)
        setModalUserModeration(true)
    }

    const closeModalUserModeration = () => {
        setUserToModerate(null)
        setModalUserModeration(false)
    }

    const likePost = (id) => {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === context.id) {
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

    const likeComment = (commentId, postId) => {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === context.id) {
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

    const likeReply = (replyId, commentId, postId) => {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === context.id) {
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
                                                                ? reply.likes.filter(like => !(like.userId === currentFan.id && like.type === 'FAN')) // Rimuove il like
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
    

    return (
        <>
            <div className='d-flex-column j-c-start mt-xs-4'>
                <h2 className='fsize-xs-5 f-w-600'>{fanclub?.name}</h2>
                <p className='fsize-xs-2 f-w-400 grey-300'>{fanclub?.description}</p>
            </div>
            {fanclub?.posts.length === 0 ?
                <div className='d-flex-column align-items-center mt-xs-16'>
                    <p className='fsize-xs-2 f-w-200 grey-200 w-70 t-align-center mt-xs-4'>L'artista ha già attivato il suo fanclub! Resta sincronizzato e sii il primo a vedere i primi contenuti appena usciranno.</p>
                </div>
            :
                <Container style={'pb-xs-2 mt-xs-4'}>
                    {fanclub?.posts.sort((a, b) => sortPosts(a,b)).map(post =>
                        <Post
                            key={post.id}
                            post={post}
                            focusPost={focusPost}
                            likePost={likePost}
                            hasUserSubscribed={hasUserSubscribed}
                            handleSubscription={handleSubscription}
                        />
                    )}
                </Container>
            }
            

            <CommentsModalLayout
                modalOpen={modalOpen}
                closeModal={closeModal}
            >
                <NavbarCommentsModal
                    closeModal={closeModal}
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
                                        modalUserModeration={() => navigate('user-moderation', {state: { userId: comment.userId, commentId: comment.id, fanclubId: fanclub?.id, postId: post.id }})}
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

            <Outlet />
            
        </>
    )
}

export default Fanclub