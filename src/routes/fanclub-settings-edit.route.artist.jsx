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
    })

    useEffect(() => {
        if ( fanclub ) {
            setUpdates(prev => ({
                ...prev,
                name: fanclub.name,
                description: fanclub.description,
                pricing: fanclub.pricing,
            }))

            setFile(prev => ({
                ...prev,
                id: fanclub.cover.id,
                url: fanclub.cover.url,
                type: fanclub.cover.type,
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

    const [file, setFile] = useState({
            id: undefined,
            url: undefined,
            type: undefined
        })
    const handleFileChange = (e) => {
        const selectedfile = e.target.files[0]
        if (selectedfile) {
                let fileType
                if ( selectedfile.type.split("/")[0] === 'image' ) {
                    fileType = 'IMAGE'
                }
                if ( selectedfile.type.split("/")[0] === 'video' ) {
                    fileType = 'VIDEO'
                }
                const imageUrl = URL.createObjectURL(selectedfile)
                setFile({
                    id: 1,
                    url: imageUrl,
                    type: fileType
                })
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
    }


    const updateThisFanclub = () => {
        setFanclubs(prevFanclubs => 
            prevFanclubs.map(fanclub =>
                fanclub.artistId === currentArtist.id
                    ? { ...fanclub, name: updates.name, description: updates.description, cover: file, pricing: updates.pricing }
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
            console.log(file.url)
            if (file.url === fanclub?.cover.url  ||file.url === undefined) {
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
    }, [updates, file])
    const [showMessageWhitePoints, setShowMessageWhitePoints] = useState(false)
    return (
        <>
            <NavbarMultistep stepNumber={1} totalStepNumber={1} dismissable={true} editable={false} transparent={true}/>

            {type === 'COVER' &&
                    <>
                    {file?.url ?
                        <div className='bg-dark-soft d-flex-row align-items-center j-c-center overflow-all-hidden h-xs-27 gap-0_5em position-relative w-100'>
                            {file.type === 'IMAGE'?
                                <img className='w-100 h-100 object-fit-cover' src={file?.url} />
                            : file.type === 'VIDEO' &&
                                <video className='w-100 h-100 object-fit-cover' autoPlay playsInline loop muted>
                                    <source src={file?.url} type='video/mp4' />
                                </video>
                            }
                            <div className='bg-black-transp50 d-flex-row j-c-center align-items-center  border-radius-04 position-absolute bottom-5 right-5 pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 gap-0_25em' onClick={() => setFile({})}>
                                <img className='avatar-24' src={IconEdit}/>
                                <span className='fsize-xs-2'>Modifica</span>
                                {/* <IconEdit size={32} viewBox={32} color='white' strokeWidth={2} /> */}
                            </div>
                        </div>
                    : 
                        <div className='bg-dark-soft d-flex-column align-items-center j-c-center overflow-all-hidden h-xs-27 gap-0_25em position-relative'>
                            <div className='d-flex-row align-items-center j-c-center gap-0_5em mt-xs-10'>
                                <div className='bg-acid-lime-op-10 d-flex-row j-c-center align-items-center pb-xs-4 pt-xs-4 pl-xs-4 pr-xs-4 border-radius-02'>
                                    <img className='avatar-20' src={IconPlus}/>
                                </div>
                                <span className='fsize-xs-2 f-w-500 lime-400 no-shrink'>Aggiungi una cover</span>
                            </div>
                            <p className='fsize-xs-2 grey-300'>(Immagine o video, max 5MB)</p>

                            <input
                                className='position-absolute-x-y w-100 h-100 opacity-0'
                                type='file'
                                accept='image/png, image/jpeg, image/jpg, video/mp4, video/mov'
                                onChange={handleFileChange} 
                            />
                        </div>
                    }
            </>
            }
            <Container style='pt-xs-topbar'>
                <div className='mt-xs-8 mb-xs-8 d-flex-column align-items-start j-c-start'>
                    {type !== 'COVER' &&<label className='fsize-xs-1 grey-300 letter-spacing-3 ml-xs-2'>{labelName[type]}</label>}
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
                        style={{ resize: 'none' }}
                    />
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