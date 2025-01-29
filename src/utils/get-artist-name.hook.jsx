import { useMemo, useContext } from "react"
import { ArtistsContext } from "../contexts/artists.context"

const useArtistName = (artistId) => {
  const { artists } = useContext(ArtistsContext)

  const artistName = useMemo(() => {
    const artist = artists.find(artist => artist.id === artistId)
    return artist ? artist.artistName : ''
  }, [artistId, artists])

  return artistName
}

export default useArtistName