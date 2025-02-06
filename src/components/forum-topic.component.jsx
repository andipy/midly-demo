import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'

import { CurrentFanContext } from '../contexts/currentFan.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'

import Carousel from '../layout/carousel.layout'
import IconComments from '../images/icons/icon-comment-white.svg'
import IconShare from '../images/icons/icon-share-white.svg'
import IconSave from '../images/icons/icon-save.svg'
import IconSaveActive from '../images/icons/icon-save-active.svg'
import IconLink from '../images/icons/icon-link.svg'
import IconThunder from '../images/icons/icon-thunder.svg'
import IconThunderActive from '../images/icons/icon-thunder-active.svg'
import IconVerifiedArtist from '../images/icons/icon-verified-artist.svg'
import Container from '../layout/container.layout'

const ForumTopic = ({ key, topic, artistId, like, save, share, popular }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const pathname = location.pathname 
    const { currentFan} = useContext(CurrentFanContext)
    const {currentArtist} = useContext(CurrentArtistContext)
    const [liked, setLiked] = useState(false)
    useEffect(() => {
        if (topic && topic.likes) {
            let userLiked
            {
                pathname.includes('/artist-app') ?
                    userLiked = topic.likes.some(p => p.userId === currentArtist.id)
                :
                    userLiked = topic.likes.some(p => p.userId === currentFan.id)
            }
            
            setLiked(userLiked)
        }
    }, [topic])

    const [saved, setSaved] = useState(false)
    useEffect(() => {
        if (topic && topic.saved) {
            let userSaved
            {
                pathname.includes('/artist-app') ?
                    userSaved = topic.saved.some(p => p.userId === currentArtist.id)
                :
                    userSaved = topic.saved.some(p => p.userId === currentFan.id)
            } 
            setSaved(userSaved)
        }
    }, [topic])

    const [showDescription, setShowDescription] = useState(false)

    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    
    useEffect(() => {
        const specificDate = new Date(topic?.createdAt)
        const currentDate = new Date()
        const timeDifference = currentDate - specificDate
        const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
    
        if (daysPassed === 0) {
            const hoursPassed = Math.floor(timeDifference / (1000 * 60 * 60))
            const minutesPassed = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
            const secondsPassed = Math.floor((timeDifference % (1000 * 60)) / 1000)
    
            setDays(0)
            setHours(hoursPassed)
            setMinutes(minutesPassed)
            setSeconds(secondsPassed)
        } else {
            setDays(daysPassed)
        }
    }, [topic])

    const formatDate = () => {
        const specificDate = new Date(topic?.createdAt)
        const day = specificDate.getDate()
        const month = specificDate.toLocaleString('default', { month: 'long' })
        const formattedMonth =  month
        const year = specificDate.getFullYear()
        const today = new Date()
        const thisYear = today.getFullYear()
        return day + ' ' + formattedMonth + ' ' + `${year === thisYear ?  '' : year}`
    }

    return (
        <div className='image-wrapper pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 bg-dark-gradient mb-xs-2'>
            <Container>
                {popular &&
                    <p className='fsize-xs-1 f-w-500 blue-bright-600 mb-xs-4'>Più popolare</p>
                }
                <div className='d-flex-column align-items-start j-c-center gap-1em'>
                    <div className='d-flex-row j-c-start align-items-center gap-0_5em'>
                        <div className='avatar-24 border-radius-100 position-relative'>
                            <img className='avatar-24 border-radius-100' src={topic?.userImage} />
                            {topic?.publisher.type === 'ARTIST' &&
                                <img className='artist-avatar-verified-icon avatar-12' src={IconVerifiedArtist} />
                            }
                        </div>
                        <p className='fsize-xs-1 f-w-500'>{topic?.userName}</p>
                        {topic?.publisher.type === 'ARTIST' &&
                            <p className='fsize-xs-0 f-w-300 gold'>Artista</p>
                        }
                    </div>
                    <div className='d-flex-row j-c-space-between align-items-center w-100 gap-1em' onClick={() => navigate('topic/details', {state: {topic: topic, artistId: artistId, from: pathname}})}>
                        <div className='d-flex-column w-100'>
                            <h1 className='fsize-xs-5 f-w-800'>{topic?.title}</h1>
                            <p className='fsize-xs-2 f-w-300 mt-xs-4'>
                                {topic?.description.length > 100 ?
                                <>
                                    {showDescription ?
                                        <>
                                            {topic?.description}
                                            <span className='lime-400 f-w-300' onClick={() => setShowDescription(false)}> meno</span>
                                        </>
                                    :
                                        <>
                                            {topic?.description.slice(0, 100)}...
                                            <span className='lime-400 f-w-300' onClick={() => setShowDescription(true)}> altro</span>
                                        </>
                                    }
                                </>
                                :
                                    topic?.description
                                }
                            </p>
                        </div>
                        {topic?.cover &&
                            <div id='image' className='d-flex-row w-80px '> 
                                <img className='w-100 h-inherit object-fit-cover border-radius-08' src={topic?.cover}/>
                            </div>
                        }  
                    </div>
                    <div className=' w-100 d-flex-row j-c-space-between align-items-center gap-0_25em'>
                        <div className='d-flex-row j-c-start align-items-center'>
                            <p className='fsize-xs-1 f-w-300 grey-300'>
                                {days > 31 ?
                                    <span>{formatDate()}</span>
                                : days > 0 ?
                                    <span>{days} giorni fa</span>
                                : days <= 0 ?
                                <>
                                    {hours <= 0 ?
                                    <>
                                            {minutes <= 0 ?
                                                <span>{seconds} secondi fa</span>
                                            :
                                                <span>{minutes} minuti fa</span>
                                            }
                                    </>
                                        :
                                            <span>{hours} ore fa</span>
                                    }
                                </>
                                :
                                    <span>{days} giorni fa</span>
                                }
                            </p>
                            <div className='d-flex-row j-c-start align-items-center gap-0_25em'>
                                <div className='border-radius-100 avatar-28'>
                                    {
                                        liked ?
                                        <img className='avatar-28' src={IconThunderActive} onClick={() => like(topic.id)}/>
                                        :
                                        <img className='avatar-28' src={IconThunder} onClick={() => like(topic.id)}/>
                                    }
                                </div>
                                <p className='fsize-xs-1 f-w-300'>{topic?.likes.length}</p>
                                <div className='border-radius-100 avatar-28'>
                                    <img className='avatar-28' src={IconComments} onClick={() => navigate('topic/details', {state: {topic: topic, artistId: artistId, from: pathname}})}/>
                                </div>
                                <p className='fsize-xs-1 f-w-300'>{topic?.commentsCount}</p>
                                <div className='border-radius-100  avatar-28'>
                                    <img className='avatar-28' src={IconShare} onClick={() => share()}/>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex-row'>
                            <div className='border-radius-100  avatar-28'>
                            {saved ?
                                <img className='avatar-28' src={IconSaveActive} onClick={() => save(topic.id)} />
                            :
                                <img className='avatar-28' src={IconSave} onClick={() => save(topic.id)} />
                            }
                            </div>
                        </div>
                        
                    </div>
                    {/* <div className='d-flex-row j-c-center align-items-center w-100'>
                        <Carousel>
                            {topic?.hashtags.map(tag => {
                                return (
                                    <div className='bg-acid-lime-op-10 d-flex-row pt-xs-1 pr-xs-2 pl-xs-2 pb-xs-1 border-radius-02'>
                                        <p className='fsize-xs-1 f-w-500 lime-400'>#{tag}</p>
                                    </div>
                                )
                            })}
                        </Carousel>
                    </div> */}
                </div>
            </Container>
        </div>
    )
}

export default ForumTopic