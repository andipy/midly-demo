import { useState, useContext } from "react"
import { ChatsContext } from "../contexts/chats.context"
import { CurrentFanContext } from "../contexts/currentFan.context"
import { CurrentArtistContext } from "../contexts/currentArtist.context"

const usePrivateChatHandler = (artistId, pathname, hasUserSubscribed) => {
  const { chats, setChats } = useContext(ChatsContext)
  const { currentFan } = useContext(CurrentFanContext)
  const { currentArtist } = useContext(CurrentArtistContext)
  const [shake, setShake] = useState(false)

  const [currentMessage, setCurrentMessage] = useState({
    type: "MESSAGE",
    userId: undefined,
    userType: undefined,
    content: "",
    username: "",
    userImage: undefined,
    createdAt: undefined,
    id: undefined
  })

  const submitMessage = (e) => {
    e.preventDefault()

    if (!hasUserSubscribed) {
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }

    if (currentMessage.content.trim() === "") return

    setChats((prevChats) => {
      let chat
      if (!pathname.includes("/artist-app/")) {
        chat = prevChats.find(
          (c) => c.artistId === artistId && c.fanId === currentFan?.id
        )
      } else {
        chat = prevChats.find(
          (c) => c.artistId === currentArtist?.id && c.fanId === artistId
        )
      }

      if (!chat) {
        return [
          ...prevChats,
          {
            id: prevChats.length + 1,
            fanId: currentFan.id,
            artistId: artistId,
            messages: [currentMessage]
          }
        ]
      } else {
        return prevChats.map((c) =>
          c.id === chat.id
            ? { ...c, messages: [...c.messages, currentMessage] }
            : c
        )
      }
    })

    resetMessage()
  }

  const resetMessage = () => {
    setCurrentMessage((prev) => ({
      ...prev,
      id: undefined,
      createdAt: undefined,
      content: ""
    }))
  }

  return {
    currentMessage,
    setCurrentMessage,
    shake,
    submitMessage
  }
}

export default usePrivateChatHandler