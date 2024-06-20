import IconLikes from '../images/icons/icon-like-white-empty.svg'

const CommentReply = ({ comment, spotCommentToReply }) => {
    return (
        <div className='d-flex-row gap-0_5em mb-xs-3 pl-xs-13 pl-sm-8 pl-md-10' key={comment.id}>
            <img src={comment.userImage} className='avatar-24 border-radius-100' />
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
                        <span>{comment.likes > 0 ? comment.like : ''}</span>
                        <img className='avatar-24' src={IconLikes} alt="♡" />
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentReply