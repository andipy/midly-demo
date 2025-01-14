import { useEffect, useState, useContext } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'

import { CurrentFanContext } from '../contexts/currentFan.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'
import { ChatsContext } from '../contexts/chats.context'
import { FansContext } from '../contexts/fans.context'

import Container from '../layout/container.layout'
import Textbar from '../components/textbar.component'
import FullPageCenter from '../layout/full-page-center.layout'
import MessageChatPrivate from '../components/message-chat-private.component'
import NavbarBackOnly from '../components/navbar-back-only.component'
import IconArrowRight from '../images/icons/icon-arrowright.svg'
const ChatsRoute = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const { state, pathname } = useLocation()    
    const { currentFan, setCurrentFan } = useContext(CurrentFanContext)
    const { currentArtist } = useContext(CurrentArtistContext)
    const {chats, setChats} = useContext(ChatsContext)
    const {fans } = useContext(FansContext)

    const [artistChats, setArtistChats] = useState()
    useEffect(() => {
        if (chats) {
            const foundChats = chats?.filter(c => c?.artistId === currentArtist.id)
            setArtistChats(foundChats)
        }
    }, [chats])

  return (
    <>
    <NavbarBackOnly onClick={() => navigate(-1)}/>
    <Container style={'mb-xs-4'}>
        <h4 className="fsize-xs-6 f-w-500">Messaggi</h4>
        {artistChats?.length > 0 ?
        <>
            {
                artistChats?.map(chat => {
                    const user = fans?.find(fan => fan.id === chat.fanId)

                    return (
                        <div key={chat.id} className="d-flex-row align-items-center j-c-space-between pt-xs-2 pb-xs-2 pr-xs-2 mt-xs-2 mb-xs-2" onClick={() => navigate(`/artist-app/fanclub/chats/chat`, { state: currentFan })}>
                            <div className="d-flex-row align-items-center j-c-start">
                                <img className="avatar-48 border-radius-100" src={user.image} alt={`${user.username} avatar`} />
                                <div className="d-flex-column j-c-start align-items-start ml-xs-8">
                                    <p className="fsize-xs-1 f-w-300">{user.username}</p>
                                    {/* <p className="fsize-xs-1 f-w-600">{chat.messages[chat.messages.length-1].content}</p> */}
                                </div>
                            </div>

                            <div className="d-flex-row ml-xs-2" >
                                <img className="avatar-24 border-radius-02" src={IconArrowRight} alt="Chat image" />
                            </div>
                        </div>
                    );
                })
            }
        </>    
        :
            <FullPageCenter>
                <h3 className='t-align-center grey-200 fsize-xs-6 f-w-400 w-80 line-height-140'>
                    Non hai chat recenti!
                </h3>
            </FullPageCenter>
        }
    </Container>
    </>
  )
}

export default ChatsRoute