import { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate, useLocation, useOutletContext, Outlet } from 'react-router-dom'

import { FanclubsContext } from '../contexts/fanclubs.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'

import Container from '../layout/container.layout'
import FullScreenModalLayout from '../layout/full-screen-modal.layout'

import Button from '../components/button.component'
import NavbarCommentsModal from '../components/navbar-comments-modal.component'
import FullPageCenter from '../layout/full-page-center.layout'
import Carousel from '../layout/carousel.layout'

import IconCopy from '../images/icons/icon-copy.svg'
import IconEdit from '../images/icons/icon-edit.svg'


const ConcertSettingsRoute = () => {

    const navigate = useNavigate()
    const { state } = useLocation()
    const {fanclubs, setFanclubs} = useContext(FanclubsContext)


    const onClick = () => {
        navigate(-1, { state : { ...state, invokedModal: false }})
    }

    const [post, setPost] = useState({})
    const [links, setLinks] = useState([''])
    const [tourStops, setTourStops] = useState([])

    const fetchThisPost = () => {
        setPost(state)
        setLinks(state.buyLinks)  

        if (state?.type === 'TOUR') {
            setTourStops(state.dates)
        }
    }

    useEffect(() => {
            if (state) {
                fetchThisPost()
            }
    }, [state])


    const handleLinkChange = (index, value) => {
        const updatedLinks = [...links]
        updatedLinks[index] = value
        setLinks(updatedLinks)
    }

    const addNewLink = () => {
        setLinks([...links, ''])
    }

    const handleName = (e) => {
        e.preventDefault()
        setPost(prev => ({
            ...prev,
            name: e.target.value
        }))
    }

    const handleEventPlace = (e) => {
        e.preventDefault()
        setPost(prev => ({
            ...prev,
            place: {
                ...prev.place,
                mainPlace: e.target.value
            }
        }))
    }

    const handleEventCity = (e) => {
        e.preventDefault()
        setPost(prev => ({
            ...prev,
            place: {
                ...prev.place,
                city: e.target.value
            }
        }))
    }

    const handleEventAddress = (e) => {
        e.preventDefault()
        setPost(prev => ({
            ...prev,
            place: {
                ...prev.place,
                address: e.target.value
            }
        }))
    }

    const handleEventCap = (e) => {
        e.preventDefault()
        setPost(prev => ({
            ...prev,
            place: {
                ...prev.place,
                zipCode: e.target.value
            }
        }))
    }

    const handleEventProvince = (e) => {
        e.preventDefault()
        setPost(prev => ({
            ...prev,
            place: {
                ...prev.place,
                province: e.target.value
            }
        }))
    }

    const [eventDateNotFormatted, setEventDateNotFormatted] = useState('')
    const handleEventDate = (e) => {
        const isoDate = e.target.value
        const [year, month, day] = isoDate.split('-')
        const formattedDate = `${day}-${month}-${year}`
        e.preventDefault()
        setEventDateNotFormatted(e.target.value)
        setPost(prev => ({
            ...prev,
            date : formattedDate
        }))
    }

    const handleIsPinned = (e) => {
        e.preventDefault()
        setPost(prev => ({
            ...prev,
            settings: {
                ...prev.settings, 
                isPinned: !post?.settings?.isPinned
            }
        }))
    }
    const handleIsPrivate = (e) => {
        e.preventDefault()
        setPost(prev => ({
            ...prev,
            settings: {
                ...prev.settings, 
                isPrivate: !post?.settings?.isPrivate
            }
        }))
    }

    const updatePosts = () => {
        
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === post.artistId) {
                    return {
                        ...fanclub,
                        concerts: fanclub.concerts.map(elem => {
                            if ( elem.id === post.id ) {
                                if (post?.type === 'CONCERT') {
                                    return {
                                        ...elem,
                                        name: post?.name,
                                        settings: {
                                            isPinned: post?.settings?.isPinned,
                                            isPrivate: post?.settings?.isPrivate
                                        },
                                        buyLinks: links,
                                        place: post.place,
                                        date: post.date
                                    }
                                } else {
                                    return {
                                        ...elem,
                                        name: post?.name,
                                        settings: {
                                            isPinned: post?.settings?.isPinned,
                                            isPrivate: post?.settings?.isPrivate
                                        },
                                        buyLinks: links,
                                    }
                                }
                                
                            }
                            return elem
                        })
                    }
                }
                return fanclub
            })
        )

        navigate(-1)
    }

    const [modal, setModal] = useState(false)

    const deletePost = () => {
        setModal(true)
    }

    const [isExiting, setIsExiting] = useState(false)

    useEffect(() => {
        if (isExiting) {
            const endDelay = setTimeout(() => {
                setModal(false)
                setIsExiting(false)
            }, 400)

            return () => clearTimeout(endDelay)
        }
    }, [isExiting])

    const deletePostConfirmation = () => {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === post.artistId) {
                    return {
                        ...fanclub,
                        concerts: fanclub.concerts.filter(elem => elem.id !== post.id)
                    }
                }
                
                return fanclub
            })
        )
        navigate(-1)
    }

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

  return (
    <FullScreenModalLayout background='bg-dark-soft'>
        <NavbarCommentsModal closeModal={onClick} title={'Impostazioni post'} />
        <Container style=''>
        <div className='mt-xs-10'>
        <h1 className='fsize-xs-5 f-w-600 mb-xs-4 mt-xs-10'>Info generali</h1>
            <label className='fsize-xs-1 grey-300 letter-spacing-3 ml-xs-4'>{'NAME'}</label>
            <input
                id={`input-name`}
                className='bg-dark white fsize-xs-2 f-w-500 white letter-spacing-1 border-radius-02 mt-xs-2'
                type='text'
                placeholder={`${post?.name ? post?.name : 'Scrivi un nome per il tuo live'}`}
                value={post?.name}
                onChange={(e) => handleName(e)}             />
        </div>
        
        {
            post?.type === 'CONCERT' ?
                <>
                    <input
                        className='bg-dark white fsize-xs-2 f-w-500 white letter-spacing-1 border-radius-02 mt-xs-2'
                        type='date'
                        value={eventDateNotFormatted}
                        onChange={(e) => handleEventDate(e)}
                    />
                    <h1 className='fsize-xs-5 f-w-600 mb-xs-4 mt-xs-10'>Dove</h1>
                    <div className=''>
                        <input
                            className='bg-dark white fsize-xs-2 f-w-500 white letter-spacing-1 border-radius-02 mt-xs-2'
                            type='text'
                            placeholder={`${post?.place.mainPlace ? post?.place.mainPlace : 'Luogo evento'}`}
                            value={post?.place.eventPlace}
                            onChange={(e) => handleEventPlace(e)}
                        />
                        <input
                            className='bg-dark white fsize-xs-2 f-w-500 white letter-spacing-1 border-radius-02 mt-xs-2'
                            type='text'
                            placeholder={`${post?.place.city ? post?.place.city : 'Città'}`}
                            value={post?.place.city}
                            onChange={(e) => handleEventCity(e)}
                        />
                        <input
                            className='bg-dark white fsize-xs-2 f-w-500 white letter-spacing-1 border-radius-02 mt-xs-2'
                            type='text'
                            placeholder={`${post?.place.address ? post?.place.adress : 'Indirizzo'}`}
                            value={post?.place.address}
                            onChange={(e) => handleEventAddress(e)}
                        />
                        <input
                            className='bg-dark white fsize-xs-2 f-w-500 white letter-spacing-1 border-radius-02 mt-xs-2'
                            type='text'
                            placeholder={`${post?.place.zipCode ? post?.place.zipCode : 'CAP'}`}
                            value={post?.place.zipCode}
                            onChange={(e) => handleEventCap(e)}
                        />
                        <input
                            className='bg-dark white fsize-xs-2 f-w-500 white letter-spacing-1 border-radius-02 mt-xs-2'
                            type='text'
                            placeholder={`${post?.place.province ? post?.place.province : 'Provincia'}`}
                            value={post?.place.province}
                            onChange={(e) => handleEventProvince(e)}
                        />           
                    </div>
                    <div className='mt-xs-10'>
                    <h1 className='fsize-xs-5 f-w-600 mb-xs-4 mt-xs-10'>Link acquisto biglietti</h1>
                        <label className='fsize-xs-1 grey-300 letter-spacing-3 ml-xs-4'>{'LINK'}</label>
                        {links.map((link, index) => (       
                            <input
                            key={index}
                            className='bg-dark white fsize-xs-2 f-w-500 white letter-spacing-1 border-radius-02 mt-xs-2'
                            type='text'
                            placeholder='Incolla qui il link'
                            value={link}
                            onChange={(e) => handleLinkChange(index, e.target.value)}
                            />
                        ))}

                        <Button
                            style='bg-black border-lime lime-400 black fsize-xs-3 f-w-600 mt-xs-4'
                            onClick={addNewLink} 
                            label='Aggiungi altro link'
                        />
                    </div>
                </>
                :
                <>
                <div className='mt-xs-10'>
                    <h1 className='fsize-xs-5 f-w-600 mb-xs-4 mt-xs-12'>Modifica ogni tappa</h1>
                    <Carousel>
                    {post?.dates?.map((stop, index) => (
                        <>
                        <div className="d-flex-column j-c-start align-items-start ">
                            <div className="avatar-80 d-flex-row j-c-center align-items-center position-relative">
                                <div className='d-flex-column align-items-center j-c-center bg-dark border-radius-04 avatar-80 '>
                                    <p className='fsize-xs-9 line-height-1'>{getDay(stop?.date)}</p>
                                    <p className='fsize-xs-3 line-height-1'>{getMonth(stop?.date)}</p>
                                    <p className='fsize-xs-2 line-height-1'>{getYear(stop?.date)}</p>
                                </div>

                                <div className='overlay-card-followed bg-dark-overlay-card bg-dark d-flex-row j-c-center align-items-center border-radius-04' onClick={() => navigate(`edit-stops`, { state: { invokedModal: true, action: 'EDIT', id: stop?.id, artistId: state?.artistId, postId: state?.id } })} >
                                    <img src={IconEdit}></img>
                                </div>
                                
                            </div>
                            {/* <div className="avatar-20 bg-dark-gradient position-absolute top-0 right-2 border-radius-100 j-c-center align-items-center d-flex-row" onClick={() => removeTourStop(stop.id)}>
                                    <p>-</p>
                            </div> */}
                            <p className='grey-100 f-w-400 fsize-xs-1 mt-xs-2'>{stop?.mainPlace}</p>
                            
                        </div>
                        
                        
                        </>   
                    ))}
                    </Carousel>

                    {/* <Button
                        style='bg-black border-lime lime-400 black fsize-xs-3 f-w-600 mt-xs-4'
                        onClick={() => navigate(`/artist-app/fanclub/edit-post-concert/add-stop`, { state: { invokedModal: true } })} 
                        label='Aggiungi tappa'
                    /> */}

                </div>
                <div className='mt-xs-10'>
                    <h1 className='fsize-xs-5 f-w-600 mb-xs-4 mt-xs-10'>Link acquisto biglietti</h1>
                    <label className='fsize-xs-1 grey-300 letter-spacing-3 ml-xs-4'>{'LINK'}</label>
                    {links.map((link, index) => (       
                        <input
                        key={index}
                        className='bg-dark white fsize-xs-2 f-w-500 white letter-spacing-1 border-radius-02 mt-xs-2'
                        type='text'
                        placeholder='Incolla qui il link'
                        value={link}
                        onChange={(e) => handleLinkChange(index, e.target.value)}
                        />
                    ))}

                    <Button
                        style='bg-black border-lime lime-400 black fsize-xs-3 f-w-600 mt-xs-4'
                        onClick={addNewLink} 
                        label='Aggiungi altro link'
                    />
                </div>
                </>
        }
        <h1 className='fsize-xs-5 f-w-600 mb-xs-4 mt-xs-10'>Impostazioni</h1>
        
        <div className='d-flex-row align-items-center j-c-space-between mt-xs-10'>
            <div className='d-flex-column j-start align-items-start'>
                <p className='fsize-xs-3 f-w-500'>Offusca per gli utenti non abbonati</p>
                <p className='fsize-xs-1 f-w-300 grey-200'>Per i non abbonati sarà offuscato</p>
            </div>
            
            <div
                className={`toggle-area ${post?.settings?.isPrivate ? 'toggle-area-on' : 'toggle-area-off'}`}
                onClick={(e) => handleIsPrivate(e)}
            >
                <div className={`toggle-dot ${post?.settings?.isPrivate ? 'toggle-on' : 'toggle-off'}`}></div>
            </div>
        </div>

        <div className='d-flex-row align-items-center j-c-space-between mt-xs-10 mb-xs-8'>
            <div className='d-flex-column j-start align-items-start'>
                <p className='fsize-xs-3 f-w-500'>Contenuto pinnato</p>
                <p className='fsize-xs-1 f-w-300 grey-200'>Potrai spinnarlo in ogni momento</p>
            </div>
            <div
                className={`toggle-area ${post?.settings?.isPinned ? 'toggle-area-on' : 'toggle-area-off'}`}
                onClick={(e) => handleIsPinned(e)}
            >
                <div className={`toggle-dot ${post?.settings?.isPinned ? 'toggle-on' : 'toggle-off'}`}></div>
            </div>
        </div>
        
        <Button
            style='bg-acid-lime fsize-xs-3 f-w-600 dark-900 letter-spacing-1 mt-xs-4 mb-xs-4'
            onClick={updatePosts}
            label='Salva'
        />
        <Button
            style='fsize-xs-3 f-w-600 letter-spacing-1 border-red-1 red-400 border-radius-04'
            onClick={deletePost}
            label='Elimina post'
        />
        </Container>
        {modal && 
            <FullPageCenter style='z-index-1100 bg-black-transp70'>
                <Container style={`centered-popup position-absolute d-flex-column align-items-center bg-dark-soft-2 border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2  ${isExiting ? 'fade-out' : ''} `}>
                    <div className='d-flex-column align-items-center j-c-center w-100 pt-xs-2 pb-xs-2 pr-xs-2 pl-xs-2'>
                        <h1 className='fsize-xs-3 f-w-500 t-align-center mb-xs-8'>Stai per eliminare definitivamente questo post, l'azione è irreversibile</h1>
                        <Button
                            style='fsize-xs-3 f-w-600 letter-spacing-1 bg-red-300 black border-radius-04'
                            onClick={deletePostConfirmation}
                            label='Elimina definitivamente'
                        />
                        <Button
                            style='fsize-xs-3 f-w-400 letter-spacing-1 bg-grey-500 white border-radius-04 mt-xs-4'
                            onClick={() => setIsExiting(true)}
                            label='Annulla'
                        />
                    </div>
                </Container>
            </FullPageCenter>
        }
        <Outlet context={[tourStops, setTourStops]}/>
        
    </FullScreenModalLayout>

  )
}

export default ConcertSettingsRoute