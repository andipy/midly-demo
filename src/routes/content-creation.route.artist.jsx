import React, { useRef, useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { CurrentArtistContext } from '../contexts/currentArtist.context'
import { FanclubsContext } from '../contexts/fanclubs.context'

import ContainerDefault from '../layout/container-default.layout'

import IconExit from '../images/icons/icon-exit.svg'
import IconSettings from '../images/icons/icon-settings-white.svg'
import IconLink from '../images/icons/icon-link.svg'
import IconText from '../images/icons/icon-text.svg'
import IconOk from '../images/icons/icon-ok.svg'
import NavbarMultistep from '../components/navbar-multistep.component'
import AppbarContentCreation from '../components/appbar-content-creation.component.artist'
import TextAreaCaption from '../components/textarea-caption.component.artist'
import LinkArea from '../components/link-area.component.artist'
import SettingsArea from '../components/settings-area.component.artist'
import Button from '../components/button.component'


const ContentCreationRoute = () => {

    const navigate = useNavigate()

    const { currentArtist } = useContext(CurrentArtistContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)
        
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const mediaRecorderRef = useRef(null)
    const [error, setError] = useState(null)
    const [recording, setRecording] = useState(false)
    const [facingMode, setFacingMode] = useState('user')
    const [video, setVideo] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [textContent, setTextContent] = useState(null)
    const [contentType, setContentType] = useState('PHOTO')
    const [showTextArea, setShowTextArea] = useState(false)
    const [showLinkArea, setShowLinkArea] = useState(false)
    const [showSettingsArea, setShowSettingsArea] = useState(false)
    const [post, setPost] = useState({
        id: undefined,
        artistId: currentArtist.id,
        media: [],
        text: '',
        caption: '',
        link: {
            url: '',
            name: ''
        },
        settings: {
            isPrivate: true
        },
        likes: 0,
        shares: 0,
        comments: [],
        createdAt: undefined
    })

    // this useEffect sets the height of the camera viewport
    useEffect(() => {
        const setWrapperHeight = () => {
            const outer = document.querySelector('.outer')
            const wrapper = document.querySelector('.camera-frame-wrapper')
            const mediaCreationControlBar = document.querySelector('.media-creation-control-bar')
            
            const outerHeight = (window.innerHeight - mediaCreationControlBar.offsetHeight)
            const wrapperHeight = (window.innerHeight - mediaCreationControlBar.offsetHeight)
            outer.style.setProperty('height', `${outerHeight}px`)
            wrapper.style.setProperty('height', `${wrapperHeight}px`)
        };

        // Initial setting of the height
        setWrapperHeight();

        // Adjust height on resize
        window.addEventListener('resize', setWrapperHeight);

        return () => window.removeEventListener('resize', setWrapperHeight);
    }, [])

    useEffect(() => {
        const getCameraStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                  video: { facingMode }
                })
                if (videoRef.current) {
                  videoRef.current.srcObject = stream;
                }
              } catch (err) {
                setError(err.message)
              }
            }

        const handleUserAction = () => {
            getCameraStream()
        }
      
        // Adding event listener to handle user interaction
        document.addEventListener('click', handleUserAction, { once: true })

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                let tracks = videoRef.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            }
        }
    }, [photo, video, facingMode, contentType])

    const switchCamera = () => {
        setFacingMode(prevMode => (prevMode === 'user' ? 'environment' : 'user'))
    }

    const handleCapturePhoto = () => {
        const canvas = canvasRef.current
        const video = videoRef.current
        if (canvas && video) {
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            const context = canvas.getContext('2d')
            context.drawImage(video, 0, 0, canvas.width, canvas.height)
            const dataUrl = canvas.toDataURL('image/png')
            setPhoto({
                id: post.media.length + 1,
                type: 'PHOTO',
                url: dataUrl
            })
        }
    }

    const handleStartRecording = () => {
        const stream = videoRef.current.srcObject
        const options = { mimeType: 'video/mp4' }
        mediaRecorderRef.current = new MediaRecorder(stream, options)
        const chunks = []
        mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data)
        mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' })
            const dataUrl = URL.createObjectURL(blob)
            setVideo({
                id: post.media.length + 1,
                type: 'VIDEO',
                url: dataUrl
            })
        }
        mediaRecorderRef.current.start()
        setRecording(true)
    }

    const handleStopRecording = () => {
        mediaRecorderRef.current.stop()
        setRecording(false)
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const dataUrl = URL.createObjectURL(file)
            if ( file.type.startsWith('image/') ) {
                setPhoto({
                    id: post.media.length + 1,
                    type: 'PHOTO',
                    url: dataUrl
                })
            } else if ( file.type.startsWith('video/') ) {
                setVideo({
                    id: post.media.length + 1,
                    type: 'VIDEO',
                    url: dataUrl
                })
            } else {
                console.error("Unsupported file type:", file.type);
            }
        }
    }

    const toggleRecording = () => {
        if (recording) {
            handleStopRecording()
        } else {
            handleStartRecording()
        }
    }

    const handleCaptureText = (e) => {
        e.preventDefault()
        setTextContent(e.target.value)
        setPost(prev => ({
            ...prev,
            text: e.target.value
        }))
    }

    const clearPhoto = (id) => {
        setPhoto(null)
        setPost(prev => ({
            ...prev,
            media: prev.media.filter(mediaItem => mediaItem.id !== id)  // Remove media item by ID
        }))
    }
    const keepPhoto = () => {
        setPost(prev => ({
            ...prev,
            media: [...prev.media, {
                id: photo.id,
                type: 'PHOTO',
                url: photo.url
            }]
        }))
        setPhoto(null)
    }
    const clearVideo = (id) => {
        setVideo(null)
        setPost(prev => ({
            ...prev,
            media: prev.media.filter(mediaItem => mediaItem.id !== id)  // Remove media item by ID
        }))
    }
    const keepVideo = () => {
        setPost(prev => ({
            ...prev,
            media: [...prev.media, {
                id: video.id,
                type: 'VIDEO',
                url: video.url
            }]
        }))
        setVideo(null)
    }
    const handlePhotoType = () => {
        setContentType('PHOTO')
    }
    const handleVideoType = () => {
        setContentType('VIDEO')
    }
    const handleTextType = () => {
        setContentType('TEXT')
    }

    const handleTextAreaVisibility = () => {
        setShowTextArea(prev => !prev)
    }
    const handleLinkAreaVisibility = () => {
        setShowLinkArea(prev => !prev)
    }
    const handleSettingsAreaVisibility = () => {
        setShowSettingsArea(prev => !prev)
    }

    const handleCaption = (e) => {
        e.preventDefault()
        setPost(prev => ({...prev, caption: e.target.value}))
    }
    const handleLinkUrl = (e) => {
        e.preventDefault()
        setPost(prev => ({
            ...prev,
            link: {
                ...prev.link,
                url: e.target.value,
            }
        }))
    }
    const handleLinkName = (e) => {
        e.preventDefault()
        setPost(prev => ({
            ...prev,
            link: {
                ...prev.link,
                name: e.target.value,
            }
        }))
    }
    const handleIsPrivate = () => {
        setPost(prev => ({
            ...prev,
            settings: {
                ...prev.settings,
                isPrivate: !prev.settings.isPrivate,
            }
        }))
    }

    const updatePosts = () => {
        let currentDate = new Date()
        let date = currentDate.toISOString().split('T')[0]
        setFanclubs(prevFanclubs => 
            prevFanclubs.map(fanclub =>
                fanclub.artistId === currentArtist.id
                    ? { ...fanclub, posts: [...fanclub.posts, { ...post, id: fanclub.posts.length + 1, createdAt: date }] }
                    : fanclub
            )
        )
        navigate('/artist-app/fanclub')
    }

    return (
        <>
        <div className='d-flex-column j-c-center outer'>
            <NavbarMultistep stepNumber={1} totalStepNumber={1} dismissable={true} transparent={true} forcedExitPath={'/artist-app/fanclub'} />
            {error && <p className='pt-xs-topbar'>Error accessing the camera: {error}</p>}
            
            <div className='camera-frame-wrapper position-relative'>
                {!video && !photo &&
                    <ContainerDefault containerSpecificStyle={'h-inherit d-flex-row align-items-center j-c-end position-absolute left-0 right-0'}>
                        <div className='d-flex-column gap-0_5em'>
                            {contentType !== 'TEXT' &&
                                <div className='d-flex-row align-items-center j-c-center z-index-3 bottom-0 avatar-40 bg-dark-soft-transp75 border-radius-100 mb-xs-2' onClick={handleTextAreaVisibility}>
                                    <img className='avatar-32' src={IconText} />
                                </div>
                            }
                            <div className='d-flex-row align-items-center j-c-center z-index-3 bottom-0 avatar-40 bg-dark-soft-transp75 border-radius-100 mb-xs-2' onClick={handleLinkAreaVisibility}>
                                <img className='avatar-32' src={IconLink} />
                            </div>
                            <div className='d-flex-row align-items-center j-c-center z-index-3 bottom-0 avatar-40 bg-dark-soft-transp75 border-radius-100 mb-xs-2'>
                                <img className='avatar-32' src={IconSettings} onClick={handleSettingsAreaVisibility} />
                            </div>
                        </div>
                    </ContainerDefault>
                }

                {!photo && !video &&
                    <>
                        {contentType === 'PHOTO' || contentType === 'VIDEO' ?
                            <video className='border-radius-1 overflow-clip object-fit-cover' ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%' }} />
                        : contentType === 'TEXT' &&
                            <textarea className='bg-dark-soft-2 white letter-spacing-1 border-radius-1 fsize-xs-6' placeholder='Scrivi qui...' rows='8' onChange={handleCaptureText}></textarea>
                        }
                    </>
                }

                {photo ?
                    <div className='position-relative' style={{ width: '100%', height: '100%' }}>
                        <div className='d-flex-row align-items-center j-c-center position-absolute-x z-index-3 bottom-2 gap-0_5em'>
                            <div className='d-flex-row align-items-center j-c-center bg-dark-soft-transp75 border-radius-100 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-4' onClick={() => clearPhoto(photo.id)}>
                                <img className='avatar-32' src={IconExit} alt="X" />
                                <span>Elimina</span>
                            </div>
                            <div className='d-flex-row align-items-center j-c-center bg-dark-soft-transp75 border-radius-100 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-4' onClick={() => keepPhoto(photo.id)}>
                                <img className='avatar-32' src={IconOk} alt="X" />
                                <span>Tieni</span>
                            </div>
                        </div>
                        <img className='border-radius-04 object-fit-cover w-100 h-100' src={photo?.url} />
                    </div>
                : video &&
                    <div className='position-relative'  style={{ width: '100%', height: '100%' }}>
                        <div className='d-flex-row align-items-center j-c-center position-absolute-x z-index-3 bottom-0 gap-0_5em'>
                            <div className='d-flex-row align-items-center j-c-center avatar-48 bg-dark-soft-transp75 border-radius-100 mb-xs-2' onClick={() => clearVideo(video.id)}>
                                <img className='avatar-32' src={IconExit} alt="X" />
                            </div>
                            <div className='d-flex-row align-items-center j-c-center avatar-48 bg-dark-soft-transp75 border-radius-100 mb-xs-2' onClick={() => keepVideo(video.id)}>
                                <img className='avatar-32' src={IconOk} alt="X" />
                            </div>
                        </div>
                        <video className='border-radius-04 object-fit-cover w-100 h-100' src={video?.url} controls={false} autoPlay={true} loop={true} />
                    </div>
                }

                <AppbarContentCreation
                    handleCapturePhoto={handleCapturePhoto}
                    toggleRecording={toggleRecording}
                    recording={recording}
                    contentType={contentType}
                    photo={photo}
                    video={video}
                    textContent={textContent}
                    updatePosts={updatePosts}
                    handlePhotoType={handlePhotoType}
                    handleVideoType={handleVideoType}
                    handleTextType={handleTextType}
                    facingMode={facingMode}
                    switchCamera={switchCamera}
                    handleFileChange={handleFileChange}
                />
            </div>

            <canvas ref={canvasRef} style={{ display: 'none' }} />

        </div>

        {!video && !photo &&
            <div className='media-creation-control-bar d-flex-row j-c-space-between align-items-center h-96px'>
                <ContainerDefault containerSpecificStyle={'d-flex-row j-c-space-between align-items-center gap-0_5em'}>
                    {post.media.length > 0 ?
                        <div className='d-flex-row align-items-center gap-0_25em overflow-x shrink-1'>
                            {post.media.map(elem => {
                                return (
                                    <>
                                        {elem.type ==='PHOTO' &&
                                            <img className='border-radius-04 object-fit-cover avatar-60' key={elem.id} src={elem.url} alt="" />
                                        }
                                        {elem.type ==='VIDEO' &&
                                            <video className='border-radius-04 object-fit-cover avatar-60' key={elem.id} src={elem.url} controls={false} autoPlay={true} loop={true} />
                                        }
                                    </>
                                )
                            })}
                        </div>
                    :
                        <p>Aggiungi almeno un media o un testo stand-alone per procedere alla pubblicazione del post</p>
                    }
                    <Button
                        style={`${post.media.length > 0 ? 'bg-acid-lime dark-900' : 'bg-dark-soft grey-400'} fsize-xs-2 f-w-600 border-radius-100 letter-spacing-1 no-shrink w-25`}
                        disabled={post.media.length > 0 ? false : true}
                        label={'Avanti →'}
                    ></Button>
                </ContainerDefault>
            </div>
        }

        <TextAreaCaption
            showTextArea={showTextArea}
            handleTextAreaVisibility={handleTextAreaVisibility}
            handleCaption={handleCaption}
        />

        <LinkArea
            showLinkArea={showLinkArea}
            handleLinkAreaVisibility={handleLinkAreaVisibility}
            handleLinkUrl={handleLinkUrl}
            handleLinkName={handleLinkName}
        />

        <SettingsArea
            showSettingsArea={showSettingsArea}
            handleSettingsAreaVisibility={handleSettingsAreaVisibility}
            handleIsPrivate={handleIsPrivate}
            isPrivate={post.settings.isPrivate}
        />
        </>
    )
    }

    export default ContentCreationRoute