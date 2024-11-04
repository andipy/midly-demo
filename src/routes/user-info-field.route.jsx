import {useContext} from 'react'
import { useLocation } from 'react-router-dom'

import { CurrentFanContext } from '../contexts/currentFan.context'

import ContainerDefault from '../layout/container-default.layout'
import Appbar from '../components/appbar.component'
import NavbarPersonalInfoField from '../components/navbar-personal-info-field.component'


const UserInfoFieldRoute = () => {

    const { currentFan, setCurrentFan } = useContext(CurrentFanContext)

    const location = useLocation()
    const { type } = location.state || {} 

  return (
    <>
    <NavbarPersonalInfoField title={type} />
    <ContainerDefault containerSpecificStyle={'pb-xs-appbar'}>
        <div>
        {(() => {
            switch (type) {
                case 'USERNAME':
                    return (
                        <>
                            <div className='mt-xs-8 mb-xs-8'>
                                <label className='fsize-xs-1 grey-300 letter-spacing-3'>
                                    USERNAME
                                </label>
                                {currentFan.username ? 
                                    <h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{currentFan.username}</h6>
                                : 
                                    <h6 className='fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2'>Aggiungi il tuo username!</h6>
                                }
                            </div>
                        </>
                    )
                case 'INSTAGRAM_USERNAME':
                    return (
                        <>
                            <div className='mt-xs-8 mb-xs-8'>
                                <label className='fsize-xs-1 grey-300 letter-spacing-3'>
                                    INSTAGRAM
                                </label>
                                {currentFan.instagram ? 
                                    <h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{currentFan.instagram}</h6>
                                : 
                                    <h6 className='fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2'>Aggiungi il tuo instagram!</h6>
                                }
                            </div>
                        </>
                    )
                case 'BIRTHDATE':
                    return (
                        <>
                            <div className='mt-xs-8 mb-xs-8'>
                                <label className='fsize-xs-1 grey-300 letter-spacing-3'>
                                    DATA DI NASCITA
                                </label>
                                {currentFan.birthdate ? 
                                    <h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{currentFan.birthdate}</h6>
                                : 
                                    <h6 className='fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2'>Aggiungi ila tua data di nascita!</h6>
                                }
                            </div>
                        </>
                    )
                    
                case 'GENRE':
                    return (
                        <>
                            <div className='mt-xs-8 mb-xs-8'>
                                <label className='fsize-xs-1 grey-300 letter-spacing-3'>
                                    GENERE
                                </label>
                                {currentFan.genre ? 
                                    <h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{currentFan.genre}</h6>
                                : 
                                    <h6 className='fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2'>Aggiungi il tuo genere!</h6>
                                }
                            </div>
                        </>
                    )
                case 'EMAIL':
                    return (
                        <>
                            <div className='mt-xs-8 mb-xs-8'>
                                <label className='fsize-xs-1 grey-300 letter-spacing-3'>
                                    EMAIL
                                </label>
                                {currentFan.email ? 
                                    <h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{currentFan.email}</h6>
                                : 
                                    <h6 className='fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2'>Aggiungi la tua mail!</h6>
                                }
                            </div>
                        </>
                    )
                case 'CELLPHONE':
                    return (
                        <>
                            <div className='mt-xs-8 mb-xs-8'>
                                <label className='fsize-xs-1 grey-300 letter-spacing-3'>
                                    CELLULARE
                                </label>
                                {currentFan.cellphone ? 
                                    <h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{currentFan.cellphone}</h6>
                                : 
                                    <h6 className='fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2'>Aggiungi il tuo cellulare!</h6>
                                }
                            </div>
                        </>
                    )
                case 'ADDRESS':
                    return (
                        <>
                            <div className='mt-xs-8 mb-xs-8'>
                                <label className='fsize-xs-1 grey-300 letter-spacing-3'>
                                    NOME
                                </label>
                                {currentFan.adress.name ? 
                                    <h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{currentFan.adress.name}</h6>
                                : 
                                    <h6 className='fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2'>Aggiungi il tuo nome!</h6>
                                }
                            </div>
                            <div className='mt-xs-8 mb-xs-8'>
                                <label className='fsize-xs-1 grey-300 letter-spacing-3'>
                                    COGNOME
                                </label>
                                {currentFan.adress.surname ? 
                                    <h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{currentFan.adress.surname}</h6>
                                : 
                                    <h6 className='fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2'>Aggiungi il tuo cognome!</h6>
                                }
                            </div>
                            <div className='mt-xs-8 mb-xs-8'>
                                <label className='fsize-xs-1 grey-300 letter-spacing-3'>
                                    VIA E NUMERO
                                </label>
                                {currentFan.adress.strada ? 
                                    <h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{currentFan.adress.strada}</h6>
                                : 
                                    <h6 className='fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2'>Nesun indirizzo! Aggiungilo</h6>
                                }
                            </div>
                            <div className='mt-xs-8 mb-xs-8'>
                                <label className='fsize-xs-1 grey-300 letter-spacing-3'>
                                    CAP
                                </label>
                                {currentFan.adress.zipcode ? 
                                    <h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{currentFan.adress.zipcode}</h6>
                                : 
                                    <h6 className='fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2'>Nesun CAP! Aggiungilo</h6>
                                }
                            </div>
                            <div className='mt-xs-8 mb-xs-8'>
                                <label className='fsize-xs-1 grey-300 letter-spacing-3'>
                                    COMUNE/CITTA'
                                </label>
                                {currentFan.adress.city ? 
                                    <h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{currentFan.adress.city}</h6>
                                : 
                                    <h6 className='fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2'>Nesuna città! Aggiungila</h6>
                                }
                            </div>
                            <div className='mt-xs-8 mb-xs-8'>
                                <label className='fsize-xs-1 grey-300 letter-spacing-3'>
                                    PROVINCIA
                                </label>
                                {currentFan.adress.province ? 
                                    <h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{currentFan.adress.province}</h6>
                                : 
                                    <h6 className='fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2'>Nesuna provincia! Aggiungila</h6>
                                }
                            </div>
                            <div className='mt-xs-8 mb-xs-8'>
                                <label className='fsize-xs-1 grey-300 letter-spacing-3'>
                                    STATO
                                </label>
                                {currentFan.adress.state ? 
                                    <h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{currentFan.adress.state}</h6>
                                : 
                                    <h6 className='fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2'>Nesuno stato! Aggiungilo</h6>
                                }
                            </div>
                        </>
                    )
                
                default:
                    return (
                        <>
                            <h4>Modifica Informazioni</h4>
                            <p>Seleziona un'opzione per modificare le informazioni del tuo account.</p>
                        </>
                    )
            }
        })()}   
        </div>
    </ContainerDefault>
    <Appbar />
    </>

  )
}

export default UserInfoFieldRoute