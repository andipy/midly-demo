import { useContext } from "react"
import { FanclubsContext } from "../contexts/fanclubs.context"
import useAuraPoints from "./handle-aura-points.hook"
import { COMMENT_POST_AS_FIRST, COMMENT_POST, REPLY_TO_POST_COMMENT } from "./aura-points-values"
const useSubmitComment = () => {
  const { fanclubs, setFanclubs } = useContext(FanclubsContext)
  const { setAuraPoints} = useAuraPoints()

  const handleSubmitComment = (currentComment, postInFocus, commentInFocus, artistId) => {
    if (!currentComment.comment) return

    let firstComment = false

    setFanclubs(prevFanclubs =>
      prevFanclubs.map(fanclub =>
        fanclub.artistId === artistId
          ? {
            ...fanclub,
            posts: fanclub.posts.map(post => {          
              if (post.id === postInFocus.id) {
                if (post.comments.length === 0) {
                  firstComment = true
                }
          
                return {
                  ...post,
                  comments: commentInFocus
                    ? post.comments.map(comment =>
                        comment.id === commentInFocus
                          ? { ...comment, comments: [...comment.comments, currentComment] }
                          : comment
                      )
                    : [...post.comments, currentComment],
                  commentsCount: post.commentsCount + 1
                }
              }
              return post
            })
          }
          : fanclub
      )
    )

    if (firstComment === true && !window.location.pathname.includes('/artist-app')) {
      setAuraPoints(COMMENT_POST_AS_FIRST, 'COMMENT_POST_AS_FIRST', artistId)
    } else if (firstComment === false && !window.location.pathname.includes('/artist-app')){
      if (commentInFocus) {
        setAuraPoints(REPLY_TO_POST_COMMENT, 'REPLY_TO_POST_COMMENT', artistId)
      } else {
        setAuraPoints(COMMENT_POST, 'COMMENT_POST', artistId)
      }
    }
  }

  return { handleSubmitComment }
}

export default useSubmitComment