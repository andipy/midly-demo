import { useLocation } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { CurrentFanContext } from '../contexts/currentFan.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'
import { FanclubsContext } from '../contexts/fanclubs.context'
import NavbarConcertChat from '../components/navbar-concert-chat.component'
import Textbar from '../components/textbar.component'
import Container from '../layout/container.layout'
import CountdownConcert from '../components/countdown-concert.component'
import MessageChatConcert from '../components/message-chat-concert.component'
import FullPageCenter from '../layout/full-page-center.layout'

const ChatConcertRoute =() => {

    const location = useLocation();
    const { pathname } = useLocation()
    const { artistId, id } = location.state || {}
    const { currentFan } = useContext(CurrentFanContext)
    const {fanclubs, setFanclubs} = useContext(FanclubsContext)
    const { currentArtist } = useContext(CurrentArtistContext)

    const [concert, setConcert] = useState()
    useEffect(() =>{
        const foundFanclub = fanclubs?.find(fanclub => fanclub?.artistId === artistId)
        const foundConcert = foundFanclub?.concerts.find(concert => concert?.id === id)
        setConcert(foundConcert)
    }, [id, fanclubs])

    

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
                                if (c.id === concert.id) {
                                    return {
                                        ...c,
                                        messages: [...c.messages, currentComment]
                                    };
                                }
                                return c
                            })
                        };
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
        <NavbarConcertChat id={artistId} concertId={id}/>
       {/*  <Container style={'pt-xs-topbar d-flex-column align-items-center j-c-center'}>
            <CountdownConcert date ={concert?.date}/>
        </Container> */}
        <div className='w-100 d-flex-row j-c-center align-items-center bg-black pt-xs-topbar position-fixed z-index-999'>
            <CountdownConcert date ={concert?.date}/>
        </div>
            {!pathname.includes('/artist-app/') && 
                <Container style={'pt-xs-32 pb-xs-appbar'}>
                    {concert?.messages && concert?.messages.length > 0 ? (
                        concert?.messages.map((mess, index) => (
                            <MessageChatConcert 
                                message={mess}
                                currentUserId={currentFan?.id}
                            />
                        ))
                    ) : (
                        <p className="no-messages">Nessun messaggio disponibile.</p>
                    )}
                </Container>
            }
            {pathname.includes('/artist-app/') && 
                <Container style={'pt-xs-32 pb-xs-appbar'}>
                    {concert?.messages && concert?.messages.length > 0 ? (
                        concert?.messages.map((mess, index) => (
                            <MessageChatConcert 
                                message={mess}
                                currentUserId={currentArtist?.id}
                            />
                        ))
                    ) : (
                        <FullPageCenter>
                            <h3 className='t-align-center grey-200 fsize-xs-6 f-w-400 w-80 line-height-140'>Avvia la chat!</h3>
                        </FullPageCenter>
                        
                    )}
                </Container>
            }
        
        <div className={`position-fixed bg-dark-soft bottom-0 w-100 z-index-5 border-radius-top-08 shadow-dark-750`}>
    
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