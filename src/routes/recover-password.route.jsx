import { useNavigate } from 'react-router-dom'
import { useState } from 'react' 

import Icon from '../images/icons/icon-exit.svg'



import NavbarDefault from '../components/navbar-default.component' 
import ContainerDefault from '../layout/container-default.layout' 



const  RecoverPasswordRoute = () => {

    const navigate = useNavigate()

    const [errorMessage, setErrorMesssage] = useState('')
    const [error, setError] = useState(false)
    const [inputEmail, setInputEmail] = useState( ' ')
    const [inputRepeatEmail, setInputRepeatEmail] = useState( ' ')

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i 

    const handleSubmit = (e) => {
        e.preventDefault() 
        /* CONTROLLI */
        if (!inputEmail || !inputRepeatEmail) {
            setError(true) 
            setErrorMesssage('Tutti i campi sono obbligatori e non possono essere vuoti') 
            return 
        }

        if (!emailRegex.test(inputEmail)) {
            setError(true) 
            setErrorMesssage('L\'email inserita non è in un formato corretto') 
            return 
        } 

        if (inputEmail !== inputRepeatEmail) {
            setError(true) 
            setErrorMesssage('Le mail non corrispondono') 
            return 
        } 
        setError(false) 
        setErrorMesssage('') 
        navigate(-1)  
    } 


  return (
    <>
        <NavbarDefault />
        <ContainerDefault containerSpecificStyle={'pb-xs-appbar'}>
            <h3 className='fsize-xs-6 f-w-500 mb-xs-1 white'>Facci sapere la tua email</h3>
            <p className='fsize-xs-2 f-w-200 grey-200 letter-spacing-1 mt-xs-4'>
                Riceverai un link via mail per resettare la tua password, inserisci e conferma la tua email!
            </p>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className='mt-xs-8 mb-xs-8'>
                        <label className='fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6' for='input-mail'>
                            EMAIL
                        </label>
                        <input id='input-email' className='bg-dark-soft white letter-spacing-1 border-radius-08' type='text' placeholder='Inserisci la tua email'  value={inputEmail} onChange={(e) =>setInputEmail(e.target.value)}/>
                    </div>
                    <div className='mt-xs-8 mb-xs-8'>
                        <label className='fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6' for='input-confirm-mail'>
                            CONFERMA EMAIL
                        </label>
                        <input id='input-confirm-email' className='bg-dark-soft white letter-spacing-1 border-radius-08' type='text' placeholder="Conferma l'email del tuo account" value={inputRepeatEmail} onChange={(e) =>setInputRepeatEmail(e.target.value)} />
                    </div>
                    { error && (
                        <div id='error-message-card' className='error-message mb-xs-4 mt-xs-4'>
                        <div className='d-flex-row align-items-center pl-xs-4 pt-xs-4 pb-xs-4 pr-xs-4 bg-red-300 border-radius-08'>
                            <img className='mr-xs-4' src={Icon} alt='ALT!'></img>
                            <p className='fsize-xs-1 f-w-400 white letter-spacing-1 line-height-sm mr-xs-2'>
                                {errorMessage}
                            </p>
                        </div>
                    </div>
                    )} 
                    <button className='bg-acid-lime black font-body fsize-xs-3 f-w-600 mt-xs-4 mb-xs-4' type='submit'>
                        <span className='fsize-xs-3 -w-600 dark-900 letter-spacing-1'>Invia</span>
                    </button>
                </form>
            </div>

        </ContainerDefault>
    </>
    
  )
}

export default RecoverPasswordRoute