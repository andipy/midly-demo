import { useContext } from "react"
import { FanclubsContext } from "../contexts/fanclubs.context"
import { CurrentFanContext } from "../contexts/currentFan.context"

const useAuraPoints = () => {
  const { fanclubs, setFanclubs } = useContext(FanclubsContext)
  const { currentFan, setCurrentFan } = useContext(CurrentFanContext)

  const setAuraPoints = (value, type, artistId) => {
    console.log(value, type, artistId)
    const fanclubId = fanclubs.find(f => f.artistId === artistId).id

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
            
            const updatedFanclubs = prevFanclubs.map(f =>
              f.artistId === artistId
                ? {
                    ...f,
                    leaderboard: f.leaderboard.map(user => {
                      if (user.userId === currentFan.id) {
                        const updatedUser = { ...user, auraPoints: (user.auraPoints || 0) + value }

                        return updatedUser
                      }
                      return user
                    })
                  }
                : f
            )
          
          
            return updatedFanclubs
        })

    }
  }

  return { setAuraPoints }
}

export default useAuraPoints