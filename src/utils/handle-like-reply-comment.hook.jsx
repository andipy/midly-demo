import { useContext } from "react"
import { FanclubsContext } from "../contexts/fanclubs.context"
import { CurrentFanContext } from "../contexts/currentFan.context"
const useLikeReply = () => {
  const { fanclubs, setFanclubs } = useContext(FanclubsContext)
  const { currentFan } = useContext(CurrentFanContext)

  const likeReply = (replyId, commentId, postId, artistId) => {
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

  return { likeReply }
}

export default useLikeReply