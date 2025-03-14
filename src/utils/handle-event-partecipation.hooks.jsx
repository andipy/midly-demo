import { useContext } from "react"
import { FanclubsContext } from "../contexts/fanclubs.context"
import { CurrentFanContext } from "../contexts/currentFan.context"
import useAuraPoints from "./handle-aura-points.hook"
import { ATTEND_CONCERT, UNATTEND_CONCERT } from "./aura-points-values"
const useConcertParticipation = () => {
  const { fanclubs, setFanclubs } = useContext(FanclubsContext)
  const { currentFan } = useContext(CurrentFanContext)
  const { setAuraPoints } = useAuraPoints()

  const newParticipation = (artistId, concertId, tourId) => {
    const fanclub = fanclubs.find((f) => f.artistId === artistId)
    if (!fanclub) return

    let concert
    let partecipate

    // Se tourId è definito, cerca il tour all'interno dei concerti
    if (tourId) {
      // Troviamo il tour all'interno dei concerti
      const tour = fanclub.concerts.find((concert) => concert.id === tourId && concert.type === 'TOUR')
      if (!tour) return 

      // Cerca il concerto all'interno delle date del tour
      concert = tour.dates.find((date) => date.id === concertId)

      if (!concert) return

       partecipate = concert.participants.some(
        (p) => p.userId === currentFan.id
      )

      // Primo setFanclubs per quando tourId è definito
      setFanclubs((prevFanclubs) =>
        prevFanclubs.map((fanclub) => {
          if (fanclub.artistId === artistId) {
            return {
              ...fanclub,
              concerts: fanclub.concerts.map((concert) => {
                if (concert.id === tourId && concert.type === 'TOUR') {
                  return {
                    ...concert,
                    dates: concert.dates.map((date) => {
                      if (date.id === concertId) {
                        return {
                          ...date,
                          participants: partecipate
                            ? date.participants.filter(
                                (p) => p.userId !== currentFan.id
                              )
                            : [
                                ...date.participants,
                                { userId: currentFan.id },
                              ],
                        }
                      }
                      return date
                    }),
                  }
                }
                return concert
              }),
            }
          }
          return fanclub
        })
      )
    } else {
      // Se tourId non è definito, cerca direttamente il concerto
      const concert = fanclub.concerts.find((concert) => concert.id === concertId && concert.type !== 'TOUR')
      if (!concert) return

      partecipate = concert.participants.some(
        (p) => p.userId === currentFan.id
      )

      // Secondo setFanclubs per quando tourId non è definito
      setFanclubs((prevFanclubs) =>
        prevFanclubs.map((fanclub) => {
          if (fanclub.artistId === artistId) {
            return {
              ...fanclub,
              concerts: fanclub.concerts.map((concert) => {
                if (concert.id === concertId && concert.type !== 'TOUR') {
                  return {
                    ...concert,
                    participants: partecipate
                      ? concert.participants.filter(
                          (p) => p.userId !== currentFan.id
                        )
                      : [
                          ...concert.participants,
                          { userId: currentFan.id },
                        ],
                  }
                }
                return concert
              }),
            }
          }
          return fanclub
        })
      )
    }

    // Gestione dei punti aura
    if (partecipate) {
      setAuraPoints(UNATTEND_CONCERT, 'UNATTEND_CONCERT', artistId)
    } else {
      setAuraPoints(ATTEND_CONCERT, 'ATTEND_CONCERT', artistId)
    }
  }

  return { newParticipation }
}

export default useConcertParticipation