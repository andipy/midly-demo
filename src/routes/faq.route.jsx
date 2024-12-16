import ContainerDefault from '../layout/container-default.layout'
import NavbarProfileSettings from '../components/navbar-profile-settings-component'

const FaqRoute = () => {
  return (
    <>
    <NavbarProfileSettings title={'FAQ'} />
    <ContainerDefault style={'pt-xs-topbar pb-xs-8'}>
        <section className='mt-xs-2'>
            <article className='mb-xs-14'>
                <h4 className='fsize-xs-4 mb-xs-2 letter-spacing-2 f-w-500'>
                    Quanti punti si ricevono ascoltando le canzoni su Spotify?
                </h4>
                <p className='fsize-xs-2 f-w-300 grey-200 font-body letter-spacing-1'>
                    Ogni volta che ascolti una canzone ricevi un punto per scalare la classifica mensile dell’artista, ma ci sono dei limiti, leggi le FAQ successive. In generale, MIDLY è contro l'ascolto compulsivo.
                </p>
            </article>
            <article className='mb-xs-14'>
                <h4 className='fsize-xs-4 mb-xs-2 letter-spacing-2 f-w-500'>
                    Posso fare punti infiniti ogni giorno ascoltando canzoni su Spotify?
                </h4>
                <p className='fsize-xs-2 f-w-300 grey-200 font-body letter-spacing-1'>
                    Puoi fare al massimo 75 punti al giorno tramite ascolti nelle classifiche mensili.
                </p>
                <p className='fsize-xs-2 f-w-300 grey-200 font-body letter-spacing-1 mt-xs-6'>
                    Lo stesso brano può farti ottenere al massimo 3 punti al giorno nella classifica mensile. Dal quarto ascolto incluso e in avanti, non ti verrà riconosciuto alcun punteggio in quel giorno.
                </p>
                <p className='fsize-xs-2 f-w-300 grey-200 font-body letter-spacing-1 mt-xs-6'>
                    Dal giorno dopo, il giro ricomincia.
                </p>
            </article>
            <article className='mb-xs-14'>
                <h4 className='fsize-xs-4 mb-xs-2 letter-spacing-2 f-w-500'>
                    Gli artisti su MIDLY vedono chi è in cima alle classifiche?
                </h4>
                <p className='fsize-xs-2 f-w-300 grey-200 font-body letter-spacing-1'>
                    Gli artisti che utilizzano attivamente la piattaforma possono controllare a loro discrezione chi sono i loro Super Fan.
                </p>
            </article>
            <article className='mb-xs-14'>
                <h4 className='fsize-xs-4 mb-xs-2 letter-spacing-2 f-w-500'>
                    Su MIDLY posso vincere dei premi?
                </h4>
                <p className='fsize-xs-2 f-w-300 grey-200 font-body letter-spacing-1'>
                    No, MIDLY non è una piattaforma a premi. I premi non sono ammessi.
                </p>
            </article>
            <article className='mb-xs-14'>
                <h4 className='fsize-xs-4 mb-xs-2 letter-spacing-2 f-w-500'>
                    Come funziona MIDLY?
                </h4>
                <p className='fsize-xs-2 f-w-300 grey-200 font-body letter-spacing-1'>
                    Dopo esserti registrato al servizio, aver connesso il tuo account Spotify e aver svolto gli altri passaggi necessari, MIDLY traccia i tuoi ascolti e li trasforma in punti nelle classifiche.
                </p>
            </article>
            <article className='mb-xs-14'>
                <h4 className='fsize-xs-4 mb-xs-2 letter-spacing-2 f-w-500'>
                    In quali modi posso fare punti per scalare la classifica di un artista?
                </h4>
                <p className='fsize-xs-2 f-w-300 grey-200 font-body letter-spacing-1'>
                    Puoi fare punti nelle classifiche dei tuoi artisti preferiti ascoltando i loro brani su Spotify, assicurandoti di aver prima connesso il tuo account Spotify al tuo profilo MIDLY e di aver fatto gli altri passaggi su MIDLY necessari ricevere i punti degli ascolti.
                </p>
                <p className='fsize-xs-2 f-w-300 grey-200 font-body letter-spacing-1 mt-xs-6'>
                    Un altro modo per ottenere punti nelle classifiche mensili è invitare i tuoi amici ad iscriversi a MIDLY: per ogni persona invitata che si iscrive dal tuo link di invito ed entra almeno nella classifica di un artista su MIDLY, ricevi 15 punti nella classifica dell’artista da cui hai mandato l'invito. Ricorda, devi generare e inviare un link diverso a ogni persona che vuoi invitare, altrimenti l'assegnazione dei punti non funzionerà.
                </p>
            </article>
            <article>
                <h4 className='fsize-xs-4 mb-xs-2 letter-spacing-2 f-w-500'>
                    Quanto durano le classifiche?
                </h4>
                <p className='fsize-xs-2 f-w-300 grey-200 font-body letter-spacing-1'>
                    Le classifiche mensili durano un mese: al termine del mese si azzerano e all'inizio del mese successivo ripartno. Ogni mese potrai ricominciare la tua scalata!
                </p>
            </article>
        </section>
    </ContainerDefault>
    </>

  )
}

export default FaqRoute