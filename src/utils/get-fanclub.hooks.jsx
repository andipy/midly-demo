import { useState, useEffect, useContext } from 'react'
import { FanclubsContext } from '../contexts/fanclubs.context'
const useFanclub = (artistId) => {
  const { fanclubs}  = useContext(FanclubsContext)
  const [fanclub, setFanclub] = useState()

  useEffect(() => {
    if (artistId && fanclubs) {
      const thisFanclub = fanclubs.find((elem) => elem.artistId === artistId)
      if ( thisFanclub ) {
        setFanclub(thisFanclub)
      } else {
        setFanclub(null)
      }
    }
  }, [artistId, fanclubs])

  return fanclub
}

export default useFanclub