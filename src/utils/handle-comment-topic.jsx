import { useState, useContext } from "react"
import { FanclubsContext } from "../contexts/fanclubs.context"
import useAuraPoints from "./handle-aura-points.hook"
import { REPLY_TO_TOPIC, REPLY_TO_TOPIC_AS_FIRST, REPLY_TO_REPLY_TO_TOPIC } from "./aura-points-values"
const useCommentTopicHandler = (artistId, topicId) => {
  const { fanclubs, setFanclubs } = useContext(FanclubsContext)
  const {setAuraPoints} = useAuraPoints()
  const [commentInFocus, setCommentInFocus] = useState(null)
  const [replyingUser, setReplyingUser] = useState(null)
  const [currentComment, setCurrentComment] = useState({
    id: undefined,
    userId: undefined,
    userType: undefined,
    userImage: undefined,
    username: undefined,
    createdAt: undefined,
    comment: "",
    likes: [],
    comments: [],
    repliedUsername: undefined
  })

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (currentComment.comment.trim() === "") return

    let firstComment = false

    setFanclubs((prevFanclubs) =>
      prevFanclubs.map((fanclub) => {
        if (fanclub.artistId === artistId) {
          return {
            ...fanclub,
            forum: fanclub.forum.map((t) => {
              if (t.id === topicId) {
                if (t.comments.length === 0) {
                  firstComment = true
                }
                return {
                  ...t,
                  comments: commentInFocus
                    ? t.comments.map((comment) =>
                        comment.id === commentInFocus
                          ? { ...comment, comments: [...comment.comments, currentComment] }
                          : comment
                      )
                    : [...t.comments, currentComment],
                  commentsCount: t.commentsCount + 1
                }
              }
              return t
            })
          }
        }
        return fanclub
      })
    )
    if (firstComment === true && !window.location.pathname.includes('/artist-app')) {
      setAuraPoints(REPLY_TO_TOPIC_AS_FIRST, 'REPLY_TO_TOPIC_AS_FIRST', artistId)
    } else if (firstComment === false && !window.location.pathname.includes('/artist-app')){
      if (commentInFocus) {
        setAuraPoints(REPLY_TO_REPLY_TO_TOPIC, 'REPLY_TO_REPLY_TO_TOPIC', artistId)
      } else {
        setAuraPoints(REPLY_TO_TOPIC, 'REPLY_TO_TOPIC', artistId)
      }
    }

    setCommentInFocus(null)
    setReplyingUser(null)
    resetComment()
  }

  const resetComment = () => {
    setCurrentComment({
      id: undefined,
      userId: undefined,
      userType: undefined,
      userImage: undefined,
      username: undefined,
      createdAt: undefined,
      comment: "",
      likes: [],
      comments: [],
      repliedUsername: undefined
    })
  }

  return { handleSubmitComment, commentInFocus, setCommentInFocus, replyingUser, setReplyingUser, currentComment, setCurrentComment }
}

export default useCommentTopicHandler