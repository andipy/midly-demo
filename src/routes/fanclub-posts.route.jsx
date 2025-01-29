import { useContext, useState, useEffect } from 'react'
import { useNavigate, useOutletContext, useLocation } from 'react-router-dom'
import { ArtistsContext } from '../contexts/artists.context'

import FullPageCenter from '../layout/full-page-center.layout'
import ModalSubscriptionFanclub from '../components/modal-subscription-fanclub.component'
import Container from "../layout/container.layout"
import Post from "../components/post.component"

import useFanclubSubscription from '../utils/get-fanclub-subscription.hook'
import useFanclub from '../utils/get-fanclub.hooks'
import useFanclubSubscriptionHandler from '../utils/handle-subscription.hook'
import useLikePost from '../utils/handle-like-post.hook'
const FanclubPostsRoute = () => {
    const {context, focusPost} = useOutletContext()
    const {artists} = useContext(ArtistsContext)

    const hasUserSubscribed = useFanclubSubscription(context?.id)
    const fanclub = useFanclub(context?.id)

    const { handleSubscription, err, isExiting } = useFanclubSubscriptionHandler()
    const {likePost} = useLikePost()

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
                fanclub?.posts
                .sort((a, b) => sortPosts(a,b))
                .map(item => {
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
                            /> 
                        }
                        </>
                        
                    )
                })
            }
        
        </Container>
        {
            modalSubscription &&
            <ModalSubscriptionFanclub closeModal={() => setModalSubscription(false)} fanclub={fanclub} handleSubscription={() => handleSubscription(context?.id)}/>
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

export default FanclubPostsRoute