import { useState, useEffect } from "react"
import {useNavigate } from 'react-router-dom'

import SwipeCarousel from "../layout/swipe-carousel.layout"
import IconSettings from '../images/icons/icon-settings-white.svg'
import IconLike from '../images/icons/icon-like-white-empty.svg'
import IconComments from '../images/icons/icon-comment-white.svg'
import IconShare from '../images/icons/icon-share-white.svg'
import AudioPost from "./audio-post.component"


const PostCopy = ({post, hasUserSubscribed, onClick, userType}) => {
    const navigate = useNavigate()
    const [showCaption, setShowCaption] = useState(false)
    const [days, setDays] = useState(0)
    useEffect(() => {
        const specificDate = new Date(post.createdAt) // Inserisci qui la data specifica
        const currentDate = new Date()

        const timeDifference = currentDate - specificDate
        const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

        setDays(daysPassed)
    }, [post])

    const formatDate = () => {
        const specificDate = new Date(post.createdAt)
        const day = specificDate.getDate()
        const month = specificDate.toLocaleString('default', { month: 'long' })
        const formattedMonth =  month
        const year = specificDate.getFullYear()
        const today = new Date()
        const thisYear = today.getFullYear()
        return day + ' ' + formattedMonth + ' ' + `${year === thisYear ?  '' : year}`
    }

    const isImage = (media) => {
        return /\.(jpg|jpeg|png|gif|webp)$/i.test(media)
    }
      
    const isAudio = (media) => {
        return /\.(mp3|wav|ogg|m4a)$/i.test(media)
    }

    const isVideo = (media) => {
        return /\.(MP4|mp4|webm|ogg)$/i.test(media)
    }

  return (
    <>
    <div className='bg-dark-gradient border-radius-01 mb-xs-8 position-relative overflow-hidden d-flex-column j-c-start align-items-center pt-xs-4 pr-xs-4 pl-xs-4 pb-xs-4'>
        {!post.settings.isPrivate && userType == 'FAN' &&
                <p className='fsize-xs-2 grey-200 mb-xs-2 gold'>Contenuto gratuito</p>
        }
        {/*Post foto, video, audio e testo o foto singola o video singolo o audio singolo*/}
        {(isImage(post.media[0]) || isVideo(post.media[0]) || isAudio(post.media[0])) && 
        <div className={`border-radius-04 w-100 h-100 `}>
            <div className={`w-100 h-300px j-c-center align-items-center border-radius-02 overflow-all-hidden position-relative`}>
                <div className={`${(post.settings.isPrivate && hasUserSubscribed === false && userType === 'FAN') ? 'blur-50' : ''} d-flex-row j-c-center align-items-center w-100 h-100`}>
                    {post.media.length > 0 ? (
                        <SwipeCarousel images={post.media} text={post.text} />

                    ) : (
                        <>
                        </>
                    )}
                </div>
            </div>
        </div>
        }
        {/*Post solo testo*/}
        {post.media.length === 0 &&
        <div className={`border-radius-04 w-100 h-100 `}>
            <div className={`w-100 h-300px j-c-center align-items-center border-radius-02 overflow-all-hidden position-relative`}>
                <div className={`${(post.settings.isPrivate && hasUserSubscribed === false && userType=== 'FAN') ? 'blur-50' : ''} d-flex-row j-c-center align-items-center w-100 h-100`}>
                    {post.media.length > 0 ? (
                        <>
                        </>
                    ) : (
                        <>
                        <div className="w-100 h-100 bg-black d-flex-row j-c-center align-items-center pr-xs-2 pl-xs-2">
                            <p className="fsize-xs-8 t-align-center f-w-600">{post.text}</p>
                        </div>
                        </>
                    )}
                </div>
            </div>
        </div>
        }
        {(post.settings.isPrivate === false || (post.settings.isPrivate === true && hasUserSubscribed === true) || userType === 'ARTIST') ? (
            <>
            <div className="d-flex-row w-100 j-c-space-between align-items-center mt-xs-2 pl-xs-2 pr-xs-2">
                <div className="d-flex-row align-items-center gap-0_5em">
                    <div className="d-flex-row align-items-center gap-0_25em">
                        <img className="avatar-24" src={IconLike}/>
                        <p className="fsize-xs-1">{post.likes}</p>
                    </div>
                    <div className="d-flex-row align-items-center gap-0_25em">
                        <img className="avatar-24" src={IconComments} 
                        onClick={(event) => {
                            event.preventDefault()
                            navigate(`/new-components-test/comments`, {
                              state: { invokedModal: true},
                          })}}
                          />
                        <p className="fsize-xs-1">{post.comments.length}</p>
                    </div>
                    <div className="d-flex-row align-items-center gap-0_25em">
                        <img className="avatar-24" src={IconShare}/>
                        <p className="fsize-xs-1">{post.shares}</p>
                    </div>
                </div>
                <div className="d-flex-row">
                    {userType == 'ARTIST' &&
                        <img className="avatar-24" src={IconSettings}/>
                    }
                </div>

            </div>
            <div className="w-100 d-flex-row">
            <p className="pre-wrap mb-xs-1 grey-200 f-w-300 fsize-xs-1">
                {post.caption.length > 95 
                ? <>
                    {showCaption === true 
                    ?   <>
                            {post.caption}
                            <span className="grey-400 f-w-500" onClick={() => setShowCaption(false)}>   meno</span>
                        </>
                    :
                        <>
                        {post.caption.slice(0, 95)}...
                        <span className="lime-400 f-w-500" onClick={() => setShowCaption(true)}> altro</span>
                        </>

                    }
                    
                    </>
                : post.caption}
            </p>
            </div>
            <div className="w-100 j-c-start d-flex-row">
                {post.comments.length > 0 ? (
                    <p 
                    className="lime-400 f-w-500 fsize-xs-1"
                    onClick={(event) => {
                        event.preventDefault()
                        navigate(`/new-components-test/comments`, {
                          state: { invokedModal: true},
                      })}}>
                        Visualizza tutti i {post.comments.length} commenti
                    </p>
                ) : (
                    <p className="grey-500 f-w-400 fsize-xs-1">Commenta per primo!</p>
                )}

            </div>
            <div className="w-100 j-c-start d-flex-row mt-xs-1">
                <p className="fsize-xs-0 f-w-100 grey-400">
                    {days > 31 ? (
                        <>
                            {formatDate()}
                        </>
                    ):(
                        <>
                        {days} giorni fa
                        </>

                    )}
                    
                </p>
            </div>
            </>
        ) : (
            <>
            <div className="w-100 j-c-start d-flex-row">
                <p className="fsize-xs-2 grey-200 gold">Contenuto da sbloccare</p>
            </div>
            <div className="w-100 j-c-start d-flex-row mt-xs-1">
                <p className="fsize-xs-0 f-w-100 grey-400">
                    {days > 31 ? (
                        <>
                            {formatDate()}
                        </>
                    ):(
                        <>
                        {days} giorni fa
                        </>

                    )}
                    
                </p>
            </div>
            </>
        )}
        
    </div>
    </>
  )
}

export default PostCopy