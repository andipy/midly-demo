import { useLocation } from 'react-router-dom'
import { useContext } from "react"
import { FanclubsContext } from "../contexts/fanclubs.context"
import { CurrentFanContext } from "../contexts/currentFan.context"
import { CurrentArtistContext } from '../contexts/currentArtist.context'
import useAuraPoints from './handle-aura-points.hook'
import { LIKE_POST, UNLIKE_POST } from './aura-points-values'

const useLikePost = () => {
  const location = useLocation()
  const pathname = location.pathname 
  const { fanclubs, setFanclubs } = useContext(FanclubsContext)
  const { currentFan } = useContext(CurrentFanContext)
  const {currentArtist} = useContext(CurrentArtistContext)
  const { setAuraPoints } = useAuraPoints()

  const likePost = (artistId, postId) => {
    let hasLiked;
    if ( pathname.includes('/artist-app') ) {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === artistId) {
                    return {
                        ...fanclub,
                        posts: fanclub.posts.map(post => {
                            if (post.id === postId) {
                                hasLiked = post.likes.some(like => like.userId === currentArtist.id)
                                return {
                                    ...post,
                                    likes: hasLiked
                                        ? post.likes.filter(like => like.userId !== currentArtist.id) // Rimuove il like
                                        : [...post.likes, { userId: currentArtist.id }] // Aggiunge il like
                                }
                            }
                            return post
                        })
                    }
                }
                return fanclub
            })
        )
    } else if (!pathname.includes('/artist-app')) {

        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === artistId) {
                    return {
                        ...fanclub,
                        posts: fanclub.posts.map(post => {
                            if (post.id === postId) {
                                hasLiked = post.likes.some(like => like.userId === currentFan.id)
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

        if (hasLiked) {
            setAuraPoints(UNLIKE_POST, 'UNLIKE_POST', artistId)
        } else {
            setAuraPoints(LIKE_POST, 'LIKE_POST', artistId)
        }

    }
  }

  return { likePost }
}

export default useLikePost