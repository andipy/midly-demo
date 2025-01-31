import { useState } from "react"
import Snackbar from "../components/snackbar.component"
import useAuraPoints from "./handle-aura-points.hook"
import { SHARE_POST } from "./aura-points-values"
const useShare = () => {
  const [triggered, setTriggered] = useState(false)
  const {setAuraPoints} = useAuraPoints()
  const [messageSnackbar, setMessageSnackbar] = useState("")

  const triggerSnackbar = (message) => {
    setMessageSnackbar(message)
    setTriggered(true)
    setTimeout(() => {
      setTriggered(false)
    }, 2000)
  }

  const share = async (post) => {
    const url = post?.share?.shareLink || window.location.href // Usa il link del post o l'URL attuale
    triggerSnackbar('LInk al post condiviso')

    if (!url) {
    return
    }

    if (navigator.share) {
        await navigator.share({
            title: post.caption || "Guarda questo post!",
            url: url, // URL da condividere
        })
    } else {
        navigator.clipboard.writeText(url)
    }

    if (!window.location.pathname.includes('/artist-app')) {
      setAuraPoints(SHARE_POST, 'SHARE_POST', post.artistId)
    }

  }

  return { share, triggered, messageSnackbar}
}

export default useShare