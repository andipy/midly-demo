import { useContext } from "react"
import { useLocation } from "react-router-dom"
import { FanclubsContext } from "../contexts/fanclubs.context"
import { CurrentFanContext } from "../contexts/currentFan.context"
import { CurrentArtistContext } from "../contexts/currentArtist.context"
const useLikeComment = () => {
  const { fanclubs, setFanclubs } = useContext(FanclubsContext)
  const { currentFan } = useContext(CurrentFanContext)
  const { currentArtist} = useContext(CurrentArtistContext)
  const location = useLocation()
  const pathname = location.pathname

  const likeComment = (commentId, postId, artistId) => {
    if (pathname.includes('/artist-app')) {
      setFanclubs(prevFanclubs =>
        prevFanclubs.map(fanclub =>
          fanclub.artistId === artistId
            ? {
                ...fanclub,
                posts: fanclub.posts.map(post =>
                  post.id === postId
                    ? {
                        ...post,
                        comments: post.comments.map(comment =>
                          comment.id === commentId
                            ? {
                                ...comment,
                                likes: comment.likes.some(like => like.userId === currentArtist.id && like.type === "ARTIST")
                                  ? comment.likes.filter(like => !(like.userId === currentArtist.id && like.type === "ARTIST")) // Rimuove il like
                                  : [...comment.likes, { userId: currentArtist.id, type: "ARTIST" }] // Aggiunge il like
                              }
                            : comment
                        )
                      }
                    : post
                )
              }
            : fanclub
        )
      )
    } else if (!pathname.includes('/artist-app')) {
      setFanclubs(prevFanclubs =>
        prevFanclubs.map(fanclub =>
          fanclub.artistId === artistId
            ? {
                ...fanclub,
                posts: fanclub.posts.map(post =>
                  post.id === postId
                    ? {
                        ...post,
                        comments: post.comments.map(comment =>
                          comment.id === commentId
                            ? {
                                ...comment,
                                likes: comment.likes.some(like => like.userId === currentFan.id && like.type === "FAN")
                                  ? comment.likes.filter(like => !(like.userId === currentFan.id && like.type === "FAN")) // Rimuove il like
                                  : [...comment.likes, { userId: currentFan.id, type: "FAN" }] // Aggiunge il like
                              }
                            : comment
                        )
                      }
                    : post
                )
              }
            : fanclub
        )
      )
    }
    
  }

  return { likeComment }
}

export default useLikeComment