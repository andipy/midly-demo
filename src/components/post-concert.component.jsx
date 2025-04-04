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
import IconGroup from '../images/icons/icon-group.svg'
import IconGroupBlack from '../images/icons/icon-group-black.svg'
import IconOkBlack from '../images/icons/icon-ok-black.svg'
import IconSettings from '../images/icons/icon-settings-white.svg'
import IconArrowRight from '../images/icons/icon-arrowright-dark.svg'


const PostConcert = ({concert, newPartecipation, hasUserSubscribed, handleSubscription, slug, openSettings}) => {
    const location = useLocation()
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
    <div className='w-100 position-relative h-xs-27 image-wrapper overflow-all-hidden'>
        {!hasUserSubscribed && !pathname.includes('/artist-app/') && concert.settings.isPrivate &&
            <div className=' position-absolute-x-y w-80 bg-black-transp50 bg-black-transp50 pt-xs-4 pb-xs-6 pl-xs-6 pr-xs-6 border-radius-06 j-c-center align-items-center z-index-3'>
                <p className='t-align-center mb-xs-4'>Vuoi accedere ai contenuti esclusivi dell'artista?</p>
                <Button style='bg-acid-lime black f-w-500 fsize-xs-2' label='Abbonati' onClick={handleSubscription} />
            </div>
        }
    <div className={`z-index-2 ${(concert.settings.isPrivate && hasUserSubscribed === false && !pathname.includes('/artist-app/')) ? 'blur-50 h-xs-27' : ''} `}>
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
        <div className='position-absolute bottom-0 ml-xs-6 mb-xs-2 bg-dark-soft-2 border-radius-08 pl-xs-2 pr-xs-2'>
            <p className='grey-100 f-w-400 fsize-xs-2 '>{formatDate(concert.date)}</p>
        </div>
        
        <div className='d-flex-row position-absolute top-0 right-0 mt-xs-2'>
            { concert.settings.isPinned &&
                <img className='avatar-30 border-radius-100' src={IconThunder}/>	
            }
        </div>
    </div>
    </div>
    
    <Container>
        {hasUserSubscribed || pathname.includes('/artist-app/') || !concert.settings.isPrivate ?
        <>
            <div className="d-flex-column mt-xs-2">
                <div className='d-flex-row j-c-space-between align-items-center'>
                    <p className='lime-400 f-w-400 fsize-xs-2'>{concert.name}</p>
                    {pathname.includes('/artist-app/') &&
                        <img className='avatar-20' src={IconSettings} onClick={() => openSettings(concert)}></img>
                    }
                </div>
                <p className='grey-100 f-w-400 fsize-xs-2'>{concert.place.mainPlace}</p>
            </div>
            {concert.buyLinks[0] &&
                <Link className='d-flex-row align-items-center grey-100 f-w-400 fsize-xs-1 text-underline mb-xs-3' to={concert.buyLinks[0]} target='blank'>
                    {/* <img className='avatar-20' src={IconLink} /> */}
                    <span>{'Acquista qui i biglietti'}</span>
                </Link>
            }
            {!pathname.includes('/artist-app/') &&
                <div className='d-flex-row j-c-space-between align-items-center gap-0_5em mt-xs-2 mb-xs-2'>
                    {partecipate ? (
                        <>
                        <div className='bg-acid-lime-op-10 border-lime border-radius-02 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 d-flex-row j-c-start align-items-center gap-0_5em w-100'  onClick={() => newPartecipation(concert.id)}> 
                            <div className='avatar-16 bg-acid-lime border-lime d-flex-row j-c-center align-items-center border-radius-100'>
                                <img src={IconOkBlack}></img>
                            </div>
                            <p className='lime-400 fsize-xs-2 f-w-500'>Parteciperò</p>
                        </div>
                        <div className='bg-acid-lime  border-radius-02 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 d-flex-row j-c-start align-items-center gap-0_5em w-100'  onClick={() => navigate(`/artist/${slug}/concert/chat`, { state: { artistId: concert?.artistId, id: concert?.id,  from: location  } })}> 
                            <div className='avatar-16  d-flex-row j-c-center align-items-center border-radius-100'>
                                <img src={IconGroupBlack}></img>
                            </div>
                            <p className='black fsize-xs-2 f-w-500'>Chat di gruppo</p>
                        </div>
                        </>
                        
                        
                    ) : (
                        <>
                        <div className='bg-dark-gradient border-lime border-radius-02 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 d-flex-row j-c-start align-items-center gap-0_5em w-100'  onClick={() => newPartecipation(concert.id)}> 
                            <div className='avatar-16 bg-dark-gradient border-lime d-flex-row border-radius-100'></div>
                            <p className='lime-400 fsize-xs-2 f-w-500'>Parteciperò</p>
                        </div>
                        <div className='bg-dark-gradient  border-radius-02 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 d-flex-row j-c-start align-items-center gap-0_5em w-100'  > 
                            <div className='avatar-16 bg-dark-gradient  d-flex-row j-c-center align-items-center border-radius-100'>
                                <img src={IconGroup}></img>
                            </div>
                            <p className='grey-400 fsize-xs-2 f-w-500'>Chat di gruppo</p>
                        </div>
                        </>
                    )}
                </div>
            }
            {pathname.includes('/artist-app/') &&
                <div className='bg-acid-lime  border-radius-02 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 d-flex-row j-c-start align-items-center gap-0_5em w-50 mt-xs-2 mb-xs-2'  onClick={() => navigate(`/artist-app/fanclub/concert/chat`, { state: { artistId: concert?.artistId, id: concert?.id } })}> 
                    <div className='avatar-16  d-flex-row j-c-center align-items-center border-radius-100'>
                        <img src={IconGroupBlack}></img>
                    </div>
                    <p className='black fsize-xs-2 f-w-500'>Chat di gruppo</p>
                </div>
            }
            
        </>
        :
        <div className='w-100 pb-xs-4 '>
			<p className='fsize-xs-3 f-w-600 gold'>Evento da sbloccare</p>
		</div>
        }
        
    </Container>
    </>
    
    :
    <>
    <div className='w-100 position-relative h-xs-27 image-wrapper overflow-all-hidden'>
        {!hasUserSubscribed && !pathname.includes('/artist-app/') && concert.settings.isPrivate &&
            <div className=' position-absolute-x-y w-80 bg-black-transp50 bg-black-transp50 pt-xs-4 pb-xs-6 pl-xs-6 pr-xs-6 border-radius-06 j-c-center align-items-center z-index-3'>
                <p className='t-align-center mb-xs-4'>Vuoi accedere ai contenuti esclusivi dell'artista?</p>
                <Button style='bg-acid-lime black f-w-500 fsize-xs-2' label='Abbonati' onClick={handleSubscription} />
            </div>
        }
    <div className={`z-index-2 ${(concert.settings.isPrivate && hasUserSubscribed === false && !pathname.includes('/artist-app/')) ? 'blur-50' : ''} `}>
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
        <div className='position-absolute bottom-0 ml-xs-6 mb-xs-2 bg-dark-soft-2 border-radius-08 pl-xs-2 pr-xs-2'>
            <p className='grey-100 f-w-400 fsize-xs-2 '>Tour</p>
        </div>
        
        <div className='d-flex-row position-absolute top-0 right-0 mt-xs-2'>
            { concert.settings.isPinned &&
                <img className='avatar-30 border-radius-100' src={IconThunder}/>	
            }
        </div>
    </div>
    </div>
    <Container>
        {hasUserSubscribed || pathname.includes('/artist-app/') || !concert.settings.isPrivate ?
        <>
            <div className="d-flex-column mt-xs-2">
                <div className='d-flex-row j-c-space-between align-items-center'>
                    <p className='lime-400 f-w-400 fsize-xs-2'>{concert.name}</p>
                    {pathname.includes('/artist-app/') &&
                        <img className='avatar-20' src={IconSettings} onClick={() => openSettings(concert)}></img>
                    }
                </div>
                <p className='grey-100 f-w-400 fsize-xs-2'>{concert.dates.length} tappe</p>
            </div>
            {concert.buyLinks[0] &&
                <Link className='d-flex-row align-items-center grey-100 f-w-400 fsize-xs-1 text-underline mb-xs-3' to={concert.buyLinks[0]} target='blank'>
                    {/* <img className='avatar-20' src={IconLink} /> */}
                    <span>{'Acquista qui i biglietti'}</span>
                </Link>
            }
            <div className='bg-acid-lime  border-radius-02 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 d-flex-row j-c-space-between align-items-center gap-0_5em w-100 mt-xs-2'  onClick={() => navigate(`/artist/${slug}/events/tour`, { state: { artistId: concert?.artistId, tourId: concert?.id,  from: location  } })}> 
                <p className='black fsize-xs-2 f-w-500'>Vedi tutte le tappe del tour</p>
                <div className='avatar-16  d-flex-row j-c-center align-items-center border-radius-100'>
                    <img src={IconArrowRight}></img>
                </div>
            </div>
        </>
        :
            <div className='w-100 pb-xs-4 '>
                <p className='fsize-xs-3 f-w-600 gold'>Tour da sbloccare</p>
            </div>
        }
    </Container>
    </>
    }

    
    
    </div>
    
  )
}

export default PostConcert