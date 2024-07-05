import { useState, useEffect, useContext } from 'react'
import { useOutletContext } from 'react-router-dom'

import { FanclubsContext } from '../contexts/fanclubs.context'
import { CurrentFanContext } from '../contexts/currentFan.context'

import Post from '../components/post.component'
import NavbarCommentsModal from '../components/navbar-comments-modal.component'
import Comment from '../components/comment.component'
import TextbarComments from '../components/textbar-comments.component'
import ContainerDefault from '../layout/container-default.layout'
import CommentsModalLayout from '../layout/comments-modal.layout'

const Fanclub = () => {

    const context = useOutletContext()
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)
    const { currentFan, setCurrentFan } = useContext(CurrentFanContext)

    const [commentInFocus, setCommentInFocus] = useState(null)
    const spotCommentToReply = (id) => {
        setCommentInFocus(id)
    }
    
    const [fanclub, setFanclub] = useState()
    const fetchThisFanclub = () => {
        const thisFanclub = fanclubs.find(elem => elem.artistId === context.id)
        setFanclub(thisFanclub)
        console.log(currentFan, 'questo fan da fanclub route')
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
    const [commentsOpen, setCommentsOpen] = useState(false)
    const [commentsInFocus, setCommentsInFocus] = useState(null)
    const openComments = (id) => {
        setCommentsOpen(true)
        setCommentsInFocus(id)
    }
    const closeComments = () => {
        setCommentsOpen(false)
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

    return (
        <>
            {fanclub?.posts.length === 0 ?
                <ContainerDefault containerSpecificStyle={'d-flex-column align-items-center mt-xs-16'}>
                    <p className='fsize-xs-4 f-w-500 w-70 mb-xs-2 t-align-center mt-xs-4'>L'artista non ha ancora pubblicato contenuti!</p>
                    <p className='fsize-xs-3 f-w-200 grey-200 w-70 t-align-center mt-xs-4'>Rimani sincronizzato, il suo fanclub è già attivo 🎉</p>
                </ContainerDefault>
            :
            <>
                <ContainerDefault containerSpecificStyle={'pb-xs-2 mt-xs-4'}>
                    {fanclub?.posts.map(post =>
                        <Post
                            post={post}
                            openComments={() => openComments(post.id)}
                            key={post.id}
                            hasUserSubscribed={hasUserSubscribed}
                            handleSubscription={handleSubscription}
                        />
                    )}
                </ContainerDefault>
                </>
            }

            <CommentsModalLayout
                commentsOpen={commentsOpen}
                closeComments={closeComments}
            >
                <NavbarCommentsModal
                    closeComments={closeComments}
                />
                <ContainerDefault containerSpecificStyle={'pb-xs-12 pb-sm-2'}>
                    {fanclub?.posts[commentsInFocus - 1]?.comments.map(comment => {
                        return (
                            <Comment
                                comment={comment}
                                spotCommentToReply={() => spotCommentToReply(comment.id)}
                                key={comment.id}
                            />
                        )
                    })}
                </ContainerDefault>

                <TextbarComments
                    handleCurrentComment={handleCurrentComment}
                    handleSubmitComment={handleSubmitComment}
                    currentComment={currentComment}
                    setCurrentComment={setCurrentComment}
                    commentsOpen={commentsOpen}
                />

            </CommentsModalLayout>
        </>
    )
}

export default Fanclub