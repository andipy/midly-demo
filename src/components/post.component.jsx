import { Link, useLocation } from 'react-router-dom'

import Button from '../components/button.component'

import IconSettings from '../images/icons/icon-settings-white.svg'
import IconLikes from '../images/icons/icon-like-white-empty.svg'
import IconComments from '../images/icons/icon-comment-white.svg'
import IconShare from '../images/icons/icon-share-white.svg'
import { useEffect } from 'react'

const Post = ({ post, openComments, hasUserSubscribed, handleSubscription }) => {

    const { pathname } = useLocation()

    return (
        <div className='bg-dark-soft border-radius-04 pt-xs-2 pb-xs-4 pl-xs-2 pr-xs-2 mb-xs-8 position-relative overflow-hidden'>
            {!post.settings.isPrivate &&
                <p className='fsize-xs-2 grey-200 mb-xs-2 gold'>Contenuto gratuito</p>
            }
            {post.media.type === 'PHOTO' ?
                <img className={`border-radius-04 w-100 h-100 ${!hasUserSubscribed && !pathname.includes('/artist-app/') && post.settings.isPrivate ? 'blur-50' : ''}`} src={post.media?.url} alt="" />
            : post.media.type === 'VIDEO' ?
                <video className={`border-radius-04 w-100 h-100 ${!hasUserSubscribed && !pathname.includes('/artist-app/') && post.settings.isPrivate ? 'blur-50' : ''}`} src={post.media?.url} controls={false} autoPlay={true} loop={true} />
            : post.text &&
                <div className={`${!hasUserSubscribed && !pathname.includes('/artist-app/') && post.settings.isPrivate ? 'blur-50' : ''}`}>
                    <p className='pre-wrap fsize-xs-5'>{post.text}</p>
                    {post.link.url && post.text &&
                        <div className='mb-xs-2'>
                            <Link to={post.link.url} target='blank' className='lime-400'>{post.link.name ? post.link.name : 'Apri al link'}</Link>
                        </div>
                    }
                </div>
            }

            <div className='d-flex-row align-items-center j-c-space-between mb-xs-1 mt-xs-1'>
                <div className='d-flex-row align-items-center j-c-start gap-1em'>
                    <div 
                        className='avatar-32 d-flex-row align-items-center j-c-center' 
                        onClick={() => {
                            if ( !pathname.includes('/artist-app') ) {
                                if (hasUserSubscribed || !post.settings.isPrivate) {
                                    openComments()
                                }
                            } else {
                                openComments()
                            }
                            
                        }}
                    >
                        <img className='avatar-32' src={IconComments} alt='Comments Icon' />
                        {post.comments.length > 0 && <span>{post.comments.length}</span>}
                    </div>
                    <div className='avatar-32 d-flex-row align-items-center j-c-center'>
                        <img className='avatar-32' src={IconLikes} />
                        {post.likes > 0 && <span>{post.likes}</span>}
                    </div>
                    <div className='avatar-32 d-flex-row align-items-center j-c-center'>
                        <img className='avatar-32' src={IconShare} />
                        {post.shares > 0 && <span>{post.shares}</span>}
                    </div>
                </div>

                {pathname.includes('/artist-app/') &&
                    <div className='avatar-32 d-flex-row align-items-center j-c-center'>
                    <img className='avatar-32' src={IconSettings} />
                    <span>{post.shares > 0 && post.length}</span>
                </div>
                }
            </div>

            <p className='pre-wrap mb-xs-2 grey-200 f-w-300'>{post.caption && post.caption}</p>
            {post.link.url && !post.text &&
                <div className='mb-xs-2'>
                    <Link to={post.link.url} target='blank' className='lime-400'>{post.link.name ? post.link.name : 'Apri al link'}</Link>
                </div>
            }
            <span className='fsize-xs-1 grey-200 f-w-300'>{post.createdAt}</span>

            {!hasUserSubscribed && !pathname.includes('/artist-app/') && post.settings.isPrivate &&
                <div className='position-absolute-x-y w-80 bg-black-transp50 pt-xs-4 pb-xs-6 pl-xs-6 pr-xs-6 border-radius-06'>
                    <p className='t-align-center mb-xs-4'>Vuoi accedere ai contenuti esclusivi dell'artista?</p>
                    <Button style='bg-acid-lime black f-w-500 fsize-xs-2' label='Abbonati' onClick={handleSubscription} />
                </div>
            }

            

            {/* <div className='d-flex-row align-items-center j-c-center position-absolute z-index-3 top-0 right-0 avatar-32 bg-dark-soft-transp75 border-radius-100 mt-xs-4 mr-xs-4'>
                <img className='avatar-32' src={IconSettings} alt="X" />
            </div> */}
        </div>
    )
}

export default Post