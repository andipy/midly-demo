import {useContext} from 'react'
import { useLocation } from 'react-router-dom'

import { CurrentFanContext } from '../contexts/currentFan.context'

import ContainerDefault from '../layout/container-default.layout'
import Appbar from "../components/appbar.component";
import NavbarPersonalInfoModify from '../components/navbar-personal-info-modify.component';
import IconArrowRight from "../images/icons/icon-arrowright.svg"


function UserInfoModify() {

    const { currentFan, setCurrentFan } = useContext(CurrentFanContext)

    const location = useLocation();
    const { type } = location.state || {}; 

  return (
    <>
    <NavbarPersonalInfoModify title={type} />
    <ContainerDefault containerSpecificStyle={'pb-xs-appbar'}>
        <div>
        {(() => {
            switch (type) {
                case 'Username':
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
                    );
                case 'Instagram username':
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
                    );
                case 'Data di nascita':
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
                    );
                    
                case 'Genere':
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
                    );
                case 'Email':
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
                    );
                case 'Cellulare':
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
                    );
                case 'Indirizzo':
                    return (
                        <>
                            <div className='mt-xs-8 mb-xs-8'>
                                <label className='fsize-xs-1 grey-300 letter-spacing-3'>
                                    INDIRIZZO
                                </label>
                                {currentFan.adress ? 
                                    <h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{currentFan.adress}</h6>
                                : 
                                    <h6 className='fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2'>Aggiungi il tuo indirizzo!</h6>
                                }
                            </div>
                        </>
                    );
                
                default:
                    return (
                        <>
                            <h4>Modifica Informazioni</h4>
                            <p>Seleziona un'opzione per modificare le informazioni del tuo account.</p>
                        </>
                    );
            }
        })()}   
        </div>
    </ContainerDefault>
    <Appbar />
    </>

  )
}

export default UserInfoModify