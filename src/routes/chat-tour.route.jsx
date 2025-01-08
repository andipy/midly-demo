import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { CurrentFanContext } from '../contexts/currentFan.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'
import { FanclubsContext } from '../contexts/fanclubs.context'
import { ArtistsContext } from '../contexts/artists.context'
import NavbarConcertChat from '../components/navbar-concert-chat.component'
import Textbar from '../components/textbar.component'
import Container from '../layout/container.layout'
import CountdownConcert from '../components/countdown-concert.component'
import MessageChatConcert from '../components/message-chat-concert.component'
import FullPageCenter from '../layout/full-page-center.layout'

import IconArrowRight from '../images/icons/icon-arrowright.svg'
const ChatTourRoute = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { artistId, id } = location.state || {}
    const { currentFan } = useContext(CurrentFanContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)
    const { currentArtist } = useContext(CurrentArtistContext)
    const { artists } = useContext(ArtistsContext)


    const [concert, setConcert] = useState()
    useEffect(() =>{
        const foundFanclub = fanclubs?.find(fanclub => fanclub?.artistId === artistId)
        const foundConcert = foundFanclub?.concerts.find(concert => concert?.id === id)
        setConcert(foundConcert)
    }, [id, fanclubs])

    const [artist, setArtist] = useState()
    useEffect(() =>{
        const foundArtist = artists.find(artist => artist.id === artistId)
        setArtist(foundArtist)
    }, [id])

    const getDay = (date) => {
        if ( date ) {
            const [day] = date.split('-')
            return day.padStart(2, '0')
        }
    }

    const getMonth = (date) => {
        if ( date ) {
            const [, month] = date.split('-')
            const monthNames = [
                "GEN", "FEB", "MAR", "APR", "MAG", "GIU", 
                "LUG", "AGO", "SET", "OTT", "NOV", "DIC"
            ]
            return monthNames[parseInt(month, 10) - 1]
        }
    }

    const getYear = (date) => {
        if ( date ) {
            const [, , year] = date.split('-')
            return year
        }
    }

  return (
    <>
        <NavbarConcertChat id={artistId} concertId={id}/>
        <Container style={'pt-xs-topbar'}>
            {!pathname.includes('/artist-app/') &&
                <>
                {concert?.dates.map(date => (
                    <div className='w-100 d-flex-row  j-c-space-betweeen align-items-center mt-xs-8 mb-xs-8' onClick={() => navigate(`/artist/${artist.slug}/concert/chat`, { state: { artistId: concert?.artistId, id: concert?.id, dateId: date.id } })}>
                        <div className='w-100'>
                            <p className='fsize-xs-3 f-w-500'>{date.mainPlace}</p>
                        </div>
                        <div className='avatar-28 bg-dark-gradient border-radius-100 d-flex-row j-c-center align-items-center pt-xs-2 pr-xs-2 pl-xs-2 pb-xs-2'>
                            <img className='avatar-20' src={IconArrowRight}></img>
                        </div>
                        
                    </div>
                ))}
                </>
            }
            {pathname.includes('/artist-app/') &&
                <>
                {concert?.dates.map(date => (
                    <div className='w-100 d-flex-row  j-c-space-betweeen align-items-center mt-xs-8 mb-xs-8' onClick={() => navigate(`/artist-app/fanclub/concert/chat`, { state: { artistId: concert?.artistId, id: concert?.id, dateId: date.id } })}>
                        <div className='w-100'>
                            <p className='fsize-xs-3 f-w-500'>{date.mainPlace}</p>
                        </div>
                        <div className='avatar-28 bg-dark-gradient border-radius-100 d-flex-row j-c-center align-items-center pt-xs-2 pr-xs-2 pl-xs-2 pb-xs-2'>
                            <img className='avatar-20' src={IconArrowRight}></img>
                        </div>
                        
                    </div>
                ))}
                </>
            }

        </Container>
        
    </>
  )
}

export default ChatTourRoute