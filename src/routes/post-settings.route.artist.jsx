import { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom'

import { FanclubsContext } from '../contexts/fanclubs.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'

import Container from '../layout/container.layout'
import FullScreenModalLayout from '../layout/full-screen-modal.layout'
import Carousel from '../layout/carousel.layout'

import Button from '../components/button.component'
import NavbarCommentsModal from '../components/navbar-comments-modal.component'
import AudioPost from '../components/audio-post.component'
import FullPageCenter from '../layout/full-page-center.layout'

import IconCopy from '../images/icons/icon-copy.svg'

const PostSettingsRoute = () => {

    const navigate = useNavigate()
    const { setPostInFocus } = useOutletContext()
    const { state } = useLocation()
    const {fanclubs, setFanclubs} = useContext(FanclubsContext)


    const onClick = () => {
        navigate(-1, { state : { ...state, invokedModal: false }})
        setPostInFocus({
            id: undefined,
            action: undefined,
            post: undefined
        })
    }

    const [post, setPost] = useState({})
    const fetchThisPost = () => {
        setPost(state)
    }

    useEffect(() => {
            if (state) {
                fetchThisPost()
            }
    }, [state])

/*     useEffect(() => {
        if (post) {
            console.log(post)
        }
    }, [post]) */
    

    const updatePosts = () => {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === post.artistId) {
                    return {
                        ...fanclub,
                        posts: fanclub.posts.map(elem => {
                            if ( elem.id === post.id ) {
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

        navigate(-1)
    }

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

    const [modal, setModal] = useState(false)

    const deletePost = () => {
        setModal(true)
    }

    const [isExiting, setIsExiting] = useState(false)

    useEffect(() => {
        if (isExiting) {
            const endDelay = setTimeout(() => {
                setModal(false)
                setIsExiting(false)
            }, 400)

            return () => clearTimeout(endDelay)
        }
    }, [isExiting])

    const deletePostConfirmation = () => {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === post.artistId) {
                    return {
                        ...fanclub,
                        posts: fanclub.posts.filter(elem => elem.id !== post.id)
                    }
                }
                
                return fanclub
            })
        )
        navigate(-1)
    }


    return (
        <FullScreenModalLayout background='bg-dark-soft'>
            <NavbarCommentsModal closeModal={onClick} title={'Impostazioni post'} />

            <Container style=''>
                <div className='position-relative'>
                    <Carousel>
                        {state?.media &&
                            state.media?.map(media => (
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
                        {state?.text?.length > 0 &&
                            <div className='d-flex-row align-items-center bg-dark-soft pt-xs-6 pb-xs-6 border-radius-04 w-min-100'>
                                <p className='fsize-xs-8 t-align-center f-w-600 pl-xs-4 pr-xs-4 line-height-140'>{state.text}</p>
                            </div>
                        }

                        {(state?.media?.length > 1 || (state?.media?.length > 0 && state?.text?.length > 0)) &&
                            <div className='d-flex-row position-absolute bottom-2 right-2 bg-black-transp70 pr-xs-2 pl-xs-1 border-radius-100 j-c-center align-items-center'>
                                <img className='avatar-28' src={IconCopy} />
                                <p className='fsize-xs-2 f-w-500'>Riordina</p>
                            </div>
                        }
                    </Carousel>
                </div>

                <div className='mt-xs-10'>
                    <label className='fsize-xs-1 grey-300 letter-spacing-3 ml-xs-4'>{'CAPTION'}</label>
                    <textarea
                        id={`input-caption`}
                        className='bg-dark white fsize-xs-2 f-w-500 white letter-spacing-1 border-radius-02 mt-xs-2'
                        type='text'
                        placeholder={`${post?.caption ? post?.caption : 'Scrivi una didascalia per il tuo post'}`}
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
                            className='bg-dark white fsize-xs-2 f-w-500 white letter-spacing-1 border-radius-02 mt-xs-2'
                            type='text'
                            placeholder={`${post?.link?.url ? post?.link?.url : 'https://...'}`}
                            value={post?.link?.url}
                            onChange={(e) => handleLink(e)} 
                        />
                    </div>
                    <div>
                        <label className='fsize-xs-1 grey-300 letter-spacing-3 ml-xs-4'>{'NOME LINK'}</label>
                        <input
                            id={`input-caption`}
                            className='bg-dark white fsize-xs-2 f-w-500 white letter-spacing-1 border-radius-02 mt-xs-2'
                            type='text'
                            placeholder={`${post?.link?.name ? post?.link?.name : 'Dai un nome al link'}`}
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
                    
                    <div
                        className={`toggle-area ${post?.settings?.isPrivate ? 'toggle-area-on' : 'toggle-area-off'}`}
                        onClick={(e) => handleIsPrivate(e)}
                    >
                        <div className={`toggle-dot ${post?.settings?.isPrivate ? 'toggle-on' : 'toggle-off'}`}></div>
                    </div>
                </div>

                <div className='d-flex-row align-items-center j-c-space-between mt-xs-10 mb-xs-8'>
                    <div className='d-flex-column j-start align-items-start'>
                        <p className='fsize-xs-3 f-w-500'>Contenuto pinnato</p>
                        <p className='fsize-xs-1 f-w-300 grey-200'>Potrai spinnarlo in ogni momento</p>
                    </div>
                    <div
                        className={`toggle-area ${post?.settings?.isPinned ? 'toggle-area-on' : 'toggle-area-off'}`}
                        onClick={(e) => handleIsPinned(e)}
                    >
                        <div className={`toggle-dot ${post?.settings?.isPinned ? 'toggle-on' : 'toggle-off'}`}></div>
                    </div>
                </div>

                <Button
                    style='fsize-xs-3 f-w-600 letter-spacing-1 bg-red-300 black border-radius-04'
                    onClick={deletePost}
                    label='Elimina post'
                />

                <Button
                    style='bg-acid-lime fsize-xs-3 f-w-600 dark-900 letter-spacing-1 mt-xs-4'
                    onClick={updatePosts}
                    label='Salva'
                />
            </Container>
            {modal && 
                <FullPageCenter style='z-index-1100 bg-black-transp70'>
                    <Container style={`centered-popup position-absolute d-flex-column align-items-center bg-dark-soft-2 border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2  ${isExiting ? 'fade-out' : ''} `}>
                        <div className='d-flex-column align-items-center j-c-center w-100 pt-xs-2 pb-xs-2 pr-xs-2 pl-xs-2'>
                            <h1 className='fsize-xs-3 f-w-500 t-align-center mb-xs-8'>Stai per eliminare definitivamente questo post, l'azione è irreversibile</h1>
                            <Button
                                style='fsize-xs-3 f-w-600 letter-spacing-1 bg-red-300 black border-radius-04'
                                onClick={deletePostConfirmation}
                                label='Elimina definitivamente'
                            />
                            <Button
                                style='fsize-xs-3 f-w-400 letter-spacing-1 bg-grey-500 white border-radius-04 mt-xs-4'
                                onClick={() => setIsExiting(true)}
                                label='Annulla'
                            />
                        </div>
                    </Container>
                </FullPageCenter>
            }
        </FullScreenModalLayout>
    )
}

export default PostSettingsRoute