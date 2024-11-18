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

import SearchInput from '../components/search-input.component'
import ValueSlider from '../components/value-slider.component'

const PersonalUserPointsRoute = () => {
    const navigate = useNavigate()

    const { currentFan, setCurrentFan } = useContext(CurrentFanContext)
    const { artists } = useContext(ArtistsContext)
    const { leaderboards, setLeaderboards } = useContext(LeaderboardsContext)

    const [idSelectedArtist, setIdSelectedArtist] = useState(undefined)
	const [selectedArtist, setSelectedArtist] = useState({})
	const [searchQuery, setSearchQuery] = useState('')
	const [showComponent, setShowComponent] = useState(false)
    const [pointsToAssign, setPointsToAssign] = useState(0)

    const selectArtist = (id) => {
		setIdSelectedArtist(id)
		setShowComponent(true)
  	}
	const fetchSelectedArtist = () => {
		if (idSelectedArtist) {
			const thisArtist = artists?.find(artist => artist.id === idSelectedArtist)
			setSelectedArtist(thisArtist)
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

	const updateLeaderboards = () => {
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
			pointTank: prev.pointTank - pointsToAssign,
		}))

		closeAssignements()
	}

	useEffect(() => {
		idSelectedArtist &&
		fetchSelectedArtist()
	}, [idSelectedArtist])

    // const assign = () => {
		// 

		// const updatedLeaderboards = leaderboards.map((leaderboard) => {
		// 	if (leaderboard?.artistId === idSelectedArtist) {
		// 	let updatedLeaderboard = leaderboard.leaderboard.map((user) => {
		// 		if (user.userId === currentFan.id) {
		// 		const updatedPoints = Number(user.points) + Number(valueAssigned)
		// 		return { ...user, points: updatedPoints }
		// 		}
		// 		return user
		// 	})
		// 	updatedLeaderboard.sort((a, b) => b.points - a.points)
		
		// 	return { ...leaderboard, leaderboard: updatedLeaderboard }
		// 	}
		// })
		
		// setLeaderboards(updatedLeaderboards)

		// closeAssignements()
    // }

    // this part of the code filters the artists favourited by the currentFan
	const filteredItems = artists
        .filter(artist => {
            const isPreferred = currentFan.leaderboardsFollowed.some(preferred => preferred.artistId === artist.id)
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
			<TextTitle title={'I tuoi punti'}></TextTitle>
				
				{currentFan?.pointTank > 0 ?
				<>
				<div id='points' className={`d-flex-row align-items-center j-c-space-between w-100 z-index-5 mt-xs-2`}>
					<h2 className='fsize-xs-5 f-w-600 '>Assegna i tuoi punti</h2>
					<div className='bg-dark-gradient border-radius-100 d-flex-row j-c-space-between align-items-center pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4'>
					<div className='d-flex-row align-items-center'>
						<div className='fsize-xs-3'>{currentFan?.pointTank} </div>
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
				</>
				:
				<div id='no-points' className='bg-dark-gradient border-radius-08 pl-xs-4 pr-xs-4 pt-xs-4 pb-xs-4 d-flex-column align-items-center j-c-center mt-xs-6 mb-xs-6'>
				<img className='h-20 w-20' src={IconPointsMultiple}></img>
				<h1 className='t-align-center grey-400 fsize-xs-5 mt-xs-2 mt-xl-2  overflow-x'>Non hai ancora guadagnato punti extra!</h1>
				</div>
				}
				<div id='faq' className='mt-xs-2 d-flex-column'>
				<h2 className='fsize-xs-5 f-w-600'>Come guadagnare punti</h2>
				<div className='d-flex-column mt-xs-4'>
					<Link to='/profile'>
					{/* SE HO GIA' UNA FOTO PROFILO SCOMPARE */}
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
					</Link>
					<Link to='/user-info'>
						<div className='d-flex-row j-c-space-between mb-xs-3 bg-dark-gradient border-radius-08 pl-xs-4 pr-xs-4 pt-xs-4 pb-xs-4'>
							<div className='d-flex-row align-items-center w-100'>
								<h6 className='fsize-xs-3 f-w-300 letter-spacing-1'>Aggiungi indirizzo</h6>
							</div>
							<div className='d-flex-row align-items-center'>
							<div className='bg-dark-gradient border-radius-100 d-flex-row j-c-space-between align-items-center pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4'>
							<div className='d-flex-row align-items-center'>
								<div className='fsize-xs-3'>3</div>
								<img className='avatar-16 ml-xs-2' src={IconPoints} alt='points' />
								</div>
							</div>
							<img className='' src={IconPlus} alt='->'/>
							</div>
						</div>
					</Link>
					<Link to='/search'>
						<div className='d-flex-row j-c-space-between mb-xs-3 bg-dark-gradient border-radius-08 pl-xs-4 pr-xs-4 pt-xs-4 pb-xs-4'>
							<div className='d-flex-row align-items-center w-100'>
								<h6 className='fsize-xs-3 f-w-300 letter-spacing-1'>Segui almeno 10 artisti</h6>
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
				</div>
				</div>
		</ContainerDefault>

		{showComponent &&
		<FullPageCenter className={'z-index-max bg-black-transp70'}>
			<ContainerDefault containerSpecificStyle={'centered-popup position-absolute d-flex-column align-items-center gap-0_5em bg-dark-soft border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2'}>
			<div className='d-flex-row align-items-center j-c-space-between w-100'>
				<div className='avatar-32'></div>
				<img className='avatar-32 bg-black-transp50 border-radius-100' src={IconExit} onClick={closeAssignements}></img>
			</div>
			<h2 className='fsize-xs-4 f-w-600'>La tua posizione nella classifica di:</h2>
			<div className='d-flex-row j-c-center'>
				<div className='d-flex-column align-items-center'>
				<div className='avatar-96 position-relative'>
					<img className='h-inherit object-fit-cover z-index-2 border-radius-100' src={selectedArtist?.image} />
					<div className='podium-profile-indicator p-xs-16  black f-w-600 d-flex-row align-items-center j-c-center position-absolute border-radius-100 top-0 right-10 overflow-all-hidden'>
					<img src={currentFan.image} className='object-fit-cover border-radius-100 avatar-36' />
					</div>
					<span className='position-absolute fsize-xs-1 white right-neg30 top-5'>{'N'}°</span>
					<div className='podium-point-indicator p-xs-16  black f-w-600 d-flex-row align-items-center j-c-center position-absolute border-radius-100 top-12 right-0 overflow-all-hidden'>
					<img src={IconPoints} className='object-fit-cover avatar-36' />
					</div>
					<span className='position-absolute fsize-xs-1 white right-neg30 top-25'>{'N'}</span>
				</div>
				</div>
			</div> 
			<h5 className='fsize-xs-2 f-w-500 letter-spacing-1'>{selectedArtist?.artistName}</h5>  
			<h2 className='fsize-xs-4 f-w-600 mt-xs-4'>Sali di:</h2>    
			<div className='d-flex-row align-items-center '>
				<h4 className='fsize-xs-6'>{pointsToAssign}</h4>
				<img className='avatar-20 ml-xs-2' src={IconPoints} alt='points' />
			</div>
			<section className='w-100'>
				<ValueSlider max={currentFan.pointTank} onValueChange={selectSliderValue}/>
				<Button
					style='bg-acid-lime black border-radius-04 fsize-xs-3 f-w-500 mt-xs-4' label='Assegna'
					onClick={updateLeaderboards}
				/>
			</section>      
			</ContainerDefault>
		</FullPageCenter>
		}
		</>
	)
}

export default PersonalUserPointsRoute