import { useState, useEffect, useContext, useRef } from 'react'
import { useOutletContext, Outlet, useNavigate, useLocation } from 'react-router-dom'

import { ArtistsContext } from '../contexts/artists.context'


import FullPageCenter from '../layout/full-page-center.layout'
import ModalSubscriptionFanclub from '../components/modal-subscription-fanclub.component'
import Container from "../layout/container.layout"
import PostConcert from "../components/post-concert.component"
import Post from "../components/post.component"

import useFanclubSubscription from '../utils/get-fanclub-subscription.hook'
import useFanclub from '../utils/get-fanclub.hooks'
import useConcertParticipation from '../utils/handle-event-partecipation.hooks'
import useFanclubSubscriptionHandler from '../utils/handle-subscription.hook'
import useLikePost from '../utils/handle-like-post.hook'
const FanclubAllRoute = () => {
    const {context, focusPost} = useOutletContext()
    const {artists} = useContext(ArtistsContext)

    const hasUserSubscribed = useFanclubSubscription(context?.id)
    const fanclub = useFanclub(context?.id)

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

    const sortPosts = (a, b) => {
        if (a.settings.isPinned !== b.settings.isPinned) {
            return b.settings.isPinned - a.settings.isPinned
        }
        return new Date(b.createdAt) - new Date(a.createdAt)
    }

    const [modalSubscription, setModalSubscription] = useState(false)
    
  return (
    <div>
        <Container style={'pb-xs-2 mt-xs-4'}>
        {
            mixedPosts.map(item => {
            if (item.type === 'CONCERT' || item.type === 'TOUR' ) {
                
                return (
                    <>
                    {   
                        <>
                        {/* <div>

                        </div> */}
                        {/* <PostConcert 
                            concert={item}
                            newPartecipation={(concertId) => newParticipation(context.id, concertId)}
                            hasUserSubscribed={hasUserSubscribed}
                            handleSubscription={() => setModalSubscription(true)}
                            slug={context.slug}
                        /> */}
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
                            likePost={(postId) => likePost(context.id, postId)}
                            hasUserSubscribed={hasUserSubscribed}
                            handleSubscription={() => setModalSubscription(true)}
                            artistId={context.id}
                        /> 
                    }
                    </>
                    
                )
            }
            })
        }
    
    </Container>
    {
        modalSubscription &&
        <ModalSubscriptionFanclub closeModal={() => setModalSubscription(false)} fanclub={fanclub} handleSubscription={(period) => handleSubscription(context?.id, period)}/>
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
    </div>
  )
}

export default FanclubAllRoute