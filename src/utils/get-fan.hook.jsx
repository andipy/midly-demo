import { useContext, useMemo } from "react"
import { FansContext } from "../contexts/fans.context"
const useFan = (fanId) => {
  const { fans } = useContext(FansContext)

  return useMemo(() => {
    return fans?.find(fan => fan.id === fanId)
  }, [fans, fanId])
}

export default useFan