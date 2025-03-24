import { useState, useEffect, useContext, useRef } from 'react'
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
import FullPageCenter from '../layout/full-page-center.layout'

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
        cover: {id: null, url: null, type: null}
    })

    useEffect(() => {
        if ( fanclub ) {
            setUpdates(prev => ({
                ...prev,
                name: fanclub.name,
                description: fanclub.description,
                pricing: fanclub.pricing,
                maxSubscribers: fanclub.maxSubscribers,
                cover: {id: fanclub.cover.id, url: fanclub.cover.url, type: fanclub.cover.type}
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

    const [file, setFile] = useState({
        id: undefined,
        url: undefined,
        type: undefined
    })
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        
        if (selectedFile) {
            let fileType = ''
            if (selectedFile.type.split("/")[0] === 'image') {
                fileType = 'IMAGE'
                const imageUrl = URL.createObjectURL(selectedFile)
                setUpdates(prev => ({
                    ...prev,
                    cover: { id: 1,
                        url: imageUrl,
                        type: fileType
                    }
                }))
            }
            
            if (selectedFile.type.split("/")[0] === 'video') {
                fileType = 'VIDEO'
                const video = document.createElement('video')
                video.preload = 'metadata'
    
                video.onloadedmetadata = () => {
                    window.URL.revokeObjectURL(video.src)
                    const duration = video.duration
    
                    if (duration > 15) {
                        setErr(true)
                        setErrMsg('Il video deve essere lungo al massimo 5 secondi')
                         return
                    }
                    const videoUrl = URL.createObjectURL(selectedFile)
                    setUpdates(prev => ({
                        ...prev,
                        cover: { 
                            id: 1,
                            url: videoUrl,
                            type: fileType
                        }
                    }))
                }
    
                video.src = URL.createObjectURL(selectedFile)
            }
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
                    ? { ...fanclub, name: updates.name, description: updates.description, pricing: updates.pricing, maxSubscribers: updates.maxSubscribers, cover :{id: updates.cover.id, url: updates.cover.url, type: updates.cover.type} }
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
        if (type === 'NAME_DESCRIPTION' || type === 'ALL') {
            if ((updates.name === fanclub?.name || updates.name === '') && 
                (updates.description === fanclub?.description || updates.description === '')) {
                setFilledMandatory(false);
            } else {
                setFilledMandatory(true);
            }
        }
        
        if (type === 'PRICING' || type === 'ALL') {
            if (updates.pricing === fanclub?.pricing || updates.pricing === null) {
                setFilledMandatory(false);
            } else {
                const pricingValue = parseFloat(updates.pricing);
                if (pricingValue >= 2.99 && pricingValue <= 11.99) {
                    setFilledMandatory(true);
                } else {
                    setFilledMandatory(false);
                }
            }
        }
        
        if (type === 'MAX_SUBSCRIBERS' || type === 'ALL') {
            if (updates.maxSubscribers === null || (updates.maxSubscribers !== null && updates.maxSubscribers > 0)) {
                setFilledMandatory(true);
            } else {
                setFilledMandatory(false);
            }
        }

    }, [updates])

    
const fileInputRef = useRef(null)

    const handleIconClick = () => {
        fileInputRef.current.click()
    }

    const [err, setErr] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    const [isExiting, setIsExiting] = useState(false)

    useEffect(() => {
        if (err) {
            const exitDelay = setTimeout(() => {
                setIsExiting(true)
            }, 1000)

            return () => clearTimeout(exitDelay)
        }
    }, [err])

    useEffect(() => {
        if (isExiting) {
            const endDelay = setTimeout(() => {
                setErr(false)
                setIsExiting(false)
            }, 400)

            return () => clearTimeout(endDelay)
        }
    }, [isExiting])

    const [showMessageWhitePoints, setShowMessageWhitePoints] = useState(false)
    return (
        <>
            
            <NavbarMultistep stepNumber={1} totalStepNumber={1} dismissable={true} editable={false} transparent={true}/>
            <Container style={`pb-xs-appbar ${type === 'ALL' ? '' : 'pt-xs-topbar'}`}>
                <div className='mb-xs-8 d-flex-column align-items-start j-c-start'>
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
                    : type === 'ALL' ?
                    <>
                    {updates?.cover.url ?
                        <div className='bg-dark-soft d-flex-row align-items-center j-c-center overflow-all-hidden h-xs-27 gap-0_5em position-relative image-wrapper w-100vw'>
                            {updates?.cover.type === 'IMAGE'?
                                <img className='w-100 h-100 object-fit-cover' src={updates?.cover.url} />
                            : updates?.cover.type === 'VIDEO' &&
                                <video className='w-100 h-100 object-fit-cover' autoPlay playsInline loop muted>
                                    <source src={updates?.cover.url} type='video/mp4' />
                                </video>
                            }
                            <div className='bg-black-transp50 d-flex-row j-c-center align-items-center  border-radius-100 position-absolute bottom-5 right-5 pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 gap-0_25em' onClick={handleIconClick}>
                                <img className='avatar-24' src={IconEdit}/>
                                <span className='fsize-xs-2'>Modifica</span>
                                {/* <IconEdit size={32} viewBox={32} color='white' strokeWidth={2} /> */}
                            </div>
                            <input
                                className='d-none'
                                type='file'
                                ref={fileInputRef}
                                accept='image/png, image/jpeg, image/jpg, video/mp4, video/mov'
                                onChange={handleFileChange} 
                            />
                        </div>
                        
                    : 
                        <div className='bg-dark-soft d-flex-column align-items-center j-c-center overflow-all-hidden h-xs-27 gap-0_25em position-relative'>
                            <div className='d-flex-row align-items-center j-c-center gap-0_5em mt-xs-10'>
                                <div className='bg-acid-lime-op-10 d-flex-row j-c-center align-items-center pb-xs-4 pt-xs-4 pl-xs-4 pr-xs-4 border-radius-02'>
                                    <img className='avatar-20' src={IconPlus}/>
                                </div>
                                <span className='fsize-xs-2 f-w-500 lime-400 no-shrink'>Aggiungi una cover</span>
                            </div>
                            <p className='fsize-xs-2 grey-300'>(Immagine o video (max 15s), max 5MB)</p>
            
                            <input
                                className='position-absolute-x-y w-100 h-100 opacity-0'
                                type='file'
                                accept='image/png, image/jpeg, image/jpg, video/mp4, video/mov'
                                onChange={handleFileChange} 
                            />
                        </div>
                    }
                    <label className='fsize-xs-1 grey-300 letter-spacing-3 ml-xs-2 mt-xs-4'>{'NOME'}</label>
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
                    <label className='fsize-xs-1 grey-300 letter-spacing-3 ml-xs- mt-xs-4'>{'PREZZO MENSILE'}</label>
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
                    <div className='d-flex-row align-items-start j-c-space-between w-100 mb-xs-4 mt-xs-4'>
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
                            className='bg-dark-soft white fsize-xs-2 f-w-500 border-radius-04 mb-xs-20'
                            type='text'
                            placeholder={`${'Numero massimo di iscritti'}`}
                            value={updates.maxSubscribers}
                            onChange={(e) => handleMaxSubscribers(e)}
                        />
                    }
                    </>
                    : 
                    <></>
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
            {err && 
                <FullPageCenter style='z-index-1100 bg-black-transp70'>
                    <Container style={`centered-popup ${isExiting ? 'fade-out' : ''} position-absolute d-flex-column align-items-center gap-0_5em bg-red-400 border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 `}>
                        <div className='d-flex-column align-items-center j-c-center w-100 pt-xs-2 pb-xs-2 pr-xs-2 pl-xs-2'>
                            <h2 className='fsize-xs-2 f-w-300 t-align-center'>Il video non può superare i 15 secondi di durata</h2>
                        </div>
                    </Container>
	            </FullPageCenter>
            }
        </>
    )
}

export default FanclubSettingsEditRoute