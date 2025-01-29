import { useContext } from "react";
import { FanclubsContext } from "../contexts/fanclubs.context";
import { CurrentFanContext } from "../contexts/currentFan.context";

const useConcertParticipation = () => {
  const { fanclubs, setFanclubs } = useContext(FanclubsContext);
  const { currentFan } = useContext(CurrentFanContext);

  const newParticipation = (artistId, concertId) => {
    // Trova il fanclub per l'artista
    const fanclub = fanclubs.find((f) => f.artistId === artistId);
    if (!fanclub) return; // Se il fanclub non esiste, non fare nulla

    // Trova il concerto per l'artista
    const concert = fanclub.concerts.find((c) => c.id === concertId);
    if (!concert) return; // Se il concerto non esiste, non fare nulla

    // Controlla se l'utente è già partecipante
    const partecipate = concert.participants.some(
      (p) => p.userId === currentFan.id
    );

    // Aggiungi o rimuovi la partecipazione
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
                };
              }
              return concert;
            }),
          };
        }
        return fanclub;
      })
    );
  };

  return { newParticipation };
};

export default useConcertParticipation;