import { useState } from "react";
import NavbarDefault from "../components/navbar-default.component";
import ContainerDefault from "../layout/container-default.layout";

import { useNavigate } from 'react-router-dom';

function Registration() {

    const navigate = useNavigate()
    const [errorMessage, setErrorMesssage] = useState('')
    const [error, setError] = useState(false)
    const [inputEmail, setInputEmail] = useState("")
    const [inputUsername, setInputUsername] = useState("")
    const [inputPassword, setInputPassword] = useState("")
    const [inputRepeatPassword, setInputRepeatPassword] = useState("")
    const [isTermsAndConditionsAccepted, setIsTermsAndConditionsAccepted] = useState(false)
    const [isMarketingConsentGiven, setIsMarketingConsentGiven] = useState(false);
    

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    const handleSubmit = (e) => {
        e.preventDefault();
        /* CONTROLLI */

        if (!inputUsername || !inputEmail || !inputPassword || !inputRepeatPassword) {
            setError(true);
            setErrorMesssage('Tutti i campi sono obbligatori e non possono essere vuoti');
            return;
        }
        
        if (!emailRegex.test(inputEmail)) {
            setError(true);
            setErrorMesssage('L\'email inserita non è in un formato corretto');
            return;
        } 

        if (!passwordRegex.test(inputPassword)) {
            setError(true);
            setErrorMesssage('La password deve essere lunga almeno 8 caratteri, contenere almeno un numero e un carattere speciale');
            return;
        }

        if (inputPassword !== inputRepeatPassword) {
            setError(true);
            setErrorMesssage('Le password non corrispondono');
            return;
        }

        if (!isTermsAndConditionsAccepted) {
            setError(true);
            setErrorMesssage('Devi accettare i Termini e condizioni fan e la Privacy policy');
            return;
        }


        setError(false);
        setErrorMesssage('');
        navigate('/login')
    };

  return (
    <>
    <NavbarDefault />
    <ContainerDefault containerSpecificStyle={'pb-xs-appbar'}>
    <div id="top">
        <h2 className="fsize-xs-9 mb-xs-1 white">Crea account!</h2>
        <p className="fsize-xs-2 f-w-200 grey-200 letter-spacing-1">
            Crea il tuo account su Midly con email e password.
        </p>
    </div>
    <div className="mt-xs-12">
        <form onSubmit={handleSubmit}>
            <div className="mt-xs-8 mb-xs-8 mt-lg-4 mb-lg-4">
                <label className="fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6" for='input-username'>
                    USERNAME
                </label>
                <input id="input-username" className="bg-dark-soft white letter-spacing-1 border-radius-08" type="text" placeholder="Crea il tuo username" value={inputUsername} onChange={(e) =>setInputUsername(e.target.value)} />
            </div>
            <div className="mt-xs-8 mb-xs-8 mt-lg-4 mb-lg-4">
                <label className="fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6" for='input-email'>
                    EMAIL
                </label>
                <input id="input-email" className="bg-dark-soft white letter-spacing-1 border-radius-08" type="text" placeholder="Inserisci la tua mail" value={inputEmail} onChange={(e) =>setInputEmail(e.target.value)}/>
            </div>
            <div className="mt-xs-8 mb-xs-8 mt-lg-4 mb-lg-4">
                <label className="fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6" for='input-password'>
                    PASSWORD
                </label>
                <input id="input-password" className="bg-dark-soft white letter-spacing-1 border-radius-08" type="password" placeholder="Crea una password" value={inputPassword} onChange={(e) =>setInputPassword(e.target.value)}  />
                <div className="fsize-xs-0 grey-300 letter-spacing-1 mt-xs-4">
                    <p>
                        La password deve:
                        <ul>
                            <li className="pl-xs-2">1) essere lunga almeno 8 caratteri in totale</li>
                            <li className="pl-xs-2">2) contenere almeno un numero da 0 a 9</li>
                            <li className="pl-xs-2">3) contenere almeno un carattere speciale (! $ % & * # @ . , ;)</li>
                        </ul>
                    </p>
                </div>
            </div>
            <div className="mt-xs-8 mb-xs-8 mt-lg-4 mb-lg-4">
                <label className="fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6" for='input-confirm-password'>
                    CONFERMA PASSWORD
                </label>
                <input id="input-confirm-password" className="bg-dark-soft white letter-spacing-1 border-radius-08" type="password" placeholder="Conferma la password" value={inputRepeatPassword} onChange={(e) =>setInputRepeatPassword(e.target.value)}  />
            </div>
            <div className="d-flex-row j-c-start align-items-center mt-xs-4 mb-xs-4">
                <input className="mmr-xs-4 no-shrink" type="checkbox" checked={isTermsAndConditionsAccepted} onChange={(e) => setIsTermsAndConditionsAccepted(e.target.checked)}/>
                <p className="fsize-xs-1 grey-400">
                    {'Accetto i '}
                    <a className="grey-200 text-underline" href="/terms-and-conditions-fans" target="blank">Termini e condizioni fan</a>
                    {' e la '}
                    <a className="grey-200 text-underline" href="/privacy-policy-fans" target="blank">Privacy policy</a>
                </p>
            </div>
            <div className="d-flex-row j-c-start align-items-center mt-xs-4 mb-xs-4">
                <input className="mr-xs-4 no-shrink" type="checkbox" checked={isMarketingConsentGiven} onChange={(e) => setIsMarketingConsentGiven(e.target.checked)}/>
                <p className="fsize-xs-1 grey-400">
                    Acconsento al trattamento dei miei dati per finalità di marketing e promozionale.
                </p>
            </div>
            { error && (
                <div id="error-message-card" className="error-message mb-xs-4 mt-xs-4">
                <div className="d-flex-row align-items-center pl-xs-4 pt-xs-4 pb-xs-4 pr-xs-4 bg-red-300 border-radius-08">
                    <img className="mr-xs-4" src={''} alt="ALT!"></img>
                    <p className="fsize-xs-1 f-w-400 white letter-spacing-1 line-height-sm mr-xs-2">
                        {errorMessage}
                    </p>
                </div>
            </div>
            )}
            <button className="d-flex-row align-items-center j-c-center gap-0_5em bg-acid-lime fsize-xs-3 f-w-600 dark-900 letter-spacing-1" type='submit'>
                <span>Registrati</span>  
            </button>
        </form>
        <div className="d-flex-row align-items-center j-c-center mt-xs-6">
            <p className="fsize-xs-2 grey-400 letter-spacing-1 mr-xs-2">
                Hai già un account?
            </p>
            <a className="fsize-xs-1 lime-400 f-w-600" href="/login">Accedi</a>
        </div>

    </div>
    </ContainerDefault>
    </>
    
  )
}

export default Registration