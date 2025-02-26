import { useContext, useEffect, useState, useRef, useLayoutEffect } from "react"
import { useOutletContext, useLocation } from "react-router-dom"
import { CurrentArtistContext } from "../contexts/currentArtist.context"
import { CurrentFanContext } from "../contexts/currentFan.context"
import { FanclubsContext } from "../contexts/fanclubs.context"
import Textbar from "../components/textbar.component"
import Container from "../layout/container.layout"
import MessageChatConcert from "../components/message-chat-concert.component"
import FullPageCenter from "../layout/full-page-center.layout"
import useFanclubGroupChatHandler from "../utils/handle-fanclub-chat-message.hook"
import useFanclub from "../utils/get-fanclub.hooks"
const FanclubGroupChatRoute = () => {
    const location = useLocation()
    const pathname = location?.pathname
    const {artist, handlePopUp} = useOutletContext()
    const {currentArtist} = useContext(CurrentArtistContext)
    const {currentFan} = useContext(CurrentFanContext)
    const {fanclubs} = useContext(FanclubsContext)
    let artistF = location?.pathname.includes("/artist-app") ? currentArtist : artist
    const {currentMessage, setCurrentMessage, handleSubmitMessage, shake} = useFanclubGroupChatHandler(artistF?.id)
    const fanclub = useFanclub(artistF?.id)


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
        let date = currentDate.toISOString().split('T')[0]
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
    const messagesEndRef = useRef(null);

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
    <>
    {!pathname.includes('/artist-app/') && 
        <Container style={`${artist?.flashLeaderboard.status === 'PENDING' || artist?.flashLeaderboard.status === 'ONGOING' && !location.pathname.includes('sfera-ebbasta') ? 'pb-xs-40' : 'pb-xs-24'} mt-xs-4`}>
            <div ref={messagesContainerRef}>
            {fanclub?.messages && fanclub?.messages.length > 0 ?
                fanclub?.messages.map((mess, index) => (
                    <MessageChatConcert 
                        message={mess}
                        currentUserId={currentFan?.id}
                        color={userColors[mess.userId]}
                    />
                ))
            :
                <div className="w-100 d-flex-column j-c-center align-items-center h-100 mt-xs-20 mb-xs-20">
                    <div className=' w-70 bg-black-transp50 pt-xs-4 pb-xs-6 pl-xs-6 pr-xs-6 border-radius-06'>
                        <p className='t-align-center mb-xs-4 letter-spacing-1 grey-400 f-w-600'>Avvia la chat!</p>      
                    </div>
                </div>
            }
            </div>
            <div ref={messagesEndRef} />
        </Container>
    }

    {pathname.includes('/artist-app/') && 
        <Container  style='mt-xs-4 pb-xs-appbar'>
            <div ref={messagesContainerRef}>
            {fanclub?.messages && fanclub?.messages.length > 0 ?
                fanclub?.messages.map((mess, index) => (
                    <MessageChatConcert 
                        message={mess}
                        currentUserId={currentArtist?.id}
                        color={userColors[mess.userId]}
                    />
                ))
            :
            <>
                <div className="w-100 d-flex-column j-c-center align-items-center h-100 mt-xs-20 mb-xs-20">
                    <div className=' w-70 bg-black-transp50 pt-xs-4 pb-xs-6 pl-xs-6 pr-xs-6 border-radius-06'>
                        <p className='t-align-center mb-xs-4 letter-spacing-1 grey-400 f-w-600'>Avvia la chat!</p>      
                    </div>
                </div>
            </>
            }
            </div>
            <div ref={messagesEndRef} />
        </Container>
    }
    {
        pathname.includes('/artist-app/') &&
        <div className='position-fixed bg-dark-soft bottom-10 w-100 z-index-999 border-radius-top-08 shadow-dark-750'>
            <Textbar
                className={'image-wrapper w-100vw'}
                onClick={() => setChatOpen(true)}
                currentComment={currentMessage}
                handleCurrentComment={handleCurrentMessage}
                handleSubmitComment={handleSubmitMessage} 
            />
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