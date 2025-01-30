import { useMemo } from "react"
const useTopic = (fanclub, topicId) => {
  return useMemo(() => {
    return fanclub?.forum?.find(topic => topic.id === topicId)
  }, [fanclub, topicId])
}

export default useTopic