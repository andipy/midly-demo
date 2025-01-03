import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'

import { CurrentFanContext } from '../contexts/currentFan.context'


import IconLink from '../images/icons/icon-link.svg'
import Container from "../layout/container.layout"
import Carousel from "../layout/carousel.layout"
import CardConcertStop from "./card-concert-stop.component"
import Button from './button.component'

import IconNotFav from '../images/icons/icon-favourites-inactive.svg'
import IconFav from '../images/icons/icon-favourites-active.svg'
import IconThunder from '../images/icons/icon-thunder.svg'
import IconMessage from '../images/icons/icon-message.svg'


const PostConcert = ({concert, newPartecipation, hasUserSubscribed, handleSubscription, slug}) => {
    const { pathname } = useLocation()
    const { currentFan} = useContext(CurrentFanContext)
    const navigate = useNavigate()
    const formatDate = (date) => {
        const months = [
            "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", 
            "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
        ]

        const [day, month, year] = date.split('-')

        const formattedDay = day.startsWith('0') ? day.slice(1) : day

        const monthName = months[parseInt(month, 10) - 1]

        return `${formattedDay} ${monthName} ${year}`
    }

    const [partecipate, setPartecipate] = useState(false)
    useEffect(() => {
        if (concert && concert.participants && !pathname.includes('/artist-app')) {
            const userParticipate = concert.participants.some(p => p.userId === currentFan.id)
            setPartecipate(userParticipate)
        }
    }, [concert])

  return (

    <div className="mb-xs-8 position-relative">
    {concert.type === 'CONCERT' ?
    <>
    <div className={`${(concert.settings.isPrivate && hasUserSubscribed === false && !pathname.includes('/artist-app/')) ? 'blur-50' : ''} position-relative h-xs-27 image-wrapper`}>
        {concert?.cover.type === 'IMAGE' ?
            <img
                className='w-100 h-inherit object-fit-cover'
                src={concert?.cover.url && concert.cover.url}
            />
        : concert?.cover.type === 'VIDEO' &&
            <video className='w-100 h-inherit object-fit-cover' autoPlay playsInline loop muted>
                <source src={concert?.cover.url && concert.cover.url} type='video/mp4' />
            </video>
        }
        <p className='grey-100 f-w-400 fsize-xs-2 position-absolute bottom-0 ml-xs-6'>{formatDate(concert.date)}</p>
        {!pathname.includes('/artist-app/') &&
            <div className='d-flex-row position-absolute bottom-0 right-0 mr-xs-2 mb-xs-2 '>
                {partecipate ? (
                    <>
                    <div className='bg-black border-radius-100 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 avatar-24 d-flex-row j-c-center align-items-center'  onClick={() => newPartecipation(concert.id)}> 
                        <img
                            className="avatar-16"
                            src={IconFav}
                            alt="Liked"
                        />
                    </div>
                    <div className='bg-black border-radius-100 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 avatar-24 d-flex-row j-c-center align-items-center' onClick={() => navigate(`/artist/${slug}/concert/chat`, { state: { artistId: concert?.artistId, id: concert?.id } })}> 
                        <img
                            className="avatar-28"
                            src={IconMessage}
                            alt="Liked"
                        />
                    </div>
                    </>
                    
                    
                ) : (
                    <div className='bg-black border-radius-100 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 avatar-24 d-flex-row j-c-center align-items-center'  onClick={() => newPartecipation(concert.id)}> 
                    <img
                        className="avatar-16"
                        src={IconNotFav}
                        alt="Not Liked"
                    />
                    </div>
            )}
            </div>
        }
        <div className='d-flex-row position-absolute top-0 right-0 mt-xs-2'>
            { concert.settings.isPinned &&
                <img className='avatar-30 border-radius-100' src={IconThunder}/>	
            }
        </div>
    </div>
    <Container>
        <div className="d-flex-column">
            <p className='lime-400 f-w-400 fsize-xs-2'>{concert.name}</p>
            <p className='grey-100 f-w-400 fsize-xs-2'>{concert.place.mainPlace}</p>
        </div>
        {concert.buyLinks[0] &&
            <Link className='d-flex-row align-items-center grey-100 f-w-400 fsize-xs-1 text-underline mb-xs-3' to={concert.buyLinks[0]} target='blank'>
                <img className='avatar-20' src={IconLink} />
                <span>{'Acquista qui i biglietti'}</span>
            </Link>
        }
    </Container>
    </>
    
    :
    <>
    <div className={`${(concert.settings.isPrivate && hasUserSubscribed === false && !pathname.includes('/artist-app/')) ? 'blur-50' : ''} position-relative h-xs-27 image-wrapper`}>
        {concert?.cover.type === 'IMAGE' ?
            <img
                className='w-100 h-inherit object-fit-cover'
                src={concert?.cover.url && concert.cover.url}
            />
        : concert?.cover.type === 'VIDEO' &&
            <video className='w-100 h-inherit object-fit-cover' autoPlay playsInline loop muted>
                <source src={concert?.cover.url && concert.cover.url} type='video/mp4' />
            </video>
        }
        <p className='grey-100 f-w-400 fsize-xs-2 position-absolute bottom-0 ml-xs-6'>Tour</p>
        {!pathname.includes('/artist-app/') &&
            <div className='d-flex-row position-absolute bottom-0 right-0 mr-xs-2 mb-xs-2 '>
                {partecipate ? (
                    <>
                    <div className='bg-black border-radius-100 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 avatar-24 d-flex-row j-c-center align-items-center'  onClick={() => newPartecipation(concert.id)}> 
                        <img
                            className="avatar-16"
                            src={IconFav}
                            alt="Liked"
                        />
                    </div>
                    <div className='bg-black border-radius-100 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 avatar-24 d-flex-row j-c-center align-items-center'> 
                        <img
                            className="avatar-28"
                            src={IconMessage}
                            alt="Liked"
                        />
                    </div>
                    </>
                    
                    
                ) : (
                    <div className='bg-black border-radius-100 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 avatar-24 d-flex-row j-c-center align-items-center'  onClick={() => newPartecipation(concert.id)}> 
                    <img
                        className="avatar-16"
                        src={IconNotFav}
                        alt="Not Liked"
                    />
                    </div>
            )}
            </div>
        }
        <div className='d-flex-row position-absolute top-0 right-0 mt-xs-2'>
            { concert.settings.isPinned &&
                <img className='avatar-30 border-radius-100' src={IconThunder}/>	
            }
        </div>
    </div>
    <Container>
        <div className="d-flex-column">
            <p className='lime-400 f-w-400 fsize-xs-2'>{concert.name}</p>
        </div>
        {concert.dates.length > 0 &&
            <section id='quiz' className={`${(concert.settings.isPrivate && hasUserSubscribed === false && !pathname.includes('/artist-app/')) ? 'blur-50' : ''} mt-xs-4`}>
                <h2 className='fsize-xs-5 f-w-600'>Tutte le tappe del tour</h2>
                <Carousel>
                    {concert.dates.map(date => {
                        return (
                           <CardConcertStop 
                            date={date}
                           />
                        )
                    })}
                </Carousel>
            </section>
        }
        
    </Container>
    </>
    }

    {!hasUserSubscribed && !pathname.includes('/artist-app/') && concert.settings.isPrivate &&
        <div className='position-absolute-x-y w-100vw bg-black-transp50 pt-xs-4 pb-xs-6 pl-xs-6 pr-xs-6 h-100 j-c-center align-items-center'>
            <p className='t-align-center mb-xs-4'>Vuoi accedere ai contenuti esclusivi dell'artista?</p>
            <Button style='bg-acid-lime black f-w-500 fsize-xs-2' label='Abbonati' onClick={handleSubscription} />
        </div>
    }
    
    </div>
    
  )
}

export default PostConcert