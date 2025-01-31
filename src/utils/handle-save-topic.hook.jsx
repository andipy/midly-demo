import { useContext } from "react"
import { FanclubsContext } from "../contexts/fanclubs.context"
import { CurrentFanContext } from "../contexts/currentFan.context"
import useAuraPoints from "./handle-aura-points.hook"
import { SAVE_TOPIC, UNSAVE_TOPIC } from "./aura-points-values"

const useSaveTopic = () => {
  const { fanclubs, setFanclubs } = useContext(FanclubsContext)
  const { setAuraPoints} = useAuraPoints()
  const { currentFan } = useContext(CurrentFanContext)

  const saveTopic = (artistId, topicId) => {
    let saved
    setFanclubs(prevFanclubs =>
      prevFanclubs.map(fanclub => {
        if (fanclub.artistId === artistId) {
          return {
            ...fanclub,
            forum: fanclub.forum.map(topic => {
              if (topic.id === topicId) {
                saved = topic.saved.some(save => save.userId === currentFan.id)
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

    if (saved) {
        setAuraPoints(UNSAVE_TOPIC, 'UNSAVE_TOPIC', artistId)
    } else {
        setAuraPoints(SAVE_TOPIC, 'SAVE_TOPIC', artistId)
    }
  }

  return { saveTopic }
}

export default useSaveTopic