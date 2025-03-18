import { useEffect, useState, useContext, useRef } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'

import { ArtistsContext } from '../contexts/artists.context'
import { CurrentFanContext } from '../contexts/currentFan.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'
import { ChatsContext } from '../contexts/chats.context'
import { FanclubsContext } from '../contexts/fanclubs.context'

import NavbarChat from '../components/navbar-chat.component'
import Container from '../layout/container.layout'
import Textbar from '../components/textbar.component'
import FullPageCenter from '../layout/full-page-center.layout'
import MessageChatPrivate from '../components/message-chat-private.component'
import Button from '../components/button.component'
import ModalSubscriptionFanclub from '../components/modal-subscription-fanclub.component'
import TextAudioBar from '../components/text-audio-bar.component'
import useFanclubSubscriptionHandler from '../utils/handle-subscription.hook'
import useFanclub from '../utils/get-fanclub.hooks'
import useFanclubSubscription from '../utils/get-fanclub-subscription.hook'
import useFanclubGroupChatHandler from '../utils/handle-fanclub-chat-message.hook'
import MessageChatConcert from '../components/message-chat-concert.component'
const GroupChatRoute = () => {
    const location = useLocation()
    const { state } = location
    const {  from } = state || {}
    const pathname = location.pathname
    const { currentFan, setCurrentFan} = useContext(CurrentFanContext)
    const { currentArtist } = useContext(CurrentArtistContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)
    const [modalSubscription, setModalSubscription] = useState(false)

    const hasUserSubscribed = useFanclubSubscription(currentArtist?.id)
    
    const fanclub = useFanclub(currentArtist?.id)

    const { handleSubscription, err, isExiting } = useFanclubSubscriptionHandler()
    const {currentMessage, setCurrentMessage, handleSubmitMessage, shake} = useFanclubGroupChatHandler(currentArtist?.id)

    //legge i messsaggi
    useEffect(() => {
        if (fanclub?.id) {
            const updatedFanclub = { 
                ...fanclub, 
                messages: fanclub.messages.map((message) => {
                    if (message.userId !== currentArtist.id && !message.read.includes(currentArtist.id)) {
                        return {
                            ...message,
                            read: [...message.read, currentArtist.id]
                        }
                    }
                    return message
                })
            }
    
            setFanclubs((prevFanclubs) => 
                prevFanclubs.map((fc) => (fc.id === updatedFanclub.id ? updatedFanclub : fc))
            )
        }
    }, [fanclub?.id])

    useEffect(() => {
        pathname.includes('/artist-app') ?
            setCurrentMessage(prev => ({
                ...prev,
                userType: 'artist',
                userId: currentArtist?.id,
                userImage: currentArtist?.image,
                username: currentArtist?.artistName
            }))
        : setCurrentMessage(prev => ({
            ...prev,
            userType: 'fan',
            userId: currentFan?.id,
            userImage: currentFan?.image,
            username: currentFan?.username
        }))

    }, [])

    const handleCurrentMessage = (e) => {
        e.preventDefault()
        let messagesNumber
        let currentDate = new Date()
        let date = currentDate.toISOString()
        fanclubs.map(fanclub => {
            if (fanclub.artistId === currentArtist?.id) {
                messagesNumber = fanclub.messages.length + 1
            }
        })

        setCurrentMessage(prev => ({
            ...prev,
            id: messagesNumber,
            createdAt: date,
            content: e.target.value
        }))
    }
    const [chatOpen, setChatOpen] = useState(true)

    const messagesContainerRef = useRef(null)
    const messagesEndRef = useRef(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView()
    }, [fanclub?.messages])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const today = new Date()
        
        today.setHours(0, 0, 0, 0)
        
        const diffTime = today - date
        const diffDays = diffTime / (1000 * 3600 * 24)
    
        if (diffDays < 1) {
            return 'OGGI'
        }
    
        const startOfWeek = today.getDate() - today.getDay() 
        const daysSinceStartOfWeek = today.getDate() - startOfWeek
        const messageDay = date.getDate()
    
        if (diffDays < 7) {
            const options = { weekday: 'long' } 
            return date.toLocaleDateString('it-IT', options)
        }
    
        return date.toLocaleDateString('it-IT', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).split('/').reverse().join('-')
    }
    
    const groupedMessages = fanclub?.messages?.reduce((acc, message) => {
        const date = formatDate(message.createdAt)
        if (!acc[date]) {
            acc[date] = []
        }
        acc[date].push(message)
        return acc
    }, {})

    const colors = [
        { id: 1, text: 'color-01', icon: 'color-fill-01' },
        { id: 2, text: 'color-02', icon: 'color-fill-02' },
        { id: 3, text: 'color-03', icon: 'color-fill-03' },
        { id: 4, text: 'color-04', icon: 'color-fill-04' },
        { id: 5, text: 'color-05', icon: 'color-fill-05' },
    ]

    const [userColors, setUserColors] = useState({})

    useEffect(() => {
        if (fanclub?.messages) {
            let newUserColors = { ...userColors }

            fanclub.messages.forEach((mess) => {
                if (!newUserColors[mess.userId]) {
                    const availableColors = colors.filter(c => !Object.values(newUserColors).includes(c))
                    const randomColor = availableColors.length > 0 
                        ? availableColors[Math.floor(Math.random() * availableColors.length)] 
                        : colors[Math.floor(Math.random() * colors.length)]

                    newUserColors[mess.userId] = randomColor
                }
            })

            setUserColors(newUserColors)
        }
        messagesEndRef.current?.scrollIntoView()
    }, [fanclub?.messages])

  return (
    <div className='position-relative'>
        <div className={`${!hasUserSubscribed ? 'blur-50':''}`}>
            
                <NavbarChat from={from}/>
                <Container  style='pt-xs-topbar pb-xs-appbar'>
                    <div ref={messagesContainerRef}>
                    {groupedMessages && Object.keys(groupedMessages).map((date, index) => (
                        <div key={index}>
                            
                            <div className="w-100 d-flex-row j-c-center align-items-center mb-xs-4">
                                <h5 className='fsize-xs-1 f-w-500 letter-spacing-2 grey-400'>{date.toUpperCase()}</h5>
                            </div>
                            
                            {groupedMessages[date].map((message, msgIndex) => (
                                <MessageChatConcert 
                                    key={msgIndex}
                                    message={message}
                                    currentUserId={currentArtist?.id}
                                    color={userColors[message.userId]}
                                />
                            ))}
                        </div>
                    ))}
                    </div>
                    <div ref={messagesEndRef} />
                </Container>         
        </div>
        {
            fanclub?.messages.length <= 0   &&              
            <>
                <FullPageCenter>
                <h3 className='t-align-center grey-200 fsize-xs-6 f-w-400 w-80 line-height-140'>
                    Avvia la chat!
                </h3>
                </FullPageCenter>    
            </>
        }
        <div className={`position-fixed bg-dark-soft bottom-0 w-100 z-index-1100 border-radius-top-08 shadow-dark-750`}>
            <Textbar
                className={''}
                onClick={() => setChatOpen(true)}
                currentComment={currentMessage}
                handleCurrentComment={handleCurrentMessage}
                handleSubmitComment={handleSubmitMessage} 
            />          
        </div>
    </div>
  )
}

export default GroupChatRoute