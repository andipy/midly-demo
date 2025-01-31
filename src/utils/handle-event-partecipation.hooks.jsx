import { useContext } from "react"
import { FanclubsContext } from "../contexts/fanclubs.context"
import { CurrentFanContext } from "../contexts/currentFan.context"
import useAuraPoints from "./handle-aura-points.hook"
import { ATTEND_CONCERT, UNATTEND_CONCERT } from "./aura-points-values"
const useConcertParticipation = () => {
  const { fanclubs, setFanclubs } = useContext(FanclubsContext)
  const { currentFan } = useContext(CurrentFanContext)
  const { setAuraPoints} =useAuraPoints()

  const newParticipation = (artistId, concertId) => {
    const fanclub = fanclubs.find((f) => f.artistId === artistId)
    if (!fanclub) return 

    const concert = fanclub.concerts.find((c) => c.id === concertId)
    if (!concert) return 

    const partecipate = concert.participants.some(
      (p) => p.userId === currentFan.id
    )

    setFanclubs((prevFanclubs) =>
      prevFanclubs.map((fanclub) => {
        if (fanclub.artistId === artistId) {
          return {
            ...fanclub,
            concerts: fanclub.concerts.map((concert) => {
              if (concert.id === concertId) {
                return {
                  ...concert,
                  participants: partecipate
                    ? concert.participants.filter(
                        (p) => p.userId !== currentFan.id
                      ) // Rimuove il partecipante
                    : [
                        ...concert.participants,
                        { userId: currentFan.id },
                      ], // Aggiunge il partecipante
                }
              }
              return concert
            }),
          }
        }
        return fanclub
      })
    )
    if (partecipate) {
        setAuraPoints(UNATTEND_CONCERT, 'UNATTEND_CONCERT', artistId)
    } else {
        setAuraPoints(ATTEND_CONCERT, 'ATTEND_CONCERT', artistId)
    }

  }

  return { newParticipation }
}

export default useConcertParticipation