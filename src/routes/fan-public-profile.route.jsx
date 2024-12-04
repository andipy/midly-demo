import { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { ArtistsContext } from '../contexts/artists.context'
import { FansContext } from '../contexts/fans.context'
import { CurrentFanContext } from '../contexts/currentFan.context'
import { LeaderboardsContext } from '../contexts/leaderboards.context'

import FullScreenModalLayout from '../layout/full-screen-modal.layout'
import NavbarBackOnly from '../components/navbar-back-only.component'
import ContainerDefault from '../layout/container-default.layout'
import Carousel from '../layout/carousel.layout'
import CardPreferredArtist from '../components/card-preferred-artist.component'
import WidgetPositionFan from '../components/widget-position-fan.component'
import CardArtistHighlight from '../components/card-search-artist-highlight.component'
import AffinityFanLevel from '../components/affinity-fan-level.component'

const FanPublicProfileRoute = () => {

	const navigate = useNavigate()
	const { state, pathname } = useLocation()

	const { artists } = useContext(ArtistsContext)
	const { fans } = useContext(FansContext)
	const { currentFan } = useContext(CurrentFanContext)
	const {leaderboards, setLeaderboards} = useContext(LeaderboardsContext)

	const [selectedFan, setSelectedFan ] = useState()
	const [mostListenedArtists, setMostListenedArtists] = useState([])
	const [commonArtists, setCommonArtists] = useState([])
	const [leaderboardsFan, setLeaderboardsFan] = useState([])

	useEffect(() => {
		const foundFan = fans.find(fan => fan?.id === state.fan.userId)
		setSelectedFan(foundFan)

		const items = artists.filter(artist => 
			foundFan.mostListenedArtistsOnSpotify.some(mostListenedArtist => artist.id === mostListenedArtist.artistId))
		setMostListenedArtists(items)


		const currentFanFavouriteArtists = currentFan?.followedArtists || []
		const foundFanFavouriteArtists = foundFan?.followedArtists || []
		const common = currentFanFavouriteArtists.filter(artist =>
			foundFanFavouriteArtists.some(fanArtist => fanArtist.artistId === artist.artistId)
		)
		const commonUserArtists = artists.filter(artist => 
			common.some(mostListenedArtist => artist.id === mostListenedArtist.artistId))
		setCommonArtists(commonUserArtists)

	}, [state])

	useEffect(() => {
		const filteredLeaderboards = leaderboards.filter(leaderboard => {
			return selectedFan?.followedArtists.some(favArtist => favArtist.artistId === leaderboard.artistId)
		})
		setLeaderboardsFan(filteredLeaderboards)
	}, [selectedFan])

	const chunkArray = (array, chunkSize) => {
		const chunks = []
		for (let i = 0; i < array.length; i += chunkSize) {
			chunks.push(array.slice(i, i + chunkSize))
		}
		return chunks
	}
	
	const chunkedLeaderboardsFan = chunkArray(leaderboardsFan, 2)

	const closeFanModal = () => {
		navigate(-1, { state : { invokedModal: false}})
	}

	const [currentAffinity, setCurrentAffinity] = useState(0)
	useEffect(() => {
		setTimeout(() => {
			const animationDuration = 1500
			let start = null
			const targetValue = (selectedFan?.affinityWithCurrentUser / 100) * 100
		
			const easeOutQuart = (t) => 1 - (--t) * t * t * t
		
			const animate = (timestamp) => {
				if (!start) start = timestamp
		
				const elapsed = timestamp - start
				const t = Math.min(elapsed / animationDuration, 1)
		
				const easedProgress = easeOutQuart(t)
				setCurrentAffinity(easedProgress * targetValue)
		
				if (t < 1) {
					requestAnimationFrame(animate)
				}
			}
		
			requestAnimationFrame(animate)
		}, 800)
	}, [selectedFan])
	
	return (
		<FullScreenModalLayout>
			<NavbarBackOnly onClick={() => closeFanModal()}/>
			<ContainerDefault containerSpecificStyle={''}>
				<div className='d-flex-column w-100 j-c-center align-items-center'>
					<div className='d-flex-column j-c-center align-items-center'>
	{/*             <img className='avatar-120 border-radius-100' src={state.fan.image}></img>*/} 
						<p className='fsize-xs-5 f-w-600'>{state.fan.username}</p>
						<AffinityFanLevel value={selectedFan?.affinityWithCurrentUser} max={100} image={state.fan.image} />
						<div className='d-flex-row align-items-center bg-dark-gradient border-radius-1 pl-xs-4 pr-xs-4 gap-0_25em mt-xs-2'>
							<p className='lime-400 fsize-xs-2 f-w-500 no-shrink'>Affinità musicale:</p>
							<p className='lime-400 fsize-xs-2 f-w-500'>{Math.round(currentAffinity)}%</p>
						</div>
					</div>

					<div className='d-flex-column w-100 align-items-start mt-xs-12'>
						<h2 className='fsize-xs-4 f-w-600'>Artisti che amate entrambi:</h2>
							<Carousel>
								{commonArtists.map(artist => {                                            
									return (
										<CardPreferredArtist 
											artist = {artist}
											key = {artist.id}
											size={'small'}
											onClick={() => navigate(`/artist/${artist?.slug}/leaderboard`, { state :{ artist : artist} })}
										/>
									)
								})}
							</Carousel>

					</div>
					<div className='d-flex-column w-100 align-items-start mt-xs-12'>
						<h2 className='fsize-xs-4 f-w-600'>A novembre ha ascoltato di più:</h2>
							<div className='mt-xs-4 d-flex-column j-c-center align-items-center'>
								{mostListenedArtists.length > 0 ? (
											<CardArtistHighlight 
												artist={mostListenedArtists[0]} 
												key={mostListenedArtists[0]} 
												length={1}
												index={1}
											/>
										) : (
											''
								)}

							
								<div className='mt-xs-4 d-flex-row gap-1em'>
									{mostListenedArtists.length > 1 ? (
										mostListenedArtists.slice(1, 5).map((artist, index) => (
											<CardPreferredArtist 
												artist={artist}
												key={artist.id}
												size={'small'}
												index={index+1}
												onClick={() => navigate(`/artist/${artist?.slug}/leaderboard`, { state: { artist: artist } })}
											/>
										))
									) : (
										''
									)}
								</div>
								
							</div>
						
					</div>
					<div className='d-flex-column w-100 align-items-start mt-xs-12'>
						<h2 className='fsize-xs-4 f-w-600'>Nelle classifiche di:</h2>
						{chunkedLeaderboardsFan.map((chunk, chunkIndex) => (
						<div className='w-100' key={chunkIndex}>
							<Carousel>
								{chunk.map((artist, index) => (
									<WidgetPositionFan
										key={index}
										artistId={artist.artistId}
										leaderboard={artist.leaderboard}
										fanDetails={state.fan}
									/>
								))}
							</Carousel>
						</div>

						))}


					</div>

				</div>
				
			</ContainerDefault>
		</FullScreenModalLayout> 
	)
}

export default FanPublicProfileRoute