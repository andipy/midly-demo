import { useState, useContext } from "react"
import { FanclubsContext } from "../contexts/fanclubs.context"
import useFanclubSubscription from "./get-fanclub-subscription.hook"

const useFanclubGroupChatHandler = (artistId) => {
  const [shake, setShake] = useState(false)
  const hasUserSubscribed = useFanclubSubscription(artistId)
  const { fanclubs, setFanclubs } = useContext(FanclubsContext)
  const [currentMessage, setCurrentMessage] = useState({
    userType: undefined,
    userId: undefined,
    userImage: undefined,
    username: '',
    id: undefined,
    createdAt: undefined,
    content: ''
  })

  const handleSubmitMessage = (e) => {
    e.preventDefault()
    if (!currentMessage.content.trim()) return

    if (!hasUserSubscribed) {
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }

    setFanclubs((prevFanclubs) =>
      prevFanclubs.map((fanclub) => {
        if (fanclub.artistId !== artistId) return fanclub
        return {
          ...fanclub,
          messages: [...fanclub.messages, currentMessage]
            
        }
      })
    )

    resetMessage()
  }

  const resetMessage = () => {
    setCurrentMessage(prev => ({
        ...prev,
        id: undefined,
        createdAt: undefined,
        content: ''
    }))
  }

  return { currentMessage, setCurrentMessage, handleSubmitMessage, shake }
}

export default useFanclubGroupChatHandler