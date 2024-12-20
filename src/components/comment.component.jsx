import CommentReply from './comment-reply.component'

import IconLikes from '../images/icons/icon-like-white-empty.svg'
import IconThunder from '../images/icons/icon-thunder.svg'
import IconThunderActive from '../images/icons/icon-thunder-active.svg'

import { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { CurrentFanContext } from '../contexts/currentFan.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'
import { FansContext } from '../contexts/fans.context'


const Comment = ({ comment, spotCommentToReply, modalUserModeration, likeComment, postId, likeReply }) => {

    const { currentFan	} = useContext(CurrentFanContext)
    const { currentArtist } = useContext(CurrentArtistContext)
    const { fans } = useContext(FansContext)
    const { pathname } = useLocation()

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


    return (
        <div className={`d-flex-column mb-xs-6`}>
            <div className={`d-flex-row gap-0_5em mb-xs-3`} key={comment.id}>
                {comment.userType==='FAN' ?
                    userImage ?
                    <img src={userImage} className='avatar-36 border-radius-100' onClick={modalUserModeration}/>
                    :
                    <div className='avatar-36 position-relative'>
                        <div className='d-flex-row j-c-center align-items-center avatar-36 border-radius-100 bg-purple-400' onClick={modalUserModeration}>
                            <h5 className='f-w-500 fsize-xs-3'>
                                {comment.username.charAt(0).toUpperCase()}
                            </h5>
                        </div>
                    </div>
                :
                <img src={comment.userImage} className='avatar-36 border-radius-100' onClick={modalUserModeration}/>
                    
                }
                <div className='d-flex-column w-100'>
                    <div className='d-flex-row align-items-center gap-0_5em'>
                        <span className='fsize-xs-3 f-w-600 grey-250' onClick={modalUserModeration}>{comment.username}</span>
                        {comment.userType === 'ARTIST' &&
                            <span className='fsize-xs-1 gold'>Artista</span>
                        }
                    </div>
                    <div className='fsize-xs-3 grey-100 f-w-300 line-height-1_5 mt-xs-2'>{comment.comment}</div>

                    <div className='d-flex-row j-c-space-between w-100 mt-xs-2'>
                        <div className='d-flex-row j-c-start align-items-center gap-0_5em'>
                            <span className='fsize-xs-1 f-w-200 grey-400'>{comment.createdAt}</span>
                            <span className='fsize-xs-2 f-w-600 grey-300' onClick={spotCommentToReply}>Reply</span>
                        </div>
                        <div className='d-flex-row align-items-center gap-0_5em'>
                            <span className='fsize-xs-1'>{comment.likes.length > 0 ? comment.likes.length : ''}</span>
                            { isLiked ? 
                                <img className='avatar-24' src={IconThunderActive} alt='♡' onClick={likeComment}/>
                                :
                                <img className='avatar-24' src={IconThunder} alt='♡' onClick={likeComment}/>
                            }
                            
                            
                        </div>
                    </div>
                </div>
            </div>
            {comment.comments.map(reply => {
                return (
                    <CommentReply comment={reply} postId={postId} likeReply={likeReply} commentReplied={comment.id} />
                )
            })}
        </div>


        // <div className='d-flex-column gap-0_5em mb-xs-4' key={comment.id}>
        //     <div className='d-flex-row align-items-center gap-0_5em'>
        //         <img className='avatar-36 border-radius-100' src={comment.userImage} alt='' />
        //         <span className='grey-200'>{comment.username}</span>

        //         {comment.userType == 'ARTIST' &&
        //             <span className='fsize-xs-1 lime-400'>Artista</span>
        //         }
                
        //     </div>
        //     <p className='grey-100'>{comment.comment}</p>
        // </div>
    )
}

export default Comment