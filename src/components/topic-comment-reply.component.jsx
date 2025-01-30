import IconThunder from '../images/icons/icon-thunder.svg'
import IconThunderActive from '../images/icons/icon-thunder-active.svg'
const TopicCommentReply = ({reply, comment, likeReply, likedReply}) => {
  return (
    <div className="">
        <div id='top-row' className='d-flex-row j-c-start align-items-center gap-0_5em'>
            <img className='avatar-28 border-radius-100' src={reply?.userImage}/>
            <p className='fsize-xs-1 f-w-500'>{reply?.username}</p>
        </div>
        <div id='centre-row' className='d-flex-row j-c-space-between align-items-center w-100 gap-1em mt-xs-2'>
            <div id='text' className='d-flex-row j-c-space-between align-items-center w-100'>
                <p className="fsize-xs-2 f-w-300 no-wrap">
                    <span className="blue-bright-600">@{reply?.repliedUsername}</span> {reply?.comment}
                </p>
                <div className="border-radius-100 avatar-20 d-flex-row j-c-center align-items-center">
                    {
                        likedReply ?
                        <img className="avatar-20" src={IconThunderActive} onClick={() => likeReply(reply.id)}/>
                        :
                        <img className="avatar-20" src={IconThunder} onClick={() => likeReply(reply.id)}/>
                    }
                    <p className="fsize-xs-1 f-w-300">{reply.likes.length}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TopicCommentReply