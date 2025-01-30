import { useContext } from "react";
import { FanclubsContext } from "../contexts/fanclubs.context";
import { CurrentFanContext } from "../contexts/currentFan.context";

const useLikeTopicReply = () => {
  const { fanclubs, setFanclubs } = useContext(FanclubsContext);
  const { currentFan } = useContext(CurrentFanContext);

  const likeReply = (artistId, topicId, commentId, replyId) => {
    setFanclubs((prevFanclubs) =>
      prevFanclubs.map((fanclub) => {
        if (fanclub.artistId === artistId) {
          return {
            ...fanclub,
            forum: fanclub.forum.map((topic) => {
              if (topic.id === topicId) {
                return {
                  ...topic,
                  comments: topic.comments.map((comment) => {
                    if (comment.id === commentId) {
                      return {
                        ...comment,
                        comments: comment.comments.map((reply) => {
                          if (reply.id === replyId) {
                            const hasLiked = reply.likes.some(
                              (like) => like.userId === currentFan.id && like.type === "FAN"
                            );
                            return {
                              ...reply,
                              likes: hasLiked
                                ? reply.likes.filter(
                                    (like) =>
                                      !(like.userId === currentFan.id && like.type === "FAN")
                                  ) // Rimuove il like
                                : [...reply.likes, { userId: currentFan.id, type: "FAN" }] // Aggiunge il like
                            };
                          }
                          return reply;
                        })
                      };
                    }
                    return comment;
                  })
                };
              }
              return topic;
            })
          };
        }
        return fanclub;
      })
    );
  };

  return { likeReply };
};

export default useLikeTopicReply;