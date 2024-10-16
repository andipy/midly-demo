import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { FanclubsContext } from '../contexts/fanclubs.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'

import Button from '../components/button.component'
import NavbarMultistep from '../components/navbar-multistep.component'

import ContainerDefault from '../layout/container-default.layout'

const FanclubPricingRoute = () => {

    const navigate = useNavigate()

    const { currentArtist } = useContext(CurrentArtistContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)

    const [filledMandatory, setFilledMandatory] = useState(false)
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

    useEffect(() => {
        if (pricing) {
            updateThisFanclub()
        }

        // Check if all mandatory fields are filled
        if (pricing) {
            setFilledMandatory(true)
        } else {
            setFilledMandatory(false)
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
            <NavbarMultistep stepNumber={2} totalStepNumber={4} dismissable={true} forcedExitPath={'/artist-app/fanclub'} />

            <ContainerDefault containerSpecificStyle='pt-xs-topbar'>
                <h3 className='fsize-xs-6 f-w-500 white'>Prezzo mensile del tuo fanclub</h3>

                <div className='d-flex-column gap-0_5em mt-xs-4'>
                    <p className='fsize-xs-3 grey-200'>Quanto deve pagare ogni mese un tuo fan per accedere al tuo fan club?</p>
                    <p className='fsize-xs-3 grey-200'>Minimo €2.99, massimo €11.99. Consigliato €4.99.</p>
                    <span
                        className='fsize-xs-2 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 bg-green-900 border-radius-04 green-400 align-self-start'
                        onClick={setRecommendedPricing}
                    >
                        Imposta consigliato €3.99 al mese
                    </span>
                    <input className='bg-dark-soft white letter-spacing-1 border-radius-06' type='number' onChange={handlePricing} value={pricing} placeholder='Inserisci il prezzo mensile' min='2.99' max='11.99' />
                    
                </div>

                <ContainerDefault containerSpecificStyle='position-fixed bottom-5'>
                    <Button
                        disabled={filledMandatory ? false : true}
                        style={`${filledMandatory ? 'bg-acid-lime dark-900' : 'bg-dark-soft grey-400'} fsize-xs-3 f-w-600 letter-spacing-1`} label='Continua'
                        onClick={() => navigate('/artist-app/fanclub/billing-info')}
                    />
                </ContainerDefault>
            </ContainerDefault>
        </>
    )
}

export default FanclubPricingRoute