import { useState } from 'react'
import { Link } from 'react-router-dom'

import FullPageCenter from '../layout/full-page-center.layout'
import ContainerDefault from '../layout/container-default.layout'

import Button from '../components/button.component'
import NavbarDefault from '../components/navbar-default.component'

const LoginRoute = () => {

    const [showComponent, setShowComponent] = useState(true)
    const closePopup = () => {
        setShowComponent(false)
    }

    return (
        <>
        <NavbarDefault />
        
        <ContainerDefault containerSpecificStyle={'pb-xs-appbar'}>
            <div>
                <h2 className="fsize-xs-9 mb-xs-1 white">Bentornata!</h2>
                <p className="fsize-xs-2 f-w-200 grey-200 letter-spacing-1">Accedi al tuo account Midly con mail e password.</p>
            </div>
            
            <div>
                <form action="POST">
                    <div className="mt-xs-8 mb-xs-8 mt-lg-4 mb-lg-4">
                        <label className="fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6" for="input-email">EMAIL</label>
                        <input id="input-email" className="bg-dark-soft white letter-spacing-1 border-radius-08" type="email" placeholder="La tua email" />
                    </div>
                    <div className="mt-xs-8 mb-xs-8 mt-lg-4 mb-lg-4">
                        <label className="fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6" for="input-password">PASSWORD</label>
                        <input id="input-password" className="bg-dark-soft white letter-spacing-1 border-radius-08" type="password" placeholder="La tua password" />
                        <div className="d-flex-row align-items-center j-c-start mt-xs-2">
                            <p className="fsize-xs-1 grey-400 mr-xs-2">Password dimenticata?</p>
                            <a className="fsize-xs-1 lime-400 f-w-600" href="/recover-password">Recuperala!</a>
                        </div>  
                    </div>                                      

                    <button className="bg-acid-lime black font-body fsize-xs-3 f-w-600 mt-xs-4 mb-xs-4">Accedi</button>
                </form>

                <div className="d-flex-row align-items-center j-c-center mt-xs-6">
                    <p className="fsize-xs-2 grey-400 mr-xs-2">Non hai un account?</p>
                    <a className="fsize-xs-2 lime-400 f-w-600" href="/signup">Registrati qui!</a>
                </div>

                <p className='fsize-xs-2 grey-400 t-align-center w-80 mt-xs-6 mx-xs-auto'>C'è qualcosa che non va? Scrivici per assitenza diretta su telegram:</p>
                <Link to='https://t.me/midlyofficial' target='blank'>
                    <Button style='bg-none border-blue-bright-600 blue-bright-600 border-radius-02 fsize-xs-3 f-w-500 mt-xs-2' label='Chiedi aiuto sul canale telegram' />
                </Link>
            </div>  

        </ContainerDefault>          

        {showComponent &&
            <FullPageCenter className={'z-index-max bg-black-transp70'}>
                <ContainerDefault containerSpecificStyle={'centered-popup position-absolute d-flex-column align-items-center gap-0_5em bg-dark-soft-2 border-radius-04 pt-xs-6 pb-xs-6 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2'}>
                    <section className='w-100'>
                        <h3 className='fsize-xs-4 grey-200 f-w-500 mt-xs-4 lime-400 t-align-center'>Stiamo avendo un traffico enorme che potrebbe rallentare il sito!</h3>
                        <p className='fsize-xs-2 grey-100 f-w-300 mt-xs-2 t-align-center'>Se non riesci a registrarti o accedere, riprova tra pochissimo! Se proprio non riesci dopo vari tentativi, scrivici per assitenza su telegram:</p>
                        <Link to='https://t.me/midlyofficial' target='blank'>
                            <Button style='bg-none border-blue-bright-600 blue-bright-600 border-radius-02 fsize-xs-3 f-w-500 mt-xs-2' label='Chiedi aiuto sul canale telegram' />
                        </Link>
                    </section>
                    
                    <Button style='bg-acid-lime black border-radius-04 fsize-xs-3 f-w-500 mt-xs-4' label='Vai al login' onClick={closePopup} />
                </ContainerDefault>
            </FullPageCenter>
        }
        </>

    )
}

export default LoginRoute