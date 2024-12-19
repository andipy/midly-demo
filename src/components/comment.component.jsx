import CommentReply from './comment-reply.component'

import IconLikes from '../images/icons/icon-like-white-empty.svg'

const Comment = ({ comment, spotCommentToReply, modalUserModeration }) => {

    return (
        <div className={`d-flex-column mb-xs-6`}>
            <div className={`d-flex-row gap-0_5em mb-xs-3`} key={comment.id}>
                {comment.userImage !== '' ?
                    <img src={comment.userImage} className='avatar-36 border-radius-100' onClick={modalUserModeration}/>
                :
                    <div className='avatar-36 position-relative'>
                        <div className='d-flex-row j-c-center align-items-center avatar-36 border-radius-100 bg-purple-400' onClick={modalUserModeration}>
                            <h5 className='f-w-500 fsize-xs-3'>
                                {comment.username.charAt(0).toUpperCase()}
                            </h5>
                        </div>
                    </div>
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
                            <span>{comment.likes > 0 ? comment.like : ''}</span>
                            <img className='avatar-24' src={IconLikes} alt='♡' />
                            
                        </div>
                    </div>
                </div>
            </div>
            {comment.comments.map(comment => {
                return (
                    <CommentReply comment={comment} />
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