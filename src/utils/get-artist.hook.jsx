import { useContext, useMemo } from "react"
import { ArtistsContext } from "../contexts/artists.context"
const useArtist = (artistId) => {
  const { artists } = useContext(ArtistsContext)

  return useMemo(() => {
    return artists?.find(artist => artist.id === artistId)
  }, [artistId, artists])
}

export default useArtist