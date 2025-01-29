import { useContext, useState, useEffect } from "react"
import { FanclubsContext } from "../contexts/fanclubs.context"
import { CurrentFanContext } from "../contexts/currentFan.context"
const useFanclubSubscriptionHandler = () => {
  const { fanclubs, setFanclubs } = useContext(FanclubsContext)
  const { currentFan, setCurrentFan } = useContext(CurrentFanContext)
  const [err, setErr] = useState(false)
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (err) {
      const exitDelay = setTimeout(() => {
        setIsExiting(true);
      }, 1000);

      return () => clearTimeout(exitDelay);
    }
  }, [err]);

  useEffect(() => {
    if (isExiting) {
      const endDelay = setTimeout(() => {
        setErr(false);
        setIsExiting(false);
      }, 400);

      return () => clearTimeout(endDelay);
    }
  }, [isExiting]);

  const handleSubscription = (artistId) => {
    let currentDate = new Date().toISOString().split("T")[0]
    let fanclub = fanclubs.find(f => f.artistId === artistId)
    let hasUserSubscribed = currentFan.fanclubsSubscribed.some(f => f.artistId === artistId)

    if (hasUserSubscribed) {
      setFanclubs(prevFanclubs =>
        prevFanclubs.map(fanclub =>
          fanclub.artistId === artistId
            ? { ...fanclub, subscribers: Math.max((fanclub.subscribers || 0) - 1, 0) }
            : fanclub
        )
      )

      setCurrentFan(prev => ({
        ...prev,
        fanclubsSubscribed: prev.fanclubsSubscribed.filter(f => f.artistId !== artistId),
        removedSubscriptions: [...prev.removedSubscriptions, { artistId, createdAt: currentDate }]
      }))
    } else {
      if (fanclub?.maxSubscribers && fanclub.subscribers >= fanclub.maxSubscribers) {
        setErr(true)
        return
      }
      setFanclubs(prevFanclubs =>
        prevFanclubs.map(fanclub =>
          fanclub.artistId === artistId
            ? { ...fanclub, subscribers: (fanclub.subscribers || 0) + 1 }
            : fanclub
        )
      )

      setCurrentFan(prev => ({
        ...prev,
        fanclubsSubscribed: [...prev.fanclubsSubscribed, { artistId, createdAt: currentDate }],
        removedSubscriptions: prev.removedSubscriptions.filter(f => f.artistId !== artistId)
      }))
    }

    setErr(false)
  }

  return { handleSubscription, err, isExiting }
}

export default useFanclubSubscriptionHandler