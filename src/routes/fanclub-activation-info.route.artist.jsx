
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { CurrentArtistContext } from '../contexts/currentArtist.context'
import { FanclubsContext } from '../contexts/fanclubs.context'

import NavbarMultistep from '../components/navbar-multistep.component'
import Container from '../layout/container.layout'
import Button from '../components/button.component'

import IconEdit from '../images/icons/icon-edit.svg'
// import IconEdit from '../images/icons-comp/edit.icon'
import IconPlus from '../images/icons/icon-plus-lime.svg'
import IconExit from '../images/icons/icon-exit.svg'

const FanclubActivationInfoRoute = () => {
    const navigate = useNavigate()

    const { currentArtist } = useContext(CurrentArtistContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)

    const [name, setName] = useState('')
    const handleName = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }
    const [description, setDescription] = useState('')
    const handleDescription = (e) => {
        e.preventDefault()
        setDescription(e.target.value)
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
                setFile({
                    id: 1,
                    url: imageUrl,
                    type: fileType
                })
            }
            
            if (selectedFile.type.split("/")[0] === 'video') {
                fileType = 'VIDEO'
                const video = document.createElement('video')
                video.preload = 'metadata'
    
                video.onloadedmetadata = () => {
                    window.URL.revokeObjectURL(video.src)
                    const duration = video.duration
    
                    if (duration > 15) {
                        console.log('Il video deve essere massimo di 15 secondi.')
                        return
                    }
                    const videoUrl = URL.createObjectURL(selectedFile)
                    setFile({
                        id: 1,
                        url: videoUrl,
                        type: fileType
                    })
                }
    
                video.src = URL.createObjectURL(selectedFile)
            }
        }
    }

    const [filledMandatory, setFilledMandatory] = useState(false)
    useEffect(() => {
        if ( name === '' || description === '' || file.url === undefined || (isLimited && subscribers === null ) ) {
            setFilledMandatory(false)
        } else {
            setFilledMandatory(true)
        }
    }, [name, description, file, isLimited, subscribers])
    
    useEffect(() => {
        fanclubs.map(fanclub => {
            if ( fanclub.artistId === currentArtist.id ) {
                if ( fanclub.name ) {
                    setName(fanclub.name)
                }
                if ( fanclub.description ) {
                    setDescription(fanclub.description)
                }
                if ( fanclub.cover ) {
                    setFile(fanclub.cover)
                }
                if (fanclub.maxSubscribers) {
                    setSubscribers(fanclub.maxSubscribers)
                }
            }
        })
    }, [fanclubs])

    const updateThisFanclub = () => {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub =>
                fanclub.artistId === currentArtist.id &&
                (fanclub.name !== name || fanclub.description !== description || fanclub.cover.url !== file.url)
                    ? {
                        ...fanclub,
                        name: name,
                        description: description,
                        cover: file,
                        maxSubscribers: subscribers
                    }
                    : fanclub
            )
        )
    }

    const handleSubmit = () => {
        updateThisFanclub()
        navigate('/artist-app/fanclub/activation/pricing')
    }

    

    return (
        <>
        <NavbarMultistep stepNumber={1} totalStepNumber={2} dismissable={true} forcedExitPath={'/artist-app/fanclub'} transparent={true} />

        {file?.url ?
            <div className='bg-dark-soft d-flex-row align-items-center j-c-center overflow-all-hidden h-xs-27 gap-0_5em position-relative'>
                {file.type === 'IMAGE'?
                    <img className='w-100 h-100 object-fit-cover' src={file.url} />
                : file.type === 'VIDEO' &&
                    <video className='w-100 h-100 object-fit-cover' autoPlay playsInline loop muted>
                        <source src={file.url} type='video/mp4' />
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
                <p className='fsize-xs-2 grey-300'>(Immagine o video (max 15s), max 5MB)</p>

                <input
                    className='position-absolute-x-y w-100 h-100 opacity-0'
                    type='file'
                    accept='image/png, image/jpeg, image/jpg, video/mp4, video/mov'
                    onChange={handleFileChange} 
                />
            </div>
        }
        
            <Container style={'d-flex-column gap-0_5em mt-xs-4'}>
                <input
                    className='bg-dark-soft white fsize-xs-2 f-w-500 border-radius-04'
                    type='text'
                    placeholder={`${'Dai un nome al tuo fanclub'}`}
                    value={name}
                    onChange={(e) => handleName(e)}
                />
                <textarea
                    className='bg-dark-soft white fsize-xs-2 f-w-500 border-radius-04'
                    type='text'
                    placeholder={`${'Scrivi una descrizione del tuo fanclub'}`}
                    value={description}
                    onChange={(e) => handleDescription(e)}
                    rows={3}
                    style={{ resize: 'none' }}
                />
                <div className='d-flex-row align-items-start j-c-space-between mb-xs-4 mt-xs-2'>
                    <div className='d-flex-column'>
                        <p className='fsize-xs-3 f-w-500'>Limita numero di posti nel fanclub</p>
                        <p className='fsize-xs-1 f-w-300'>Potrai modificare questo limite quando vuoi</p>
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
            </Container>

            <Container style='position-fixed bottom-5 right-0 left-0'>
                <Button
                    disabled={filledMandatory ? false : true}
                    style={`${filledMandatory ? 'bg-acid-lime dark-900' : 'bg-dark-soft grey-400'} fsize-xs-3 f-w-600 letter-spacing-1`} label='Continua'
                    onClick={() => handleSubmit()}
                />
            </Container>
        </>
    )
}

export default FanclubActivationInfoRoute