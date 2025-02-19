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
        let date = currentDate.toISOString().split('T')[0]
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
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView()
    }, [fanclub?.messages])

  return (
    <div className='position-relative'>
        <div className={`${!hasUserSubscribed ? 'blur-50':''}`}>
            
                <NavbarChat from={from}/>
                <Container  style='pt-xs-topbar pb-xs-appbar'>
                    <div ref={messagesContainerRef}>
                    {fanclub?.messages && fanclub?.messages.length > 0 &&
                        fanclub?.messages.map((mess, index) => (
                            <MessageChatConcert 
                                message={mess}
                                currentUserId={currentArtist?.id}
                            />
                        ))
                    }
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