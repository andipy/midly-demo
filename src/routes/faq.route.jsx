import ContainerDefault from '../layout/container-default.layout'
import Appbar from '../components/appbar.component'
import NavbarProfileSettings from '../components/navbar-profile-settings-component'

const FaqRoute = () => {
  return (
    <>
    <NavbarProfileSettings title={'FAQ'} />
    <ContainerDefault containerSpecificStyle={'pb-xs-appbar'}>
        <div id='faqs' className='mt-xs-8'>
            <div className='mb-xs-20'>
                <h4 className='fsize-xs-4 mb-xs-2 letter-spacing-2 f-w-500'>
                    Quanti punti si guadagnano ascoltando le canzoni su Spotify?
                </h4>
                <p className='fsize-xs-2 f-w-300 grey-300 font-body letter-spacing-1'>
                    Ogni volta che ascolti una canzone riceverai un punto per scalare la classifica dell’artista.
                </p>
            </div>
            <div className='mb-xs-20'>
                <h4 className='fsize-xs-4 mb-xs-2 letter-spacing-2 f-w-500'>
                    Posso guadagnare punti infiniti ogni giorno ascoltando canzoni su Spotify?
                </h4>
                <p className='fsize-xs-2 f-w-300 grey-300 font-body letter-spacing-1'>
                    Lo stesso brano può farti guadagnare al massimo 3 punti al giorno. Dal quarto ascolto in poi non ti verrà riconosciuto alcun punteggio in quel giorno. Dal giorno dopo, il giro ricomincia!
                </p>
            </div>
            <div className='mb-xs-20'>
                <h4 className='fsize-xs-4 mb-xs-2 letter-spacing-2 f-w-500'>
                    Quanti punti posso totalizzare al massimo in un giorno?
                </h4>
                <p className='fsize-xs-2 f-w-300 grey-300 font-body letter-spacing-1'>
                    Puoi guadagnare al massimo 20 punti al giorno provenienti da ascolti; non ci sono limiti sui punti che puoi guadagnare invitando amici.
                </p>
            </div>
            <div className='mb-xs-20'>
                <h4 className='fsize-xs-4 mb-xs-2 letter-spacing-2 f-w-500'>
                    Con Midly posso davvero incontrare gli artisti che amo?
                </h4>
                <p className='fsize-xs-2 f-w-300 grey-300 font-body letter-spacing-1'>
                    Se il tuo artista preferito avrà messo in palio un incontro, fisico o virtuale, continuando ad ascoltare i suoi brani potrai provare a vincere il premio!
                </p>
            </div>
            <div className='mb-xs-20'>
                <h4 className='fsize-xs-4 mb-xs-2 letter-spacing-2 f-w-500'>
                    Quali premi posso trovare su Midly?
                </h4>
                <p className='fsize-xs-2 f-w-300 grey-300 font-body letter-spacing-1'>
                    Ogni artista metterà in palio i premi che preferisce! Non ti resta che seguirci su Midly e scoprire i premi dei tuoi artisti preferiti mese dopo mese!
                </p>
            </div>
            <div className='mb-xs-20'>
                <h4 className='fsize-xs-4 mb-xs-2 letter-spacing-2 f-w-500'>
                    Come funziona Midly?
                </h4>
                <p className='fsize-xs-2 f-w-300 grey-300 font-body letter-spacing-1'>
                    È semplice: visita https://www.midly.it/login, registrati utilizzando con il tuo nome e una mail, connetti il tuo account Spotify e segui i tuoi artisti preferiti! Ora non ti resterà che ascoltare i loro brani direttamente dall’app di Spotify per scalare le classifiche.
                </p>
            </div>
            <div className='mb-xs-20'>
                <h4 className='fsize-xs-4 mb-xs-2 letter-spacing-2 f-w-500'>
                    In quali modi posso guadagnare punti per scalare la classifica di un artista?
                </h4>
                <p className='fsize-xs-2 f-w-300 grey-300 font-body letter-spacing-1'>
                    Potrai guadagnare punti per scalare le classifiche dei tuoi artisti preferiti ascoltando i loro brani su Spotify. Un altro modo è invitare i tuoi amici ad iscriversi: per ogni tuo amico che si iscrive dal tuo link di invito ed entra almeno nella classifica di un artista su Midly, riceverai 15 punti nella classifica dell’artista da cui hai mandato l'invito.
                </p>
            </div>
            <div className='mb-xs-20'>
                <h4 className='fsize-xs-4 mb-xs-2 letter-spacing-2 f-w-500'>
                    Come vengono conteggiati i punti per la classifica?
                </h4>
                <p className='fsize-xs-2 f-w-300 grey-300 font-body letter-spacing-1'>
                    La somma dei punti determinerà la tua posizione nella classifica del singolo artista che segui su Midly.
                </p>
            </div>
            <div className='mb-xs-20'>
                <h4 className='fsize-xs-4 mb-xs-2 letter-spacing-2 f-w-500'>
                    Quanto durano le classifiche?
                </h4>
                <p className='fsize-xs-2 f-w-300 grey-300 font-body letter-spacing-1'>
                    Ogni classifica dura un mese e al termine del mese si azzera Ogni mese potrai ricominciare la tua scalata verso i premi!
                </p>
            </div>
            <div className='mb-xs-20'>
                <h4 className='fsize-xs-4 mb-xs-2 letter-spacing-2 f-w-500'>
                    Vince i premi solo il primo in classifica?
                </h4>
                <p className='fsize-xs-2 f-w-300 grey-300 font-body letter-spacing-1'>
                    Dipende dall’artista e da quanti premi metterà in palio. Per ogni premio ci sarà un vincitore.
                </p>
            </div>
            <div className='mb-xs-20'>
                <h4 className='fsize-xs-4 mb-xs-2 letter-spacing-2 f-w-500'>
                    Che tipo di attività viene tracciata da Midly su Spotify e con quale frequenza?
                </h4>
                <p className='fsize-xs-2 f-w-300 grey-300 font-body letter-spacing-1'>
                    Midly traccia costantemente tutti i tuoi ascolti su Spotify e converte automaticamente in punti quelli degli artisti che segui. In questo modo potrai scalare le classifiche degli artisti e loro sapranno che li stai ascoltando!
                </p>
            </div>
        </div>
    </ContainerDefault>
    <Appbar />
    </>

  )
}

export default FaqRoute