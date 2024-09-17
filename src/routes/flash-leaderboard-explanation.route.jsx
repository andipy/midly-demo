import ContainerDefault from '../layout/container-default.layout'

import NavbarMultistep from '../components/navbar-multistep.component'

const FlashLeaderboardExplanationRoute = () => {

    return (
        <>
            <NavbarMultistep stepNumber={1} totalStepNumber={1} dismissable={false} editable={false} />
            <ContainerDefault containerSpecificStyle={'pt-xs-topbar'}>
                <h3 className='fsize-xs-7 f-w-600 lime-400'>Cos'è una classifica flash</h3>
                <p className='fsize-xs-4 mt-xs-2 mb-xs-12'>NON è la classifica mensile. È una classifica di breve durata (FLASH), in genere 24 o 26 ore (ma può durare anche di più) dove puoi dimostrare di essere un super fan ascoltando il brano o l'album appena pubblicato dall'artista.</p>

                <h3 className='fsize-xs-7 f-w-600 lime-400'>Come fare punti nella FLASH</h3>
                <p className='fsize-xs-4 mt-xs-2 mb-xs-12'>Il singolo o ogni brano dell'album appena pubblicato valgono 3 punti, ma max 10 ascolti per brano ogni 24 ore. <br /><br /> Ogni altro brano dell'artista vale 1 punto.</p>
                
            </ContainerDefault>
        </>
    )
}

export default FlashLeaderboardExplanationRoute