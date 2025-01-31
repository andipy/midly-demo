import { useState, useContext } from "react"
import { FanclubsContext } from "../contexts/fanclubs.context"
import useAuraPoints from "./handle-aura-points.hook"
import { ATTEND_GROUP_CHAT_EVENT } from "./aura-points-values"

const useConcertCommentHandler = (artistId, concertId, dateId) => {
  const { fanclubs, setFanclubs } = useContext(FanclubsContext)
  const {setAuraPoints} = useAuraPoints()
  const [currentComment, setCurrentComment] = useState({
    type: "COMMENT",
    userId: undefined,
    userType: undefined,
    content: "",
    username: "",
    userImage: undefined,
    createdAt: undefined,
    id: undefined
  })

  const handleSubmitComment = (e) => {
    e.preventDefault()
    let fanCommentsCount
    if (!currentComment.content.trim()) return

    setFanclubs((prevFanclubs) =>
      prevFanclubs.map((fanclub) => {
        if (fanclub.artistId !== artistId) return fanclub

        return {
          ...fanclub,
          concerts: fanclub.concerts.map((concert) => {
            if (concert.id !== concertId) return concert

            if (dateId) {
                return {
                    ...concert,
                    dates: concert.dates.map((date) => {
                        if (date.id !== dateId) return date;
                        if (!window.location.pathname.includes('/artist-app')) {
                            fanCommentsCount = date.messages.filter(
                                (msg) => msg.userId === currentComment?.userId
                                ).length; 
                        }
                               
                        return {
                        ...date,
                        messages: [...date.messages, currentComment]
                        };
                    })
                };
            } else {
                if (!window.location.pathname.includes('/artist-app')) {
                    fanCommentsCount = concert.messages.filter(
                        (msg) => msg.userId === currentComment?.userId
                    ).length
                }
                
                return {
                    ...concert,
                    messages: [...concert.messages, currentComment]
                }
            }
          })
        }
      })
    )

    if (fanCommentsCount === 9 && !window.location.pathname.includes('/artist-app')) {
        setAuraPoints(ATTEND_GROUP_CHAT_EVENT, 'ATTEND_GROUP_CHAT_EVENT', artistId )
    }

    resetComment()
  }

  const resetComment = () => {
    setCurrentComment(prev => ({
        ...prev,
        id: undefined,
        createdAt: undefined,
        content: ''
    }))
  }

  return { currentComment, setCurrentComment, handleSubmitComment }
}

export default useConcertCommentHandler