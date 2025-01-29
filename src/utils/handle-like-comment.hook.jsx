import { useContext } from "react"
import { FanclubsContext } from "../contexts/fanclubs.context"
import { CurrentFanContext } from "../contexts/currentFan.context"
const useLikeComment = () => {
  const { fanclubs, setFanclubs } = useContext(FanclubsContext)
  const { currentFan } = useContext(CurrentFanContext)

  const likeComment = (commentId, postId, artistId) => {
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

  return { likeComment }
}

export default useLikeComment