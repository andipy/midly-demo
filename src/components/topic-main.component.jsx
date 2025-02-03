import { useEffect, useState } from 'react'

import IconComments from '../images/icons/icon-comment-white.svg'
import IconShare from '../images/icons/icon-share-white.svg'
import IconSave from '../images/icons/icon-save.svg'
import IconSaveActive from '../images/icons/icon-save-active.svg'
import IconThunder from '../images/icons/icon-thunder.svg'
import IconThunderActive from '../images/icons/icon-thunder-active.svg'
import IconVerifiedArtist from '../images/icons/icon-verified-artist.svg'

import Carousel from '../layout/carousel.layout'
const TopicMain = ({topic, liked, likeTopic, saved, saveTopic, shareTopic, spotCommentToReply}) => {
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
        <div className='d-flex-row w-100vw image-wrapper bg-dark-gradient mb-xs-2'>
            <div className='container mt-xs-2 d-flex-colum j-c-start align-items-start'>
                <div className='d-flex-row j-c-start align-items-center gap-0_5em'>
                    <div className='avatar-28 border-radius-100 position-relative'>
                        <img className='avatar-28 border-radius-100' src={topic?.userImage} />
                        {topic?.publisher.type === 'ARTIST' &&
                            <img className='artist-avatar-verified-icon avatar-12' src={IconVerifiedArtist} />
                        }
                    </div>

                    <p className='fsize-xs-1 f-w-500'>{topic?.userName}</p>
                    {topic?.publisher.type === 'ARTIST' &&
                        <p className='fsize-xs-0 f-w-300 gold'>Artista</p>
                    }
                    
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
                </div>

                {topic?.hashtags.length > 0 &&
                    <div className='d-flex-row j-c-center align-items-center w-100 mt-xs-4'>
                        <Carousel>
                            {topic?.hashtags.map(tag => {
                                return (
                                    <div className='bg-acid-lime-op-10 d-flex-row pt-xs-1 pr-xs-2 pl-xs-2 pb-xs-1 border-radius-02'>
                                        <p className='fsize-xs-1 f-w-500 lime-400'>#{tag}</p>
                                    </div>
                                )
                            })}     

                        </Carousel>
                    </div>
                }
                
                <div className='d-flex-row j-c-space-between align-items-center w-100 gap-1em mt-xs-4'>
                    <div className='d-flex-column w-100'>
                        <h1 className='fsize-xs-5 f-w-800'>{topic?.title}</h1>
                        <p className='fsize-xs-2 f-w-300 mt-xs-4'>
                            {topic?.description}
                        </p>
                    </div>
                </div>

                {topic?.cover &&
                    <div id='image' className='w-100  d-flex-row j-c-center align-items-center mt-xs-4 border-radius-08 overflow-all-hidden'>
                        <img className='w-100 h-inherit  object-fit-cover' src={topic?.cover}/>
                    </div>
                }
                <div id='like row' className=' w-100 d-flex-row j-c-space-between align-items-center mt-xs-4 mb-xs-2'>
                    <div className='d-flex-row j-c-start align-items-center'>
                        <div className='d-flex-row j-c-start align-items-center gap-0_25em'>
                            <div className='border-radius-100 avatar-20 d-flex-row j-c-center align-items-center'>
                                {
                                    liked ?
                                    <img className='avatar-20' src={IconThunderActive} onClick={() => likeTopic(topic?.id)}/>
                                    :
                                    <img className='avatar-20' src={IconThunder} onClick={() => likeTopic(topic?.id)}/>
                                }
                            </div>
                            <p className='fsize-xs-1 f-w-300'>{topic?.likes.length}</p>
                            <div className='border-radius-100 avatar-20 d-flex-row j-c-center align-items-center'>
                                <img className='avatar-20' src={IconComments} onClick={() => {spotCommentToReply(null)}}/>
                            </div>
                            <p className='fsize-xs-1 f-w-300'>{topic?.commentsCount}</p>
                            <div className='border-radius-100  avatar-20 d-flex-row j-c-center align-items-center'>
                                <img className='avatar-20' src={IconShare} onClick={() => shareTopic()} />
                            </div>
                        </div>
                    </div>
                    <div className='d-flex-row j-c-center align-items-center'>
                        <div className='border-radius-100  avatar-20'>
                        {
                            saved ?
                            <img className='avatar-20' src={IconSaveActive} onClick={() => saveTopic(topic?.id)}/>
                            :
                            <img className='avatar-20' src={IconSave} onClick={() => saveTopic(topic?.id)}/>
                        }
                        </div>
                    </div>
                    
                </div>
            </div>
            

        </div>
    )
}

export default TopicMain