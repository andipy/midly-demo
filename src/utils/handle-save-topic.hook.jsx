import { useContext } from "react"
import { FanclubsContext } from "../contexts/fanclubs.context"
import { CurrentFanContext } from "../contexts/currentFan.context"

const useSaveTopic = () => {
  const { fanclubs, setFanclubs } = useContext(FanclubsContext)
  const { currentFan } = useContext(CurrentFanContext)

  const saveTopic = (artistId, topicId) => {
    setFanclubs(prevFanclubs =>
      prevFanclubs.map(fanclub => {
        if (fanclub.artistId === artistId) {
          return {
            ...fanclub,
            forum: fanclub.forum.map(topic => {
              if (topic.id === topicId) {
                const saved = topic.saved.some(save => save.userId === currentFan.id)
                return {
                  ...topic,
                  saved: saved
                    ? topic.saved.filter(save => save.userId !== currentFan.id) // Rimuove il save
                    : [...topic.saved, { userId: currentFan.id }] // Aggiunge il save
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

  return { saveTopic }
}

export default useSaveTopic