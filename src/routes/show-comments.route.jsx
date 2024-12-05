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

const ShowCommentsRoute = () => {

	const navigate = useNavigate()
	const { state, pathname } = useLocation()

	const { artists } = useContext(ArtistsContext)
	const { fans } = useContext(FansContext)
	const { currentFan } = useContext(CurrentFanContext)
	const {leaderboards, setLeaderboards} = useContext(LeaderboardsContext)
    const closeFanModal = () => {
		navigate(-1, { state : { invokedModal: false}})
	}
	
	return (
		<FullScreenModalLayout>
			<NavbarBackOnly onClick={() => closeFanModal()}/>
			<ContainerDefault containerSpecificStyle={''}>
                <div className='d-flex-column w-100 j-c-center align-items-center'>
                    <h4>Commenti</h4>
                </div>
			
			</ContainerDefault>
		</FullScreenModalLayout> 
	)
}

export default ShowCommentsRoute