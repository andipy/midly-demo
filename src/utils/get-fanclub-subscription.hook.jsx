import { useContext, useMemo } from "react"
import { FanclubsContext } from "../contexts/fanclubs.context"
import { CurrentFanContext } from "../contexts/currentFan.context"
const useFanclubSubscription = (artistId) => {
  const { currentFan } = useContext(CurrentFanContext)
  const { fanclubs } = useContext(FanclubsContext)

  const isSubscribed = useMemo(() => {
    if (!currentFan || !fanclubs) return false
    return currentFan.fanclubsSubscribed.some(sub => sub.artistId === artistId)
  }, [currentFan, fanclubs, artistId])

  return isSubscribed
}

export default useFanclubSubscription