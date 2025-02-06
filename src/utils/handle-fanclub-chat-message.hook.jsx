import { useState, useContext } from "react"
import { FanclubsContext } from "../contexts/fanclubs.context"

const useFanclubGroupChatHandler = (artistId) => {
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

  return { currentMessage, setCurrentMessage, handleSubmitMessage }
}

export default useFanclubGroupChatHandler