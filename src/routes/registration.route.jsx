import NavbarDefault from "../components/navbar-default.component";
import ContainerDefault from "../layout/container-default.layout";

function Registration() {
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
        <form>
            <div className="mt-xs-8 mb-xs-8 mt-lg-4 mb-lg-4">
                <label className="fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6" for='input-username'>
                    USERNAME
                </label>
                <input id="input-username" className="bg-dark-soft white letter-spacing-1 border-radius-08" type="text" placeholder="Crea il tuo username" required />
            </div>
            <div className="mt-xs-8 mb-xs-8 mt-lg-4 mb-lg-4">
                <label className="fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6" for='input-email'>
                    EMAIL
                </label>
                <input id="input-email" className="bg-dark-soft white letter-spacing-1 border-radius-08" type="text" placeholder="Inserisci la tua mail" required />
            </div>
            <div className="mt-xs-8 mb-xs-8 mt-lg-4 mb-lg-4">
                <label className="fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6" for='input-password'>
                    PASSWORD
                </label>
                <input id="input-password" className="bg-dark-soft white letter-spacing-1 border-radius-08" type="text" placeholder="Crea una password" required />
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
                <input id="input-confirm-password" className="bg-dark-soft white letter-spacing-1 border-radius-08" type="text" placeholder="Conferma la password" required />
            </div>
            <div className="d-flex-row j-c-start align-items-center mt-xs-4 mb-xs-4">
                <input className="mmr-xs-4 no-shrink" type="checkbox" required/>
                <p className="fsize-xs-1 grey-400">
                    {'Accetto i '}
                    <a className="grey-200 text-underline" href="/terms-and-conditions-fans" target="blank">Termini e condizioni fan</a>
                    {' e la '}
                    <a className="grey-200 text-underline" href="/privacy-policy-fans" target="blank">Privacy policy</a>
                </p>
            </div>
            <div className="d-flex-row j-c-start align-items-center mt-xs-4 mb-xs-4">
                <input className="mr-xs-4 no-shrink" type="checkbox" />
                <p className="fsize-xs-1 grey-400">
                    Acconsento al trattamento dei miei dati per finalità di marketing e promozionale.
                </p>
            </div>
            <button className="d-flex-row align-items-center j-c-center gap-0_5em bg-acid-lime fsize-xs-3 f-w-600 dark-900 letter-spacing-1">
                <span>Registrati</span>  {/* PER ORA BOTTONE NON FA NULLA */}
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