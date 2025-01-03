import { useLocation } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { CurrentFanContext } from '../contexts/currentFan.context'
import { FanclubsContext } from '../contexts/fanclubs.context'
import NavbarConcertChat from '../components/navbar-concert-chat.component'
import Textbar from '../components/textbar.component'
import Container from '../layout/container.layout'
import CountdownConcert from '../components/countdown-concert.component'

const ChatConcertRoute =() => {

    const location = useLocation();
    const { artistId, id } = location.state || {}
    const { currentFan } = useContext(CurrentFanContext)
    const {fanclubs} = useContext(FanclubsContext)

    const [currentComment, setCurrentComment] = useState({
        type: 'COMMENT',
        user_type: undefined,
        username: '',
        content: '',
        timestamp: undefined,
        id: undefined
    })
    const handleCurrentComment = (e) => {
        setCurrentComment(prev => ({
            type: 'COMMENT',
            user_type: prev.user_type,
            username: currentFan.username,
            content: e.target.value,
            timestamp: undefined,
            id: undefined
        }))
    }
    const [chatOpen, setChatOpen] = useState(true)
    const closeModal = () => {
        setChatOpen(false)
    }

    const handleSubmitComment = (e, currentComment) => {
        e.preventDefault()
        console.log(currentComment)
    }
    const [concert, setConcert] = useState()
    useEffect(() =>{
        const foundFanclub = fanclubs?.find(fanclub => fanclub?.artistId === artistId)
        const foundConcert = foundFanclub?.concerts.find(concert => concert?.id === id)
        setConcert(foundConcert)
    })

  return (
    <>
        <NavbarConcertChat id={artistId} concertId={id}/>
        <Container style={'pt-xs-topbar d-flex-column align-items-center j-c-center'}>
            <CountdownConcert date ={concert?.date}/>
        </Container>
        <Container>
            {/* qui ci vanno i messaggi */}
        </Container>
        
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