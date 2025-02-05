import { useContext, useState, useEffect } from 'react'
import { useNavigate, useOutletContext, useLocation } from 'react-router-dom'
import { ArtistsContext } from '../../contexts/artists.context'
import { CurrentArtistContext } from '../../contexts/currentArtist.context'
import Container from "../../layout/container.layout"
import Post from "../../components/post.component"

import useFanclub from '../../utils/get-fanclub.hooks'
import useLikePost from '../../utils/handle-like-post.hook'

const FanclubPostsRouteArtist = () => {
    const {focusPost} = useOutletContext()
    const {currentArtist} = useContext(CurrentArtistContext)

    const fanclub = useFanclub(currentArtist?.id)

    const {likePost} = useLikePost()

    const sortPosts = (a, b) => {
        if (a.settings.isPinned !== b.settings.isPinned) {
            return b.settings.isPinned - a.settings.isPinned
        }
        return new Date(b.createdAt) - new Date(a.createdAt)
    }


    const [empty, setEmpty] = useState(true)
    useEffect(() => {
        if (fanclub?.posts.length > 0) {
            setEmpty(false)
        }
    }, [fanclub])
  return (
    <div>
        {
            empty &&
            <div className="w-100 d-flex-column j-c-center align-items-center h-100 mt-xs-20 mb-xs-20">
                <div className=' w-70 bg-black-transp50 pt-xs-4 pb-xs-6 pl-xs-6 pr-xs-6 border-radius-06'>
                    <p className='t-align-center mb-xs-4 letter-spacing-1 grey-400 f-w-600'>Crea il primo post per i tuoi Superfan.</p>               
                </div>
            </div>
        }
        <Container style={'pb-xs-appbar mt-xs-4'}>
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
                                likePost={(postId) => likePost(currentArtist?.id, postId)}
                                hasUserSubscribed={true}
/*                                 handleSubscription={() => setModalSubscription(true)}*/                                
                                artistId={currentArtist?.id}
                            /> 
                        }
                        </>
                        
                    )
                })
            }
        
        </Container>
    </div>
  )
}

export default FanclubPostsRouteArtist