import { useState, useEffect, useContext, useRef } from 'react'
import { useOutletContext, Outlet, useNavigate, useLocation } from 'react-router-dom'
import ForumTopic from '../components/forum-topic.component'

import { ArtistsContext } from '../contexts/artists.context'
import { FansContext } from '../contexts/fans.context'


import FullPageCenter from '../layout/full-page-center.layout'
import ModalSubscriptionFanclub from '../components/modal-subscription-fanclub.component'
import Container from "../layout/container.layout"
import PostConcert from "../components/post-concert.component"
import Post from "../components/post.component"
import Snackbar from '../components/snackbar.component'
import PostFanLetter from '../components/post-fan-letter.component'

import useFanclubSubscription from '../utils/get-fanclub-subscription.hook'
import useFanclub from '../utils/get-fanclub.hooks'
import useConcertParticipation from '../utils/handle-event-partecipation.hooks'
import useFanclubSubscriptionHandler from '../utils/handle-subscription.hook'
import useLikePost from '../utils/handle-like-post.hook'
import useLikeTopic from '../utils/handle-like-topic.hook'
import useSaveTopic from '../utils/handle-save-topic.hook'
import useShare from '../utils/handle-share.hook'
import Button from '../components/button.component'
const FanclubAllRoute = () => {
    const {artist, focusPost} = useOutletContext()
    const {artists} = useContext(ArtistsContext)
    const {fans} = useContext(FansContext)
    console.log(artist)

    const hasUserSubscribed = useFanclubSubscription(artist?.id)
    const fanclub = useFanclub(artist?.id)

    //POST EE EVENTS
    const { newParticipation } = useConcertParticipation()
    const { handleSubscription, err, isExiting } = useFanclubSubscriptionHandler()
    const {likePost} = useLikePost()
    
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

    const [forum, setForum] = useState()
    const [letters, setLetters] = useState()
    useEffect(() => {
        if (fanclub) {
            const thisForum = fanclub.forum.sort((a,b) => sortForum(a, b))
            setForum(thisForum)
            setLetters(fanclub.fanLetters)
        }
    }, [fanclub])

    const sortPosts = (a, b) => {
        if (a.settings.isPinned !== b.settings.isPinned) {
            return b.settings.isPinned - a.settings.isPinned
        }
        return new Date(b.createdAt) - new Date(a.createdAt)
    }

    //TOPICS
    const { share, messageSnackbar, triggered } = useShare()
    const {likeTopic} = useLikeTopic()
    const { saveTopic} = useSaveTopic()

    //share
    const handleShare = (post) => {
        share(post, artist?.id)
    }

    const sortForum = (a,b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
    }

    const [modalSubscription, setModalSubscription] = useState(false)

    const [empty, setEmpty] = useState(true)
    useEffect(() => {
        if (fanclub?.posts.length > 0 || fanclub?.forum.length > 0 || fanclub?.fanLetters.length > 0) {
            setEmpty(false)
        }
    }, [fanclub])
    
  return (
    <div>
        {
            empty &&
            <div className="w-100 d-flex-column j-c-center align-items-center h-100 mt-xs-20 mb-xs-20">
                <div className=' w-70 bg-black-transp50 pt-xs-4 pb-xs-6 pl-xs-6 pr-xs-6 border-radius-06'>
                    <p className='t-align-center mb-xs-4 letter-spacing-1 grey-400 f-w-600'>Il fanclub di {artist?.artistName} è attivo, rimani sintonizzato per vedere i suoi contenuti.</p>
                    {
                        !hasUserSubscribed &&
                        <Button  style={`bg-acid-lime black f-w-500 fsize-xs-2`} label='Abbonati' onClick={() => setModalSubscription(true)} />
                    }
                </div>
            </div>
        }
        <Container style={'pb-xs-2 mt-xs-4'}>

        {/*  primo post */}
        {
            (() => {
                const firstPost = mixedPosts?.filter(item => item.type !== 'CONCERT' && item.type !== 'TOUR')[0];
        
                return firstPost ? (
                    <Post
                        key={firstPost.id}
                        post={firstPost}
                        focusPost={focusPost}
                        likePost={(postId) => likePost(artist.id, postId)}
                        hasUserSubscribed={hasUserSubscribed}
                        handleSubscription={() => setModalSubscription(true)}
                        artistId={artist.id}
                    />
                ) : null;
            })()
        }
        <div className='border-top-dark-0_5 w-100vw image-wrapper'></div>
        {/* primo topic */}
        {
            forum &&
            (() => {
                const firstTopic = forum[0] 
        
                return firstTopic ? (
                    <ForumTopic 
                        key={firstTopic.id} 
                        topic={firstTopic} 
                        artistId={artist.id}
                        like={() => likeTopic(artist.id, firstTopic.id)} 
                        save={() => saveTopic(artist.id, firstTopic.id)} 
                        share={() => handleShare(firstTopic)} 
                        popular={false}
                    />
                ) : null;
            })()
        }
        <div className='mb-xs-4'></div>
        {/* 4 letters */}
        {
            (() => {
                const lettersFirst = letters?.slice(0, Math.min(4, letters.length))
        
                return lettersFirst ? (
                    <div className="d-flex-row j-c-space-between align-items-start w-100 gap-0_5em">
                        <div className="d-flex-column j-c-start align-items-start w-50">
                            {lettersFirst?.filter((_, index) => index % 2 === 0).map(post => {
                                const fan = fans?.find(fan => fan?.id === post?.userId)
                                return (
                                    <PostFanLetter post={post} fan={fan} /> 
                                )
                            })}
                        </div>
                        <div className="d-flex-column j-c-start align-items-end w-50">
                            {lettersFirst?.filter((_, index) => index % 2 !== 0).map(post => {
                                const fan = fans?.find(fan => fan?.id === post?.userId)
                                return (
                                    <PostFanLetter post={post} fan={fan} /> 
                                )
                            })}
                        </div>

                    </div>
                ) : null;
            })()
        }
        <div className='mb-xs-4'></div>
        {/* secondo post */}
        {
            (() => {
                const secondPost = mixedPosts?.filter(item => item.type !== 'CONCERT' && item.type !== 'TOUR')[1]
        
                return secondPost ? (
                    <Post
                        key={secondPost.id}
                        post={secondPost}
                        focusPost={focusPost}
                        likePost={(postId) => likePost(artist.id, postId)}
                        hasUserSubscribed={hasUserSubscribed}
                        handleSubscription={() => setModalSubscription(true)}
                        artistId={artist.id}
                    />
                ) : null;
            })()
        }
        <div className='border-top-dark-0_5 w-100vw image-wrapper'></div>
        {/* secondo topic */}
        {
            forum &&
            (() => {
                const secondTopic = forum[1] 

                return secondTopic ? (
                    <ForumTopic 
                        key={secondTopic.id} 
                        topic={secondTopic} 
                        artistId={artist.id}
                        like={() => likeTopic(artist.id, secondTopic.id)} 
                        save={() => saveTopic(artist.id, secondTopic.id)} 
                        share={() => handleShare(secondTopic)} 
                        popular={false}
                    />
                ) : null;
            })()
        }
        <div className='mb-xs-4'></div>
        {/* altre 4 letters */}
        {
            letters?.length > 4 &&
            (() => {
                const lettersSecond = letters?.slice(4, Math.min(8, letters.length))

                return lettersSecond ? (
                    <div className="d-flex-row j-c-space-between align-items-start w-100 gap-0_5em">
                        <div className="d-flex-column j-c-start align-items-start w-50">
                            {lettersSecond?.filter((_, index) => index % 2 === 0).map(post => {
                                const fan = fans?.find(fan => fan?.id === post?.userId)
                                return (
                                    <PostFanLetter post={post} fan={fan} /> 
                                )
                            })}
                        </div>
                        <div className="d-flex-column j-c-start align-items-end w-50">
                            {lettersSecond?.filter((_, index) => index % 2 !== 0).map(post => {
                                const fan = fans?.find(fan => fan?.id === post?.userId)
                                return (
                                    <PostFanLetter post={post} fan={fan} /> 
                                )
                            })}
                        </div>

                    </div>
                ) : null;
            })()
        }
        <div className='mb-xs-4'></div>
        {/* Altri post */}
        {
            mixedPosts?.filter(item => item.type !== 'CONCERT' && item.type !== 'TOUR').length > 2 &&
            mixedPosts
            .filter(item => item.type !== 'CONCERT' && item.type !== 'TOUR')
            .slice(2)
            .map(item => {
                return (
                    <>
                    {
                        <Post
                            key={item.id}
                            post={item}
                            focusPost={focusPost}
                            likePost={(postId) => likePost(artist.id, postId)}
                            hasUserSubscribed={hasUserSubscribed}
                            handleSubscription={() => setModalSubscription(true)}
                            artistId={artist.id}
                        /> 
                    }
                    </>
                    
                )
            })
        }
        {/* {
            mixedPosts.map(item => {
            if (item.type === 'CONCERT' || item.type === 'TOUR' ) {
                
                return (
                    <>
                    {   
                        <>
                        <div>

                        </div>
                        <PostConcert 
                            concert={item}
                            newPartecipation={(concertId) => newParticipation(artist.id, concertId)}
                            hasUserSubscribed={hasUserSubscribed}
                            handleSubscription={() => setModalSubscription(true)}
                            slug={artist.slug}
                        />
                        </>  
                    }
                    </>  
                )
            } else {
                return (
                    <>
                    {
                        <Post
                            key={item.id}
                            post={item}
                            focusPost={focusPost}
                            likePost={(postId) => likePost(artist.id, postId)}
                            hasUserSubscribed={hasUserSubscribed}
                            handleSubscription={() => setModalSubscription(true)}
                            artistId={artist.id}
                        /> 
                    }
                    </>
                    
                )
            }
            })
        } */}
    
    </Container>
    {
        modalSubscription &&
        <ModalSubscriptionFanclub closeModal={() => setModalSubscription(false)} fanclub={fanclub} handleSubscription={(period) => handleSubscription(artist?.id, period)}/>
    }
    {err && 
        <FullPageCenter style='z-index-1300 bg-black-transp70'>
            <Container style={`centered-popup ${isExiting ? 'fade-out' : ''} position-absolute d-flex-column align-items-center gap-0_5em bg-red-400 border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 `}>
                <div className='d-flex-column align-items-center j-c-center w-100 pt-xs-2 pb-xs-2 pr-xs-2 pl-xs-2'>
                    <h2 className='fsize-xs-2 f-w-300 t-align-center'>Il fanclub di {artists.find(artist => artist.id === fanclub?.artistId).artistName} è al completo</h2>
                </div>
            </Container>
        </FullPageCenter>
    }
    <Snackbar message={messageSnackbar} triggered={triggered} />
    </div>
  )
}

export default FanclubAllRoute