import { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { CurrentArtistContext } from '../contexts/currentArtist.context'

import Navbar from '../components/navbar.component.artist'
import Container from '../layout/container.layout'
import Appbar from '../components/appbar.component.artist'
import Button from '../components/button.component'
import WidgetBillingInfo from '../components/widget-billing-info.component.artist'

import IconArrowRight from '../images/icons/icon-arrowright.svg'
import IconTerms from '../images/icons/icon-terms.svg'
import IconCookies from '../images/icons/icon-cookie.svg'

const ProfileArtistRoute = () => {

	const navigate = useNavigate()

	const {currentArtist } = useContext(CurrentArtistContext)
	const formatNumber = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'").replace('.', ',')
    }

	const [prevMonth, setPrevMonth] = useState(undefined)
	const months = {
		1: 'Gennaio',
		2: 'Febbraio',
		3: 'Marzo',
		4: 'Aprile',
		5: 'Maggio',
		6: 'Giugno',
		7: 'Luglio',
		8: 'Agosto',
		9: 'Settembre',
		10: 'Ottobre',
		11: 'Novembre',
		12: 'Dicembre',
	}
	useEffect(() => {
		const today = new Date()
		const month = today.getMonth()
		setPrevMonth(month)
	}, [])

	return (
		<>
			<Navbar background='solid-black' />

			<Container style='pt-xs-topbar pb-xs-appbar'>
				<h1>Profilo</h1>
				<header className='mt-xs-2 d-flex-column align-items-start mb-xs-6'>
					<div className='d-flex-row align-items-center w-100'>
						{currentArtist?.image &&
							<img
								src={currentArtist?.image}
								className='avatar-96 border-radius-100'
							/>
						}
						<div className='d-flex-column j-c-start ml-xs-4 position-relative '>
						<div className='d-flex-row align-items-center j-c-start'>
							<h5 className='fsize-xs-5 f-w-500 letter-spacing-1'>{currentArtist?.artistName}</h5>
						</div>
						<span className='fsize-xs-1 f-w-300 grey-200 letter-spacing-1 no-shrink grow-1 w-100'>{currentArtist?.email}</span>
						</div>
					</div>
				</header>

				{/* {currentArtist?.beneficiary === '' && currentArtist?.iban === '' &&
					<WidgetBillingInfo currentArtist={currentArtist} />
				} */}

				<div className='d-flex-column j-c-center align-items-start bg-dark-gradient border-radius-08 w-100 pt-xs-4 pb-xs-4 pr-xs-6 pl-xs-6 gap-1em mb-xs-6'>
					<h4 className='fsize-xs-3 f-w-500 grey-100 mt-xs-4 line-height-140'>Hai già inviato fattura per riscuotere il tuo guadagno di <span className='lime-400'>{months[prevMonth]}</span>?</h4>
					<span className='fsize-xs-8 letter-spacing-2 f-w-500 lime-400'>€{formatNumber(currentArtist?.lastMonthRevenue)}</span>
					<Button
						style={`bg-dark border-lime lime-400 fsize-xs-3 f-w-500 letter-spacing-1`} label='Invia fattura a MIDLY'
						onClick={() => navigate('/artist-app/fanclub-dashboard')}
					/>
				</div>

				<section>
					<h4 className='fsize-xs-5 mb-xs-4 mb-lg-2 letter-spacing-2 f-w-500'>Impostazioni</h4>
					<Link to='/artist-app/terms-and-conditions-artists'>
						<div className='d-flex-row j-c-space-between mb-xs-3'>
						<div className='d-flex-row align-items-center w-100'>
							<img className='mr-xs-2' src={IconTerms} alt='SETTINGS' />
							<h6 className='fsize-xs-3 f-w-300 letter-spacing-1'>Termini e condizioni</h6>
						</div>
						<img className='' src={IconArrowRight} alt='->'/>
						</div>
					</Link>
					<Link to='/artist-app/privacy-policy-artists'>
						<div className='d-flex-row j-c-space-between mb-xs-3'>
						<div className='d-flex-row align-items-center w-100'>
							<img className='mr-xs-2' src={IconTerms} alt='O' />
							<h6 className='fsize-xs-3 f-w-300 letter-spacing-1'>Privacy e policy</h6>
						</div>
						<img className='' src={IconArrowRight} alt='->'/>
						</div>
					</Link>
					<Link to='/artist-app/cookie-policy-artists'>
						<div className='d-flex-row j-c-space-between mb-xs-3'>
						<div className='d-flex-row align-items-center w-100'>
							<img className='mr-xs-2' src={IconCookies} alt='O' />
							<h6 className='fsize-xs-3 f-w-300 letter-spacing-1'>Cookie policy</h6>
						</div>
						<img className='' src={IconArrowRight} alt='->'/>
						</div>
					</Link>
				</section>

				<div className='mt-xs-8 mb-xs-4'>
					<p className='fsize-xs-3 f-w-500 blue-400'>Log out</p>
				</div>
			</Container>

			<Appbar />
		</>
	)
}

export default ProfileArtistRoute