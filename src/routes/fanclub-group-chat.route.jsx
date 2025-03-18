import { useContext, useEffect, useState, useRef, useLayoutEffect } from "react"
import { useOutletContext, useLocation, useNavigate } from "react-router-dom"
import { CurrentArtistContext } from "../contexts/currentArtist.context"
import { CurrentFanContext } from "../contexts/currentFan.context"
import { FanclubsContext } from "../contexts/fanclubs.context"
import Textbar from "../components/textbar.component"
import Container from "../layout/container.layout"
import MessageChatConcert from "../components/message-chat-concert.component"
import FullPageCenter from "../layout/full-page-center.layout"
import useFanclubGroupChatHandler from "../utils/handle-fanclub-chat-message.hook"
import useFanclub from "../utils/get-fanclub.hooks"
import IconComment from '../images/icons/icon-comment-black.svg'
import IconCreateContent from '../images/icons/icon-create-content.svg'
import IconPlus from '../images/icons/icon-plus-black.svg'
const FanclubGroupChatRoute = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const pathname = location?.pathname
    const {artist, handlePopUp} = useOutletContext()
    const {currentArtist} = useContext(CurrentArtistContext)
    const {currentFan} = useContext(CurrentFanContext)
    const {fanclubs, setFanclubs} = useContext(FanclubsContext)
    let artistF = location?.pathname.includes("/artist-app") ? currentArtist : artist
    const {currentMessage, setCurrentMessage, handleSubmitMessage, shake} = useFanclubGroupChatHandler(artistF?.id)
    const fanclub = useFanclub(artistF?.id)

    //legge i messaggi
    useEffect(() => {
        const targetId = pathname.includes('artist-app') ? currentArtist.id : currentFan.id
    
        if (fanclub?.id) {
            const updatedFanclub = {
                ...fanclub,
                messages: fanclub.messages.map((message) => {
                    if (!message.read.includes(targetId)) {
                        return {
                            ...message,
                            read: [...message.read, targetId] 
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
        {
            if ( !fanclub?.isActive && artist?.chatIsActive) {
                return
            }
            if (shake) {
                handlePopUp('MESSAGE-CHAT')
            }

        }
        
    }, [shake])

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
            if (fanclub.artistId === artistF?.id) {
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


  return (
    <>
    {!pathname.includes('/artist-app/') && 
        <Container style={`${artist?.flashLeaderboard.status === 'PENDING' || artist?.flashLeaderboard.status === 'ONGOING' && !location.pathname.includes('sfera-ebbasta') ? 'pb-xs-40' : 'pb-xs-24'} mt-xs-4`}>
            <div ref={messagesContainerRef}>
            {fanclub?.messages && fanclub?.messages.length > 0 ?
                Object.keys(groupedMessages).map((date, index) => (
                    <div key={index}>
                        
                        <div className="w-100 d-flex-row j-c-center align-items-center mb-xs-4">
                            <h5 className='fsize-xs-1 f-w-500 letter-spacing-2 grey-400'>{date.toUpperCase()}</h5>
                        </div>
                        
                        {groupedMessages[date].map((message, msgIndex) => (
                            <MessageChatConcert 
                                message={message}
                                currentUserId={currentFan?.id}
                                color={userColors[message.userId]}
                            />
                        ))}
                    </div>
                ))
            :
                <div className="w-100 d-flex-column j-c-center align-items-center h-100 mt-xs-20 mb-xs-20 gap-0_5em">
                    <div className='avatr-64'>
                        <img src={IconCreateContent}/>
                    </div>
                    <div className='d-flex-row j-c-center align-items-center gap-0_5em'>
                        <p className='fsize-xs-2 f-w-500 letter-spacing-1'>Avvia la chat</p>
                    </div>
                </div>
            }
            </div>
            <div ref={messagesEndRef} />
        </Container>
    }

    {pathname.includes('/artist-app/') && 
        <Container  style='mt-xs-4'>
            <div ref={messagesContainerRef}>
            {fanclub?.messages && fanclub?.messages.length > 0 ?
                Object.keys(groupedMessages).map((date, index) => (
                    <div key={index}>
                        
                        <div className="w-100 d-flex-row j-c-center align-items-center mb-xs-4">
                            <h5 className='fsize-xs-1 f-w-500 letter-spacing-2 grey-400'>{date.toUpperCase()}</h5>
                        </div>
                        
                        {groupedMessages[date].map((message, msgIndex) => (
                            <MessageChatConcert 
                                message={message}
                                currentUserId={currentArtist?.id}
                                color={userColors[message.userId]}
                            />
                        ))}
                    </div>
                ))
            :
            <>
                <div className="w-100 d-flex-column j-c-center align-items-center h-100 mt-xs-20 mb-xs-20 gap-0_5em">
                    <div className='avatr-64'>
                        <img src={IconCreateContent}/>
                    </div>
                    <div className='d-flex-row j-c-center align-items-center gap-0_5em'>
                        <div className={`bg-acid-lime avatar-16 border-radius-100  d-flex-row j-c-center align-items-center`}
                            onClick={() => navigate(`/artist-app/fanclub/chats/group-chat`, { state: { from: location} })}
                        >
                            <img className='avatar-16' src={IconComment}/>
                        </div> 
                        <p className='fsize-xs-2 f-w-500 letter-spacing-1'>Avvia la chat</p>
                    </div>
                </div>
            </>
            }
            </div>
            <div ref={messagesEndRef} />
        </Container>
    }
    {
        pathname.includes('/artist-app/') && fanclub?.messages.length > 0 &&
        <div className='bg-acid-lime avatar-40 border-radius-100 bottom-5 right-5 position-fixed z-index-999 d-flex-row j-c-center align-items-center mb-xs-16' onClick={() => navigate(`/artist-app/fanclub/chats/group-chat`, { state: { from: location} })}>
            <img className='' src={IconComment}/>
        </div>       
    }
    {
        !pathname.includes('/artist-app/') &&
        <div className={`${(artist?.flashLeaderboard.status === 'PENDING' || artist?.flashLeaderboard.status === 'ONGOING') && !pathname.includes('sfera-ebbasta') ?  'bottom-12':'bottom-0'} position-fixed bg-dark-soft  w-100 z-index-5 border-radius-top-08 shadow-dark-750`}>
            <Textbar
                className={'image-wrapper w-100vw'}
                onClick={() => setChatOpen(true)}
                currentComment={currentMessage}
                handleCurrentComment={handleCurrentMessage}
                handleSubmitComment={handleSubmitMessage} 
                shake={shake} 
            />
        </div>
    }
    
    </>
  )
}

export default FanclubGroupChatRoute