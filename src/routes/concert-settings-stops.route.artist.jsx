import { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate, useLocation, useOutletContext, Outlet } from 'react-router-dom'

import { FanclubsContext } from '../contexts/fanclubs.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'


import NavbarCommentsModal from "../components/navbar-comments-modal.component"
import FullScreenModalLayout from "../layout/full-screen-modal.layout"
import Container from '../layout/container.layout'
import Button from '../components/button.component'

const ConcertSettingsStopsRoute = () => {
    const navigate = useNavigate()
    const { state } = useLocation()
    const {fanclubs, setFanclubs} = useContext(FanclubsContext)
    
    const fetchThisPost = () => {
        if (state?.action === 'EDIT') {
            fetchTourStops()
        }
    }

    useEffect(() => {
        if (state) {
            fetchThisPost()
        }
    }, [state])

    const [tourStops, setTourStops] = useState([])
    const [stop, setStop] = useState()
    const [post, setPost] = useState()
    const fetchTourStops = () => {
        fanclubs.map(fanclub => {
            if (fanclub.artistId === state?.artistId) {
                return {
                    ...fanclub,
                    concerts: fanclub.concerts.map(elem => {
                        if ( elem.id === state?.postId ) {
                            setPost(elem)
                            setTourStops(elem.dates)
                            const selectedStop = elem.dates.find(stop => stop.id === state?.id)
                            setStop(selectedStop)
                        }
                        return elem
                    })
                }
            }
            return fanclub
        })
    }

    const onClick = () => {
        let concert
        fanclubs.map(fanclub => {
            if (fanclub.artistId === state?.artistId) {
                return {
                    ...fanclub,
                    concerts: fanclub.concerts.map(elem => {
                        if ( elem.id === state?.postId ) {
                            concert = elem
                        }
                        return elem
                    })
                }
            }
            return fanclub
        })
        console.log(concert)
        navigate(`/artist-app/fanclub/edit-post-concert/${state?.postId}`, { state: { ...concert, invokedModal: true } })
    }

    const handleEventPlace = (e) => {
        e.preventDefault()
        setStop(prev => ({
            ...prev,
            mainPlace: e.target.value
        }))
    }

    const handleEventCity = (e) => {
        e.preventDefault()
        setStop(prev => ({
            ...prev,
            city: e.target.value
        }))
    }

    const handleEventAddress = (e) => {
        e.preventDefault()
        setStop(prev => ({
            ...prev,
            address: e.target.value
        }))
    }

    const handleEventCap = (e) => {
        e.preventDefault()
        setStop(prev => ({
            ...prev,
            zipCode: e.target.value
        }))
    }

    const handleEventProvince = (e) => {
        e.preventDefault()
        setStop(prev => ({
            ...prev,
            province: e.target.value
        }))
    }

    const [eventDateNotFormatted, setEventDateNotFormatted] = useState('')
    const handleEventDate = (e) => {
        const isoDate = e.target.value
        const [year, month, day] = isoDate.split('-')
        const formattedDate = `${day}-${month}-${year}`
        console.log(formattedDate)
        e.preventDefault()
        setEventDateNotFormatted(e.target.value)
        setStop(prev => ({
            ...prev,
            date: formattedDate
        }))
    }

    useEffect(() => {
        setTourStops((tourStops) =>
            tourStops.map((ts) => {
              if (ts.id === state?.id) {
                return {
                    ...ts,
                    address: stop?.address,
                    city: stop?.city,
                    mainPlace: stop?.mainPlace,
                    zipCode: stop?.zipCode,
                    province: stop?.province,
                    date: stop?.date

                }
              }
              return ts
            })
        )
    }, [stop])

    const updatePost = () => {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === state?.artistId) {
                    return {
                        ...fanclub,
                        concerts: fanclub.concerts.map(elem => {
                            if ( elem.id === state?.postId ) {
                                return {
                                    ...elem,
                                    dates: tourStops
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
    const deleteStop = () => {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === state?.artistId) {
                    return {
                        ...fanclub,
                        concerts: fanclub.concerts.map(elem => {
                            if (elem.id === state?.postId) {
                                const updatedDates = elem.dates.filter(date => date.id !== state?.id)
                                return {
                                    ...elem,
                                    dates: updatedDates
                                }
                            }
                            return elem
                        })
                    }
                }
                return fanclub
            })
        )
        onClick()
    }
  return (
    <FullScreenModalLayout background='bg-dark-soft'>
        <NavbarCommentsModal closeModal={onClick} title={'Impostazioni data'} />
        <Container>
        <div className='mt-xs-10'>
        <h1 className='fsize-xs-5 f-w-600 mb-xs-4 mt-xs-10'>Info generali</h1>
            <label className='fsize-xs-1 grey-300 letter-spacing-3 ml-xs-4'>{'QUANDO'}</label>
                <input
                className='bg-dark white fsize-xs-2 f-w-500 white letter-spacing-1 border-radius-02 mt-xs-2'
                type='date'
                value={eventDateNotFormatted}
                onChange={(e) => handleEventDate(e)}
            />             
        </div>
        
        <h1 className='fsize-xs-5 f-w-600 mb-xs-4 mt-xs-10'>Dove</h1>
        <div className=''>
            <input
                className='bg-dark white fsize-xs-2 f-w-500 white letter-spacing-1 border-radius-02 mt-xs-2'
                type='text'
                placeholder={`${stop?.mainPlace ? stop?.mainPlace : 'Luogo evento'}`}
                value={stop?.mainPlace}
                onChange={(e) => handleEventPlace(e)}
            />
            <input
                className='bg-dark white fsize-xs-2 f-w-500 white letter-spacing-1 border-radius-02 mt-xs-2'
                type='text'
                placeholder={`${stop?.city ? stop?.city : 'Città'}`}
                value={stop?.city}
                onChange={(e) => handleEventCity(e)}
            />
            <input
                className='bg-dark white fsize-xs-2 f-w-500 white letter-spacing-1 border-radius-02 mt-xs-2'
                type='text'
                placeholder={`${stop?.address ? stop?.adress : 'Indirizzo'}`}
                value={stop?.address}
                onChange={(e) => handleEventAddress(e)}
            />
            <input
                className='bg-dark white fsize-xs-2 f-w-500 white letter-spacing-1 border-radius-02 mt-xs-2'
                type='text'
                placeholder={`${stop?.zipCode ? stop?.zipCode : 'CAP'}`}
                value={stop?.zipCode}
                onChange={(e) => handleEventCap(e)}
            />
            <input
                className='bg-dark white fsize-xs-2 f-w-500 white letter-spacing-1 border-radius-02 mt-xs-2'
                type='text'
                placeholder={`${stop?.province ? stop?.province : 'Provincia'}`}
                value={stop?.province}
                onChange={(e) => handleEventProvince(e)}
            />           
        </div>
        

        <Button
            style='bg-acid-lime fsize-xs-3 f-w-600 dark-900 letter-spacing-1 mt-xs-4 mb-xs-4'
            onClick={updatePost}
            label='Salva'
        />
        <Button
            style='fsize-xs-3 f-w-600 letter-spacing-1 border-red-1 red-400 border-radius-04'
            onClick={deleteStop}
            label='Elimina tappa'
        />
        </Container>
        

    </FullScreenModalLayout>
  )
}

export default ConcertSettingsStopsRoute