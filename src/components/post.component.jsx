import { useState, useEffect, useContext } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'

import { ArtistsContext } from '../contexts/artists.context'

import Button from '../components/button.component'

import SwipeCarousel from '../layout/swipe-carousel.layout'

import IconSettings from '../images/icons/icon-settings-white.svg'
// import IconLike from '../images/icons/icon-like-white-empty.svg'
import IconThunder from '../images/icons/icon-thunder.svg'
import IconComments from '../images/icons/icon-comment-white.svg'
import IconShare from '../images/icons/icon-share-white.svg'
import IconLink from '../images/icons/icon-link.svg'

const Post = ({ artistId, post, openComments, hasUserSubscribed, handleSubscription, focusPostSettings }) => {

	const { artists } = useContext(ArtistsContext)

	const [artist, setArtist] = useState()
	useEffect(() => {
		const foundArtist = artists?.find((artist) => artist.id === artistId)
		setArtist(foundArtist)
	}, artistId)

	const { pathname } = useLocation()
	const [showCaption, setShowCaption] = useState(false)

	const [days, setDays] = useState(0)
	const [hours, setHours] = useState(0)
	const [minutes, setMinutes] = useState(0)
	const [seconds, setSeconds] = useState(0)
	
	useEffect(() => {
		const specificDate = new Date(post.createdAt)
		const currentDate = new Date()
		const timeDifference = currentDate - specificDate
		const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
	
		if (daysPassed === 0) {
			const hoursPassed = Math.floor(timeDifference / (1000 * 60 * 60))
			const minutesPassed = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
			const secondsPassed = Math.floor((timeDifference % (1000 * 60)) / 1000)
	
			setDays(0)
			setHours(hoursPassed)
			setMinutes(minutesPassed)
			setSeconds(secondsPassed)
		} else {
			setDays(daysPassed)
		}
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
		<div className='bg-dark-soft position-relative overflow-hidden d-flex-column j-c-center border-radius-04 mb-xs-4'>
			<div className='d-flex-row w-100 j-c-space-between align-items-center pl-xs-2 mt-xs-2 mb-xs-2'>
				<div className='d-flex-row j-c-start align-items-center gap-0_25em'>
					{artist &&
						<>
							<img className='avatar-28 border-radius-100 ' src={artist?.image} />
							<p className='fsize-xs-1 f-w-500'>{artist?.artistName}</p>
						</>
					}
				</div>
				
				<div className='d-flex-row j-c-end align-items-center pr-xs-2'>
					{ post.settings.isPinned &&
						<img className='avatar-28 border-radius-100' src={IconThunder}/>	
					}
				</div>
			</div>

			{!post.settings.isPrivate && !pathname.includes('/artist-app/') &&
				<p className='fsize-xs-2 grey-200 mb-xs-2 gold'>Contenuto gratuito</p>
			}

			<div className={`w-100  j-c-center align-items-center position-relative`}>
				<div className={`${(post.settings.isPrivate && hasUserSubscribed === false && !pathname.includes('/artist-app/')) ? 'blur-50' : ''} d-flex-row j-c-center align-items-center w-100 h-100`}>
					{post.media.length >= 0 ?
						<SwipeCarousel images={post.media} text={post.text} />
					:
						null
					}
				</div>
			</div>

			{(!post.settings.isPrivate || (post.settings.isPrivate && hasUserSubscribed) || pathname.includes('/artist-app/')) ?
				<div className='w-100 pr-xs-4 pl-xs-4 mb-xs-4'>
					<div className='d-flex-row w-100 j-c-space-between align-items-center mt-xs-2'>
						<div className='d-flex-row align-items-center gap-1em'>
							<div className='d-flex-row align-items-center gap-0_25em'>
								<img className='avatar-28 bg-dark-soft-2 border-radius-04' src={IconThunder}/>
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
								<img className='avatar-28 bg-dark-soft-2 border-radius-04' src={IconComments} />
								<p className='fsize-xs-1'>{post.comments.length}</p>
							</div>

							<div className='d-flex-row align-items-center gap-0_25em'>
								<img className='avatar-28 bg-dark-soft-2 border-radius-04' src={IconShare}/>
								<p className='fsize-xs-1'>{post.shares}</p>
							</div>
						</div>

						{pathname.includes('/artist-app/') &&
							<div className='d-flex-row' onClick={() => focusPostSettings()}>
								<img className='avatar-28 bg-dark-soft-2 border-radius-04' src={IconSettings}/>
							</div>
						}
					</div>

					<div className='w-100 d-flex-row'>
						<p className='pre-wrap mb-xs-2 grey-100 f-w-400 fsize-xs-2'>
							{post.caption.length > 95 ?
							<>
								{showCaption ?
									<>
										{post.caption}
										<span className='lime-400 f-w-500' onClick={() => setShowCaption(false)}> meno</span>
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
						<Link className='d-flex-row align-items-center grey-100 f-w-400 fsize-xs-1 text-underline mb-xs-3' to={post.link.url} target='blank'>
							<img className='avatar-20' src={IconLink} />
							<span>{post.link.name ? post.link.name : 'Apri il link'}</span>
						</Link>
					}

					{post.comments.length > 0 ?
						<p className='lime-400 f-w-500 fsize-xs-1' onClick={() => openComments()}>Visualizza {post.comments.length} commenti</p>
					: !pathname.includes('/artist-app/') &&
						<p className='f-w-400 grey-200 fsize-xs-2' onClick={() => openComments()}>Commenta per primo</p>
					}

					<p className='fsize-xs-1 f-w-100 grey-300 mt-xs-2'>
						{days > 31 ?
							<span>{formatDate()}</span>
						: days > 0 ?
							<span>{days} giorni fa</span>
						: days <= 0 ?
						<>
							{hours <= 0 ?
							<>
									{minutes <= 0 ?
										<span>{seconds} secondi fa</span>
									: 
									<>
										<span>{minutes} minuti fa</span>
									</>
									}
							</>
								: 
								<>
									<span>{hours} ore fa</span>
								</>
							}
						</>
						: 
						<>
							<span>{days} giorni fa</span>
						</>
						}
						
					</p>
				</div>
			:
				<div className='w-100 pb-xs-4 pl-xs-4'>
					<p className='fsize-xs-3 f-w-600 gold'>Contenuto da sbloccare</p>
					<p className='fsize-xs-0 f-w-100 grey-400'>
						{days > 31 ?
							<span>{formatDate()}</span>
						:
							<span>{days} giorni fa</span>
						}
					</p>
				</div>
			}

			{!hasUserSubscribed && !pathname.includes('/artist-app/') && post.settings.isPrivate &&
                <div className='position-absolute-x-y w-80 bg-black-transp50 pt-xs-4 pb-xs-6 pl-xs-6 pr-xs-6 border-radius-06'>
                    <p className='t-align-center mb-xs-4'>Vuoi accedere ai contenuti esclusivi dell'artista?</p>
                    <Button style='bg-acid-lime black f-w-500 fsize-xs-2' label='Abbonati' onClick={handleSubscription} />
                </div>
            }
		</div>
		</>
	)
}

export default Post