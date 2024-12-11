import { useState, useEffect, useContext } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'

import { ArtistsContext } from '../contexts/artists.context'

import SwipeCarousel from '../layout/swipe-carousel.layout'
import IconSettings from '../images/icons/icon-settings-white.svg'
import IconLike from '../images/icons/icon-like-white-empty.svg'
import IconComments from '../images/icons/icon-comment-white.svg'
import IconShare from '../images/icons/icon-share-white.svg'

const Post = ({ artistId, post, openComments, hasUserSubscribed }) => {

	const { artists } = useContext(ArtistsContext)

	const [artist, setArtist] = useState()
	useEffect(() => {
		const foundArtist = artists?.find((artist) => artist.id === artistId)
		setArtist(foundArtist)
	}, artistId)



	const { pathname } = useLocation()
	const navigate = useNavigate()
	const [showCaption, setShowCaption] = useState(false)
	const [days, setDays] = useState(0)
	
	useEffect(() => {
		const specificDate = new Date(post.createdAt)
		const currentDate = new Date()
		const timeDifference = currentDate - specificDate
		const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
		setDays(daysPassed)
	}, [post])

	const formatDate = () => {
		const specificDate = new Date(post.createdAt)
		const day = specificDate.getDate()
		const month = specificDate.toLocaleString('default', { month: 'long' })
		const formattedMonth =  month
		const year = specificDate.getFullYear()
		const today = new Date()
		const thisYear = today.getFullYear()
		return day + ' ' + formattedMonth + ' ' + `${year === thisYear ?  '' : year}`
	}

	return (
		<>
		<div className='bg-dark-gradient position-relative overflow-hidden d-flex-column j-c-center align-items-center'>
			<div className='d-flex-row w-100 gap-0_25em j-c-start align-items-center pl-xs-2'>
				<img className='avatar-28 border-radius-100 mt-xs-2 mb-xs-2' src={artist?.image}></img>
				<p className='fsize-xs-1 f-w-500'>{artist?.artistName}</p>
			</div>
			{!post.settings.isPrivate && !pathname.includes('/artist-app/') &&
					<p className='fsize-xs-2 grey-200 mb-xs-2 gold'>Contenuto gratuito</p>
			}
			<div className={`w-100 j-c-center align-items-center position-relative`}>
				<div className={`${(post.settings.isPrivate && hasUserSubscribed === false && !pathname.includes('/artist-app/')) ? 'blur-50' : ''} d-flex-row j-c-center align-items-center w-100 h-100`}>
					{post.media.length >= 0 ?
						<SwipeCarousel images={post.media} text={post.text} />
					:
						null
					}
				</div>
			</div>

			{(post.settings.isPrivate === false || (post.settings.isPrivate === true && hasUserSubscribed === true) || pathname.includes('/artist-app/')) ?
				<div className='w-100 pr-xs-4 pl-xs-4 mb-xs-4'>
					<div className='d-flex-row w-100 j-c-space-between align-items-center'>
						<div className='d-flex-row align-items-center gap-0_5em'>
							<div className='d-flex-row align-items-center gap-0_25em'>
								<img className='avatar-24' src={IconLike}/>
								<p className='fsize-xs-1'>{post.likes}</p>
							</div>
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
								<img className='avatar-24' src={IconComments} />
								<p className='fsize-xs-1'>{post.comments.length}</p>
							</div>
							<div className='d-flex-row align-items-center gap-0_25em'>
								<img className='avatar-24' src={IconShare}/>
								<p className='fsize-xs-1'>{post.shares}</p>
							</div>
						</div>
						<div className='d-flex-row'>
							{pathname.includes('/artist-app/') &&
								<img className='avatar-24' src={IconSettings}/>
							}
						</div>

					</div>
					<div className='w-100 d-flex-row'>
					<p className='pre-wrap mb-xs-1 grey-200 f-w-300 fsize-xs-1'>
						{post.caption.length > 95 ?
						<>
							{showCaption === true ?
								<>
									{post.caption}
									<span className='grey-400 f-w-500' onClick={() => setShowCaption(false)}> meno</span>
								</>
							:
								<>
									{post.caption.slice(0, 95)}...
									<span className='lime-400 f-w-500' onClick={() => setShowCaption(true)}> altro</span>
								</>
							}
						</>
						:
							post.caption
						}
					</p>
					</div>
					{post.link.url &&
						<div className='mb-xs-2 w-100 j-c-center align-items-start'>
							<Link to={post.link.url} target='blank' className='lime-400 f-w-300 fsize-xs-1'>{post.link.name ? post.link.name : 'Apri al link'}</Link>
						</div>
					}
					<div className='w-100 j-c-start d-flex-row'>
						{post.comments.length > 0 ?
							<p 
							className='lime-400 f-w-500 fsize-xs-1'
							onClick={(event) => {
								event.preventDefault()
								navigate(`/new-components-test/comments`, {
								state: { invokedModal: true},
							})}}>
								Visualizza tutti i {post.comments.length} commenti
							</p>
						:
							<p className='grey-500 f-w-400 fsize-xs-1'>Commenta per primo!</p>
						}

					</div>
					<div className='w-100 j-c-start d-flex-row mt-xs-1'>
						<p className='fsize-xs-0 f-w-100 grey-400'>
							{days > 31 ?
								<span>{formatDate()}</span>
							:
								<span>{days} giorni fa</span>
							}
						</p>
					</div>
				</div>
			:
				<div className='w-100 p-xs-4 pl-xs-4'>
					<div className='w-100 j-c-start d-flex-row'>
						<p className='fsize-xs-2 grey-200 gold'>Contenuto da sbloccare</p>
					</div>
					<div className='w-100 j-c-start d-flex-row mt-xs-1'>
						<p className='fsize-xs-0 f-w-100 grey-400'>
							{days > 31 ?
								<span>{formatDate()}</span>
							:
								<span>{days} giorni fa</span>
							}
						</p>
					</div>
				</div>
			}
		</div>
		</>
	)
}

export default Post