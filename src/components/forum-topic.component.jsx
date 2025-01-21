import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'

import { CurrentFanContext } from '../contexts/currentFan.context'

import Carousel from "../layout/carousel.layout"
import IconComments from '../images/icons/icon-comment-white.svg'
import IconShare from '../images/icons/icon-share-white.svg'
import IconLink from '../images/icons/icon-link.svg'
import IconThunder from '../images/icons/icon-thunder.svg'
import IconThunderActive from '../images/icons/icon-thunder-active.svg'
import IconVerifiedArtist from '../images/icons/icon-verified-artist.svg'


const ForumTopic = ({key, topic, like, share}) => {
    const { currentFan} = useContext(CurrentFanContext)
    const [liked, setLiked] = useState(false)
        useEffect(() => {
            if (topic && topic.likes) {
                const userLiked = topic.likes.some(p => p.userId === currentFan.id)
                setLiked(userLiked)
            }
        }, [topic])
  return (
    <div className="bg-dark-gradient artist-card-highlight-multiple pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 border-radius-08 h-min-100">
        {
            topic?.publisher.type === 'FAN' ?
                <div className="w-100 d-flex-row align-items-center j-c-start gap-0_5em h-100">
                    <div className="avatar-60 border-radius-100 w-100">
                        <img className="avatar-60 border-radius-100" src={topic?.userImage}/>
                    </div>
                    <div className="d-flex-column align-items-start j-c-space-between w-100 h-100"> 
                        <div className="d-flex-column j-c-start align-items-start">
                            <h1 className="fsize-xs-3 f-w-600 white t-align-start">{topic?.title}</h1>                            
                        </div>
                        <div className="d-flex-column j-c-start align-items-start">
                            <p className="fsize-xs-2 f-w-300 white t-align-start mt-xs-2">{topic?.topic}</p>
                        </div>
                        <div className="d-flex-column j-c-start align-items-start mt-xs-4 w-100">
                            <div className="d-flex-row j-c-start align-items-center gap-0_25em mt-xs-4">
                                <div className="border-radius-100 avatar-20">
                                    {
                                        liked ?
                                        <img className="avatar-20" src={IconThunderActive} onClick={() => like(topic.id)}/>
                                        :
                                        <img className="avatar-20" src={IconThunder} onClick={() => like(topic.id)}/>
                                    }
                                    
                                </div>
                                <p className="fsize-xs-1 f-w-300">{topic?.likes.length}</p>
                                <div className="border-radius-100 avatar-20">
                                    <img className="avatar-20" src={IconComments}/>
                                </div>
                                <p className="fsize-xs-1 f-w-300">{topic?.comments.length}</p>
                                <div className="border-radius-100  avatar-20">
                                    <img className="avatar-20" src={IconShare} onClick={() => share()}/>
                                </div>
                            </div>
                            <div className="w-80">
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
                    </div>
                </div>
            :
            <div className="w-100 d-flex-row align-items-center j-c-start gap-0_5em h-100">
                    <div className="avatar-60 border-radius-100 position-relative">
                        <img className="avatar-60 border-radius-100" src={topic?.userImage}/>
                        <img className='artist-avatar-verified-icon' src={IconVerifiedArtist} />
                    </div>
                    <div className="d-flex-column align-items-start j-c-space-between w-100 h-100"> 
                        <p className="fsize-xs-0 gold">Artista</p>
                        <div className="d-flex-column j-c-start align-items-start">   
                            <h1 className="fsize-xs-3 f-w-600 white t-align-start">{topic?.title}</h1>                            
                        </div>
                        <div className="d-flex-column j-c-start align-items-start">
                            <p className="fsize-xs-2 f-w-300 white t-align-start mt-xs-2">{topic?.topic}</p>
                        </div>
                        <div className="d-flex-column j-c-start align-items-start mt-xs-4 w-100">
                            <div className="d-flex-row j-c-start align-items-center gap-0_25em mt-xs-4">
                                <div className="border-radius-100 avatar-20">
                                    {
                                        liked ?
                                        <img className="avatar-20" src={IconThunderActive} onClick={() => like(topic.id)}/>
                                        :
                                        <img className="avatar-20" src={IconThunder} onClick={() => like(topic.id)}/>
                                    }
                                </div>
                                <p className="fsize-xs-1 f-w-300">{topic?.likes.length}</p>
                                <div className="border-radius-100 avatar-20">
                                    <img className="avatar-20" src={IconComments}/>
                                </div>
                                <p className="fsize-xs-1 f-w-300">{topic?.comments.length}</p>
                                <div className="border-radius-100  avatar-20">
                                    <img className="avatar-20" src={IconShare} onClick={() => share()}/>
                                </div>
                            </div>
                            <div className="w-80">
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
                    </div>
            </div>
        }

    </div>
  )
}

export default ForumTopic