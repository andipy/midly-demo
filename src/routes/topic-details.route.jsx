import { useEffect, useState, useContext, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import { FanclubsContext } from "../contexts/fanclubs.context"
import { ArtistsContext } from "../contexts/artists.context"
import { CurrentFanContext } from "../contexts/currentFan.context"
import { FansContext } from "../contexts/fans.context";

import NavbarBackOnly from "../components/navbar-back-only.component"
import Container from "../layout/container.layout"
import TextbarComments from "../components/textbar-comments.component"
import TopicMain from "../components/topic-main.component"
import TopicComment from "../components/topic-comment.component"

const TopicDetailsRoute = () => {
    const navigate = useNavigate()
    const { pathname, state } = useLocation()
    const { fanclubs, setFanclubs} = useContext(FanclubsContext)
    const { currentFan} = useContext(CurrentFanContext)
    const { artists } = useContext(ArtistsContext)
    const { fans } = useContext(FansContext)

    const [fanclub, setFanclub] = useState()
    const [topic, setTopic] = useState()
    const [artist, setArtist] = useState()
    const [fan, setFan] = useState()
    useEffect(() => {
        if (state && fanclubs && artists && fans) {
            const matchedFanclub = fanclubs.find(fanclub => fanclub.artistId === state.artistId)
            const matchedTopic = matchedFanclub.forum.find(t => t.id === state?.topic.id)
            const matchedArtist = artists.find(a  => a.id === state.artistId)
            const matchedFan = fans.find(f => f.id === currentFan.id)

            setFanclub(matchedFanclub)
            setTopic(matchedTopic)
            setArtist(matchedArtist)
            setFan(matchedFan)

        }
    }, [state, fanclubs, artists, fans])

    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset >= 160) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    const [liked, setLiked] = useState(false)
    useEffect(() => {
        if (topic && topic.likes) {
            const userLiked = topic?.likes.some(p => p.userId === currentFan.id)
            setLiked(userLiked)
        }
    }, [topic])

    const [saved, setSaved] = useState(false)
    useEffect(() => {
        if (topic && topic.saved) {
            const userSaved = topic.saved.some(p => p.userId === currentFan.id)
            setSaved(userSaved)
        }
    }, [topic])

    const [commentInFocus, setCommentInFocus] = useState(null)
    const [replyingUser, setReplyingUser] = useState(null)
    const inputRef = useRef(null)
    const spotCommentToReply = (id, username) => {
        setReplyingUser(username)
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
        comments: [],
        repliedUsername: undefined
    })
    const handleCurrentComment = (e) => {
        e.preventDefault()
        let commentsNumber
        let currentDate = new Date()
        let date = currentDate.toISOString().split('T')[0]
        fanclubs.map(fanclub => {
            if ( fanclub.artistId === state?.artistId ) {
                fanclub.forum.map(t => {
                    if ( t.id === topic?.id ) {
                        commentsNumber = topic?.commentsCount + 1
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
            userImage: fan.image,
            username: currentFan.username,
            createdAt: date,
            comment: e.target.value,
            repliedUsername: replied
        }))
    }

    const handleSubmitComment = (e) => {
        e.preventDefault()
        if ( currentComment.comment !== '' ) {
            if ( commentInFocus ) {
                setFanclubs(prevFanclubs =>
                    prevFanclubs.map(fanclub => {
                        if (fanclub.artistId === state?.artistId) {
                            return {
                                ...fanclub,
                                forum: fanclub.forum.map(t => {
                                    if (t.id === topic?.id) {
                                        return {
                                            ...t,
                                            comments: t.comments.map(comment => {
                                                if (comment.id === commentInFocus) {
                                                    return {
                                                        ...comment,
                                                        comments: [...comment.comments, currentComment]
                                                    }
                                                }
                                                return comment
                                            }),
                                            commentsCount: t.commentsCount+1
                                        }
                                    }
                                    return t
                                })
                            }
                        }
                        return fanclub
                    })
                )
                setCommentInFocus(null)
                setReplyingUser(null)

            } else if ( !commentInFocus ) {
                setFanclubs(prevFanclubs =>
                    prevFanclubs.map(fanclub => {
                        if (fanclub.artistId === state?.artistId) {
                            return {
                                ...fanclub,
                                forum: fanclub.forum.map(t => {
                                    if (t.id === topic?.id) {
                                        return {
                                            ...t,
                                            comments: [...t.comments, currentComment],
                                            commentsCount: t.commentsCount+1
                                        }
                                    }
                                    return t;
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
            comments: [],
            repliedUsername: undefined
        })
    }

    
    const likeTopic = (id) => {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === state?.artistId) {
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
                if (fanclub.artistId === state?.artistId) {
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
    const likeComment = (commentId) => {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === state?.artistId) {
                    return {
                        ...fanclub,
                        forum: fanclub.forum.map(t => {
                            if (t.id === topic?.id) {
                                return {
                                    ...t,
                                    comments: t.comments.map(comment => {
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
                            return t
                        })
                    }
                }
                return fanclub
            })
        )
    }

    const likeReply = (replyId, commentId) => {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === state?.artistId) {
                    return {
                        ...fanclub,
                        forum: fanclub.forum.map(t => {
                            if (t.id === topic?.id) {
                                return {
                                    ...t,
                                    comments: t.comments.map(comment => {
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
                            return t
                        })
                    }
                }
                return fanclub
            })
        )
    }

  return (
    <>
        <NavbarBackOnly onClick={() => navigate(`/artist/${artist.slug}/fanclub/forum`, { state: {artist:artist, tab: 'FORUM'} })} />
        {scrolled && (
            <div className="position-fixed w-100 bg-dark-gradient z-index-10 pb-xs-4 pt-xs-4 navbar-secondary-slide">
                <div className="container d-flex-column align-items-start j-c-start">
                    <h1 className="fsize-xs-4 f-w-800 white">{topic?.title}</h1>
                    <p className="fsize-xs-1 f-w-300 grey-400">{topic?.likes.length} like - {topic?.commentsCount} commenti</p>
                </div>
            </div>
        )}
        <Container style={'pb-xs-appbar'}>
            <TopicMain topic={topic} liked={liked} likeTopic={likeTopic} saved={saved} saveTopic={saveTopic} spotCommentToReply={spotCommentToReply}/>
            {
                topic?.comments.map(c => {
                    const likedComment = c.likes.find(l => l.userId === currentFan.id && l.type === 'FAN')
                    return (
                        <TopicComment comment={c} topic={topic} likedComment={likedComment} likeComment={likeComment} commentInFocus={commentInFocus} spotCommentToReply={spotCommentToReply} likeReply={likeReply}/>
                    )
                })
            }
            
        </Container>
        <div className='position-fixed bg-dark-soft bottom-0 w-100 z-index-5 border-radius-top-08 shadow-dark-750'>
            <TextbarComments
                handleCurrentComment={handleCurrentComment}
                handleSubmitComment={handleSubmitComment}
                currentComment={currentComment}
                setCurrentComment={setCurrentComment}
                /* modalOpen={modalOpen} */
                inputRef={inputRef}
                replyingUser={replyingUser}
            />
        </div>
    </>
  )
}

export default TopicDetailsRoute