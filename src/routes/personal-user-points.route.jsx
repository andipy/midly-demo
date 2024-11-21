import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { CurrentFanContext } from '../contexts/currentFan.context'
import { ArtistsContext } from '../contexts/artists.context'
import { LeaderboardsContext } from '../contexts/leaderboards.context'

import { Link } from 'react-router-dom'

import NavbarBackOnly from '../components/navbar-back-only.component'
import ContainerDefault from '../layout/container-default.layout'
import TextTitle from '../components/text-title.component'
import Carousel from '../layout/carousel.layout'
import CardPreferredArtist from '../components/card-preferred-artist.component'
import FullPageCenter from '../layout/full-page-center.layout'
import Button from '../components/button.component'

import IconPoints from '../images/icons/icon-points.svg'
import IconPointsMultiple from '../images/icons/icon-points-2.svg'
import IconPlus from '../images/icons/icon-plus.svg'
import IconExit from '../images/icons/icon-exit.svg'
import IconOk from '../images/icons/icon-ok.svg'

import SearchInput from '../components/search-input.component'
import ValueSlider from '../components/value-slider.component'

const PersonalUserPointsRoute = () => {
    const navigate = useNavigate()

    const { currentFan, setCurrentFan } = useContext(CurrentFanContext)
    const { artists } = useContext(ArtistsContext)
    const { leaderboards, setLeaderboards } = useContext(LeaderboardsContext)

    const [idSelectedArtist, setIdSelectedArtist] = useState(undefined)
	const [selectedArtist, setSelectedArtist] = useState({})
	const [userInSelectedArtistLeaderboard, setUserInSelectedArtistLeaderboard] = useState({})
	const [searchQuery, setSearchQuery] = useState('')
	const [showComponent, setShowComponent] = useState(false)
    const [pointsToAssign, setPointsToAssign] = useState(0)

	const fieldLabelsCompleted = {
        'PROFILE_IMAGE_ADDED': 'Hai aggiunto una foto profilo',
        'SPOTIFY_ADDED': 'Hai aggiunto spotify',
		'FIVE_ARTISTS_FOLLOWED' : 'Hai seguito 5 artisti',
    }

    const selectArtist = (id) => {
		setIdSelectedArtist(id)
		setShowComponent(true)
  	}

	const handleFileChange = (event) => {
        const file = event.target.files[0]        
        if (file && file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file)
            if (currentFan.actions.some(action => action.type === 'PROFILE_IMAGE_ADDED')) {
                setCurrentFan((prev) => ({
                    ...prev,
                    image: imageUrl,
                }))
            } else {
                setCurrentFan((prev) => ({
                    ...prev,
                    image: imageUrl,
                    whiteLabelPoints: Number(prev.whiteLabelPoints) + 5,
                    actions: [...prev.actions, { type: 'PROFILE_IMAGE_ADDED', value: true, createdAt: new Date().toISOString().replace('T', ' ').split('.')[0] }]
                }))
            }
        } else {
            return
        }
    }

	const fetchSelectedArtistAndUserInLeaderboard = () => {
		if (idSelectedArtist) {
			const thisArtist = artists
				.find(artist => artist.id === idSelectedArtist)
			setSelectedArtist(thisArtist)

			const userInArtistLeaderboard = leaderboards
				.find(chart => chart.artistId === idSelectedArtist).leaderboard
				.sort((a, b) => b.points - a.points)
				.map((user, index) => 
					user.userId === currentFan.id ?
						{
							position: index + 1,
							points: user.points
						}
					: null
				)
				.filter(user => user !== null)[0]
			setUserInSelectedArtistLeaderboard(userInArtistLeaderboard)
		}
	}

	const selectSliderValue = (value) => {
		setPointsToAssign(value)
	}

	const closeAssignements = () => {
		setPointsToAssign(0)
		setIdSelectedArtist(undefined)
		setSelectedArtist({})
		setShowComponent(false)
  	}

	const updateLeaderboardsAndWhiteLabelPoints = () => {
		setLeaderboards(prevLeaderboards =>
			prevLeaderboards.map(leaderboard =>
				leaderboard.artistId === idSelectedArtist ?
					{
						...leaderboard,
						leaderboard: leaderboard.leaderboard.map(user =>
							user.userId === currentFan.id ?
								{
									...user,
									points: Number(user.points) + Number(pointsToAssign)
								}
								: user
						)
					}
				: leaderboard
			)
		)

		setCurrentFan(prev => ({
			...prev,
			whiteLabelPoints: prev.whiteLabelPoints - pointsToAssign,
		}))

		closeAssignements()
	}

	useEffect(() => {
		idSelectedArtist &&
			fetchSelectedArtistAndUserInLeaderboard()
	}, [idSelectedArtist])

    // this part of the code filters the artists favourited by the currentFan
	const filteredItems = artists
        .filter(artist => {
            const isPreferred = currentFan.followedArtists.some(preferred => preferred.artistId === artist.id)
            const matchesSearch = artist.artistName.toLowerCase().includes(searchQuery.toLowerCase())
            return isPreferred && (searchQuery === '' || matchesSearch)
        })
    const chunkArray = (array, chunkSize) => {
		const chunks = []
		for (let i = 0; i < array.length; i += chunkSize) {
				chunks.push(array.slice(i, i + chunkSize))
		}
		return chunks
    }
  	const chunkedItems = chunkArray(filteredItems, 6)

	return (
		<>
		<NavbarBackOnly onClick={() => navigate(-1)}/>
		<ContainerDefault containerSpecificStyle={'pb-xs-appbar'}>
			<TextTitle title={'I tuoi punti'} />
				
			{currentFan?.whiteLabelPoints > 0 ?
				<>
					<div id='points' className={`d-flex-row align-items-center j-c-space-between w-100 z-index-5 mt-xs-2`}>
						<h2 className='fsize-xs-5 f-w-600 '>Assegna i tuoi punti</h2>
						<div className='bg-dark-gradient border-radius-100 d-flex-row j-c-space-between align-items-center pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4'>
						<div className='d-flex-row align-items-center'>
							<div className='fsize-xs-3'>{currentFan?.whiteLabelPoints} </div>
							<img className='avatar-16 ml-xs-2' src={IconPoints} alt='points' />
						</div>
						</div>
					</div>
					<div id='search'>
						<SearchInput
							value={searchQuery} 
							onChange={(e) => {
								const newValue = e.target.value
								setSearchQuery(newValue)  
							}}   
						/>
					</div>
					{currentFan.followedArtists.length > 0 ? (
					<div id='assignment'>
						{chunkedItems.map((chunk, index) => (
							<div className='mb-xs-8' key={index}>
							<Carousel>
								{chunk.map(item => {
								return (
									<CardPreferredArtist 
										artist = {item}
										key = {item.id}
										onClick={() => selectArtist(item.id)}
									/>
								)
								})}
							</Carousel>
							</div>
						))}
					</div>
					):(
						<section id='' className='mt-xs-4 mb-xs-12 w-70 mx-xs-auto'>
                        	<h4 className='grey-400 fsize-xs-5 mb-xs-4 letter-spacing-2 f-w-500 t-align-center'>
                            	Non segui ancora nessun artista
                        	</h4>
                        
                    	</section>
					)}
					
				</>
			:
				<div id='no-points' className='bg-dark-gradient border-radius-08 pl-xs-4 pr-xs-4 pt-xs-4 pb-xs-4 d-flex-column align-items-center j-c-center mt-xs-6 mb-xs-6'>
				<img className='h-20 w-20' src={IconPointsMultiple}></img>
				<h1 className='t-align-center grey-400 fsize-xs-5 mt-xs-2 mt-xl-2  overflow-x'>Non hai ancora guadagnato punti extra!</h1>
				</div>
			}

			<div className='mt-xs-2 d-flex-column'>
				<h2 className='fsize-xs-5 f-w-600'>Come guadagnare punti</h2>
				<div className='d-flex-column mt-xs-4'>
					{
						currentFan.actions.find(action => action.type === 'PROFILE_IMAGE_ADDED')  ? (
							<></>
						) : (
							<label>
								<div className='d-flex-row j-c-space-between mb-xs-3 bg-dark-gradient border-radius-08 pl-xs-4 pr-xs-4 pt-xs-4 pb-xs-4'>
									<div className='d-flex-row align-items-center w-100'>
										<h6 className='fsize-xs-3 f-w-300 letter-spacing-1'>Aggiungi una foto profilo</h6>
									</div>
									<div className='d-flex-row align-items-center'>
									<div className='bg-dark-gradient border-radius-100 d-flex-row j-c-space-between align-items-center pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4'>
									<div className='d-flex-row align-items-center'>
										<div className='fsize-xs-3'>5</div>
										<img className='avatar-16 ml-xs-2' src={IconPoints} alt='points' />
										</div>
									</div>
									<img className='' src={IconPlus} alt='->'/>
									</div>
								</div>
								<input type='file' accept='image/*' style={{ display: 'none' }} onChange={handleFileChange} onClick={(e) => {e.target.value = null}} />
							</label>
							
						)
					}
					{
						currentFan.actions.find(action => action.type === 'SPOTIFY_ADDED') ? (
							<></>
						) : (
							<Link to='/profile'>
								<div className='d-flex-row j-c-space-between mb-xs-3 bg-dark-gradient border-radius-08 pl-xs-4 pr-xs-4 pt-xs-4 pb-xs-4'>
									<div className='d-flex-row align-items-center w-100'>
										<h6 className='fsize-xs-3 f-w-300 letter-spacing-1'>Aggiungi spotify</h6>
									</div>
									<div className='d-flex-row align-items-center'>
									<div className='bg-dark-gradient border-radius-100 d-flex-row j-c-space-between align-items-center pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4'>
									<div className='d-flex-row align-items-center'>
										<div className='fsize-xs-3'>10</div>
										<img className='avatar-16 ml-xs-2' src={IconPoints} alt='points' />
										</div>
									</div>
									<img className='' src={IconPlus} alt='->'/>
									</div>
								</div>
							</Link>
						)
					}
					{
						currentFan.actions.find(action => action.type === 'FIVE_ARTISTS_FOLLOWED') ? (
							<></>
						) : (
							<Link to='/search'>
								<div className='d-flex-row j-c-space-between mb-xs-3 bg-dark-gradient border-radius-08 pl-xs-4 pr-xs-4 pt-xs-4 pb-xs-4'>
									<div className='d-flex-row align-items-center w-100'>
										<h6 className='fsize-xs-3 f-w-300 letter-spacing-1'>Segui almeno 5 artisti ({currentFan.followedArtists.length}/5)</h6>
									</div>
									<div className='d-flex-row align-items-center'>
									<div className='bg-dark-gradient border-radius-100 d-flex-row j-c-space-between align-items-center pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4'>
									<div className='d-flex-row align-items-center'>
										<div className='fsize-xs-3'>10</div>
										<img className='avatar-16 ml-xs-2' src={IconPoints} alt='points' />
										</div>
									</div>
									<img className='' src={IconPlus} alt='->'/>
									</div>
								</div>
							</Link>
						)
					}
					{
						currentFan.actions
						.map((action, index) => (
							<div className='d-flex-row j-c-space-between mb-xs-3 bg-dark-gradient border-radius-08 pl-xs-4 pr-xs-4 pt-xs-4 pb-xs-4'>
								<div className='d-flex-row align-items-center w-100'>
									<h6 className='fsize-xs-3 f-w-300 letter-spacing-1'>{fieldLabelsCompleted[action.type]}</h6>
								</div>
								<div className='d-flex-row align-items-center'>
										<div className='d-flex-row align-items-center'>
											<img className='' src={IconOk} alt='points' />
										</div>
								</div>
							</div>
						))
					}
				</div>
			</div>
		</ContainerDefault>

		{showComponent &&
			<FullPageCenter className={'z-index-999 bg-black-transp70'}>
				<ContainerDefault containerSpecificStyle={'centered-popup position-absolute d-flex-column align-items-center gap-0_5em bg-dark-soft border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2'}>
					<div className='d-flex-row align-items-center j-c-end w-100'>
						<img className='avatar-32 bg-black-transp50 border-radius-100' src={IconExit} onClick={closeAssignements}></img>
					</div>

					<h2 className='fsize-xs-4 f-w-600'>La tua posizione nella classifica di:</h2>

					<div className='d-flex-column align-items-center j-c-center'>
						<div className='avatar-96 position-relative'>
							<img className='h-inherit object-fit-cover z-index-2 border-radius-100' src={selectedArtist?.image} />

							<div className='d-flex-column align-items-center position-absolute-y right-neg30'>
								<div className='d-flex-row align-items-center'>
									{currentFan.image ? 
										<img src={currentFan.image} className='object-fit-cover border-radius-100 avatar-40 border-dark-soft-4' />
									: 
										<div className='d-flex-row j-c-center align-items-center avatar-40 border-radius-100 bg-purple-400 border-dark-soft-4'>
											<h5 className='f-w-500 fsize-xs-6'>
												{currentFan.username.charAt(0).toUpperCase()}
											</h5>
										</div>
									}
									
									<span className='fsize-xs-1 white'>{userInSelectedArtistLeaderboard?.position}°</span>
								</div>

								<div className='d-flex-row align-items-center'>
									<img src={IconPoints} className='object-fit-cover border-radius-100 avatar-40 border-dark-soft-4' />
									<span className='fsize-xs-1 white'>{userInSelectedArtistLeaderboard?.points}</span>
								</div>
							</div>
						</div>

						<span className='fsize-xs-2 f-w-500 letter-spacing-1'>{selectedArtist?.artistName}</span>
					</div>
					 
					<h2 className='fsize-xs-4 f-w-600 mt-xs-4'>Sali di:</h2>    
					<div className='d-flex-row align-items-center gap-0_5em'>
						<h4 className='fsize-xs-6'>{pointsToAssign}</h4>
						<img className='avatar-20 ml-xs-2' src={IconPoints} alt='points' />
					</div>
					<section className='w-100'>
						<ValueSlider max={currentFan.whiteLabelPoints} onValueChange={selectSliderValue}/>
						<Button
							style='bg-acid-lime black border-radius-04 fsize-xs-3 f-w-500 mt-xs-4' label='Assegna'
							onClick={updateLeaderboardsAndWhiteLabelPoints}
						/>
					</section>      
				</ContainerDefault>
			</FullPageCenter>
		}
		</>
	)
}

export default PersonalUserPointsRoute