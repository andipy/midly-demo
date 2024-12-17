import { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { FanclubsContext } from '../contexts/fanclubs.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'

import Container from '../layout/container.layout'
import FullScreenModalLayout from '../layout/full-screen-modal.layout'
import Carousel from '../layout/carousel.layout'

import Button from '../components/button.component'
import NavbarCommentsModal from '../components/navbar-comments-modal.component'
import AudioPost from '../components/audio-post.component'

import IconCopy from '../images/icons/icon-copy.svg'

const PostSettingsRoute = () => {

    const navigate = useNavigate()
    const { state, pathname } = useLocation()
    const onClick = () => {
        navigate(-1, { state : {...state, invokedModal: false}})
    }

    console.log(state, 'post dallo state')
    console.log(state.media.map(media => media.url))

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
                        className='bg-dark white fsize-xs-2 f-w-500 white letter-spacing-1 border-radius-02 mt-xs-2'
                        type='text'
                        placeholder={`${state?.caption ? state?.caption : 'Scrivi una didascalia per il tuo post'}`}
                        value={state?.caption}
                        rows={4}
                        // onChange={(e) => handleCaption(e)} 
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
                            placeholder={`${state?.link?.url ? state?.link?.url : 'https://...'}`}
                            value={state?.link?.url}
                            // onChange={(e) => handleLink(e)} 
                        />
                    </div>
                    <div>
                        <label className='fsize-xs-1 grey-300 letter-spacing-3 ml-xs-4'>{'NOME LINK'}</label>
                        <input
                            id={`input-caption`}
                            className='bg-dark white fsize-xs-2 f-w-500 white letter-spacing-1 border-radius-02 mt-xs-2'
                            type='text'
                            placeholder={`${state?.link?.name ? state?.link?.name : 'Dai un nome al link'}`}
                            value={state?.link?.name}
                            // onChange={(e) => handleLinkName(e)} 
                        />
                    </div>
                </section>

                <div className='d-flex-row align-items-center j-c-space-between mt-xs-10'>
                    <div className='d-flex-column j-start align-items-start'>
                        <p className='fsize-xs-3 f-w-500'>Offusca per gli utenti non abbonati</p>
                        <p className='fsize-xs-1 f-w-300 grey-200'>Per i non abbonati sarà offuscato</p>
                    </div>
                    
                    <div
                        className={`toggle-area ${state?.settings?.isPrivate ? 'toggle-area-on' : 'toggle-area-off'}`}
                        //onClick={(e) => handleIsPrivate(e)}
                    >
                        <div className={`toggle-dot ${state?.settings?.isPrivate ? 'toggle-on' : 'toggle-off'}`}></div>
                    </div>
                </div>

                <div className='d-flex-row align-items-center j-c-space-between mt-xs-10 mb-xs-8'>
                    <div className='d-flex-column j-start align-items-start'>
                        <p className='fsize-xs-3 f-w-500'>Contenuto pinnato</p>
                        <p className='fsize-xs-1 f-w-300 grey-200'>Potrai spinnarlo in ogni momento</p>
                    </div>
                    <div
                        className={`toggle-area ${state?.settings?.isPinned ? 'toggle-area-on' : 'toggle-area-off'}`}
                        //onClick={(e) => handleIsPinned(e)}
                    >
                        <div className={`toggle-dot ${state?.settings?.isPinned ? 'toggle-on' : 'toggle-off'}`}></div>
                    </div>
                </div>

                <Button
                    style='bg-acid-lime fsize-xs-3 f-w-600 dark-900 letter-spacing-1 mt-xs-4'
                    label='Salva'
                />
            </Container>
        </FullScreenModalLayout>
    )
}

export default PostSettingsRoute