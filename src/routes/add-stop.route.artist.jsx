import { useEffect, useRef, useState } from "react"
import { useOutletContext, useNavigate } from "react-router-dom"

import FullScreenModalLayout from "../layout/full-screen-modal.layout"
import NavbarCommentsModal from "../components/navbar-comments-modal.component"
import IconEdit from '../images/icons/icon-edit.svg'
import IconPlus from '../images/icons/icon-plus-lime.svg'
import Container from "../layout/container.layout"
import FullPageCenter from "../layout/full-page-center.layout"
import Button from "../components/button.component"
import IconOk from '../images/icons/icon-ok.svg'


const AddStopRoute = () => {

    //VAR
    const [tourStops, setTourStops] = useOutletContext()
    const navigate = useNavigate()


    //IMAGE

    /* const fileInputRef = useRef(null)
    
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
                setErr(true)
                setErrMsg('Il video deve essere lungo al massimo 5 secondi')        
            }
        }
    } */

    //EVENT DATE
    const [eventDate, setEventDate] = useState('')
    const [eventDateNotFormatted, setEventDateNotFormatted] = useState('')
    const handleEventDate = (e) => {
        const isoDate = e.target.value
        const [year, month, day] = isoDate.split('-')
        const formattedDate = `${day}-${month}-${year}`
        console.log(formattedDate)
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

    //BUTTON ACTIVE
    const [filledMandatory, setFilledMandatory] = useState(false)
    useEffect(() => {
        if (  eventDate === '' ||  eventPlace === '' ||  eventProvince === '' ||  eventAddress === '' ||  eventCap === '' ||  eventCity === '' ) {
            setFilledMandatory(false)
        } else {
            setFilledMandatory(true)
        }
        
    }, [eventDate, eventCap, eventProvince, eventPlace, eventAddress, eventCity])

    //AGGIUNGI TAPPA
    const addTourStop = () => {
        setTourStops([...tourStops, { id: tourStops.length +1, date: eventDate, mainPlace: eventPlace, city: eventCity, address: eventAddress, province: eventProvince, zipCode: eventCap, messages: [] }])
        navigate(-1)
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
    <FullScreenModalLayout background='bg-black'>
        <NavbarCommentsModal closeModal={() => navigate(-1)} title={'Dettagli tappa'} />
        {/* <div className="w-100">
            {file?.url ?
                <div className='bg-dark-soft d-flex-row align-items-center j-c-center overflow-all-hidden h-xs-27 gap-0_5em position-relative'>
                    {file.type === 'IMAGE' &&
                        <img className='w-100 h-100 object-fit-cover' src={file.url} />
                    }
                    <div className='bg-black-transp50 d-flex-row j-c-center align-items-center  border-radius-100 position-absolute bottom-5 right-5 pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 gap-0_25em' onClick={handleIconClick}>
                        <img className='avatar-24' src={IconEdit}/>
                        <span className='fsize-xs-2'>Modifica</span>
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
                    <div className='d-flex-column align-items-center j-c-center gap-0_5em mt-xs-10'>
                        <div className='bg-acid-lime-op-10 d-flex-row j-c-center align-items-center pb-xs-4 pt-xs-4 pl-xs-4 pr-xs-4 border-radius-02'>
                            <img className='avatar-20' src={IconPlus}/>
                        </div>
                        <span className='fsize-xs-2 f-w-500 lime-400'>Aggiungi un'immagine per questa tappa</span>
                    </div>
                    <input
                        className='position-absolute-x-y w-100 h-100 opacity-0'
                        type='file'
                        accept='image/png, image/jpeg, image/jpg, video/mp4, video/mov'
                        onChange={handleFileChange} 
                    />
                </div>
            }

        </div> */}
        <Container style={'pb-xs-appbar mt-xs-2'}>
            <h1 className='fsize-xs-5 f-w-600 mb-xs-4 '>Quando sarà questa tappa?</h1>
            <input
                className='bg-dark-soft white fsize-xs-2 f-w-500 border-radius-02 mt-xs-4'
                type='date'
                placeholder={`${'Data evento'}`}
                value={eventDateNotFormatted}
                onChange={(e) => handleEventDate(e)}
            />
            <h1 className='fsize-xs-5 f-w-600 mb-xs-4 mt-xs-12'>Dove sarà questa tappa?</h1>
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
            
            
                
        </Container>
        <div className='position-fixed bottom-0 w-100 pt-xs-4 pb-xs-4 bg-dark'>
                <Container>
                    <Button
                        disabled={filledMandatory ? false : true}
                        style={`${filledMandatory ? 'bg-acid-lime dark-900' : 'bg-dark-soft grey-400'} fsize-xs-3 f-w-600 letter-spacing-1`}
                        onClick={addTourStop} 
                        label='Aggiungi tappa'
                    >
                        {/* <img className="avatar-20" src={IconOk}></img> */}
                    </Button>
                </Container>
            </div>
                    

        {err && 
            <FullPageCenter style='z-index-1100 bg-black-transp70'>
                <Container style={`centered-popup ${isExiting ? 'fade-out' : ''} position-absolute d-flex-column align-items-center gap-0_5em bg-red-400 border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 `}>
                    <div className='d-flex-column align-items-center j-c-center w-100 pt-xs-2 pb-xs-2 pr-xs-2 pl-xs-2'>
                        <h2 className='fsize-xs-2 f-w-300 t-align-center'>Seleziona un'immagine</h2>
                    </div>
                </Container>
	        </FullPageCenter>
        }
                
    </FullScreenModalLayout>
  )
}

export default AddStopRoute