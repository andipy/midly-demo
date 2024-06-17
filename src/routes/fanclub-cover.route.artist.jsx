import { useNavigate } from 'react-router-dom'

import Button from '../components/button.component'
import NavbarMultistep from '../components/navbar-multistep.component'

import ContainerDefault from '../layout/container-default.layout'

const FanclubCover = () => {

    const navigate = useNavigate()
    
    return (
        <>
            <NavbarMultistep stepNumber={2} />

            <ContainerDefault containerSpecificStyle='pt-xs-topbar'>
                <h3 className='fsize-xs-6 f-w-500'>Carica una immagine di copertina per il tuo fanclub</h3>
                <input className="bg-dark-soft white letter-spacing-1 border-radius-06 mt-xs-4" type="file" placeholder="Scrivi qui il nome" />

                <ContainerDefault containerSpecificStyle='position-absolute bottom-5'>
                    <Button style='bg-acid-lime fsize-xs-3 f-w-600 dark-900 letter-spacing-1' label='Next' onClick={() => navigate('/artist-app/fan-club/pricing')} />
                </ContainerDefault>
            </ContainerDefault>
        </>
    )
}

export default FanclubCover