import IconLikes from '../images/icons/icon-like-white-empty.svg'

const Comment = ({ comment }) => {
    return (
        <div className='d-flex-row gap-0_5em mb-xs-8' key={comment.id}>
            <img src={comment.userImage} className='avatar-36 border-radius-100' />
            <div className='d-flex-column w-100'>
                <div className='d-flex-row align-items-center gap-0_5em'>
                    <span className='fsize-xs-3 f-w-600 grey-250'>{comment.username}</span>
                    {comment.userType === 'ARTIST' &&
                        <span className='fsize-xs-1 gold'>Artista</span>
                    }
                </div>
                <div className='fsize-xs-3 grey-100 f-w-300 line-height-1_5 mt-xs-2'>{comment.comment}</div>

                <div className='d-flex-row j-c-space-between w-100 mt-xs-2'>
                    <div className='d-flex-row j-c-start align-items-center gap-0_5em'>
                        <span className='fsize-xs-1 f-w-200 grey-400'>{comment.createdAt}</span>
                        <span className='fsize-xs-2 f-w-600 grey-300'>Reply</span>
                    </div>
                    <div className='d-flex-row align-items-center gap-0_5em'>
                        <span>{comment.likes > 0 ? comment.like : ''}</span>
                        <img className='avatar-24' src={IconLikes} alt="♡" />
                        
                    </div>
                </div>
            </div>
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