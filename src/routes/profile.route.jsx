import {useContext} from 'react'

import { CurrentFanContext } from '../contexts/currentFan.context'

import NavbarDefault from '../components/navbar-default.component'
import ContainerDefault from '../layout/container-default.layout'
import TextTitle from '../components/text-title.component'
import Appbar from '../components/appbar.component'

import SpotifyLogo from "../images/icons/icon-spotify-full-green.svg"
import IconArrowRight from "../images/icons/icon-arrowright.svg"
import GoldBagde from "../images/illustrations/GOLD.png"
import SettingsLogo from "../images/icons/icon-settings-white.svg"
import InfoLogo from "../images/icons/icon-info-white.svg"
import IconTerms from '../images/icons/icon-terms.svg'
import IconCookies from '../images/icons/icon-cookie.svg'
import IconTrophyGold from '../images/icons/icon-trophy-gold.svg'
import { Link } from 'react-router-dom'

function ProfileRoute() {

    const { currentFan, setCurrentFan } = useContext(CurrentFanContext)

    return (
        <>
        <NavbarDefault />
        <ContainerDefault containerSpecificStyle={'pb-xs-appbar'}>
        <TextTitle title={'Profilo'} />
        <div>
            <div className='mt-xs-2 d-flex-column align-items-start mb-xs-12'>
                <div className='d-flex-row align-items-center w-100'>
                    {currentFan.image ? 
                        <img
                            src={currentFan.image}
                            className='avatar-96 border-radius-100'
                        />
                    : 
                        <div className='d-flex-row j-c-center align-items-center avatar-96 border-radius-100 bg-purple-400'>
                            <h5 className='f-w-500 fsize-xs-6'>
                                {currentFan.username.charAt(0).toUpperCase()}
                            </h5>
                        </div>
                    }
                    <div className='d-flex-column j-c-start ml-xs-4 position-relative '>
                        <h5 className='fsize-xs-5 f-w-500 letter-spacing-1'>{currentFan.username}</h5>
                        <span className='fsize-xs-1 f-w-300 grey-200 letter-spacing-1 no-shrink grow-1 w-100'>Member since 2022-10-28</span>
                    </div>
                </div>
            </div>
        
            <h4 className='fsize-xs-5 mb-lg-1 letter-spacing-2 f-w-500'>Connetti i tuoi social</h4>
            <div className='mt-xs-4'>
                <div className='bg-dark-gradient-radial border-radius-1 d-flex-column align-items-start j-c-center pt-xs-8 pb-xs-8 pr-xs-8 pl-xs-8'>
                    <div className='d-flex-row gap-0_25em align-items-center mb-xs-4'>
                        <img className='social-logo' src={SpotifyLogo} alt='SPOTIFY'/>
                        <span className='fsize-xs-3'>Connetti Spotify per fare punti!</span>
                    </div>
                    <p className='f-w-400 fsize-xs-1 grey-200 line-height-140'>Midly traccia i brani che ascolti e li converte in punti nelle classifiche degli artisti che segui!</p>
                    <button className='bg-green-spotify dark-900 mt-xs-4 letter-spacing-1 f-w-500'>CONNETTI SPOTIFY</button>
                </div>
            </div>
            <section id='social-accounts' className='mt-xs-12'>
                <h4 className='fsize-xs-5 mb-lg-1 letter-spacing-2 f-w-500 mb-xs-2'>I tuoi riconoscimenti</h4>
                <div>
                    <div className='bg-dark-gradient border-radius-1 d-flex-row j-c-space-between align-items-center pt-xs-6 pb-xs-6 pl-xs-6 pr-xs-6'>
                        <div className='d-flex-row align-items-center j-c-start'>
                            <img className='w-35 no-shrink social-logo' src={IconTrophyGold} alt='Y' />
                            <span className='font-heading fsize-xs-4 f-w-500 letter-spacing-1 no-shrink'>I tuoi badge</span>
                        </div>
                        <img src={IconArrowRight} alt='->'/>
                    </div> 
                </div>
            </section>
        </div>

        <div>
            <div id='profile-settings' className="mt-xs-12 mt-lg-5"> 
                <h4 className='fsize-xs-5 mb-xs-4 mb-lg-2 letter-spacing-2 f-w-500'>Impostazioni</h4>
                <div className='d-flex-column'>
                    <Link to='/userinfo'>
                        <div className='d-flex-row j-c-space-between mb-xs-3'>
                            <div className='d-flex-row align-items-center w-100'>
                                <img className='mr-xs-2' src={SettingsLogo} alt='SETTINGS'></img>
                                <h6 className='fsize-xs-3 f-w-300 letter-spacing-1'>Informazioni personali</h6>
                            </div>
                            <img className='' src={IconArrowRight} alt='->'/>
                        </div>
                    </Link>
                    <Link to={'/faq'}>
                        <div className='d-flex-row j-c-space-between mb-xs-3'>
                            <div className='d-flex-row align-items-center w-100'>
                                <img className='mr-xs-2' src={InfoLogo} alt='SETTINGS'></img>
                                <h6 className='fsize-xs-3 f-w-300 letter-spacing-1'>FAQs</h6>
                            </div>
                            <img className='' src={IconArrowRight} alt='->'/>
                        </div>
                    </Link>
                    <Link to='/terms-and-conditions-fans'>
                        <div className='d-flex-row j-c-space-between mb-xs-3'>
                            <div className='d-flex-row align-items-center w-100'>
                                <img className='mr-xs-2' src={IconTerms} alt='SETTINGS' />
                                <h6 className='fsize-xs-3 f-w-300 letter-spacing-1'>Termini e condizioni fan</h6>
                            </div>
                            <img className='' src={IconArrowRight} alt='->'/>
                        </div>
                    </Link>
                    <Link to='/privacy-policy-fans'>
                        <div className='d-flex-row j-c-space-between mb-xs-3'>
                            <div className='d-flex-row align-items-center w-100'>
                                <img className='mr-xs-2' src={IconTerms} alt='O' />
                                <h6 className='fsize-xs-3 f-w-300 letter-spacing-1'>Privacy e policy fan</h6>
                            </div>
                            <img className='' src={IconArrowRight} alt='->'/>
                        </div>
                    </Link>
                    <Link to='/cookie-policy-fans'>
                        <div className='d-flex-row j-c-space-between mb-xs-3'>
                            <div className='d-flex-row align-items-center w-100'>
                                <img className='mr-xs-2' src={IconCookies} alt='O' />
                                <h6 className='fsize-xs-3 f-w-300 letter-spacing-1'>Cookie policy</h6>
                            </div>
                            <img className='' src={IconArrowRight} alt='->'/>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='mt-xs-10 mb-xs-10 mt-lg--4 mb-lg-4'>
                <h6 className='fsize-xs-3 f-w-500 blue-300 letter-spacing-1'>Esegui il log out</h6>
            </div>
            
            <div className='t-align-center mt-xs-5 mb-xs-2 mt-lg-2 mb-lg-1'>
                <span className='grey-300 fsize-xs-1'>© Midly Srl 2024</span>
            </div>
        </div>
        </ContainerDefault>
        <Appbar />
        </>
    )
}

export default ProfileRoute