import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { FanclubsContext } from '../contexts/fanclubs.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'

import Button from '../components/button.component'
import NavbarMultistep from '../components/navbar-multistep.component'

import Container from '../layout/container.layout'

const FanclubActivationPricingRoute = () => {

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

    const [isLimited, setIsLimited] = useState(true)
    const handleIsLimited = () => {
        setIsLimited(!isLimited)
    }

    useEffect(() => {
        if (isLimited === false) {
            setSubscribers(null)
        }
    }, [isLimited])

    const [subscribers, setSubscribers] = useState(null)
    const handleSubscribers = (e) => {
        e.preventDefault()
        setSubscribers(e.target.value)
    }

    

    const updateThisFanclub = () => {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub =>
                fanclub.artistId === currentArtist.id &&
                (fanclub.pricing !== pricing || fanclub.maxSubscribers !== subscribers )
                    ? {
                        ...fanclub,
                        pricing: pricing,
                        maxSubscribers: subscribers
                    }
                    : fanclub
            )
        )
    }

    useEffect(() => {
        updateThisFanclub()
        // Check if all mandatory fields are filled
        if (pricing && (!isLimited || subscribers > 0)) {
            setFilledMandatory(true)
        } else {
            setFilledMandatory(false)
        }
    }, [pricing, subscribers, isLimited])

    useEffect(() => {
        fanclubs.map(fanclub => {
            if ( fanclub.artistId === currentArtist.id ) {
                if ( fanclub.pricing ) {
                    setPricing(fanclub.pricing)
                }
                if (fanclub.maxSubscribers) {
                    setSubscribers(fanclub.maxSubscribers)
                }
            }
        })
    }, [fanclubs])

    const saveThisFanclub = () => {
        setFanclubs(prevFanclubs => 
            prevFanclubs.map(fanclub =>
                fanclub.artistId === currentArtist.id
                    ? {
                        ...fanclub,
                        pricing: pricing,
                        isActive: true,
                        subscribers: 0
                    }
                    : fanclub
            )
        )
        navigate('/artist-app/fanclub')
    }
    
    return (
        <>
            <NavbarMultistep stepNumber={2} totalStepNumber={2} dismissable={true} forcedExitPath={'/artist-app/fanclub'} />

            <Container style='pt-xs-topbar'>
                <section className='d-flex-column gap-0_5em mt-xs-4'>
                    <h3 className='fsize-xs-5 f-w-600 white'>Prezzo mensile del tuo fanclub</h3>
                    <p className='fsize-xs-2 f-w-400 grey-300'>Quanto deve pagare ogni mese un tuo fan per accedere al tuo fan club?</p>
                    <p className='fsize-xs-2 f-w-400 grey-300'>Minimo €2.99, massimo €11.99.</p>
                    <span
                        className='fsize-xs-2 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 bg-green-900 border-radius-100 green-400 align-self-start'
                        onClick={setRecommendedPricing}
                    >
                        Imposta consigliato €3.99 al mese
                    </span>
                    <input className='bg-dark-soft white fsize-xs-2 f-w-500 border-radius-04' type='number' onChange={handlePricing} value={pricing} placeholder='Inserisci il prezzo mensile' min='2.99' max='11.99' />
                </section>

                <section className='mt-xs-20'>
                    <div className='d-flex-row align-items-start j-c-space-between mb-xs-4 mt-xs-2'>
                        <div className='d-flex-column'>
                            <h3 className='fsize-xs-5 f-w-600 white'>Limita numero di posti nel fanclub</h3>
                            <p className='fsize-xs-2 f-w-400 grey-300'>Potrai modificare questo limite quando vuoi</p>
                        </div>
                    
                        <div className={`toggle-area ${isLimited ? 'toggle-area-on' : 'toggle-area-off'}`} onClick={handleIsLimited}>
                            <div className={`toggle-dot ${isLimited ? 'toggle-on' : 'toggle-off'}`}></div>
                        </div>
                    </div>
                    {isLimited &&
                        <input
                            className='bg-dark-soft white fsize-xs-2 f-w-500 border-radius-04'
                            type='text'
                            placeholder={`${'Numero massimo di iscritti'}`}
                            value={subscribers}
                            onChange={(e) => handleSubscribers(e)}
                        />
                    }
                </section>

                <Container style='position-fixed bottom-5'>
                    <Button
                        disabled={filledMandatory ? false : true}
                        style={`${filledMandatory ? 'bg-acid-lime dark-900' : 'bg-dark-soft grey-400'} fsize-xs-3 f-w-600 letter-spacing-1`} label='Salva'
                        onClick={saveThisFanclub}
                    />
                </Container>
            </Container>
        </>
    )
}

export default FanclubActivationPricingRoute