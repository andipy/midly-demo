import { useContext } from "react"
import { FanclubsContext } from "../contexts/fanclubs.context"
const useSubmitComment = () => {
  const { fanclubs, setFanclubs } = useContext(FanclubsContext)

  const handleSubmitComment = (currentComment, postInFocus, commentInFocus, artistId) => {
    if (!currentComment.comment) return

    setFanclubs(prevFanclubs =>
      prevFanclubs.map(fanclub =>
        fanclub.artistId === artistId
          ? {
              ...fanclub,
              posts: fanclub.posts.map(post =>
                post.id === postInFocus.id
                  ? {
                      ...post,
                      comments: commentInFocus
                        ? post.comments.map(comment =>
                            comment.id === commentInFocus
                              ? { ...comment, comments: [...comment.comments, currentComment] }
                              : comment
                          )
                        : [...post.comments, currentComment],
                      commentsCount: post.commentsCount+1
                    }
                  : post
              )
            }
          : fanclub
      )
    )
  }

  return { handleSubmitComment }
}

export default useSubmitComment