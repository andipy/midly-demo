import { useContext } from "react"
import { useLocation } from "react-router-dom"
import { FanclubsContext } from "../contexts/fanclubs.context"
import { CurrentFanContext } from "../contexts/currentFan.context"
import { CurrentArtistContext } from "../contexts/currentArtist.context"
import useAuraPoints from "./handle-aura-points.hook"
import { LIKE_POST_COMMENT_REPLY, UNLIKE_POST_COMMENT_REPLY } from "./aura-points-values"
const useLikeReply = () => {
  const { fanclubs, setFanclubs } = useContext(FanclubsContext)
  const { currentFan } = useContext(CurrentFanContext)
  const { currentArtist} = useContext(CurrentArtistContext)
  const { setAuraPoints} = useAuraPoints()
  const location = useLocation()
  const pathname = location.pathname

  const likeReply = (replyId, commentId, postId, artistId) => {
    let hasLiked
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
                                comments: comment.comments.map(reply =>
                                  reply.id === replyId
                                    ? {
                                        ...reply,
                                        likes: reply.likes.some(like => like.userId === currentArtist.id && like.type === "ARTIST")
                                          ? reply.likes.filter(like => !(like.userId === currentArtist.id && like.type === "ARTIST")) // Rimuove il like
                                          : [...reply.likes, { userId: currentArtist.id, type: "ARTIST" }] // Aggiunge il like
                                      }
                                    : reply
                                )
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
                              comments: comment.comments.map(reply => {
                                hasLiked = reply.likes.some(like => like.userId === currentFan.id && like.type === "FAN")
    
                                return reply.id === replyId
                                  ? {
                                      ...reply,
                                      likes: hasLiked
                                        ? reply.likes.filter(like => !(like.userId === currentFan.id && like.type === "FAN")) // Rimuove il like
                                        : [...reply.likes, { userId: currentFan.id, type: "FAN" }] // Aggiunge il like
                                    }
                                  : reply
                              })
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
      if (hasLiked) {
        setAuraPoints(UNLIKE_POST_COMMENT_REPLY, 'UNLIKE_POST_COMMENT_REPLY', artistId)
      } else {
        setAuraPoints(LIKE_POST_COMMENT_REPLY, 'LIKE_POST_COMMENT_REPLY', artistId)
      }
    }

  }

  return { likeReply }
}

export default useLikeReply