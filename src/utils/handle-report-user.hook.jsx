import { useContext } from "react"
import { ModerationsContext } from '../contexts/moderations.context'
import { FanclubsContext } from "../contexts/fanclubs.context"
import { useLocation, useNavigate } from "react-router-dom"
import { CurrentFanContext } from "../contexts/currentFan.context"
import { CurrentArtistContext } from "../contexts/currentArtist.context"
import useAuraPoints from "./handle-aura-points.hook"
import { TRY_REPORT_USER } from "./aura-points-values"
const useReportUser = () => {
  const { blocked, reports, setReports } = useContext(ModerationsContext)
  const {currentArtist} = useContext(CurrentArtistContext)
  const { currentFan} = useContext(CurrentFanContext)
  const{setAuraPoints} = useAuraPoints()
  const location = useLocation()
  const navigate = useNavigate()

  const isArtistApp = location.pathname.includes("/artist-app/")
  const currentUser = isArtistApp ? currentArtist : currentFan

  const reportUser = ({ userId, description, postId, commentId, fanclubId, artistId, type, comment, replyId, reply }) => {
    const isUserBlocked = blocked.some(
      (block) => block.blockedUserId === userId && block.fanclubId === fanclubId
    )

    const newReport = {
      reportedUserId: userId,
      reportingUser: {
        id: currentUser?.id,
        userType: isArtistApp ? "ARTIST" : "FAN",
      },
      description,
      postId,
      fanclubId,
      fanclubArtistId: artistId,
      createdAt: new Date().toISOString().replace("T", " ").replace("Z", "").split(".")[0],
      archived: isUserBlocked,
      ...(type === 'COMMENT' && { type, commentId, comment }),
      ...(replyId && reply && { commentId: commentId, replyId: replyId, comment: reply, reply: true })
    }

    if (!isArtistApp) {
        setAuraPoints(TRY_REPORT_USER, 'TRY_REPORT_USER', artistId)
    }

    setReports((prevReports) => [...prevReports, newReport])
  }

  return { reportUser }
}

export default useReportUser