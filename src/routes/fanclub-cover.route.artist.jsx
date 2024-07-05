import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { FanclubsContext } from '../contexts/fanclubs.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'

import Button from '../components/button.component'
import NavbarMultistep from '../components/navbar-multistep.component'

import ContainerDefault from '../layout/container-default.layout'

const FanclubCoverRoute = () => {

    const navigate = useNavigate()

    const { currentArtist } = useContext(CurrentArtistContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)

    const [currentImage, setCurrentImage] = useState(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setFanclubs(prevFanclubs => 
                prevFanclubs.map(fanclub =>
                    fanclub.artistId === currentArtist.id
                        ? { ...fanclub, image: imageUrl }
                        : fanclub
                )
            )
            
        }
    }

    const retrieveImage = () => {
        fanclubs.map(fanclub =>
            fanclub.artistId === currentArtist.id
                && setCurrentImage(fanclub.image)
        )
    }
    useEffect(() => {
        retrieveImage()
    }, [fanclubs])
    
    return (
        <>
            <NavbarMultistep stepNumber={2} totalStepNumber={3} dismissable={true} forcedExitPath={'/artist-app/fanclub'} />

            <ContainerDefault containerSpecificStyle='pt-xs-topbar'>
                <h3 className='fsize-xs-6 f-w-500'>Carica una immagine di copertina per il tuo fanclub</h3>
                <input className="bg-dark-soft white letter-spacing-1 border-radius-06 mt-xs-4" type="file" placeholder="Scrivi qui il nome" onChange={handleFileChange} />

                <img className='w-100' src={currentImage && currentImage} />

                <ContainerDefault containerSpecificStyle='position-absolute bottom-5'>
                    <Button style='bg-acid-lime fsize-xs-3 f-w-600 dark-900 letter-spacing-1' label='Next' onClick={() => navigate('/artist-app/fanclub/pricing')} />
                </ContainerDefault>
            </ContainerDefault>
        </>
    )
}

export default FanclubCoverRoute