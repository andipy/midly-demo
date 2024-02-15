import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import thasup from '../images/pictures/thasup.jpg'
import ContainerDefault from "../layout/container-default.layout";

import Button from "../components/button.component";

const QuizGameplayRoute = () => {

    const [timer, setTimer] = useState(60);
    useEffect(() => {
        setTimeout(() => {
            if ( timer > 0 ) {
                setTimer(prev => prev - 1)
            } else if ( timer === 0 ) {
                setTimer('')
            }
        }, 1000)
    }, [timer])

    return (
        <>
        <header className="position-relative h-xs-10">
            <img className="w-100 h-inherit object-fit-cover" src={thasup} alt="" />              
        </header>

        <ContainerDefault>
            <div className="d-flex-row align-items-center mt-xs-4 gap-0_5em">
                <span className="fsize-xs-3 pt-xs-2 pb-xs-2 align-self-start grey-300">thasup</span>
                <span className="fsize-xs-3 pt-xs-2 pb-xs-2 pr-xs-2 pl-xs-2 border-radius-100 bg-dark-gradient gold align-self-start">song name</span>
            </div>

            <p className="t-align-center lime-400 mt-xs-10 mb-xs-10">{timer > 0 ? `${timer} secondi rimanenti` : "Tempo scaduto"}</p>

            <div>
                <p className="fsize-xs-6">Ricorda che per ogni passo che muovi ti lasci le impronte dietro di te <span className="gold">__________</span> e vogliono sapere quello che so</p>

                <textarea className="bg-dark-soft white letter-spacing-1 border-radius-04 mt-xs-4 fsize-xs-3" rows="4" placeholder="Scrivi il verso mancante"></textarea>
            </div>

            <Link to='/quiz-result'>
                <Button style={'bg-acid-lime black font-body mt-xs-6'} label={"Invia la risposta"}></Button>
            </Link>
        </ContainerDefault>
        </>
    )
}

export default QuizGameplayRoute;