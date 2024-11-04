import {useContext} from 'react'

import { CurrentFanContext } from '../contexts/currentFan.context'

import ContainerDefault from '../layout/container-default.layout'
import Appbar from '../components/appbar.component'
import NavbarProfileSettings from '../components/navbar-profile-settings-component'
import IconArrowRight from '../images/icons/icon-arrowright.svg'
import { Link } from 'react-router-dom'

const UserInfoRoute = () => {

    const { currentFan, setCurrentFan } = useContext(CurrentFanContext)

    return (
        <>
        <NavbarProfileSettings title={'Informazioni personali'} />
        <ContainerDefault containerSpecificStyle={'pb-xs-appbar'}>
            <div>
                <div id='about-you' className='mt-xs-8'>
                    <h4 className='fsize-xs-5 mb-xs-4 letter-spacing-2 f-w-500'>About you</h4>
                    <Link to='/user-info-field' state={{ type: 'USERNAME' }}>
                    <div id='fan-username' className='mt-xs-8 mb-xs-8'>
                        <label className='fsize-xs-1 grey-300 letter-spacing-3' for='input-name'>
                            USERNAME
                        </label>
                        <a className='d-flex-row j-c-space-between mb-xs-3 w-100' href=''>
                            {currentFan.username ? 
                                <h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{currentFan.username}</h6>
                            : 
                                <h6 className='fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2'>Aggiungi il tuo username!</h6>
                            }
                            <img className='' src={IconArrowRight} alt='->'/>
                        </a>
                    </div>
                    </Link>
                    <Link to='/user-info-field' state={{ type: 'INSTAGRAM_USERNAME' }}>
                    <div id='fan-instagram' className='mt-xs-8'>
                        <label className='fsize-xs-1 grey-300 letter-spacing-3' for='input-name'>
                            INSTAGRAM
                        </label>
                        <a className='d-flex-row j-c-space-between mb-xs-3 w-100' href=''>
                            {currentFan.instagram ? 
                                <h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{currentFan.instagram}</h6>
                            : 
                                <h6 className='fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2'>Aggiungi il tuo instagram!</h6>
                            }
                            <img className='' src={IconArrowRight} alt='->'/>
                        </a>
                    </div>
                    </Link>
                    <Link to='/user-info-field' state={{ type: 'BIRTHDATE' }}>
                        <div id='fan-birthdate' className='mt-xs-8'>
                            <label className='fsize-xs-1 grey-300 letter-spacing-3' for='input-name'>
                                DATA DI NASCITA
                            </label>
                            <a className='d-flex-row j-c-space-between mb-xs-3 w-100' href=''>
                                {currentFan.birthdate ? 
                                    <h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{currentFan.birthdate}</h6>
                                : 
                                    <h6 className='fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2'>Aggiungi la tua data di nascita!</h6>
                                }
                                <img className='' src={IconArrowRight} alt='->'/>
                            </a>
                        </div>
                    </Link>
                    <Link to='/user-info-field' state={{ type: 'GENRE' }}>
                        <div id='fan-gender' className='mt-xs-8'>
                            <label className='fsize-xs-1 grey-300 letter-spacing-3' for='input-name'>
                                GENERE
                            </label>
                            <a className='d-flex-row j-c-space-between mb-xs-3 w-100' href=''>
                                {currentFan.genre ? 
                                    <h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{currentFan.genre}</h6>
                                : 
                                    <h6 className='fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2'>Aggiungi il tuo genere!</h6>
                                }
                                <img className='' src={IconArrowRight} alt='->'/>
                            </a>
                        </div>
                    </Link>
                </div>
                <div id='contacts' className='mt-xs-24 mt-lg-1'>
                    <h4 className='fsize-xs-5 mb-xs-4 letter-spacing-2 f-w-500'>Contatti</h4>
                    <Link to='/user-info-field' state={{ type: 'EMAIL' }}>
                        <div id='fan-email' className='mt-xs-8'>
                            <label className='fsize-xs-1 grey-300 letter-spacing-3' for='input-name'>
                                EMAIL
                            </label>
                            <a className='d-flex-row j-c-space-between mb-xs-3 w-100' href=''>
                                {currentFan.email ? 
                                    <h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{currentFan.email}</h6>
                                : 
                                    <h6 className='fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2'>Aggiungi la tua mail!</h6>
                                }
                                <img className='' src={IconArrowRight} alt='->'/>
                            </a>
                        </div>
                    </Link>
                    <Link to='/user-info-field' state={{ type: 'CELLPHONE' }}>
                        <div id='fan-phone' className='mt-xs-8'>
                            <label className='fsize-xs-1 grey-300 letter-spacing-3' for='input-name'>
                                CELLULARE
                            </label>
                            <a className='d-flex-row j-c-space-between mb-xs-3 w-100' href=''>
                                {currentFan.cellphone ? 
                                    <h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{currentFan.cellphone}</h6>
                                : 
                                    <h6 className='fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2'>Aggiungi il tuo cellulare!</h6>
                                }
                                <img className='' src={IconArrowRight} alt='->'/>
                            </a>
                        </div>
                    </Link>
                    <Link to='/user-info-field' state={{ type: 'ADDRESS' }}>
                    <div id='fan-address' className='mt-xs-8'>
                        <label className='fsize-xs-1 grey-300 letter-spacing-3' for='input-name'>
                            INDIRIZZO
                        </label>
                        <a className='d-flex-row j-c-space-between mb-xs-3 w-100' href=''>
                            {currentFan.adress.strada ? 
                                <h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{currentFan.adress.strada}</h6>
                            : 
                                <h6 className='fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2'>Aggiungi il tuo indirizzo!</h6>
                            }
                            <img className='' src={IconArrowRight} alt='->'/>
                        </a>
                    </div>
                    </Link>   
                </div>
                <div id='deactivate-account' className='mt-xs-12 mb-xs-8'>
                    <h6 className='fsize-xs-3 f-w-500 red-300 letter-spacing-1'>Disattiva il mio account</h6>
                </div>
            </div>

        </ContainerDefault>
        <Appbar />
        </>
    )
}

export default UserInfoRoute