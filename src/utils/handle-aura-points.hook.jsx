import { useState, useContext } from "react"
import { FanclubsContext } from "../contexts/fanclubs.context"
import { CurrentFanContext } from "../contexts/currentFan.context"
const useAuraPoints = () => {
  const { fanclubs, setFanclubs } = useContext(FanclubsContext)
  const { currentFan, setCurrentFan } = useContext(CurrentFanContext)


  const setAuraPoints = (value, type, artistId) => {
    if (currentFan) {
        setCurrentFan(prevFan => ({
          ...prevFan,
          auraPoints: (prevFan.auraPoints || 0) + value,
          auraActionsLog: [
            ...(prevFan.auraActionsLog || []),
            { 
                artistId: artistId,
                createdAt: new Date(),
                actionType: type, 
                actionValue: value
            }
          ]
        }))

        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub =>
              fanclub.artistId === artistId
                ? {
                    ...fanclub,
                    leaderboard: fanclub.leaderboard.map(user =>
                      user.userId === currentFan.id
                        ? { ...user, auraPoints: (user.auraPoints || 0) + value }
                        : user
                    )
                  }
                : fanclub
            )
        )
    }

  return { setAuraPoints }
}
}

export default useAuraPoints