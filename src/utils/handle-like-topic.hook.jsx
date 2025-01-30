import { useContext } from "react"
import { FanclubsContext } from "../contexts/fanclubs.context"
import { CurrentFanContext } from "../contexts/currentFan.context"

const useLikeTopic = () => {
  const { fanclubs, setFanclubs } = useContext(FanclubsContext)
  const { currentFan } = useContext(CurrentFanContext)

  const likeTopic = (artistId, topicId) => {
    setFanclubs(prevFanclubs =>
      prevFanclubs.map(fanclub => {
        if (fanclub.artistId === artistId) {
          return {
            ...fanclub,
            forum: fanclub.forum.map(topic => {
              if (topic.id === topicId) {
                const liked = topic.likes.some(like => like.userId === currentFan.id)
                return {
                  ...topic,
                  likes: liked
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
  }

  return { likeTopic }
}

export default useLikeTopic