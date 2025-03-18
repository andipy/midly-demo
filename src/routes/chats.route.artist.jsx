import { useEffect, useState, useContext } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'

import { CurrentFanContext } from '../contexts/currentFan.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'
import { ChatsContext } from '../contexts/chats.context'
import { FansContext } from '../contexts/fans.context'

import Container from '../layout/container.layout'
import FullPageCenter from '../layout/full-page-center.layout'
import NavbarBackOnly from '../components/navbar-back-only.component'
import IconArrowRight from '../images/icons/icon-arrowright.svg'
import useFanclub from '../utils/get-fanclub.hooks'
const ChatsRoute = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { currentFan, setCurrentFan } = useContext(CurrentFanContext)
    const { currentArtist } = useContext(CurrentArtistContext)
    const {chats, setChats} = useContext(ChatsContext)
    const {fans } = useContext(FansContext)
    const fanclub  = useFanclub(currentArtist?.id)

    const [artistChats, setArtistChats] = useState()
    useEffect(() => {
        if (chats) {
            const foundChats = chats?.filter(c => c?.artistId === currentArtist.id)
            setArtistChats(foundChats)
        }
    }, [chats])

    const unreadMessagesGroupCount = fanclub?.messages?.filter((message) => {
        return message.userId !== currentArtist.id && !message.read.includes(currentArtist.id)
    }).length

  return (
    <>
    <NavbarBackOnly onClick={() => navigate(-1)}/>
    <Container style={'mb-xs-4'}>
        <h4 className="fsize-xs-6 f-w-500">Chat di gruppo</h4>
        <div className="d-flex-row align-items-center j-c-space-between pt-xs-2 pb-xs-2 pr-xs-2 mt-xs-2 mb-xs-2" onClick={() => navigate(`/artist-app/fanclub/chats/group-chat`, { state: { from: location} })}>
            <div className="d-flex-row align-items-center j-c-start">
                {
                    fanclub?.cover.url ?
                    <img className="avatar-48 border-radius-100" src={fanclub?.cover.url} alt={`${fanclub?.name} avatar`} />
                    :
                    <img className="avatar-48 border-radius-100" src={currentArtist?.image} alt={`${fanclub?.name} avatar`} />
                }
                
                <div className="d-flex-column j-c-start align-items-start ml-xs-8 w-100 no-shrink">
                    <p className="fsize-xs-1 f-w-300">{fanclub?.name}</p>
                </div>
            </div>

            <div className="d-flex-row j-c-center align-items-center ml-xs-2" >
            {
                unreadMessagesGroupCount > 0 &&
                <div className='avatar-16 d-flex-row j-c-center align-items-center border-radius-100 bg-acid-lime'>
                    <p className='fsize-xs-0 f-w-600 black'>{unreadMessagesGroupCount}</p>
                </div>
            }
                <img className="avatar-24 border-radius-02" src={IconArrowRight} alt="Chat image" />
            </div>
        </div>
    </Container>
    <Container style={'mb-xs-4'}>
        <h4 className="fsize-xs-6 f-w-500">Messaggi</h4>
        {artistChats?.length > 0 &&
        <>
            {
                artistChats?.map(chat => {
                    const user = fans?.find(fan => fan.id === chat.fanId)
                    const messages = chat?.messages
                    const unreadMessages = messages.filter(message => message.userId !== currentArtist?.id && message.read === false)
                    return (
                        <div key={chat.id} className="d-flex-row align-items-center j-c-space-between pt-xs-2 pb-xs-2 pr-xs-2 mt-xs-2 mb-xs-2" onClick={() => navigate(`/artist-app/fanclub/chats/chat`, { state: { from: location, artist: currentFan } })}>
                            <div className="d-flex-row align-items-center j-c-start">
                                <img className="avatar-48 border-radius-100" src={user.image} alt={`${user.username} avatar`} />
                                <div className="d-flex-column j-c-start align-items-start ml-xs-8">
                                    <p className="fsize-xs-1 f-w-300">{user.username}</p>
                                </div>
                            </div>

                            <div className="d-flex-row j-c-center align-items-center ml-xs-2" >
                                {
                                    unreadMessages?.length > 0 &&
                                    <div className='avatar-16 d-flex-row j-c-center align-items-center border-radius-100 bg-acid-lime'>
                                        <p className='fsize-xs-0 f-w-600 black'>{unreadMessages?.length}</p>
                                    </div>
                                }
                                
                                <img className="avatar-24 border-radius-02" src={IconArrowRight} alt="Chat image" />
                            </div>
                        </div>
                    );
                })
            }
        </>    
        }
        
    </Container>
    {
        artistChats?.length <= 0 &&
        <div className=' mt-xs-50 d-flex-column align-items-center j-c-center'>
            <h3 className='t-align-center grey-200 fsize-xs-6 f-w-400 w-80 line-height-140'>
                Non hai chat recenti!
            </h3>
        </div>
    }
    </>
  )
}

export default ChatsRoute