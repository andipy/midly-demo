import { useNavigate } from 'react-router-dom'


import NavbarDefault from "../components/navbar-default.component";
import ContainerDefault from "../layout/container-default.layout";



function RecoverPassword() {

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        /* CONTROLLI */
        navigate(-2); 
    };


  return (
    <>
        <NavbarDefault />
        <ContainerDefault containerSpecificStyle={'pb-xs-appbar'}>
            <h3 className="fsize-xs-6 f-w-500 mb-xs-1 white">Facci sapere la tua email</h3>
            <p className="fsize-xs-2 f-w-200 grey-200 letter-spacing-1 mt-xs-4">
                Riceverai un link via mail per resettare la tua password, inserisci e conferma la tua email!
            </p>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mt-xs-8 mb-xs-8">
                        <label className="fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6" for='input-mail'>
                            EMAIL
                        </label>
                        <input id="input-email" className="bg-dark-soft white letter-spacing-1 border-radius-08" type="email" placeholder="Inserisci la tua email" required />
                    </div>
                    <div className="mt-xs-8 mb-xs-8">
                        <label className="fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6" for='input-confirm-mail'>
                            CONFERMA EMAIL
                        </label>
                        <input id="input-confirm-email" className="bg-dark-soft white letter-spacing-1 border-radius-08" type="email" placeholder="Conferma l'email del tuo account" required />
                    </div>
                    <button className="bg-acid-lime black font-body fsize-xs-3 f-w-600 mt-xs-4 mb-xs-4" type='submit'>
                        <span className="fsize-xs-3 -w-600 dark-900 letter-spacing-1">Invia</span>
                    </button>
                </form>
            </div>

        </ContainerDefault>
    </>
    
  )
}

export default RecoverPassword