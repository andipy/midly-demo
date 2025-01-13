import { useEffect, useState, useContext } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'

import { ArtistsContext } from '../contexts/artists.context'
import { CurrentFanContext } from '../contexts/currentFan.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'
import { ChatsContext } from '../contexts/chats.context'

import NavbarChat from '../components/navbar-chat.component'
import Container from '../layout/container.layout'
import Textbar from '../components/textbar.component'
import FullPageCenter from '../layout/full-page-center.layout'
import MessageChatPrivate from '../components/message-chat-private.component'

const ChatPrivateRoute = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const { state, pathname } = useLocation()    
    const { currentFan, setCurrentFan } = useContext(CurrentFanContext)
    const { artists } = useContext(ArtistsContext)
    const { currentArtist } = useContext(CurrentArtistContext)
    const {chats, setChats} = useContext(ChatsContext)

    const [currentMessage, setCurrentMessage] = useState({
        type: 'MESSAGE',
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
        let messagesNumber = 1
        let currentDate = new Date()
        let date = currentDate.toISOString().split('T')[0]

        setCurrentMessage(prev => ({
            ...prev,
            id: messagesNumber,
            createdAt: date,
            content: e.target.value
        }))
    }

    const handleSubmitMessage = (e) => {
        e.preventDefault()
        console.log(currentMessage)
        if ( currentMessage.comment !== '' ) { 
            setChats(prevChats => {
                let chat
                if (!pathname.includes('/artist-app/')) {
                    chat = prevChats.find(
                        c => c.artistId === state?.id && c.fanId === currentFan.id
                    )
                } else {
                    chat = prevChats.find(
                        c => c.artistId === currentArtist?.id && c.fanId === state?.id
                    )
                }
                
    
                if (!chat) {
                    return [
                        ...prevChats,
                        {
                            id: prevChats.length+1,
                            fanId: currentFan.id,
                            artistId: state.id,
                            messages: [currentMessage] 
                        }
                    ];
                } else {
                    return prevChats.map((c, index) => {
                        if (c.id === chat.id) {
                            return {
                                ...c,
                                messages: [...c.messages, currentMessage]
                            }
                        }
                        return chat
                    })
                }
            })
        }
        setCurrentMessage(prev => ({
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
    {!pathname.includes('/artist-app/') && 
        <NavbarChat artist={state}/>
    }
    {pathname.includes('/artist-app/') && 
        <NavbarChat fan={state}/>
    }
    {!pathname.includes('/artist-app/') && 
        <Container style='pt-xs-topbar pb-xs-appbar'>
            {(() => {
            const foundChat = chats.find(
                chat => chat.artistId === state?.id && chat.fanId === currentFan?.id
            )

            if (foundChat?.messages && foundChat.messages.length > 0) {
                return foundChat.messages.map((mess, index) => (
                    <MessageChatPrivate
                        message={mess}
                        currentUserId={currentFan?.id}
                    />
                ))
            } else {
                return (
                    <FullPageCenter>
                        <h3 className='t-align-center grey-200 fsize-xs-6 f-w-400 w-80 line-height-140'>
                            Avvia la chat!
                        </h3>
                    </FullPageCenter>
                );
            }
        })()}
        </Container>
    }
    {pathname.includes('/artist-app/') &&
        <Container style='pt-xs-topbar pb-xs-appbar'>
                {(() => {
                const foundChat = chats.find(
                    chat => chat.artistId === currentArtist?.id && chat.fanId === state?.id
                )

                if (foundChat?.messages && foundChat.messages.length > 0) {
                    return foundChat.messages.map((mess, index) => (
                        <MessageChatPrivate
                            message={mess}
                            currentUserId={currentArtist?.id}
                        />
                    ))
                } else {
                    return (
                        <FullPageCenter>
                            <h3 className='t-align-center grey-200 fsize-xs-6 f-w-400 w-80 line-height-140'>
                                Avvia la chat!
                            </h3>
                        </FullPageCenter>
                    );
                }
            })()}
        </Container>
    }
    <div className='position-fixed bg-dark-soft bottom-0 w-100 z-index-5 border-radius-top-08 shadow-dark-750'>
        <Textbar
            onClick={() => setChatOpen(true)}
            currentComment={currentMessage}
            handleCurrentComment={handleCurrentMessage}
            handleSubmitComment={handleSubmitMessage} 
        />
    </div>
    </>
  )
}

export default ChatPrivateRoute