import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { CurrentFanContext } from '../contexts/currentFan.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'

import IconThunder from '../images/icons/icon-thunder.svg'
import IconThunderActive from '../images/icons/icon-thunder-active.svg'
import TopicCommentReply from './topic-comment-reply.component'
const TopicComment = ({comment, topic, likeComment, likedComment, commentInFocus, spotCommentToReply, likeReply}) => {
    const location = useLocation()
    const pathname = location.pathname
    const {currentFan} = useContext(CurrentFanContext)
    const {currentArtist} = useContext(CurrentArtistContext)
  return (
    <div id={comment?.id} className="d-flex-column w-100vw image-wrapper bg-dark-gradient mb-xs-2"> 
        <div className={`${comment?.id === commentInFocus ? 'bg-dark-soft-2' : 'bg-dark-gradient'} pt-xs-4 pb-xs-2`} onClick={() => spotCommentToReply(comment?.id, comment?.username)}>
            <div className="container">
                <div id='top-row' className='d-flex-row j-c-start align-items-center gap-0_5em'>
                    <img className='avatar-28 border-radius-100' src={comment?.userImage}/>
                    <p className='fsize-xs-1 f-w-500'>{comment?.username}</p>
                </div>
                <div id='centre-row' className='d-flex-row j-c-space-between align-items-center w-100 gap-1em mt-xs-2'>
                    <div id='text' className='d-flex-column w-100'>
                        <p className='fsize-xs-2 f-w-300 '>
                            {comment?.comment}
                        </p>
                    </div>
                </div>
                <div id='like row' className=' w-100 d-flex-row j-c-end align-items-center gap-0_25em mt-xs-2 mb-xs-2'>
                    <div className='d-flex-row gap-0_5em j-c-center align-items-center'>
                        <div className="border-radius-08  bg-acid-lime pr-xs-4 pl-xs-4" onClick={() => spotCommentToReply(comment?.id, comment?.username)}>
                            <p className="fsize-xs-0 f-w-300 black ">Rispondi</p>
                        </div>
                        <div className="border-radius-100 avatar-20 d-flex-row j-c-center align-items-center">
                            {
                                likedComment ?
                                <img className="avatar-20" src={IconThunderActive} onClick={() => likeComment(comment?.id)}/>
                                :
                                <img className="avatar-20" src={IconThunder} onClick={() => likeComment(comment?.id)}/>
                            }
                            <p className="fsize-xs-1 f-w-300">{comment?.likes.length}</p>
                        </div>
                        
                        
                    </div>
                    
                </div>
            </div>
            
        </div>
        {
            comment?.comments.length > 0 &&
                <div className="container mt-xs-2 mb-xs-2 d-flex-colum j-c-start align-items-start">
            
                    <div className=" container pl-xs-4 border-left-dark-0_5">
                    {
                        comment?.comments.map(reply => {
                            let likedReply 
                            {
                                pathname.includes('/artist-app') ?
                                    likedReply = reply.likes.find(l => l.userId === currentArtist.id && l.type === 'ARTIST')
                                :
                                    likedReply = reply.likes.find(l => l.userId === currentFan.id && l.type === 'FAN')
                            }
                            return(
                                <TopicCommentReply reply={reply} comment={comment} likedReply={likedReply} likeReply={(replyId) => likeReply(comment?.id, replyId)}/>
                            )
                        })
                    }
                    </div>
                
                </div>
        }
        
</div>
  )
}

export default TopicComment