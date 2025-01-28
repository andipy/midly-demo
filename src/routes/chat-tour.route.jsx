import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { FanclubsContext } from '../contexts/fanclubs.context'
import { ArtistsContext } from '../contexts/artists.context'
import NavbarConcertChat from '../components/navbar-concert-chat.component'
import Container from '../layout/container.layout'

import IconArrowRight from '../images/icons/icon-arrowright.svg'
const ChatTourRoute = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { artistId, id, from } = location.state || {}
    const { fanclubs} = useContext(FanclubsContext)
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

  return (
    <>
        <NavbarConcertChat id={artistId} concertId={id} from={from}/>
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