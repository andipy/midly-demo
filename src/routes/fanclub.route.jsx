import { useState, useEffect, useContext, useRef } from 'react'
import { useOutletContext, Outlet, useNavigate, useLocation } from 'react-router-dom'

import { FanclubsContext } from '../contexts/fanclubs.context'
import { CurrentFanContext } from '../contexts/currentFan.context'
import { ArtistsContext } from '../contexts/artists.context'

import Post from '../components/post.component'
import NavbarCommentsModal from '../components/navbar-comments-modal.component'
import Comment from '../components/comment.component'
import TextbarComments from '../components/textbar-comments.component'
import Container from '../layout/container.layout'
import CommentsModalLayout from '../layout/comments-modal.layout'
import FullPageCenter from '../layout/full-page-center.layout'
import Snackbar from '../components/snackbar.component'
import PostConcert from '../components/post-concert.component'
import Button from '../components/button.component'
import TabFanclub from '../components/tab-fanclub.component'

import IconSearch from '../images/icons/icon-search-black.svg'
import IconPlus from '../images/icons/icon-plus-black.svg'
import Carousel from '../layout/carousel.layout'
import ForumTopic from '../components/forum-topic.component'


const Fanclub = () => {
    const navigate = useNavigate()
    const context = useOutletContext()
    const {state } = useLocation()
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)
    const { currentFan, setCurrentFan } = useContext(CurrentFanContext)
    const {artists} = useContext(ArtistsContext)

    // fetch the fanclub
    const [fanclub, setFanclub] = useState()
    const fetchThisFanclub = () => {
        const thisFanclub = fanclubs.find(elem => elem.artistId === context.id)
        setFanclub(thisFanclub)
    }

    const [err, setErr] = useState(false)
    // handle and check current fan's subscription
    const [hasUserSubscribed, setHasUserSubscribed] = useState(false)
    const handleSubscription = () => {
        let currentDate = new Date()
        let date = currentDate.toISOString().split('T')[0]
        if (hasUserSubscribed) {
            setFanclubs(prevFanclubs =>
                prevFanclubs.map(fanclub =>
                    fanclub.artistId === context.id
                        ? { ...fanclub, subscribers: (fanclub.subscribers || 0) - 1 }
                        : fanclub
                )
            );
            setCurrentFan(prev => ({
                ...prev,
                fanclubsSubscribed: prev.fanclubsSubscribed.filter(fanclub => fanclub.artistId !== context.id),
                removedSubscriptions: [
                    ...prev.removedSubscriptions,
                    { artistId: context.id, createdAt: date }
                ]
            }))
        } else {
            if (fanclub?.maxSubscribers <= fanclub?.subscribers && fanclub?.maxSubscribers) {
                setErr(true)
                return
            } else {
                setFanclubs(prevFanclubs =>
                    prevFanclubs.map(fanclub =>
                        fanclub.artistId === context.id
                            ? { ...fanclub, subscribers: (fanclub.subscribers || 0) + 1 }
                            : fanclub
                    )
                )
                setCurrentFan(prev => ({
                    ...prev,
                    fanclubsSubscribed: [...prev.fanclubsSubscribed, { artistId: context.id, createdAt: date }],
                    removedSubscriptions: prev.removedSubscriptions.filter(fanclub => fanclub.artistId !== context.id)
                }))
            }  
        }
        
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
            if ( postInFocus.action === 'SHARE_POST' ) {
                triggerSnackbar('Link al post copiato negli appunti')
            }
            if ( postInFocus.action === 'FULL_SCREEN_POST' ) {
                navigate(`${postInFocus.post.id}`, { state: { ...postInFocus.post, artist: context} })
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
        if ( currentComment.comment !== '' ) {
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

    const newPartecipation = (id) => {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === context.id) {
                    return {
                        ...fanclub,
                        concerts: fanclub.concerts.map(concert => {
                            if (concert.id === id) {
                                const partecipate = concert.participants.some(p => p.userId === currentFan.id)
                                return {
                                    ...concert,
                                    participants: partecipate
                                        ? concert.participants.filter(c => c.userId !== currentFan.id) // Rimuove il like
                                        : [...concert.participants, { userId: currentFan.id }] // Aggiunge il like
                                }
                            }
                            return concert
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

    const [isExiting, setIsExiting] = useState(false)

    useEffect(() => {
        if (err) {
            const exitDelay = setTimeout(() => {
                setIsExiting(true)
            }, 1000)

            return () => clearTimeout(exitDelay)
        }
    }, [err])

    useEffect(() => {
        if (isExiting) {
            const endDelay = setTimeout(() => {
                setErr(false)
                setIsExiting(false)
            }, 400)

            return () => clearTimeout(endDelay)
        }
    }, [isExiting])

    const [triggered, setTriggered] = useState(false)
	const [messageSnackbar, setMessageSnackbar] = useState('')
	const triggerSnackbar = (message) => {
		setMessageSnackbar(message)
		setTriggered(true)
		setTimeout(() => {
			setTriggered(false)
		}, 2000)
	}

    const [mixedPosts, setMixedPosts] = useState([])
    useEffect(() => {
        const concerts = Array.isArray(fanclub?.concerts) ? fanclub.concerts : []
        const posts = Array.isArray(fanclub?.posts) ? fanclub.posts : []
        const mixed = [
            ...concerts,
            ...posts
        ]
        const sortedMixed = mixed.sort((a, b) => sortPosts(a,b))
        setMixedPosts(sortedMixed)
    }, [fanclub])


    const [postType, setPostType] = useState('ALL')
    useEffect(() => {
        if (state && state?.tab) {
            setPostType('FORUM')
        } else {
            setPostType('ALL')
        }
    }, [state])
    const clickTab = (value) => {
        setPostType(value)
    }

    //FORUM
    const likeTopic = (id) => {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === context.id) {
                    return {
                        ...fanclub,
                        forum: fanclub.forum.map(topic => {
                            if (topic.id === id) {
                                const liked = topic.likes.some(p => p.userId === currentFan.id)
                                return {
                                    ...topic,
                                    likes: liked
                                        ? topic.likes.filter(c => c.userId !== currentFan.id) // Rimuove il like
                                        : [...topic.likes, { userId: currentFan.id }] // Aggiunge il like
                                }
                            }
                            return topic
                        })
                    }
                }
                return fanclub
            })
        )
    }

    const saveTopic = (id) => {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === context.id) {
                    return {
                        ...fanclub,
                        forum: fanclub.forum.map(topic => {
                            if (topic.id === id) {
                                const saved = topic.saved.some(p => p.userId === currentFan.id)
                                return {
                                    ...topic,
                                    saved: saved
                                        ? topic.saved.filter(c => c.userId !== currentFan.id) // Rimuove il save
                                        : [...topic.saved, { userId: currentFan.id }] // Aggiunge il save
                                }
                            }
                            return topic
                        })
                    }
                }
                return fanclub
            })
        )
    }

    const shareTopic = () => {
        triggerSnackbar('Link al post copiato negli appunti')
    }

    return (
        <>
            <div className='d-flex-column j-c-start '>
                <div className='d-flex-row j-c-space-between align-items-center'>
                    <h2 className='fsize-xs-5 f-w-600'>{fanclub?.name}</h2>
                    {/* {
                        !hasUserSubscribed ?
                        <div className='bg-acid-lime pt-xs-1 pl-xs-2 pr-xs-2 pb-xs-1 border-radius-02' onClick={handleSubscription}>
                            <p className='fsize-xs-1 f-w-300 black'>Abbonati</p>
                        </div>
                        :
                        <div className='bg-black border-grey-small pt-xs-1 pl-xs-2 pr-xs-2 pb-xs-1 border-radius-02' onClick={handleSubscription}>
                            <p className='fsize-xs-1 f-w-300 grey-400'>Rimuovi abbonamento</p>
                        </div>
                    } */}
                    
                </div>
                
                <p className='fsize-xs-2 f-w-400 grey-300'>{fanclub?.description}</p>
            </div>
            <div className='mt-xs-2'>
                <TabFanclub onClick={clickTab} postType={postType}/>
            </div>
            {
                postType === 'FORUM' ?
                <>
                    <div className='bg-acid-lime avatar-40 border-radius-100 bottom-5 right-5 position-fixed z-index-999 d-flex-row j-c-center align-items-center' onClick={() => navigate('topic/creation', { state: {artist:context} })}>
                        <img className='' src={IconPlus}/>
                    </div>
                    <Container style={'pb-xs-2'}>
                        
                    {(() => {
                        const topicWithMaxWeight = fanclub?.forum.reduce((max, topic) => 
                            topic.weight > max.weight ? topic : max, fanclub?.forum[0]);

                        const artistTopicWithMaxWeight = fanclub?.forum
                            .filter(topic => topic.publisher.type === 'ARTIST')
                            .sort((a, b) => b.weight - a.weight)[0];

                        return (
                            <>
                                {/* Topic con peso maggiore */}
                                {topicWithMaxWeight && (
                                    <ForumTopic 
                                        key={topicWithMaxWeight.id} 
                                        topic={topicWithMaxWeight} 
                                        like={likeTopic} 
                                        save={saveTopic} 
                                        share={() => shareTopic()} 
                                        popular={true}
                                    />
                                )}
                                {/* 4 topic vari */}
                                {fanclub?.forum
                                .filter(topic => topic.id !== topicWithMaxWeight?.id && topic.id !== artistTopicWithMaxWeight?.id)
                                .sort((a, b) => b.weight - a.weight)
                                .slice(0, 4)
                                .map(topic => (
                                    <ForumTopic 
                                        key={topic.id} 
                                        topic={topic} 
                                        like={likeTopic} 
                                        save={saveTopic} 
                                        share={() => shareTopic()} 
                                        popular={false}
                                    />
                                ))}

                                {/* Primo ARTIST con peso maggiore */}
                                {artistTopicWithMaxWeight && artistTopicWithMaxWeight.id !== topicWithMaxWeight.id && (
                                    <ForumTopic 
                                        key={artistTopicWithMaxWeight.id} 
                                        topic={artistTopicWithMaxWeight} 
                                        like={likeTopic} 
                                        save={saveTopic} 
                                        share={() => shareTopic()} 
                                        popular={false}
                                    />
                                )}

                                {/* altri topic vari */}
                                {fanclub?.forum
                                .filter(topic => topic.id !== topicWithMaxWeight?.id && topic.id !== artistTopicWithMaxWeight?.id)
                                .sort((a, b) => b.weight - a.weight)
                                .slice(5)
                                .map(topic => (
                                    <ForumTopic 
                                        key={topic.id} 
                                        topic={topic} 
                                        like={likeTopic} 
                                        save={saveTopic} 
                                        share={() => shareTopic()} 
                                        popular={false}
                                    />
                                ))}
                            </>
                        );
                    })()}
                        
                    </Container>
                    
                </>
                :
                <>
                    {fanclub?.posts.length === 0 && fanclub?.concerts.lenght === 0 ?
                        <div className='d-flex-column align-items-center mt-xs-16'>
                            <p className='fsize-xs-2 f-w-200 grey-200 w-70 t-align-center mt-xs-4'>L'artista ha già attivato il suo fanclub! Resta sincronizzato e sii il primo a vedere i primi contenuti appena usciranno.</p>
                        </div>
                    :
                        <Container style={'pb-xs-2 mt-xs-4'}>
                            {
                                mixedPosts.map(item => {
                                if (item.type === 'CONCERT' || item.type === 'TOUR' ) {
                                    return (
                                        <PostConcert 
                                        concert={item}
                                        newPartecipation={newPartecipation}
                                        hasUserSubscribed={hasUserSubscribed}
                                        handleSubscription={handleSubscription}
                                        slug={context.slug}
                                    />
                                    )
                                } else {
                                    return (
                                        <Post
                                        key={item.id}
                                        post={item}
                                        focusPost={focusPost}
                                        likePost={likePost}
                                        hasUserSubscribed={hasUserSubscribed}
                                        handleSubscription={handleSubscription}
                                    />
                                    )
                                }
                                })
                            }
                            {/* {fanclub?.concerts.map(concert =>
                                <PostConcert 
                                    concert={concert}
                                    newPartecipation={newPartecipation}
                                    hasUserSubscribed={hasUserSubscribed}
                                    handleSubscription={handleSubscription}
                                />
                            )}
                            {fanclub?.posts.sort((a, b) => sortPosts(a,b)).map(post =>
                                <Post
                                    key={post.id}
                                    post={post}
                                    focusPost={focusPost}
                                    likePost={likePost}
                                    hasUserSubscribed={hasUserSubscribed}
                                    handleSubscription={handleSubscription}
                                />
                            )} */}
                        </Container>
                    }
                </>
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
            {err && 
                <FullPageCenter style='z-index-1100 bg-black-transp70'>
                    <Container style={`centered-popup ${isExiting ? 'fade-out' : ''} position-absolute d-flex-column align-items-center gap-0_5em bg-red-400 border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 `}>
                        <div className='d-flex-column align-items-center j-c-center w-100 pt-xs-2 pb-xs-2 pr-xs-2 pl-xs-2'>
                            <h2 className='fsize-xs-2 f-w-300 t-align-center'>Il fanclub di {artists.find(artist => artist.id === fanclub?.artistId).artistName} è al completo</h2>
                        </div>
                    </Container>
	            </FullPageCenter>
            }

            <Snackbar message={messageSnackbar} triggered={triggered} />
            
        </>
    )
}

export default Fanclub