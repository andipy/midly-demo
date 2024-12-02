import { useNavigate } from 'react-router-dom'

import ContainerDefault from '../layout/container-default.layout'

import LogoSpotify from '../images/icons/icon-spotify-full-white.svg'
import Button from '../components/button.component'

const SpotifyLoginRoute = () => {

	const navigate = useNavigate()

	const handleSubmit = () => {
		navigate('/spotify-accept')
	}

	return (
		<>
		<ContainerDefault containerSpecificStyle={'pb-xs-appbar mt-xs-12'}>
			<div className='d-flex-column j-c-start align-items-center'>
				<img className='avatar-40' src={LogoSpotify} alt='MIDLY' />     
				<h4 className='fsize-xs-8 f-w-800'>Accedi a Spotify</h4> 
				<div className='d-flex-row j-c-center align-items-center border-grey-small bg-dark border-radius-2 mt-xs-4 w-100'>
					<div className='d-flex-row j-c-center align-items-center pt-xs-2 pl-xs-2 pr-xs-2 pb-xs-2'>
						<p className='fsize-xs-4 f-w-800'>Continua con Google</p>
					</div>
				</div>
				<div className='d-flex-row j-c-center align-items-center border-grey-small bg-dark border-radius-2 mt-xs-2 w-100'>
					<div className='d-flex-row j-c-center align-items-center pt-xs-2 pl-xs-2 pr-xs-2 pb-xs-2'>
						<p className='fsize-xs-4 f-w-800'>Continua con Facebook</p>
					</div>
				</div>
				<div className='d-flex-row j-c-center align-items-center border-grey-small bg-dark border-radius-2 mt-xs-2 w-100'>
					<div className='d-flex-row j-c-center align-items-center pt-xs-2 pl-xs-2 pr-xs-2 pb-xs-2'>
						<p className='fsize-xs-4 f-w-800'>Continua con Apple</p>
					</div>
				</div>
				<hr className='border-grey-xsmall w-100 mt-xs-12 mb-xs-12' />

				<form onSubmit={handleSubmit}>
						<div className='mt-xs-8 mb-xs-8'>
							<label className='fsize-xs-1 grey-100 letter-spacing-1 f-w-800 '>Indirizzo e-mail o nome utente</label>
							<input
							id={`input-mail`}
							className='bg-dark white letter-spacing-1 border-radius-02 mt-xs-2 border-grey-small'
							type='text'
							placeholder={'Indirizzo e-mail o nome utente'}
							required
							/>
							
						</div>
						<div className='mt-xs-8 mb-xs-8'>
							<label className='fsize-xs-1 grey-100 letter-spacing-1 f-w-800 '>Password</label>
							<input
							id={`input-password`}
							className='bg-dark white letter-spacing-1 border-radius-02 mt-xs-2 border-grey-small'
							type='text'
							placeholder={'Password'}
							required
							/>
							
						</div>
						<div className='container bottom-5'>
							<button className='bg-green-spotify black font-body fsize-xs-3 f-w-600 mt-xs-4 mb-xs-4 border-radius-2' type='submit'>
								<span className='fsize-xs-3 f-w-600 dark-900 letter-spacing-1'>Accedi</span>
							</button>
						</div>
				</form>

				<div className='d-flex-column w-100 align-items-center t-align-center j-c-center'>
					<h2 className='fsize-xs-3 f-w-300'>Hai dimenticato la password?</h2>
					<h2 className='fsize-xs-3 letter-spacing-1 f-w-300 grey-300 mt-xs-8'>Non hai un account?</h2>
					<h2 className='fsize-xs-3 f-w-300 mt-xs-4'>Iscriviti a Spotify</h2>
				</div>

				<div className='d-flex-column w-100 align-items-center t-align-center j-c-center mt-xs-8'>
					<p className='fsize-xs-1 grey-400'>
						Questo sito è protetto da reCAPTCHA e si applicano l&lt;googlePrivacyPolicyLink&gt;Informativa sulla privacy&lt;/googlePrivacyPolicyLink&gt; e i &lt;googleTermsLink&gt;Termini di servizio&lt;/googleTermsLink&gt; di Google.
					</p>
				</div>
			
				

				
			</div>
			

		</ContainerDefault>
		</>
	)
}

export default SpotifyLoginRoute