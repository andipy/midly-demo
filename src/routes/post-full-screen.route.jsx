import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import NavbarCommentsModal from "../components/navbar-comments-modal.component"
import Container from "../layout/container.layout"
import NavbarMultistep from "../components/navbar-multistep.component"
import SwipeCarousel from "../layout/swipe-carousel.layout"
import SwipeCarouselFull from "../layout/swipe-carousel-full.layout"
import FullPageCenter from "../layout/full-page-center.layout"
import NavbarCloseOnly from "../components/navbar-close-only.component"
const  PostFullScreenRoute = () => {
    const navigate = useNavigate()
    const { state } = useLocation()

    const [post, setPost] = useState({})
        const fetchThisPost = () => {
            setPost(state)
        }
    
        useEffect(() => {
                if (state) {
                    fetchThisPost()
                }
        }, [state])

        useEffect(() => {
            if (post) {
                console.log(post)
            }
    }, [post])
  return (
    <FullPageCenter>
        <NavbarCloseOnly transparent={true}/>
        <div className="d-flex-row j-c-center align-items-center w-100 h-100" >
            {post?.media?.length >= 0 ?
                <SwipeCarouselFull images={post.media} text={post.text} />
                    :
                null
            }
        </div>
    </FullPageCenter>
  )
}

export default PostFullScreenRoute