import { useEffect, useState, useContext, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import { FanclubsContext } from "../contexts/fanclubs.context"
import { ArtistsContext } from "../contexts/artists.context"
import { CurrentFanContext } from "../contexts/currentFan.context"
import { FansContext } from "../contexts/fans.context";

import NavbarBackOnly from "../components/navbar-back-only.component"
import Textbar from "../components/textbar.component"
import Container from "../layout/container.layout"
import IconComments from '../images/icons/icon-comment-white.svg'
import IconShare from '../images/icons/icon-share-white.svg'
import IconSave from '../images/icons/icon-save.svg'
import IconSaveActive from '../images/icons/icon-save-active.svg'
import IconLink from '../images/icons/icon-link.svg'
import IconThunder from '../images/icons/icon-thunder.svg'
import IconThunderActive from '../images/icons/icon-thunder-active.svg'
import IconVerifiedArtist from '../images/icons/icon-verified-artist.svg'
import TextbarComments from "../components/textbar-comments.component"
import Carousel from "../layout/carousel.layout"

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

    const [days, setDays] = useState(0)
	const [hours, setHours] = useState(0)
	const [minutes, setMinutes] = useState(0)
	const [seconds, setSeconds] = useState(0)
	
	useEffect(() => {
		const specificDate = new Date(topic?.createdAt)
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
	}, [topic])

    const formatDate = () => {
		const specificDate = new Date(topic?.createdAt)
		const day = specificDate.getDate()
		const month = specificDate.toLocaleString('default', { month: 'long' })
		const formattedMonth =  month
		const year = specificDate.getFullYear()
		const today = new Date()
		const thisYear = today.getFullYear()
		return day + ' ' + formattedMonth + ' ' + `${year === thisYear ?  '' : year}`
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
        <NavbarBackOnly onClick={() => navigate(`/artist/${artist.slug}/fanclub`, { state: {artist:artist, tab: 'FORUM'} })} />
        {scrolled && (
            <div className="position-fixed w-100 bg-dark-gradient z-index-10 pb-xs-4 pt-xs-4 navbar-secondary-slide">
                <div className="container d-flex-column align-items-start j-c-start">
                    <h1 className="fsize-xs-4 f-w-800 white">{topic?.title}</h1>
                    <p className="fsize-xs-1 f-w-300 grey-400">{topic?.likes.length} like - {topic?.commentsCount} commenti</p>
                </div>
            </div>
        )}
        <Container style={'pb-xs-appbar'}>
            <div id='main-topic'className="d-flex-row w-100vw image-wrapper bg-dark-gradient mb-xs-2">
                <div className="container mt-xs-2 d-flex-colum j-c-start align-items-start">
                
                    <div id='top-row' className='d-flex-row j-c-start align-items-center gap-0_5em'>
                        <img className='avatar-28 border-radius-100' src={topic?.userImage}/>
                        <p className='fsize-xs-1 f-w-500'>{topic?.userName}</p>
                        <p className='fsize-xs-1 f-w-300 grey-300'>
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
                    {
                        topic?.hashtags.length > 0 &&
                        <div id='hashtags' className='d-flex-row j-c-center align-items-center w-100 mt-xs-4'>
                        <Carousel>
                            {topic?.hashtags.map(tag => {
                                return (
                                    <div className="bg-acid-lime-op-10 d-flex-row pt-xs-1 pr-xs-2 pl-xs-2 pb-xs-1 border-radius-02">
                                        <p className="fsize-xs-1 f-w-500 lime-400">#{tag}</p>
                                    </div>
                                )
                            })}     

                        </Carousel>
                        </div>
                    }
                    
                    <div id='centre-row' className='d-flex-row j-c-space-between align-items-center w-100 gap-1em mt-xs-4'>
                        <div id='text' className='d-flex-column w-100'>
                            <h1 className='fsize-xs-5 f-w-800'>{topic?.title}</h1>
                            <p className='fsize-xs-2 f-w-300 mt-xs-4'>
                                {topic?.description}
                            </p>
                        </div>
                    </div>
                    {
                        topic?.cover &&
                        <div id='image' className="w-100  d-flex-row j-c-center align-items-center mt-xs-4 border-radius-08 overflow-all-hidden">
                            <img className="w-100 h-inherit  object-fit-cover" src={topic?.cover}/>
                        </div>
                    }
                    <div id='like row' className=' w-100 d-flex-row j-c-space-between align-items-center mt-xs-4 mb-xs-2'>
                        <div className='d-flex-row j-c-start align-items-center'>
                            <div className="d-flex-row j-c-start align-items-center gap-0_25em">
                                <div className="border-radius-100 avatar-20 d-flex-row j-c-center align-items-center">
                                    {
                                        liked ?
                                        <img className="avatar-20" src={IconThunderActive} onClick={() => likeTopic(topic?.id)}/>
                                        :
                                        <img className="avatar-20" src={IconThunder} onClick={() => likeTopic(topic?.id)}/>
                                    }
                                </div>
                                <p className="fsize-xs-1 f-w-300">{topic?.likes.length}</p>
                                <div className="border-radius-100 avatar-20 d-flex-row j-c-center align-items-center">
                                    <img className="avatar-20" src={IconComments} onClick={() => {spotCommentToReply(null)}}/>
                                </div>
                                <p className="fsize-xs-1 f-w-300">{topic?.commentsCount}</p>
                                <div className="border-radius-100  avatar-20 d-flex-row j-c-center align-items-center">
                                    <img className="avatar-20" src={IconShare} /* onClick={() => share()} *//>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex-row j-c-center align-items-center'>
                            <div className="border-radius-100  avatar-20">
                            {
                                saved ?
                                <img className="avatar-20" src={IconSaveActive} onClick={() => saveTopic(topic?.id)}/>
                                :
                                <img className="avatar-20" src={IconSave} onClick={() => saveTopic(topic?.id)}/>
                            }
                            </div>
                        </div>
                        
                    </div>
                </div>
                

            </div>

            {
                topic?.comments.map(c => {
                    const likedComment = c.likes.find(l => l.userId === currentFan.id && l.type === 'FAN')
                    return (
                        <div id={c.id} className="d-flex-column w-100vw image-wrapper bg-dark-gradient mb-xs-2">
                            
                                <div className={`${c.id === commentInFocus ? 'bg-dark-soft-2' : 'bg-dark-gradient'} pt-xs-4 pb-xs-2`} onClick={() => spotCommentToReply(c.id, c.username)}>
                                    <div className="container">
                                        <div id='top-row' className='d-flex-row j-c-start align-items-center gap-0_5em'>
                                            <img className='avatar-28 border-radius-100' src={c?.userImage}/>
                                            <p className='fsize-xs-1 f-w-500'>{c?.username}</p>
                                        </div>
                                        <div id='centre-row' className='d-flex-row j-c-space-between align-items-center w-100 gap-1em mt-xs-2'>
                                            <div id='text' className='d-flex-column w-100'>
                                                <p className='fsize-xs-2 f-w-300 '>
                                                    {c?.comment}
                                                </p>
                                            </div>
                                        </div>
                                        <div id='like row' className=' w-100 d-flex-row j-c-end align-items-center gap-0_25em mt-xs-2 mb-xs-2'>
                                            <div className='d-flex-row gap-0_5em j-c-center align-items-center'>
                                                <div className="border-radius-08  bg-acid-lime pr-xs-4 pl-xs-4" onClick={() => spotCommentToReply(c.id, c.username)}>
                                                    <p className="fsize-xs-0 f-w-300 black ">Rispondi</p>
                                                </div>
                                                <div className="border-radius-100 avatar-20 d-flex-row j-c-center align-items-center">
                                                    {
                                                        likedComment ?
                                                        <img className="avatar-20" src={IconThunderActive} onClick={() => likeComment(c.id)}/>
                                                        :
                                                        <img className="avatar-20" src={IconThunder} onClick={() => likeComment(c.id)}/>
                                                    }
                                                    <p className="fsize-xs-1 f-w-300">{c.likes.length}</p>
                                                </div>
                                                
                                                
                                            </div>
                                            
                                        </div>
                                    </div>
                                    
                                </div>
                                {
                                    c.comments.length > 0 &&
                                        <div className="container mt-xs-2 mb-xs-2 d-flex-colum j-c-start align-items-start">
                                    
                                            <div className=" container pl-xs-4 border-left-dark-0_5">
                                            {
                                                c.comments.map(reply => {
                                                    const likedReply = reply.likes.find(l => l.userId === currentFan.id && l.type === 'FAN')
                                                    return(
                                                        <div className="">
                                                            <div id='top-row' className='d-flex-row j-c-start align-items-center gap-0_5em'>
                                                                <img className='avatar-28 border-radius-100' src={reply?.userImage}/>
                                                                <p className='fsize-xs-1 f-w-500'>{reply?.username}</p>
                                                            </div>
                                                            <div id='centre-row' className='d-flex-row j-c-space-between align-items-center w-100 gap-1em mt-xs-2'>
                                                                <div id='text' className='d-flex-row j-c-space-between align-items-center w-100'>
                                                                    <p className="fsize-xs-2 f-w-300 no-wrap">
                                                                        <span className="blue-bright-600">@{reply?.repliedUsername}</span> {reply?.comment}
                                                                    </p>
                                                                    <div className="border-radius-100 avatar-20 d-flex-row j-c-center align-items-center">
                                                                        {
                                                                            likedReply ?
                                                                            <img className="avatar-20" src={IconThunderActive} onClick={() => likeReply(reply.id, c.id)}/>
                                                                            :
                                                                            <img className="avatar-20" src={IconThunder} onClick={() => likeReply(reply.id, c.id)}/>
                                                                        }
                                                                        <p className="fsize-xs-1 f-w-300">{reply.likes.length}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                            </div>
                                        
                                        </div>
                                }
                                
                        </div>
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