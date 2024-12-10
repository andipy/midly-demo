import { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { FanclubsContext } from '../contexts/fanclubs.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'

import Button from '../components/button.component'
import NavbarMultistep from '../components/navbar-multistep.component'

import ContainerDefault from '../layout/container-default.layout'
import MessageSetPricing from '../components/message-set-pricing.component'

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
        cover: null,
    })

    useEffect(() => {
        if ( fanclub ) {
            setUpdates(prev => ({
                ...prev,
                name: fanclub.name,
                description: fanclub.description,
                pricing: fanclub.pricing,
                cover: fanclub.cover,
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

    const handelDescription = (e) => {
        e.preventDefault()
        setUpdates(prev => ({
            ...prev,
            description: e.target.value
        }))
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setUpdates(prev => ({
                ...prev,
                cover: imageUrl
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

    const updatePricing = () => {
        setShowMessageWhitePoints(true)
        setWhitePoints(10)
        setMessage('Aggiungi Spotify')
    }


    const updateThisFanclub = () => {
        setFanclubs(prevFanclubs => 
            prevFanclubs.map(fanclub =>
                fanclub.artistId === currentArtist.id
                    ? { ...fanclub, name: updates.name, description: updates.description, cover: updates.cover, pricing: updates.pricing }
                    : fanclub
            )
        )
        navigate('/artist-app/fanclub/settings')
    }
    const labelName = {
        'NAME' : 'NOME',
        'PRICING': 'PREZZO MENSILE',
        'COVER' : 'COVER',
        'DESCRIPTION' : 'DESCRIZIONE'
    }
    const [filledMandatory, setFilledMandatory] = useState(false)

    useEffect(() => { 
        if (type === 'NAME') {
            if (updates.name === fanclub?.name || updates.name ==='') {
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
        if (type === 'COVER') {
            if (updates.cover === fanclub?.cover || updates.cover ===null) {
                setFilledMandatory(false)
            } else {
                setFilledMandatory(true)
            } 
        }
        
        if (type === 'DESCRIPTION') {
            if (updates.description === fanclub?.description || updates.description ==='') {
                setFilledMandatory(false)
            } else {
                setFilledMandatory(true)
            }
        } 
    }, [updates])
    const [showMessageWhitePoints, setShowMessageWhitePoints] = useState(false)
    return (
        <>
            <NavbarMultistep stepNumber={1} totalStepNumber={1} dismissable={true} editable={false} />

            <ContainerDefault containerSpecificStyle='pt-xs-topbar'>
                <div className='mt-xs-8 mb-xs-8 d-flex-column align-items-start j-c-start'>
                    <label className='fsize-xs-1 grey-300 letter-spacing-3 ml-xs-2'>{labelName[type]}</label>
                    {type === 'NAME' ?
                    <input
                        id={`input-${type.toLowerCase()}`}
                        className='bg-dark-soft white fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2 mt-xs-4'
                        type='text'
                        placeholder={`${ updates.name ? updates.name : 'Aggiungi il nome del tuo fanclub!'}`}
                        value={updates.name}
                        onChange={(e) => handleName(e)}
                    />
                    : type === 'DESCRIPTION' ?
                    <textarea
                        id={`input-${type.toLowerCase()}`}
                        className='bg-dark-soft white fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2 mt-xs-4'
                        type='text'
                        placeholder={`${ updates.description ? updates.description : 'Aggiungi la descrizione del tuo fanclub!'}`}
                        value={updates.description}
                        onChange={(e) => handelDescription(e)}
                        rows="4"
                    />
                    : type === 'COVER' ?
                    <>
                    <input
                        id={`input-${type.toLowerCase()}`}
                        className="bg-dark-soft white fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2 mt-xs-4 mb-xs-8"
                        type="file"
                        accept="image/*"
                        placeholder={`${updates.cover ? updates.cover : 'Aggiungi una cover per il tuo fanclub!'}`}
                        onChange={(e) => handleFileChange(e)}
                    />
                    {
                        updates?.cover &&
                        (
                        <div className='position-relative w-100 h-xs-20 mb-xs-4'>
                            <img className='h-inherit w-100 object-fit-cover border-radius-08' src={updates?.cover} />
                        </div> 
                        )
                    }
                    </>
                    : type === 'PRICING' ?
                    <>
                    <p class="fsize-xs-1 grey-300 ml-xs-2">Min €2.99 al mese, max €11.99 al mese</p>
                    <span class="fsize-xs-2 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 bg-green-900 border-radius-04 green-400 align-self-start  mt-xs-2" onClick={() => setRecommendedPricing()}>Imposta consigliato €3.99 al mese</span>
                    <input
                        id={`input-${type.toLowerCase()}`}
                        className='bg-dark-soft white fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2 mt-xs-4'
                        type='text'
                        placeholder={`${ updates.pricing ? updates.pricing : 'Aggiungi un prezzo per il tuo fanclub!'}`}
                        value={updates.pricing}
                        onChange={(e) => handlePricing(e)}
                    />
                    </>
                    : <></>
                    }
                </div>
                <ContainerDefault containerSpecificStyle='position-fixed bottom-5'>
                    <Button
                        disabled={filledMandatory ? false : true}
                        style={`${filledMandatory ? 'bg-acid-lime dark-900' : 'bg-dark-soft grey-400'} fsize-xs-3 f-w-600 letter-spacing-1`} label='Salva'
                        onClick={() => {if (type === 'PRICING') {updatePricing()} else {updateThisFanclub()}}}
                    />
                </ContainerDefault>
            </ContainerDefault>
            {showMessageWhitePoints && 
                <MessageSetPricing price={updates.price} message={message} onClick={() => setShowMessageWhitePoints(false)} />
            }
        </>
    )
}

export default FanclubSettingsEditRoute