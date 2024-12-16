import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { CurrentArtistContext } from '../contexts/currentArtist.context'
import { FanclubsContext } from '../contexts/fanclubs.context'

import ContainerDefault from '../layout/container-default.layout'
import Carousel from '../layout/carousel.layout'

import NavbarDismiss from '../components/navbar-dismiss.component'
import Button from '../components/button.component'

import IconCopy from "../images/icons/icon-copy.svg"
import AudioPost from '../components/audio-post.component'

const ContentCreationReviewRoute = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const { postId } = location.state || {}
    const { currentArtist } = useContext(CurrentArtistContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)

    const [post, setPost] = useState({})

    const fetchThisPost = () => {
        let thisPost
        fanclubs.forEach(fanclub => {
            if (fanclub.artistId === currentArtist.id) {
                thisPost = fanclub.posts.find(elem => elem.id === postId)
            }
        })
        setPost(thisPost || { media: [], text: '', link: {}, settings: {} })
    }

    useEffect(() => {
        if (postId) {
            fetchThisPost()
        }
    }, [postId, fanclubs, currentArtist])

    const handleCaption = (e) => {
        e.preventDefault()
        setPost(prev => ({
            ...prev,
            caption: e.target.value
        }))
    }
    const handleLink = (e) => {
        e.preventDefault()
        setPost(prev => ({
            ...prev,
            link: {
                ...prev.link, 
                url: e.target.value
            }
        }))
    }
    const handleLinkName = (e) => {
        e.preventDefault()
        setPost(prev => ({
            ...prev,
            link: {
                ...prev.link, 
                name: e.target.value
            }
        }))
    }
    const handleIsPinned = (e) => {
        e.preventDefault()
        setPost(prev => ({
            ...prev,
            settings: {
                ...prev.settings, 
                isPinned: !post?.settings?.isPinned
            }
        }))
    }
    const handleIsPrivate = (e) => {
        e.preventDefault()
        setPost(prev => ({
            ...prev,
            settings: {
                ...prev.settings, 
                isPrivate: !post?.settings?.isPrivate
            }
        }))
    }

    const updatePosts = () => {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === currentArtist.id) {
                    return {
                        ...fanclub,
                        posts: fanclub.posts.map(elem => {
                            if ( elem.id === postId ) {
                                return {
                                    ...elem,
                                    mode: 'PUBLISHED',
                                    caption: post?.caption,
                                    link: {
                                        name: post?.link?.name,
                                        url: post?.link.url
                                    },
                                    settings: {
                                        isPinned: post?.settings?.isPinned,
                                        isPrivate: post?.settings?.isPrivate
                                    }
                                }
                            }
                            return elem
                        })
                    }
                }
                return fanclub
            })
        )

        navigate('/artist-app/fanclub')
    }

    const deletePost = () => {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === currentArtist.id) {
                    return {
                        ...fanclub,
                        posts: fanclub.posts.filter(elem => elem.id !== postId)
                    }
                }
                
                return fanclub
            })
        )
    }    

    return (
        <>
            <NavbarDismiss transparent={true} forcedExitPath={'/artist-app/fanclub'} clear={deletePost} />

            <ContainerDefault containerSpecificStyle={'pt-xs-topbar pb-xs-appbar'}>
                <h1 className='fsize-xs-5 f-w-600 mb-xs-8'>Rivedi il post e pubblica</h1>
                <div className='position-relative '>
                    <Carousel>
                        {post?.media &&
                            post.media?.map(media => (
                                media.type === 'IMAGE' ?
                                    <img
                                        key={media.id}
                                        className={`border-radius-04 w-100 h-100`}
                                        src={media.url}
                                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                    />
                                : media.type === 'VIDEO' ?
                                    <video
                                        key={media.id}
                                        className={`border-radius-04 w-100 h-100`}
                                        src={media.url}
                                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                        controls={false}
                                        autoPlay
                                        playsInline
                                        loop
                                    />
                                : media.type === 'AUDIO' ?
                                    <div className='d-flex-row j-c-center align-items-center w-min-100 h-min-100  objcet-fit-cover bg-dark-gradient border-radius-04'
                                    >
                                        <AudioPost src={media.url} />
                                    </div>
                                : null
                            ))
                        }
                        {post?.text?.length > 0 &&
                            <div className='d-flex-row align-items-center bg-dark-soft pt-xs-6 pb-xs-6 border-radius-04 w-min-100'>
                                <p className='fsize-xs-8 t-align-center f-w-600 pl-xs-4 pr-xs-4 line-height-140'>{post.text}</p>
                            </div>
                        }

                        {(post?.media?.length > 1 || (post?.media?.length > 0 && post?.text?.length > 0)) &&
                            <div className='d-flex-row position-absolute bottom-2 right-2 bg-black-transp70 pr-xs-2 pl-xs-1 border-radius-100 j-c-center align-items-center'>
                                <img className='avatar-28' src={IconCopy}></img>
                                <p className='fsize-xs-2 f-w-500'>Riordina</p>
                            </div>
                        }
                    </Carousel>
                </div>
                
                <div className='mt-xs-10'>
                    <label className='fsize-xs-1 grey-300 letter-spacing-3 ml-xs-4'>{'CAPTION'}</label>
                    <textarea
                        id={`input-caption`}
                        className='bg-dark-soft white fsize-xs-2 f-w-300 grey-400 letter-spacing-1 border-radius-02 mt-xs-2'
                        type='text'
                        placeholder={`${ post?.caption ? post?.caption : 'Scrivi una didascalia per il tuo post'}`}
                        value={post?.caption}
                        rows={4}
                        onChange={(e) => handleCaption(e)} 
                        style={{ resize: 'none' }}
                    />
                </div>

                <section className='d-flex-column gap-1em mt-xs-10'>
                    <div>
                        <label className='fsize-xs-1 grey-300 letter-spacing-3 ml-xs-4'>{'URL LINK'}</label>
                        <input
                            id={`input-caption`}
                            className='bg-dark-soft white fsize-xs-2 f-w-300 grey-400 letter-spacing-1 border-radius-02 mt-xs-2'
                            type='text'
                            placeholder={`${ post?.link?.url ? post?.link?.url : 'https://...'}`}
                            value={post?.link?.url}
                            onChange={(e) => handleLink(e)} 
                        />
                    </div>
                    <div>
                        <label className='fsize-xs-1 grey-300 letter-spacing-3 ml-xs-4'>{'NOME LINK'}</label>
                        <input
                            id={`input-caption`}
                            className='bg-dark-soft white fsize-xs-2 f-w-300 grey-400 letter-spacing-1 border-radius-02 mt-xs-2'
                            type='text'
                            placeholder={`${ post?.link?.name ? post?.link?.name : 'Dai un nome al link'}`}
                            value={post?.link?.name}
                            onChange={(e) => handleLinkName(e)} 
                        />
                    </div>
                </section>

                <div className='d-flex-row align-items-center j-c-space-between mt-xs-10'>
                    <div className='d-flex-column j-start align-items-start'>
                        <p className='fsize-xs-3 f-w-500'>Offusca per gli utenti non abbonati</p>
                        <p className='fsize-xs-1 f-w-300 grey-200'>Per i non abbonati sarà offuscato</p>
                    </div>
                    
                    <div className={`toggle-area ${post?.settings?.isPrivate ? 'toggle-area-on' : 'toggle-area-off'}`} onClick={(e) => handleIsPrivate(e)}>
                        <div className={`toggle-dot ${post?.settings?.isPrivate ? 'toggle-on' : 'toggle-off'}`}></div>
                    </div>
                </div>

                <div className='d-flex-row align-items-center j-c-space-between mt-xs-10 mb-xs-8'>
                    <div className='d-flex-column j-start align-items-start'>
                        <p className='fsize-xs-3 f-w-500'>Contenuto pinnato</p>
                        <p className='fsize-xs-1 f-w-300 grey-200'>Potrai spinnarlo in ogni momento</p>
                    </div>
                    <div className={`toggle-area ${post?.settings?.isPinned ? 'toggle-area-on' : 'toggle-area-off'}`} onClick={(e) => handleIsPinned(e)}>
                        <div className={`toggle-dot ${post?.settings?.isPinned ? 'toggle-on' : 'toggle-off'}`}></div>
                    </div>
                </div>
            </ContainerDefault>

            <div className='position-fixed bottom-0 w-100 pt-xs-4 pb-xs-4 bg-dark'>
                <ContainerDefault>
                    <Button
                        style='bg-acid-lime black fsize-xs-3 f-w-600'
                        onClick={updatePosts}
                        label='Pubblica'
                    />
                </ContainerDefault>
            </div>
        </>
    )
}

export default ContentCreationReviewRoute
