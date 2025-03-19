import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
const PostFanLetter = ({post, fan, goFull})=> {
    const navigate = useNavigate()
    const location= useLocation()
    const [showCaption, setShowCaption] = useState(false)
  return (
    <div className="d-flex-column align-items-start j-c-start" onClick={() => goFull()}>
        <div className="border-radius-08 w-100 d-flex-row j-c-center align-items-center position-relative">
            {
                post?.media.type === 'IMAGE' &&
                <img className="object-fit-contain w-100 border-radius-08 mt-xs-4" src={post?.media.url}/>
            }
            {
                post?.media.type === 'VIDEO' &&
                <video className="object-fit-contain w-100 border-radius-08 mt-xs-4"autoPlay playsInline loop muted={true} >
                    <source src={post?.media.url} type='video/mp4' />
                </video>
            }
            
            <div className="d-flex-row j-c-space-between align-items-center gap-0_5em position-absolute bottom-2 left-neg5">
                <img className="border-radius-100 avatar-20" src={fan?.image}></img>
                <p className="fsize-xs-1 f-w-500">{fan?.username}</p>
            </div>
        </div>
        <p className='pre-wrap grey-100 f-w-300 fsize-xs-1'>
            {post?.caption.length > 38 ?
            <>
                {showCaption ?
                    <>
                        {post?.caption}
                        <span className='lime-400 f-w-500' onClick={() => setShowCaption(false)}> meno</span>
                    </>
                :
                    <>
                        {post?.caption.slice(0, 38)}...
                        <span className='lime-400 f-w-500' onClick={() => setShowCaption(true)}> altro</span>
                    </>
                }
            </>
            :
                post.caption
            }
        </p>
    </div>
  )
}

export default PostFanLetter