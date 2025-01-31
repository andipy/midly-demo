import { useContext, useMemo } from "react"
import { FanclubsContext } from "../contexts/fanclubs.context"
import { CurrentFanContext } from "../contexts/currentFan.context"

const useFanclubSubscription = (artistId) => {
  const { currentFan } = useContext(CurrentFanContext)
  const { fanclubs } = useContext(FanclubsContext)

  const isArtistAppPath = window.location.pathname.includes('artist-app')

  const isSubscribed = useMemo(() => {
    if (isArtistAppPath) {
      return true 
    }
    if (!currentFan || !fanclubs) return false 
    return currentFan.fanclubsSubscribed.some(sub => sub.artistId === artistId) 
  }, [currentFan, fanclubs, artistId, isArtistAppPath])

  return isSubscribed
}

export default useFanclubSubscription