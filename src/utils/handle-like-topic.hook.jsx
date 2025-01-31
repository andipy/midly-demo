import { useContext } from "react"
import { FanclubsContext } from "../contexts/fanclubs.context"
import { CurrentFanContext } from "../contexts/currentFan.context"
import useAuraPoints from "./handle-aura-points.hook"
import { LIKE_TOPIC, UNLIKE_TOPIC } from "./aura-points-values"

const useLikeTopic = () => {
  const { fanclubs, setFanclubs } = useContext(FanclubsContext)
  const { setAuraPoints} = useAuraPoints()
  const { currentFan } = useContext(CurrentFanContext)

  const likeTopic = (artistId, topicId) => {
    let hasLiked
    setFanclubs(prevFanclubs =>
      prevFanclubs.map(fanclub => {
        if (fanclub.artistId === artistId) {
          return {
            ...fanclub,
            forum: fanclub.forum.map(topic => {
              if (topic.id === topicId) {
                 hasLiked = topic.likes.some(like => like.userId === currentFan.id)
                return {
                  ...topic,
                  likes: hasLiked
                    ? topic.likes.filter(like => like.userId !== currentFan.id) // Rimuove il like
                    : [...topic.likes, { userId: currentFan.id }] // Aggiunge il like
                }
              }
              return topic
            })
          }
        }
        return fanclub
      })
    )
    if (hasLiked) {
        setAuraPoints(UNLIKE_TOPIC, 'UNLIKE_TOPIC', artistId)
    } else {
        setAuraPoints(LIKE_TOPIC, 'LIKE_TOPIC', artistId)
    }

  }

  return { likeTopic }
}

export default useLikeTopic