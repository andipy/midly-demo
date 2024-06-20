import { Link } from 'react-router-dom'

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
                <div className='d-flex-row align-items-center j-c-start gap-1em'>
                    <div className='avatar-32 d-flex-row align-items-center j-c-center' onClick={openComments}>
                        <img className='avatar-32' src={IconComments} />
                        <span>{post.comments.length > 0 && post.comments.length}</span>
                    </div>
                    <div className='avatar-32 d-flex-row align-items-center j-c-center'>
                        <img className='avatar-32' src={IconLikes} />
                        <span>{post.likes > 0 && post.likes}</span>
                    </div>
                    <div className='avatar-32 d-flex-row align-items-center j-c-center'>
                        <img className='avatar-32' src={IconShare} />
                    </div>
                </div>

                <div className='avatar-32 d-flex-row align-items-center j-c-center'>
                    <img className='avatar-32' src={IconSettings} />
                    <span>{post.shares > 0 && post.length}</span>
                </div>
            </div>

            <p className='pre-wrap mb-xs-2'>{post.caption && post.caption}</p>
            {post.link.url &&
                <div className='mb-xs-2'>
                    <Link to={post.link.url} target='blank' className='lime-400'>{post.link.name ? post.link.name : 'Apri al link'}</Link>
                </div>
            }
            <span className='fsize-xs-1 grey-200 f-w-300'>{post.createdAt}</span>

            

            {/* <div className='d-flex-row align-items-center j-c-center position-absolute z-index-3 top-0 right-0 avatar-32 bg-dark-soft-transp75 border-radius-100 mt-xs-4 mr-xs-4'>
                <img className='avatar-32' src={IconSettings} alt="X" />
            </div> */}
        </div>
    )
}

export default Post