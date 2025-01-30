import { useState, useContext } from "react"
import { FanclubsContext } from "../contexts/fanclubs.context"
const useCommentTopicHandler = (artistId, topicId) => {
  const { fanclubs, setFanclubs } = useContext(FanclubsContext)
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

    setFanclubs((prevFanclubs) =>
      prevFanclubs.map((fanclub) => {
        if (fanclub.artistId === artistId) {
          return {
            ...fanclub,
            forum: fanclub.forum.map((t) => {
              if (t.id === topicId) {
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