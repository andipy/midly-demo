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

    const [commentInFocus, setCommentInFocus] = useState(null)
    const inputRef = useRef(null)
    const spotCommentToReply = (id) => {
        setCommentInFocus(id)
        inputRef.current.focus()
    }
    
    const [fanclub, setFanclub] = useState()
    const fetchThisFanclub = () => {
        const thisFanclub = fanclubs.find(elem => elem.artistId === context.id)
        setFanclub(thisFanclub)
    }

    const [hasUserSubscribed, setHasUserSubscribed] = useState(false)
    const checkFanclubSubscription = () => {
        let isSubscribed
        if ( currentFan.fanclubsSubscribed.find(sub => sub.artistId === context.id) ) {
            isSubscribed = true
        } else {
            isSubscribed = false
        }
        setHasUserSubscribed(isSubscribed)
    }

    const [currentComment, setCurrentComment] = useState({
        id: undefined,
        userId: undefined,
        userType: undefined,
        userImage: undefined,
        username: undefined,
        createdAt: undefined,
        comment: '',
        likes: 0,
        comments: []
    })
    const [modalOpen, setModalOpen] = useState(false)
    const [commentsInFocus, setCommentsInFocus] = useState(null)
    const openComments = (id) => {
        setModalOpen(true)
        setCommentsInFocus(id)
    }
    const closeModal = () => {
        setModalOpen(false)
        setCommentsInFocus(null)
        setCommentInFocus(null)
    }

    const handleCurrentComment = (e) => {
        e.preventDefault()
        let commentsNumber
        let currentDate = new Date()
        let date = currentDate.toISOString().split('T')[0]
        fanclubs.map(fanclub => {
            if ( fanclub.artistId === context.id ) {
                fanclub.posts.map(post => {
                    if ( post.id === commentsInFocus ) {
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
                                if (post.id === commentsInFocus) {
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
                                if (post.id === commentsInFocus) {
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
            likes: 0,
            comments: []
        })
    }

    const handleSubscription = () => {
        setCurrentFan(prev => ({
            ...prev,
            fanclubsSubscribed: [...prev.fanclubsSubscribed, { artistId: context.id }]
        }))
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
                            post={post}
                            openComments={() => openComments(post.id)}
                            key={post.id}
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
                    {fanclub?.posts[commentsInFocus - 1]?.comments.map(comment => {
                        return (
                            <Comment
                                comment={comment}
                                spotCommentToReply={() => spotCommentToReply(comment.id)}
                                inputRef={inputRef}
                                key={comment.id}
                                modalUserModeration={() => navigate('user-moderation', {state: { userId: comment.userId, comment: comment.id, fanclub: fanclub?.id, post: fanclub?.posts[commentsInFocus - 1].id }})}/>
                        )
                    })}
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