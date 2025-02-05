import { useContext } from "react"
import { useLocation } from "react-router-dom"
import { FanclubsContext } from "../contexts/fanclubs.context"
import { CurrentFanContext } from "../contexts/currentFan.context"
import { CurrentArtistContext } from "../contexts/currentArtist.context"
import useAuraPoints from "./handle-aura-points.hook"
import { LIKE_TOPIC, UNLIKE_TOPIC } from "./aura-points-values"

const useLikeTopic = () => {
  const location = useLocation()
  const pathname = location.pathname 
  const { fanclubs, setFanclubs } = useContext(FanclubsContext)
  const { setAuraPoints} = useAuraPoints()
  const { currentFan } = useContext(CurrentFanContext)
  const {currentArtist} = useContext(CurrentArtistContext)

  const likeTopic = (artistId, topicId) => {
    let hasLiked
    if (pathname.includes('/artist-app')) {
      setFanclubs(prevFanclubs =>
        prevFanclubs.map(fanclub => {
          if (fanclub.artistId === artistId) {
            return {
              ...fanclub,
              forum: fanclub.forum.map(topic => {
                if (topic.id === topicId) {
                  hasLiked = topic.likes.some(like => like.userId === currentArtist.id)
                  return {
                    ...topic,
                    likes: hasLiked
                      ? topic.likes.filter(like => like.userId !== currentArtist.id) // Rimuove il like
                      : [...topic.likes, { userId: currentArtist.id }] // Aggiunge il like
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
    }
    if (!pathname.includes('/artist-app')) {
      if (hasLiked) {
          setAuraPoints(UNLIKE_TOPIC, 'UNLIKE_TOPIC', artistId)
      } else {
          setAuraPoints(LIKE_TOPIC, 'LIKE_TOPIC', artistId)
      }
    }

  }

  return { likeTopic }
}

export default useLikeTopic