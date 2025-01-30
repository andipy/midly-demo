import { useContext } from "react"
import { useLocation } from "react-router-dom"
import { FanclubsContext } from "../contexts/fanclubs.context"
import { CurrentFanContext } from "../contexts/currentFan.context"
import { CurrentArtistContext } from "../contexts/currentArtist.context"
const useLikeReply = () => {
  const { fanclubs, setFanclubs } = useContext(FanclubsContext)
  const { currentFan } = useContext(CurrentFanContext)
  const { currentArtist} = useContext(CurrentArtistContext)
  const location = useLocation()
  const pathname = location.pathname

  const likeReply = (replyId, commentId, postId, artistId) => {
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
                                comments: comment.comments.map(reply =>
                                  reply.id === replyId
                                    ? {
                                        ...reply,
                                        likes: reply.likes.some(like => like.userId === currentFan.id && like.type === "FAN")
                                          ? reply.likes.filter(like => !(like.userId === currentFan.id && like.type === "FAN")) // Rimuove il like
                                          : [...reply.likes, { userId: currentFan.id, type: "FAN" }] // Aggiunge il like
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
    }

  }

  return { likeReply }
}

export default useLikeReply