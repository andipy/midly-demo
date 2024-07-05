import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { FanclubsContext } from '../contexts/fanclubs.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'

import Button from '../components/button.component'
import NavbarMultistep from '../components/navbar-multistep.component'

import ContainerDefault from '../layout/container-default.layout'

const FanclubSettingsEditRoute = () => {

    const navigate = useNavigate()

    const { currentArtist } = useContext(CurrentArtistContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)
    const [fanclub, setFanclub] = useState(null)
    const fetchThisFanclub = () => {
        const thisFanclub = fanclubs.find(elem => elem.artistId === currentArtist.id)
        setFanclub(thisFanclub)
    }
    useEffect(() => {
        fetchThisFanclub()
    }, [fanclubs])

    const [updates, setUpdates] = useState({
        ...fanclub,
        name: null,
        pricing: null,
        image: null,
    })
    useEffect(() => {
        if ( fanclub ) {
            setUpdates(prev => ({
                ...prev,
                name: fanclub.name,
                pricing: fanclub.pricing,
                image: fanclub.image,
            }))
        }
    }, [fanclub])

    const handleName = (e) => {
        e.preventDefault()
        setUpdates(prev => ({
            ...prev,
            name: e.target.value
        }))
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setUpdates(prev => ({
                ...prev,
                image: imageUrl
            }))
        }
    }
    const setRecommendedPricing = () => {
        setUpdates(prev => ({
            ...prev,
            pricing: 3.99
        }))
    }
    const handlePricing = (e) => {
        e.preventDefault()
        setUpdates(prev => ({
            ...prev,
            pricing: e.target.value
        }))
    }

    const updateThisFanclub = () => {
        setFanclubs(prevFanclubs => 
            prevFanclubs.map(fanclub =>
                fanclub.artistId === currentArtist.id
                    ? { ...fanclub, name: updates.name, image: updates.image, pricing: updates.pricing }
                    : fanclub
            )
        )
        navigate('/artist-app/fanclub/settings')
    }

    return (
        <>
            <NavbarMultistep stepNumber={1} totalStepNumber={1} dismissable={true} editable={false} />

            <ContainerDefault containerSpecificStyle='pt-xs-topbar'>
                <section className='mt-xs-8'>
                    <h3 className='fsize-xs-5 f-w-600'>Nome</h3>
                    <input className="bg-dark-soft white letter-spacing-1 border-radius-06 mt-xs-4" type="text" placeholder="Scrivi qui il nome" value={updates.name && updates.name} onChange={handleName} />
                </section>

                <section className='mt-xs-8'>
                    <h3 className='fsize-xs-5 f-w-600'>Cover image</h3>
                    <input className="bg-dark-soft white letter-spacing-1 border-radius-06 mt-xs-4" type="file" placeholder="Scrivi qui il nome" onChange={handleFileChange} />

                    <img className='w-100' src={updates.image && updates.image} />
                </section>

                <section className='mt-xs-8'>
                    <h3 className='fsize-xs-5 f-w-600'>Prezzo mensile</h3>

                    <div className='d-flex-column gap-0_5em mt-xs-4'>
                        <p className='fsize-xs-2 grey-300'>Min €2.99 al mese, max €11.99 al mese</p>
                        <span
                            className='fsize-xs-2 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 bg-green-900 border-radius-04 green-400 align-self-start'
                            onClick={setRecommendedPricing}
                        >
                            Imposta consigliato €3.99 al mese
                        </span>
                        <input className='bg-dark-soft white letter-spacing-1 border-radius-06' type='number' onChange={handlePricing} value={updates.pricing} placeholder='Inserisci il prezzo mensile' min='2.99' max='11.99' />
                        
                    </div>
                </section>

                <Button style='bg-acid-lime fsize-xs-3 f-w-600 dark-900 letter-spacing-1 mt-xs-8 mb-xs-8' label='Save' onClick={updateThisFanclub} />
            </ContainerDefault>
        </>
    )
}

export default FanclubSettingsEditRoute