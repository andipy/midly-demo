import { useContext } from "react";
import { FanclubsContext } from "../contexts/fanclubs.context";
import { CurrentFanContext } from "../contexts/currentFan.context";

const useLikePost = () => {
  const { fanclubs, setFanclubs } = useContext(FanclubsContext);
  const { currentFan } = useContext(CurrentFanContext);

  const likePost = (artistId, postId) => {
    setFanclubs((prevFanclubs) =>
      prevFanclubs.map((fanclub) => {
        if (fanclub.artistId === artistId) {
          return {
            ...fanclub,
            posts: fanclub.posts.map((post) => {
              if (post.id === postId) {
                const hasLiked = post.likes.some(
                  (like) => like.userId === currentFan.id
                );
                return {
                  ...post,
                  likes: hasLiked
                    ? post.likes.filter(
                        (like) => like.userId !== currentFan.id
                      ) // Rimuove il like
                    : [...post.likes, { userId: currentFan.id }], // Aggiunge il like
                };
              }
              return post;
            }),
          };
        }
        return fanclub;
      })
    );
  };

  return { likePost };
};

export default useLikePost