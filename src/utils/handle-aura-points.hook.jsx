import { useContext } from "react"
import { FanclubsContext } from "../contexts/fanclubs.context"
import { CurrentFanContext } from "../contexts/currentFan.context"
import { FansContext } from "../contexts/fans.context"

const useAuraPoints = () => {
  const { fanclubs, setFanclubs } = useContext(FanclubsContext)
  const { currentFan, setCurrentFan } = useContext(CurrentFanContext)
  const { fans} = useContext(FansContext)

  const setAuraPoints = (value, type, artistId) => {
    const fanclubId = fanclubs.find(f => f.artistId === artistId)?.id

    if (currentFan) {
        setCurrentFan(prevFan => {
            const existingEntry = prevFan.auraPoints?.find(entry => entry.fanclubId === fanclubId)

            let updatedAuraPoints

            if (existingEntry) {
                updatedAuraPoints = prevFan.auraPoints.map(entry =>
                entry.fanclubId === fanclubId
                    ? {
                        ...entry,
                        auraPoints: entry.auraPoints + value, 
                        actionLog: [
                        ...entry.actionLog,
                        {
                            artistId: artistId,
                            createdAt: new Date(),
                            actionType: type,
                            actionValue: value
                        }
                        ]
                    }
                    : entry
                )
            } else {
                updatedAuraPoints = [
                ...prevFan.auraPoints,
                {
                    fanclubId: fanclubId,
                    auraPoints: value,
                    actionLog: [
                    {
                        artistId: artistId,
                        createdAt: new Date(),
                        actionType: type,
                        actionValue: value
                    }
                    ]
                }
                ]
            }

            return {
                ...prevFan,
                auraPoints: updatedAuraPoints 
            }
        })

        setFanclubs(prevFanclubs => {
          return prevFanclubs.map(f => {
              if (f.artistId === artistId) {
                  const userExists = f.leaderboard.some(user => user.userId === currentFan.id)
                  const fan = fans.find(fan => fan.id === currentFan.id)
      
                  const updatedLeaderboard = userExists
                      ? f.leaderboard.map(user =>
                          user.userId === currentFan.id
                              ? { ...user, auraPoints: (user.auraPoints || 0) + value }
                              : user
                      )
                      : [...f.leaderboard, { userId: currentFan.id, auraPoints: value, image: fan?.image, username: currentFan?.username }]
      
                  return {
                      ...f,
                      leaderboard: updatedLeaderboard
                  }
              }
              return f
          })
        })

    }
  }

  return { setAuraPoints }
}

export default useAuraPoints