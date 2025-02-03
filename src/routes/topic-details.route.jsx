import { useEffect, useState, useContext, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { FanclubsContext } from '../contexts/fanclubs.context'
import { CurrentFanContext } from '../contexts/currentFan.context'

import NavbarBackOnly from '../components/navbar-back-only.component'
import Container from '../layout/container.layout'
import TextbarComments from '../components/textbar-comments.component'
import TopicMain from '../components/topic-main.component'
import TopicComment from '../components/topic-comment.component'
import Snackbar from '../components/snackbar.component'

import useFanclub from '../utils/get-fanclub.hooks'
import useTopic from '../utils/get-fanclub-topic.hook'
import useArtist from '../utils/get-artist.hook'
import useFan from '../utils/get-fan.hook'
import useCommentTopicHandler from '../utils/handle-comment-topic'
import useLikeTopic from '../utils/handle-like-topic.hook'
import useSaveTopic from '../utils/handle-save-topic.hook'
import useShare from '../utils/handle-share.hook'
import useLikeTopicComment from '../utils/handle-like-topic-comment.hook'
import useLikeTopicReply from '../utils/handle-like-topic-reply.hook'

const TopicDetailsRoute = () => {
    const navigate = useNavigate()
    const { pathname, state } = useLocation()
    const { fanclubs, setFanclubs} = useContext(FanclubsContext)
    const { currentFan} = useContext(CurrentFanContext)

    const fanclub = useFanclub(state?.artistId)
    const topic = useTopic(fanclub, state?.topic?.id)   
    const artist = useArtist(state?.artistId)
    const fan = useFan(currentFan?.id)
    
    const {likeTopic} = useLikeTopic()
    const { saveTopic} = useSaveTopic()
    const { share, messageSnackbar, triggered } = useShare()
    const { handleSubmitComment, commentInFocus, setCommentInFocus, replyingUser, setReplyingUser, currentComment, setCurrentComment } = useCommentTopicHandler(artist?.id, topic?.id)
    const { likeComment } = useLikeTopicComment()
    const { likeReply } = useLikeTopicReply()


    //scrolled

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

    //liked

    const [liked, setLiked] = useState(false)
    useEffect(() => {
        if (topic && topic.likes) {
            const userLiked = topic?.likes.some(p => p.userId === currentFan.id)
            setLiked(userLiked)
        }
    }, [topic])

    //saved

    const [saved, setSaved] = useState(false)
    useEffect(() => {
        if (topic && topic.saved) {
            const userSaved = topic.saved.some(p => p.userId === currentFan.id)
            setSaved(userSaved)
        }
    }, [topic])

    //comments
    const inputRef = useRef(null)

    const spotCommentToReply = (id, username) => {
        setReplyingUser(username)
        setCommentInFocus(id)
        inputRef.current.focus()
    }

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

    //share
    const handleShare = (topic) => {
        share(topic, state?.artistId)
    }

  return (
    <>
        <NavbarBackOnly onClick={() => navigate(`/artist/${artist.slug}/fanclub/forum`, { state: {artist:artist, tab: 'FORUM'} })} />
        
        {scrolled &&
            <div className='position-fixed w-100 bg-dark-gradient z-index-10 pb-xs-4 pt-xs-4 navbar-secondary-slide'>
                <div className='container d-flex-column align-items-start j-c-start'>
                    <h1 className='fsize-xs-4 f-w-700 white'>{topic?.title}</h1>
                    <p className='fsize-xs-1 f-w-300 grey-400'>{topic?.likes.length} like - {topic?.commentsCount} commenti</p>
                </div>
            </div>
        }

        <Container style={'pb-xs-appbar'}>
            <TopicMain topic={topic} liked={liked} likeTopic={() => likeTopic(artist.id, topic.id)} saved={saved} saveTopic={() => saveTopic(artist.id, topic.id)} shareTopic={() => handleShare(topic)}  spotCommentToReply={spotCommentToReply}/>
            {topic?.comments.map(c => {
                    const likedComment = c.likes.find(l => l.userId === currentFan.id && l.type === 'FAN')
                    return (
                        <TopicComment comment={c} topic={topic} likedComment={likedComment} likeComment={(commentId) => likeComment(artist.id, topic.id, commentId)} commentInFocus={commentInFocus} spotCommentToReply={spotCommentToReply} likeReply={(commentId, replyId) => likeReply(artist.id, topic.id, commentId, replyId)}/>
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
        
        <Snackbar message={messageSnackbar} triggered={triggered} />
    </>
  )
}

export default TopicDetailsRoute