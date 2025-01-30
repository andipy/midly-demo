import { useContext } from "react"
import { FanclubsContext } from "../contexts/fanclubs.context"
import { CurrentFanContext } from "../contexts/currentFan.context"

const useLikeTopicComment = () => {
  const { fanclubs, setFanclubs } = useContext(FanclubsContext)
  const { currentFan } = useContext(CurrentFanContext)

  const likeComment = (artistId, topicId, commentId) => {
    setFanclubs((prevFanclubs) =>
      prevFanclubs.map((fanclub) => {
        if (fanclub.artistId === artistId) {
          return {
            ...fanclub,
            forum: fanclub.forum.map((topic) => {
              if (topic.id === topicId) {
                return {
                  ...topic,
                  comments: topic.comments.map((comment) => {
                    if (comment.id === commentId) {
                      const hasLiked = comment.likes.some(
                        (like) => like.userId === currentFan.id && like.type === "FAN"
                      )
                      return {
                        ...comment,
                        likes: hasLiked
                          ? comment.likes.filter(
                              (like) => !(like.userId === currentFan.id && like.type === "FAN")
                            ) // Rimuove il like
                          : [...comment.likes, { userId: currentFan.id, type: "FAN" }] // Aggiunge il like
                      }
                    }
                    return comment
                  })
                }
              }
              return topic
            })
          }
        }
        return fanclub
      })
    )
  }

  return { likeComment }
}

export default useLikeTopicComment