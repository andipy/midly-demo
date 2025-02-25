import IconLikes from '../images/icons/icon-like-white-empty.svg'
import IconThunder from '../images/icons/icon-thunder.svg'
import IconThunderActive from '../images/icons/icon-thunder-active.svg'

import { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { CurrentFanContext } from '../contexts/currentFan.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'
import { FansContext } from '../contexts/fans.context'

const CommentReply = ({ comment, spotCommentToReply, postId, likeReply, commentReplied, commentUserModeration, deleteReply, replyUserModeration}) => {

    const { currentFan	} = useContext(CurrentFanContext)
    const { currentArtist} = useContext(CurrentArtistContext)
    const { pathname } = useLocation()
    const { fans } = useContext(FansContext)


    const [isLiked, setIsLiked] = useState(false)
	useEffect(() => {
		if (comment && comment.likes && !pathname.includes('/artist-app')) {
			const likedByUser = comment.likes.some(like => like.userId === currentFan.id && like.type === 'FAN')
			setIsLiked(likedByUser)
		}
        if (comment && comment.likes && pathname.includes('/artist-app')) {
			const likedByUser = comment.likes.some(like => like.userId === currentArtist.id && like.type === 'ARTIST');
			setIsLiked(likedByUser)
		}
	}, [comment])

    const [userImage, setUserImage] = useState()
    useEffect(() => {
        if (comment && comment.userType === 'FAN') {
			const fan = fans?.find(fan => fan?.id === comment.userId)
            setUserImage(fan?.image)
		}
    }, [comment])

    const [offsetX, setOffsetX] = useState(0)
    const [isSwiped, setIsSwiped] = useState(false)

    const handleTouchStart = (e) => {
        setOffsetX(e.touches[0].clientX)
    }

    const handleTouchMove = (e) => {
        const touchX = e.touches[0].clientX
        const deltaX = touchX - offsetX
        if (!pathname.includes('artist-app')  && comment.userType === 'ARTIST') return
        if (deltaX < -50) {
            setIsSwiped(true)
        } else if (deltaX > 10) { 
            setIsSwiped(false)
        }
    }

    return (
        <div 
            className={`d-flex-row gap-0_5em mb-xs-3 comment-container overflow-x w-100 ${isSwiped && pathname.includes('artist-app') ? "swiped" : ""} ${isSwiped && !pathname.includes('artist-app') ? "swiped-fan" : ""} ${isSwiped && !pathname.includes('artist-app') && comment.userId === currentFan.id ? "swiped" : ""} ${isSwiped && pathname.includes('artist-app') && comment.userType === 'ARTIST' ? "swiped-fan" : ""}`} 
            key={comment.id}
            onTouchStart={handleTouchStart} 
            onTouchMove={handleTouchMove}
        >
            <div className='d-flex-row gap-0_5em mb-xs-3 pl-xs-13 pl-sm-8 pl-md-10 comment-content w-min-100' key={comment.id}>
                {comment.userType==='FAN' ?
                        userImage ?
                        <img src={userImage} className='avatar-24 border-radius-100' />
                        :
                        <div className='avatar-24 position-relative'>
                            <div className='d-flex-row j-c-center align-items-center avatar-24 border-radius-100 bg-purple-400' >
                                <h5 className='f-w-500 fsize-xs-3'>
                                    {comment.username.charAt(0).toUpperCase()}
                                </h5>
                            </div>
                        </div>
                    :
                    <img src={comment.userImage} className='avatar-24 border-radius-100' />
                        
                }
                <div className='d-flex-column w-100'>
                    <div className='d-flex-row align-items-center gap-0_5em'>
                        <span className='fsize-xs-2 f-w-600 grey-250'>{comment.username}</span>
                        {comment.userType === 'ARTIST' &&
                            <span className='fsize-xs-0 gold'>Artista</span>
                        }
                    </div>
                    <div className='fsize-xs-2 grey-100 f-w-300 line-height-1_5 mt-xs-2'><span className="blue-bright-600">@{comment?.repliedUsername}</span> {comment?.comment}</div>

                    <div className='d-flex-row j-c-space-between w-100 mt-xs-2'>
                        <div className='d-flex-row j-c-start align-items-center gap-0_5em'>
                            <span className='fsize-xs-1 f-w-200 grey-400'>{comment.createdAt}</span>
                            {/* <span className='fsize-xs-2 f-w-600 grey-300' onClick={spotCommentToReply}>Reply</span> */}
                        </div>
                        <div className='d-flex-row align-items-center gap-0_5em'>
                            <span className='fsize-xs-1'>{comment.likes.length > 0 ? comment.likes.length : ''}</span>
                            { isLiked ? 
                                <img className='avatar-24' src={IconThunderActive} alt='♡' onClick={() => {
                                    likeReply(comment.id, commentReplied, postId)
                                    
                                }}/>
                                :
                                <img className='avatar-24' src={IconThunder} alt='♡'onClick={() => {
                                    likeReply(comment.id, commentReplied, postId)
                                    
                                }}/>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
            {
                (!pathname.includes('artist-app')  && comment.userType === 'ARTIST') ?
                <></>
                :
                <div className='d-flex-row comment-actions'>
                    {/* {
                        pathname.includes('artist-app') && comment.userType === 'ARTIST' ?
                        <></>
                        :
                        <div className='bg-red-400 d-flex-row j-c-center align-items-center pr-xs-8 pl-xs-8 mr-xs-2' onClick={() => {replyUserModeration(); setIsSwiped(false)}}>Segnala</div>
                    } */}
                    {
                        pathname.includes('artist-app') && comment.userType === 'ARTIST' ?
                        <></>
                        :
                        !pathname.includes('artist-app') && comment.userId === currentFan.id ?
                        <></>
                        :
                        <div className='bg-red-400 d-flex-row j-c-center align-items-center pr-xs-8 pl-xs-8 mr-xs-2 w-80px' onClick={() => {replyUserModeration(); setIsSwiped(false)}}>Segnala</div>
                    }
                    {
                        pathname.includes('artist-app') &&
                        <div className='bg-red-400 d-flex-row j-c-center align-items-center pr-xs-8 pl-xs-8 w-80px' onClick={() => {deleteReply(); setIsSwiped(false)}}>Elimina</div>

                    }
                    {
                        !pathname.includes('artist-app') && comment?.userId === currentFan.id &&
                        <div className='bg-red-400 d-flex-row j-c-center align-items-center pr-xs-8 pl-xs-8 w-80px' onClick={() => {deleteReply(); setIsSwiped(false)}}>Elimina</div>

                    }
                </div>
            }
        </div>
    )
}

export default CommentReply