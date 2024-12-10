import { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { CurrentArtistContext } from '../contexts/currentArtist.context'

import Navbar from '../components/navbar.component.artist'
import ContainerDefault from '../layout/container-default.layout'
import Appbar from '../components/appbar.component.artist'
import Button from '../components/button.component'

import IconArrowRight from '../images/icons/icon-arrowright.svg'
import IconTerms from '../images/icons/icon-terms.svg'
import IconCookies from '../images/icons/icon-cookie.svg'

const ProfileArtistRoute = () => {

	const navigate = useNavigate()

	const {currentArtist } = useContext(CurrentArtistContext)

	const formatNumber = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'").replace('.', ',')
    }

	return (
		<>
			<Navbar />

			<ContainerDefault containerSpecificStyle='pt-xs-topbar pb-xs-appbar'>
				<h1>Profilo</h1>
				<div className='mt-xs-2 d-flex-column align-items-start mb-xs-12'>
					<div className='d-flex-row align-items-center w-100'>
							{currentArtist?.image ? 
							<img
								src={currentArtist?.image}
								className='avatar-96 border-radius-100'
							/>
							: 
							<></>
											
							}
							<div className='d-flex-column j-c-start ml-xs-4 position-relative '>
							<div className='d-flex-row align-items-center j-c-start'>
									<h5 className='fsize-xs-5 f-w-500 letter-spacing-1'>{currentArtist?.artistName}</h5>
							</div>
							<span className='fsize-xs-1 f-w-300 grey-200 letter-spacing-1 no-shrink grow-1 w-100'>{currentArtist?.email}</span>
							</div>
					</div>
				</div>
				<div className='d-flex-column j-c-center align-items-start bg-dark-gradient border-radius-08 w-100 pt-xs-4 pb-xs-4 pr-xs-4 pl-xs-4 mb-xs-12'>
					{currentArtist?.beneficiary === '' && currentArtist?.iban === '' ?
						<>
							<h1 className='fsize-xs-5 f-w-600 mb-xs-2'>Ricevi gli incassi</h1>
							<p className='fsize-xs-2 f-w-300 mb-xs-8'>Compila i dati per ricevere i tuoi incassi</p>
							<Button
								style={`bg-acid-lime dark-900 fsize-xs-3 f-w-600 letter-spacing-1`} label='Compila i dati'
								onClick={() => navigate('/artist-app/fanclub/payment-info')}
							/>
						</>
					: currentArtist?.beneficiary === '' || currentArtist?.iban ==='' ?
						<>
							<h1 className='fsize-xs-5 f-w-600 mb-xs-2'>Ricevi gli incassi</h1>
							<p className='fsize-xs-2 f-w-300 mb-xs-8'>Riceverai i tuoi incassi ai seguenti dati:</p>
							<div className='mb-xs-2'>
								<label className='fsize-xs-1 grey-300 letter-spacing-3'>{'NOME'}</label> 
								{currentArtist?.beneficiary !== '' ?
									<h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{currentArtist?.beneficiary}</h6>
								:
									<div className='bg-red-400-transp10 red-500 d-flex-row j-c-center align-items-center border-radius-02 fsize-xs-2'>Nome mancante</div>
								}
							</div>
							<div className='mt-xs-2 mb-xs-8'>
								<label className='fsize-xs-1 grey-300 letter-spacing-3'>{'IBAN'}</label> 
								{currentArtist?.iban !== '' ?
									<h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{currentArtist?.iban}</h6>
								:
									<div className='bg-red-400-transp10 red-500 d-flex-row j-c-center align-items-center fsize-xs-2'>IBAN mancante</div>
								}          
							</div>
							<Button
								style={`bg-dark-gradient border-lime-1  lime-400 fsize-xs-3 f-w-600 letter-spacing-1`} label='Compila i dati mancanti'
								onClick={() => navigate('/artist-app/fanclub/payment-info')}
							/>
						</>
					:
						<>
							<h1 className='fsize-xs-5 f-w-600 mb-xs-2'>Ricevi gli incassi</h1>
							<p className='fsize-xs-2 f-w-300 mb-xs-8'>Riceverai i tuoi incassi ai seguenti dati:</p>
							<div className='mb-xs-2'>
								<label className='fsize-xs-1 grey-300 letter-spacing-3'>{'NOME'}</label> 
								<h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{currentArtist?.beneficiary}</h6>
							</div>
							<div className='mt-xs-2 mb-xs-8'>
								<label className='fsize-xs-1 grey-300 letter-spacing-3'>{'IBAN'}</label> 
								<h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{currentArtist?.iban}</h6>
							</div>

							<Button
								style={`bg-dark-gradient border-lime-1  lime-400 fsize-xs-3 f-w-600 letter-spacing-1`} label='Modifica i dati'
								onClick={() => navigate('/artist-app/fanclub/payment-info')}
							/>
						</>
					}
				</div>

				<div className='d-flex-column j-c-center align-items-start bg-dark-gradient border-radius-08 w-100 pt-xs-4 pb-xs-4 pr-xs-4 pl-xs-4'>
				<>
					<h4 className='fsize-xs-8 letter-spacing-2 f-w-500 lime-400 mb-xs-2'>€{formatNumber(currentArtist?.lastMonthRevenue)}</h4>
					<p className='fsize-xs-2 f-w-300 mb-xs-8'>Visualizza il rendimento del tuo fanclub</p>
					<Button
						style={`bg-acid-lime dark-900 fsize-xs-3 f-w-600 letter-spacing-1`} label='Riscuoti'
						onClick={() => navigate('/artist-app/earnings-dashboard')}
					/>
				</>
				</div>

				<div className='mt-xs-12'>
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
				</div>

				<div className='mt-xs-8 mb-xs-4'>
					<p className='fsize-xs-3 f-w-500 blue-400'>Log out</p>
				</div>
			</ContainerDefault>

			<Appbar />

		</>
	)
}

export default ProfileArtistRoute