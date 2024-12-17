import { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { FanclubsContext } from '../contexts/fanclubs.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'

import Button from '../components/button.component'
import NavbarMultistep from '../components/navbar-multistep.component'

import Container from '../layout/container.layout'
import MessageSetPricing from '../components/message-set-pricing.component'
import IconEdit from '../images/icons/icon-edit.svg'
// import IconEdit from '../images/icons-comp/edit.icon'
import IconPlus from '../images/icons/icon-plus-lime.svg'

const FanclubSettingsEditRoute = () => {

    const location = useLocation()
    const { type } = location.state || {}
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
        description: null,
        pricing: null,
        maxSubscribers: null,
    })

    useEffect(() => {
        if ( fanclub ) {
            setUpdates(prev => ({
                ...prev,
                name: fanclub.name,
                description: fanclub.description,
                pricing: fanclub.pricing,
                maxSubscribers: fanclub.maxSubscribers
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

    const handleMaxSubscribers = (e) => {
        e.preventDefault()
        setUpdates(prev => ({
            ...prev,
            maxSubscribers: e.target.value
        }))
    }

    const handleMaxSubscribersOn = (e) => {

        if (updates.maxSubscribers === null) {
            e.preventDefault()
            setUpdates(prev => ({
                ...prev,
                maxSubscribers: 0
            }))
        } else {
            e.preventDefault()
            setUpdates(prev => ({
                ...prev,
                maxSubscribers: null
            }))
        }
        
    }

    

    const handelDescription = (e) => {
        e.preventDefault()
        setUpdates(prev => ({
            ...prev,
            description: e.target.value
        }))
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

    const updatePricing = () => {
        setShowMessageWhitePoints(true)
    }


    const updateThisFanclub = () => {
        setFanclubs(prevFanclubs => 
            prevFanclubs.map(fanclub =>
                fanclub.artistId === currentArtist.id
                    ? { ...fanclub, name: updates.name, description: updates.description, pricing: updates.pricing, maxSubscribers: updates.maxSubscribers }
                    : fanclub
            )
        )
        navigate(-1)
    }
    const labelName = {
        'NAME' : 'NOME',
        'PRICING': 'PREZZO MENSILE',
        'COVER' : 'COVER',
        'DESCRIPTION' : 'DESCRIZIONE'
    }
    const [filledMandatory, setFilledMandatory] = useState(false)

    useEffect(() => { 
        if (type === 'NAME_DESCRIPTION') {
            if ((updates.name === fanclub?.name || updates.name ==='') && (updates.description === fanclub?.description || updates.description ==='')) {
                setFilledMandatory(false)
            } else {
                setFilledMandatory(true)
            }
        }
        if (type === 'PRICING') {
            if (updates.pricing === fanclub?.pricing || updates.pricing ===null) {
                setFilledMandatory(false)
            } else {
                const pricingValue = parseFloat(updates.pricing)
                if (pricingValue >= 2.99 && pricingValue <= 11.99) {
                    setFilledMandatory(true)
                } else {
                    setFilledMandatory(false)
                }
            } 
        }
        if (type === 'MAX_SUBSCRIBERS') {
            if (updates.maxSubscribers === null || updates.maxSubscribers !== null && updates.maxSubscribers > 0) {
                setFilledMandatory(true)
            } else {
                setFilledMandatory(false)
            } 
        }

    }, [updates])

    


    const [showMessageWhitePoints, setShowMessageWhitePoints] = useState(false)
    return (
        <>
            <NavbarMultistep stepNumber={1} totalStepNumber={1} dismissable={true} editable={false} transparent={true}/>
            <Container style='pt-xs-topbar'>
                <div className='mt-xs-8 mb-xs-8 d-flex-column align-items-start j-c-start'>
                    {type === 'NAME_DESCRIPTION' ?
                    <>
                    <label className='fsize-xs-1 grey-300 letter-spacing-3 ml-xs-2'>{'NOME'}</label>
                    <input
                        id={`input-${type.toLowerCase()}`}
                        className='bg-dark-soft white fsize-xs-2 f-w-500 border-radius-04 mt-xs-2 mt-xs-4'
                        type='text'
                        placeholder={`${ updates.name ? updates.name : 'Aggiungi il nome del tuo fanclub!'}`}
                        value={updates.name}
                        onChange={(e) => handleName(e)}
                    />
                    <label className='fsize-xs-1 grey-300 letter-spacing-3 ml-xs-2 mt-xs-4'>{'DESCRIZIONE'}</label>
                    <textarea
                        id={`input-${type.toLowerCase()}`}
                        className='bg-dark-soft white fsize-xs-2 f-w-500 border-radius-04 mt-xs-2 mt-xs-4'
                        type='text'
                        placeholder={`${ updates.description ? updates.description : 'Aggiungi la descrizione del tuo fanclub!'}`}
                        value={updates.description}
                        onChange={(e) => handelDescription(e)}
                        rows="4"
                        style={{ resize: 'none' }}
                    />
                    </>
                    : type === 'PRICING' ?
                    <>
                    <label className='fsize-xs-1 grey-300 letter-spacing-3 ml-xs-2'>{'PREZZO MENSILE'}</label>
                    <p class="fsize-xs-1 grey-300 ml-xs-2">Min €2.99 al mese, max €11.99 al mese</p>
                    <span class="fsize-xs-2 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 bg-green-900 border-radius-04 green-400 align-self-start  mt-xs-2" onClick={() => setRecommendedPricing()}>Imposta consigliato €3.99 al mese</span>
                    <input
                        id={`input-${type.toLowerCase()}`}
                        className='bg-dark-soft white fsize-xs-2 f-w-500 border-radius-04 mt-xs-2 mt-xs-4'
                        type='text'
                        placeholder={`${ updates.pricing ? updates.pricing : 'Aggiungi un prezzo per il tuo fanclub!'}`}
                        value={updates.pricing}
                        onChange={(e) => handlePricing(e)}
                    />
                    </>
                    : type === 'MAX_SUBSCRIBERS' ?
                    <>
                    <div className='d-flex-row align-items-start j-c-space-between w-100 mb-xs-4 mt-xs-2'>
                        <div className='d-flex-column'>
                            <p className='fsize-xs-3 f-w-500'>Limita numero di posti nel fanclub</p>
                            <p className='fsize-xs-1 f-w-300'>Potrai modificare questo limite quando vuoi</p>
                        </div>
                        <div className={`toggle-area ${updates.maxSubscribers !== null ? 'toggle-area-on' : 'toggle-area-off'}`} onClick={handleMaxSubscribersOn}>
                            <div className={`toggle-dot ${updates.maxSubscribers !== null ? 'toggle-on' : 'toggle-off'}`}></div>
                        </div>
                    </div>
                    {updates.maxSubscribers !== null &&
                        <input
                            className='bg-dark-soft white fsize-xs-2 f-w-500 border-radius-04'
                            type='text'
                            placeholder={`${'Numero massimo di iscritti'}`}
                            value={updates.maxSubscribers}
                            onChange={(e) => handleMaxSubscribers(e)}
                        />
                    }
                    </>
                    : <></>
                    }
                </div>
                <Container style='position-fixed bottom-5'>
                    <Button
                        disabled={filledMandatory ? false : true}
                        style={`${filledMandatory ? 'bg-acid-lime dark-900' : 'bg-dark-soft grey-400'} fsize-xs-3 f-w-600 letter-spacing-1`} label='Salva'
                        onClick={() => {if (type === 'PRICING') {updatePricing()} else {updateThisFanclub()}}}
                    />
                </Container>
            </Container>
            {showMessageWhitePoints && 
                <MessageSetPricing price={updates.pricing} onClick={() => updateThisFanclub()}  close={() => setShowMessageWhitePoints(false)} />
            }
        </>
    )
}

export default FanclubSettingsEditRoute