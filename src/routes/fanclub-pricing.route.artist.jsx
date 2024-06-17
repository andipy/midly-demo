import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { FanclubsContext } from '../contexts/fanclubs.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'

import Button from '../components/button.component'
import NavbarMultistep from '../components/navbar-multistep.component'

import ContainerDefault from '../layout/container-default.layout'

const FanclubPricing = () => {

    const navigate = useNavigate()

    const { currentArtist } = useContext(CurrentArtistContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)

    const [pricing, setPricing] = useState()
    const setRecommendedPricing = () => {
        setPricing(3.99)
    }
    const handlePricing = (e) => {
        e.preventDefault()
        setPricing(e.target.value)
    }
    const updateThisFanclub = () => {
        setFanclubs(prevFanclubs => 
            prevFanclubs.map(fanclub =>
                fanclub.artistId === currentArtist.id
                    ? { ...fanclub, pricing: pricing }
                    : fanclub
            )
        )
    }

    const saveThisFanclub = () => {
        setFanclubs(prevFanclubs => 
            prevFanclubs.map(fanclub =>
                fanclub.artistId === currentArtist.id
                    ? { ...fanclub, isActive: true }
                    : fanclub
            )
        )
        navigate('/artist-app/fan-club/activated')
    }

    useEffect(() => {
        if (pricing !== undefined) {
            updateThisFanclub()
        }
    }, [pricing])

    useEffect(() => {
        fanclubs.map(fanclub => {
            if ( fanclub.artistId === currentArtist.id ) {
                if ( fanclub.pricing ) {
                    setPricing(fanclub.pricing)
                }
            }
        })
    }, [])
    
    return (
        <>
            <NavbarMultistep stepNumber={3} />

            <ContainerDefault containerSpecificStyle='pt-xs-topbar'>
                <h3 className='fsize-xs-6 f-w-500'>Stabilisci il prezzo dell'abbonamento mensile al tuo fanclub</h3>

                <div className='mt-xs-4'>
                    <p className='grey-300 mb-xs-4'>Min €2.99 al mese, max €11.99 al mese</p>
                    <span className='pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 bg-green-900 border-radius-04 green-400' onClick={setRecommendedPricing}>Imposta consigliato €3.99 al mese</span>
                    <input className="bg-dark-soft white letter-spacing-1 border-radius-06 mt-xs-6" type="number" onChange={handlePricing} value={pricing} placeholder="Es. €3.99" min='2.99' max='11.99' />
                </div>

                <ContainerDefault containerSpecificStyle='position-absolute bottom-5'>
                    <Button style='bg-acid-lime fsize-xs-3 f-w-600 dark-900 letter-spacing-1' label='Save' onClick={saveThisFanclub} />
                </ContainerDefault>
            </ContainerDefault>
        </>
    )
}

export default FanclubPricing