import { useContext } from "react"
import { useLocation } from "react-router-dom"
import { FanclubsContext } from "../contexts/fanclubs.context"
import { CurrentFanContext } from "../contexts/currentFan.context"
import { CurrentArtistContext } from "../contexts/currentArtist.context"
import useAuraPoints from "./handle-aura-points.hook"
import { LIKE_REPLY_TO_TOPIC, UNLIKE_REPLY_TO_TOPIC } from "./aura-points-values"

const useLikeTopicComment = () => {
  const location = useLocation()
  const pathname = location.pathname 
  const { fanclubs, setFanclubs } = useContext(FanclubsContext)
  const {setAuraPoints} = useAuraPoints()
  const { currentFan } = useContext(CurrentFanContext)
  const {currentArtist} = useContext(CurrentArtistContext)

  const likeComment = (artistId, topicId, commentId) => {
    let hasLiked
    if (pathname.includes('/artist-app')) {
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
                        hasLiked = comment.likes.some(
                          (like) => like.userId === currentArtist.id && like.type === "ARTIST"
                        )
                        return {
                          ...comment,
                          likes: hasLiked
                            ? comment.likes.filter(
                                (like) => !(like.userId === currentArtist.id && like.type === "ARTIST")
                              ) // Rimuove il like
                            : [...comment.likes, { userId: currentArtist.id, type: "ARTIST" }] // Aggiunge il like
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
    } else if (!pathname.includes('/artist-app')) {
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
                        hasLiked = comment.likes.some(
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
    if (!pathname.includes('/artist-app')) {
      if (hasLiked) {
          setAuraPoints(UNLIKE_REPLY_TO_TOPIC, 'UNLIKE_REPLY_TO_TOPIC', artistId)
      } else {
          setAuraPoints(LIKE_REPLY_TO_TOPIC, 'LIKE_REPLY_TO_TOPIC', artistId)
      }
    }
  }

  return { likeComment }
}

export default useLikeTopicComment