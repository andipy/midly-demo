import IconSettings from '../images/icons/icon-settings-white.svg'
import IconLikes from '../images/icons/icon-like-white-empty.svg'
import IconComments from '../images/icons/icon-comment-white.svg'
import IconShare from '../images/icons/icon-share-white.svg'

const Post = ({ post, openComments }) => {
    return (
        <div className='bg-dark-soft border-radius-04 pt-xs-2 pb-xs-4 pl-xs-2 pr-xs-2 mb-xs-8 position-relative'>
            {post.media.type === 'PHOTO' ?
                <img className='border-radius-04 w-100 h-100' src={post.media?.url} alt="" />
            : post.media.type === 'VIDEO' &&
                <video className='border-radius-04 w-100 h-100' src={post.media?.url} controls />
            }

            <div className='d-flex-row align-items-center j-c-space-between mb-xs-1 mt-xs-1'>
                <div className='d-flex-row align-items-center j-c-start gap-0_5em'>
                    <div className='avatar-32 d-flex-row align-items-center j-c-center' onClick={openComments}>
                        <img className='avatar-32' src={IconComments} />
                    </div>
                    <div className='avatar-32 d-flex-row align-items-center j-c-center'>
                        <img className='avatar-32' src={IconLikes} />
                    </div>
                    <div className='avatar-32 d-flex-row align-items-center j-c-center'>
                        <img className='avatar-32' src={IconShare} />
                    </div>
                </div>

                <div className='avatar-32 d-flex-row align-items-center j-c-center'>
                    <img className='avatar-32' src={IconSettings} />
                </div>
            </div>

            <p className='mb-xs-2'>{post.caption && post.caption}</p>
            <span className='fsize-xs-1 grey-200 f-w-300'>{post.createdAt}</span>

            

            {/* <div className='d-flex-row align-items-center j-c-center position-absolute z-index-3 top-0 right-0 avatar-32 bg-dark-soft-transp75 border-radius-100 mt-xs-4 mr-xs-4'>
                <img className='avatar-32' src={IconSettings} alt="X" />
            </div> */}
        </div>
    )
}

export default Post