import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'

import { CurrentFanContext } from '../contexts/currentFan.context'

import Carousel from "../layout/carousel.layout"
import IconComments from '../images/icons/icon-comment-white.svg'
import IconShare from '../images/icons/icon-share-white.svg'
import IconSave from '../images/icons/icon-save.svg'
import IconSaveActive from '../images/icons/icon-save-active.svg'
import IconLink from '../images/icons/icon-link.svg'
import IconThunder from '../images/icons/icon-thunder.svg'
import IconThunderActive from '../images/icons/icon-thunder-active.svg'
import IconVerifiedArtist from '../images/icons/icon-verified-artist.svg'
import Container from '../layout/container.layout'


const ForumTopic = ({key, topic, like, save, share, popular}) => {
    const { currentFan} = useContext(CurrentFanContext)
    const [liked, setLiked] = useState(false)
    useEffect(() => {
        if (topic && topic.likes) {
            const userLiked = topic.likes.some(p => p.userId === currentFan.id)
            setLiked(userLiked)
        }
    }, [topic])

    const [saved, setSaved] = useState(false)
    useEffect(() => {
        if (topic && topic.saved) {
            const userSaved = topic.saved.some(p => p.userId === currentFan.id)
            setSaved(userSaved)
        }
    }, [topic])
  return (
    <div className="image-wrapper pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 border-bottom-dark-0_5">
        {
            topic?.publisher.type === 'FAN' ?
                <Container>
                    {
                        popular &&
                        <p className='fsize-xs-1 f-w-500 blue-bright-600 mb-xs-2'>Più popolare</p>
                    }
                    <div className="d-flex-column align-items-start j-c-center gap-1em">
                        <div id='top-row' className='d-flex-row j-c-start align-items-center gap-0_5em'>
                            <img className='avatar-28 border-radius-100' src={topic?.userImage}/>
                            <p className='fsize-xs-1 f-w-500'>{topic?.userName}</p>
                        </div>
                        <div id='centre-row' className='d-flex-row j-c-space-between align-items-center w-100'>
                            <div id='text' className='d-flex-column w-100'>
                                <h1 className='fsize-xs-5 f-w-800'>{topic?.title}</h1>
                                <p className='fsize-xs-2 f-w-300'>{topic?.topic}</p>
                            </div>
                            <div id='image' className='d-flex-row w-80px '> 
                                <img className='w-100 h-inherit object-fit-cover border-radius-08' src={topic?.cover}/>
                            </div>

                        </div>
                        <div id='like row' className=' w-100 d-flex-row j-c-space-between align-items-center gap-0_25em'>
                            <div className='d-flex-row j-c-start align-items-center'>
                                <p className='fsize-xs-1 f-w-300 grey-300'>2 giorni fa</p>
                                <div className="d-flex-row j-c-start align-items-center gap-0_25em">
                                    <div className="border-radius-100 avatar-28">
                                        {
                                            liked ?
                                            <img className="avatar-28" src={IconThunderActive} onClick={() => like(topic.id)}/>
                                            :
                                            <img className="avatar-28" src={IconThunder} onClick={() => like(topic.id)}/>
                                        }
                                    </div>
                                    <p className="fsize-xs-1 f-w-300">{topic?.likes.length}</p>
                                    <div className="border-radius-100 avatar-28">
                                        <img className="avatar-28" src={IconComments}/>
                                    </div>
                                    <p className="fsize-xs-1 f-w-300">{topic?.comments.length}</p>
                                    <div className="border-radius-100  avatar-28">
                                        <img className="avatar-28" src={IconShare} onClick={() => share()}/>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex-row'>
                                <div className="border-radius-100  avatar-28">
                                {
                                    saved ?
                                    <img className="avatar-28" src={IconSaveActive} onClick={() => save(topic.id)}/>
                                    :
                                    <img className="avatar-28" src={IconSave} onClick={() => save(topic.id)}/>
                                }
                                </div>
                            </div>
                            
                        </div>
                        <div id='hashtags' className='d-flex-row j-c-center align-items-center w-100'>
                            <Carousel>
                                {topic?.hashtags.map(tag => {
                                    return (
                                        <div className="bg-acid-lime-op-10 d-flex-row pt-xs-1 pr-xs-2 pl-xs-2 pb-xs-1 border-radius-02">
                                            <p className="fsize-xs-1 f-w-500 lime-400">#{tag}</p>
                                        </div>
                                    )
                                })}     

                            </Carousel>
                        </div>

                    </div>
                </Container>
            :
                <Container>
                    {
                        popular &&
                        <p className='fsize-xs-1 f-w-500 blue-bright-600 mb-xs-2'>Più popolare</p>
                    }
                    <div className="d-flex-column align-items-start j-c-center gap-1em">
                        <div id='top-row' className='d-flex-row j-c-start align-items-center gap-0_5em'>
                            <div className='avatar-28 border-radius-100 position-relative'>
                                <img className='avatar-28 border-radius-100' src={topic?.userImage}/>
                                <img className='artist-avatar-verified-icon avatar-12' src={IconVerifiedArtist} />
                            </div>
                            <p className='fsize-xs-1 f-w-500'>{topic?.userName}</p>
                            <p className='fsize-xs-0 f-w-300 gold'>Artista</p>
                        </div>
                        <div id='centre-row' className='d-flex-row j-c-space-between align-items-center w-100'>
                            <div id='text' className='d-flex-column w-100'>
                                <h1 className='fsize-xs-5 f-w-800'>{topic?.title}</h1>
                                <p className='fsize-xs-2 f-w-300'>{topic?.topic}</p>
                            </div>
                            <div id='image' className='d-flex-row w-80px '> 
                                <img className='w-100 h-inherit object-fit-cover border-radius-08' src={topic?.cover}/>
                            </div>

                        </div>
                        <div id='like row' className=' w-100 d-flex-row j-c-space-between align-items-center gap-0_25em'>
                            <div className='d-flex-row j-c-start align-items-center'>
                                <p className='fsize-xs-1 f-w-300 grey-300'>2 giorni fa</p>
                                <div className="d-flex-row j-c-start align-items-center gap-0_25em">
                                    <div className="border-radius-100 avatar-28">
                                        {
                                            liked ?
                                            <img className="avatar-28" src={IconThunderActive} onClick={() => like(topic.id)}/>
                                            :
                                            <img className="avatar-28" src={IconThunder} onClick={() => like(topic.id)}/>
                                        }
                                    </div>
                                    <p className="fsize-xs-1 f-w-300">{topic?.likes.length}</p>
                                    <div className="border-radius-100 avatar-28">
                                        <img className="avatar-28" src={IconComments}/>
                                    </div>
                                    <p className="fsize-xs-1 f-w-300">{topic?.comments.length}</p>
                                    <div className="border-radius-100  avatar-28">
                                        <img className="avatar-28" src={IconShare} onClick={() => share()}/>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex-row'>
                                <div className="border-radius-100  avatar-28">
                                {
                                    saved ?
                                    <img className="avatar-28" src={IconSaveActive} onClick={() => save(topic.id)}/>
                                    :
                                    <img className="avatar-28" src={IconSave} onClick={() => save(topic.id)}/>
                                }
                                </div>
                            </div>
                            
                        </div>
                        <div id='hashtags' className='d-flex-row j-c-center align-items-center w-100'>
                            <Carousel>
                                {topic?.hashtags.map(tag => {
                                    return (
                                        <div className="bg-acid-lime-op-10 d-flex-row pt-xs-1 pr-xs-2 pl-xs-2 pb-xs-1 border-radius-02">
                                            <p className="fsize-xs-1 f-w-500 lime-400">#{tag}</p>
                                        </div>
                                    )
                                })}     

                            </Carousel>
                        </div>

                    </div>
                </Container>
        }

    </div>
  )
}

export default ForumTopic