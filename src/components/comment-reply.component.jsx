import IconLikes from '../images/icons/icon-like-white-empty.svg'
import IconThunder from '../images/icons/icon-thunder.svg'
import IconThunderActive from '../images/icons/icon-thunder-active.svg'

import { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { CurrentFanContext } from '../contexts/currentFan.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'
import { FansContext } from '../contexts/fans.context'

const CommentReply = ({ comment, spotCommentToReply, postId, likeReply, commentReplied}) => {

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
            console.log('artista')
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
        <div className='d-flex-row gap-0_5em mb-xs-3 pl-xs-13 pl-sm-8 pl-md-10' key={comment.id}>
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
                <div className='fsize-xs-2 grey-100 f-w-300 line-height-1_5 mt-xs-2'>{comment.comment}</div>

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
    )
}

export default CommentReply