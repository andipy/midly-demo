import { useEffect, useState, useRef, useContext } from "react"
import { useNavigate, Outlet } from "react-router-dom"

import { CurrentArtistContext } from "../contexts/currentArtist.context"
import { FanclubsContext } from '../contexts/fanclubs.context'

import NavbarDismiss from "../components/navbar-dismiss.component"
import Container from "../layout/container.layout"
import Button from "../components/button.component"
import IconEdit from '../images/icons/icon-edit.svg'
import IconPlus from '../images/icons/icon-plus-lime.svg'
import FullPageCenter from "../layout/full-page-center.layout"
import Carousel from "../layout/carousel.layout"
const ConcertCreationRoute = () => {

    //NAVIGATE
    const navigate = useNavigate()

    //FANCLUB
    const { currentArtist } = useContext(CurrentArtistContext)
    const { setFanclubs } = useContext(FanclubsContext)

    //STATE
    const [typeSelected, setTypeSelected] = useState(0)

    useEffect(() => {
        setFile({url: undefined,type: undefined})
        setEventName('')
        setEventDate('')
        setEventPlace('')
        setEventCity('')
        setEventCap('')
        setEventAddress('')
        setEventProvince('')
        setLinks([''])
        setIsPrivate(false)
        setIsPinned(false)
        setTourStops([])

    }, [typeSelected])


    //COVER

    const fileInputRef = useRef(null)
    
    const handleIconClick = () => {
        fileInputRef.current.click()
    }

    const [file, setFile] = useState({
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
                        setErr(true)
                        setErrMsg('Il video deve essere lungo al massimo 5 secondi')
                         return
                    }
                    const videoUrl = URL.createObjectURL(selectedFile)
                    setFile({
                        url: videoUrl,
                        type: fileType
                    })
                }
    
                video.src = URL.createObjectURL(selectedFile)
            }
        }
    }

    //EVENT NAME
    const [eventName, setEventName] = useState('')
    const handleEventName = (e) => {
        e.preventDefault()
        setEventName(e.target.value)
    }

    //EVENT DATE
    const [eventDate, setEventDate] = useState('')
    const [eventDateNotFormatted, setEventDateNotFormatted] = useState('')
    const handleEventDate = (e) => {
        const isoDate = e.target.value
        const [year, month, day] = isoDate.split('-')
        const formattedDate = `${day}-${month}-${year}`
        e.preventDefault()
        setEventDateNotFormatted(e.target.value)
        setEventDate(formattedDate)
    }

    //EVENT PLACE
    const [eventPlace, setEventPlace] = useState('')
    const handleEventPlace = (e) => {
        e.preventDefault()
        setEventPlace(e.target.value)
    }

    //EVENT CITY
    const [eventCity, setEventCity] = useState('')
    const handleEventCity = (e) => {
        e.preventDefault()
        setEventCity(e.target.value)
    }

    //EVENT ADDRESS
    const [eventAddress, setEventAddress] = useState('')
    const handleEventAddress = (e) => {
        e.preventDefault()
        setEventAddress(e.target.value)
    }

    //EVENT CAP
    const [eventCap, setEventCap] = useState('')
    const handleEventCap = (e) => {
        e.preventDefault()
        setEventCap(e.target.value)
    }

    //EVENT PROVINCE
    const [eventProvince, setEventProvince] = useState('')
    const handleEventProvince = (e) => {
        e.preventDefault()
        setEventProvince(e.target.value)
    }
    

    //TICKETS
    const [links, setLinks] = useState([''])

    const handleLinkChange = (index, value) => {
        const updatedLinks = [...links]
        updatedLinks[index] = value
        setLinks(updatedLinks)
    }

    const addNewLink = () => {
        setLinks([...links, ''])
    }

    const handleRemoveLink = (index) => {
        setLinks(prevLinks => prevLinks.filter((_, i) => i !== index))
    }


    //PINNED
    const [isPinned, setIsPinned] = useState(false)
    const handleIsPinned = (e) => {
        e.preventDefault()
        setIsPinned(!isPinned)
    }

    //PRIVATE
    const [isPrivate, setIsPrivate] = useState(false)
    const handleIsPrivate = (e) => {
        e.preventDefault()
        setIsPrivate(!isPrivate)
    }

    //STOPS
    const [tourStops, setTourStops] = useState([])

    const removeTourStop = (index) => {
        setTourStops(tourStops.filter(stop => stop.id !== index))
    }



    //BUTTON ACTIVE
    const [filledMandatory, setFilledMandatory] = useState(false)
    useEffect(() => {
        if (typeSelected === 0) {
            if (file.url === undefined || eventName === '' || eventDate === '' ||  eventPlace === '' ||  eventProvince === '' ||  eventAddress === '' ||  eventCap === '' ||  eventCity === '') {
                setFilledMandatory(false)
            } else {
                setFilledMandatory(true)
            }
        } else {
            if (file.url === undefined || eventName === '' ||  tourStops.length <= 0) {
                setFilledMandatory(false)
            } else {
                setFilledMandatory(true)
            }
        }
        
    }, [eventName, eventDate, file, eventCap, eventProvince, eventPlace, eventAddress, eventCity, links, tourStops])

    
    //PUBBLICAZIONE

    const updateConcerts = () => {
        let currentDate = new Date()
        let newConcertId

        if (typeSelected === 0) { 
            setFanclubs(prevFanclubs =>
                prevFanclubs.map(fanclub => {
                    if (fanclub?.artistId === currentArtist.id) {   
                        newConcertId = fanclub?.concerts.length + 1
                        return {
                            ...fanclub,
                            concerts: [
                                ...fanclub.concerts,
                                {                                    
                                    id: newConcertId,
                                    artistId: currentArtist.id,
                                    publisher: {
                                        type: 'ARTIST',
                                        id: currentArtist.id
                                    },
                                    type: 'CONCERT',
                                    createdAt: currentDate,
                                    cover: {
                                        type: file.type,
                                        url: file.url
                                    },
                                    name: eventName,
                                    date: eventDate,
                                    place: {
                                        mainPlace: eventPlace,
                                        city: eventCity,
                                        address: eventAddress,
                                        province: eventProvince,
                                        zipCode: eventCap
                                    },
                                    buyLinks: links,
                                    settings: {
                                        isPrivate: isPrivate,
                                        isPinned: isPinned,
                                    },
                                    likes: [],
                                    comments: [],
                                    share: {
                                        shareCount: 0,
                                        shareLink: undefined
                                    },
                                    participants: [],
                                    messages: []
                                },
                            ],
                        }
                    }
                    return fanclub
                })
            )

        } else {
            setFanclubs(prevFanclubs =>
                prevFanclubs.map(fanclub => {
                    if (fanclub?.artistId === currentArtist.id) {   
                        newConcertId = fanclub?.concerts.length + 1
                        return {
                            ...fanclub,
                            concerts: [
                                ...fanclub.concerts,
                                {                                    
                                    id: newConcertId,
                                    artistId: currentArtist.id,
                                    publisher: {
                                        type: 'ARTIST',
                                        id: currentArtist.id
                                    },
                                    type: 'TOUR',
                                    createdAt: currentDate,
                                    cover: {
                                        type: file.type,
                                        url: file.url
                                    },
                                    name: eventName,
                                    buyLinks: links,
                                    dates: tourStops,
                                    settings: {
                                        isPrivate: isPrivate,
                                        isPinned: isPinned,
                                    },
                                    likes: [],
                                    comments: [],
                                    share: {
                                        shareCount: 0,
                                        shareLink: undefined
                                    },
                                    participants: [],
                                    messages: []
                                }
                            ],
                        }
                    }
                    return fanclub
                })
            )
        }
        navigate(-1)
    }

    //STOPS DISPLAY
    const getDay = (date) => {
        if ( date ) {
            const [day] = date.split('-')
            return day.padStart(2, '0')
        }
    }

    const getMonth = (date) => {
        if ( date ) {
            const [, month] = date.split('-')
            const monthNames = [
                "GEN", "FEB", "MAR", "APR", "MAG", "GIU", 
                "LUG", "AGO", "SET", "OTT", "NOV", "DIC"
            ]
            return monthNames[parseInt(month, 10) - 1]
        }
    }

    const getYear = (date) => {
        if ( date ) {
            const [, , year] = date.split('-')
            return year
        }
    }



    //ERR VIDEO LENGTH


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

  return (
    <>
            <NavbarDismiss transparent={true} forcedExitPath={-1} clear={() => console.log('Annulla')}/>

            <Container style={'pt-xs-topbar pb-xs-appbar'}>
                <h1 className='fsize-xs-5 f-w-600 mb-xs-4'>Seleziona tipologia</h1>
                <div id='type-select' className="mb-xs-12">
                    <div className="w-100 border-radius-02 bg-dark-soft d-flex-row j-c-start align-items-center pb-xs-4 pt-xs-4 pl-xs-4" onClick={() => setTypeSelected(0)}>
                        <div className="avatar-24 border-lime border-radius-100 mr-xs-4 d-flex-row align-items-center j-c-center">
                            {typeSelected === 0 &&
                                <div className="avatar-16 bg-acid-lime border-radius-100"></div>
                            }   
                        </div>
                        <p className="lime-400 fsize-xs-3 f-w-500">Tappa unica</p>
                    </div>
                    <div className="w-100 border-radius-02 bg-dark-soft d-flex-row j-c-start align-items-center pb-xs-4 pt-xs-4 pl-xs-4 mt-xs-2"onClick={() => setTypeSelected(1)}>
                    <div className="avatar-24 border-lime border-radius-100 mr-xs-4 d-flex-row align-items-center j-c-center">
                            {typeSelected === 1 &&
                                <div className="avatar-16 bg-acid-lime border-radius-100"></div>
                            }   
                        </div>
                        <p className="lime-400 fsize-xs-3 f-w-500">Tour (più tappe)</p>
                    </div>
                </div>
                {typeSelected === 0 ?
                <>
                    <h1 className='fsize-xs-5 f-w-600 mb-xs-4'>Aggiungi le info</h1>
                    {file?.url ?
                        <div className='bg-dark-soft d-flex-row align-items-center j-c-center overflow-all-hidden h-xs-27 gap-0_5em position-relative'>
                            {file.type === 'IMAGE'?
                                <img className='w-100 h-100 object-fit-cover' src={file.url} />
                            : file.type === 'VIDEO' &&
                                <video className='w-100 h-100 object-fit-cover' autoPlay playsInline loop muted>
                                    <source src={file.url} type='video/mp4' />
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
                        <div className='bg-dark-soft d-flex-column align-items-center j-c-center overflow-all-hidden h-xs-27 gap-0_25em position-relative border-radius-02'>
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

                    <input
                        className='bg-dark-soft white fsize-xs-2 f-w-500 border-radius-02 mt-xs-4'
                        type='text'
                        placeholder={`${'Nome evento'}`}
                        value={eventName}
                        onChange={(e) => handleEventName(e)}
                    />
                    <input
                        className='bg-dark-soft white fsize-xs-2 f-w-500 border-radius-02 mt-xs-2'
                        type='date'
                        value={eventDateNotFormatted}
                        onChange={(e) => handleEventDate(e)}
                    />

                    <h1 className='fsize-xs-5 f-w-600 mb-xs-4 mt-xs-12'>Dove</h1>
                    <input
                        className='bg-dark-soft white fsize-xs-2 f-w-500 border-radius-02'
                        type='text'
                        placeholder={`${'Luogo evento (es. "Stadio San Siro")'}`}
                        value={eventPlace}
                        onChange={(e) => handleEventPlace(e)}
                    />
                    <input
                        className='bg-dark-soft white fsize-xs-2 f-w-500 border-radius-02 mt-xs-2'
                        type='text'
                        placeholder={`${'Città'}`}
                        value={eventCity}
                        onChange={(e) => handleEventCity(e)}
                    />
                    <input
                        className='bg-dark-soft white fsize-xs-2 f-w-500 border-radius-02 mt-xs-2'
                        type='text'
                        placeholder={`${'Via e numero'}`}
                        value={eventAddress}
                        onChange={(e) => handleEventAddress(e)}
                    />
                    <input
                        className='bg-dark-soft white fsize-xs-2 f-w-500 border-radius-02 mt-xs-2'
                        type='text'
                        placeholder={`${'CAP'}`}
                        value={eventCap}
                        onChange={(e) => handleEventCap(e)}
                    />
                    <input
                        className='bg-dark-soft white fsize-xs-2 f-w-500 border-radius-02 mt-xs-2'
                        type='text'
                        placeholder={`${'Provincia'}`}
                        value={eventProvince}
                        onChange={(e) => handleEventProvince(e)}
                    />

                    <h1 className='fsize-xs-5 f-w-600 mb-xs-4 mt-xs-12'>Link acquisto biglietti</h1>
                    {links.map((link, index) => (
                        
                        <div className="position-relative d-flex-row align-items-center j-c-center">
                            <input
                            key={index}
                            className='bg-dark-soft white fsize-xs-2 f-w-500 border-radius-02 mt-xs-2'
                            type='text'
                            placeholder='Incolla qui il link'
                            value={link}
                            onChange={(e) => handleLinkChange(index, e.target.value)}
                            />
                            {index > 0 &&
                            <div className="avatar-20 position-absolute-y right-2 bottom-2 bg-black border-radius-100 j-c-center align-items-center d-flex-row" onClick={() => handleRemoveLink(index)}>
                                <p>-</p>
                            </div>
                            }
                        </div>
                    ))}

                    <Button
                        style='bg-black border-lime lime-400 black fsize-xs-3 f-w-600 mt-xs-4'
                        onClick={addNewLink} 
                        label='Aggiungi altro link'
                    />

                    <h1 className='fsize-xs-5 f-w-600 mb-xs-4 mt-xs-12'>Settings del post</h1>

                    <div className='d-flex-row align-items-center j-c-space-between'>
                        <div className='d-flex-column j-start align-items-start'>
                            <p className='fsize-xs-3 f-w-500'>Offusca per gli utenti non abbonati</p>
                            <p className='fsize-xs-1 f-w-300 grey-200'>Per i non abbonati sarà offuscato</p>
                        </div>
                        
                        <div className={`toggle-area ${isPrivate ? 'toggle-area-on' : 'toggle-area-off'}`} onClick={(e) => handleIsPrivate(e)}>
                            <div className={`toggle-dot ${isPrivate ? 'toggle-on' : 'toggle-off'}`}></div>
                        </div>
                    </div>

                    <div className='d-flex-row align-items-center j-c-space-between mt-xs-10 mb-xs-8'>
                        <div className='d-flex-column j-start align-items-start'>
                            <p className='fsize-xs-3 f-w-500'>Contenuto pinnato</p>
                            <p className='fsize-xs-1 f-w-300 grey-200'>Potrai spinnarlo in ogni momento</p>
                        </div>
                        <div className={`toggle-area ${isPinned ? 'toggle-area-on' : 'toggle-area-off'}`} onClick={(e) => handleIsPinned(e)}>
                            <div className={`toggle-dot ${isPinned ? 'toggle-on' : 'toggle-off'}`}></div>
                        </div>
                    </div>
                    
                </>
                :
                <>
                    <h1 className='fsize-xs-5 f-w-600 mb-xs-4'>Descrizione generale</h1>
                    {file?.url ?
                        <div className='bg-dark-soft d-flex-row align-items-center j-c-center overflow-all-hidden h-xs-27 gap-0_5em position-relative'>
                            {file.type === 'IMAGE'?
                                <img className='w-100 h-100 object-fit-cover' src={file.url} />
                            : file.type === 'VIDEO' &&
                                <video className='w-100 h-100 object-fit-cover' autoPlay playsInline loop muted>
                                    <source src={file.url} type='video/mp4' />
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
                        <div className='bg-dark-soft d-flex-column align-items-center j-c-center overflow-all-hidden h-xs-27 gap-0_25em position-relative border-radius-02'>
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

                    <input
                        className='bg-dark-soft white fsize-xs-2 f-w-500 border-radius-02 mt-xs-4'
                        type='text'
                        placeholder={`${'Nome evento'}`}
                        value={eventName}
                        onChange={(e) => handleEventName(e)}
                    />

                    <h1 className='fsize-xs-5 f-w-600 mb-xs-4 mt-xs-12'>Aggiungi ogni tappa</h1>
                    <Carousel>
                    {tourStops.map((stop, index) => (
                        <>
                        {/* <div key={index} className=' position-relative bg-dark-soft white border-radius-02 mt-xs-2 d-flex-row j-c-start align-items-center pt-xs-3 pb-xs-3 pl-xs-2 pr-xs-2' style={{ backgroundImage: `url(${stop.cover.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <div className='position-absolute top-0 left-0 right-0 bottom-0 bg-black-transp60 z-index-1'></div>  
                            <div className="d-flex-row j-c-space-between align-items-center z-index-2">
                                <div className="z-index-2 d-flex-row j-c-start align-items-center gap-1em">
                                    <p className="fsize-xs-2 f-w-500">{stop.date}</p>
                                    <p className="fsize-xs-2 f-w-600">{stop.mainPlace}</p>
                                </div> 
                                <div className="avatar-20 position-absolute-y right-2 bottom-2 bg-black border-radius-100 j-c-center align-items-center d-flex-row" onClick={() => removeTourStop(stop.id)}>
                                    <p>-</p>
                                </div>
                            </div> 
                        </div> */}
                        <div className="d-flex-column j-c-start align-items-start position-relative">
                            <div className="avatar-80 d-flex-row j-c-center align-items-center bg-acid-lime ">
                                <div className='d-flex-column align-items-center j-c-center bg-dark border-radius-04 avatar-80 '>
                                    <p className='fsize-xs-9 line-height-1'>{getDay(stop?.date)}</p>
                                    <p className='fsize-xs-3 line-height-1'>{getMonth(stop?.date)}</p>
                                    <p className='fsize-xs-2 line-height-1'>{getYear(stop?.date)}</p>
                                </div>
                                
                            </div>
                            <div className="avatar-20 bg-dark-gradient position-absolute top-0 right-2 border-radius-100 j-c-center align-items-center d-flex-row" onClick={() => removeTourStop(stop.id)}>
                                    <p>-</p>
                            </div>
                            <p className='grey-100 f-w-400 fsize-xs-1 mt-xs-2'>{stop?.mainPlace}</p>
                        </div>
                        
                        </>   
                    ))}
                    </Carousel>

                    <Button
                        style='bg-black border-lime lime-400 black fsize-xs-3 f-w-600 mt-xs-4'
                        onClick={() => navigate(`/artist-app/concert-creation/add-stop`, { state: { invokedModal: true } })} 
                        label='Aggiungi tappa'
                    />

                    <h1 className='fsize-xs-5 f-w-600 mb-xs-4 mt-xs-12'>Link acquisto biglietti</h1>
                    {links.map((link, index) => (
                        
                        <div className="position-relative d-flex-row align-items-center j-c-center">
                            <input
                            key={index}
                            className='bg-dark-soft white fsize-xs-2 f-w-500 border-radius-02 mt-xs-2'
                            type='text'
                            placeholder='Incolla qui il link'
                            value={link}
                            onChange={(e) => handleLinkChange(index, e.target.value)}
                            />
                            {index > 0 &&
                            <div className="avatar-20 position-absolute-y right-2 bottom-2 bg-black border-radius-100 j-c-center align-items-center d-flex-row" onClick={() => handleRemoveLink(index)}>
                                <p>-</p>
                            </div>
                            }
                        </div>
                    ))}

                    <Button
                        style='bg-black border-lime lime-400 black fsize-xs-3 f-w-600 mt-xs-4'
                        onClick={addNewLink} 
                        label='Aggiungi altro link'
                    />

                    <h1 className='fsize-xs-5 f-w-600 mb-xs-4 mt-xs-12'>Settings del post</h1>

                    <div className='d-flex-row align-items-center j-c-space-between'>
                        <div className='d-flex-column j-start align-items-start'>
                            <p className='fsize-xs-3 f-w-500'>Offusca per gli utenti non abbonati</p>
                            <p className='fsize-xs-1 f-w-300 grey-200'>Per i non abbonati sarà offuscato</p>
                        </div>
                        
                        <div className={`toggle-area ${isPrivate ? 'toggle-area-on' : 'toggle-area-off'}`} onClick={(e) => handleIsPrivate(e)}>
                            <div className={`toggle-dot ${isPrivate ? 'toggle-on' : 'toggle-off'}`}></div>
                        </div>
                    </div>

                    <div className='d-flex-row align-items-center j-c-space-between mt-xs-10 mb-xs-8'>
                        <div className='d-flex-column j-start align-items-start'>
                            <p className='fsize-xs-3 f-w-500'>Contenuto pinnato</p>
                            <p className='fsize-xs-1 f-w-300 grey-200'>Potrai spinnarlo in ogni momento</p>
                        </div>
                        <div className={`toggle-area ${isPinned ? 'toggle-area-on' : 'toggle-area-off'}`} onClick={(e) => handleIsPinned(e)}>
                            <div className={`toggle-dot ${isPinned ? 'toggle-on' : 'toggle-off'}`}></div>
                        </div>
                    </div>

                </>
                }
                
            </Container>

            <div className='position-fixed bottom-0 w-100 pt-xs-4 pb-xs-4 bg-dark'>
                <Container>
                    <Button
                        disabled={filledMandatory ? false : true}
                        style={`${filledMandatory ? 'bg-acid-lime dark-900' : 'bg-dark-soft grey-400'} fsize-xs-3 f-w-600 letter-spacing-1`}
                        onClick={updateConcerts} 
                        label='Pubblica'
                    >
{/*                         <img className="avatar-20" src={IconOk}></img>*/}                    
                    </Button>
                </Container>
            </div>

            {err && 
                <FullPageCenter style='z-index-1100 bg-black-transp70'>
                    <Container style={`centered-popup ${isExiting ? 'fade-out' : ''} position-absolute d-flex-column align-items-center gap-0_5em bg-red-400 border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 `}>
                        <div className='d-flex-column align-items-center j-c-center w-100 pt-xs-2 pb-xs-2 pr-xs-2 pl-xs-2'>
                            <h2 className='fsize-xs-2 f-w-300 t-align-center'>Il video non può superare i 15 secondi di durata</h2>
                        </div>
                    </Container>
	            </FullPageCenter>
            }

            <Outlet context={[tourStops, setTourStops]}/>
        </>
  )
}

export default ConcertCreationRoute