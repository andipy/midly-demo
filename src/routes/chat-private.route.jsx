import { useEffect, useState, useContext } from 'react'
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

const ChatPrivateRoute = () => {
    const location = useLocation()
    const { state } = location
    const { artist, from } = state || {}
    const pathname = location.pathname
    const { currentFan, setCurrentFan} = useContext(CurrentFanContext)
    const { currentArtist } = useContext(CurrentArtistContext)
    const { chats, setChats } = useContext(ChatsContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)

    const [hasUserSubscribed, setHasUserSubscribed] = useState(false)
    const [modalSubscription, setModalSubscription] = useState(false)

    const [fanclub, setFanclub] = useState()
    const fetchThisFanclub = () => {
        const thisFanclub = fanclubs.find(elem => elem.artistId === artist.id)
        setFanclub(thisFanclub)
    }

    const checkFanclubSubscription = () => {
        let isSubscribed
        if ( currentFan.fanclubsSubscribed.find(sub => sub.artistId === artist.id) ) {
            isSubscribed = true
        } else {
            isSubscribed = false
        }
        setHasUserSubscribed(isSubscribed)
    }

    useEffect(() => {
        if ( artist ) {
            fetchThisFanclub()
            checkFanclubSubscription()
        }
    }, [artist, currentFan])

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
        if ( currentMessage.content !== '' ) { 
            setChats(prevChats => {
                let chat
                if ( !pathname.includes('/artist-app/') ) {
                    chat = prevChats.find(
                        c => c.artistId === artist?.id && c.fanId === currentFan.id
                    )
                } else {
                    chat = prevChats.find(
                        c => c.artistId === currentArtist?.id && c.fanId === artist?.id
                    )
                }
    
                if (!chat) {
                    return [
                        ...prevChats,
                        {
                            id: prevChats.length+1,
                            fanId: currentFan.id,
                            artistId: artist.id,
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

    const handleSubscription = () => {
        let currentDate = new Date()
        let date = currentDate.toISOString().split('T')[0]
        if (hasUserSubscribed) {
            setFanclubs(prevFanclubs =>
                prevFanclubs.map(fanclub =>
                    fanclub.artistId === artist.id
                        ? { ...fanclub, subscribers: (fanclub.subscribers || 0) - 1 }
                        : fanclub
                )
            );
            setCurrentFan(prev => ({
                ...prev,
                fanclubsSubscribed: prev.fanclubsSubscribed.filter(fanclub => fanclub.artistId !== artist.id),
                removedSubscriptions: [
                    ...prev.removedSubscriptions,
                    { artistId: artist.id, createdAt: date }
                ]
            }))
        } else {
            if (fanclub?.maxSubscribers <= fanclub?.subscribers && fanclub?.maxSubscribers) {
                setErr(true)
                return
            } else {
                setFanclubs(prevFanclubs =>
                    prevFanclubs.map(fanclub =>
                        fanclub.artistId === artist.id
                            ? { ...fanclub, subscribers: (fanclub.subscribers || 0) + 1 }
                            : fanclub
                    )
                )
                setCurrentFan(prev => ({
                    ...prev,
                    fanclubsSubscribed: [...prev.fanclubsSubscribed, { artistId: artist.id, createdAt: date }],
                    removedSubscriptions: prev.removedSubscriptions.filter(fanclub => fanclub.artistId !== artist.id)
                }))
            }  
        }

        
    }
    const [err, setErr] = useState(false)
    const [isExitingErr, setIsExitingErr] = useState(false)

    useEffect(() => {
        if (err) {
            const exitDelay = setTimeout(() => {
                setIsExitingErr(true)
            }, 1000)

            return () => clearTimeout(exitDelay)
        }
    }, [err])

    useEffect(() => {
        if (isExitingErr) {
            const endDelay = setTimeout(() => {
                setErr(false)
                setIsExitingErr(false)
            }, 400)

            return () => clearTimeout(endDelay)
        }
    }, [isExitingErr])
    console.log(hasUserSubscribed)
  return (
    <div className='position-relative'>
        {
            !hasUserSubscribed &&
            <FullPageCenter style={'z-index-1000'}>
                <div className='position-absolute-x-y w-80 bg-black-transp50 pt-xs-4 pb-xs-6 pl-xs-6 pr-xs-6 border-radius-06'>
                    <p className='t-align-center mb-xs-4'>Vuoi mandare messaggi privati all'artista?</p>
                    <Button style='bg-acid-lime black f-w-500 fsize-xs-2' label='Abbonati' onClick={setModalSubscription} />
                </div>
            </FullPageCenter>
            
        }
        {!pathname.includes('/artist-app/') && 
            <NavbarChat artist={artist} from={from}/>
        }

        <div className={`${!hasUserSubscribed ? 'blur-50':''}`}>
            
            {pathname.includes('/artist-app/') && 
                <NavbarChat fan={artist} from={from}/>
            }
            {!pathname.includes('/artist-app/') && 
                <Container style='pt-xs-topbar pb-xs-appbar'>
                    {(() => {
                    const foundChat = chats.find(
                        chat => chat.artistId === artist?.id && chat.fanId === currentFan?.id
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
                            <FullPageCenter style={'z-index-999'}>
                                <h3 className='t-align-center grey-200 fsize-xs-6 f-w-400 w-80 line-height-140'>Avvia la chat!</h3>
                            </FullPageCenter>
                        )
                    }
                })()}
                </Container>
            }
            {pathname.includes('/artist-app/') &&
                <Container style='pt-xs-topbar pb-xs-appbar'>
                        {(() => {
                        const foundChat = chats.find(
                            chat => chat.artistId === currentArtist?.id && chat.fanId === artist?.id
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
            <div className='position-fixed bg-dark-soft bottom-0 w-100 z-index-1100 border-radius-top-08 shadow-dark-750'>
                <Textbar
                    currentComment={currentMessage}
                    handleCurrentComment={handleCurrentMessage}
                    handleSubmitComment={handleSubmitMessage} 
                />
            </div>

        </div>

        
        {
            modalSubscription &&
            <ModalSubscriptionFanclub closeModal={() => setModalSubscription(false)} fanclub={fanclub} handleSubscription={handleSubscription}/>
        }
        {err && 
            <FullPageCenter style='z-index-1100 bg-black-transp70'>
                <Container style={`centered-popup ${isExitingErr ? 'fade-out' : ''} position-absolute d-flex-column align-items-center gap-0_5em bg-red-400 border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 `}>
                    <div className='d-flex-column align-items-center j-c-center w-100 pt-xs-2 pb-xs-2 pr-xs-2 pl-xs-2'>
                        <h2 className='fsize-xs-2 f-w-300 t-align-center'>Il fanclub è al completo</h2>
                    </div>
                </Container>
            </FullPageCenter>
        }
    </div>
  )
}

export default ChatPrivateRoute