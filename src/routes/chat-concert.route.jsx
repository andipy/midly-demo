import { useLocation } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { CurrentFanContext } from '../contexts/currentFan.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'
import { FanclubsContext } from '../contexts/fanclubs.context'
import { ArtistsContext } from '../contexts/artists.context'
import NavbarConcertChat from '../components/navbar-concert-chat.component'
import Textbar from '../components/textbar.component'
import Container from '../layout/container.layout'
import CountdownConcert from '../components/countdown-concert.component'
import MessageChatConcert from '../components/message-chat-concert.component'
import FullPageCenter from '../layout/full-page-center.layout'

const ChatConcertRoute = () => {

    const location = useLocation()
    const { pathname } = useLocation()
    const { state } = location
    const { artistId, id, dateId } = state || {}
    const { currentFan } = useContext(CurrentFanContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)
    const { currentArtist } = useContext(CurrentArtistContext)
    const { artists } = useContext(ArtistsContext)

    const [concert, setConcert] = useState()
    useEffect(() =>{
        if (dateId) {
            const foundFanclub = fanclubs?.find(fanclub => fanclub?.artistId === artistId)
            const foundConcert = foundFanclub?.concerts.find(concert => concert?.id === id)
            const foundDate = foundConcert?.dates.find(date => date?.id === dateId)
            setConcert(foundDate)
        } else {
            const foundFanclub = fanclubs?.find(fanclub => fanclub?.artistId === artistId)
            const foundConcert = foundFanclub?.concerts.find(concert => concert?.id === id)
            setConcert(foundConcert)
        }
    }, [id, fanclubs, dateId])

    const [artist, setArtist] = useState()
    useEffect(() =>{
        const foundArtist = artists.find(artist => artist.id === artistId)
        setArtist(foundArtist)
    }, [id])

    // const formatDate = (date) => {
    //     const months = [
    //         "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", 
    //         "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
    //     ]

    //     if ( date ) {
    //         const [day, month, year] = date?.split('-')
    //         const formattedDay = day.startsWith('0') ? day.slice(1) : day
    //         const monthName = months[parseInt(month, 10) - 1]
    //         return `${formattedDay} ${monthName} ${year}`
    //     }   
    // }

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

    const [currentComment, setCurrentComment] = useState({
        type: 'COMMENT',
        userId: undefined,
        userType: undefined,
        content: '',
        username: '',
        userImage: undefined,
        createdAt: undefined,
        id: undefined
    })

    useEffect(() => {
        pathname.includes('/artist-app') ?
            setCurrentComment(prev => ({
                ...prev,
                userType: 'artist',
                userId: currentArtist?.id,
                userImage: currentArtist?.image,
                username: currentArtist?.artistName
            }))
        : setCurrentComment(prev => ({
            ...prev,
            userType: 'fan',
            userId: currentFan?.id,
            userImage: currentFan?.image,
            username: currentFan?.username
        }))

    }, [])

    const handleCurrentComment = (e) => {
        e.preventDefault()
        let messagesNumber
        let currentDate = new Date()
        let date = currentDate.toISOString().split('T')[0]
        fanclubs.map(fanclub => {
            if (fanclub.artistId === artistId) {
                fanclub.concerts.map(c => {
                    if (c.id === concert.id) {
                        messagesNumber = c.messages.length + 1
                    }
                })
            }
        })

        setCurrentComment(prev => ({
            ...prev,
            id: messagesNumber,
            createdAt: date,
            content: e.target.value
        }))
    }

    const handleSubmitComment = (e) => {
        e.preventDefault()
        if ( currentComment.comment !== '' ) { 
            setFanclubs(prevFanclubs =>
                prevFanclubs.map(fanclub => {
                    if (fanclub.artistId === artistId) {
                        return {
                            ...fanclub,
                            concerts: fanclub.concerts.map(c => {
                                if (c.id === id) {
                                    if (dateId) {
                                        return {
                                            ...c,
                                            dates: c.dates.map(date => {
                                                if (date.id === dateId) {
                                                    return {
                                                        ...date,
                                                        messages: [...date.messages, currentComment]
                                                    }
                                                }
                                                return date
                                            })
                                        };
                                    } else {
                                        return {
                                            ...c,
                                            messages: [...c.messages, currentComment]
                                        }
                                    }
                                }
                                return c
                            })
                        }
                    }
                    return fanclub
                })
            )
        }
        
        setCurrentComment(prev => ({
            ...prev,
            id: undefined,
            createdAt: undefined,
            content: ''
        }))
    }

    const [chatOpen, setChatOpen] = useState(true)
    const closeModal = () => {
        setChatOpen(false)
    }

    return (
        <>
            {
                dateId ? 
                <NavbarConcertChat id={artistId} concertId={id} dateId={dateId}/>
                :
                <NavbarConcertChat id={artistId} concertId={id} />
            }
            

            <div className='w-100 pt-xs-topbar z-index-999'>
                <div className='w-100 d-flex-column j-c-center align-items-center  bg-acid-lime pt-xs-2 pb-xs-2'>
                    <Container style='d-flex-row gap-0_5em'>
                        <div className='d-flex-column align-items-center j-c-center bg-dark border-radius-04 avatar-80'>
                            <p className='fsize-xs-9 line-height-1'>{getDay(concert?.date)}</p>
                            <p className='fsize-xs-3 line-height-1'>{getMonth(concert?.date)}</p>
                            <p className='fsize-xs-2 line-height-1'>{getYear(concert?.date)}</p>
                        </div>
                        <div className='d-flex-column align-items-start j-c-center'>
                            <p className='fsize-xs-5 f-w-700 black'>{artist?.artistName}</p>
                            {dateId ?
                                <p className='fsize-xs-5 f-w-700 black'>{concert?.mainPlace}</p>
                                :
                                <p className='fsize-xs-5 f-w-700 black'>{concert?.place.mainPlace}</p>
                            }
                        </div>
                        {/* <CountdownConcert date ={concert?.date}/> */}
                    </Container>
                </div>
            </div>

            {!pathname.includes('/artist-app/') && 
                <Container style='pt-xs-8 pb-xs-appbar'>
                    {concert?.messages && concert?.messages.length > 0 ?
                        concert?.messages.map((mess, index) => (
                            <MessageChatConcert 
                                message={mess}
                                currentUserId={currentFan?.id}
                            />
                        ))
                    :
                        <FullPageCenter>
                            <h3 className='t-align-center grey-200 fsize-xs-6 f-w-400 w-80 line-height-140'>Avvia la chat!</h3>
                        </FullPageCenter>
                    }
                </Container>
            }

            {pathname.includes('/artist-app/') && 
                <Container style='mt-xs-4 pb-xs-appbar'>
                    {concert?.messages && concert?.messages.length > 0 ?
                        concert?.messages.map((mess, index) => (
                            <MessageChatConcert 
                                message={mess}
                                currentUserId={currentArtist?.id}
                            />
                        ))
                    :
                        <FullPageCenter>
                            <h3 className='t-align-center grey-200 fsize-xs-6 f-w-400 w-80 line-height-140'>Avvia la chat!</h3>
                        </FullPageCenter>
                    }
                </Container>
            }
            
            <div className='position-fixed bg-dark-soft bottom-0 w-100 z-index-5 border-radius-top-08 shadow-dark-750'>
                <Textbar
                    onClick={() => setChatOpen(true)}
                    currentComment={currentComment}
                    handleCurrentComment={handleCurrentComment}
                    handleSubmitComment={handleSubmitComment} 
                />
            </div>
        </>
    )
}

export default ChatConcertRoute