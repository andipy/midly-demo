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
import usePrivateChatHandler from '../utils/handle-private-message.hook'

const ChatPrivateRoute = () => {
    const location = useLocation()
    const { state } = location
    const { artist, from } = state || {}
    const pathname = location.pathname
    const { currentFan, setCurrentFan} = useContext(CurrentFanContext)
    const { currentArtist } = useContext(CurrentArtistContext)
    const { chats, setChats } = useContext(ChatsContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)

    /* const [hasUserSubscribed, setHasUserSubscribed] = useState(false) */
    const [modalSubscription, setModalSubscription] = useState(false)

    const hasUserSubscribed = useFanclubSubscription(artist?.id)
    
    const fanclub = useFanclub(artist?.id)

    const { handleSubscription, err, isExiting } = useFanclubSubscriptionHandler()
    const { currentMessage, setCurrentMessage, shake, submitMessage } = usePrivateChatHandler(artist?.id, pathname, hasUserSubscribed)

    //legge i messaggi non letti fino ad ora
    useEffect(() =>{
        if (chats) {
            if (pathname.includes('/artist-app')) {
                let chat = chats.find(
                    (c) => c.artistId === currentArtist?.id && c.fanId === artist?.id
                )
            
                if (chat) {
                    const updatedMessages = chat.messages.map((message) => {
                        if (message.userId !== currentArtist.id && !message.read) {
                            return { ...message, read: true }
                        }
                        return message
                    })
            
                    const updatedChat = { ...chat, messages: updatedMessages }
            
                    setChats((prevChats) => 
                        prevChats.map((c) => (c.id === chat.id ? updatedChat : c))
                    )
                }
            }
        }
    }, [])

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
        let date = currentDate.toISOString()

        setCurrentMessage(prev => ({
            ...prev,
            id: messagesNumber,
            createdAt: date,
            content: e.target.value
        }))
    }

    //audio x artist
    const toggleRecordingAudio = () => {
        if (recordingAudio) {
            handleStopRecordingAudio()
        } else {
            handleStartRecordingAudio()
        }
    }

    const clearMessage = () => {
        setCurrentMessage((prev) => ({
            ...prev,
            id: undefined,
            createdAt: undefined,
            content: "",
            type: "MESSAGE"
        }))
    }

    const submitAudio = (updatedMessage) => {
        setChats((prevChats) => {
            let chat

            chat = prevChats.find(
            (c) => c.artistId === currentArtist?.id && c.fanId === artist?.id
            )
            
      
            if (!chat) {
              return [
                ...prevChats,
                {
                  id: prevChats.length + 1,
                  fanId: currentFan.id,
                  artistId: artist?.id,
                  messages: [updatedMessage]
                }
              ]
            } else {
              return prevChats.map((c) =>
                c.id === chat.id
                  ? { ...c, messages: [...c.messages, updatedMessage] }
                  : c
              )
            }
        })

        clearMessage()
    }
    const handleStopRecordingAudio = () => {
        if (audioRecorderRef.current) {
            audioRecorderRef.current.stop()
            setRecordingAudio(false)
            cancelAnimationFrame(animationRef.current)
            setElapsedTime({ hours: 0, minutes: 0, seconds: 0 })
            setAudioData(new Uint8Array(0))
    
            audioRecorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/mp3' }) 
                const dataUrl = URL.createObjectURL(blob)
                const currentDate = new Date().toISOString().split('T')[0]

                const endTime = Date.now()
                const duration= (endTime - timeStart) /1000
                
    
                setCurrentMessage((prev) => {
                    const updatedMessage = {
                        ...prev,  
                        id: Date.now(),
                        createdAt: currentDate,
                        type: 'AUDIO',
                        content: dataUrl,
                        duration: duration
                    }
    
                    return updatedMessage 
                })
            }
        }
    }

    const handleSubmitAudio = () => {
        submitAudio(currentMessage)
    }

    const [recordingAudio, setRecordingAudio] = useState(false)
    const audioRecorderRef = useRef(null)
    const [elapsedTime, setElapsedTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    })
    const [audioData, setAudioData] = useState(new Uint8Array(0)) // Dati per la forma d'onda
    const animationRef = useRef(null)
    const analyserRef = useRef(null)
    const chunksRef = useRef([])
    const [timeStart, setTimeStart] = useState(0)

    const handleStartRecordingAudio = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            const audioContext = new (window.AudioContext || window.webkitAudioContext)()
            const source = audioContext.createMediaStreamSource(stream)
            const analyser = audioContext.createAnalyser()
            analyser.fftSize = 256 
            analyser.minDecibels = -90
            analyser.maxDecibels = -10
            const dataArray = new Uint8Array(analyser.frequencyBinCount)
    
            source.connect(analyser)
            analyserRef.current = analyser
    
            audioRecorderRef.current = new MediaRecorder(stream)
            chunksRef.current = [] 
    
            audioRecorderRef.current.ondataavailable = (e) => {
                chunksRef.current.push(e.data) 
            }
    
            audioRecorderRef.current.start()
            setRecordingAudio(true)
    
            const startTime = Date.now()
            setTimeStart(startTime)
            const update = () => {
                analyser.getByteTimeDomainData(dataArray)
                setAudioData([...dataArray])
    
                const elapsedTimeMs = Date.now() - startTime
                const hours = Math.floor(elapsedTimeMs / (1000 * 60 * 60))
                const minutes = Math.floor((elapsedTimeMs % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((elapsedTimeMs % (1000 * 60)) / 1000)
                setElapsedTime({ hours, minutes, seconds })
    
                animationRef.current = requestAnimationFrame(update)
            }
            update()
        } catch (err) {
            console.error('Errore nella registrazione audio:', err.message)
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const today = new Date()
        
        today.setHours(0, 0, 0, 0)
        
        // Calcola la differenza in giorni tra oggi e la data del messaggio
        const diffTime = today - date
        const diffDays = diffTime / (1000 * 3600 * 24)
    
        // Se il messaggio è oggi
        if (diffDays < 1) {
            return 'OGGI'
        }
    
        // Se il messaggio è entro questa settimana
        const startOfWeek = today.getDate() - today.getDay()
        const daysSinceStartOfWeek = today.getDate() - startOfWeek
        const messageDay = date.getDate()
    
        if (diffDays < 7) {
            const options = { weekday: 'long' }
            return date.toLocaleDateString('it-IT', options)
        }
    
        // Se il messaggio è più vecchio di una settimana
        return date.toLocaleDateString('it-IT', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).split('/').reverse().join('-')
    }


  return (
    <div className='position-relative'>
        {
            !hasUserSubscribed && 
            <FullPageCenter style={'z-index-1000'}>
                <div className='position-absolute-x-y w-80 bg-black-transp50 pt-xs-4 pb-xs-6 pl-xs-6 pr-xs-6 border-radius-06'>
                    <p className='t-align-center mb-xs-4'>Vuoi mandare messaggi privati all'artista?</p>
                    <Button  style={`bg-acid-lime black f-w-500 fsize-xs-2 ${shake ? 'vibrate' : ''}`} label='Abbonati' onClick={setModalSubscription} />
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
                        const groupedMessages = foundChat.messages.reduce((acc, message) => {
                            const formattedDate = formatDate(message.createdAt) // Formatta la data
                            if (!acc[formattedDate]) {
                                acc[formattedDate] = []
                            }
                            acc[formattedDate].push(message)
                            return acc
                        }, {})
                    
                        return Object.keys(groupedMessages).map((date, index) => (
                            <div key={index}>
                                <div className="w-100 d-flex-row j-c-center align-items-center mb-xs-4">
                                    <h5 className='fsize-xs-1 f-w-500 letter-spacing-2 grey-400'>{date.toUpperCase()}</h5>
                                </div>
                                {groupedMessages[date].map((mess, idx) => (
                                    <MessageChatPrivate
                                        key={idx}
                                        message={mess}
                                        currentUserId={currentFan?.id}
                                    />
                                ))}
                            </div>
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
                            const groupedMessages = foundChat.messages.reduce((acc, message) => {
                                const formattedDate = formatDate(message.createdAt) 
                                if (!acc[formattedDate]) {
                                    acc[formattedDate] = []
                                }
                                acc[formattedDate].push(message)
                                return acc
                            }, {})
                        
                            return Object.keys(groupedMessages).map((date, index) => (
                                <div key={index}>
                                    <div className="w-100 d-flex-row j-c-center align-items-center mb-xs-4">
                                        <h5 className='fsize-xs-1 f-w-500 letter-spacing-2 grey-400'>{date.toUpperCase()}</h5>
                                    </div>
                                    {groupedMessages[date].map((mess, idx) => (
                                        <MessageChatPrivate
                                            key={idx}
                                            message={mess}
                                            currentUserId={currentArtist?.id}
                                        />
                                    ))}
                                </div>
                            ))
                        
                        } else {
                            return (
                                <FullPageCenter>
                                    <h3 className='t-align-center grey-200 fsize-xs-6 f-w-400 w-80 line-height-140'>
                                        Avvia la chat!
                                    </h3>
                                </FullPageCenter>
                            )
                        }
                    })()}
                </Container>
            }
            

        </div>

        <div className={`position-fixed bg-dark-soft bottom-0 w-100 z-index-1100 border-radius-top-08 shadow-dark-750`}>
            {
                pathname.includes('/artist-app/') &&
                <TextAudioBar
                    currentComment={currentMessage}
                    handleCurrentComment={handleCurrentMessage}
                    handleSubmitComment={submitMessage} 
                    toggleRecordingAudio={toggleRecordingAudio}
                    recordingAudio={recordingAudio}
                    elapsedTime={elapsedTime}
                    handleSubmitAudio={handleSubmitAudio}
                    clear={clearMessage}
                />
            }
            {
                !pathname.includes('/artist-app/') &&
                <Textbar
                    currentComment={currentMessage}
                    handleCurrentComment={handleCurrentMessage}
                    handleSubmitComment={submitMessage} 
                    /* shake={shake} */
                />
            }
            
        </div>

        
        {
            modalSubscription &&
            <ModalSubscriptionFanclub closeModal={() => setModalSubscription(false)} fanclub={fanclub} handleSubscription={(period) => handleSubscription(artist?.id, period)}/>
        }
        {err && 
            <FullPageCenter style='z-index-1100 bg-black-transp70'>
                <Container style={`centered-popup ${isExiting ? 'fade-out' : ''} position-absolute d-flex-column align-items-center gap-0_5em bg-red-400 border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 `}>
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